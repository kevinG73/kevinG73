<script setup>
// Palette de commandes ⌘K : chaque ligne = une section. Filtrable, navigable
// au clavier (↑ ↓ Entrée, Échap pour fermer).
import { ref, computed, watch, nextTick } from 'vue'
import { nav } from '../data/portfolio.js'
import { t, tk } from '../i18n.js'

const props = defineProps({ open: Boolean })
const emit = defineEmits(['close'])

const query = ref('')
const active = ref(0)
const inputEl = ref(null)

const items = computed(() => {
  const q = query.value.trim().toLowerCase()
  return nav.filter((n) => !q || t(n.label).toLowerCase().includes(q) || n.id.includes(q))
})

watch(
  () => props.open,
  async (v) => {
    if (v) {
      query.value = ''
      active.value = 0
      await nextTick()
      inputEl.value?.focus()
    }
  },
)
watch(items, () => {
  if (active.value >= items.value.length) active.value = 0
})

const go = (item) => {
  if (!item) return
  emit('close')
  const el = document.getElementById(item.id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  history.replaceState(null, '', `#${item.id}`)
}

const onKey = (e) => {
  const n = items.value.length
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowDown') {
    e.preventDefault()
    active.value = n ? (active.value + 1) % n : 0
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    active.value = n ? (active.value - 1 + n) % n : 0
  } else if (e.key === 'Enter') {
    e.preventDefault()
    go(items.value[active.value])
  }
}
</script>

<template>
  <Transition name="cmd">
    <div v-if="open" class="cmd" @click.self="emit('close')">
      <div class="cmd__box" role="dialog" aria-modal="true">
        <div class="cmd__search">
          <span class="cmd__ico">⌕</span>
          <input
            ref="inputEl"
            v-model="query"
            :placeholder="tk('cmdk_placeholder')"
            @keydown="onKey"
          />
          <span class="cmd__esc">ESC</span>
        </div>
        <ul class="cmd__list">
          <li
            v-for="(item, i) in items"
            :key="item.id"
            :class="{ on: i === active }"
            @mouseenter="active = i"
            @click="go(item)"
          >
            <span class="cmd__code">{{ item.code }}</span>
            <span class="cmd__label">{{ t(item.label) }}</span>
            <span class="cmd__hash">#{{ item.id }}</span>
          </li>
          <li v-if="!items.length" class="cmd__empty">{{ tk('cmdk_empty') }}</li>
        </ul>
      </div>
    </div>
  </Transition>
</template>
