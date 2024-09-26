import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../src/App.vue'
import Header from '../src/components/Header.vue'
import Footer from '../src/components/Footer.vue';
import { createTestingPinia } from '@pinia/testing'


//TODO find fix for the Test
describe.skip('Component', () => {

    it('should render Header and Footer components', () => {
        const wrapper = mount(App, {
            global: {
                plugins: [createTestingPinia()],
            },
        })



        // Check if the Header component is rendered
        expect(wrapper.findComponent(Header).exists()).toBe(true);

        // Check if the Footer component is rendered
        expect(wrapper.findComponent(Footer).exists()).toBe(true);
    });

});

/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/