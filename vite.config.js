import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Arahkan ke backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Hapus prefix '/api' jika backend tidak membutuhkannya
      },
    },
  },
});
