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

// Helper function to create an editor instance
function createEditor(content) {
    return new EditorView({
        state: EditorState.create({
            doc: content,
            extensions: [
                gmpl(), // GMPL language mode

            ],
        }),
    });
}

describe.skip('GMPL Language Mode', () => {
    let editor;

    // Reinitialize the editor for each test
    beforeEach(() => {
        editor = null;
    });

    it.skip('should highlight GMPL keywords correctly', () => {
        editor = createEditor('maximize');
        const keywordToken = editor.state.doc.sliceString(0, 8);

        // Check that the keyword "maximize" is recognized
        expect(keywordToken).toBe('maximize');

        // Verify that it applies the keyword highlighting class
        const tokenStyle = editor.contentDOM.querySelector('.ͼk'); // CodeMirror applies complex class names
        expect(tokenStyle).toBeTruthy(); // The class should be applied
    });

    it('should highlight strings correctly', () => {
        editor = createEditor('"This is a string"');
        const stringToken = editor.state.doc.sliceString(0, 17);

        // Check that the string is correctly parsed
        expect(stringToken).toBe('"This is a string"');

        // Verify that it applies the string highlighting class
        const tokenStyle = editor.contentDOM.querySelector('.ͼs');
        expect(tokenStyle).toBeTruthy(); // Should have a string class
    });

    it('should highlight comments correctly', () => {
        editor = createEditor('# This is a comment');
        const commentToken = editor.state.doc.sliceString(0, 18);

        // Check that the comment is correctly parsed
        expect(commentToken).toBe('# This is a comment');

        // Verify that it applies the comment highlighting class
        const tokenStyle = editor.contentDOM.querySelector('.ͼc');
        expect(tokenStyle).toBeTruthy(); // Should have a comment class
    });

    it('should highlight numbers correctly', () => {
        editor = createEditor('12345');
        const numberToken = editor.state.doc.sliceString(0, 5);

        // Check that the number is correctly parsed
        expect(numberToken).toBe('12345');

        // Verify that it applies the number highlighting class
        const tokenStyle = editor.contentDOM.querySelector('.ͼn');
        expect(tokenStyle).toBeTruthy(); // Should have a number class
    });

    it('should highlight operators correctly', () => {
        editor = createEditor(':=');
        const operatorToken = editor.state.doc.sliceString(0, 2);

        // Check that the operator is correctly parsed
        expect(operatorToken).toBe(':=');

        // Verify that it applies the operator highlighting class
        const tokenStyle = editor.contentDOM.querySelector('.ͼo');
        expect(tokenStyle).toBeTruthy(); // Should have an operator class
    });
});
