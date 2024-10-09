/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/
import { describe, it, expect, beforeEach } from 'vitest';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { gmpl, gmplHighlight } from '../src/businesslogic/gmpLanguage.js'; // Adjust the path to your gmpLanguage file
import { syntaxHighlighting } from '@codemirror/language';

// Helper function to create an editor instance with GMPL language highlighting
function createEditor(content) {
    return new EditorView({
        state: EditorState.create({
            doc: content,
            extensions: [
                gmpl(), // GMPL language mode
                syntaxHighlighting(gmplHighlight), // GMPL syntax highlighting
            ],
        }),
    });
}

// Helper function to extract the token type at a given position
function getTokenTypeAt(editor, pos) {
    const tree = editor.state.tree;
    let tokenType = null;

    tree.iterate({
        from: pos,
        to: pos + 1,
        enter: node => {
            tokenType = node.type.name; // Get the token type
        }
    });

    return tokenType;
}

describe('GMPL Language Mode', () => {
    let editor;

    // Reinitialize the editor for each test
    beforeEach(() => {
        editor = null;
    });

    it('should highlight GMPL keywords correctly', () => {
        editor = createEditor('maximize');
        const keywordTokenType = getTokenTypeAt(editor, 0);

        // Ensure that the token type for "maximize" is recognized as a keyword
        expect(keywordTokenType).toBe('keyword');
    });

    it('should highlight strings correctly', () => {
        editor = createEditor('"This is a string"');
        const stringTokenType = getTokenTypeAt(editor, 0);

        // Ensure that the token type for the string is recognized as a string
        expect(stringTokenType).toBe('string');
    });

    it('should highlight comments correctly', () => {
        editor = createEditor('# This is a comment');
        const commentTokenType = getTokenTypeAt(editor, 0);

        // Ensure that the token type for the comment is recognized as a comment
        expect(commentTokenType).toBe('comment');
    });

    it('should highlight numbers correctly', () => {
        editor = createEditor('12345');
        const numberTokenType = getTokenTypeAt(editor, 0);

        // Ensure that the token type for the number is recognized as a number
        expect(numberTokenType).toBe('number');
    });

    it('should highlight operators correctly', () => {
        editor = createEditor(':=');
        const operatorTokenType = getTokenTypeAt(editor, 0);

        // Ensure that the token type for the operator is recognized as an operator
        expect(operatorTokenType).toBe('operator');
    });
});

