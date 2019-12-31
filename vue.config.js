module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // target: 'https://www.baidu.com',
        target: 'http://124.251.4.221/course/public/index.php/index/',
        changeOrigin: true,
        pathRewrite: {
                     '^/api': ''
                   }
        }
    }
  },
  lintOnSave: false
}