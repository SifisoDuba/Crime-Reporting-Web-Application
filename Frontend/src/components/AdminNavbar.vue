<template>
<nav class="Navbar">
  <div class="nav-left">
    <router-link to="/" exact>
      <img src="@/assets/images/logo.png" alt="Logo" width="65" height="65" />
    </router-link>
  </div>
  <div class="hamburger" @click="toggleMenu">&#9776;</div>

  <ul :class="['Navbar', { active: isMenuOpen }]">
    <div class="nav-center">
        <li><router-link to="/admin-dashboard" exact>Dashboard</router-link></li>
        <li><router-link to="/admin-view-report">View Reports</router-link></li>
        <li><router-link to="/report-summary">Report Summary</router-link></li>
        <li><router-link to="/admin-emergency-contacts">Emergency contacts</router-link></li>
        <li><router-link to="/abo">About us</router-link></li>
    </div>
   <div class="nav-right">
<li>
  <router-link to="/profile">
    <span v-if="isMenuOpen && isMobile">Profile</span>
    <img
      v-else
      src="@/assets/images/profile.png"
      alt="Profile"
      width="35"
      height="35"
    />
  </router-link>
</li>
      </div>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'AdminNavbar',
  data() {
    return {
      isMenuOpen: false,
      isMobile: window.innerWidth <= 768,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>
<style src="@/assets/styles/Navbar.css"></style>