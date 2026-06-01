<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { briefHook } from '../data/portfolio.js'
import { t, locale } from '../i18n.js'

// `pinned` = ouvert par tap/clic (état explicite, fiable sur tactile).
// Le survol desktop est géré en CSS pur (@media hover:hover) pour ne pas
// « coller » sur mobile. Clic extérieur ou Échap referme.
const pinned = ref(false)
const root = ref(null)
const term = ref(null)

// Positionnement « popper » : on décale le terminal pour qu'il reste dans le
// viewport (la phrase peut être en bord d'écran), puis on recale le connecteur
// sous le centre de la phrase.
const place = () => {
  const el = term.value
  const host = root.value
  if (!el || !host) return
  el.style.left = '0px'
  const vw = document.documentElement.clientWidth
  const margin = 10
  let r = el.getBoundingClientRect()
  let shift = 0
  if (r.right > vw - margin) shift = vw - margin - r.right
  if (r.left + shift < margin) shift = margin - r.left
  el.style.left = `${shift}px`
  const hb = host.getBoundingClientRect()
  const tb = el.getBoundingClientRect()
  const ax = Math.min(Math.max(hb.left + hb.width / 2 - tb.left, 14), tb.width - 14)
  el.style.setProperty('--bhk-arrow-x', `${ax}px`)
}

const toggle = () => {
  pinned.value = !pinned.value
}
const onDocPointer = (e) => {
  if (root.value && !root.value.contains(e.target)) pinned.value = false
}
const onKey = (e) => {
  if (e.key === 'Escape') pinned.value = false
}

// Tactile / mobile : révélation auto une seule fois : dès que l'utilisateur
// tente de scroller vers le bas (molette / doigt / touches), on ouvre le
// terminal pour présenter le propos sur la performance. (Sur desktop, il est
// déjà ouvert d'emblée — voir onMounted.) Ensuite il se referme normalement.
let revealed = false
const removeScrollListeners = () => {
  window.removeEventListener('wheel', onFirstScroll)
  window.removeEventListener('touchmove', onFirstScroll)
  window.removeEventListener('keydown', onFirstScroll)
}
const onFirstScroll = (e) => {
  if (revealed) return
  // molette / doigt / touches uniquement = vraie intention de l'utilisateur
  // (on évite l'évènement `scroll` qui se déclenche aussi à la restauration de
  //  position du navigateur, ce qui ouvrirait le terminal prématurément).
  if (e.type === 'wheel' && e.deltaY <= 0) return
  if (e.type === 'keydown' && !['ArrowDown', 'PageDown', ' ', 'End'].includes(e.key)) return
  revealed = true
  pinned.value = true
  removeScrollListeners()
}

// recaler quand on ouvre, quand la langue change (largeur différente) ou au resize
watch(pinned, (v) => v && nextTick(place))
watch(locale, () => nextTick(place))

// Desktop = souris + nav complète affichée (le menu bascule en hamburger à
// ≤ 940px, cf. hud.css). On exige aussi `hover: hover` pour ne pas ouvrir
// d'office sur un grand écran tactile.
const isDesktop = () => {
  try {
    return window.matchMedia('(hover: hover) and (min-width: 941px)').matches
  } catch {
    return false
  }
}

onMounted(() => {
  document.addEventListener('click', onDocPointer)
  document.addEventListener('keydown', onKey)
  window.addEventListener('resize', place)
  if (isDesktop()) {
    // desktop : terminal ouvert par défaut (présente le propos sur la performance)
    revealed = true // déjà ouvert → pas de révélation au scroll
    pinned.value = true
    nextTick(place)
    setTimeout(place, 400) // recaler après la révélation du hero / chargement des polices
  } else {
    // tactile / mobile : ouverture au premier scroll vers le bas
    window.addEventListener('wheel', onFirstScroll, { passive: true })
    window.addEventListener('touchmove', onFirstScroll, { passive: true })
    window.addEventListener('keydown', onFirstScroll)
    nextTick(place)
  }
})
onUnmounted(() => {
  document.removeEventListener('click', onDocPointer)
  document.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', place)
  removeScrollListeners()
})
</script>

<template>
  <span ref="root" class="bhk" :class="{ 'is-pinned': pinned }" @mouseenter="place">
    <button class="bhk__trigger" type="button" :aria-expanded="pinned" @click.stop="toggle">
      {{ t(briefHook.phrase) }}
    </button>

    <!-- cadre de sélection (type outil de design) autour de la phrase -->
    <span class="bhk__frame" aria-hidden="true">
      <i class="bhk__h tl" /><i class="bhk__h tc" /><i class="bhk__h tr" />
      <i class="bhk__h lc" /><i class="bhk__h rc" />
      <i class="bhk__h bl" /><i class="bhk__h bc" /><i class="bhk__h br" />
    </span>

    <!-- terminal HUD -->
    <span ref="term" class="bhk__term" role="dialog" :aria-label="t(briefHook.terminal.title)">
      <span class="bhk__term-bar">
        <i /><i /><i />
        <em>{{ t(briefHook.terminal.title) }}</em>
      </span>
      <span class="bhk__term-body">
        <span class="bhk__line" v-for="(l, i) in briefHook.terminal.lines" :key="i">
          <span class="bhk__cmd"><b>$</b>{{ l.cmd }}</span>
          <span class="bhk__out">{{ t(l.out) }}</span>
        </span>
      </span>
    </span>
  </span>
</template>
