import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true,  // expose on local network so everyone can access
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
});
