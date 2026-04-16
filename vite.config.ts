import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // 支持 Gitee Pages 等子路径部署
  server: {
    proxy: {
      '/api/gmi': {
        target: 'https://api.gmi-serving.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/gmi/, ''),
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('代理错误:', err.message)
          })
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('发送请求:', req.method, req.url)
          })
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('收到响应:', proxyRes.statusCode, req.url)
          })
        }
      }
    }
  }
})
