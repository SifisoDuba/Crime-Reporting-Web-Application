import { createRouter, createWebHistory } from 'vue-router'
import AdminLogin from './pages/AdminLogin.vue'
import Dashboard from './pages/Dashboard.vue'
import Landing from './pages/Landing.vue'

const routes = [
    {path : '/', component: Landing},
    {path : '/admin-login', component: AdminLogin},
    {path : '/dashboard', component: Dashboard}
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router