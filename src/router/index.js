import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/console',
        component: Home,
        children: [
            {
                path: 'dev_doc',
                component: () => import('../views/DevDocView.vue'),
            },
            {
                path: '/dev_doc/:docName',
                name: 'DevDoc',
                component: () => import('../views/DevDocView.vue'),
            },
            {
                path: '/console',
                name: 'Console',
                component: () => import('../views/ConsoleView.vue'),
            },
            {
                path: '/sign_tool',
                name: 'signTool',
                component: () => import('../views/SignToolView.vue'),
            },
        ],
    },
    {
        path: '/terms',
        name: 'Terms',
        component: () => import('../components/Terms.vue'),
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: () => import('../components/Privacy.vue'),
    },
];
const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
