import { setActivePinia, createPinia } from 'pinia';
import { useGMPLStore } from '../src/businesslogic/useGMPLStore.js'; // Adjust the path as per your file structure
import { describe, it, expect, beforeEach, vi } from 'vitest'; // Importing from Vitest

// Set up the Pinia store
beforeEach(() => {
  setActivePinia(createPinia());
});

describe('useGMPLStore', () => {

  // Test if the store initializes correctly
  it('should initialize with default state', () => {
    const store = useGMPLStore();

    // Checking the initial state of the store
    expect(store.problemInput).toBe('');
    expect(store.suggestions).toEqual([]);
    expect(store.currentWord).toBe('');
    expect(store.suggestionPosition).toEqual({ top: 0, left: 0 });
  });

  // Test if updateProblemInput updates the problemInput and suggestions correctly
  it('should update problemInput and provide suggestions based on current word', () => {
    const store = useGMPLStore();

    // Sample input
    const input = 'this is a test and';
    store.updateProblemInput(input);

    // Expect problemInput to match the input
    expect(store.problemInput).toBe(input);

    // The current word being typed should be 'and'
    expect(store.currentWord).toBe('and');

    // Suggestions should return keywords that match 'and'
    expect(store.suggestions).toContain('and');
    expect(store.suggestions.length).toBe(1);
  });

  // Test getGMPLSuggestions function directly
  it('should return matching GMPL keywords based on the current word', () => {
    const store = useGMPLStore();

    const suggestions = store.getGMPLSuggestions('an');
    
    // 'and' should be returned as it starts with 'an'
    expect(suggestions).toContain('and');
    expect(suggestions.length).toBe(1);
  });

  // Test if insertSuggestion replaces the current word and clears suggestions
  it('should insert selected suggestion and update problemInput', () => {
    const store = useGMPLStore();

    store.updateProblemInput('This is a mod');
    store.insertSuggestion('mod');

    // Expect problemInput to be updated with 'mod'
    expect(store.problemInput).toBe('This is a mod ');

    // Suggestions should be cleared after insertion
    expect(store.suggestions).toEqual([]);
  });

  // Test if updateSuggestionPosition correctly updates the suggestion dropdown position
  it('should update suggestionPosition based on caret position in textarea', () => {
    const store = useGMPLStore();

    // Mock textarea DOM element
    const textarea = {
      selectionStart: 5,
      offsetTop: 100,
      offsetLeft: 50,
      scrollTop: 0,
      scrollLeft: 0,
      value: 'test value'
    };

    // Mock the getCaretCoordinates method
    store.getCaretCoordinates = vi.fn(() => ({ top: 120, left: 80 }));

    store.updateSuggestionPosition(textarea);

    // Expect suggestionPosition to be updated with the calculated position
    expect(store.suggestionPosition).toEqual({ top: 120, left: 80 });
  });

  // Test if getCaretCoordinates correctly calculates the caret position
  it('should calculate the correct caret coordinates', () => {
    const store = useGMPLStore();

    // Mock textarea element
    const textarea = {
      value: 'this is a test',
      offsetTop: 100,
      offsetLeft: 50,
      scrollTop: 10,
      scrollLeft: 5
    };

    // Call getCaretCoordinates method for a specific position
    const position = 10;  // Caret at position 10
    const coordinates = store.getCaretCoordinates(textarea, position);

    // The coordinates should be adjusted based on caret and scroll positions
    expect(coordinates.top).toBeGreaterThan(100); // Adjust as per your element structure
    expect(coordinates.left).toBeGreaterThan(40);
  });
});

