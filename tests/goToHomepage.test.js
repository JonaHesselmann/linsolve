/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/

import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ArrowContainer from '../src/components/goToHomepage.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Mock-Routen für den Router-Link-Test
const mockRoutes = [
  { path: '/', component: { template: '<div>Home</div>' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes: mockRoutes,
});

describe('ArrowContainer.vue', () => {
  let wrapper;

  beforeEach(async () => {
    router.push('/'); // Setze den Ausgangspfad
    await router.isReady(); // Warten bis der Router initialisiert ist

    wrapper = mount(ArrowContainer, {
      global: {
        plugins: [router],
        mocks: {
          $t: (msg) => msg, // Mock die Übersetzungsfunktion
        },
      },
    });
  });

  it('renders the component correctly', () => {
    // Überprüfe, ob das Container-Element vorhanden ist
    expect(wrapper.find('.arrow-container').exists()).toBe(true);

    // Überprüfe, ob der Router-Link vorhanden ist
    const routerLink = wrapper.findComponent({ name: 'RouterLink' });
    expect(routerLink.exists()).toBe(true);
    expect(routerLink.props().to).toBe('/'); // Überprüfe das Ziel des Router-Links
  });

  // it('renders the arrow image correctly', () => {
  //   // Überprüfe, ob das Bild korrekt gerendert wird
  //   const img = wrapper.find('img');
  //   expect(img.exists()).toBe(true);

  //   // Überprüfe, ob der Pfad das Bild enthält (anstatt den gesamten Pfad zu vergleichen)
  //   expect(img.attributes('src')).toContain('arrow.png'); // Überprüfe, ob der Bildname korrekt ist
  //   expect(img.attributes('alt')).toBe('Go to Homepage'); // Überprüfe den Alternativtext
  // });

  it('renders the text correctly', () => {
    // Überprüfe, ob der Text korrekt gerendert wird
    const text = wrapper.find('p');
    expect(text.exists()).toBe(true);
    expect(text.text()).toBe('goHome'); // Da wir die $t-Funktion gemockt haben, gibt sie 'goHome' zurück
  });

  it('navigates to the home route when the link is clicked', async () => {
    // Simuliere einen Klick auf den Router-Link
    const routerLink = wrapper.findComponent({ name: 'RouterLink' });
    await routerLink.trigger('click');
    
    // Überprüfe, ob die Route nach dem Klick korrekt ist
    expect(router.currentRoute.value.fullPath).toBe('/');
  });
});
