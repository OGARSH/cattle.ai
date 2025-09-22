import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: '002/client',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('./002/client/src'),
      '@assets': path.resolve('./002/attached_assets'),
    },
  },
});
