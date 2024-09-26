import { describe, it, expect, beforeAll, vi } from 'vitest';
import { solveLP, returnVariables, returnOptimalResult } from '../src/businesslogic/solver/highsSolver.js';
import highs_loader from 'highs';


vi.mock('highs', () => {
    let mockSolve = vi.fn();

    return {
        __esModule: true,
        default: async () => {
            return {
                solve: mockSolve,
            };
        },
    };
});

describe('highsSolver Module', () => {
    let highsMock;

    // Load the highs library mock before running tests
    beforeAll(async () => {
        highsMock = await highs_loader();
    });

    it('should solve an LP problem and return the result', async () => {
        // Mock result that would be returned by highs.solve
        const mockResult = {
            Status: 'optimal',
            ObjectiveValue: 42,
            Columns: {
                x1: { Primal: 10, Name: 'x1' },
                x2: { Primal: 5, Name: 'x2' }
            }
        };

        // Mock the solve function to return the mock result
        highsMock.solve.mockResolvedValueOnce(mockResult);

        const lpContent = `Minimize
 obj: 2 x + 3 y

Subject To
 c1: x + y <= 10

End
`;

        // Call solveLP and verify the result
        const result = await solveLP(lpContent);
        expect(result).toEqual(mockResult);

        // Verify that highs.solve was called with the correct content
        expect(highsMock.solve).toHaveBeenCalledWith(lpContent);

        // Test returnOptimalResult
        const optimalResult = returnOptimalResult();
        expect(optimalResult).toEqual(['optimal', 42]);

        // Test returnVariables
        const variables = returnVariables();
        expect(variables).toEqual([
            ['x1', 10],
            ['x2', 5]
        ]);
    });

    it('should throw an error when the highs.solve function fails', async () => {
        // Mock the solve function to throw an error
        highsMock.solve.mockRejectedValueOnce(new Error('Solver error'));

        const lpContent = `Minimize
 obj: 2 x + 3 y

Subject To
 c1: x + y <= 10

End
`;

        // Call solveLP and expect it to throw an error
        await expect(solveLP(lpContent)).rejects.toThrow('Solver error');

        // Verify that highs.solve was called with the correct content
        expect(highsMock.solve).toHaveBeenCalledWith(lpContent);
    });

    it('should handle empty or malformed LP content gracefully', async () => {
        const lpContent = ''; // Empty content

        // Mock the solve function to throw an error for empty content
        highsMock.solve.mockRejectedValueOnce(new Error('Invalid LP content'));

        // Call solveLP and expect it to throw an error
        await expect(solveLP(lpContent)).rejects.toThrow('Invalid LP content');

        // Verify that highs.solve was called with the correct content
        expect(highsMock.solve).toHaveBeenCalledWith(lpContent);
    });

    it('should return correct variables and optimal result from a valid LP solve', async () => {
        // Mock result for more complex LP problem
        const mockResult = {
            Status: 'optimal',
            ObjectiveValue: 100,
            Columns: {
                x1: { Primal: 20, Name: 'x1' },
                x2: { Primal: 30, Name: 'x2' },
                x3: { Primal: 50, Name: 'x3' }
            }
        };

        // Mock the solve function
        highsMock.solve.mockResolvedValueOnce(mockResult);

        const lpContent = `Minimize
 obj: 5 x1 + 10 x2 + 15 x3

Subject To
 c1: x1 + x2 + x3 <= 100

End
`;

        // Solve the LP problem
        await solveLP(lpContent);

        // Test returnOptimalResult
        const optimalResult = returnOptimalResult();
        expect(optimalResult).toEqual(['optimal', 100]);

        // Test returnVariables
        const variables = returnVariables();
        expect(variables).toEqual([
            ['x1', 20],
            ['x2', 30],
            ['x3', 50]
        ]);
    });
});


/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/