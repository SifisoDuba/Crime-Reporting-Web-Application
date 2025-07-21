<template>
  <div class="register-page">
    <div class="form-section">
      <div class="form-box">
        <h2>Register</h2>
        <p>Step {{ step }} of 3</p>

        <form @submit.prevent="handleRegister">
          <div v-if="step === 1">
            <div class="input-group" v-for="field in stepOneFields" :key="field.id">
              <label :for="field.id">{{ field.label }}</label>
              <input
                :id="field.id"
                v-model="form[field.id]"
                :type="field.type"
                :required="field.required"
              />
            </div>
          </div>
          <div v-if="step === 2">
            <div class="input-group" v-for="field in stepTwoFields" :key="field.id">
              <label :for="field.id">{{ field.label }}</label>
              <input
                :id="field.id"
                v-model="form[field.id]"
                :type="field.type"
                :required="field.required"
              />
            </div>
          </div>
          <div v-if="step === 3">
            <div class="input-group">
              <label for="notes">Additional Notes</label>
              <textarea id="notes" v-model="form.notes" placeholder="Optional details..." />
            </div>
            <div class="input-group">
              <label for="timestamp">Registration Time</label>
              <input id="timestamp" :value="form.timestamp" disabled />
            </div>
          </div>
          <div class="navigation-buttons">
            <button type="button" class="nav-btn" @click="prevStep" :disabled="step === 1">← Previous</button>
            <button v-if="step < 3" type="button" class="nav-btn" @click="nextStep">Next →</button>
            <button
              v-else
              type="submit"
              class="register-btn"
              :disabled="!isFormComplete"
            >
              Register
            </button>
          </div>
        </form>

        <p class="login-link">
          Already registered? <router-link to="/login">Log in</router-link>
        </p>
      </div>
    </div>
    <div class="image-section">
      <img src="@/assets/images/Background.jpg" alt="Register Visual" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      step: 1,
      form: {
        fullName: '',
        surname: '',
        idNumber: '',
        email: '',
        password: '',
        phone: '',
        secondaryPhone: '',
        address: '',
        city: '',
        province: '',
        notes: '',
        timestamp: new Date().toLocaleString()
      }
    }
  },
  computed: {
    isFormComplete() {
      return (
        this.form.fullName &&
        this.form.surname &&
        this.form.idNumber &&
        this.form.email &&
        this.form.password &&
        this.form.phone &&
        this.form.address &&
        this.form.city &&
        this.form.province
      );
    },
    stepOneFields() {
      return [
        { id: 'fullName', label: 'Full Name', type: 'text', required: true },
        { id: 'idNumber', label: 'ID Number', type: 'text', required: true },
        { id: 'email', label: 'Email Address', type: 'email', required: true },
        { id: 'password', label: 'Password', type: 'password', required: true },
        { id: 'confirmPassword', label: 'Confirm Passowrd', type: 'password', required: true }
      ];
    },
    stepTwoFields() {
      return [
        { id: 'phone', label: 'Primary Phone Number', type: 'tel', required: true },
        { id: 'address', label: 'Street Address', type: 'text', required: true },
        { id: 'city', label: 'City', type: 'text', required: true },
        { id: 'houseNumber', label: 'House Number', type: 'text', required: true },
        { id: 'city', label: 'City/Town', type: 'text', required: true },
      ];
    }
  },
  methods: {
    nextStep() {
      if (this.step < 3) this.step++;
    },
    prevStep() {
      if (this.step > 1) this.step--;
    },
    handleRegister() {
      if (!this.isFormComplete) {
        alert('Please fill all required fields.');
        return;
      }

      alert(`Registration complete for ${this.form.fullName}!`);
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.register-page {
  display: flex;
  height: 100vh;
  font-family: 'Inter', sans-serif;
  background-image: url('@/assets/images/pattern.jpg');
}

.form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  padding: 40px;
}

.form-box {
  width: 100%;
  max-width: 500px;
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

.input-group input,
textarea {
  padding: 12px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.nav-btn {
  padding: 10px 20px;
  background: #e5e7eb;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.nav-btn:hover {
  background: #d1d5db;
}

.register-btn {
  padding: 10px 24px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
}

.register-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.image-section {
  flex: 1;
  background: #d1fae5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-link {
  margin-top: 20px;
  text-align: center;
  font-size: 0.9rem;
}
.login-link a {
  color: #10b981;
  font-weight: 600;
  text-decoration: none;
}
</style>
