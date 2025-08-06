// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // 必须设置 global 对象
  },
  optimizeDeps: {
    include: ['buffer'], // 强制预构建 buffer
  },
  resolve: {
    alias: {
      buffer: 'buffer', // 确保使用的是我们安装的 npm 包
    },
  },
})
