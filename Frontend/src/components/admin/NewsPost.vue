<template>
  <div class="news-card">
    <div class="news-header">
      <span class="author">{{ post.Author }}</span>
      <span class="timestamp">{{ formattedTime }}</span>
    </div>
    <h4 class="news-title">{{ post.Title }}</h4>
    <p class="news-content">
      {{ displayContent }}
      <span v-if="isTruncated" class="read-more" @click="toggleReadMore">
        {{ expanded ? ' Show less' : '... Read more' }}
      </span>
    </p>
    <div v-if="isAdmin" class="admin-actions">
      <button class="edit-btn" @click="editPost">Edit</button>
      <button class="delete-btn" @click="deletePost">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsPost",
  props: {
    post: {
      type: Object,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expanded: false
    };
  },
  computed: {
    formattedTime() {
      if (!this.post.Timestamp) return "";
      const date = new Date(this.post.Timestamp);
      return date.toLocaleString();
    },
    isTruncated() {
      if (!this.post.Content) return false;
      return this.post.Content.split(' ').length > 100;
    },
    displayContent() {
      if (!this.post.Content) return '';
      if (this.expanded || !this.isTruncated) {
        return this.post.Content;
      } else {
        return this.post.Content.split(' ').slice(0, 100).join(' ');
      }
    }
  },
  methods: {
    toggleReadMore() {
      this.expanded = !this.expanded;
    },
    editPost() {
      this.$emit('edit', this.post);
    },
    deletePost() {
      if (confirm('Are you sure you want to delete this post?')) {
        this.$emit('delete', this.post.PostId);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
.news-card {
  padding: 1rem;
  border: 1px solid #adc3cf;
  border-width: 2px;
  margin-bottom: 1rem;
  margin-top: -10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  margin-left: 10px;
  margin-right: 10px;
}

.news-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.news-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 5px;
  color: #777;
}

.author {
  font-weight: 600;
  color: #333;
}

.timestamp {
  font-weight: 400;
  color: #999;
}

.news-title {
  font-size: 1.2rem;
  margin: 5px 0 10px 0;
  color: #111;
}

.news-content {
  font-size: 1rem;
  line-height: 1.5;
  color: #444;
}

.read-more {
  color: #1d4ed8;
  cursor: pointer;
  font-weight: 600;
  margin-left: 5px;
}

.admin-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.edit-btn {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn:hover {
  background-color: #2563eb;
}

.delete-btn {
  background-color: #10b981;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #059669;
}

/* Responsive for mobile devices */
@media (max-width: 768px) {
  .news-card {
    padding: 15px;
  }
  .news-title {
    font-size: 1rem;
  }
  .news-content {
    font-size: 0.95rem;
  }
  .news-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .timestamp {
    margin-top: 2px;
  }
}
</style>
