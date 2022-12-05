import { createApp } from 'vue';

import Header from "./components/Header.vue";

import App from './App.vue';

import './assets/main.css';

createApp(App).component('Header', Header).mount('#app')
