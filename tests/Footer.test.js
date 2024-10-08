/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import GeneralProblemInput from '../src/components/generalProblemInput.vue'; // Adjust the path accordingly
import { useEditorStore } from '../src/businesslogic/useEditorStore.js'; // Adjust path to your editor store
import { useMathematicalSolution } from '../src/businesslogic/mathematicalSolutionStore.js'; // Adjust path to your solution store
import { createRouter, createMemoryHistory } from 'vue-router';

// Mock the web worker globally
class MockWorker {
  constructor(scriptUrl) {
    this.onmessage = null;
    this.onerror = null;
    this.scriptUrl = scriptUrl;
  }

  postMessage(message) {
    if (this.onmessage) {
      this.onmessage({ data: 'mockResultData' });
    }
  }

  terminate() {}
}

// Stub the global Worker
vi.stubGlobal('Worker', MockWorker);

// Create a mock router for the test
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/result', name: 'result' }, // Define the result route for testing
  ],
});

vi.spyOn(router, 'push'); // Spy on the push method to track its calls

describe('GeneralProblemInput.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(GeneralProblemInput, {
      global: {
        plugins: [
          createTestingPinia({ stubActions: false }), // Use actual Pinia action stubs
          router, // Inject the mock router into the test
        ],
        mocks: {
          $t: (msg) => msg, // Mock translation function
        },
      },
    });
  });

  it('should initialize the editor on mount', () => {
    const editorStore = useEditorStore();
    expect(editorStore.initEditor).toHaveBeenCalled(); // Ensure editor initialization happens
  });

  it('should call solve and use the web worker correctly', async () => {
    const editorStore = useEditorStore();

    // Mock the editor content for the test
    editorStore.editor = {
      state: {
        doc: {
          toString: () => 'mockProblemInput',
        },
      },
    };

    // Trigger the solve function
    await wrapper.vm.solve();

    // Check that the problem input was extracted from the editor
    expect(editorStore.editor.state.doc.toString()).toBe('mockProblemInput');

    // Check that the web worker sends data back
    const mathematicalSolutionStore = useMathematicalSolution();
    expect(mathematicalSolutionStore.solveProblem).toHaveBeenCalledWith('general', 'mockResultData');
  });

  it('should navigate to the result page after solving', async () => {
    // Trigger the solve function
    await wrapper.vm.solve();

    // Check that the router pushes the user to the "/result" page
    expect(router.push).toHaveBeenCalledWith('/result');
  });

  it('should render the editor container and buttons', () => {
    // Check for the presence of the editor container
    const editorContainer = wrapper.find('.problemInput');
    expect(editorContainer.exists()).toBe(true);

    // Check for the presence of buttons
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(2);

    // Check button texts
    expect(buttons[0].text()).toBe(wrapper.vm.$t('importProblem'));
    expect(buttons[1].text()).toBe(wrapper.vm.$t('solve'));
  });

  it('should trigger the solve method on button click', async () => {
    const solveSpy = vi.spyOn(wrapper.vm, 'solve');
    const solveButton = wrapper.findAll('button').at(1); // Second button is "solve"

    await solveButton.trigger('click');

    expect(solveSpy).toHaveBeenCalled();
  });
});
