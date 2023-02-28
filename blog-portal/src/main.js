import { createApp } from 'vue'
import App from './App.vue'
import Router from './router/index.js'
import Store from '@/store/index.js'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
VMdPreview.use(githubTheme)

createApp(App)
    .use(Router)
    .use(VMdPreview)
    .use(Store)
    .mount('#app')
