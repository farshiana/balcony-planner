import Vue from 'vue';
import VueRouter from 'vue-router';
import Planning from '@/components/Planning.vue';
import Plants from '@/components/Plants/Plants.vue';
import Balcony from '@/components/Balcony/Balcony.vue';
import Auth from '@/components/Auth.vue';

Vue.use(VueRouter);

export const routes = [
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
        children: [{
            path: '/plants/:plantId',
            name: 'plant',
            component: () => import(/* webpackChunkName: "plants" */ '@/components/Plants/Plant.vue'),
            props: true,
        }],
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
        component: () => import(/* webpackChunkName: "admin" */ '@/components/Admin/Admin.vue'),
        children: [{
            path: '/admin/genera',
            name: 'genera',
            component: () => import(/* webpackChunkName: "admin" */ '@/components/Admin/Genera/Genera.vue'),
            children: [{
                path: '/admin/genera/:genusId',
                name: 'genus',
                component: () => import(/* webpackChunkName: "admin" */ '@/components/Admin/Genera/Genus.vue'),
                props: true,
            }],
        }],
        meta: {
            requiresAuth: true,
        },
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
