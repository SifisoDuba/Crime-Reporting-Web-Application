<template>
  <div class="Dashboard">
    <Navbar />
    <h3 class="Header">Dashboard</h3>
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
.Dashboard {
  background-color:  #e6eff5;
  font-family: Arial, sans-seri;
}
.Header {
  color: #333;
  margin-top: 20px;
  margin-left: 10px;
}
</style>

