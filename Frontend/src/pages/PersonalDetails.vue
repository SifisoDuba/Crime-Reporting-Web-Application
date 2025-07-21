<template>
  <div class="personal-details">
    <h2>Update Personal Details</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        Full Name:
        <input type="text" v-model="name" />
      </label>
            <label>
        Email Address:
        <input type="text" v-model="name" />
      </label>
            <label>
        Phone Number:
        <input type="text" v-model="name" />
      </label>
            <label>
        password:
        <input type="text" v-model="name" />
      </label>
      <label>
        Comfirm Password:
        <input type="text" v-model="surname" />
      </label>
      <button type="submit">Save</button>
    </form>
    <div class="profile-picture-section">
      <h2>Update Profile Picture</h2>
      <div class="picture-preview" v-if="previewUrl">
        <img :src="previewUrl" alt="Profile Picture Preview" />
      </div>
      <input type="file" @change="handleFileChange" />
      <button @click="handleUpload" :disabled="!selectedFile">Upload</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalDetails",
  data() {
    return {
      name: "John",
      surname: "Wick",
      age: 30,
      status: "Resident",
      selectedFile: null,
      previewUrl: null,
    };
  },
  methods: {
    handleSubmit() {
      alert("Personal details updated!");
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.previewUrl = URL.createObjectURL(file);
      }
    },
    handleUpload() {
      alert("Profile picture updated!");
      this.selectedFile = null;
      this.previewUrl = null;
    },
  },
};
</script>

<style scoped>
.personal-details {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
}
.personal-details label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
}
.personal-details input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.personal-details button {
  background-color: #10b981;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.profile-picture-section {
  margin-top: 40px;
  text-align: center;
}
.picture-preview img {
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%;
  margin-bottom: 10px;
}
input[type="file"] {
  margin-bottom: 10px;
}
button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}
@media (max-width: 768px) {
  .personal-details {
    padding: 15px;
    margin: 10px;
  }
  .personal-details label {
    font-size: 1rem;
  }
  .personal-details input {
    padding: 10px;
  }
  .personal-details button {
    width: 100%;
    padding: 12px 0;
  }
  .picture-preview img {
    max-width: 150px;
    max-height: 150px;
  }
  button {
    width: 100%;
    padding: 12px 0;
  }
}
</style>
