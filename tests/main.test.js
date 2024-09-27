/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/


import { describe, it, expect, beforeEach } from 'vitest';
import { createApp } from 'vue';
import { mount } from '@vue/test-utils';
import App from '../src/main.js';
import { createPinia } from 'pinia';
import i18n from '../src/businesslogic/i18n.js';
import SelectionPage from '../src/view/SelectionPage.vue';
import GeneralProblemPage from '../src/view/GeneralProblemPage.vue';
import SpezificProblemPage from '../src/view/SpezificProblemPage.vue';

describe('App Initialization', () => {
    let app;

    beforeEach(() => {
        // Create the app instance  for each subtest
        app = createApp(App);
        app.use(createPinia());
        app.use(i18n)
    });

    it('should create and mount the Vue app', () => {
        // Mount the App component using vue-test-utils
        const wrapper = mount(app);

        // Check if the App component is rendered correctly
        expect(wrapper.exists()).toBe(true);
    });

    it('should mount the app to #app element', () => {
        // Create a mock DOM element for mounting
        const mockElement = document.createElement('div');
        mockElement.id = 'app';
        document.body.appendChild(mockElement);

        // Mount the app to the mock DOM element
        app.mount('#app');

        // Check if the #app element contains the App component content
        expect(mockElement.innerHTML).not.toBe('');
    });
});


