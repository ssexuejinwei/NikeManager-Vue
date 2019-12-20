module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://124.251.4.221/course/public/index.php/index',
        ws: true,
        changeOrigin: true
      }
    }
  },
  lintOnSave: false
}