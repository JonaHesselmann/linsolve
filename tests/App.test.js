/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import App from '../src/App.vue';
import SelectionPage from '../src/view/SelectionPage.vue'
import { createTestingPinia } from '@pinia/testing';
import { createI18n } from 'vue-i18n'; // Assuming you're using vue-i18n

// Create a mock router for the test with a sample route
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      component: SelectionPage, // Mock TestComponent for routing
    },
  ],
});

// Mock i18n for the test environment
const i18n = createI18n({
  locale: 'en',
  messages: {
    en: { language: 'Language' },
  },
});

describe('App.vue', () => {
  it('should render the routed component through RouterView', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router, createTestingPinia(), i18n], // Include router, Pinia, and i18n
      },
    });

    // Ensure the router is ready
    await router.isReady();

    // Check if the routed component (TestComponent) is rendered
    expect(wrapper.findComponent(SelectionPage).exists()).toBe(true);
  });
});

