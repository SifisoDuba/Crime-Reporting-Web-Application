<template>
<footer class="footer">
  <div class="footer-content">
    <div class="footer-links">
        <router-link to="/admin-dashboard" exact>Dashboard</router-link>
        <router-link to="/admin-view-report">View Reports</router-link>
        <router-link to="/report-summary">Report Summary</router-link>
        <router-link to="/admin-emergency-contacts">Emergency contacts</router-link>
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