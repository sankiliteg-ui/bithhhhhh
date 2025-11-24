import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),        // 👈 React for JSX
    tailwindcss(),  // 👈 Tailwind v4 plugin
  ],
})
