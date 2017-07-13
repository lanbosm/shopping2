//http://blog.csdn.net/hongchh/article/details/55113751
// nodejs 中的path模块
var path = require('path');
var utils = require('./utils')
var fs = require('fs');
var vueLoaderConfig = require('./vue-loader.conf')

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname, '../');
var srcDir = path.resolve(ROOT_PATH, 'src');
var libDir = path.resolve(ROOT_PATH, 'lib');


function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = [path.resolve(srcDir, 'js', item)];
        }
    });

    //给第三的口子
    return files;
}



module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: getEntry(),
    // 输出配置
    output: {
        path: path.join(ROOT_PATH, "./dist"),
        publicPath: "/",
        filename: "[name].js",
    },
    externals: {
        jquery: "window.jQuery",
        layer: "window.layer",
        LODOP:"window.LODOP"

    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            core: srcDir + "/js/core",
            ui: srcDir + "/js/ui",
            util: srcDir + "/js/util",
            less: srcDir + "/css/util",
            components : srcDir + "/app/components",
            lib:   path.join(ROOT_PATH, "./lib"),
            views : srcDir + "/app/views",
            vue$: 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    publicPath: "../",
                    name: utils.assetsPath('images/[name].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    publicPath: "../",
                    name: utils.assetsPath('fonts/[name].[ext]')
                }
            }
        ]
    }

}