import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginForm from "../LoginForm.vue"

describe('LoginForm', () => {
    it('renders properly', () => {
        const wrapper = mount(LoginForm, {
            global: {
                stubs: ['router-link']
            }
        })
        expect(wrapper.exists()).toBeTruthy()
    })
})
