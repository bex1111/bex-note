import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Toolbar from 'primevue/toolbar';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Fluid from 'primevue/fluid';
import Dialog from 'primevue/dialog';
import Aura from '@primeuix/themes/aura';
import Tooltip from 'primevue/tooltip';
import Avatar from 'primevue/avatar';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css'
import { createPinia } from 'pinia'
import {useAuthorizationStore} from "./store/authorization";
import {useNotificationStore} from "./store/notification";

import './style.css'

const app=createApp(App)

const pinia = createPinia()
app.use(pinia)
export const notificationStore = useNotificationStore()
export const tokenStore = useAuthorizationStore()

app.use(PrimeVue,{
    theme: {
        preset: Aura
    }
});
app.use(ToastService);
app.component('prime-button', Button);
app.component('prime-select', Select);
app.component('prime-toolbar', Toolbar);
app.component('prime-card', Card);
app.component('prime-input', InputText);
app.component('prime-float-label', FloatLabel);
app.component('prime-fluid', Fluid);
app.component('prime-dialog', Dialog);
app.component('prime-toast', Toast);
app.component('prime-avatar', Avatar);
app.directive('tooltip', Tooltip);
app.mount('#app')
