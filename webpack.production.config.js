var path = require('path');
var webpack = require('webpack');
var fs = require('fs');


//var CleanWebpackPlugin = require('clean-webpack-plugin');// 删除文件
var CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");//提取文件 如.css

var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;  //压缩文件
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;//合并文件

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var srcDir = path.resolve(process.cwd(), 'src');



let extractCss= new ExtractTextPlugin("../css/element.css");
let extractLess = new ExtractTextPlugin("../css/[name].css");

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

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}


module.exports = {
    cache: true,
  //  devtool: "source-map",
    entry: {
        index:'./src/js/index.js'
    },
    output: {
        path: path.join(ROOT_PATH, "./dist"),
        publicPath: "/", //gulp 已经托管了WebpackDevServer
        filename: "[name].js",


    },
    externals: {
        jquery: "window.jQuery",
        layer: "window.layer"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader?limit=1200&name=../images/[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css-loader")

            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader?name=../fonts/[name].[ext]'
            }
        ]


    },
    resolve: {
        alias: {
            core: srcDir + "/js/core",
            ui: srcDir + "/js/ui",
            util: srcDir + "/js/util",
            less: srcDir + "/css/util",
            components : srcDir + "/app/components",
            lib:   path.join(ROOT_PATH, "./lib"),
            views : srcDir + "/app/views",
            vue$: 'vue/dist/vue'
        }
    },
    plugins: [
        //公共common   webpack.optimize（最优化）
        new CommonsChunkPlugin({
            name:'common',
            filename: "common.js",
        }),
         extractCss,
        // extractLess,
       // 加入了这个插件之后，编译的速度会明显变慢，所以一般只在生产环境启用。
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};