// Thème clair / sombre. Défaut : sombre (HUD). Mémorisé dans localStorage.
// L'attribut data-theme sur <html> pilote les variables CSS (cf. hud.css).
import { ref } from 'vue'

const KEY = 'portfolio-theme'

function detect() {
  try {
    const s = localStorage.getItem(KEY)
    if (s === 'light' || s === 'dark') return s
  } catch {
    /* ignore */
  }
  return 'dark'
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
