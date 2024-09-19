import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { createRouter, createWebHistory } from 'vue-router';
import 'mathlive';

// Import your components and router configuration
import Homepage from '../src/view/Homepage.vue';
import Agb from '../src/view/Agb.vue';
import About from '../src/view/About.vue';
import App from '../src/App.vue'; // Main App component that uses the router

// Define routes as they are in the actual router configuration
const routes = [
    {
        path: '/',
        name: 'Homepage',
        component: Homepage,
    },
    {
        path: '/agb',
        name: 'Agb',
        component: Agb,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
];

// Create a real router instance
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

describe('Vue Router with Real Instance', () => {
    beforeEach(async () => {
        // Make sure the router starts at the initial route
        await router.push('/');
        await router.isReady();

    });


    it('renders Homepage component for the / route', async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [router, createTestingPinia()],
                mocks: {
                    $t: (msg) => msg // Simple mock for translation function
                },
            },
        });

        await router.push('/');
        await router.isReady();
        expect(wrapper.findComponent(Homepage).exists()).toBe(true);
    });

    it('renders Agb component for the /agb route', async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [router, createTestingPinia()],
                mocks: {
                    $t: (msg) => msg // Simple mock for translation function
                },

            },
        });

        await router.push('/agb');
        await router.isReady();

        expect(wrapper.findComponent(Agb).exists()).toBe(true);
    });

    it('renders About component for the /about route', async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [router, createTestingPinia()],
                mocks: {
                    $t: (msg) => msg // Simple mock for translation function
                },
            },
        });

        await router.push('/about');
        await router.isReady();

        expect(wrapper.findComponent(About).exists()).toBe(true);
    });

    it('has the correct routes configured', () => {
        const routePaths = router.getRoutes().map(route => route.path);

        expect(routePaths).toContain('/');
        expect(routePaths).toContain('/agb');
        expect(routePaths).toContain('/about');
    });
});
