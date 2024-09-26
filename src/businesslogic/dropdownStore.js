import { defineStore } from 'pinia'; 

// Defining a new store for managing the state of a dropdown component
/**
 * Definition for Store
 * @type {StoreDefinition<"dropdown", {isOpen: boolean}, {}, {toggleDropdown(): void}>}
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
