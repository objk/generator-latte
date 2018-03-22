# latte-mpa
B2B2C外接商户平台前端框架


### 使用
```bash
0. git clone http://git-ma.paic.com.cn/WUZHILONG860/latte-mpa.git
1. 把文件名(latte-mpa) 改为自己项目的名字
2. git remote remove origin
3. 在 Gitlib 上创建项目 repo
4. git remote add origin http://你项目的repo.git
5. git remote add framework http://framework.git
```


### 命令
开发环境： `npm run dev`

需要MOCK：`npm run mock`

打测试/生产包：`npm run build`


### 创建新页面一个 demo 页面
```
/src/demo/demo.html
/src/demo/demo.js
/src/demo/demo.vue
```


### 新增打包 vendor 拆分
目前基础模块有 `vue` `zepto` `core-js` `APIPlugin.js` 原来都是都打进 vendor

现在拆分为 vendor1, vendor2, vendor3


### 新增 图片压缩
`npm run build` 的时候会对图片进行压缩，压缩质量自己根据项目来调


### Add performance timing
在 chrome 调试工具，console 下可以看到页面性能相关的参数


### 新增打包文件超 100K 提醒
打测试/生产包时候会对 assetsFiles 大小超过 100K 的文件做提醒


### navbar 组件兼容 KDAPP 头部
调用 `<navbar>` 头部组件，在口袋环境下会调用口袋的头部，在非口袋环境就时候 H5 的头部（功能待优化...）


### APIPlugin.js 兼容口袋跳转
- 包含了 `go()` 方法，在口袋环境会使用口袋的跳转，非口袋环境时候 `location.href` 跳转

- 把接口注入 `Vue.prototype`, 所以每个 Vue instance 都可以直接访问
```js
    this.$APIs.getUser().then((res) => {
      console.log(res)
    })
```

### http-auth.js 整合登录组件
项目中如果要拦截接口调登录组件，把 `http.js` 换成 `http-auth.js`


### 移除 `unit` `e2e` test node_modules


### 新增打包测试/生产包时移除没使用的CSS样式功能

