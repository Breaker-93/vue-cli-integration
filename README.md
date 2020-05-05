# vue-cli 4.0 integration
> 基础配置 + axios配置(拦截处理) + router配置（拦截处理） 
> \+  基础权限管理模块（登录授权、用户、角色、组/部门、用户与角色、用户与部门、角色与权限、操作日志）

> 后端接口服务：https://github.com/Breaker-93/spring-server-integration/tree/feat-base-auth
## 基础配置
### 配置多环境变量
#### 1、创建变量文件
  在项目根目录下创建.env等文件，文件内定义便来给你。只有以 VUE_APP 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中，代码中可以通过 process.env.VUE_APP_BASE_API 访问。
  NODE_ENV 和 BASE_URL 是两个特殊变量，在代码中始终可用
* .env
serve 默认的本地开发环境配置
```
NODE_ENV = "development"
BASE_URL = "./"

VUE_APP_PUBLIC_PATH = "./"
VUE_APP_API = "https://127.0.0.1/api"
```
* .env.production
build 默认的构建环境配置（生产服务器）
```
NODE_ENV = 'production'
BASE_URL = 'https://prod.breaker93.com/'

VUE_APP_PUBLIC_PATH = 'https://prod.oss.com/staven-blog'
VUE_APP_API = 'https://prod.breaker93.com/api'

ACCESS_KEY_ID = 'xxxxxxxxxxxxx'
ACCESS_KEY_SECRET = 'xxxxxxxxxxxxx'
REGION = 'oss-cn-hangzhou'
BUCKET = 'staven-prod'
PREFIX = 'staven-blog'
```
* .env.crm
自定义 build 构建环境配置（预发服务器）
```
NODE_ENV = "production"
BASE_URL = "https://crm.breaker93.com/"
VUE_APP_PUBLIC_PATH = "https://crm.oss.com/breaker-blog"
VUE_APP_API = "https://crm.breaker93.com/api"

ACCESS_KEY_ID = "xxxxxxxxxxxxx"
ACCESS_KEY_SECRET = "xxxxxxxxxxxxx"
REGION = "oss-cn-hangzhou"
BUCKET = "breaker-crm"
PREFIX = "breaker-blog"

IS_ANALYZE = true
```
#### 2、修改package.json中scripts配置项
  serve和build如果使用默认的配置文件，就不需要改动。
```
"scripts": {
  "serve": "vue-cli-service serve",
  "build": "vue-cli-service build",
  "crm": "vue-cli-service build --mode crm"
}

```
### 配置开发环境下的服务器代理
  vue.config.js中设置devServer配置项中的proxy
```
module.exports = {
  devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    // open: false, // 是否打开浏览器
    // host: "localhost",
    // port: "8080", // 代理断就
    // https: false,
    // hotOnly: false, // 热更新(暂时测试无用)
    proxy: {
      "/api": {
        target:
          "https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
```
### 设置别名
  vue.config.js中设置chainWebpack配置项
```
const path = require("path");
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@scss", resolve("src/assets/scss"))
      .set("@components", resolve("src/components"))
      .set("@plugins", resolve("src/plugins"))
      .set("@views", resolve("src/views"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"))
      .set("@layouts", resolve("src/layouts"))
      .set("@static", resolve("src/static"));
  }
};
```