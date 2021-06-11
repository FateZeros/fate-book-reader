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
        target: 'localhost:9966',
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
  },
  chainWebpack: config => {
    // [sass-resources-loader](https://github.com/shakacode/sass-resources-loader)
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: ['./src/styles/index.scss']
        })
        .end()
    })
  }
}
