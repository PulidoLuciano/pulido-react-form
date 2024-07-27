import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({rollupTypes: true, include: ["src"]})],
  esbuild: {
    minifyIdentifiers: false,
    pure: ["console.log"]
  },
  build: {
    sourcemap: true,
    emptyOutDir: true,
    lib: {
      entry: "./src/index.ts",
      name: "PulidoReactForm",
      fileName: "pulidoForm",
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
    }
  }
})
