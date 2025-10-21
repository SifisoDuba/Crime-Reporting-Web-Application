
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
  props: {
    form: {
      type: Object,
      required: true
    },
  },
  methods: {
    onSubmit() {
      this.$emit('submit');
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
  width: 100%; 
}

.form-group {
  margin-bottom: 15px;
  width: 100%; 
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%; 
  padding: 12px; 
  background-color: #B1AFB2;
  border: 1px solid #1D1B20;
  border-radius: 4px;
  box-sizing: border-box;
}

button { 
  width: 100%; 
  padding: 12px; 
  background-color: #2D2C2D; 
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #222; 
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
  color: #007bff; 
  text-decoration: none; 
}

.forgot-password a:hover {
  text-decoration: underline;
}

.error {
  color: red;
  margin-top: 10px;
}


@media (max-width: 600px) {
  input[type="text"],
  input[type="password"] {
    padding: 10px; 
  }

  button {
    padding: 10px;
  }
}
</style>