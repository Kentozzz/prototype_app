<template>
  <div class="contents row">
    <div class="container">
      <h3>投稿する</h3>
      <form @submit.prevent="submitTweet">
        <div>
            <input id="user_name" v-model="tweet.user_name" name="user_name" required placeholder="Nick Name">
        </div>
        <div>
            <input type="text" id="image" v-model="tweet.image" name="image" required placeholder="Image Url">
        </div>
        <div>
            <textarea id="title" v-model="tweet.title" type="text" required placeholder="text"></textarea>
        </div>
        <button type="submit">SEND</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewTweet',
  data() {
    return {
      tweet: {
        image: '',
        title: '',
        user_name: '',
      }
    };
  },
  methods: {
    async submitTweet() {
      try {
        let response = await axios.post('http://localhost:5000/api/tweet/create', this.tweet);
        console.log(response.data);
        this.$router.push('/');
        // 投稿後のアクション（例：フォームをクリア、通知を表示、ページ遷移など）
      } catch (error) {
        console.error("エラー発生:", error);
        // エラーが発生した場合の処理
      }
    }
  }
};
</script>

