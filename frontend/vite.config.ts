import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    server: {

        proxy: {
            // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
            // '/api': 'http://localhost:8000',
            // '/static': 'http://localhost:8000',
            // '/admin': 'http://localhost:8000',

            // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
            '/api': {
                  target: 'http://127.0.0.1:8000',
                  changeOrigin: true,
                //   rewrite: (path) => path.replace(/^\/api/, ''),
                },
            '/static': {
                  target: 'http://127.0.0.1:8000',
                  changeOrigin: true,
                //   rewrite: (path) => path.replace(/^\/api/, ''),
                },
            '/admin': {
                  target: 'http://127.0.0.1:8000',
                  changeOrigin: true,
                //   rewrite: (path) => path.replace(/^\/api/, ''),
                },
                // // with RegEx: http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
                // '^/fallback/.*': {
                    //   target: 'http://jsonplaceholder.typicode.com',
                    //   changeOrigin: true,
                    //   rewrite: (path) => path.replace(/^\/fallback/, ''),
                    // },
                    // // Using the proxy instance
                    // '/api': {
                        //   target: 'http://jsonplaceholder.typicode.com',
                        //   changeOrigin: true,
                        //   configure: (proxy, options) => {
                            //     // proxy will be an instance of 'http-proxy'
                            //   },
                            //},
                        }
    },
    plugins: [react()],
})
