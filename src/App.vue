<!-- App.vue -->
<template>
  <div id="app">
    <AppHeader/>
    <TweetIndex/>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';
import TweetIndex from './components/TweetIndex.vue';

import './assets/css/style.css'; 

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    TweetIndex
  }
};
</script>
