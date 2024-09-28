/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/


import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import Component from '../src/components/Result_math.vue'; // Adjust the path if necessary
import { useMathematicalSolution } from '../src/businesslogic/mathematicalSolutionStore.js';

describe('ResultMath Component Test', () => {
    let wrapper;
    let mathematicalSolutionStore;

    beforeEach(() => {
        // Create a testing Pinia instance with spies enabled
        const pinia = createTestingPinia({
            createSpy: vi.fn, // Automatically mock all actions
            stubActions: false, // Allow actions to work correctly
        });

        // Access the mathematical solution store
        mathematicalSolutionStore = useMathematicalSolution(pinia);

        // Set the initial state of the store (ensure optimalResult is initialized)
        mathematicalSolutionStore.optimalResult = ['Optimal', 100];
        mathematicalSolutionStore.solution = [['x1', 10], ['x2', 20]];

        // Mount the component with the testing Pinia instance
        wrapper = mount(Component, {
            global: {
                plugins: [pinia],
                mocks: {
                    $t: (msg) => msg // Simple mock for translation function
                },
            },
        });
    });

    it('renders static text correctly', () => {
        // Check if the translated title is rendered (mathematicallySolution)
        expect(wrapper.text()).toContain('mathematicallySolution');
    });

    it('renders error message when the solution is not optimal', () => {
        // Update store state to trigger error message
        mathematicalSolutionStore.optimalResult = ['Not Optimal'];

        // Trigger reactivity with nextTick
        return wrapper.vm.$nextTick().then(() => {
            expect(wrapper.text()).toContain('solutionErrorMessage');
        });
    });

    it('renders solution table when the result is optimal', async () => {
        // Ensure the store has optimal result and solution
        mathematicalSolutionStore.optimalResult = ['Optimal', 100];
        mathematicalSolutionStore.solution = [['x1', 10], ['x2', 20]];

        // Trigger reactivity
        await wrapper.vm.$nextTick();

        // Check if the table is rendered
        expect(wrapper.find('.solution-table').exists()).toBe(true);
        expect(wrapper.findAll('tbody tr')).toHaveLength(2);

        // Check if values are correctly rendered
        const rows = wrapper.findAll('tbody tr');
        expect(rows[0].text()).toContain('x1');
        expect(rows[0].text()).toContain('10');
        expect(rows[1].text()).toContain('x2');
        expect(rows[1].text()).toContain('20');
    });

    it('renders the objective function value when the result is optimal', async () => {
        // Ensure the store has optimal result
        mathematicalSolutionStore.optimalResult = ['Optimal', 150];

        // Trigger reactivity
        await wrapper.vm.$nextTick();

        // Check if the objective function value is rendered
        expect(wrapper.text()).toContain('objectiveFunctionValue');
        expect(wrapper.text()).toContain('150');
    });
});
