import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'
window._ = require('lodash');

createApp(App).use(router).mount('#app')
