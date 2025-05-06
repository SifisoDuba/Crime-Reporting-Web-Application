<template>
  <div id="app">
    <h1>Vue + Express Full Stack App</h1>
  <p> I didn't copy this code i created it from scratch, this is to prove it is not a tamplate <br>(🕊️in loving memory of Sifiso Duba 2003-2025🕊️)</p>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Loading...'
    };
  },
  mounted() {
    fetch('/api/message')
      .then(res => res.json())
      .then(data => {
        this.message = data.message;
      })
      .catch(err => {
        console.error(err);
        this.message = 'Error connecting to backend.';
      });
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  text-align: center;
}
</style>
