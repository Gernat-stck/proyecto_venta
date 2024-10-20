import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      os: 'os-browserify/browser',
      path: 'path-browserify',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx', // Clave: esto configura el loader para archivos .js que contienen JSX
      },
    },
  },
});
