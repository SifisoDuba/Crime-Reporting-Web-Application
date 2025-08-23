<template>
  <div class="user-report-summary-page">
    <UserReportSummary />
  </div>
</template>

<script>
import UserReportSummary from "@/components/UserReportSummary.vue";

export default {
  name: "UserReportSummaryPage",
  components: {
    UserReportSummary,
  },
};
</script>

<style scoped>
.user-report-summary-page {
  max-width: 1000px;
  margin: 30px auto;
  padding: 20px;
  font-family: "Segoe UI", sans-serif;
}
</style>
