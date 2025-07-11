import { createRouter, createWebHistory } from 'vue-router'
import AdminLogin from './pages/AdminLogin.vue'
import Dashboard from './pages/Dashboard.vue'
import Landing from './pages/Landing.vue'
import ReportingPage from './pages/ReportingPage.vue'
import ReportSummary from './pages/ReportSummary.vue'
import AdminViewReports from './pages/AdminViewReports.vue'


const routes = [
    {path : '/', component: Landing},
    {path : '/admin-login', component: AdminLogin},
    {path : '/dashboard', component: Dashboard},
    {path : '/reportingpage', component: ReportingPage},
    {path : '/reportsummary', component: ReportSummary},
    {path : '/admin-view-report', component: AdminViewReports},

]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router