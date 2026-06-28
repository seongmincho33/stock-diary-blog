import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// 프로젝트 레포라 GitHub Pages 경로가 /stock-diary-blog/ 하위로 들어감
export default defineConfig({
  base: '/stock-diary-blog/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
