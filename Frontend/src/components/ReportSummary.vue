<template>
  <div class="report-summary">
    <h2>Crime Report Summary</h2>
    <div class="summary-card">
      <p><strong>Crime ID:</strong> CR-001</p>
      <p><strong>Reporter:</strong> Sifiso Duba</p>
      <p><strong>Reporter Email:</strong> sifiso@example.com</p>
      <p><strong>Assigned Admin:</strong> Officer Jane Smith</p>
      <p><strong>Crime Title:</strong> House Burglary</p>
      <p><strong>Description:</strong> Break-in occurred at 2 AM in Khayelitsha.</p>
      <p><strong>Location:</strong> Cape Town, Western Cape</p>
      <p><strong>Date & Time:</strong> 2025-07-10 02:15 AM</p>
      <p><strong>Status:</strong> Pending</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportSummary",
};
</script>

<style scoped>
.report-summary {
  font-family: "Segoe UI", sans-serif;
}
.summary-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
}
.summary-card p {
  margin: 10px 0;
}
</style>
