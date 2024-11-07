import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "159.203.183.245",
    // host: "192.168.10.25",
    // host: "localhost",
    port: "3000",
  },
})
