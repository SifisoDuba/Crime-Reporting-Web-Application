import { createRouter, createWebHistory } from 'vue-router'
import AdminLogin from './pages/AdminLogin.vue'
import Dashboard from './pages/Dashboard.vue'
import Landing from './pages/Landing.vue'
import ReportingPage from './pages/ReportingPage.vue'
import ReportSummary from './pages/ReportSummary.vue'
import AdminViewReports from './pages/AdminViewReports.vue'
import EmergencyContacts from './pages/EmergencyContacts.vue'
import Profile from './pages/Profile.vue'
import AdminDashboard from './pages/AdminDashboard.vue'
import AdminEmergencyContacts from './pages/AdminEmergencyContacts.vue'

const routes = [
    {path : '/', component: Landing},
    {path : '/admin-login', component: AdminLogin},
    {path : '/dashboard', component: Dashboard},
    {path : '/reportingpage', component: ReportingPage},
    {path : '/report-summary', component: ReportSummary},
    {path : '/admin-view-report', component: AdminViewReports},
    {path : '/emergency-contacts', component: EmergencyContacts},
    {path : '/profile', component: Profile},
    {path : '/admin-dashboard', component: AdminDashboard},
    {path : '/admin-emergency-contacts', component: AdminEmergencyContacts},

]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router