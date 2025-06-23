<template>
  <div class="dashboard">
    <Navbar />
    <h2>Dashboard</h2>
    <NewsPost />
    <Footer />
  </div>
</template>

<script>
import NewsPost from "../components/NewsPost.vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "DashboardPage",
  components: {
    NewsPost,
    Navbar,
    Footer
  }
};
</script>
<style scoped>
.dashboard {
  background-color: #c1c1c1;
}
</style>

