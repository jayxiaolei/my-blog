import path from 'path';

import vue from '@vitejs/plugin-vue';
import ElementPlus from 'unplugin-element-plus/vite';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        ElementPlus(),
        eslintPlugin({
            fix: true, // 是否自动修复
            include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts', 'src/**/*.jsx', 'src/**/*.tsx'], //  Lint 目标文件 MimeType
            exclude: ['/node_modules/**'], // 排除的文件 MimeType
            emitWarning: false, // 仅在开发模式进行检测
            lintOnStart: false, // 禁用在服务器启动时进行检测
            formatter: 'stylish', // 这个选项可以用来改变eslint错误信息在控制台的显示方式，选择’stylish’能够以易读的形式显示eslint的错误和警告信息。
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
