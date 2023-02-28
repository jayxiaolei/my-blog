import {createRouter, createWebHashHistory} from "vue-router";
import Home from "_v/home.vue";

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'Home',
        meta: {
            title: '首页'
        },
        component: Home,
    },
    {
        path: '/article/:id',
        name: 'Article',
        meta: {
            title: '文章'
        },
        component: () => import ('_v/article.vue')
    },
    {
        path: '/photowall',
        name: 'PhotoWall',
        meta: {
            title: '照片墙'
        },
        component: () => import ('_v/photoWall.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.documentElement.scrollTop = 0
    document.title = `${to.meta.title} | 阿金`;
    next()
});

export default router;