const path = require('path')

module.exports = {
  productionSourceMap: true,
  devServer: {
    // webpack-dev-server 相关配置
    port: 5566, // 端口号
    // host: 'localhost',
    // https: false, // https:{type:Boolean}
    // open: true, // 配置自动启动浏览器
    // hotOnly: false
    proxy: {
      '/CORS': {
        target: 'http://api.zhuishushenqi.com',
        changeOrigin: true,
        pathRewrite: {
          '^/CORS': ''
        }
      }
    }
  },
  configureWebpack: config => {
    config.resolve.alias = {
      '@': path.join(__dirname, './src')
    }
  }
}
