import { setActivePinia, createPinia } from 'pinia'
import { useGMPLStore } from '../src/businesslogic/useGMPLStore.js' // Adjust this path to the actual file
import { describe, it, expect, beforeEach } from 'vitest'

describe('useGMPLStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia()) // Ensure a fresh Pinia instance is used before each test
    })

    it('updates problem input and sets the current word', () => {
        const store = useGMPLStore()

        store.updateProblemInput('solve x mod')
        expect(store.problemInput).toBe('solve x mod')
        expect(store.currentWord).toBe('mod')
    })

    it('fetches correct GMPL keyword suggestions', () => {
        const store = useGMPLStore()

        store.updateProblemInput('and mod')
        expect(store.suggestions).toContain('mod')
        expect(store.suggestions).not.toContain('union') // 'union' doesn't start with 'mod'
    })

    it('returns an empty list if current word has no match', () => {
        const store = useGMPLStore()

        store.updateProblemInput('invalidWord')
        expect(store.suggestions).toEqual([]) // No suggestions should match
    })

    it('inserts a suggestion and replaces the current word', () => {
        const store = useGMPLStore()

        store.updateProblemInput('and mo')
        store.insertSuggestion('mod')

        expect(store.problemInput).toBe('and mod ') // The input should now contain 'mod'
        expect(store.suggestions).toEqual([]) // Suggestions should be cleared
    })

    it('updates the suggestion position based on caret position', () => {
        const store = useGMPLStore()

        // Mock a textarea element
        const mockTextarea = {
            value: 'solve x mod',
            selectionStart: 10,
            offsetTop: 100,
            offsetLeft: 200,
            offsetWidth: 300
        }

        store.updateSuggestionPosition(mockTextarea)

        expect(store.suggestionPosition.top).toBeGreaterThan(100) // Adjusted top position based on textarea's top
        expect(store.suggestionPosition.left).toBe(200) // Adjusted left position based on textarea's left
    })

    it('calculates caret coordinates correctly', () => {
        const store = useGMPLStore()

        const mockTextarea = {
            value: 'solve x mod',
            selectionStart: 10,
            offsetTop: 100,
            offsetLeft: 200,
            offsetWidth: 300
        }

        const coords = store.getCaretCoordinates(mockTextarea, mockTextarea.selectionStart)

        expect(coords.top).toBeGreaterThan(100) // Ensure coordinates are based on textarea position
        expect(coords.left).toBe(200)
    })
})
