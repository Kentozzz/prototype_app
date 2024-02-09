import { createRouter, createWebHistory } from 'vue-router';
import DataFetcher from '@/components/DataFetcher.vue';
import NewTweet from '@/components/NewTweet.vue';

export const router = createRouter({
  history: createWebHistory(), // “history” モードを使用
  routes: [
    {
      path: '/tweets/new',
      name: 'NewTweet',
      component: NewTweet
    },
    {
      path: '/',
      name: 'DataFetcher',
      component: DataFetcher
    },
    // 他のルートもここに追加できます
  ],
});

export default router;
