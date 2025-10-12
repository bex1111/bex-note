import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Toolbar from 'primevue/toolbar';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css'


const app=createApp(App)
app.use(PrimeVue,{
    theme: {
        preset: Aura
    }
});
app.component('prime-button', Button);
app.component('prime-select', Select);
app.component('prime-toolbar', Toolbar);
app.mount('#app')
