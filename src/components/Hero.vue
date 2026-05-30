<script setup>
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { identity, briefHook } from '../data/portfolio.js'
import { t, tk, locale } from '../i18n.js'
import BriefHook from './BriefHook.vue'
import SectionJump from './SectionJump.vue'
import RoleHint from './RoleHint.vue'

const teamPhrase = { fr: 'Team-lead front-end', en: 'Front-end team lead' }

// Découpe du bio autour des deux accroches : « Team-lead front-end » (cible de
// la flèche) et « la performance, » (BriefHook). Réactif au FR/EN.
const parts = computed(() => {
  const full = t(identity.brief)
  const team = t(teamPhrase)
  const perf = t(briefHook.phrase)
  const iTeam = full.indexOf(team)
  const iPerf = full.indexOf(perf)
  if (iTeam === -1 || iPerf === -1 || iTeam > iPerf) return { ok: false }
  return {
    ok: true,
    s0: full.slice(0, iTeam),
    team,
    s1: full.slice(iTeam + team.length, iPerf),
    s2: full.slice(iPerf + perf.length),
  }
})

const rootEl = ref(null)
const leadEl = ref(null)
const lineEl = ref(null)

// Flèche du badge « Découvrir c'est quoi ? » JUSQU'À « Team-lead front-end » :
// on descend par la marge droite (libre de texte) puis on rejoint le mot par
// l'interligne ; la pointe (marker) atterrit sur le mot.
const drawArrow = () => {
  const lead = leadEl.value
  const line = lineEl.value
  const host = rootEl.value
  const badge = host?.querySelector('.rolehint')
  const brief = host?.querySelector('.hero__brief')
  const q = host?.querySelector('.rolehint__q')
  if (!lead || !line || !host || !badge || !brief || !q) return

  const hr = host.getBoundingClientRect()

  // On pose le badge sur la ligne du badge de saut « A1 » (côté gauche, vide),
  // sous le paragraphe et la pastille « ACTIF » → zone sans texte. On borne
  // `left` pour ne jamais chevaucher « A1 » à droite (mobile compris).
  const br = brief.getBoundingClientRect()
  const lr0 = lead.getBoundingClientRect()
  const bw = badge.getBoundingClientRect().width
  const jump = host.querySelector('.jump')
  const jr = jump ? jump.getBoundingClientRect() : null
  const top = jr ? jr.top - hr.top : br.bottom - hr.top + 14
  const rightLimit = jr ? jr.left - hr.left - 12 : hr.width - 16
  const maxLeft = Math.max(16, rightLimit - bw)
  const left = Math.min(Math.max(lr0.left - hr.left, 16), maxLeft)
  badge.style.top = `${Math.round(top)}px`
  badge.style.left = `${Math.round(left)}px`
  badge.style.right = 'auto'
  badge.style.bottom = 'auto'

  // (re)mesure après positionnement du badge
  const lr = lead.getBoundingClientRect()
  const qr = q.getBoundingClientRect()

  const sx = qr.left + qr.width / 2 - hr.left
  const sy = qr.top + qr.height / 2 - hr.top
  // contournement par la marge la plus proche (libre de texte)
  const onLeft = sx < hr.width / 2
  const stripX = onLeft ? 16 : hr.width - 16
  // pointe sur le bord du mot face à la marge empruntée
  const ex = onLeft ? lr.left - hr.left - 5 : lr.right - hr.left + 5
  const ey = lr.bottom - hr.top + 1

  line.setAttribute('d', `M ${sx},${sy} C ${stripX},${sy} ${stripX},${ey} ${ex},${ey}`)
}

watch(parts, () => nextTick(drawArrow))
watch(locale, () => nextTick(drawArrow))

let raf
const scheduleDraw = () => {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(drawArrow)
}

let ro
onMounted(() => {
  nextTick(drawArrow)
  setTimeout(drawArrow, 350)
  window.addEventListener('resize', scheduleDraw)
  rootEl.value?.addEventListener('transitionend', scheduleDraw)
  if (window.ResizeObserver && rootEl.value) {
    ro = new ResizeObserver(scheduleDraw)
    ro.observe(rootEl.value)
  }
})
onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', scheduleDraw)
  rootEl.value?.removeEventListener('transitionend', scheduleDraw)
  ro?.disconnect()
})
</script>

<template>
  <section ref="rootEl" class="panel hero" id="apercu" data-reveal>
    <span class="corner tl" /><span class="corner tr" />
    <span class="corner bl" /><span class="corner br" />

    <RoleHint />

    <!-- flèche : badge « Découvrir c'est quoi ? » → mot « Team-lead front-end » -->
    <svg class="hero__leadarrow" aria-hidden="true">
      <defs>
        <marker
          id="lead-head"
          markerWidth="9"
          markerHeight="9"
          refX="5.5"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path
            d="M0.5,0.5 L6,3 L0.5,5.5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </marker>
      </defs>
      <path ref="lineEl" class="hero__leadarrow-line" marker-end="url(#lead-head)" />
    </svg>

    <div class="hero__body">
      <p class="hero__kicker">{{ tk('bio_label') }}</p>
      <h1 class="hero__name">{{ identity.callsign }}</h1>
      <p class="hero__role">{{ t(identity.role) }} · {{ t(identity.location) }}</p>
      <p class="hero__brief">
        <template v-if="parts.ok"
          >{{ parts.s0 }}<span ref="leadEl" class="hero__lead">{{ parts.team }}</span
          >{{ parts.s1 }}<BriefHook />{{ parts.s2 }}</template
        >
        <template v-else>{{ t(identity.brief) }}</template>
      </p>
      <span class="status-pill hero__status">{{ t(identity.status) }}</span>
      <SectionJump from="apercu" />
    </div>
  </section>
</template>
