import './assets/main.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import PortalVue from 'portal-vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue';
import App from './App.vue'

const app = createApp(App)

app.use(VueAxios, axios)
app.use(
    createAuth0({
        domain: "{http://localhost:5173/}",
        clientId: "{yourClientId}",
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    })
);  
app.use(createPinia())
app.use(PortalVue)

app.mount('#app')
