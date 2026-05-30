<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { roleHook } from '../data/portfolio.js'
import { t, locale } from '../i18n.js'

// Badge « ? » (haut-droite du nom) : survol desktop (CSS) + tap mobile (pinned).
// Au déclenchement, un terminal explique le rôle. Clic extérieur / Échap referme.
const pinned = ref(false)
const root = ref(null)
const term = ref(null)

const toggle = () => {
  pinned.value = !pinned.value
}
const onDocPointer = (e) => {
  if (root.value && !root.value.contains(e.target)) pinned.value = false
}
const onKey = (e) => {
  if (e.key === 'Escape') pinned.value = false
}

// Positionnement « popper » : le « ? » est en bord droit → on clampe le
// terminal dans le viewport et on recale le connecteur sous le badge.
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

watch(pinned, (v) => v && nextTick(place))
watch(locale, () => nextTick(place))

onMounted(() => {
  document.addEventListener('click', onDocPointer)
  document.addEventListener('keydown', onKey)
  window.addEventListener('resize', place)
  nextTick(place)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocPointer)
  document.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', place)
})
</script>

<template>
  <span ref="root" class="rolehint" :class="{ 'is-pinned': pinned }" @mouseenter="place">
    <button
      ref="q"
      class="rolehint__q"
      type="button"
      :aria-expanded="pinned"
      :aria-label="t(roleHook.terminal.title)"
      @click.stop="toggle"
    >
      {{ t(roleHook.label) }}
    </button>

    <span ref="term" class="bhk__term" role="dialog" :aria-label="t(roleHook.terminal.title)">
      <span class="bhk__term-bar">
        <i /><i /><i />
        <em>{{ t(roleHook.terminal.title) }}</em>
      </span>
      <span class="bhk__term-body">
        <span class="bhk__line" v-for="(l, i) in roleHook.terminal.lines" :key="i">
          <span class="bhk__cmd"><b>$</b>{{ l.cmd }}</span>
          <span class="bhk__out">{{ t(l.out) }}</span>
        </span>
      </span>
    </span>
  </span>
</template>
