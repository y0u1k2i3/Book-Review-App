import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: '/login',
    port: 5173,
    strictPort: true,
  },
  // Vitestの設定
  test: {
    include: ['vitest/**/*.test.jsx'], // テストファイルパス
    globals: true,
    environment: "jsdom", // JSDOM環境
    setupFiles: "./vitest/setup.js", // 初期設定用ファイル
  }
})
