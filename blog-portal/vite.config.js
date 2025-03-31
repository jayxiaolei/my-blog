import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import ElementPlus from 'unplugin-element-plus/vite';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        ElementPlus(),
        eslintPlugin({
            include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts', 'src/**/*.jsx', 'src/**/*.tsx'], //  Lint 目标文件 MimeType
            exclude: ['/node_modules/**'], // 排除的文件 MimeType
            cache: false, // 关闭 ESLint 的缓存，确保每次都检测（在调试或初次设置时有用）
        }),
    ],
    base: './', // 打包路径
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            _a: path.resolve(__dirname, 'src/assets'),
            _c: path.resolve(__dirname, 'src/components'),
            _v: path.resolve(__dirname, 'src/views'),
            _ax: path.resolve(__dirname, 'src/axios'),
        },
    },
    build: {
        sourcemap: true,
    },
    // 服务代理配置
    // server: {
    //   port: 1231,
    //   open: true,
    //   proxy: {
    //     '/api': ''
    //   },
    //   cors: true
    // }
});
