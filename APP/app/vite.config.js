import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";


export default defineConfig({
  plugins: [react()],
  test:{
    environment:'jsdom',
    setupFiles: ['./src/test/setupTtest.ts'],
      globals : true,
      coverage: {
        reporter:['test','html'],
        reportsDirectory: './coverage'
      }
    
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@functional": path.resolve(__dirname, "./src/components/functional"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});
