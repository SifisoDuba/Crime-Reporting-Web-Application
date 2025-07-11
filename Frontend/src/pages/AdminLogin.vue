<template>
  <div class="login-container">
    <h2>Welcome</h2>
    <img src="@assets/images/profile.png" alt="Admin" class="admin-image" />
    <AdminLoginComp />
  </div>
</template>

<script>
import AdminLoginComp from '../components/AdminLogincomp.vue'; // Adjust the path as necessary

export default {
  name: 'AdminLogin',
  components: {
    AdminLoginComp
  }
};
</script>

<style>

html, body {
  height: 100%; /* Ensure the body takes the full height */
  margin: 0; /* Remove default margin */
}

#app {
  display: flex; /* Use flexbox for centering */
  align-items: center; /* Center items vertically */
  justify-content: center; /* Center items horizontally */
  height: 100vh; /* Full height of the viewport */
  background-image: url('@/assets/images/background.jpg'); /* Background image */
}

.login-container {
  max-width: 400px; /* Maximum width for larger screens */
  width: 90%; /* Allow it to take up to 90% of the screen width */
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically */
  min-height: 400px; /* Set a minimum height for the container */
  margin: 0 auto; /* Center the container */
}

/* Media Queries for AdminLogin */
@media (max-width: 600px) {
  .login-container {
    padding: 15px; /* Reduce padding on smaller screens */
    min-height: 300px; /* Adjust minimum height for mobile */
  }

  .admin-image {
    width: 80px; /* Smaller image on mobile */
  }
}
</style>