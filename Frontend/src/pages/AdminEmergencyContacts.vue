<template>
  <div class="container">
    <div class="header">
      <h1>📞 Emergency Contacts</h1>
      <p>Quick access to emergency services and support</p>
    </div>

    <div class="search-section">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" v-model="searchQuery" placeholder="Search emergency contacts..." />
      </div>

      <div class="filter-tabs">
        <button
          v-for="category in categories"
          :key="category.id"
          :class="['filter-tab', { active: activeCategory === category.id }]"
          @click="setActiveCategory(category.id)"
        >
          {{ category.icon }} {{ category.name }}
        </button>
      </div>
    </div>

    <div class="contacts-section">
      <template v-if="filteredCategories.length">
        <div v-for="category in filteredCategories" :key="category.id">
          <h2 class="section-title">{{ category.icon }} {{ category.name }}</h2>
          <div class="contact-grid">
            <div
              v-for="contact in category.contacts"
              :key="contact.id"
              :class="['contact-card', { emergency: contact.isEmergency }]"
            >
              <div class="contact-header">
                <div class="contact-icon" :class="contact.iconClass">{{ contact.icon }}</div>
                <div>
                  <h3>{{ contact.name }}</h3>
                  <div class="contact-number">{{ contact.number }}</div>
                  <p class="contact-description">{{ contact.description }}</p>
                </div>
              </div>
              <div class="contact-actions">
                <button class="btn btn-primary" @click="callContact(contact.number)">📞 Call</button>
                <button class="btn btn-secondary" @click="showInfo(contact)">ℹ️ Info</button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="no-results">
          <h3>No contacts found</h3>
          <p>Try a different search term or filter</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      activeCategory: 'all',
      categories: [
        { id: 'all', name: 'All', icon: '📋' },
        { id: 'emergency', name: 'Emergency', icon: '🚨' },
        { id: 'medical', name: 'Medical', icon: '🏥' },
        { id: 'police', name: 'Police', icon: '👮' },
        { id: 'fire', name: 'Fire', icon: '🔥' },
        { id: 'support', name: 'Support', icon: '💬' }
      ],
      contacts: [
        {
          id: 'emergency',
          name: 'Emergency Services',
          contacts: [
            {
              id: '1',
              name: 'Emergency Hotline',
              number: '911',
              description: 'Available 24/7 for life-threatening situations.',
              icon: '🚨',
              iconClass: 'emergency',
              isEmergency: true
            }
          ]
        },
        {
          id: 'police',
          name: 'Police',
          contacts: [
            {
              id: '2',
              name: 'Local Police Station',
              number: '10111',
              description: 'For crime reports and emergencies.',
              icon: '👮',
              iconClass: 'police',
              isEmergency: true
            }
          ]
        },
        {
          id: 'medical',
          name: 'Medical',
          contacts: [
            {
              id: '3',
              name: 'Ambulance Services',
              number: '10177',
              description: 'Call for medical emergencies.',
              icon: '🚑',
              iconClass: 'medical',
              isEmergency: true
            }
          ]
        }
      ]
    };
  },
  computed: {
    filteredCategories() {
      let filtered = this.contacts;
      if (this.activeCategory !== 'all') {
        filtered = filtered.filter(cat => cat.id === this.activeCategory);
      }
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.map(cat => ({
          ...cat,
          contacts: cat.contacts.filter(contact =>
            contact.name.toLowerCase().includes(query) ||
            contact.description.toLowerCase().includes(query)
          )
        })).filter(cat => cat.contacts.length > 0);
      }
      return filtered;
    }
  },
  methods: {
    setActiveCategory(id) {
      this.activeCategory = id;
    },
    callContact(number) {
      window.location.href = `tel:${number}`;
    },
    showInfo(contact) {
      alert(`${contact.name}\n\n${contact.description}`);
    }
  },
  mounted() {
    if (!localStorage.getItem('isLoggedIn')) {
      this.$router.push('/login');
      return;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  font-family: 'Inter', sans-serif;
}

.header {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  padding: 30px;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 30px;
}

.search-box {
  position: relative;
  margin-bottom: 20px;
}

.search-box input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  font-size: 1rem;
  background: #f9fafb;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #6b7280;
}

.filter-tabs {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 8px 16px;
  border-radius: 10px;
  border: 2px solid #e5e7eb;
  background: #f3f4f6;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
}

.filter-tab.active {
  background: #7c3aed;
  color: white;
  border-color: #7c3aed;
}

.contacts-section {
  margin-top: 30px;
}

.section-title {
  font-size: 1.3rem;
  color: #374151;
  margin-bottom: 20px;
  font-weight: 700;
}

.contact-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.contact-card {
  border: 2px solid #e5e7eb;
  border-radius: 15px;
  padding: 20px;
  transition: 0.3s;
  background: #fff;
}

.contact-card.emergency {
  border-color: #ef4444;
  background: #fef2f2;
}

.contact-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.contact-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.emergency {
  background: linear-gradient(135deg, #ef4444, #b91c1c);
}
.police {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
}
.medical {
  background: linear-gradient(135deg, #10b981, #059669);
}

.contact-number {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: #4f46e5;
}

.contact-description {
  font-size: 0.9rem;
  color: #6b7280;
  margin-top: 4px;
}

.contact-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-primary {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  border: none;
}

.btn-secondary {
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  color: #374151;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}
</style>
