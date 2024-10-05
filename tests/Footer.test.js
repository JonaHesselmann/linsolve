import { mount } from '@vue/test-utils'
import Footer from '../src/components/Footer.vue' // Adjust the import path as necessary
import { describe, it, expect, vi } from 'vitest'

describe('Footer.vue', () => {
    it('renders footer links correctly', () => {
        const wrapper = mount(Footer, {
            global: {
                mocks: {
                    $t: (key) => key, // Mock for the translation function
                },
                stubs: {
                    'router-link': {
                        template: '<a><slot /></a>' // Mock the <router-link> as a regular <a> tag for testing
                    }
                }
            }
        })

        // Check if the documentation link is present
        const docLink = wrapper.find('a.footer-link')
        expect(docLink.exists()).toBe(true)
        expect(docLink.text()).toBe('documentation')

        // Check if the "aboutUs" link is present
        const aboutLink = wrapper.findAll('a').at(1) // Find second <a> tag in the rendered output (mocked <router-link>)
        expect(aboutLink.exists()).toBe(true)
        expect(aboutLink.text()).toBe('aboutUs')

        // Check if the "gtcs" link is present
        const gtcsLink = wrapper.findAll('a').at(2) // Find third <a> tag in the rendered output (mocked <router-link>)
        expect(gtcsLink.exists()).toBe(true)
        expect(gtcsLink.text()).toBe('gtcs')
    })

    it('calls openDocumentation method when documentation link is clicked', async () => {
        const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => {}) // Spy on window.open

        const wrapper = mount(Footer, {
            global: {
                mocks: {
                    $t: (key) => key, // Mock for the translation function
                },
                stubs: {
                    'router-link': {
                        template: '<a><slot /></a>' // Mock the <router-link> as a regular <a> tag for testing
                    }
                }
            }
        })

        // Find the documentation link and trigger click event
        const docLink = wrapper.find('a.footer-link')
        await docLink.trigger('click', { preventDefault: vi.fn() })

        // Check if window.open was called with the correct URL
        expect(windowOpenSpy).toHaveBeenCalledWith('/linsolve/docs/jsdoc/index.html', '_blank')

        // Cleanup mock
        windowOpenSpy.mockRestore()
    })
})
