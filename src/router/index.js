import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import intercept from "./interceptor.js";

import Layout from "@/layouts/DashboardLayout.vue";
import systemRoutes from "./system.js"

// 存放固定的路由
const defaultRouterList = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: () => import('@/views/dashboard/index.vue'),
            }
        ]
    },
    // 登录页
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
    },
    // 个人中心
    {
        path: '/personal',
        component: Layout,
        children: [
            {
                path: '',
                name: 'Personal',
                component: () => import('@/views/personal/index.vue'),
            }
        ]
    },
    // 404
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/error/NotFound.vue') },
];

export const routes = [...defaultRouterList, ...systemRoutes];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

export default intercept(router);