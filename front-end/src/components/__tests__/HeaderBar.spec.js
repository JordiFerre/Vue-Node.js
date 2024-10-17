import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import HeaderBar from "../HeaderBar.vue"
import { routes } from "../../routes.js"

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

describe('HeaderBar', () => {
    const getNotLoggedWrapper = () => mount(HeaderBar, {
        global: {
            plugins: [
                router,
                createTestingPinia({
                    createSpy: vi.fn
                })
            ],
            stubs: ['router-link']
        }
    })

    const getLoggedWrapper = () => mount(HeaderBar, {
        global: {
            plugins: [
                router,
                createTestingPinia({
                    initialState: {
                        user: {
                            name: "Jordi Ferré",
                            logged: true
                        }
                    },
                    createSpy: vi.fn
                })
            ],
            stubs: ['router-link']
        }
    })

    beforeEach(async () => {
        router.push('/')
        await router.isReady()
    })

    it('renders properly', () => {
        const wrapper = getNotLoggedWrapper()
        expect(wrapper.exists()).toBeTruthy()
    })

    it('renders sign-in button properly', () => {
        const wrapper = getNotLoggedWrapper()
        expect(wrapper.find('.sign-in-button').exists()).toBeTruthy()
    })

    it('renders login button properly', () => {
        const wrapper = getNotLoggedWrapper()
        expect(wrapper.find('.login-button').exists()).toBeTruthy()
    })

    it('not renders logout button properly', () => {
        const wrapper = getNotLoggedWrapper()
        expect(wrapper.find('.logout-button').exists()).toBeFalsy()
    })

    it('renders logout button while being logged properly', () => {
        const wrapper = getLoggedWrapper()
        expect(wrapper.find('.logout-button').exists()).toBeTruthy()
    })

    it('redirects to the register view correctly', async () => {
        const wrapper = getNotLoggedWrapper()
        await wrapper.find('.sign-in-button').trigger('click')
        await flushPromises()
        expect(wrapper.vm.$route.path).toEqual('/register')
    })

    it('not renders the navigation menu properly', () => {
        const wrapper = getNotLoggedWrapper()
        expect(wrapper.find('#nav-menu').isVisible()).toBeFalsy()
    })

    it('renders the navigation menu while being logged properly', () => {
        const wrapper = getLoggedWrapper()
        expect(wrapper.find('#nav-menu').isVisible()).toBeTruthy()
    })
})
