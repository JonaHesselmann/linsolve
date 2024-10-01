import { mount } from '@vue/test-utils';
import GeneralProblemInput from '../src/components/generalProblemInput.vue'; // Update the path as necessary
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useGMPLStore } from '../src/businesslogic/useGMPLStore'; // Import the Pinia store

// Mock the Pinia store
vi.mock('../src/businesslogic/useGMPLStore', () => ({
    useGMPLStore: vi.fn(),
}));

describe('GeneralProblemInput.vue', () => {
    let wrapper;
    let gmplStore;

    beforeEach(() => {
        // Mock the Pinia store state and methods
        gmplStore = {
            problemInput: '',
            suggestions: [],
            suggestionPosition: { top: 0, left: 0 },
            updateProblemInput: vi.fn(),
            updateSuggestionPosition: vi.fn(),
            insertSuggestion: vi.fn(),
            importProblem: vi.fn(),
        };

        // Mock the useGMPLStore to return the mocked store
        useGMPLStore.mockReturnValue(gmplStore);

        // Mount the component
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

    it('updates the problemInput in the store when the textarea input changes', async () => {
        const textarea = wrapper.find('.problemInput');

        // Simulate user input
        await textarea.setValue('Maximize z = 3x + 2y;');

        // Verify that the `updateProblemInput` action in the store is called
        expect(gmplStore.updateProblemInput).toHaveBeenCalledWith('Maximize z = 3x + 2y;');
    });

    it('calls importProblem method from the store when the Import button is clicked', async () => {
        const importButton = wrapper.findAll('.mainButton').at(0);

        // Trigger click on the "Import Problem" button
        await importButton.trigger('click');

        // Check if the importProblem method from the store was called
        expect(gmplStore.importProblem).toHaveBeenCalled();
    });

    it('calls solve method and posts the problemInput to the worker', async () => {
        const solveButton = wrapper.findAll('.mainButton').at(1);

        // Mock Worker and postMessage method
        const mockWorker = {
            postMessage: vi.fn(),
            onmessage: null,
            onerror: null,
        };

        global.Worker = vi.fn(() => mockWorker); // Mock the Worker constructor

        // Set some input in the store's problemInput
        gmplStore.problemInput = 'Minimize z = 2x + y;';

        // Trigger click on the "Solve" button
        await solveButton.trigger('click');

        // Check if the worker's postMessage was called with the correct problemInput
        expect(mockWorker.postMessage).toHaveBeenCalledWith('Minimize z = 2x + y;');
    });

    it('handles worker errors gracefully', async () => {
        const solveButton = wrapper.findAll('.mainButton').at(1);

        // Mock Worker and simulate error event
        const mockWorker = {
            postMessage: vi.fn(),
            onmessage: null,
            onerror: null,
        };

        global.Worker = vi.fn(() => mockWorker); // Mock the Worker constructor

        // Spy on console.error to check error handling
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        // Simulate worker error
        mockWorker.onerror = (e) => {
            consoleErrorSpy(e);
        };

        // Trigger click on the "Solve" button
        await solveButton.trigger('click');

        // Simulate error thrown by the worker
        mockWorker.onerror(new Error('Worker error'));

        // Ensure that the error was caught and logged
        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Worker error'));

        // Restore the original console.error implementation
        consoleErrorSpy.mockRestore();
    });

});
