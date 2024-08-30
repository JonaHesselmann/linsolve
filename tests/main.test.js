import { describe, it, expect, beforeEach } from 'vitest';
import { createApp } from 'vue';
import { mount } from '@vue/test-utils';
import App from '../src/main.js';

describe('App Initialization', () => {
    let app;

    beforeEach(() => {
        // Create the app instance  for each subtest
        app = createApp(App);
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
