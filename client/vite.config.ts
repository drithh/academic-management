import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../',
  server: {
    port: parseInt(import.meta.env.VITE_FRONTEND_PORT) ?? 3000,
  },
  plugins: [react()],
});
