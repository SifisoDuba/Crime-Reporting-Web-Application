<template>
  <div class="admin-reports-view">
    <div v-if="loading" class="loading">Loading reports...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ViewReportsComp
      v-else
      :reports="reports"
      :status-options="statusOptions"
      @status-selected="handleStatusSelected"
    @add-to-history="handleAddToHistory"
    @archive-report="handleArchiveReport"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ViewReportsComp from '../../components/ViewReportscomp.vue';

export default {
  components: {
    ViewReportsComp,
  },
  data() {
    return {
      statusOptions: [
        'Under Review',
        'In Progress',
        'Solved',
        'False Alarm',
        'Investigation',
        'External'
      ],
      reports: [],
      loading : true,
      error : null
    };
  },
  methods: {
  async fetchReports(){
    try {
      const response = await axios.get('http://localhost:3000/api/reports');
      this.reports = response.data;
    } catch (err){
      this.error = 'Failed to load reports';
      console.error(err);
    } finally {
      this.loading = false;
    }
  },

    async handleStatusSelected({ reportId, status }) {
      try {
        await axios.patch(`http://localhost:3000/api/reports/${reportId}/status`, { status });
        // Update local status immediately
        const report = this.reports.find(r => r.ReportId === reportId);
        if (report) {
          report.Status = status;
        }
      } catch (err) {
        this.error = 'Failed to update status';
        console.error(err);
      }
    },
   async handleAddToHistory(reportId) {
      try {
        await axios.post(`http://localhost:3000/api/reports/${reportId}/history`);
        await this.fetchReports(); // Refresh reports after adding to history
      } catch (err) {
        this.error = 'Failed to add report to history';
        console.error(err);
      }
    },
    async handleArchiveReport(reportId) {
      try {
        await axios.post(`http://localhost:3000/api/reports/${reportId}/archive`);
        await this.fetchReports(); // Refresh reports after archiving
      } catch (err) {
        this.error = 'Failed to archive report';
        console.error(err);
      }
    },
  },
  async mounted() {
    if (!localStorage.getItem('isLoggedIn')) {
      this.$router.push('/login');
      return;
    }
    await this.fetchReports(); // Fetch reports when the component is mounted
  }
};
</script>

<style scoped>
.admin-reports-view {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #666;
}

.error {
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
  font-size: 1.1rem;
}
</style>
