<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/reportingpage">Report Crime</router-link>
        <router-link to="/emergency-contacts">Emergency contacts</router-link>
        <router-link to="/">About us</router-link>
      </div>
      <div class="footer-info">
        <p>©{{ new Date().getFullYear() }} Crime Report System. All rights reserved.</p>
        <p class="disclaimer">⚠️ Please note: False reports may result in legal action.</p><br>
        <p>
  <a href="https://www.saps.gov.za/legislation/acts/act68of1995.pdf" target="_blank" rel="noopener noreferrer">
    Terms & Conditions
  </a> 
  | 
    <a href="https://www.policinginstitute.org/privacy-policy/" target="_blank" rel="noopener noreferrer">
    Terms & Conditions
  </a> 
</p>

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
  name: 'AppFooter',
};
</script>

<style src="@/assets/styles/Footer.css"></style>