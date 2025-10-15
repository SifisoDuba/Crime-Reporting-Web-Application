<template>
  <div class="page-background">
    <div class="container">
      <div class="header">
        <h1>🛡️ SafetyGuard</h1>
        <p>Report an Incident - Help Keep Your Community Safe</p>
      </div>

      <!-- Show the form only if it hasn't been successfully submitted -->
      <div v-if="!success" class="form-container">
        <form @submit.prevent="submitForm">
          <!-- Incident Type -->
          <div class="form-group">
            <label for="incidentType">Incident Type <span class="required">*</span></label>
            <select v-model="form.incidentType" id="incidentType" required>
              <option value="" disabled>Select incident type</option>
              <option v-for="type in incidentTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="description">Description <span class="required">*</span></label>
            <textarea id="description" v-model="form.description" required
              placeholder="Please provide detailed information..."></textarea>
          </div>

          <!-- Location -->
          <div class="form-group">
            <label for="location">Location <span class="required">*</span></label>
            <div class="location-group">
              <input type="text" id="location" v-model="form.location" required
                placeholder="Enter address or describe the location">
              <button type="button" class="location-btn" @click="useCurrentLocation"
                title="Use my current location">📍</button>
            </div>
            <div class="location-status" v-if="locationUsed">✓ Using your current location</div>
          </div>

          <!-- Severity Level (with improved accessibility) -->
          <div class="form-group">
            <fieldset>
              <legend class="label">Severity Level</legend>
              <div class="severity-options">
                <div class="severity-option severity-low">
                  <input type="radio" id="low" value="low" v-model="form.severity">
                  <label for="low" class="severity-label">Low</label>
                </div>
                <div class="severity-option severity-medium">
                  <input type="radio" id="medium" value="medium" v-model="form.severity">
                  <label for="medium" class="severity-label">Medium</label>
                </div>
                <div class="severity-option severity-high">
                  <input type="radio" id="high" value="high" v-model="form.severity">
                  <label for="high" class="severity-label">High</label>
                </div>
              </div>
            </fieldset>
          </div>

          <div class="form-group">
            <fieldset>
              <legend class="label">Required Response Time</legend>
              <div class="response-options">
                <div class="response-option response-now">
                  <input type="radio" id="response-now" value="now" v-model="form.responseTime">
                  <label for="response-now" class="response-label">Now</label>
                </div>
                <div class="response-option response-later">
                  <input type="radio" id="response-later" value="later" v-model="form.responseTime">
                  <label for="response-later" class="response-label">Later</label>
                </div>
                <div class="response-option response-emergency">
                  <input type="radio" id="response-emergency" value="emergency" v-model="form.responseTime">
                  <label for="response-emergency" class="response-label">Emergency</label>
                </div>
              </div>
            </fieldset>
          </div>

          <!-- Date & Time -->
          <div class="form-group">
            <label for="dateTime">Date & Time of Incident</label>
            <input type="datetime-local" id="dateTime" v-model="form.dateTime">
          </div>

          <!-- Anonymous Submission -->
          <div class="checkbox-group">
            <input type="checkbox" id="anonymous" v-model="form.anonymous">
            <label for="anonymous">Submit anonymously</label>
          </div>

          <!-- Follow-up -->
          <div class="checkbox-group">
            <input type="checkbox" id="followUp" v-model="form.followUp">
            <label for="followUp">I would like to receive updates</label>
          </div>

          <!-- Hidden file input for photo uploads -->
          <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" accept="image/*">

          <!-- Form Actions -->
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="triggerFileUpload">📷 Add Photo</button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Submitting...' : 'Submit Report' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Success Message -->
      <div v-else class="success-message">
        <div class="success-icon">✓</div>
        <h2>Report Submitted Successfully!</h2>
        <p>Your reference number is:</p>
        <div class="report-id"><strong>{{ reportId }}</strong></div>
        <button class="btn btn-primary" @click="resetForm">Submit Another Report</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "CrimeReportForm",
  data() {
    return {
      incidentTypes: [
        "Theft", "Vandalism", "Assault", "Suspicious Activity",
        "Harassment", "Break-in", "Fraud", "Drug Activity",
        "Domestic Violence", "Other"
      ],
      form: {
        incidentType: '',
        description: '',
        location: '',
        severity: '',
        responseTime: '',
        dateTime: (() => {
          const now = new Date();
          return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}T${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
        })(),
        anonymous: false,
        followUp: true,
        photo: null
      },
      isSubmitting: false, // For loading state
      success: false,
      reportId: '',
      locationUsed: false
    };
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true;

      if (
        !this.form.incidentType ||
        !this.form.description ||
        !this.form.location ||
        !this.form.severity ||
        !this.form.responseTime
      ) {
        alert('Please fill all required fields.');
        this.isSubmitting = false;
        return;
      }

      console.log('Submitting form:', this.form);

      try {
        // Get user ID from localStorage
        const userId = localStorage.getItem('idNumber');

        if (!userId) {
          alert('User not logged in. Please log in to submit a report.');
          this.isSubmitting = false;
          return;
        }

        // Convert local datetime to UTC for backend storage
        const localDate = new Date(`${this.form.dateTime}:00`);
        const utcDateTime = localDate.toISOString().slice(0, 19).replace('T', ' ');

        // Create FormData for multipart/form-data
        const formData = new FormData();
        formData.append('incidentType', this.form.incidentType);
        formData.append('description', this.form.description);
        formData.append('location', this.form.location);
        formData.append('severity', this.form.severity);
        formData.append('responseTime', this.form.responseTime);
        formData.append('dateTime', utcDateTime);
        formData.append('anonymous', this.form.anonymous);
        formData.append('followUp', this.form.followUp);
        formData.append('userId', userId);
        if (this.form.photo) {
          formData.append('photo', this.form.photo);
        }

        const res = await axios.post('http://localhost:3000/report', formData);
        console.log("Success:", res.data);
        this.success = true;
        this.reportId = res.data.reportId;
      } catch (error) {
        if (error.response) {
          console.error("Server Error:", error.response.data);
          alert(`Server Error (${error.response.status}): ${error.response.data.message || 'Something went wrong.'}`);
        } else if (error.request) {
          console.error("No Response:", error.request);
          alert("No response from server. Please check your connection or try again later.");
        } else {
          console.error("Request Error:", error.message);
          alert(`Error: ${error.message}`);
        }
      } finally {
        this.isSubmitting = false;
      }
    },


    resetForm() {
      this.success = false;
      this.locationUsed = false;
      this.isSubmitting = false;
      this.form = {
        incidentType: '',
        description: '',
        location: '',
        severity: '',
        responseTime: '',
        dateTime: (() => {
          const now = new Date();
          return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}T${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
        })(),
        anonymous: false,
        followUp: true,
        photo: null
      };
    },

    useCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            const lat = pos.coords.latitude.toFixed(6);
            const lng = pos.coords.longitude.toFixed(6);
            this.form.location = `Lat: ${lat}, Lng: ${lng}`;
            this.locationUsed = true;
          },
          () => {
            alert("Location access was denied. Please enable it in your browser settings to use this feature.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    },

    triggerFileUpload() {
      this.$refs.fileInput.click();
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.photo = file;
        alert(`Photo "${file.name}" selected successfully.`);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.page-background {
  padding: 40px 20px;
  min-height: 100vh;
  box-sizing: border-box;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  font-family: 'Inter', sans-serif;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 30px;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 10px;
}

.header p {
  margin: 0;
  opacity: 0.9;
}

.form-group {
  margin-bottom: 25px;
}

label,
.label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  display: block;
}

.required {
  color: #ef4444;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  background: #fafafa;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #4f46e5;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.location-group {
  display: flex;
  gap: 10px;
}

.location-btn {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 0 15px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.location-btn:hover {
  background: #4338ca;
}

.location-status {
  margin-top: 8px;
  color: #10b981;
  font-weight: 600;
  font-size: 0.9rem;
}

fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

.severity-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.response-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.severity-option input[type="radio"] {
  display: none;
}

.response-option input[type="radio"] {
  display: none;
}

.severity-label {
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  display: block;
}

.response-label {
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  display: block;
}

.severity-option input[type="radio"]:checked+.severity-label {
  font-weight: 700;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.response-option input[type="radio"]:checked+.severity-label {
  font-weight: 700;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.severity-low .severity-label {
  border-color: #10b981;
}

.severity-low input[type="radio"]:checked+.severity-label {
  background: #10b981;
  border-color: #059669;
  color: white;
}

.severity-medium .severity-label {
  border-color: #f59e0b;
}

.severity-medium input[type="radio"]:checked+.severity-label {
  background: #f59e0b;
  border-color: #d97706;
  color: white;
}

.severity-high .severity-label {
  border-color: #ef4444;
}

.severity-high input[type="radio"]:checked+.severity-label {
  background: #ef4444;
  border-color: #dc2626;
  color: white;
}


.response-now .response-label {
  border-color: #10b981;
}

.response-now input[type="radio"]:checked+.response-label {
  background: #10b981;
  border-color: #059669;
  color: white;
}

.response-later .response-label {
  border-color: #f59e0b;
}

.response-later input[type="radio"]:checked+.response-label {
  background: #f59e0b;
  border-color: #d97706;
  color: white;
}

.response-emergency .response-label {
  border-color: #ef4444;
}

.response-emergency input[type="radio"]:checked+.response-label {
  background: #ef4444;
  border-color: #dc2626;
  color: white;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}

.checkbox-group input[type="checkbox"] {
  width: 1.2em;
  height: 1.2em;
}

.form-actions {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.btn {
  padding: 12px 20px;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-primary {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 2px solid #e5e7eb;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #e5e7eb;
}

.success-message {
  text-align: center;
  padding: 40px;
  animation: slideUp 0.6s ease-out;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  margin: 0 auto 20px;
}

.report-id {
  background: #f3f4f6;
  padding: 15px;
  border-radius: 12px;
  border-left: 4px solid #4f46e5;
  font-family: 'Courier New', monospace;
  margin-top: 15px;
  margin-bottom: 30px;
  display: inline-block;
}
</style>
