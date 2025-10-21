import { createRouter, createWebHistory } from 'vue-router'
import AdminLogin from './pages/admin/AdminLogin.vue'
import Dashboard from './pages/Dashboard.vue'
import Landing from './pages/Landing.vue'
import ReportingPage from './pages/ReportingPage.vue'
import ReportSummary from './pages/admin/ReportSummary.vue'
import AdminViewReports from './pages/admin/AdminViewReports.vue'
import EmergencyContacts from './pages/EmergencyContacts.vue'
import Profile from './pages/Profile.vue'
import AdminDashboard from './pages/admin/AdminDashboard.vue'
import AdminEmergencyContacts from './pages/admin/AdminEmergencyContacts.vue'
import LoginView from './pages/LoginView.vue'
import RegisterView from './pages/RegisterView.vue'

const routes = [
    {path : '/', component: Landing},
    {path : '/admin-login', component: AdminLogin},
    {path : '/dashboard', component: Dashboard},
    {path : '/reportingpage', component: ReportingPage},
    {path : '/report-summary', component: ReportSummary},
    {path : '/admin-view-report', component: AdminViewReports},
    {path : '/emergency-contacts', component: EmergencyContacts},
    {path : '/profile', component: Profile},
    {path : '/personal-details', component: () => import('./pages/PersonalDetails.vue')},
    {path : '/address', component: () => import('./pages/Address.vue')},
    {path : '/profile-picture', component: () => import('./pages/ProfilePicture.vue')},
    {path : '/admin-dashboard', component: AdminDashboard},
    {path : '/user-report-summary', component: () => import('./pages/UserReportSummaryPage.vue')},
    {path : '/admin-emergency-contacts', component: AdminEmergencyContacts},
    {path : '/login', component: LoginView},
    {path : '/register', component: RegisterView},

]
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const publicPages = ['/', '/login', '/register', '/admin-login'];

    if (!publicPages.includes(to.path) && !isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router
