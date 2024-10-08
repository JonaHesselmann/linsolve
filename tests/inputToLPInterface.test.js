/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/

import { describe, it, expect } from 'vitest';
import { generateLPFile } from '../src/businesslogic/inputToLPInterface.js'; // Update the path as necessary

describe('generateLPFile', () => {
    it('should generate the correct LP file with the objective function and constraints', () => {
        const objectiveType = 'Minimize';
        const objectiveFunction = 'x + 2y';
        const constraints = [
            { content: 'x + y <= 10' },
            { content: '2x - y >= 3' }
        ];

        const lpFile = generateLPFile(objectiveType, objectiveFunction, constraints);

        expect(lpFile).toContain('Minimize\n obj: x + 2y');
        expect(lpFile).toContain('Subject To\n c1: x + y <= 10\n c2: 2x - y >= 3');
        expect(lpFile).toContain('End');
    });

    it('should correctly add bounds to the LP file', () => {
        const objectiveType = 'Maximize';
        const objectiveFunction = '3x + 4y';
        const constraints = [{ content: 'x - y = 5' }];
        const bounds = ['x >= 0', 'y <= 5'];

        const lpFile = generateLPFile(objectiveType, objectiveFunction, constraints, bounds);

        expect(lpFile).toContain('Bounds\n x >= 0\n y <= 5');
        expect(lpFile).toContain('End');
    });

    it('should correctly add general and binary variable types', () => {
        const objectiveType = 'Minimize';
        const objectiveFunction = 'x + 2y';
        const constraints = [{ content: 'x + y <= 10' }];
        const variableTypes = {
            general: ['x'],
            binary: ['y']
        };

        const lpFile = generateLPFile(objectiveType, objectiveFunction, constraints, [], variableTypes);

        expect(lpFile).toContain('General\n x');
        expect(lpFile).toContain('Binary\n y');
        expect(lpFile).toContain('End');
    });

    it('should handle cases with no constraints, bounds, or variable types', () => {
        const objectiveType = 'Maximize';
        const objectiveFunction = 'x';

        const lpFile = generateLPFile(objectiveType, objectiveFunction);

        expect(lpFile).toContain('Maximize\n obj: x');
        expect(lpFile).toContain('Subject To\n');
        expect(lpFile).toContain('End');
    });
});


