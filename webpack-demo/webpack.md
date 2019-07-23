## 编写一个简单的webpack loader
需求：将.txt后缀的文件中的内容倒叙并大写。
```js
const path = require('path');

module.exports = {
    entry: {
        app: './test.txt',
    },
    output: {
        filename: '[name].txt',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: [
                    './loaders/toUpperCase.js',
                    './loaders/reverse.js',
                ]
            }
        ]
    }
}
```
reverse.js
```js
// 倒叙
module.exports = function(src) {
    src = src.split('').reverse().join('');
    return src;
}
```
toUpperCase.js
```js
// 大写
module.exports = function(src) {
    src = src.toUpperCase();
    // 这里为什么要这么写？因为直接返回转换后的字符串会报语法错误，
    // 这么写import后转换成可以使用的字符串
    return `module.exports = '${src}'`;
}
```

## 编写一个简单的webpack plugin
https://juejin.im/post/5cb01f32e51d456e5e035ef7#heading-7
需求：多生成一个文件

my-webpack-plugin.js
```js
class MyWebpackPlugin {
    constructor(options) {
        console.log('插件被使用了');
        console.log('options = ', options);
    }
    apply(comiler) {
        // 同步钩子
        comiler.hooks.compile.tap('MyWebpackPlugin', () => {
            console.log('compile');
        })
        // 异步钩子
        comiler.hooks.emit.tapAsync(
            'MyWebpackPlugin',
            (compilation, cb) => {
                console.log(11, compilation.assets);
                // compilation.assets是打包后生成的文件名及后缀
                // 生成另外一个 another.txt 文件
                compilation.assets['another.txt'] = {
                    source: function() {
                        return 'another.txt by MyWebpackPlugin'
                    },
                    size: function() {
                        return 15; // 上面 source 返回的字符长度
                    }
                }
                console.log('compilation.assets = ', compilation.assets)
                cb();
            }
        )
    }
}

module.exports = MyWebpackPlugin;
```
```js
const path = require('path');
const MyWebpackPlugin = require('./plugin/my-webpack-plugin');

module.exports = {
    entry: {
        app: './test.txt',
    },
    mode: 'development',
    output: {
        filename: '[name].txt',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: [
                    './loaders/toUpperCase.js',
                    './loaders/reverse.js',
                ]
            }
        ]
    },
    plugins: [
        new MyWebpackPlugin({
            name: 'hahah'
        }),
    ]
}
```

## 编写一个简单的babel plugin
需求： 编写一个模块按需加载的babel插件

## 参考
[4 个实例入门并掌握「Webpack4」(三)](https://juejin.im/post/5cb01f32e51d456e5e035ef7)
[从0实现一个webpack loader](https://juejin.im/post/5cca59c4f265da038d0b5348)
[手把手教你撸一个 Webpack Loader](https://juejin.im/post/5a698a316fb9a01c9f5b9ca0)

https://github.com/ITxiaohao/webpack4-learn
https://github.com/chiwent/blog/issues/14