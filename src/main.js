/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/


import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './businesslogic/i18n';
import { createPinia } from 'pinia';
import router from './router/index.js'
const app = createApp(App);
app.use(createPinia());
app.use(router)
app.use(i18n)
app.mount('#app')


