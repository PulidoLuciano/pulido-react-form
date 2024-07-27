import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({insertTypesEntry: true})],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "PulidoReactForm",
      fileName: "pulidoForm",
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
    }
  }
})
