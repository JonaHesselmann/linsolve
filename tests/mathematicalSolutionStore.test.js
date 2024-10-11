import { setActivePinia, createPinia } from 'pinia';
import { useMathematicalSolution } from '../src/businesslogic/mathematicalSolutionStore';
import { useOptimizationStore } from '../src/businesslogic/optimizationStore';
import * as highsSolver from '../src/businesslogic/solver/highsSolver';
import * as inputToLPInterface from '../src/businesslogic/inputToLPInterface';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useMathematicalSolution Store', () => {
    let store;
    let optimizationStore;

    beforeEach(() => {
        setActivePinia(createPinia());
        store = useMathematicalSolution();
        optimizationStore = useOptimizationStore();

        // Mock dependencies
        vi.spyOn(inputToLPInterface, 'generateLPFile').mockReturnValue('Mock LP Content');
        vi.spyOn(highsSolver, 'solveLP').mockResolvedValue(new Map([
            ['VariableTable', [
                ['Variable Name', 'Type', 'Lower Bound', 'Upper Bound', 'Primal Value', 'Dual Value'],
                ['x1', undefined, undefined, undefined, 10, undefined],
                ['x2', undefined, undefined, undefined, 5, undefined]
            ]],
            ['Result', ['optimal', 42]],
            ['ConstrainTable', undefined],  // Updated to match actual structure in highsSolver
            ['Walltime', 0]
        ]));
        vi.spyOn(highsSolver, 'returnVariables').mockReturnValue(['x1', 'x2']);
        vi.spyOn(highsSolver, 'returnOptimalResult').mockReturnValue({ optimal: 'Mock Optimal Result' });
        vi.spyOn(highsSolver, 'returnTimeTaken').mockReturnValue([100]);

        // Mock computed properties of optimizationStore
        vi.spyOn(optimizationStore, 'getObjectiveFunction', 'get').mockReturnValue(['objective1']);
        vi.spyOn(optimizationStore, 'getProblemBounds', 'get').mockReturnValue({});
    });

    it('should reset the state properly', () => {
        store.solution = ['test'];
        store.constraints = ['test'];
        store.optimalResult = ['test'];

        store.reset();

        expect(store.solution).toEqual([]);
        expect(store.constraints).toEqual([]);
        expect(store.optimalResult).toEqual([]);
    });

    it('should return the raw array using getRawArray', () => {
        const array = ['item1', 'item2'];
        const result = store.getRawArray(array);
        expect(result).toBe(array);
    });

    it('should solve a specific problem and update the state', async () => {
        optimizationStore.selectedOptimization = 'Mock Optimization';
        optimizationStore.constraints = ['constraint1'];

        await store.solveProblem('spezific', null);

        expect(inputToLPInterface.generateLPFile).toHaveBeenCalledWith(
            optimizationStore.selectedOptimization,
            optimizationStore.getObjectiveFunction,  // This is a getter now
            optimizationStore.constraints,
            optimizationStore.getProblemBounds,  // This is also a getter now
            ''
        );

        expect(highsSolver.solveLP).toHaveBeenCalledWith('Mock LP Content');

        expect(store.solution).toEqual([
            ['Variable Name', 'Type', 'Lower Bound', 'Upper Bound', 'Primal Value', 'Dual Value'],
            ['x1', undefined, undefined, undefined, 10, undefined],
            ['x2', undefined, undefined, undefined, 5, undefined]
        ]);

        expect(store.optimalResult).toEqual(['optimal', 42]);
        expect(store.constraints).toBeUndefined();  // Expect undefined constraints since the mock data has it
        expect(store.walltime).toEqual(0);
    });


    it('should solve a general problem and update the state', async () => {
        const mockData = new Map();
        mockData.set('VariableTable', [
            ['Variable Name', 'Type', 'Lower Bound', 'Upper Bound', 'Primal Value', 'Dual Value'],
            ['x1', undefined, undefined, undefined, 10, undefined],
            ['x2', undefined, undefined, undefined, 5, undefined]
        ]);
        mockData.set('Result', ['optimal', 100]);
        mockData.set('ConstrainTable', ['constraint1', 'constraint2']);
        mockData.set('Walltime', 200);

        await store.solveProblem('general', mockData);

        expect(store.solution).toEqual([
            ['Variable Name', 'Type', 'Lower Bound', 'Upper Bound', 'Primal Value', 'Dual Value'],
            ['x1', undefined, undefined, undefined, 10, undefined],
            ['x2', undefined, undefined, undefined, 5, undefined]
        ]);
        expect(store.optimalResult).toEqual(['optimal', 100]);
        expect(store.constraints).toEqual(['constraint1', 'constraint2']);
        expect(store.walltime).toEqual(200);
    });

    it('should handle an undefined problem kind', async () => {
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

        await store.solveProblem('undefinedKind', null);

        expect(alertMock).toHaveBeenCalledWith('Es wurde ein nicht definiertes Problem versucht zu Lösen');

        alertMock.mockRestore();
    });

    // Test case for solving a file-based problem
    it('should solve a file-based problem and update the state', async () => {
        const mockFileContent = 'Mock LP File Content';

        await store.solveProblem('file', mockFileContent);

        expect(highsSolver.solveLP).toHaveBeenCalledWith(mockFileContent);
        expect(store.solution).toEqual([
            ['Variable Name', 'Type', 'Lower Bound', 'Upper Bound', 'Primal Value', 'Dual Value'],
            ['x1', undefined, undefined, undefined, 10, undefined],
            ['x2', undefined, undefined, undefined, 5, undefined]
        ]);
        expect(store.optimalResult).toEqual(['optimal', 42]);
        expect(store.constraints).toBeUndefined();
        expect(store.walltime).toEqual(0);
    });

    // Test case for handling errors when solving a file-based problem
    it('should handle errors in solving a file-based problem', async () => {
        vi.spyOn(highsSolver, 'solveLP').mockRejectedValueOnce(new Error('Mock Error'));

        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        const mockFileContent = 'Invalid LP File Content';

        await expect(store.solveProblem('file', mockFileContent)).rejects.toThrow('Mock Error');

        consoleErrorSpy.mockRestore();
    });

    // Test case to ensure the state is reset before solving a new problem
    it('should reset the state before solving a new problem', async () => {
        store.solution = ['oldSolution'];
        store.constraints = ['oldConstraint'];
        store.optimalResult = ['oldResult'];

        const mockFileContent = 'Mock LP File Content';

        await store.solveProblem('file', mockFileContent);

        expect(store.solution).toEqual([
            ['Variable Name', 'Type', 'Lower Bound', 'Upper Bound', 'Primal Value', 'Dual Value'],
            ['x1', undefined, undefined, undefined, 10, undefined],
            ['x2', undefined, undefined, undefined, 5, undefined]
        ]);
        expect(store.optimalResult).toEqual(['optimal', 42]);
        expect(store.walltime).toEqual(0);
    });
});
