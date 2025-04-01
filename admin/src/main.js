import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import { createApp } from 'vue';

import Store from '@/store/index.js';

import App from './App.vue';
import Router from './router/index.js';

import '@kangc/v-md-editor/lib/theme/style/github.css';
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import elementPlus from 'element-plus';
import 'element-plus/dist/index.css';

VMdEditor.use(githubTheme);

const app = createApp(App);

app.use(Router).use(VMdEditor).use(Store).use(elementPlus).mount('#app');
