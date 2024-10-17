import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PromptList from "../PromptList.vue"

describe('PromptList', () => {
    it('renders properly', () => {
        const wrapper = mount(PromptList)
        expect(wrapper.exists()).toBeTruthy()
    })
})
