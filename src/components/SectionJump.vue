<script setup>
import { computed } from 'vue'
import { nav } from '../data/portfolio.js'
import { t } from '../i18n.js'

// Badge keycap en bas de section : affiche le code de la section courante et,
// au clic, fait défiler vers la section suivante (indique « on peut descendre »).
const props = defineProps({ from: { type: String, required: true } })

const idx = computed(() => nav.findIndex((n) => n.id === props.from))
const cur = computed(() => (idx.value >= 0 ? nav[idx.value] : null))
const next = computed(() => (idx.value >= 0 ? nav[idx.value + 1] : null))

const go = () => {
  const n = next.value
  if (!n) return
  const el = document.getElementById(n.id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', `#${n.id}`)
  }
}
</script>

<template>
  <button
    v-if="cur && next"
    class="jump"
    type="button"
    @click="go"
    :aria-label="`${t(next.label)} ↓`"
    :title="`${t(next.label)} →`"
  >
    <span class="jump__key">{{ cur.key }}</span>
    <span class="jump__cue" aria-hidden="true">▼</span>
  </button>
</template>
