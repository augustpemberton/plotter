import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import VueFeather from 'vue-feather';

import {router} from './router';
import init from 'p5.js-svg';
import p5 from 'p5';

const app = createApp(App)
app.component(VueFeather.name!, VueFeather);
app.use(router);
app.mount('#app');

init(p5)