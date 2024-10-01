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

      // Check if the current line is a comment (starts with '#') and skip auto-completion
      const currentLine = inputText.split('\n').pop(); // Get the last line of input

      if (currentLine.trim().startsWith('#')) {
        this.suggestions = []; // Disable suggestions if it's a comment line
        return;
      }

      const words = currentLine.split(/\s+/); // Split by spaces or new lines
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
    
      this.suggestionPosition = {
        top: top - textarea.scrollTop,
        left: left - textarea.scrollLeft
      };
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

  // List of essential CSS properties required for caret positioning
  const propertiesToCopy = [
    'fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'letterSpacing',
    'textTransform', 'wordWrap', 'whiteSpace', 'wordSpacing', 'lineHeight',
    'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom',
    'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth',
    'boxSizing', 'width'
  ];

  // Copy only the required styles from textarea to the div
  propertiesToCopy.forEach(prop => {
    div.style[prop] = style[prop];
  });

  div.style.position = 'absolute';
  div.style.visibility = 'hidden';
  div.style.whiteSpace = 'pre-wrap';  
  div.style.wordWrap = 'break-word';  
  div.style.width = `${element.offsetWidth}px`;

  // Insert the text up to the caret position
  const textBeforeCaret = element.value.substring(0, position);
  div.textContent = textBeforeCaret;

  // Create a span to calculate the exact position of the caret
  const span = document.createElement('span');
  span.textContent = '\u200B'; // Zero-width space to ensure span exists
  div.appendChild(span);

  document.body.appendChild(div);

  // Get the caret coordinates based on the span position
  const { offsetTop, offsetLeft } = span;

  document.body.removeChild(div);

  return {
    top: offsetTop + element.offsetTop - element.scrollTop,
    left: offsetLeft + element.offsetLeft - element.scrollLeft
  };
}

  }
});
