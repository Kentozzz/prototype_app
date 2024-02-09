const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      }
    }
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['__VUE_PROD_DEVTOOLS__'] = false;
      args[0]['__VUE_OPTIONS_API__'] = true;
      args[0]['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = true; // ここで機能フラグを追加
      
      return args;
    });
  }
});
