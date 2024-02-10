<!-- App.vue -->
<template>
  <div id="app">
    <AppHeader/>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';

import './assets/css/style.css'; 

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  }
};
</script>
