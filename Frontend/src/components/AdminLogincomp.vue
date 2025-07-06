 <!-- AdminLoginComp.vue -->
<template>
  <form @submit.prevent="handleLogin" class="login-form">
    <div class="form-group">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required aria-label="Username">
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required aria-label="Password">
    </div>
    <p class="forgot-password"><a href="#">Forgot Password?</a></p>
    <div class="button-container">
      <button type="submit" :disabled="isLoading">{{ isLoading ? 'Logging in...' : 'Login' }}''</button>
    </div>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </form>
</template>

<script>
export default {
  name: 'AdminLoginComp',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      isLoading: false
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = ''; // Reset error message
      this.isLoading = true; // Set loading state
      try {
        const response = await fetch('http://localhost:3000/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        this.$router.push('/admin/dashboard');
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false; // Reset loading state
      }
    }
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

.login-form {
  display: flex; /* Add this line */
  flex-direction: column; /* Add this line */
}

.form-group {
  margin-bottom: 15px;
  width: 100%; /* Ensure full width for form groups */
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  background-color: #B1AFB2;
  border: 1px solid #1D1B20;
  border-radius: 4px;
  box-sizing: border-box;
}

button { 
  width: 60%;
  padding: 10px;
  background-color: #2D2C2D; /* Change button color to black */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #222; /* Darker shade on hover */
}

.button-container{
  display:flex;
  justify-content: center;
  width: 100%
}

.forgot-password {
  margin-top: 10px;
  text-align: right;
}

.forgot-password a {
  color: #007bff; /* Link color */
  text-decoration: none; /* Remove underline */
}

.forgot-password a:hover {
  text-decoration: underline; /* Underline on hover */
}

.error {
  color: red;
  margin-top: 10px;
}
</style>