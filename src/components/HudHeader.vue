<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { identity, nav, place } from '../data/portfolio.js'
import { locale, setLocale, t, tk, SUPPORTED } from '../i18n.js'
import { theme, toggleTheme } from '../theme.js'

defineProps({ activeId: String })
const emit = defineEmits(['open-cmd'])

const open = ref(false) // menu mobile
const clock = ref('--:--')
let timer

const tick = () => {
  clock.value = new Intl.DateTimeFormat('en-GB', {
    timeZone: place.tz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <header class="hud-header">
    <div class="hud-header__brand">
      <span class="hud-header__name">{{ identity.callsign }}</span>
      <span class="hud-header__role">{{ t(identity.role) }}</span>
    </div>

    <nav class="hud-nav" :class="{ 'is-open': open }">
      <a
        v-for="item in nav"
        :key="item.id"
        :href="`#${item.id}`"
        :class="{ 'is-active': activeId === item.id }"
        @click="open = false"
        >{{ t(item.label) }}</a
      >
    </nav>

    <div class="hud-actions">
      <span class="hud-place">{{ place.city }} · {{ clock }} {{ place.tzLabel }}</span>

      <button class="hud-kbd" type="button" @click="emit('open-cmd')" aria-label="Recherche">
        ⌕ ⌘K
      </button>

      <button
        class="hud-theme"
        type="button"
        @click="toggleTheme"
        :aria-label="theme === 'dark' ? 'Mode clair' : 'Mode sombre'"
      >
        {{ theme === 'dark' ? '☀' : '☾' }}
      </button>

      <div class="hud-lang" role="group" aria-label="Langue">
        <template v-for="(l, i) in SUPPORTED" :key="l">
          <span v-if="i > 0">/</span>
          <button type="button" :class="{ on: locale === l }" @click="setLocale(l)">
            {{ l.toUpperCase() }}
          </button>
        </template>
      </div>

      <a class="hud-cta" href="#contact">{{ tk('get_in_touch') }} →</a>

      <button class="hud-burger" type="button" @click="open = !open" aria-label="Menu">☰</button>
    </div>
  </header>
</template>
