# API开放平台

## 启动
```
yarn install
yarn serve
```

## 打包

测试服：
```
yarn build:test
```
正式服：
```
yarn build:prod
```

## 样式

样式用的`tailwindcss`框架处理。由于vue2.x的限制，当前使用的是较低版本的`tailwind`，相应的`postcss`和`autoprefixer`也都是较低版本。

极少数全局的样式手动在`/src/assets/style/index.css`中做的定义。

有需要定义全局类或样式主题，可在`tailwind.config.js`中添加相应配置。

建议在vs code中添加`Tailwind CSS IntelliSense`插件，获得代码提示支持。

详细教程：[tailwindcss](https://tailwindui.com/)

## Markdown

md文件通过`vue-dotmd-loader`包装为vue组件，支持md文件直接当作vue组件使用,也可以在md文件中引入vue组件或片段。

该loader内部通过markdown-it实现，可在`vue.config.js`中进行相关配置

md文档的锚点定位通过`markdown-it-anchor`在`h`标签上注入id值，然后在内部手动定位到锚点位置实现，具体详见代码。

md文件中引的图片通过`markdown-it-imsize`进行大小调整，语法为：`![image](img.png =200x300)`或`![image](img.png =200x)`。


#### 在开发文档页面添加MD文件

1. 在`/src/store/global.js`中，将MD文档的组件名添加到左侧文档对应的列表`MENU`中

2. 在`/src/views/DevDocView.vue`中引入该MD文档并注册为组件即可

    `global.js`中添加的MD文档名称需要和`DevDocView.vue`中注册的MD组件名称一致。


详细教程：[vue-dotmd-loader](https://mengdu.github.io/vue-dotmd-loader/index.html) | [markdown-it](https://github.com/markdown-it/markdown-it) | [markdown-it-imsize](https://github.com/tatsy/markdown-it-imsize)

## 