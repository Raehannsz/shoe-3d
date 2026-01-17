import { defineConfig } from 'vite';

export default defineConfig({
    publicDir: 'public',
    root: './',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    },
    server: {
        port: 5173,
        open: true,
    },
});
