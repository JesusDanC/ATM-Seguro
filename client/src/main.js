import './assets/main.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import PortalVue from 'portal-vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(VueAxios, axios)

app.use(createPinia())
app.use(PortalVue)

app.mount('#app')
