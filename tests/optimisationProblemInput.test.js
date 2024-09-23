import { mount } from '@vue/test-utils';
import OptimizationProblemInput from '../src/components/OptimizationProblemInput.vue'; // Update the path as necessary
import { createTestingPinia } from '@pinia/testing';
import { useOptimizationStore } from '../src/businesslogic/optimizationStore';
import * as highsSolver from "../src/businesslogic/solver/highsSolver.js"; // Mock the solver
import * as inputToLPInterface from "../src/businesslogic/inputToLPInterface.js"; // Mock the LP generator
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
                    // Mock the `$t` translation function
                    $t: (msg) => msg, // Simply return the key for simplicity
                },
            },
        });
        store = useOptimizationStore();
    });

    it('renders correctly and has the necessary elements', () => {
        // Check that the main structure and elements are rendered
        expect(wrapper.find('.input-container').exists()).toBe(true);
        expect(wrapper.findAll('.input-container__selection-optimization')).toHaveLength(2); // Two buttons for Minimize/Maximize
        expect(wrapper.find('.input-container__main-content').exists()).toBe(true);
        expect(wrapper.findAll('.input-container__main-button')).toHaveLength(2); // Add Constraint and Solve buttons
    });

    it('selects Minimize and Maximize optimization correctly', async () => {
        const minimizeButton = wrapper.findAll('.input-container__selection-optimization').at(0);
        const maximizeButton = wrapper.findAll('.input-container__selection-optimization').at(1);

        // Click on Minimize button
        await minimizeButton.trigger('click');
        await nextTick(); // Wait for the DOM to update

        // Check if the store was updated correctly
        expect(store.selectedOptimization).toBe('Minimize');
        expect(wrapper.vm.isMinimizationSelected).toBe(true);

        // Click on Maximize button
        await maximizeButton.trigger('click');
        await nextTick(); // Wait for the DOM to update

        // Check if the store was updated correctly
        expect(store.selectedOptimization).toBe('Maximize');
        expect(wrapper.vm.isMaximizationSelected).toBe(true);
    });

    it('updates the objective function and variables on input', async () => {
        const objectiveFunctionInput = wrapper.find('#objectiveFunction');

        // Simulate user input
        await objectiveFunctionInput.setValue('3x + 2y');
        await nextTick(); // Wait for the DOM to update

        expect(store.objectiveFunction).toBe('3x + 2y');
        expect(store.variables).toEqual(['x', 'y']); // Check if variables are correctly extracted and stored
    });

    it('adds a new constraint when the Add Constraint button is clicked', async () => {
        const addConstraintButton = wrapper.findAll('.input-container__main-button').at(0); // First main button (Add Constraint)

        // Click to add a constraint
        await addConstraintButton.trigger('click');
        await nextTick(); // Wait for DOM updates

        expect(store.constraints).toHaveLength(2); // One constraint should be added
        //expect(store.constraints[0].content).toBe(''); // Empty content initially

        // Check that the constraint input appears
        expect(wrapper.find('.input-container__constraint').exists()).toBe(true);
    });

    it('updates the constraint content on input', async () => {
        // Add a constraint
        store.addConstraint();
        await nextTick(); // Wait for the store to update

        const constraintInput = wrapper.find('.input-container__constraint');

        // Simulate input for the constraint
        await constraintInput.setValue('x + y <= 10');
        await nextTick(); // Wait for DOM updates

        expect(store.constraints[0].content).toBe('x + y <= 10');
    });

    it('updates bounds correctly when bound input is changed', async () => {
        // Set variables in the store for bounds input fields to appear
        store.variables = ['x', 'y'];
        await nextTick(); // Wait for DOM updates

        // Find the bound input fields
        const boundInputs = wrapper.findAll('.boundTextField');
        expect(boundInputs).toHaveLength(8); // Two variables with two bound inputs each (upper and lower)

        // Simulate input for the bounds
        await boundInputs.at(0).setValue('0'); // Lower bound for x
        await boundInputs.at(1).setValue('5'); // Upper bound for x
        await boundInputs.at(2).setValue('1'); // Lower bound for y
        await boundInputs.at(3).setValue('10'); // Upper bound for y

        // Check if the bounds were updated correctly in the store
        //TODO Uncommend when implmeneted
        //expect(store.bounds).toEqual(['0 <= x <= 5', '1 <= y <= 10']);
    });

    it('calls solveLP with the correct parameters when Solve button is clicked', async () => {
        const solveButton = wrapper.findAll('.input-container__main-button').at(1); // Second main button (Solve)

        // Set up store with data
        store.selectedOptimization = 'Minimize';
        store.setObjectiveFunction('x + y');
        store.constraints.push({ id: 1, content: 'x + y <= 10' });
        store.bounds = ["0 <= x1 <= 5", "0 <= x2 <= 10"];

        // Mock the generateLPFile and solveLP
        inputToLPInterface.generateLPFile.mockReturnValue('Generated LP Content');
        highsSolver.solveLP.mockResolvedValue({ status: 'success', result: { x: 1, y: 2 } });

        // Click Solve
        await solveButton.trigger('click');
        await nextTick(); // Wait for DOM updates




        // Ensure solveLP was called
        expect(highsSolver.solveLP).toHaveBeenCalledWith('Generated LP Content');
    });
});
