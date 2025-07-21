<template>
  <div class="update-profile">
    <h2>Update Profile</h2>
    <form @submit.prevent="handleSubmit">
      <section>
        <h3>Personal Details</h3>
        <label>
          Name:
          <input type="text" v-model="personalDetails.name" />
        </label>
        <label>
          Surname:
          <input type="text" v-model="personalDetails.surname" />
        </label>
        <label>
          Age:
          <input type="number" v-model="personalDetails.age" />
        </label>
        <label>
          Status:
          <input type="text" v-model="personalDetails.status" />
        </label>
      </section>

      <section>
        <h3>Address</h3>
        <label>
          Address Line 1:
          <input type="text" v-model="address.line1" />
        </label>
        <label>
          Address Line 2:
          <input type="text" v-model="address.line2" />
        </label>
        <label>
          City:
          <input type="text" v-model="address.city" />
        </label>
        <label>
          Postal Code:
          <input type="text" v-model="address.postalCode" />
        </label>
      </section>

      <section>
        <h3>Contact Details</h3>
        <label>
          Phone:
          <input type="text" v-model="contact.phone" />
        </label>
        <label>
          Email:
          <input type="email" v-model="contact.email" />
        </label>
      </section>

      <button type="submit">Save Changes</button>
    </form>

    <button class="logout-btn" @click="handleLogout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "UpdateProfile",
  data() {
    return {
      personalDetails: {
        name: "John",
        surname: "Wick",
        age: 30,
        status: "Resident",
      },
      address: {
        line1: "12 Lower Level Road",
        line2: "",
        city: "Cape Town",
        postalCode: "8000",
      },
      contact: {
        phone: "082 889 3231",
        email: "babayaga@gmail.com",
      },
    };
  },
  methods: {
    handleSubmit() {
      alert("Profile updated successfully!");
    },
    handleLogout() {
      localStorage.removeItem("isLoggedIn");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.update-profile {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.update-profile h2 {
  margin-bottom: 20px;
}
.update-profile section {
  margin-bottom: 20px;
}
.update-profile label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
}
.update-profile input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.update-profile button {
  background-color: #10b981;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.logout-btn {
  margin-top: 20px;
  background-color: #ef4444;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.logout-btn:hover {
  background-color: #dc2626;
}
</style>
