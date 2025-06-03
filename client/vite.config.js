import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import envCompatible from 'vite-plugin-env-compatible';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), envCompatible()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   headers: {
  //     "Content-Security-Policy": "default-src 'self' https://js.stripe.com; font-src 'self' https://js.stripe.com;",
  //   },
  // },
})
