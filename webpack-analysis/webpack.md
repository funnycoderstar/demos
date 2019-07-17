# 起步
npm i --save-dev webpack
npm i --save-dev webpack-cli

```js
"scripts": {
    "build": "webpack --config webpack.config.js"
}
```
# 开始
mkdir webpack-demo && cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev


```js
<!doctype html>
<html>
  <head>
    <title>起步</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```
使用以上传统的方式管理js项目会有一些问题：
- 无法直接体现，脚本的执行依赖外部库
- 如果依赖不存在，或者引入顺序错误，应用程序将无法正常进行
- 如果依赖被引入但是并没有使用，浏览器将被迫下载无用代码

使用webpack管理项目。
npm install --save lodash

> 安装一个 package, 而此package要打包到`生产环境bundle`中时，你就应该使用`npm install --save`。如果你在安装一个用于开发环境目的的package时（如webpack）,你就应该使用`npm install --save-dev`

**创建一个bundle**
执行npx webpack. 会将我们的脚本 src/index.js作为入口起点，也会生成 dist/main.js 作为输出，
Node 8.2/npm 5.2.0 以上版本提供的 npx 命令，可以运行在开始安装的 webpack package 中的 webpack 二进制文件（即 ./node_modules/.bin/webpack）


**模块**
webpack 不会更改代码中除 import 和 export 语句以外的部分。

npx webpack --config webpack.config.js

如果 webpack.config.js 存在，则webpack命令将默认选择使用它。我们在这里使用 --config 选项只是向你表明，可以传递任何名称的配置文件。这对于需要拆分成多个文件的复杂配置是非常有用的。

**npm scripts**
可以使用npm run build 命令，来代替我们之前使用的 npx 命令。注意，使用 npm scripts , 我们可以想使用 npx 那样通过模块名引用本地安装的npm packages。这是大多数基于 npm 的项目遵循的标准，因为它允许所有贡献者使用同一组通用脚本（如果必要，每个 flag 都带有 --config 标志）。。

> 通过在 npm run build 命令和你的参数之间添加两个中横线，可以将自定义参数传递给 webpack，例如：npm run build -- --colors。

# 管理资源

**加载 CSS**
npm i --save-dev style-loader css-loader

在webpack中进行配置
```js
const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };

```
webpack根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的loader。在这个示例中所有以.css结尾的文件，都将被提供给style-loader和css-loader

这使你可以依赖此样式的js文件中import './style.css'，现在，在此模块执行过程中，含有 CSS 字符串的 <style> 标签，将被插入到 html 文件的 <head> 中。

**加载Images图像**
使用file-loader可以将像 background 和 icon 这样的图像等内容混合到css中

```js
npm install --save-dev file-loader
```
**加载fonts字体**
file-loader和url-laoder可以接受并加载文件，然后将其输出到构建目录，也就是说，我们可以将他们用于任何类型的文件，也包括字体。

# 管理输出
**自动地加载打包完后的bundle文件**
npm install --save-dev html-webpack-plugin
**清理/dist文件**
npm install --save-dev clean-webpack-plugin
**manifest**
webpack通过manifest，可以追踪到所有模块到输出bundle之间的映射.
通过 WebpackManifestPlugin 插件，可以将 manifest 数据提取为一个容易使用的 json 文件。

# 开发环境
watch mode模式，不需要重新编译，需要重新刷新浏览器
webpack-dev-server: 提供了一个简单的 web server, 并且具有 live reloading（实时重新加载）功能
```js
npm install --save-dev webpack-dev-server
```
修改配置文件，告诉dev server,从什么位置查找文件。
```js
const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    mode: 'development',
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```
以上配置告知 webpack-dev-server, 将dist目录下的文件serve到`localhost: 8080`下（serve,将资源作为server的可访问文件；

> webpack-dev-server在编译之后不会写到任何输入文件，而是将bundle文件保存在内存中，然后将它们serve到server中，就好像它们是挂载在server根路径上的真实文件一样。

webpack-dev-server中调用了webpack-dev-middleware和webpack-hot-middleware
webpack-dev-middleware:是一个封装器（wrapper）,它可以把webpack处理过得文件发送到一个server。webpack-dev-server在内部使用了它，它也可以作为独立的package来使用
webpack-hot-middleware: 在运行时更新所有类型的模块，而无需完全刷新。webpack-dev-server在内部使用了它，只需要配置一下就可以，它也可以作为独立的package来使用。

增量编译：只编译修改的部分，没修改的部分不重新编译
热更新：处理的是编译完成后的页面刷新部分，只刷新修改的内容，而无需重新刷新

# TypeScript
npm install --save-dev typescript ts-loader

# 环境变量



