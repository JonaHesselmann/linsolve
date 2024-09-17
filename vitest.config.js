import {configDefaults, coverageConfigDefaults, defineConfig} from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    test: {
        environment: 'happy-dom',
        globals: true,
        coverage: {
            //changed so that it does not include node_modules and glpk.min.js
            include: ['src/**']
        },
         },
});


