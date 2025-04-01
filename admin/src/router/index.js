import Home from '_v/home.vue';
import Login from '_v/login.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: Login,
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            title: '首页',
        },
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '系统首页',
                },
                component: () => import('../views/dashboard.vue'),
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '用户管理',
                },
                component: () => import('../views/user.vue'),
            },
            {
                path: '/article',
                name: 'article',
                meta: {
                    title: '文章管理',
                },
                component: () => import('../views/article.vue'),
            },
            {
                path: '/article/create',
                name: 'create',
                meta: {
                    title: '添加文章',
                },
                component: () => import('../views/detail.vue'),
            },
            {
                path: '/article/:id',
                name: 'detail',
                meta: {
                    title: '文章详情',
                },
                component: () => import('../views/detail.vue'),
            },
            {
                path: '/comment',
                name: 'comment',
                meta: {
                    title: '文章管理',
                },
                component: () => import('../views/comment.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 阿金`;
    const token = localStorage.getItem('x-token');
    if (!token && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
});

export default router;
