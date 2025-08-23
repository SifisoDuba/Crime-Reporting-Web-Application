<template>
  <div class="admin-reports-view">
    <ViewReportsComp 
      :reports="reports" 
      :status-options="statusOptions"
      @status-selected="handleStatusSelected"
      @add-to-history="handleAddToHistory"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ViewReportsComp from '../components/ViewReportscomp.vue'

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
      reports: [
        { 
          id: 1,
          title: 'Murder',
          description: 'I found Elmo stabbed with multiple biscuit holes',
          date: '2023-11-15 14:30',
          status: 'Active',
          author: 'Cookie Monster',
          authorities: 'Police',
          location: '125 Sesame Street'
          
        },
        { 
          id: 2,
          title: 'Kidnapping',
          description: 'The vice president Joe Biden took my child',
          date: '2023-11-14 09:15',
          status: 'Investigating',
          author: 'Obama',
          authorities: 'Ambulance',
          location: 'Area 51'
        },
        { 
          id: 3,
          title: 'Break In',
          description: 'My biggest fan Kanye broke in the White House',
          date: '2023-11-13 03:45',
          status: 'Pending',
          author: 'Donald .T Duck',
          authorities: 'Fire Department',
          location: 'White House, Washington D.C.'
        }
      ],
      loading : false,
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
    }
  },

    async handleStatusSelected({ reportId, status }) {
      try {
        await axios.patch(`http://localhost:3000/api/reports/${reportId}/status`, { status });
        await this.fetchReports(); // Refresh reports after updating status
      } catch (err) {
        this.error = 'Failed to update status';
        console.error(err);
      }
    },
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
</style>
