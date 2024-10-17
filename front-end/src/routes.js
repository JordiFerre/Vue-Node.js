import { createRouter, createWebHistory } from 'vue-router'
import { useUsersStore } from "./stores/users.js"
import Home from "./views/Home.vue"
import Description from "./views/Description.vue"
import Dashboard from "./views/Dashboard.vue"
import Profile from "./views/Profile.vue"
import Register from "./views/Register.vue"

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {
                path: '',
                name: 'description',
                component: Description,
                meta: { requiresAuth: false }
            },
            {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard,
                meta: { requiresAuth: true }
            },
            {
                path: 'profile',
                name: 'profile',
                component: Profile,
                meta: { requiresAuth: true }
            },
            {
                path: 'register',
                name: 'register',
                component: Register,
                meta: { requiresAuth: false }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to) => {
    const userStore = useUsersStore()
    if (to.meta.requiresAuth && !userStore.isLogged) return '/'
})

export { routes }

export default router
