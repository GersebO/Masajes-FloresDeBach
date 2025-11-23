import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
    test:{
    environment:'jsdom',
    setupFiles: ['./src/test/setupTest.ts'],
      globals : true,
      coverage: {
        reporter:['test','html'],
        reportsDirectory: './coverage'
      }
    
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
