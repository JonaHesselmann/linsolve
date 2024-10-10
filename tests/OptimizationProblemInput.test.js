/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
*/

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import OptimizationProblemInput from '../src/components/OptimizationProblemInput.vue';
import { createTestingPinia } from '@pinia/testing';
import { useOptimizationStore } from '../src/businesslogic/optimizationStore';
import { useMathematicalSolution } from '../src/businesslogic/mathematicalSolutionStore';
import { createRouter, createMemoryHistory } from 'vue-router';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/result', name: 'result', component: { template: '<div>Result Page</div>' } }],
});


vi.spyOn(router, 'push');

describe('OptimizationProblemInput.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(OptimizationProblemInput, {
      global: {
        plugins: [createTestingPinia({ stubActions: false }), router],
        mocks: {
          $t: (msg) => msg, // Mock translation
          $i18n: {
            locale: 'en',
          },
        },
      },
    });
  });

  it('should render bounds input fields for each variable', async () => {
    const optimizationStore = useOptimizationStore();
    optimizationStore.variables = ['x1', 'x2']; // Ensure only two variables are provided
    wrapper.vm.bounds = [
      { lowerBound: null, upperBound: null }, 
      { lowerBound: null, upperBound: null }
    ];

    await wrapper.vm.$nextTick();

    // Filter to only the desktop version of bounds input fields
    const bounds = wrapper.findAll('.input-container__bounds .bound input[type="number"]');
    expect(bounds.length).toBe(4); // Two variables => 4 input fields (2 for each variable)
  });

  it('should update lower and upper bounds when input fields change', async () => {
    const optimizationStore = useOptimizationStore();
    optimizationStore.variables = ['x1'];
    wrapper.vm.bounds = [{ lowerBound: null, upperBound: null }];

    await wrapper.vm.$nextTick();

    // Simulate input on lower bound
    const lowerBoundInput = wrapper.findAll('input').at(0);
    await lowerBoundInput.setValue('5');
    expect(wrapper.vm.bounds[0].lowerBound).toBe(5);

    // Simulate input on upper bound
    const upperBoundInput = wrapper.findAll('input').at(1);
    await upperBoundInput.setValue('10');
    expect(wrapper.vm.bounds[0].upperBound).toBe(10);
  });
  it('should trigger the file input click on "Upload File" button click', async () => {
    // Ensure the file upload div is shown by toggling it
    await wrapper.vm.toggleFileUploadDiv();
    await wrapper.vm.$nextTick(); // Ensure the DOM has updated
  
    const fileInput = wrapper.find('input[type="file"]'); // Locate the hidden file input
    expect(fileInput.exists()).toBe(true); // Ensure the file input exists
  
    // Spy on the click event of the file input
    const fileInputClickSpy = vi.spyOn(fileInput.element, 'click');
  
    // Directly invoke the method that triggers the file input click
    wrapper.vm.triggerFileUpload();
    await wrapper.vm.$nextTick(); // Wait for the DOM to update
  
    expect(fileInputClickSpy).toHaveBeenCalled(); // Ensure the file input's click event was triggered
  });
  
  
  it('should open and close popups correctly', async () => {
    // Open the popup
    wrapper.vm.openPopup('bounds');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showPopup).toBe(true);
    expect(wrapper.vm.popupContent).toBe('inputConstraint'); // Ensure popup content is set

    // Close the popup
    wrapper.vm.closePopup();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showPopup).toBe(false);
  });

  it('should navigate to /result after solving the problem', async () => {
    const mathematicalSolutionStore = useMathematicalSolution();
    const solveSpy = vi.spyOn(mathematicalSolutionStore, 'solveProblem');

    const solveButton = wrapper.findAll('.input-container__main-button').at(2); // Find the "Solve" button
    await solveButton.trigger('click');

    expect(solveSpy).toHaveBeenCalledWith('spezific'); // Ensure solving is triggered with correct argument
    expect(router.push).toHaveBeenCalledWith('/result'); // Ensure router navigates to the result page
  });

  it('should add a new constraint when "Add Constraint" button is clicked', async () => {
    const optimizationStore = useOptimizationStore();
    const addConstraintSpy = vi.spyOn(optimizationStore, 'addConstraint');

    const addConstraintButton = wrapper.findAll('.input-container__main-button').at(1); // Find "Add Constraint" button
    await addConstraintButton.trigger('click');

    expect(addConstraintSpy).toHaveBeenCalled(); // Ensure constraint is added
  });
});
