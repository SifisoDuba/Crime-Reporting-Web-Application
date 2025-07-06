<!-- AdminLogin.vue -->
<template>
  <div class="login-container">
    <h2>Welcome</h2>
    <img src="path/to/admin-image.jpg" alt="Admin" class="admin-image" />
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

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.admin-image {
  width: 100px; /* Adjust the size as needed */
  height: auto; /* Maintain aspect ratio */
  margin-bottom: 20px; /* Space between image and form */
}

/* Add any additional styles here */
</style>