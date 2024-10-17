import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterBar from "../FilterBar.vue"

describe('FilterBar', () => {
    it('renders properly', () => {
        const wrapper = mount(FilterBar)
        expect(wrapper.exists()).toBeTruthy()
    })
    
    it('verifies the default values', () => {
        const wrapper = mount(FilterBar)
        expect(wrapper.find('#sort-by').element.value).toEqual('title')
        expect(wrapper.find('#order-by').element.value).toEqual('ascending')
        expect(wrapper.find('#private').element.checked).toBeFalsy()
    })

    it('propagates the sort by prompt value', async () => {
        const wrapper = mount(FilterBar)
        await wrapper.find('#sort-by').setValue('prompt')
        const sortedByCall = wrapper.emitted('sortPrompt')
        expect(sortedByCall[0]).toHaveLength(1)
        const expectedPayload = ['prompt']
        expect(wrapper.emitted('sortPrompt')[0]).toMatchObject(expectedPayload)
    })

    it('propagates the sort by tag value', async () => {
        const wrapper = mount(FilterBar)
        await wrapper.find('#sort-by').setValue('tag')
        const sortedByCall = wrapper.emitted('sortPrompt')
        expect(sortedByCall[0]).toHaveLength(1)
        const expectedPayload = ['tag']
        expect(wrapper.emitted('sortPrompt')[0]).toMatchObject(expectedPayload)
    })

    it('propagates the sort by owner value', async () => {
        const wrapper = mount(FilterBar)
        await wrapper.find('#sort-by').setValue('owner')
        const sortedByCall = wrapper.emitted('sortPrompt')
        expect(sortedByCall[0]).toHaveLength(1)
        const expectedPayload = ['owner']
        expect(wrapper.emitted('sortPrompt')[0]).toMatchObject(expectedPayload)
    })

    it('propagates the descending order value', async () => {
        const wrapper = mount(FilterBar)
        await wrapper.find('#order-by').setValue('descending')
        const orderByCall = wrapper.emitted('orderPrompt')
        expect(orderByCall[0]).toHaveLength(1)
        const expectedPayload = ['descending']
        expect(wrapper.emitted('orderPrompt')[0]).toMatchObject(expectedPayload)
    })

    it('propagates the private value', async () => {
        const wrapper = mount(FilterBar)
        await wrapper.find('#private').setValue(true)
        const privateCall = wrapper.emitted('privatePrompt')
        expect(privateCall[0]).toHaveLength(1)
        const expectedPayload = [true]
        expect(wrapper.emitted('privatePrompt')[0]).toMatchObject(expectedPayload)
    })
})
