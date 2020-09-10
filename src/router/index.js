import Vue from 'vue';
import VueRouter from 'vue-router';
import Planning from '@/views/Planning.vue';
import Balconies from '@/views/Balconies.vue';
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
        path: '/balconies',
        name: 'balconies',
        component: Balconies,
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

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
    // const { currentUser } = auth;

    // if (requiresAuth && !currentUser) {
    //     next({ name: 'login', query: { redirect: to.fullPath } });
    // } else {
    next();
    // }
});

export default router;
