<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/dashboard" exact>
        <img src="@/assets/images/logo.png" alt="Logo" width="65" height="65" />
      </router-link>
    </div>
    <div class="hamburger" @click="toggleMenu">&#9776;</div>

    <ul :class="['Navbar', { active: isMenuOpen }]">
      <div class="nav-center">
      <li><router-link to="/dashboard" exact @click="closeMenu">Dashboard</router-link></li>
      <li><router-link to="/reportingpage" @click="closeMenu">Report crime</router-link></li>
      <li><router-link to="/emergency-contacts" @click="closeMenu">Emergency contacts</router-link></li>
      <li><router-link to="/user-report-summary" @click="closeMenu">My Reports</router-link></li>
      </div>
      <div class="nav-right">
<li class="profile-menu" @click="toggleProfileDropdown" @mouseleave="closeProfileDropdown">
  <div class="profile-link" >
    <span v-if="isMenuOpen && isMobile">Profile</span>
    <img
      v-else
      :src="profilePictureUrl || require('@/assets/images/profile.png')"
      alt="Profile"
      class="profile-picture"
    />
  </div>
  <ul v-if="isProfileDropdownOpen" class="profile-dropdown">
    <li><router-link to="/personal-details" @click="closeProfileDropdown">Personal Details</router-link></li>
    <li><router-link to="/address" @click="closeProfileDropdown">Address</router-link></li>
    <li><a href="#" class="logout-link" @click.prevent="handleLogout">Logout</a></li>
  </ul>
</li>
      </div>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      isMenuOpen: false,
      isMobile: window.innerWidth <= 768,
      isProfileDropdownOpen: false,
      profilePictureUrl: null,
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
    async fetchProfilePicture() {
      const idNumber = localStorage.getItem('idNumber');
      if (!idNumber) return;

      try {
        const response = await fetch(`http://localhost:3000/user-profile-picture/${idNumber}`);
        if (!response.ok) throw new Error('Failed to fetch profile picture');
        const blob = await response.blob();
        this.profilePictureUrl = URL.createObjectURL(blob);
      } catch (error) {
        console.error('Error fetching profile picture:', error);
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
    this.fetchProfilePicture();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style src="@/assets/styles/Navbar.css"></style>
