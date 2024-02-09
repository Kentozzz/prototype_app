<!-- App.vue -->
<template>
  <div id="app">
    <AppHeader/>
    <DataFetcher/>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';
import DataFetcher from './components/DataFetcher.vue';

import './assets/css/style.css'; 

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    DataFetcher
  }
};
</script>
