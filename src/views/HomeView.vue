<!-- src/views/HomeView.vue -->
<template>
  <div>
    <!-- <h1>Welcome to Home</h1> -->
    <DompetView /> <!-- Tampilkan komponen View di sini -->
  </div>
</template>

<script>
import DompetView from './DompetView.vue';

export default {
  name: 'HomeView',
  components: {
    DompetView
  }
};
</script>
