// nodejs 中的path模块
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: {
        index: [
            path.resolve(__dirname, '../src/app/index.js')
        ]
    },
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.resolve(__dirname, '../dist/static'),
        publicPath: 'static/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            'Vue': 'vue/dist/vue.js'
        }
    },
    module: {

        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js?$/,                   
                loader: 'babel',         //es6语法
                exclude: /node_modules/, // include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
                query: {
                    presets: ['es2015'],//也可以通过外部配置文件.babelrc
                    plugins:['transform-runtime']
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:"玩玩",
            filename: '../index.html',
            template: path.resolve(__dirname, '../src/app/index.html'),
            inject: true
        }),


    ]
}