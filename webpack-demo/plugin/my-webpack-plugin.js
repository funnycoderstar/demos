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