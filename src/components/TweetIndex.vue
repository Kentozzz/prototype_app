<template>
  <div class="contents row">
    <li v-for="tweet in tweets" :key="tweet.id" class="content_post" :style="{ backgroundImage: 'url(' + tweet.image + ')' }">
      <p>{{ tweet.title }}</p>
      <span class="name">
        <a href="#">{{ tweet.user_name }}</a>
      </span>
    </li>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'TweetIndex',
  data() {
    return {
      tweets: []
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:5000/api/tweet');
      this.tweets = response.data;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>
