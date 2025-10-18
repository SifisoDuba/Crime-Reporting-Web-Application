<template>
  <div class="login-page">
    <!-- Left Side: Image -->
    <div class="login-image-section">
      <img :src="backgroundImage" alt="Admin Login Visual" />
      <div class="admin-badge">
        <h3>Admin Portal</h3>
        <p>Authorized Personnel Only</p>
      </div>
    </div>

    <!-- Right Side: Login Form -->
    <div class="login-form-section">
      <div class="form-box">
        <h2>Admin Login</h2>
        <p>Please log in to your admin account</p>

        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="form.username" required />
          </div>

          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="form.password" required />
          </div>

          <p v-if="loginError" class="error-message">{{ loginError }}</p>

          <button class="login-btn" type="submit" :disabled="isLoading">{{ isLoading ? 'Logging in...' : 'Login' }}</button>
        </form>

        <p class="register-link">
          Back to user login:
          <router-link to="/login">User Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import backgroundImage from '@/assets/images/Background.jpg';

export default {
  name: 'AdminLogin',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      loginError: '',
      isLoading: false,
      backgroundImage
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
        localStorage.setItem('adminId', res.data.adminId);
        localStorage.setItem('isAdmin', 'true');
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
  position: relative;
}
.login-image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.admin-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
  z-index: 1;
}

.admin-badge h3 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.admin-badge p {
  font-size: 1.2rem;
  font-weight: 600;
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
  font-weight: 700;
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
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-btn:hover {
  background: #b91c1c;
}

.login-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
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

@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
  }

  .login-image-section {
    flex: none;
    height: 200px;
  }

  .admin-badge h3 {
    font-size: 1.8rem;
  }

  .admin-badge p {
    font-size: 1rem;
  }

  .form-box {
    padding: 20px;
  }
}
</style>

