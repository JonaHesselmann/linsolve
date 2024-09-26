import { defineStore } from 'pinia'; 

// Defining a new store for managing the state of a dropdown component

/**
 * Definition for the Dropdown Store.
 * @module DropdownStore
 * @type {StoreDefinition<"dropdown", {isOpen: boolean}, {}, {toggleDropdown(): void}>}
 * @description This store manages the state of a dropdown menu. 
 *              It contains the status of whether the dropdown is open or closed.
 *              The default state is set to 'closed'.
 */
export const useDropdownStore = defineStore('dropdown', {
  
  /**
   * The state of the store.
   * @returns {{isOpen: boolean}} An object representing the state of the dropdown menu.
   * @property {boolean} isOpen - Indicates whether the dropdown is open (true) or closed (false).
   */
  state: () => ({
    isOpen: false, 
  }),
  
  // Actions: methods to modify the state or perform other logic
  actions: {
    
    /**
     * Toggles the state of the dropdown menu.
     * @function toggleDropdown
     * @description This method toggles the current state of the dropdown. 
     *              If the dropdown is open, it will close it, and vice versa.
     * @example
     * const dropdownStore = useDropdownStore();
     * dropdownStore.toggleDropdown(); // Changes the state of isOpen.
     */
    toggleDropdown() {
      this.isOpen = !this.isOpen; 
    },
  }
});

