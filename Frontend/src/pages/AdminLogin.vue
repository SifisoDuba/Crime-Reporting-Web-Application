<template>
  <div class="login-page">
    <div class="login-background"></div>

    <div class="login-container">
      <h2>Welcome</h2>
      <img src="@/assets/images/logo.png" alt="Admin" class="admin-image" />
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="form.username" required aria-label="Username">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="form.password" required aria-label="Password">
        </div>
        <p class="forgot-password"><a href="#">Forgot Password?</a></p>
        <div class="button-container">
          <button type="submit" :disabled="isLoading">{{ isLoading ? 'Logging in...' : 'Login' }}</button>
        </div>
        <p v-if="loginError" class="error">{{ loginError }}</p>
      </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'AdminLogin',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      loginError: '',
      isLoading: false
    };
  },
  methods: {
    async handleLogin() {
      this.loginError = '';
      this.isLoading = true;
      console.log(`Attempting login for ${this.form.username}...`);

      try {
        const res = await axios.post('http://localhost:3000/admin-login', this.form);
        console.log('Success', res.data.message || 'Login successful!');
        localStorage.setItem('isLoggedIn', 'true');
        this.$router.push('/admin-dashboard');
      } catch (err) {
        this.loginError = err.response?.data?.error || 'Something went wrong.';
        console.log('Error:', this.loginError);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Background */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #ff4b4b, #00c853, #2979ff);
  background-size: 300% 300%;
  animation: gradientBG 10s ease infinite;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Gradient animation */
@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Container */
.login-container {
  background: #ffffff;
  padding: 2rem 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 380px;
  text-align: center;
}

/* Title */
.login-container h2 {
  margin-bottom: 1rem;
  color: #2979ff;
  font-weight: 700;
  font-size: 1.8rem;
}

/* Logo */
.admin-image {
  width: 80px;
  margin-bottom: 1rem;
  border-radius: 50%;
  border: 3px solid #00c853;
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Labels */
.form-group label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.3rem;
  text-align: left;
}

/* Inputs */
.form-group input {
  width: 100%;
  padding: 0.7rem;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  border-color: #2979ff;
  outline: none;
  box-shadow: 0 0 6px rgba(41,121,255,0.3);
}

/* Forgot Password */
.forgot-password {
  text-align: right;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
}

.forgot-password a {
  font-size: 0.9rem;
  color: #ff4b4b;
  text-decoration: none;
  transition: 0.3s;
}

.forgot-password a:hover {
  text-decoration: underline;
}

/* Button */
.button-container button {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(45deg, #2979ff, #00c853);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.button-container button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.button-container button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0,0,0,0.15);
}

/* Error message */
.error {
  color: #ff4b4b;
  font-size: 0.95rem;
  margin-top: 0.5rem;
  font-weight: 600;
}
</style>

