import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { loadStats } from './scripts/stats'

// `vite dev` skips the pre-render step, which is where project numbers are
// injected. Without this the proof strip shows only the licence in dev.
function devStats(): Plugin {
  return {
    name: 'dev-stats',
    apply: 'serve',
    async transformIndexHtml() {
      const stats = await loadStats()
      return [{ tag: 'script', children: `window.__STATS__=${JSON.stringify(stats)}`, injectTo: 'head' }]
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devStats()],
  // The manifest lets the prerender step preload each page's chunks.
  build: { manifest: true },
})
