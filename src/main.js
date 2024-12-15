import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// import VeeValidate from 'vee-validate';
// import ru from 'vee-validate/dist/locale/ru';

// Validator.localize('ru', ru);

const app = createApp(App)

app.use(createPinia())

// app.use(VeeValidate)

app.mount('#app')
