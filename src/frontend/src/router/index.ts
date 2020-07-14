import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import EditionOverview from '@/views/EditionOverview.vue';
import About from '@/views/About.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'EditionOverview',
        component: EditionOverview,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
