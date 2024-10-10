import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import selectionProblemButtons from '../src/components/selectionProblemButtons.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Define mock routes for testing router functionality
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
    // Mock the router to start from the root
    router.push('/');
    await router.isReady();

    // Mount the component with router and mocked i18n object
    wrapper = mount(selectionProblemButtons, {
      global: {
        plugins: [router],
        mocks: {
          $t: (msg) => msg, // Mock the translation function
          $i18n: {
            locale: 'en', // Mock the locale as 'en'
          },
        },
      },
    });
  });

  it('renders the component correctly', () => {
    // Check if the main container renders
    expect(wrapper.find('.mainButton_container').exists()).toBe(true);

    // Check if the buttons are rendered correctly
    const buttons = wrapper.findAll('.mainButton');
    expect(buttons).toHaveLength(2); // There should be 2 buttons
  });

  it('opens and displays the correct popup content when a question mark is clicked', async () => {
    // Click on the first question mark to trigger the popup for the general problem
    await wrapper.findAll('.questionmark')[0].trigger('click');

    // Check if the popup is visible and displays the correct content
    expect(wrapper.find('.popupOverlay').isVisible()).toBe(true);
    expect(wrapper.find('.popupContent').text()).toContain('generalProblemInfo');
  });

  it('closes the popup when clicking outside the popup or the close button', async () => {
    // Open the popup
    await wrapper.findAll('.questionmark')[0].trigger('click');
    expect(wrapper.find('.popupOverlay').isVisible()).toBe(true);

    // Click outside the popup to close it
    await wrapper.find('.popupOverlay').trigger('click');
    expect(wrapper.find('.popupOverlay').exists()).toBe(false);

    // Open the popup again
    await wrapper.findAll('.questionmark')[0].trigger('click');
    expect(wrapper.find('.popupOverlay').isVisible()).toBe(true);

    // Click the close button
    await wrapper.find('.popupContent button').trigger('click');
    expect(wrapper.find('.popupOverlay').exists()).toBe(false);
  });

  it('opens and closes the example popup correctly for general problem', async () => {
    // Open the general problem popup
    await wrapper.findAll('.questionmark')[0].trigger('click');
    expect(wrapper.find('.popupOverlay').isVisible()).toBe(true);

    // Click to open the example popup
    await wrapper.find('.popupContent a').trigger('click');

    // There should now be two popup overlays, the second one being the example popup
    const popups = wrapper.findAll('.popupOverlay');
    expect(popups).toHaveLength(2); // Ensure that both popups are displayed
    expect(popups[1].isVisible()).toBe(true); // The second popup (example popup) should be visible

    // Close the example popup
    await popups[1].trigger('click');

    // After closing, there should only be one popup (the main one), so re-fetch popups
    const updatedPopups = wrapper.findAll('.popupOverlay');
    expect(updatedPopups).toHaveLength(1); // Only the main popup should be left open
  });

});
