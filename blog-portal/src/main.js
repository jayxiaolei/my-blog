import VMdPreview from '@kangc/v-md-editor/lib/preview';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import { createApp } from 'vue';

import Store from '@/store/index.js';

import App from './App.vue';
import Router from './router/index.js';

import '@kangc/v-md-editor/lib/style/preview.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';
VMdPreview.use(githubTheme, {
    Hljs: hljs,
});

createApp(App).use(Router).use(VMdPreview).use(Store).mount('#app');
