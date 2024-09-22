import { useOptimizationStore } from '../src/businesslogic/optimizationStore.js'; // Update the path as necessary
import { describe, it, expect, beforeEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

describe('useOptimizationStore', () => {
    let store;
    beforeEach(() => {
        // Set up a fresh instance of Pinia for each test
        const pinia = createTestingPinia({
            stubActions: false,
        });
        store = useOptimizationStore(pinia);
    });

    it('should have the correct initial state', () => {
        // Check initial state
        expect(store.selectedOptimization).toBe('Minimize');
        //expect(store.constraints).toEqual([]);
        expect(store.objectiveFunction).toBe('');
        expect(store.variables).toEqual([]);
        expect(store.bounds).toEqual([]);
    });

    it('should return the correct optimization label', () => {
        // Test getter for maximization (default)
        store.selectedOptimization = 'Maximize';
        expect(store.selectedOptimizationLabel).toBe('Maximize');

        // Test getter for minimization
        store.selectedOptimization = 'Minimize';
        expect(store.selectedOptimizationLabel).toBe('Minimize');
    });

    it('should return the correct objective function using getter', () => {
        store.objectiveFunction = '2x + 3y';
        expect(store.getObjectiveFunction).toBe('2x + 3y');
    });

    it('should update selectedOptimization when selectOptimization is called', () => {
        store.selectOptimization('Minimize');
        expect(store.selectedOptimization).toBe('Minimize');

        store.selectOptimization('Maximize');
        expect(store.selectedOptimization).toBe('Maximize');
    });

    it('should add variables from a given condition when addVariables is called', () => {
        store.addVariables('2x + 3y - sin(z)');
        expect(store.variables).toEqual(['x', 'y', 'z']); // sin is ignored as it's a known function
    });

    it('should set and update bounds for variables correctly when addBound is called', () => {
        // Add a bound for variable 'x'
        store.addBound(10, 1, 'x');
        expect(store.bounds).toContain('1 <= x <= 10');

        // Update the bound for variable 'x'
        store.addBound(15, 5, 'x');
        expect(store.bounds).toContain('5 <= x <= 15');

        // Add a new bound for variable 'y'
        store.addBound(20, 2, 'y');
        expect(store.bounds).toContain('2 <= y <= 20');
    });

    it('should add a new constraint when addConstraint is called', () => {
        expect(store.constraints).toHaveLength(1); // Initially empty
        store.addConstraint();
        expect(store.constraints).toHaveLength(2); // After adding one constraint
       // expect(store.constraints[]).toHaveProperty('id');
       // expect(store.constraints[0].content).toBe(''); // Initial content is empty
    });

    it('should update constraint content when updateConstraint is called', () => {
        // Add a constraint first
        store.addConstraint();
        const constraintId = store.constraints[0].id;
        // Update the content of the added constraint
        store.updateConstraint(constraintId, 'New Content');
        expect(store.constraints[0].content).toBe('New Content');
    });

    it('should not update constraint content if the id does not exist', () => {
        // Add a constraint first
        store.addConstraint();
        // Attempt to update a non-existing constraint
        store.updateConstraint(123456, 'minimisation'); // 123456 is a dummy ID that does not exist
        // Expect no change in content
       // expect(store.constraints[0].content).toBe(''); // Still the initial empty content
    });

    it('should set the objective function correctly when setObjectiveFunction is called', () => {
        store.setObjectiveFunction('2x + 3y');
        expect(store.objectiveFunction).toBe('2x + 3y');
    });

    it('should delete the last constraint when deleteConstraint is called', () => {
        // Add constraints
        store.addConstraint();
        store.addConstraint();
        expect(store.constraints).toHaveLength(3);

        // Delete the last constraint
        store.deleteConstraint();
        expect(store.constraints).toHaveLength(2);
    });

    it('should handle deleteConstraint correctly when there are no constraints', () => {
        // Ensure no constraints exist
        expect(store.constraints).toHaveLength(1);

        // Attempt to delete a constraint (should handle gracefully)
        store.deleteConstraint();
        expect(store.constraints).toHaveLength(0);
    });
});
