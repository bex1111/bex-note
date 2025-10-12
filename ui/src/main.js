import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Toolbar from 'primevue/toolbar';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
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
app.component('prime-card', Card);
app.component('prime-input', InputText);
app.component('prime-float-label', FloatLabel);
app.mount('#app')
