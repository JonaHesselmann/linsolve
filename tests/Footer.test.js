// tests/Footer.test.js
import { render } from '@testing-library/vue';
import { createRouter, createWebHistory } from 'vue-router';
import Footer from '../src/components/Footer.vue';
import { expect } from 'vitest'; // Import expect from vitest

describe('Footer.vue', () => {
  it('renders links correctly', () => {
    const routes = [
      { path: '/', component: { template: '<div>Home</div>' } }, // Add root route
      { path: '/about', component: { template: '<div>About</div>' } },
      { path: '/agb', component: { template: '<div>AGB</div>' } },
      { path: '/imprint', component: { template: '<div>Imprint</div>' } },
      { path: '/privacyPolicy', component: { template: '<div>Privacy Policy</div>' } },
    ];

    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    const { getByText } = render(Footer, {
      global: {
        plugins: [router],

        mocks: {
          $t: (msg) => msg, // Mock translation
        },
      },
    });

    // Check if the links render correctly using Chai assertions
    expect(getByText(/documentation/i)).to.exist; // Use .to.exist
    expect(getByText(/aboutUs/i)).to.exist;
    expect(getByText(/gtcs/i)).to.exist;
    expect(getByText(/imprint/i)).to.exist;
    expect(getByText(/privacyPolicy/i)).to.exist;
  });
});
