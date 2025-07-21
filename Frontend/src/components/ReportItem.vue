<template>
  <div class="report-item" @click="$emit('open')">
    <p><strong>Crime ID:</strong> {{ id }}</p>
    <p><strong>Title:</strong> {{ title }}</p>
    <p><strong>Reporter:</strong> {{ reporter }}</p>
  </div>
</template>

<script>
export default {
  name: "ReportItem",
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    reporter: {
      type: String,
      required: true,
    },
  },
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
