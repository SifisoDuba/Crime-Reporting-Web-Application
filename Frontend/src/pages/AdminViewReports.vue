<template>
  <div class="admin-reports-view">
    <AdminNavbar />
    <ViewReportsComp 
      :reports="reports" 
      :status-options="statusOptions"
      @status-selected="handleStatusSelected"
      @add-to-history="handleAddToHistory"
    />
    <AdminFooter />
    <div class="footer-spacer"></div>
  </div>
</template>

<script>
import ViewReportsComp from '../components/ViewReportscomp.vue'
import AdminNavbar from '../components/AdminNavbar.vue'
import AdminFooter from '../components/AdminFooter.vue'

export default {
  components: {
    AdminNavbar,
    ViewReportsComp,
    AdminFooter,
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
      ]
    };
  },
  methods: {
    handleStatusSelected({ reportId, status }) {
      console.log(`Report ${reportId} status selected: ${status}`);
      // Here you would typically update the report status in your database
    },
    handleAddToHistory(reportId) {
      console.log(`Adding report ${reportId} to history`);
      // Here you would typically add the report to history in your database
    }
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
