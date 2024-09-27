import { mount } from '@vue/test-utils';
import GeneralProblemInput from '../src/components/generalProblemInput.vue'; // Update the path as necessary
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the CalculateGMPL function from the solver
vi.mock('../src/businesslogic/solver/glpk_Wasm_binding.js', () => ({
    CalculateGMPL: vi.fn(),
}));

describe.skip('GeneralProblemInput.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(GeneralProblemInput, {
            global: {
                mocks: {
                    $t: (msg) => msg, // Mock localization function
                },
            },
        });
    });

    it('renders correctly and has the necessary elements', () => {
        // Check that the main elements are rendered
        expect(wrapper.find('.mainContent').exists()).toBe(true);
        expect(wrapper.find('.mainTitel').text()).toBe('gerneralProblem'); // Mocked localization
        expect(wrapper.find('.problemInput').exists()).toBe(true); // The textarea
        expect(wrapper.findAll('.mainButton')).toHaveLength(2); // Two buttons (Import and Solve)
    });

    it('updates the problemInput data property when the textarea input changes', async () => {
        const textarea = wrapper.find('.problemInput');

        // Simulate user input
        await textarea.setValue('Maximize z = 3x + 2y;');

        // Verify that the `problemInput` data property is updated
        expect(wrapper.vm.problemInput).toBe('Maximize z = 3x + 2y;');
    });

    it('calls importProblem method when the Import button is clicked', async () => {
        const importProblemSpy = vi.spyOn(wrapper.vm, 'importProblem');
        const importButton = wrapper.findAll('.mainButton').at(0);

        // Trigger click on the "Import Problem" button
        await importButton.trigger('click');

        // Check if the importProblem method was called
        expect(importProblemSpy).toHaveBeenCalled();
    });

    it('calls solve method when the Solve button is clicked and CalculateGMPL is called', async () => {
        const solveSpy = vi.spyOn(wrapper.vm, 'solve');
        const solveButton = wrapper.findAll('.mainButton').at(1);

        // Set some input
        wrapper.vm.problemInput = 'Minimize z = 2x + y;';

        // Trigger click on the "Solve" button
        await solveButton.trigger('click');

        // Check if the solve method was called
        expect(solveSpy).toHaveBeenCalled();

        // Ensure that CalculateGMPL was called with the correct input
        const { CalculateGMPL } = require('../src/businesslogic/solver/glpk_Wasm_binding.js');
        expect(CalculateGMPL).toHaveBeenCalledWith('Minimize z = 2x + y;');
    });

    it('handles errors in the solve method gracefully', async () => {
        // Mock the CalculateGMPL function to throw an error
        const { CalculateGMPL } = require('../src/businesslogic/solver/glpk_Wasm_binding.js');
        CalculateGMPL.mockImplementation(() => {
            throw new Error('Calculation error');
        });

        const solveButton = wrapper.findAll('.mainButton').at(1);

        // Spy on console.error to check error handling
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        // Trigger click on the "Solve" button
        await solveButton.trigger('click');

        // Ensure that the error was caught and logged
        expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to solve the optimization problem:', new Error('Calculation error'));

        // Restore the original console.error implementation
        consoleErrorSpy.mockRestore();
    });
});
