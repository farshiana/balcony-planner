import Vue from 'vue';
import VueRouter from 'vue-router';
import Planning from '@/views/Planning.vue';
import Plants from '@/views/Plants.vue';
import Balcony from '@/views/Balcony.vue';
import Auth from '@/views/Auth.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/planning',
        name: 'planning',
        component: Planning,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/plants',
        name: 'plants',
        component: Plants,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/balcony',
        name: 'balcony',
        component: Balcony,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Auth,
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "admin" */ '@/views/Admin.vue'),

    },
    {
        path: '*',
        redirect: 'planning',
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
