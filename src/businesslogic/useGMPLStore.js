import { defineStore } from 'pinia';

const GMPL_KEYWORDS = [
  'and', 'else', 'mod', 'union', 'by', 'if', 'not', 'within',
  'cross', 'in', 'or', 'diff', 'inter', 'symdiff', 'div', 'less', 'then'
];

export const useGMPLStore = defineStore('gmpLStore', {
  state: () => ({
    problemInput: '',
    suggestions: [],
    currentWord: '',
    suggestionPosition: { top: 0, left: 0 }
  }),
  actions: {
    updateProblemInput(inputText) {
      this.problemInput = inputText;
      const words = inputText.split(/\s+/); // Split by spaces or new lines
      this.currentWord = words[words.length - 1]; // Get the last word being typed

      this.suggestions = this.getGMPLSuggestions(this.currentWord);
    },
    getGMPLSuggestions(currentWord) {
      if (currentWord.length > 0) {
        return GMPL_KEYWORDS.filter(keyword => keyword.startsWith(currentWord));
      }
      return [];
    },
    insertSuggestion(suggestion) {
      const lastSpaceIndex = this.problemInput.lastIndexOf(' ');
      const beforeLastWord = this.problemInput.slice(0, lastSpaceIndex + 1);
      this.problemInput = beforeLastWord + suggestion + ' ';
      this.suggestions = [];
    },
    updateSuggestionPosition(textarea) {
      const caretPosition = textarea.selectionStart;
      const { top, left } = this.getCaretCoordinates(textarea, caretPosition);
      this.suggestionPosition = { top, left };
    },
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
