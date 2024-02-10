import { createRouter, createWebHistory } from 'vue-router';
import TweetIndex from '@/components/TweetIndex.vue';
import NewTweet from '@/components/NewTweet.vue';

export const router = createRouter({
  history: createWebHistory(), // “history” モードを使用
  routes: [
    {
      path: '/tweet/new',
      name: 'NewTweet',
      component: NewTweet
    },
    {
      path: '/',
      name: 'TweetIndex',
      component: TweetIndex
    },
    // 他のルートもここに追加できます
  ],
});

export default router;
