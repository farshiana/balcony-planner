import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import { auth } from '@/firebase';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import(/* webpackChunkName: "signup" */ '@/views/Signup.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
    const { currentUser } = auth;

    if (requiresAuth && !currentUser) {
        next({ name: 'login', query: { redirect: to.fullPath } });
    } else {
        next();
    }
});

export default router;
