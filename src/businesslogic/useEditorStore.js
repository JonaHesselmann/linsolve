/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/


import { defineStore } from 'pinia';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { autocompletion, completeFromList } from '@codemirror/autocomplete';  // Autocompletion feature
import { gmpl } from './gmpLanguage';  // Import the GMPL language tokenizer
import { syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { tags } from '@codemirror/highlight';

// GMPL keywords for autocompletion
/**
 * valid Keywords
 * @type {string[]}
 */
const gmplKeywords = [
  'and', 'by', 'cross', 'data', 'diff', 'div', 'else', 'end', 'for', 'if', 'in', 
  'integer', 'inter', 'less', 'maximize', 'minimize', 'mod', 'model', 'not', 'or', 
  'param', 'printf', 's.t.', 'set', 'solve', 'sum', 'symdiff', 'then', 'to', 'union', 'var', 'within'
];

/**
 * Constructor
 * @type {HighlightStyle} - Codemirror style
 */

// Define custom GMPL keyword colors for syntax highlighting
const gmplCustomHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: "#3358ff", fontWeight: "bold" },  // GMPL keywords in orange
  { tag: tags.string, color: "#af4000" },     
  { tag: tags.operator, color: "#5fb838" },                    // Strings in green
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

      /**
       *  Create the EditorState with GMPL language, autocompletion, and custom highlighting
       * @type {EditorState} - Codemirror State
       */
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
