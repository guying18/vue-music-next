const registerRouter = require('./backend/router')

module.exports = {
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       // 全局引入变量和 mixin
  //       additionalData: `
  //         @import "@/assets/scss/variable.scss";
  //         @import "@/assets/scss/mixin.scss";
  //       `
  //     }
  //   }
  // }
  devServer: {
    before (app) {
      registerRouter(app)
    }
  },
  // 打包分析插件 BundleAnalyzerPlugin
  configureWebpack: (config) => {
    // 执行 npm run build --report 时启用
    if (process.env.npm_config_report) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  // 开 SourceMap 的话 ，别人很容易看到源码
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/music-next/' : '/'
}
