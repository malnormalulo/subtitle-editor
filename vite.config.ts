import { defineConfig } from 'vite'

export default defineConfig({
  // https://github.com/vitejs/vite/discussions/5912#discussioncomment-3895047
  define: { global: 'globalThis' },
})
