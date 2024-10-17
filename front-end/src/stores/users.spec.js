import { beforeEach, describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useUsersStore } from "./users.js"

const userData = {
    body: [{
        name: "Foo",
        lastName: "Bar",
        email: "foobar@gmail.com",
        createdAt: new Date('2024-02-29')
    }],
    token: "random token here"
}

describe('Users Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('is not logged by default', () => {
        const userStore = useUsersStore()
        expect(userStore.logged).toBeFalsy()
    })

    it('is logged after setting the user data properly', () => {
        const userStore = useUsersStore()
        userStore.setUserData(userData)
        expect(userStore.logged).toBeTruthy()
    })

    it('calculates membership period correctly', () => {
        const userStore = useUsersStore()
        userData.body[0].createdAt = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        userStore.setUserData(userData)
        expect(userStore.membershipPeriod).toBe(7)
    })

    it('is not logged after clearing out the user data', () => {
        const userStore = useUsersStore()
        userStore.setUserData(userData)
        userStore.clearUserData()
        expect(userStore.logged).toBeFalsy()
    })
})
