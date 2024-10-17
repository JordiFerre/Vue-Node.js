import { defineStore } from 'pinia'

export const useUsersStore = defineStore('user', {
    state: () => {
        return {
            logged: false,
            name: "",
            email: "",
            membershipPeriod: "",
            token: ""
        }
    },
    getters: {
        getName: (state) => state.name,
        getEmail: (state) => state.email,
        getMembershipPeriod: (state) => state.membershipPeriod,
        getToken: (state) => state.token,
        isLogged: (state) => state.logged
    },
    actions: {
        setUserData(payload) {
            this.name = `${payload.body[0].name} ${payload.body[0].lastName}`
            this.email = payload.body[0].email
            this.membershipPeriod = this.calcMembershipPeriod(payload.body[0].createdAt)
            this.token = payload.token
            this.logged = true
        },
        clearUserData() {
            this.name = ""
            this.email = ""
            this.membershipPeriod = ""
            this.token = ""
            this.logged = false
        },
        calcMembershipPeriod(start) {
            const startTime = new Date(start)
            return Math.floor((Date.now() - startTime) / (1000 * 60 * 60 * 24))
        }
    }
})
