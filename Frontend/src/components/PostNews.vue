<template>
  <div class="post-form">
    <h4>📝 Create a Post</h4>
    <input v-model="title" type="text" placeholder="Title" />
    <textarea v-model="content" placeholder="Write your news..."></textarea>
    <button @click="submitPost">Post</button>
  </div>
</template>

<script>
export default {
  name: "PostNews",
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    submitPost() {
      if (this.title.trim() && this.content.trim()) {
        this.$emit("new-post", {
          title: this.title,
          content: this.content
        });
        this.title = "";
        this.content = "";
      } else {
        alert("Title and content are required.");
      }
    }
  }
};
</script>

<style scoped>
.post-form {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}
.post-form input,
.post-form textarea {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
}
.post-form button {
  background-color: #2563eb;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.post-form button:hover {
  background-color: #1e40af;
}
</style>
