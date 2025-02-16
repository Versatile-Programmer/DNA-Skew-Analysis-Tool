import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: path.resolve(__dirname, 'node_modules/buffer/'),
      'jspdf': 'jspdf/dist/jspdf.umd.min.js'
    },
  },
  optimizeDeps: {
    include: ['html2canvas', 'jspdf', 'plotly.js'], // Ensure jsPDF is included here
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'html2canvas', 'jspdf', 'plotly.js'],
        },
      },
    },
  },
});
