<template>
  <div class="user-reports-component">
    <h1>Your Crime Reports</h1>
    <div v-if="loading" class="loading">Loading your reports...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-if="reports.length" class="cards-container">
        <div class="report-card" v-for="report in reports" :key="report.id">
          <div class="card-header">
            <h2>{{ report.incidentType }}</h2>
            <span class="badge" :class="getStatusClass(report.status)">{{ report.status || 'Pending' }}</span>
          </div>
          <div class="meta-data">
            <span class="date">{{ formatDateTime(report.dateTime) }}</span>
            <span class="divider">•</span>
            <span class="severity">Severity: {{ report.severity }}</span>
          </div>
          
          <p class="description">{{ report.description }}</p>
          <p class="location">📍 {{ report.location }}</p>
          <p class="response-time">Response: {{ getResponseTimeLabel(report.responseTime) }}</p>
          
          <div class="report-meta">
            <span class="anonymous" v-if="report.anonymous">Submitted anonymously</span>
            <span class="follow-up" v-if="report.followUp">Follow-up requested</span>
          </div>
          
          <div class="report-id">Report ID: {{ report.id }}</div>
        </div>
      </div>
      <div v-else class="no-reports">
        <p>You haven't submitted any reports yet.</p>
        <router-link to="/reporting" class="report-link">Submit your first report</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "UserReportSummary",
  data() {
    return {
      reports: [],
      loading: true,
      error: null
    };
  },
  mounted() {
    this.fetchUserReports();
  },
  methods: {
    async fetchUserReports() {
      this.loading = true;
      try {
        // Get user email from localStorage
        const userEmail = localStorage.getItem('userEmail') || 'test@gmail.com';
        
        const response = await axios.get(`http://localhost:3000/api/user-reports?email=${userEmail}`);
        this.reports = response.data;
      } catch (error) {
        console.error('Error fetching user reports:', error);
        this.error = 'Failed to load your reports. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    
    formatDateTime(dateTime) {
      if (!dateTime) return 'Date not specified';
      return new Date(dateTime).toLocaleString();
    },
    
    getStatusClass(status) {
      const statusClasses = {
        'Pending': 'status-pending',
        'Under Review': 'status-review',
        'In Progress': 'status-progress',
        'Solved': 'status-solved',
        'False Alarm': 'status-false',
        'Investigation': 'status-investigation',
        'External': 'status-external'
      };
      return statusClasses[status] || 'status-pending';
    },
    
    getResponseTimeLabel(responseTime) {
      const labels = {
        'now': 'Immediate',
        'later': 'Within 24 hours',
        'emergency': 'Emergency response'
      };
      return labels[responseTime] || responseTime;
    }
  }
};
</script>

<style scoped>
.user-reports-component {
  font-family: Arial, sans-serif;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
  font-weight: 600;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
}

.error {
  color: #e74c3c;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.8rem;
}

.report-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.25s ease;
  padding: 1.8rem;
  border: 1px solid #eaeaea;
}

.report-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(-3px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.badge {
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-weight: 500;
  text-transform: uppercase;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-review {
  background: #e3f2fd;
  color: #1976d2;
}

.status-progress {
  background: #d1ecf1;
  color: #0c5460;
}

.status-solved {
  background: #d4edda;
  color: #155724;
}

.status-false {
  background: #f8d7da;
  color: #721c24;
}

.status-investigation {
  background: #fff3cd;
  color: #856404;
}

.status-external {
  background: #e2e3e5;
  color: #383d41;
}

.meta-data {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.divider {
  color: #ccc;
}

.description {
  color: #555;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.location, .response-time {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.report-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
}

.anonymous, .follow-up {
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
}

.anonymous {
  background: #f0f0f0;
  color: #666;
}

.follow-up {
  background: #e8f5e8;
  color: #2e7d32;
}

.report-id {
  font-size: 0.8rem;
  color: #999;
  text-align: right;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.no-reports {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.report-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background: #4f46e5;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.report-link:hover {
  background: #4338ca;
}
</style>
