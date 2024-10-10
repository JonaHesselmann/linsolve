/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import Component from '../src/view/Result.vue';
import Header from '../src/components/Header.vue';
import Result_math from '../src/components/Result_math.vue';
import Footer from '../src/components/Footer.vue';
import { useMathematicalSolution } from '../src/businesslogic/mathematicalSolutionStore';
import { useOptimizationStore } from '../src/businesslogic/optimizationStore';
import { exportLPFile } from '../src/businesslogic/exportLPFile';

// Mock the exportLPFile function
vi.mock('../src/businesslogic/exportLPFile', () => ({
  exportLPFile: vi.fn(),
}));

describe('Result.vue', () => {
    let wrapper;
    let mathematicalSolutionStore;
    let optimizationStore;

    beforeEach(() => {
        // Mount the component with a testing Pinia instance
        wrapper = mount(Component, {
            global: {
                plugins: [createTestingPinia({ stubActions: false })],
                components: { Header, Result_math, Footer }, // Register components for the test
                mocks: {
                    $t: (msg) => msg, // Mock i18n translation if necessary
                    // Mocking beforeRouteLeave as it's a navigation guard
                    $route: { path: '/' }, // Mock current route
                    $router: { beforeEach: vi.fn() }, // Mock router
                },
            },
        });

        // Get the stores
        mathematicalSolutionStore = useMathematicalSolution();
        optimizationStore = useOptimizationStore();
    });

    // Test: Rendering Child Components
    it('renders Header component', () => {
        expect(wrapper.findComponent(Header).exists()).toBe(true);
    });

    it('renders Result_math component', () => {
        expect(wrapper.findComponent(Result_math).exists()).toBe(true);
    });

    it('renders Footer component', () => {
        expect(wrapper.findComponent(Footer).exists()).toBe(true);
    });

    // Test: Export Button Visibility
    it('displays export button when problemKind is "spezific" or "file"', async () => {
        mathematicalSolutionStore.problemKind = 'spezific'; // Simulate problemKind
        await wrapper.vm.$nextTick();

        const exportButton = wrapper.find('.export-button');
        expect(exportButton.exists()).toBe(true); // Export button should be visible
    });

    it('does not display export button when problemKind is not "spezific" or "file"', async () => {
        mathematicalSolutionStore.problemKind = 'general'; // Simulate a different problemKind
        await wrapper.vm.$nextTick();

        const exportButton = wrapper.find('.export-button');
        expect(exportButton.exists()).toBe(false); // Export button should be hidden
    });

    // Test: Export Functionality
    it('calls exportResults and exportLPFile when export button is clicked', async () => {
        mathematicalSolutionStore.problemKind = 'file'; // Make export button visible
        await wrapper.vm.$nextTick();

        const exportButton = wrapper.find('.export-button');
        expect(exportButton.exists()).toBe(true); // Ensure export button exists

        await exportButton.trigger('click'); // Trigger export button click

        expect(exportLPFile).toHaveBeenCalledWith('lp', optimizationStore); // Ensure exportLPFile is called with correct arguments
    });

    // Test: Route Leave Hook (beforeRouteLeave)
    it('resets the stores when leaving the route', async () => {
        // Mock next function for navigation
        const next = vi.fn();

        // Simulate a route change and call beforeRouteLeave
        await wrapper.vm.$options.beforeRouteLeave.call(wrapper.vm, {}, {}, next);

        expect(mathematicalSolutionStore.reset).toHaveBeenCalled(); // Ensure reset is called on mathematicalSolutionStore
        expect(optimizationStore.reset).toHaveBeenCalled(); // Ensure reset is called on optimizationStore
        expect(next).toHaveBeenCalled(); // Ensure navigation continues with `next()`
    });
});
