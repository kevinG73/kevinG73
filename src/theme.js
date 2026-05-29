// Thème clair / sombre.
// - Au 1er chargement : on suit la préférence SYSTÈME (prefers-color-scheme).
// - Si l'utilisateur a basculé manuellement : on respecte son choix (localStorage).
// - Si le système change et qu'aucun choix manuel n'existe : on suit en direct.
import { ref } from 'vue'

const KEY = 'portfolio-theme'

function systemPref() {
  try {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light'
    }
  } catch {
    /* ignore */
  }
  return 'dark'
}

function saved() {
  try {
    const s = localStorage.getItem(KEY)
    if (s === 'light' || s === 'dark') return s
  } catch {
    /* ignore */
  }
  return null
}

function detect() {
  return saved() || systemPref()
}

export const theme = ref(detect())

function apply() {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme.value)
  }
}

apply()

export function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  try {
    localStorage.setItem(KEY, theme.value)
  } catch {
    /* ignore */
  }
  apply()
}

// Suivre le système en direct tant qu'aucun choix manuel n'a été fait.
try {
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (saved()) return // un choix manuel est prioritaire
    theme.value = e.matches ? 'light' : 'dark'
    apply()
  })
} catch {
  /* ignore */
}
