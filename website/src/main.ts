import { createApp } from 'vue';

import VueCookies from 'vue-cookies';
import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/HomeView.vue'),
        },
        {
            path: '/newsletter',
            name: 'newsletter',
            //@ts-ignore
            component: () => import('./views/NewsLetterView.vue'),
        },
        {
            path: '/article/:articleId',
            name: 'Article',
            component: () => import('./views/subpages/ArticleView.vue'),
        },
    ],
});

import './assets/main.css';

const app = createApp(App);

app.use(VueCookies, { expires: '15d' });

app.use(router);

app.mount('#app');
