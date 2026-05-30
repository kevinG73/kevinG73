<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { geoHook } from '../data/portfolio.js'
import { t, locale } from '../i18n.js'

defineProps({ label: { type: String, required: true } })

// pinned = ouvert au clic/tap ; survol desktop géré en CSS. Clic ext./Échap ferme.
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

// clamp du terminal dans le viewport + recalage du connecteur sous le mot
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
  <span ref="root" class="geohint" :class="{ 'is-pinned': pinned }" @mouseenter="place">
    <button
      class="geohint__trigger"
      type="button"
      :aria-expanded="pinned"
      :aria-label="t(geoHook.terminal.title)"
      @click.stop="toggle"
    >
      {{ label }}
    </button>

    <!-- petite flèche (≤ 15px) sous le mot, pointe vers lui -->
    <svg class="geohint__arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path class="geohint__arrow-line" d="M8,15 L8,5" />
      <path class="geohint__arrow-head" d="M3.5,9 L8,4 L12.5,9" />
    </svg>

    <span ref="term" class="bhk__term" role="dialog" :aria-label="t(geoHook.terminal.title)">
      <span class="bhk__term-bar">
        <i /><i /><i />
        <em>{{ t(geoHook.terminal.title) }}</em>
      </span>
      <span class="bhk__term-body">
        <span class="bhk__line" v-for="(l, i) in geoHook.terminal.lines" :key="i">
          <span class="bhk__cmd"><b>$</b>{{ l.cmd }}</span>
          <span class="bhk__out">{{ t(l.out) }}</span>
        </span>
      </span>
    </span>
  </span>
</template>
