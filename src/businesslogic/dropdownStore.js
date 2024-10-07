/*
This file is part of LinSolve. LinSolve is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
LinSolve is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with LinSolve. If not, see <Licenses- GNU Project - Free Software Foundation >.
*/


import { defineStore } from 'pinia'; 

// Defining a new store for managing the state of a dropdown component
/**
 * Definition for Store
 * @type {StoreDefinition<"dropdown", {isOpen: boolean}, {}, {toggleDropdown(): void}>} - Initial state
 * @description This inits the Dropdownstore with the preset state
 */
export const useDropdownStore = defineStore('dropdown', {
  // The `state` function returns an object representing the reactive state of the store
  state: () => ({
    isOpen: false, 
  }),
  
  // Actions section: methods to modify the state or perform other logic
  actions: {
    /**
     * Toggles the State of the Dropdown
     */
    toggleDropdown() {
      this.isOpen = !this.isOpen; 
    },
  }
});

