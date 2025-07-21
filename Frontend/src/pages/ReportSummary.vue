<template>
  <div class="report-list-page">
    <h2>All Crime Reports</h2>

    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search by Crime ID"
      class="search-bar"
    />

    <ReportItem
      v-for="report in filteredReports"
      :key="report.id"
      :id="report.id"
      :title="report.title"
      :reporter="report.reporter"
      @open="showSummary = true"
    />

    <div class="modal-overlay" v-if="showSummary">
      <div class="modal-content">
        <button class="close-button" @click="showSummary = false">X</button>
        <ReportSummary />
      </div>
    </div>
  </div>
</template>

<script>
import ReportItem from "@/components/ReportItem.vue";
import ReportSummary from "@/components/ReportSummary.vue";

export default {
  name: "ReportListPage",
  components: {
    ReportItem,
    ReportSummary,
  },
  data() {
    return {
      showSummary: false,
      searchQuery: "",
      reports: [
        { id: "CR-001", title: "House Burglary", reporter: "Sifiso Duba" },
        { id: "CR-002", title: "Car Theft", reporter: "John Doe" },
        { id: "CR-003", title: "Assault", reporter: "Jane Smith" },
      ],
    };
  },
  computed: {
    filteredReports() {
      if (!this.searchQuery) {
        return this.reports;
      }
      return this.reports.filter((report) =>
        report.id.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.report-list-page {
  max-width: 1000px;
  margin: 30px auto;
  padding: 20px;
  font-family: "Segoe UI", sans-serif;
}

.search-bar {
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 20px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  position: relative;
}

.close-button {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
}
</style>
