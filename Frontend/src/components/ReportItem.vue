<template>
  <div class="report-item" @click="$emit('open')">
    <p><strong>Crime ID:</strong> CR-001</p>
    <p><strong>Title:</strong> House Burglary</p>
    <p><strong>Reporter:</strong> Sifiso Duba</p>
  </div>
</template>

<script>
export default {
  name: "ReportItem",
};
</script>

<style scoped>
.report-item {
  background: #fff;
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}
.report-item:hover {
  background: #f0f4ff;
}
</style>
