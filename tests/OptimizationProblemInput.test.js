import { mount } from '@vue/test-utils';
import OptimizationProblemInput from '../src/components/OptimizationProblemInput.vue';
import { createTestingPinia } from '@pinia/testing';
import { useOptimizationStore } from '../src/businesslogic/optimizationStore';
import * as highsSolver from "../src/businesslogic/solver/highsSolver.js";
import * as inputToLPInterface from "../src/businesslogic/inputToLPInterface.js";
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick } from 'vue';

vi.mock('../src/businesslogic/solver/highsSolver.js', () => ({
    solveLP: vi.fn(),
}));

vi.mock('../src/businesslogic/inputToLPInterface.js', () => ({
    generateLPFile: vi.fn(),
}));

describe('OptimizationProblemInput.vue', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        wrapper = mount(OptimizationProblemInput, {
            global: {
                plugins: [createTestingPinia({
                    stubActions: false, // Ensure that actions like `selectOptimization` work
                })],
                mocks: {
                    $t: (msg) => msg, // Mock translation
                },
            },
        });
        store = useOptimizationStore();
    });

    it('renders correctly and has the necessary elements', () => {
        expect(wrapper.find('.input-container').exists()).toBe(true);
        expect(wrapper.findAll('.input-container__selection-optimization')).toHaveLength(2); // Two buttons for Minimize/Maximize
        expect(wrapper.find('.input-container__main-content').exists()).toBe(true);
        expect(wrapper.findAll('.input-container__main-button')).toHaveLength(2); // Add Constraint and Solve buttons
        expect(wrapper.find('.input-container__bounds').exists()).toBe(true); // Bounds container
    });

    it('selects Minimize and Maximize optimization correctly', async () => {
        const minimizeButton = wrapper.findAll('.input-container__selection-optimization').at(0);
        const maximizeButton = wrapper.findAll('.input-container__selection-optimization').at(1);

        await minimizeButton.trigger('click');
        await nextTick();

        expect(store.selectedOptimization).toBe('Minimize');
        expect(wrapper.vm.isMinimizationSelected).toBe(true);

        await maximizeButton.trigger('click');
        await nextTick();

        expect(store.selectedOptimization).toBe('Maximize');
        expect(wrapper.vm.isMaximizationSelected).toBe(true);
    });

    it('updates the objective function and variables on input', async () => {
        const objectiveFunctionInput = wrapper.find('#objectiveFunction');

        await objectiveFunctionInput.setValue('3x + 2y');
        await nextTick();

        expect(store.objectiveFunction).toBe('3x + 2y');
        expect(store.variables).toEqual(['x', 'y']); // Ensure variables are extracted and stored correctly
    });

    it('adds a new constraint when the Add Constraint button is clicked', async () => {
        const addConstraintButton = wrapper.findAll('.input-container__main-button').at(0); // First main button (Add Constraint)

        await addConstraintButton.trigger('click');
        await nextTick();

        expect(store.constraints).toHaveLength(2); // Check if a constraint was added
        expect(wrapper.find('.input-container__constraint-wrapper').exists()).toBe(true); // Ensure constraint input appears
    });

    it('updates the constraint content on input', async () => {
        store.addConstraint();
        await nextTick();

        const constraintInput = wrapper.find('.input-container__constraint');

        await constraintInput.setValue('x + y <= 10');
        await nextTick();

        expect(store.constraints[0].content).toBe('x + y <= 10');
    });

    it('updates bounds correctly when bound input is changed', async () => {
        // Set variables in the store for bounds input fields to appear
        store.variables = ['x', 'y'];
        await nextTick();

        const boundInputs = wrapper.findAll('.boundTextField');
        expect(boundInputs).toHaveLength(8); // Two variables with two bound inputs each (upper and lower)

        await boundInputs.at(0).setValue('0'); // Lower bound for x
        await boundInputs.at(1).setValue('5'); // Upper bound for x
        await boundInputs.at(2).setValue('1'); // Lower bound for y
        await boundInputs.at(3).setValue('10'); // Upper bound for y

        expect(store.bounds).toEqual([
            "0 <= x <= 5",
            "1 <= y <= 10"
        ]);
    });

    it('calls solveLP with the correct parameters when Solve button is clicked', async () => {
        const solveButton = wrapper.findAll('.input-container__main-button').at(1); // Second main button (Solve)

        store.selectedOptimization = 'Minimize';
        store.setObjectiveFunction('x + y');
        store.constraints.push({ id: 1, content: 'x + y <= 10' });
        store.bounds = [
            { lowerBound: '0', upperBound: '5', variable: 'x' },
            { lowerBound: '1', upperBound: '10', variable: 'y' }
        ];

        inputToLPInterface.generateLPFile.mockReturnValue('Generated LP Content');
        highsSolver.solveLP.mockResolvedValue({ status: 'success', result: { x: 1, y: 2 } });

        await solveButton.trigger('click');
        await nextTick();

        expect(highsSolver.solveLP).toHaveBeenCalledWith('Generated LP Content');
    });

    // New test for the bounds update methods
});



/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/