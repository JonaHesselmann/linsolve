/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/
import { defineStore } from 'pinia';

const GMPL_KEYWORDS = [
  'and', 'else', 'mod', 'union', 'by', 'if', 'not', 'within',
  'cross', 'in', 'or', 'diff', 'inter', 'symdiff', 'div', 'less', 'then'
];

/**
 * GMPL store that handles the problem input, keyword suggestions, and caret position for auto-complete functionality.
 */
export const useGMPLStore = defineStore('gmpLStore', {
  /**
   * Defines the state for the GMPL store.
   * @returns {Object} The state object containing problem input, suggestions, current word, and suggestion position.
   */
  state: () => ({
    problemInput: '',
    suggestions: [],
    currentWord: '',
    suggestionPosition: { top: 0, left: 0 }
  }),

  /**
   * Defines the actions to update problem input, fetch suggestions, and manage caret position.
   */
  actions: {
    /**
     * Updates the problem input and sets the current word being typed, then fetches keyword suggestions.
     * @param {string} inputText - The full input text from the user.
     */
    updateProblemInput(inputText) {
      this.problemInput = inputText;
      const words = inputText.split(/\s+/); // Split by spaces or new lines
      this.currentWord = words[words.length - 1]; // Get the last word being typed

      this.suggestions = this.getGMPLSuggestions(this.currentWord);
    },

    /**
     * Retrieves GMPL keyword suggestions based on the current word being typed.
     * @param {string} currentWord - The word currently being typed by the user.
     * @returns {Array<string>} A list of GMPL keywords that match the current word.
     */
    getGMPLSuggestions(currentWord) {
      if (currentWord.length > 0) {
        return GMPL_KEYWORDS.filter(keyword => keyword.startsWith(currentWord));
      }
      return [];
    },

    /**
     * Inserts the selected suggestion into the problem input, replacing the current word.
     * @param {string} suggestion - The selected keyword suggestion.
     */
    insertSuggestion(suggestion) {
      const lastSpaceIndex = this.problemInput.lastIndexOf(' ');
      const beforeLastWord = this.problemInput.slice(0, lastSpaceIndex + 1);
      this.problemInput = beforeLastWord + suggestion + ' ';
      this.suggestions = [];
    },

    /**
     * Updates the position of the suggestion dropdown based on the caret position in the textarea.
     * @param {HTMLTextAreaElement} textarea - The textarea DOM element where the user is typing.
     */
    updateSuggestionPosition(textarea) {
      const caretPosition = textarea.selectionStart;
      const { top, left } = this.getCaretCoordinates(textarea, caretPosition);
      this.suggestionPosition = { top, left };
    },

    /**
     * Calculates the coordinates of the caret position within a textarea.
     * This is used to position the suggestion dropdown correctly.
     * @param {HTMLTextAreaElement} element - The textarea DOM element.
     * @param {number} position - The current caret (cursor) position within the textarea.
     * @returns {Object} An object containing the top and left position in pixels.
     */
    getCaretCoordinates(element, position) {
      const div = document.createElement('div');
      const style = getComputedStyle(element);

      // Copy styles from the textarea to the div
      for (const prop of style) {
        div.style[prop] = style[prop];
      }

      div.style.position = 'absolute';
      div.style.visibility = 'hidden';
      div.style.whiteSpace = 'pre-wrap';
      div.style.wordWrap = 'break-word';
      div.style.width = `${element.offsetWidth}px`;

      // Insert the text up to the caret position
      const textBeforeCaret = element.value.substring(0, position);
      const textAfterCaret = element.value.substring(position);
      div.textContent = textBeforeCaret;

      // Place a span where the caret is
      const span = document.createElement('span');
      span.textContent = textAfterCaret || '.';
      div.appendChild(span);

      document.body.appendChild(div);
      const { offsetTop, offsetLeft } = span;
      document.body.removeChild(div);

      return {
        top: offsetTop + element.offsetTop + 20, // Adjust for height of textarea line
        left: offsetLeft + element.offsetLeft
      };
    }
  }
});

