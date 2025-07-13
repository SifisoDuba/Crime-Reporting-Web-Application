<template>
  <div class="login-page">
    <div class="login-background"></div>

    <div class="login-container">
      <h2>Welcome</h2>
      <img src="@/assets/images/logo.png" alt="Admin" class="admin-image" />
      <AdminLoginComp />
    </div>
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
.login-page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

.login-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/images/Background.jpg');
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  z-index: -1;
}

.login-container {
  position: relative;
  max-width: 400px;
  width: 90%;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  z-index: 1;
}

.admin-image {
  width: 150px;
  height: auto;
  max-width: 100%;
  margin-bottom: 20px;
  object-fit: contain;
}

@media (max-width: 600px) {
  .login-container {
    padding: 15px;
    min-height: 300px;
  }

  .admin-image {
    width: 100px;
  }
}

</style>
