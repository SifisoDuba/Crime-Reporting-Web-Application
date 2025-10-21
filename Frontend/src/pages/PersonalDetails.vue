<template>
  <div class="personal-details">
    <h2>Update Personal Details</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        Full Name:
        <input type="text" v-model="form.name" placeholder="Name" />
      </label>
      <label>
        Email Address:
        <input type="email" v-model="form.email" placeholder="Email" />
      </label>
      <label>
        Phone Number:
        <input type="text" v-model="form.number" placeholder="number" />
      </label>
      <label>
        password:
        <input type="password" v-model="form.password" placeholder="Password" />
      </label>
      <label>
        Comfirm Password:
        <input type="password" v-model="form.confirmPassword" placeholder="Confirm Password" />
      </label>
      <label>
        ID Number:
        <input type="text" v-model="form.idNumber" placeholder="ID Number" readonly />
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
import axios from 'axios';
export default {
  name: "PersonalDetails",
  data() {
    return {
      form: {
        name: "",
        email: "",
        number: "",
        password: "",
        confirmPassword: "",
        idNumber: "",

      },
      selectedFile: null,
      previewUrl: null,
    };
  },
  mounted() {
    console.log('PersonalDetails mounted');
    this.form.idNumber = localStorage.getItem('idNumber') || '';
    console.log('idNumber from localStorage:', this.form.idNumber);
    if (this.form.idNumber) {
      this.fetchUserDetails(this.form.idNumber);
    } else {
      console.log('No idNumber found, not fetching user details');
    }
  },
  methods: {
    async fetchUserDetails(idNumber) {
      console.log('Fetching user details for idNumber:', idNumber);
      try {
        const response = await axios.get(`http://localhost:3000/user/${idNumber}`);
        console.log('Response from API:', response.data);
        const user = response.data;
        this.form.name = user.FullName || '';
        this.form.email = user.Email || '';
        this.form.number = user.PhoneNumber || '';
        this.form.password = user.Password || '';
        this.form.confirmPassword = user.Password || '';
        console.log('Form updated with user data:', this.form);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        alert("Failed to load personal details.");
      }
    },
    async handleSubmit() {
      console.log("submitting form with data:", this.form);
      try {
        const res = await axios.post('http://localhost:3000/update-personal-details', this.form);
        console.log("Personal details updated successfully:", res.data);
        alert(res.data.message);
      } catch (error) {
        if (error.response && error.response.data.error) {
          alert("Error: " + error.response.data.error);
        } else {
          alert("Something went wrong. Please try again.");
        }
        console.error("Error updating personal details:", error);
      }
    },
    
    async handleUpload() {
      if (!this.selectedFile) {
        alert("No file selected.");
        return;
      }

      if (!this.form.idNumber) {
        alert("User ID not found. Please log in again.");
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(this.selectedFile.type)) {
        alert("Please select a valid image file (JPEG, PNG, or GIF).");
        return;
      }

      const maxSize = 5 * 1024 * 1024; 
      if (this.selectedFile.size > maxSize) {
        alert("File size must be less than 5MB.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("profilePicture", this.selectedFile);
        formData.append("idNumber", this.form.idNumber);

        const res = await axios.post("http://localhost:3000/upload-profile-picture", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        alert("Profile picture updated!");
        console.log("Upload response:", res.data);

        this.selectedFile = null;
        this.previewUrl = null;
      } catch (err) {
        console.error("Error uploading profile picture:", err);
        if (err.response && err.response.data && err.response.data.error) {
          alert("Error: " + err.response.data.error);
        } else {
          alert("Failed to upload profile picture. Please try again.");
        }
      }
    },


    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.previewUrl = URL.createObjectURL(file);
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

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
