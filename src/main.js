import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import BaseInput from './components/BaseInput.vue';
import BaseButton from './components/BaseButton.vue';
import BaseCheckbox from './components/BaseCheckbox.vue';
import BaseMultiselect from './components/BaseMultiselect.vue';

const app = createApp(App);
app.component('BaseInput', BaseInput);
app.component('BaseButton', BaseButton);
app.component('BaseCheckbox', BaseCheckbox);
app.component('BaseMultiselect', BaseMultiselect);

app.mount('#app');
