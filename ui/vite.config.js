import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [vue(),tailwindcss()],
    test: {
        globals: true,
        mockReset: true,
        environment: 'jsdom',
        include: ['src/**/*.spec.{js,ts}', 'tests/**/*.spec.{js,ts}'],
        snapshotFormat: {
            indent: 2,
            escapeString: true
        }
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: true
    },
    server: {
        port: 3000,
        open: true,
        host: true,
        proxy: {
            '/api': {
                target: 'http://localhost:1080',
                changeOrigin: true,
            }
        }
    },
})
