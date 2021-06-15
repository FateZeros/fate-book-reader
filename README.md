# fate-book-reader

![](https://img.shields.io/badge/script-vue-brightgreen)
![](https://img.shields.io/badge/script-typescript-brightgreen)

此项目主要用于实践 [Vue 3.0](https://v3.cn.vuejs.org/guide/migration/introduction.html)。</br>
前端主要使用的技术栈: Vue-cli 4.5 + Vue 3.0 + TypeScript + Vant 3.0 + scss </br>
后端使用技术栈: Nodejs + Koa。主要用于爬取书籍、提供 API 接口供前端使用

对于 `vue-cli` 的版本应大于 `4.5`，先查看 `vue` 的版本号

```bash
vue -V

// 升级 vue-cli
npm install -g @vue/cli or yarn global add @vue/cli
```

## 项目运行

```bash
// 安装依赖
yarn install

// 本地开发
yarn serve

// 打包
yarn build

// lint 检查
yarn lint
```

## 功能列表

前端功能

- [x] 我的
- [x] 书籍检索页面
- [x] 书架页面
- [x] 书籍阅读页面
  - [x] 书籍目录
  - [x] 阅读设置

后端功能 APIs

- [x] 根据书籍名称检索接口
- [x] 根据书籍名称查询书籍目录接口
- [x] 根据目录查询书籍章节内容接口
- [ ] 书籍下载接口

## 播放器的相关截图

![01_书架页面](https://github.com/FateZeros/fate-book-reader/blob/master/example/1.png = 375x669)
![02_书籍阅读](https://github.com/FateZeros/fate-book-reader/blob/master/example/2.png = 375x669) </br>
![03_书籍目录](https://github.com/FateZeros/fate-book-reader/blob/master/example/3.png = 375x669)
![04_书籍检索页面](https://github.com/FateZeros/fate-book-reader/blob/master/example/4.png = 375x669) </br>

### 常规配置

[Configuration Reference](https://cli.vuejs.org/config/).
