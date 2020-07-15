import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import EditionOverview from '@/views/EditionOverview.vue';
import Login from '@/views/Login.vue';
import BranchOverview from '@/views/BranchOverview.vue';
import FileEditor from '@/views/FileEditor.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'root',
        component: EditionOverview,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/branches/:bid',
        name: 'branch',
        component: BranchOverview,
        children: [
            {
                path: 'files/:fid',
                name: 'file',
                component: FileEditor,
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
