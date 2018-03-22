#### USAGE

##### Install `Yeoman` as global
> npm install -g yo

##### Clone `generator-latte`
> git clone https://github.com/objk/generator-latte.git

##### Change dir to `generator-latte` folder, and run `npm link`
> cd `generator-latte`

> npm link


#### 初始化项目文件
1.创建项目文件夹，并切换到该文件夹
2.运行 `yo latte`


#### 其它命令
创建组件 `yo latte:component navbar` 会在 src/components 下创建 `Navbar.vue` 组件

创建组件 `yo latte:component common/navbar` 会在 src/components/common 下创建 `Navbar.vue` 组件

创建页面 `yo latte:page about` 会在 src/views/ 下创建 `about` 文件夹，里面包含了 `about.html` `about.js` `about.vue`

创建 Mock data `yo latte:mock product` 会在 data/ 下创建 `product.json` 文件

创建 Plugin `yo latte:plugin test` 会在 src/plugin 下创建 `Test.Vue` 文件
