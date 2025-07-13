<template>
  <div class="Dashboard">
    <h3 class="Header">Dashboard</h3>
    <NewsPost />
  </div>
</template>

<script>
import NewsPost from "../components/NewsPost.vue";

export default {
  name: "DashboardPage",
  components: {
    NewsPost,
  }
};
</script>
<style scoped>
.Dashboard {
  background-color:  #e6eff5;
  font-family: Arial, sans-serif;
  min-height: 100vh;
}
.Header {
  color: #333;
  margin-top: 20px;
  margin-left: 10px;
}
</style>

