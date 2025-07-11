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
      <button type="submit" :disabled="isLoading">{{ isLoading ? 'Logging in...' : 'Login' }}</button>
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
*{
  font-size: 1rem;
  font-family: Arial, sans-serif;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 100%; /* Full width of the container */
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
  width: 100%; /* Full width */
  padding: 12px; /* Increase padding for better touch targets */
  background-color: #B1AFB2;
  border: 1px solid #1D1B20;
  border-radius: 4px;
  box-sizing: border-box;
}

button { 
  width: 100%; /* Full width */
  padding: 12px; /* Increase padding for better touch targets */
  background-color: #2D2C2D; /* Change button color to black */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #222; /* Darker shade on hover */
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
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

/* Media Queries for AdminLoginComp */
@media (max-width: 600px) {
  input[type="text"],
  input[type="password"] {
    padding: 10px; /* Adjust padding for smaller screens */
  }

  button {
    padding: 10px; /* Adjust button padding */
  }
}
</style>