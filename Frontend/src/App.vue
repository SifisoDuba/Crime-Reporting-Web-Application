<template>
  <div id="app">
    <!-- Navbar and Footer will only show if showLayout is true -->
    <Navbar v-if="showLayout" />

    <main>
      <router-view />
    </main>

    <Footer v-if="showLayout" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  setup() {
    const route = useRoute()

    // Hide layout for login, register, and admin-login pages
    const noLayoutRoutes = ['/login', '/register', '/admin-login']

    // Reactive check for current path
    const showLayout = computed(() => !noLayoutRoutes.includes(route.path))

    return {
      showLayout
    }
  }
}
</script>

