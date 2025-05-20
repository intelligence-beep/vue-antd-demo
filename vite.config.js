import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/vue-antd-demo/',
  build: {
    target: 'es2015',
    minify: false,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue': ['vue'],
          'antd': ['ant-design-vue']
        }
      }
    }
  }
}) 