<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BootSplash from './components/BootSplash.vue'
import HudHeader from './components/HudHeader.vue'
import CommandMenu from './components/CommandMenu.vue'
import Hero from './components/Hero.vue'
import Arsenal from './components/Arsenal.vue'
import Experience from './components/Experience.vue'
import Deployments from './components/Deployments.vue'
import Qualifications from './components/Qualifications.vue'
import SiteFooter from './components/SiteFooter.vue'
import { nav } from './data/portfolio.js'

const activeId = ref(nav[0].id)
const cmdOpen = ref(false)
let spyObs, revealObs

// Splash « boot Arch » : une fois par session, sauf si l'utilisateur préfère
// réduire les animations.
const showBoot = ref(false)
try {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduced && !sessionStorage.getItem('booted')) {
    showBoot.value = true
    sessionStorage.setItem('booted', '1')
  }
} catch {
  /* sessionStorage indisponible (mode privé) : on n'affiche pas le splash */
}

const onKeydown = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    cmdOpen.value = !cmdOpen.value
  }
}

onMounted(() => {
  // Scroll-spy : surligne l'onglet de la section au centre de l'écran.
  const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean)
  spyObs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) activeId.value = e.target.id
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
  )
  sections.forEach((s) => spyObs.observe(s))

  // Révélation progressive des sections.
  revealObs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          revealObs.unobserve(e.target)
        }
      }
    },
    { threshold: 0.06 },
  )
  document.querySelectorAll('[data-reveal]').forEach((el) => revealObs.observe(el))

  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  spyObs?.disconnect()
  revealObs?.disconnect()
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <BootSplash v-if="showBoot" @done="showBoot = false" />

  <HudHeader :active-id="activeId" @open-cmd="cmdOpen = true" />
  <CommandMenu :open="cmdOpen" @close="cmdOpen = false" />

  <main class="page">
    <Hero />
    <Arsenal />
    <Experience />
    <Deployments />
    <Qualifications />
  </main>

  <SiteFooter />
</template>
