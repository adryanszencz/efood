import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// publicado no GitHub Pages em https://adryanszencz.github.io/efood/
export default defineConfig({
  plugins: [react()],
  base: '/efood/'
})
