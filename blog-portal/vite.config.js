import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ElementPlus()],
  base: './', // 打包路径
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '_a': path.resolve(__dirname, 'src/assets'),
      '_c': path.resolve(__dirname, 'src/components'),
      '_v': path.resolve(__dirname, 'src/views'),
      '_ax': path.resolve(__dirname, 'src/axios')
    }
  },
  build: {
    sourcemap: true
  }
  // 服务代理配置
  // server: {
  //   port: 1231,
  //   open: true,
  //   proxy: {
  //     '/api': ''
  //   },
  //   cors: true
  // }
})
