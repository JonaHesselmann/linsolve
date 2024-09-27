/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/


import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import Component from '../src/view/Result.vue';
import Header from '../src/components/Header.vue';
import Result_math from '../src/components/Result_math.vue';
import Footer from '../src/components/Footer.vue';

describe('YourComponent.vue', () => {
    let wrapper;
    beforeEach(() => {
        // Mount the component with a testing Pinia instance
        wrapper = mount(Component, {
            global: {
                plugins: [createTestingPinia()],
                components: { Header, Result_math, Footer }, // Register components for the test
                mocks: {
                    $t: (msg) => msg, // Mock i18n translation if necessary
                },
            },
        });
    });

    it('renders Header component', () => {
        expect(wrapper.findComponent(Header).exists()).toBe(true);
    });

    it('renders Result_math component', () => {
        expect(wrapper.findComponent(Result_math).exists()).toBe(true);
    });

    it('renders Footer component', () => {
        expect(wrapper.findComponent(Footer).exists()).toBe(true);
    });
});

