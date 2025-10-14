import path from 'path';

import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';

dotenv.config();

const API_URL = process.env.VITE_APP_API_URL;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@generatedApi': path.resolve(__dirname, 'src/generated'),
      '@config': path.resolve(__dirname, 'src/config.ts'),
      '@routes': path.resolve(__dirname, 'src/routes.ts'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
