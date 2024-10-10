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
        vi.spyOn(highsSolver, 'solveLP').mockResolvedValue({ result: 'Mock Solver Result' });
        vi.spyOn(highsSolver, 'returnVariables').mockReturnValue(['var1', 'var2']);
        vi.spyOn(highsSolver, 'returnOptimalResult').mockReturnValue({ optimal: 'Mock Optimal Result' });
        vi.spyOn(highsSolver, 'returnTimeTaken').mockReturnValue([100]);

        // Mock computed properties of optimizationStore
        vi.spyOn(optimizationStore, 'getObjectiveFunction', 'get').mockReturnValue(['objective1']);
        vi.spyOn(optimizationStore, 'getProblemBounds', 'get').mockReturnValue({}); // Mock the getter for getProblemBounds
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
            optimizationStore.getObjectiveFunction, // This is a getter now
            optimizationStore.constraints,
            optimizationStore.getProblemBounds, // This is also a getter now
            ''
        );

        expect(highsSolver.solveLP).toHaveBeenCalledWith('Mock LP Content');
        expect(highsSolver.returnVariables).toHaveBeenCalled();
        expect(highsSolver.returnOptimalResult).toHaveBeenCalled();
        expect(store.solution).toEqual(['var1', 'var2']);
        expect(store.optimalResult).toEqual({ optimal: 'Mock Optimal Result' });
        expect(store.walltime).toEqual([100]);
    });

    it('should handle missing objective function or constraints in specific problems', async () => {
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

        // Test missing objective function
        vi.spyOn(optimizationStore, 'getObjectiveFunction', 'get').mockReturnValue([]);
        optimizationStore.constraints = ['constraint1'];

        await store.solveProblem('spezific', null);

        expect(alertMock).toHaveBeenCalledWith("Error:missing objective function");

        // Test missing constraints
        vi.spyOn(optimizationStore, 'getObjectiveFunction', 'get').mockReturnValue(['objective1']);
        optimizationStore.constraints = [];

        await store.solveProblem('spezific', null);

        expect(alertMock).toHaveBeenCalledWith("Error:missing constraints");

        alertMock.mockRestore();
    });

    it('should solve a general problem and update the state', async () => {
        const mockData = new Map();
        mockData.set('VariableTable', ['x1', 'x2']);
        mockData.set('Result', { optimal: 100 });
        mockData.set('ConstrainTable', ['constraint1', 'constraint2']);
        mockData.set('Walltime', [200]);

        await store.solveProblem('general', mockData);

        expect(store.solution).toEqual(['x1', 'x2']);
        expect(store.optimalResult).toEqual({ optimal: 100 });
        expect(store.constraints).toEqual(['constraint1', 'constraint2']);
        expect(store.walltime).toEqual([200]);
    });

    it('should handle an undefined problem kind', async () => {
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

        await store.solveProblem('undefinedKind', null);

        expect(alertMock).toHaveBeenCalledWith('Es wurde ein nicht definiertes Problem versucht zu Lösen');

        alertMock.mockRestore();
    });

    // New Test Case 1: Solving a file-based problem and updating the state
    it('should solve a file-based problem and update the state', async () => {
        const mockFileContent = 'Mock LP File Content';

        await store.solveProblem('file', mockFileContent);

        expect(highsSolver.solveLP).toHaveBeenCalledWith(mockFileContent);
        expect(highsSolver.returnVariables).toHaveBeenCalled();
        expect(highsSolver.returnOptimalResult).toHaveBeenCalled();
        expect(store.solution).toEqual(['var1', 'var2']);
        expect(store.optimalResult).toEqual({ optimal: 'Mock Optimal Result' });
        expect(store.walltime).toEqual([100]);
    });

    // New Test Case 2: Handle errors when solving a file-based problem
    it('should handle errors in solving a file-based problem', async () => {
        // Mock the solveLP to throw an error
        vi.spyOn(highsSolver, 'solveLP').mockRejectedValueOnce(new Error('Mock Error'));
    
        // Spy on console.error to check if the error is logged
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
        const mockFileContent = 'Invalid LP File Content';
    
        // Execute solveProblem and ensure the promise is rejected
        await expect(store.solveProblem('file', mockFileContent)).rejects.toThrow('Mock Error');
    
       
        // Restore the original console.error behavior
        consoleErrorSpy.mockRestore();
    });
    
    
    

    // New Test Case 3: Ensure the state is reset when solving a new problem
    it('should reset the state before solving a new problem', async () => {
        // Set the store with old data
        store.solution = ['oldSolution'];
        store.constraints = ['oldConstraint'];
        store.optimalResult = ['oldResult'];
    
     
    
        const mockFileContent = 'Mock LP File Content';
        
        // Call solveProblem and expect reset to have been called
        await store.solveProblem('file', mockFileContent);
    
        
        // Expect the state to have been reset before solving the new problem
        expect(store.solution).toEqual(['var1', 'var2']); // New solution
        expect(store.optimalResult).toEqual({ optimal: 'Mock Optimal Result' }); // New optimal result
       
        expect(store.walltime).toEqual([100]); // New walltime
    });
    
    
    
});
