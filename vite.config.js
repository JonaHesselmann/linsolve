import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['src/glpk.cjs'],
  },
  build: {
    commonjsOptions: {

    },
  },
  plugins: [vue({
    template: {
    }
  }, ),
],
  base: '/linsolve/'  
})
