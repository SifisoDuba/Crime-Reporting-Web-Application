<template>
  <div class="reports-component">
    <h1>Reports</h1>
    <div class="cards-container">
      <div class="report-card" v-for="report in reports" :key="report.id">
        <div class="card-header">
          <h2>{{ report.title }}</h2>
          <span class="badge">{{ report.status || 'New' }}</span>
        </div>
        <div class="meta-data">
          <span class="date">{{ report.date }}</span>
          <span class="divider">•</span>
          <span class="author">{{ report.author || 'System' }}</span>
        </div>
        
        <p class="description">Description: <br>{{ report.description }}</p>
        <p class="authorities">Authorities: {{report.authorities}}</p>
        <p class="location">Location: {{report.location}}</p>
        
        
        <div class="status-grid">
          <button
            v-for="status in statusOptions"
            :key="status"
            @click="selectStatus(report.id, status)"
            :class="{
              'status-btn': true,
              'selected': selectedStatuses[report.id] === status
            }"
          >
            {{ status }}
          </button>
        </div>
        
        <button 
          class="history-btn"
          @click="emitAddToHistory(report.id)"
        >
          Add to Report History
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    reports: {
      type: Array,
      required: true
    },
    statusOptions: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const selectedStatuses = ref({});

    const selectStatus = (reportId, status) => {
      // Toggle selection
      if (selectedStatuses.value[reportId] === status) {
        delete selectedStatuses.value[reportId];
      } else {
        selectedStatuses.value[reportId] = status;
      }
      
      // Reactivity is preserved with ref's reactivity system
      selectedStatuses.value = {...selectedStatuses.value};

      // Emit event to parent
      emit('status-selected', {
        reportId,
        status: selectedStatuses.value[reportId] || null
      });
    };

    const emitAddToHistory = (reportId) => {
      emit('add-to-history', reportId);
    };

    return {
      selectedStatuses,
      selectStatus,
      emitAddToHistory
    };
  }
};
</script>

<style scoped>
.reports-component {
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
  font-weight: 600;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1.8rem;
}

.report-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.25s ease;
  padding: 1.8rem;
  border: 1px solid #eaeaea;
}

.report-card:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12);
  transform: translateY(-3px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  background: #e3f2fd;
  color: #1976d2;
  font-weight: 500;
}

.description {
  color: #555;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.meta-data {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.location {
  color: #555;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.authorities {
  color: #555;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.divider {
  color: #ccc;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.status-btn {
  padding: 0.7rem;
  border: 1px solid #e0e0e0;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s;
  color: #424242;
  text-align: center;
}

.status-btn:hover {
  background: #f5f5f5;
}

.status-btn.selected {
  background: #000;
  color: white;
  border-color: #000;
}

.history-btn {
  width: 100%;
  padding: 0.85rem;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  color: #424242;
  margin-top: 1rem;
}

.history-btn:hover {
  background: #e0e0e0;
}
</style>

