/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['src/**/*.spec.{js,ts}', 'tests/**/*.spec.{js,ts}'],
        snapshotFormat: {
            indent: 2,
            escapeString: true
        }
    }
})
