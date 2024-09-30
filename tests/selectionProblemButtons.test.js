/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import selectionProblemButtons from '../src/components/selectionProblemButtons.vue';
import { createRouter, createWebHistory } from 'vue-router';

const mockRoutes = [
  { path: '/', component: { template: '<div>Home</div>' } },
  { path: '/allgemeinesProblem', component: { template: '<div>Allgemeines Problem</div>' } },
  { path: '/spezifischesProblem', component: { template: '<div>Spezifisches Problem</div>' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes: mockRoutes,
});

describe('selectionProblemButtons.vue', () => {
  let wrapper;

  beforeEach(async () => {
    router.push('/'); // Setze den Ausgangspfad auf "/"
    await router.isReady(); // Warten bis der Router initialisiert ist

    wrapper = mount(selectionProblemButtons, {
      global: {
        plugins: [router],
        mocks: {
          $t: (msg) => msg, // Mock the translation function
        },
      },
    });
  });

  it('renders the component correctly', () => {
    // Überprüfe, ob das Haupt-Container-Element gerendert wird
    expect(wrapper.find('.mainButton_container').exists()).toBe(true);

    // Überprüfe, ob die Buttons gerendert werden
    const buttons = wrapper.findAll('.mainButton');
    expect(buttons).toHaveLength(3); // Es gibt 3 Buttons in der Vorlage
  });

  it('renders the correct translated button texts', () => {
    const buttons = wrapper.findAll('.mainButton');

    // Überprüfe die gerenderten Texte der Buttons
    expect(buttons[0].text()).toBe('gerneralProblem'); // Der erste Button sollte "gerneralProblem" zeigen
    expect(buttons[1].text()).toBe('specificProblem'); // Der zweite Button sollte "specificProblem" zeigen
    expect(buttons[2].text()).toBe('importProblem');   // Der dritte Button sollte "importProblem" zeigen
  });

  it('navigates to the correct route when a button is clicked', async () => {
    // Nutze router.push, um die Navigation zu testen
    await router.push('/allgemeinesProblem');
    expect(router.currentRoute.value.fullPath).toBe('/allgemeinesProblem'); // Überprüfe die Route nach der Navigation

    await router.push('/spezifischesProblem');
    expect(router.currentRoute.value.fullPath).toBe('/spezifischesProblem'); // Überprüfe die Route nach der Navigation
  });

  it('renders question mark images for each row', () => {
    // Überprüfe, ob das Fragezeichenbild in jeder Buttonreihe gerendert wird
    const questionMarks = wrapper.findAll('.questionmark');
    expect(questionMarks).toHaveLength(3); // Es gibt drei Reihen, also drei Fragezeichen
  });
});
