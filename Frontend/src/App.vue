<template>
  <div id="app">
    <Navbar v-if="showUserLayout" />
    <AdminNavbar v-else-if="showAdminLayout" />
  <main>
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>
  </main>
    <Footer v-if="showUserLayout" />
    <AdminFooter v-else-if="showAdminLayout" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import AdminNavbar from './components/AdminNavbar.vue'
import AdminFooter from './components/AdminFooter.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    AdminNavbar,
    AdminFooter
  },
  setup() {
    const route = useRoute()

    const noLayoutRoutes = ['/login', '/register', '/admin-login']

    const adminRoutes = [
      '/admin-dashboard',
      '/admin-view-report',
      '/report-summary',
      '/admin-emergency-contacts',
    ]

    const showUserLayout = computed(() =>
      !noLayoutRoutes.includes(route.path) && !adminRoutes.includes(route.path)
    )

    const showAdminLayout = computed(() =>
      adminRoutes.includes(route.path)
    )

    return {
      showUserLayout,
      showAdminLayout
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
