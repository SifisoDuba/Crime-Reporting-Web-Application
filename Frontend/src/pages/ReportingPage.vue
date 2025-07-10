<template>
  <div class="container">
    <div class="header">
      <h1>🛡️ SafetyGuard</h1>
      <p>Report an Incident - Help Keep Your Community Safe</p>
    </div>

    <div class="form-container">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="incidentType">Incident Type <span class="required">*</span></label>
          <select v-model="form.incidentType" id="incidentType" required>
            <option value="" disabled>Select incident type</option>
            <option v-for="type in incidentTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="description">Description <span class="required">*</span></label>
          <textarea id="description" v-model="form.description" required placeholder="Please provide detailed information..."></textarea>
        </div>

        <div class="form-group">
          <label for="location">Location <span class="required">*</span></label>
          <div class="location-group">
            <input type="text" id="location" v-model="form.location" required placeholder="Enter location">
            <button type="button" class="location-btn" @click="useCurrentLocation">📍</button>
          </div>
          <div class="location-status" v-if="locationUsed">✓ Using your current location</div>
        </div>

        <div class="form-group">
          <label>Severity Level</label>
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
        </div>

        <div class="form-group">
          <label for="dateTime">Date & Time of Incident</label>
          <input type="datetime-local" id="dateTime" v-model="form.dateTime">
        </div>

        <div class="checkbox-group">
          <input type="checkbox" id="anonymous" v-model="form.anonymous">
          <label for="anonymous">Submit anonymously</label>
        </div>

        <div class="checkbox-group">
          <input type="checkbox" id="followUp" v-model="form.followUp">
          <label for="followUp">I would like to receive updates</label>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="addPhoto">📷 Add Photo</button>
          <button type="submit" class="btn btn-primary">Submit Report</button>
        </div>
      </form>
    </div>

    <div v-if="success" class="success-message">
      <div class="success-icon">✓</div>
      <h2>Report Submitted Successfully!</h2>
      <p>Your reference number is:</p>
      <div class="report-id"><strong>{{ reportId }}</strong></div>
      <button class="btn btn-primary" @click="resetForm">Submit Another Report</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CrimeReportForm",
  data() {
    return {
      incidentTypes: ["Theft", "Vandalism", "Assault", "Suspicious Activity", "Harassment", "Break-in", "Fraud", "Drug Activity", "Domestic Violence", "Other"],
      form: {
        incidentType: '',
        description: '',
        location: '',
        severity: 'medium',
        dateTime: new Date().toISOString().slice(0, 16),
        anonymous: false,
        followUp: true
      },
      success: false,
      reportId: '',
      locationUsed: false
    };
  },
  methods: {
    submitForm() {
      this.reportId = 'SR' + Math.random().toString(36).substring(2, 10).toUpperCase();
      console.log('Report Data:', this.form);
      this.success = true;
    },
    resetForm() {
      this.success = false;
      this.form = {
        incidentType: '',
        description: '',
        location: '',
        severity: 'medium',
        dateTime: new Date().toISOString().slice(0, 16),
        anonymous: false,
        followUp: true
      };
    },
    useCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const lat = pos.coords.latitude.toFixed(6);
          const lng = pos.coords.longitude.toFixed(6);
          this.form.location = `Current Location (${lat}, ${lng})`;
          this.locationUsed = true;
        }, err => {
          alert("Location access denied or unavailable.");
        });
      }
    },
    addPhoto() {
      alert("Photo upload not implemented in this mockup.");
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

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
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 25px;
}

label {
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
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.location-btn:hover {
  background: #4338ca;
}

.severity-options {
  display: flex;
  gap: 10px;
}

.severity-option input[type="radio"] {
  display: none;
}

.severity-label {
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
}

.severity-option input[type="radio"]:checked + .severity-label {
  border-color: #4f46e5;
  background: #4f46e5;
  color: white;
}

.severity-low .severity-label { border-color: #10b981; }
.severity-low input[type="radio"]:checked + .severity-label { background: #10b981; border-color: #10b981; color: white; }

.severity-medium .severity-label { border-color: #f59e0b; }
.severity-medium input[type="radio"]:checked + .severity-label { background: #f59e0b; border-color: #f59e0b; color: white; }

.severity-high .severity-label { border-color: #ef4444; }
.severity-high input[type="radio"]:checked + .severity-label { background: #ef4444; border-color: #ef4444; color: white; }

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}

.form-actions {
  margin-top: 30px;
  display: flex;
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

.btn-primary {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 2px solid #e5e7eb;
}

.success-message {
  text-align: center;
  padding: 40px;
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
  font-size: 2rem;
  margin: 0 auto 20px;
}

.report-id {
  background: #f3f4f6;
  padding: 15px;
  border-radius: 12px;
  border-left: 4px solid #4f46e5;
  font-family: 'Courier New', monospace;
  margin-top: 15px;
}
</style>
