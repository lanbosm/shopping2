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



let extractCss= new ExtractTextPlugin(path.resolve(__dirname,"./dist/css/[name].css"));
let extractLess = new ExtractTextPlugin(path.resolve(__dirname,"./dist/css/[name].css"));

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

    return files;
}


module.exports = {
    cache: true,
  //  devtool: "source-map",
    entry: getEntry(),

    output: {
        path: path.join(ROOT_PATH, "./dist"),
        publicPath: "/js", //gulp 已经托管了WebpackDevServer
        filename: "[name].js",
    },
    externals: {
        jquery: "window.jQuery",
        layer: "window.layer"
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',         //es6语法
                exclude: /node_modules/, // include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
                query: {
                    presets: ['es2015'],//也可以通过外部配置文件.babelrc
                    plugins:['transform-runtime']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css-loader")
                //loader: "style-loader!css-loader",
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css-loader!less-loader'),

            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/,
                loader: 'file-loader?name=[hash].[ext]'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=1200&name=/dist/images/[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            },
            {
                test:/\.vue$/,
                loader:'vue'

            }
        ],
        noParse: []
    },
    resolve: {
        alias: {
            jquery: path.join(ROOT_PATH, "./lib/jquery.min.js"),   //别名
            core: srcDir + "/js/core",
            ui: srcDir + "/js/ui",
            util: srcDir + "/js/util",
            less: srcDir + "/css/util",
            components : srcDir + "/app/components",
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
        extractLess,
       // 加入了这个插件之后，编译的速度会明显变慢，所以一般只在生产环境启用。
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};