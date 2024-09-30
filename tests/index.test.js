/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/


import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { createRouter, createWebHistory } from 'vue-router';


/**
 * Import your components and router configuration
 */
import SelectionPage from '../src/view/SelectionPage.vue';
import GeneralProblemPage from '../src/view/GeneralProblemPage.vue';
import SpezificProblemPage from '../src/view/SpezificProblemPage.vue';
import Agb from '../src/view/Agb.vue';
import About from '../src/view/About.vue';
import App from '../src/App.vue'; /** Main App component that uses the router */

/** 
 * Define routes as they are in the actual router configuration 
 * */
const routes = [
    {
        path: '/',
        name: 'SelectionPage',
        component: SelectionPage,
    },
    {
        path: '/spezifischesProblem',
        name: 'SpecificProblemPage',
        component: SpezificProblemPage,
    },
    {
        path: '/allgemeinesProblem',
        name: 'GernalProblemPage',
        component: GeneralProblemPage,
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

/**
 * Create a real router instance
 */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

describe('Vue Router with Real Instance', () => {
    beforeEach(async () => {
        /**
         * Make sure the router starts at the initial route
         */
        await router.push('/');
        await router.isReady();
    });

    it('renders SelectionPage component for the / route', async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [router, createTestingPinia()],
                mocks: {
                    $t: (msg) => msg /** Simple mock for translation function */
                },
            },
        });

        await router.push('/');
        await router.isReady();
        expect(wrapper.findComponent(SelectionPage).exists()).toBe(true);
    });

    it('renders SpecificProblemPage component for the /spezifischesProblem route', async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [router, createTestingPinia()],
                mocks: {
                    $t: (msg) => msg /** Simple mock for translation function */
                },
            },
        });

        await router.push('/spezifischesProblem');
        await router.isReady();
        expect(wrapper.findComponent(SpezificProblemPage).exists()).toBe(true);
    });

    it('renders GeneralProblemPage component for the /allgemeinesProblem route', async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [router, createTestingPinia()],
                mocks: {
                    $t: (msg) => msg /** Simple mock for translation function */
                },
            },
        });

        await router.push('/allgemeinesProblem');
        await router.isReady();
        expect(wrapper.findComponent(GeneralProblemPage).exists()).toBe(true);
    });

    it('renders Agb component for the /agb route', async () => {
        const wrapper = mount(App, {
            global: {
                plugins: [router, createTestingPinia()],
                mocks: {
                    $t: (msg) => msg /** Simple mock for translation function */
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
                    $t: (msg) => msg /** Simple mock for translation function */
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
        expect(routePaths).toContain('/spezifischesProblem');
        expect(routePaths).toContain('/allgemeinesProblem');
        expect(routePaths).toContain('/agb');
        expect(routePaths).toContain('/about');
    });
});

