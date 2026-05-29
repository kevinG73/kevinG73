import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base: './' => le build fonctionne sur n'importe quel hébergeur statique
// (Netlify, Vercel, GitHub Pages en sous-dossier, etc.) sans config supplémentaire.
export default defineConfig({
  plugins: [vue()],
  base: './',
})
