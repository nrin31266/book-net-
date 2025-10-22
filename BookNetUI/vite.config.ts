import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,      // Chọn port 3000
    strictPort: true // Nếu port 3000 đang bận, Vite sẽ báo lỗi thay vì chọn port khác
  }
})
