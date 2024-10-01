import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import GeneralProblemInput from '../src/components/generalProblemInput.vue';
import { createTestingPinia } from '@pinia/testing';
import { useGMPLStore } from '../src/businesslogic/useGMPLStore.js';

// Mock the necessary imports
vi.mock('../src/businesslogic/useGMPLStore.js', () => ({
    useGMPLStore: vi.fn(() => ({
        problemInput: '',
        suggestions: [],
        suggestionPosition: { top: 0, left: 0 },
        updateProblemInput: vi.fn(),
        updateSuggestionPosition: vi.fn(),
        insertSuggestion: vi.fn(),
        importProblem: vi.fn(),
    })),
}));

describe.skip('GeneralProblemInput.vue', () => {
    let wrapper;
    let gmplStore;

    beforeEach(() => {
        // Use Pinia for the store
        wrapper = mount(GeneralProblemInput, {
            global: {
                plugins: [createTestingPinia({
                    stubActions: false, // Ensure store actions like `updateProblemInput` work
                })],
                mocks: {
                    $t: (msg) => msg,  // Mock $t for translation
                },
            },
        });

        gmplStore = useGMPLStore();
    });

    it('renders the component correctly', () => {
        // Check that the main content structure and elements are rendered
        expect(wrapper.find('.mainContent').exists()).toBe(true);
        expect(wrapper.find('.mainTitel').exists()).toBe(true);
        expect(wrapper.find('.problemInput').exists()).toBe(true);
        expect(wrapper.find('.buttoncontainer').exists()).toBe(true);
    });

    it('updates the problem input correctly on user input', async () => {
        const inputElement = wrapper.find('.problemInput');
        
        // Simulate GMPL input for a problem like a basic GMPL syntax
        const gmplText = 'maximize z: 3*x + 4*y;\nsubject to\nx + 2*y <= 10;\nend;';
        
        // Set the value directly on the textarea element
        inputElement.element.value = gmplText;

        // Ensure the `input` event is triggered to update the v-model
        await inputElement.trigger('input');

        // Ensure the store's `updateProblemInput` method was called with the GMPL input
        expect(gmplStore.updateProblemInput).toHaveBeenCalledWith(gmplText);
        expect(gmplStore.updateProblemInput).toHaveBeenCalledTimes(1);
    });

    it('updates the suggestion position when user types', async () => {
        const inputElement = wrapper.find('.problemInput');
        
        // Simulate user input and setting the bounding rectangle for suggestion box
        const gmplText = 'maximize z: 3*x + 4*y;\nsubject to\nx + 2*y <= 10;\n';
        inputElement.element.value = gmplText;

        // Mock the bounding rectangle for the suggestion positioning
        const mockBoundingClientRect = { top: 50, left: 100 };
        inputElement.element.getBoundingClientRect = vi.fn(() => mockBoundingClientRect);

        // Trigger the input event
        await inputElement.trigger('input');
        
        // Ensure the suggestion position was updated in the store
        expect(gmplStore.updateSuggestionPosition).toHaveBeenCalledTimes(1);
    });

    it('displays suggestions when available', async () => {
        // Set up the store to have GMPL suggestions
        gmplStore.suggestions = ['x + y <= 10', 'x >= 0', 'y >= 0'];

        // Trigger a re-render and wait for DOM updates
        await wrapper.vm.$nextTick();

        // Check if the suggestion list is displayed
        const suggestionList = wrapper.find('.suggestionsList');
        expect(suggestionList.exists()).toBe(true);

        // Check that the correct number of suggestions is rendered
        const suggestions = suggestionList.findAll('li');
        expect(suggestions).toHaveLength(3);
        expect(suggestions[0].text()).toBe('x + y <= 10');
        expect(suggestions[1].text()).toBe('x >= 0');
        expect(suggestions[2].text()).toBe('y >= 0');
    });

    it('calls insertSuggestion when a suggestion is clicked', async () => {
        // Set up the store to have GMPL suggestions
        gmplStore.suggestions = ['x + y <= 10', 'x >= 0', 'y >= 0'];

        // Trigger a re-render and wait for DOM updates
        await wrapper.vm.$nextTick();

        // Find the suggestion list
        const suggestionList = wrapper.find('.suggestionsList');
        expect(suggestionList.exists()).toBe(true);

        // Find and click the first suggestion
        const firstSuggestion = suggestionList.findAll('li').at(0);
        await firstSuggestion.trigger('click');

        // Ensure the `insertSuggestion` method is called with the correct suggestion
        expect(gmplStore.insertSuggestion).toHaveBeenCalledWith('x + y <= 10');
    });
});
