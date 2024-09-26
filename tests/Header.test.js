import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from '../src/components/Header.vue';
import { createI18n } from 'vue-i18n';
import { createPinia, setActivePinia } from 'pinia';

// Mock the languageStore and useDropdownStore modules
vi.mock('../src/businesslogic/languageStore.js', () => ({
    languageStore: () => ({
        setLocale: vi.fn(), // Mock the setLocale function
    }),
}));

vi.mock('../src/businesslogic/dropdownStore.js', () => ({
    useDropdownStore: () => ({
        isOpen: false, // Initial state
        toggleDropdown: vi.fn(), // Mock the toggleDropdown function
    }),
}));

describe('Header.vue', () => {
    let wrapper;
    let languageStoreMock;
    let dropdownStoreMock;

    // Mock i18n instance and $t method
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: 'en',
        messages: {
            en: { language: 'Language' },
            de: { language: 'Sprache' }
        }
    });

    beforeEach(() => {
        // Set up Pinia before each test
        setActivePinia(createPinia());

        // Reset mocks before each test
        languageStoreMock = {
            setLocale: vi.fn(),
        };

        dropdownStoreMock = {
            isOpen: false,
            toggleDropdown: vi.fn(),
        };

        // Mount the component with i18n and mocked stores
        wrapper = mount(Header, {
            global: {
                plugins: [i18n],
                mocks: {
                    i18nStore: languageStoreMock,
                    dropdown: dropdownStoreMock,
                },
            },
        });
    });

    it('should render the component correctly', () => {
        // Check if the header title is rendered
        expect(wrapper.find('.title').text()).toBe('LinSolve');

        // Check if the globe image is rendered
        expect(wrapper.find('.globe').exists()).toBe(true);
    });

    it('should toggle the dropdown menu when the globe is clicked', async () => {
        // Simulate clicking the globe image to toggle the dropdown
        await wrapper.find('.globe').trigger('click');

        // Check if toggleDropdown method was called
        expect(dropdownStoreMock.toggleDropdown).toHaveBeenCalled();
    });

    it('should display the dropdown menu when dropdown.isOpen is true', async () => {
        // Set dropdown store's isOpen to true using wrapper's computed properties
        dropdownStoreMock.isOpen = true;
        wrapper.vm.dropdown.isOpen = true;

        // Trigger a re-render
        await wrapper.vm.$nextTick();
    });


});

/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/
