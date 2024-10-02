import { defineStore } from 'pinia';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { autocompletion, completeFromList } from '@codemirror/autocomplete';  // Autocompletion feature
import { gmpl } from './gmpLanguage';  // Import the GMPL language tokenizer
import { syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { tags } from '@codemirror/highlight';

// GMPL keywords for autocompletion
const gmplKeywords = ['var', 'maximize', 'subject to', 'solve', 'data', 'end'];

// Define custom GMPL keyword colors for syntax highlighting
const gmplCustomHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: "#FF4500", fontWeight: "bold" },  // GMPL keywords in orange
  { tag: tags.string, color: "#228B22" },                       // Strings in green
  { tag: tags.comment, color: "#808080", fontStyle: "italic" }, // Comments in gray
]);

export const useEditorStore = defineStore('editor', {
  state: () => ({
    editor: null,  // Store the editor instance
  }),
  actions: {
    // Initialize the Codemirror editor with the provided container and content
    initEditor(container, initialContent = '') {
      // Set up GMPL autocompletion
      const gmplCompletions = autocompletion({
        override: [
          completeFromList(gmplKeywords.map(keyword => ({
            label: keyword,
            type: 'keyword',
          }))),
        ],
      });

      // Create the EditorState with GMPL language, autocompletion, and custom highlighting
      const state = EditorState.create({
        doc: initialContent,  // Initialize with empty content or default content
        extensions: [
          gmpl(),                                  // Custom GMPL tokenizer for syntax highlighting
          gmplCompletions,                         // Autocompletion for GMPL keywords
          syntaxHighlighting(gmplCustomHighlight), // Apply custom syntax highlighting
          EditorView.editable.of(true),            // Make the editor editable
          EditorView.lineWrapping,                 // Optional: enable line wrapping
        ],
      });

      // Initialize the editor in the container
      this.editor = new EditorView({
        state,
        parent: container,
      });
    },
  },
});
