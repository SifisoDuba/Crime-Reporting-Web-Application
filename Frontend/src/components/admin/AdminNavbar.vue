<template>
<nav class="navbar">
  <div class="nav-left">
    <router-link to="/admin-dashboard" exact>
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
    </div>
   <div class="nav-right">
<li class="profile-menu" @click="toggleProfileDropdown" @mouseleave="closeProfileDropdown">
  <div class="profile-link">
    <span v-if="isMenuOpen && isMobile">Profile</span>
    <img
      v-else
      src="@/assets/images/profile.png"
      alt="Profile"
      width="35"
      height="35"
    />
  </div>
  <ul v-if="isProfileDropdownOpen && !isMobile" class="profile-dropdown">
    <li><a href="#" class="logout-link" @click.prevent="handleLogout">Logout</a></li>
  </ul>
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
      isProfileDropdownOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      if (this.isMobile) {
        this.isMenuOpen = false;
      }
    },
    toggleProfileDropdown() {
      if (!this.isMobile) {
        this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
      }
    },
    closeProfileDropdown() {
      this.isProfileDropdownOpen = false;
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
      if (this.isMobile) {
        this.isProfileDropdownOpen = false;
      }
    },
    handleLogout() {
      localStorage.removeItem("isLoggedIn");
      this.$router.push("/login");
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
