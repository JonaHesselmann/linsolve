/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/


import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useDropdownStore } from '../src/businesslogic/dropdownStore.js';
describe('useDropdownStore', () => {
    let store;

    beforeEach(() => {
        // Set up Pinia before each test
        setActivePinia(createPinia());
        store = useDropdownStore();
    });

    it('should initialize with isOpen set to false', () => {
        // Check the initial state of isOpen
        expect(store.isOpen).toBe(false);
    });

    it('should toggle isOpen state when toggleDropdown is called', () => {
        // Call toggleDropdown and check if isOpen toggles
        store.toggleDropdown();
        expect(store.isOpen).toBe(true); // After first call, it should be true

        store.toggleDropdown();
        expect(store.isOpen).toBe(false); // After second call, it should revert to false
    });
});

