<template>
  <div class="Dashboard">
    <h3 class="Header">Dashboard</h3>
    <div v-if="posts.length === 0">Loading posts...</div>
    <div v-else>
      <NewsPost v-for="post in posts" :key="post.PostId" :post="post" />
    </div>
  </div>
</template>

<script>
import NewsPost from "../components/admin/NewsPost.vue";
import axios from "axios";

export default {
  name: "DashboardPage",
  components: { NewsPost },
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        this.posts = response.data;
        console.log("Posts fetched:", this.posts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        alert("Failed to load posts.");
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
.Dashboard {
  background-color: #e6eff5;
  min-height: 100vh;
}
.Header {
  color: #333;
  margin-top: 0px;
  margin-left: 10px;
}
</style>
