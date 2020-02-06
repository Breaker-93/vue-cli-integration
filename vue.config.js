const path = require("path")
const resolve = dir => path.join(__dirname, dir)
const addStylusResource = rule => {
  rule
    .use("style-resouce")
    .loader("style-resources-loader")
    .options({
      patterns: [resolve("src/assets/css/variable.styl"),
        resolve("src/assets/css/selector.styl"),
        resolve("src/assets/css/mixin.styl")]
    });
};

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH ,
  // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  // 默认为true，设为false则不对应每个js文件生成一个.map文件，加速生产构建。
  productionSourceMap: false,
  devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    // open: false, // 是否打开浏览器
    // host: "localhost",
    // port: "8080", // 代理断就
    // https: false,
    // hotOnly: false, // 热更新
    proxy: {
      "/api": {
        target:
          "http://www.baidu.com", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@comp", resolve("src/components"))
      .set("@plugins", resolve("src/plugins"))
      .set("@views", resolve("src/views"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"))
      .set("@layouts", resolve("src/layouts"))
      .set("@static", resolve("src/static"))
    const types = ["vue-modules", "vue", "normal-modules", "normal"]
    types.forEach(type =>
      addStylusResource(config.module.rule("stylus").oneOf(type))
    )
  },
  css: {
    sourceMap: false,
    loaderOptions: {
      stylus: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
        @import "@assets/css/selector.styl";
        `
      }
    }
  },
}