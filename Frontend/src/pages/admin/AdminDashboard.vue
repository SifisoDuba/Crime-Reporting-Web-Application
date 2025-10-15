<template>
  <div class="Dashboard">
    <div :class="['dashboard-content', { blurred: showModal || showEditModal }]">
      <div class="dashboard-header">
        <h3 class="Header">Admin Dashboard</h3>
        <button class="create-btn" @click="openModal">Create Post</button>
      </div>

      <NewsPost v-for="post in posts" :key="post.PostId" :post="post" :isAdmin="true" @edit="editPost" @delete="deletePost" />
    </div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h4>Create News Post</h4>

        <div class="modal-field">
          <label>Title</label>
          <input v-model="newPost.title" type="text" placeholder="Post Title" />
        </div>

        <div class="modal-field">
          <label>Author</label>
          <input v-model="newPost.author" type="text" placeholder="Author" />
        </div>

        <div class="modal-field">
          <label>Content</label>
          <textarea v-model="newPost.content" placeholder="Write your content..."></textarea>
        </div>

        <div class="modal-field">
          <label>Timestamp</label>
          <input type="text" :value="timestamp" disabled />
        </div>

        <div class="modal-actions">
          <button class="post-btn" @click="submitPost">Post</button>
          <button class="cancel-btn" @click="showModal = false">Cancel</button>
        </div>
      </div>
    </div>
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-content">
        <h4>Edit News Post</h4>

        <div class="modal-field">
          <label>Title</label>
          <input v-model="editingPost.title" type="text" placeholder="Post Title" />
        </div>

        <div class="modal-field">
          <label>Author</label>
          <input v-model="editingPost.author" type="text" placeholder="Author" />
        </div>

        <div class="modal-field">
          <label>Content</label>
          <textarea v-model="editingPost.content" placeholder="Write your content..."></textarea>
        </div>

        <div class="modal-actions">
          <button class="post-btn" @click="submitEdit">Update</button>
          <button class="cancel-btn" @click="showEditModal = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewsPost from "../../components/admin/NewsPost.vue";
import axios from 'axios';
import { reactive } from 'vue';

export default {
  name: "AdminDashboardPage",
  components: {
    NewsPost,
  },
  data() {
    return {
      showModal: false,
      showEditModal: false,
      timestamp: '',
      posts: [],
      newPost: {
        title: '',
        author: '',
        content: '',
        timestamp: new Date().toLocaleString(),
      },
      editingPost: reactive({
        PostId: null,
        title: '',
        author: '',
        content: '',
      }),
    };
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3000/posts');
        this.posts = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    openModal() {
      this.timestamp = new Date().toLocaleString();
      this.showModal = true;
    },
    async submitPost() {
      if (!this.newPost.title || !this.newPost.content || !this.newPost.author) {
        alert("All fields are required.");
        return;
      }
      try {
        const response = await axios.post('http://localhost:3000/upload-post', this.newPost);
        console.log(response);
        // Reload the page to refresh posts
        window.location.reload();
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
          console.log('Error:', err.response.data.message);
        } else {
          alert('Something went wrong.');
          console.log('Error:', err);
        }
      }
    },
    editPost(post) {
      this.editingPost.PostId = post.PostId;
      this.editingPost.title = post.Title;
      this.editingPost.author = post.Author;
      this.editingPost.content = post.Content;
      this.showEditModal = true;
    },
    async deletePost(postId) {
      try {
        await axios.delete(`http://localhost:3000/posts/${postId}`);
        alert('Post deleted successfully');
        this.fetchPosts();
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Failed to delete post');
      }
    },
    async submitEdit() {
      if (!this.editingPost.title || !this.editingPost.content || !this.editingPost.author) {
        alert("All fields are required.");
        return;
      }
      try {
        await axios.put(`http://localhost:3000/posts/${this.editingPost.PostId}`, {
          title: this.editingPost.title,
          content: this.editingPost.content,
          author: this.editingPost.author
        });
        alert('Post updated successfully');
        this.showEditModal = false;
        this.fetchPosts();
      } catch (err) {
        console.error('Error updating post:', err);
        alert('Failed to update post');
      }
    }
  },
  mounted() {
    if (!localStorage.getItem('isLoggedIn')) {
      this.$router.push('/login');
      return;
    }
    this.fetchPosts();
  }
};
</script>

<style scoped>
.Dashboard {
  background-color: #e6eff5;
  font-family: Arial, sans-serif;
  padding: 20px;
  min-height: 100vh;
  position: relative;
}

.dashboard-content {
  transition: filter 0.3s ease;
}
.blurred {
  filter: blur(5px);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.Header {
  color: #1f2937;
  font-size: 24px;
  font-weight: bold;
}

.create-btn {
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.create-btn:hover {
  background-color: #2563eb;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(17, 24, 39, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 12px;
  width: 95%;
  max-width: 700px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
  box-sizing: border-box;
}

.modal-content h4 {
  margin-bottom: 24px;
  text-align: center;
  color: #111827;
  font-size: 22px;
  font-weight: bold;
}

.modal-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
    color: #374151;
  margin-right: 18px;
}

.modal-field label {
  margin-bottom: 6px;
  font-weight: 600;
  color: #374151;
}

.modal-content input,
.modal-content textarea {
  width: 100%;
  padding: 12px 14px;
  border-radius: 6px;
  border: 1.5px solid #d1d5db;
  font-size: 1rem;
  background-color: #f9fafb;
  transition: border 0.2s ease;
}

.modal-content input:focus,
.modal-content textarea:focus {
  border-color: #3b82f6;
  outline: none;
  background-color: white;
}

.modal-content textarea {
  resize: vertical;
  min-height: 140px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
}

.post-btn {
  background-color: #10b981;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}
.post-btn:hover {
  background-color: #059669;
}

.cancel-btn {
  background: transparent;
  border: 1.5px solid #d1d5db;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.cancel-btn:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
