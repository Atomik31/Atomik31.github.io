import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' : le site fonctionne à la racine de atomik31.github.io comme dans un sous-dossier.
export default defineConfig({
  base: './',
  plugins: [react()],
})
