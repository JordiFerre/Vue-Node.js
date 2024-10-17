import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from "@pinia/testing"
import SearchBar from "../SearchBar.vue"

describe('SearchBar', () => {
    it('renders properly', () => {
        const wrapper = mount(SearchBar, {
            global: {
                plugins: [
                    createTestingPinia({
                        createSpy: vi.fn
                    })
                ]
            }
        })
        expect(wrapper.exists()).toBeTruthy()
    })
})
