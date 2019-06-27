# demos
学习过程中的各种小例子

## 目录
- [GraphQL小示例](https://github.com/funnycoderstar/demos/tree/master/GraphQL)
- [JWT小示例](https://github.com/funnycoderstar/demos/tree/master/JWT)
- [koa-cors源码解析](https://github.com/funnycoderstar/demos/tree/master/koa/koa-cors)
- [koa-bodyparser源码解析](https://github.com/funnycoderstar/demos/tree/master/koa/koa-bodyparser)
- [简单的富文本编辑器](https://github.com/funnycoderstar/demos/blob/master/vue-project/src/views/RichTextEditor/RichTextEditor.vue)
- [从零开始实现一个cli工具](https://github.com/funnycoderstar/demos/tree/master/super-cli)


## 其他
### 安装 [nodemon](https://github.com/remy/nodemon)

nodemon是一种工具，通过在检测到目录中的文件更改时自动重新启动节点应用程序来帮助开发基于node.js的应用程序
```js
npm i -g nodemon
```

### 安装 [http-server](https://github.com/indexzero/http-server)
`http-server`是基于node.js的HTTP 服务器，它最大的好处就是：可以使用任意一个目录成为服务器的目录，完全抛开后端的沉重工程，直接运行想要的js代码;

```js
npm i -g http-server
```
更多可以参考[如何启动一个本地静态服务器](https://github.com/funnycoderstar/blog/issues/72)

### mongo
```js
brew cask install docker
docker pull mongo
docker run --name mongodb -p 27017:27017 mongo
```
https://hub.docker.com/

## 说明
以上这些例子本人均在浏览器和命令行进行过测试，如果问题欢迎PR或者联系本人😆