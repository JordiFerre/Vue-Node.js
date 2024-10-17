import { fileURLToPath } from "node:url"
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: {
        __VITE_BASE_URL__: JSON.stringify(process.env.VITE_BASE_URL)
    }
})
