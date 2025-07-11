<template>
<footer class="footer">
  <div class="footer-content">
    <div class="footer-links">
        <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        <li><router-link to="/view-reports">View Reports</router-link></li>
        <li><router-link to="/report-summary">Report Summary</router-link></li>
        <li><router-link to="/profile">Profiles</router-link></li>
        <li><router-link to="/emergency">Emergency contacts</router-link></li>
        <li><router-link to="/about">About us</router-link></li>
        <li><router-link to="/reportingpage">Report Crime</router-link></li>
    </div>
    <div class="footer-info">
        <p>©{{ new Date().getFullYear() }} Crime Report System. All rights reserved.</p>
        <p class="disclaimer">⚠️ Please note: False reports may result in legal action.</p><br>
        <p><router-link to="https://www.saps.gov.za/legislation/acts/act68of1995.pdf">Terms & Conditions</router-link> | <router-link to="/privacy">Privacy Policy</router-link></p>
        
      </div>
      <div class="Emergency-contacts">
        <p>Emergency Contacts:</p>
        <p>Police: 10111</p>
        <p>Ambulance: 10177</p>
        <p>Fire Department: 10177</p>
        <p>Crime Stop: 086 001 0111</p>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'AdminFooter',
};
</script>
<style src ="@/assets/styles/Footer.css"></style>