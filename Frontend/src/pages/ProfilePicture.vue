<template>
  <div class="profile-picture">
    <h2>Update Profile Picture</h2>
    <div class="picture-preview" v-if="previewUrl">
      <img :src="previewUrl" alt="Profile Picture Preview" />
    </div>
    <input type="file" @change="handleFileChange" />
    <button @click="handleUpload" :disabled="!selectedFile">Upload</button>
  </div>
</template>

<script>
export default {
  name: "ProfilePicture",
  data() {
    return {
      selectedFile: null,
      previewUrl: null,
    };
  },
  methods: {
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
.profile-picture {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
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
button {
  background-color: #10b981;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}
@media (max-width: 768px) {
  .profile-picture {
    padding: 15px;
    margin: 10px;
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
