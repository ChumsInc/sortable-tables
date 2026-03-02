import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import {resolve} from 'node:path'
import {cwd} from 'node:process'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({}),
    ],
    resolve: {},
    build: {
        lib: {
            entry: resolve(cwd(), './src/index.tsx'),
            name: 'SortableTables',
            fileName: (format) => `index.${format}.js`,
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['react', 'react/jsx-runtime', 'react-dom', '@emotion/styled'],
            output: {
                globals:{
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                    '@emotion/styled': 'styled'
                }
            }
        },
        sourcemap: true,
        minify: true,
    }
})
