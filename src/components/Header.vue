<template>
    <header class="header">
      <div class="header__bar row">
        <h1 class="grid-6"><a href="/">PicTweet</a></h1>
        <div class="user_nav grid-6">
          <router-link to="/tweet/new" class="post">投稿する</router-link>
        </div>
      </div>
    </header>
    <router-view></router-view>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>
