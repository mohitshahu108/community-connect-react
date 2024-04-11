import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        // Enable rollup options for better TypeScript handling
        rollupOptions: {
            output: {
                sourcemap: true,
            },
        },
    },
})
