<template>
  <div class="min-h-screen bg-gray-300 flex flex-col justify-between">
    <div class="profile-container">
      <div class="profile-navigation">
        <h3>Profile Settings</h3>
        <div class="nav-items">
          <router-link class="nav-item" to="/personal-details">Personal Details</router-link>
          <router-link class="nav-item" to="/address">Address</router-link>
          <router-link class="nav-item" to="/contact-details">Contact Details</router-link>
          <router-link class="nav-item" to="/profile-picture">Update Profile Picture</router-link>
          <button class="logout-btn" @click="handleLogout">Logout</button>
        </div>
      </div>
      <div class="profile-picture">
        <img :src="profileImage" alt="Profile Picture" />
        <p class="profile-name">{{ name }} {{ surname }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import profilePic from "@/assets/images/profile.png";

export default {
  name: "ProfilePage",
  data() {
    return {
      profileImage: profilePic,
      name: "John",
      surname: "Wick",
    };
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("isLoggedIn");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.profile {
  background-color: #c1c1c1;
}
.profile-container {
  width: 100vw;
  height: 100vh;
  margin: 0;
  background: white url('@/assets/images/pattern.jpg') no-repeat center center fixed;
  background-size: cover;
  padding: 20px;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
}
.profile-navigation {
  flex: 1;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 20px;
  border-radius: 12px;
  max-width: 400px;
}
.profile-navigation h2 {
  margin-bottom: 15px;
}
.nav-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.nav-item {
  display: inline-block;
  padding: 12px 20px;
  background-color: #10b981;
  color: white;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
  width: 180px;
  text-align: center;
}
.nav-item:hover {
  background-color: #0f9a6e;
}
.logout-btn {
  margin-top: 10px;
  padding: 12px 20px;
  background-color: #ef4444;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 180px;
  text-align: center;
  user-select: none;
  transition: background-color 0.3s ease;
}
.logout-btn:hover {
  background-color: #dc2626;
}
.profile-picture {
  text-align: center;
  background-color: #f0fdf4;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.1);
  max-width: 300px;
}
.profile-picture img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}
.profile-name {
  margin-top: 10px;
  font-weight: 700;
  font-size: 1.2rem;
  color: #333;
}
@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }
  .profile-picture {
    order: -1;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
  .profile-picture img {
    width: 120px;
    height: 120px;
  }
  .profile-name {
    font-size: 1rem;
  }
  .profile-navigation {
    width: 100%;
    margin-bottom: 20px;
  }
  .nav-items {
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  .nav-item, .logout-btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
