import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ModalLayer from "../ModalLayer.vue"

describe('ModalLayer', () => {
    it('renders properly', () => {
        const wrapper = mount(ModalLayer)
        expect(wrapper.exists()).toBeTruthy()
    })

    it('propagates the close event correctly', async () => {
        const wrapper = mount(ModalLayer)
        await wrapper.find('button').trigger('click')
        const closeCall = wrapper.emitted('closeModal')
        expect(closeCall[0]).toHaveLength(0)
    })
})
