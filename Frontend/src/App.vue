<template>
  <div id="app">
    <Dashboard />
    <router-view /> 
  </div>
</template>

<script>
import Dashboard from './pages/Dashboard.vue';

export default {
  name: 'App',
  components: {
    Dashboard,
  },
};
</script>

