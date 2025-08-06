<template>
  <div class="login-page">
    <!-- Left Side: Image -->
    <div class="login-image-section">
      <img src="@/assets/images/Background.jpg" alt="Login Visual" />
    </div>

    <!-- Right Side: Login Form -->
    <div class="login-form-section">
      <div class="form-box">
        <h2>Welcome Back</h2>
        <p>Please log in to your account</p>

        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required />
          </div>

          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required />
          </div>

          <p v-if="loginError" class="error-message">{{ loginError }}</p>

          <button class="login-btn" type="submit">Login</button>
        </form>

        <p class="register-link">
          Don't have an account?
          <router-link to="/register">Sign up</router-link>
        </p>
        <hr>
        <p class="register-link">
          Admins, please login here:
          <router-link to="/admin-login">Admin Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      loginError: ''
    }
  },
  mounted() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.$router.push('/dashboard');
    }
  },
  methods: {
    async handleLogin() {
      this.loginError = '';
      if (!this.email || !this.password) {
        this.loginError = "Please fill in both fields.";
        return;
      }

      const validUser = {
        email: "test@gmail.com",
        password: "password123"
      };

      console.log("Attempting login with:", this.email, this.password);

      try {
        const res = await axios.post('http://localhost:3000/login', this.form);
        console.log('Success', res.data.message || 'Registration successful!');
        this.$router.push('/login');

      } catch (err) {
        console.error('Login error:', err);
        if (err.response && err.response.data && err.response.data.message) {
          this.loginError = err.response.data.message;
        } else {
          this.loginError = 'Something went wrong. Please try again.';
        }
      }
      if (this.email === validUser.email && this.password === validUser.password) {
        localStorage.setItem('isLoggedIn', 'true');
        this.$router.push('/dashboard');
      } else {
        this.loginError = "Invalid email or password. Please try again.";
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  height: 100vh;
  font-family: 'Inter', sans-serif;
}

.login-image-section {
  flex: 1;
  background-color: #e0e7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.login-image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
  padding: 40px;
}

.form-box {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.form-box h2 {
  margin-bottom: 10px;
  color: #1f2937;
}

.form-box p {
  margin-bottom: 20px;
  color: #6b7280;
}

.input-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 6px;
  font-weight: 600;
  color: #374151;
}

.input-group input {
  padding: 12px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
  transition: border-color 0.3s ease;
}

.input-group input:focus {
  border-color: #3b82f6;
  outline: none;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-btn:hover {
  background: #2563eb;
}

.register-link {
  margin-top: 20px;
  text-align: center;
  font-size: 0.9rem;
}

.register-link a {
  color: #3b82f6;
  font-weight: 600;
  text-decoration: none;
}

.error-message {
  color: red;
  margin-top: 5px;
  margin-bottom: 10px;
  font-weight: 600;
}
</style>
