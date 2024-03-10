import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../',
  base: '',
  server: {
    port: 3000,
  },
  plugins: [react(), viteTsconfigPaths()],
});
