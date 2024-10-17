import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from "@pinia/testing"
import PromptForm from "../PromptForm.vue"
import {vi} from "vitest/dist/index.js";

describe('PromptForm', () => {
    it('renders properly', () => {
        const wrapper = mount(PromptForm, {
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
