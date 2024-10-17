import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from "@pinia/testing"
import Prompt from "../Prompt.vue"

describe('Prompt', () => {
    it('renders properly', () => {
        const wrapper = mount(Prompt, {
            global: {
                plugins: [
                    createTestingPinia({
                        createSpy: vi.fn
                    })
                ]
            },
            props: {
                prompt: {
                    title: "test",
                    prompt: "This is a test",
                    tags: ['dev'],
                    private: false,
                    owner: "Jordi Ferré"
                }
            }
        })
        expect(wrapper.exists()).toBeTruthy()
    })
})
