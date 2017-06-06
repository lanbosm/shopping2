/**
 Gulpfile for gulp-webpack-demo
 created by lanbo
 dev：开发环境； pro:生产环境；webpack：webpack环境；

 参考 http://www.imooc.com/article/7221#child_1_1
      https://www.npmjs.com/package/gulp-webpack
 */
"use strict";
const gulp = require('gulp'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    chsiRev = require('gulp-chsi-rev'),
    prefix = require('gulp-prefix'),
    fileinclude = require('gulp-file-include'),
    clean = require('gulp-clean'),
    autoprefixer = require('gulp-autoprefixer');




const gulpwebpack = require('gulp-webpack');  //gulp版webpack
const webpack = require('webpack');          //原生的webpack

const webpackConfig=require("./webpack.config.js");
const webpackConfigPro=require("./webpack.production.config.js");



var browserSync = require('browser-sync').create();

var host = {
    domain:"localhost",
    path: 'dist/',
    port: 3000,
    html: 'index.html'
};

var autoprefixerConfig= {
    browsers: [
        'last 2 versions',
        'ie 9',
        'ios 7',
        'android 4'
    ],
    cascade: true
}




gulp.task('clean', function () {
    console.log("清理dist目录完成...");
    // return 清楚干净后的数据流(Stream)
    return gulp.src('./dist', {read: false})
        .pipe(clean({force: true}));
});

//gulp-autoprefixer
//将第三方css拷贝目录
gulp.task('copy:css', function () {
    return  gulp.src(['src/css/**/*.css']).pipe(gulp.dest('dist/css'));
});

//将图片拷贝到目标目录
gulp.task('copy:images', function () {
    return  gulp.src(['src/images/**/*']).pipe(gulp.dest('dist/images'));
});

//复制假数据
gulp.task('copy:data',function(){
    return  gulp.src(['src/data/**/*.json']).pipe(gulp.dest('dist/data'));
});
// 合并lib文件 通常是第三方库
gulp.task('copy:lib',function(){

    gulp.src(['**/*.js','!vue/*.js','!**/index.js'],{
        cwd:'./lib/'
    }).pipe(rename(function (path) {
        path.dirname = "./";             //以根目录方式输出
    })).pipe(gulp.dest('./dist/js'));

    gulp.src(['**/*.css'],{             //抓取时候会存在子目录
        cwd:'./lib/'
    }).pipe(rename(function (path) {
        path.dirname = "./";             //以根目录方式输出
    })).pipe(gulp.dest('./dist/css/'));


    //抓取font
    gulp.src(['bootstrap/fonts/**.*'],{             //抓取时候会存在子目录
        cwd:'./lib/'
    }).pipe(rename(function (path) {
        path.dirname = "./";             //以根目录方式输出
    })).pipe(gulp.dest('./dist/fonts/'));


    //针对vue
    // gulp.src(['vue/vue.min.js','vue/vue-router.min.js','vue/vue-resource.min.js'],{
    //     cwd:'./lib/'
    // }).pipe(concat('vue.min.js')).pipe(gulp.dest('./dist/js'));

})

//copy
gulp.task('copy',['copy:css','copy:images','copy:lib','copy:data'],function() {
    console.log("copy资源完成...");
    return gulp.src('./dist');

});


////////////////////////////////////////////////dev模式////////////////////////////////////////////////////

//压缩合并css, css中既有自己写的.less, 也有引入第三方库的.css css处理
// scss编译后的css将注入到浏览器里实现更新
gulp.task('less', function() {
    gulp.src(['src/less/*.less'])  //main 是主入口
        .pipe(less())
        .pipe(autoprefixer(autoprefixerConfig))
        .pipe(gulp.dest('dist/css/'))

});
//用于在html文件中直接include文件 html处理
gulp.task('fileinclude', function (done) {

    gulp.src(['src/app/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'))
        .on('end', done);
});

//webpack服务器开发  js编译
var express = require('express'),
    path = require('path'),
    consolidate = require('consolidate');

const proxy = require('http-proxy-middleware');//引入代理中间件

//var isDev = process.env.NODE_ENV !== 'production';
var isDev = true;
var app = express();
var port = host.port;
app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './dist'));


app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = false;

gulp.task('dev',['clean'],function(){           //不能同时进行 所以很多start
    process.env.NODE_ENV="dev";
    gulp.start('copy',['fileinclude','less'],function(){
        if (isDev) {
            var webpack = require('webpack'),
                webpackDevMiddleware = require('webpack-dev-middleware'),
                webpackHotMiddleware = require('webpack-hot-middleware');

            var webpackConfigDev=require("./webpack.config.js"); //这里没仔细配置 以后再说
            var config = Object.create(webpackConfigDev);
            //config.devtool = "eval";
            //config.debug = true;

            for(var i in config.entry){ //给每个多入口添加监听器
                //  console.log(i);
                config.entry[i].unshift("webpack-hot-middleware/client?reload=true");
            }

            config.plugins.push(new webpack.HotModuleReplacementPlugin()); //添加热刷新功能
            var compiler = webpack(config);

            app.use(webpackDevMiddleware(compiler, {
                publicPath: config.output.publicPath,
                noInfo: true,
                stats: {
                    colors: true
                }
            }));
            app.use(webpackHotMiddleware(compiler));

            //静态文件目录，
            app.use(express.static(path.join(__dirname,'dist')));

            /*为app添加中间件处理跨域请求*/
            app.use(function(req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
                res.header("Access-Control-Allow-Headers", "X-Requested-With");
                res.header('Access-Control-Allow-Headers', 'Content-Type');
                next();
            });

            app.use('/',   function(req, res) {
                res.render('index.html');
            });



            var bsPort=8089;
            //你代理我 我代理你
            // var apiProxy = proxy('/browser-sync/*', { target: 'http://localhost:8089',changeOrigin: true });
            // app.use('/*', apiProxy);//api子目录下的都是用代理
            // app.use(express.static(path.join(__dirname, 'dist/css')));
            // browsersync is a nice choice when modifying only views (with their css & js)
            var bs = require('browser-sync').create();
            app.listen(host.port, function(){
                bs.init({
                    open: true,
                    ui: false,
                    notify: true,
                    proxy: host.domain+':'+host.port,
                    files: ['./dist/**'],
                    port: bsPort
                });
                console.log('App (dev) is going to be running on port '+bsPort+' (by browsersync).');
            });


            var  watcher= gulp.watch('src/less/**/*.less');
            watcher.on('change', function(){
                gulp.src(['src/less/*.less'])  //main 是主入口
                    .pipe(less())
                    .pipe(gulp.dest('dist/css/'))
            })
                   //console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
                   // gulp.start("less");
        } else {
            console.log("生产模式");
            // app.use(express.static(path.join(__dirname, 'public')));
            // require('./server/routes')(app);
            // app.listen(port, function () {
            //     console.log('App (production) is now running on port 3000!');
            // });
        }

    });

});



//////////////////////////////////////////////////prod模式//////////////////////////////////

//准备发布的js打包
gulp.task('rev:js', function (done) {
    console.log("正在打包Js...");
    return   gulp.src('src/js/main.js')  //这里src只是装样子 如果想有效请使用vinyl-named
        .pipe(gulpwebpack( webpackConfigPro ))
        .pipe(gulp.dest('dist/js/'))
        .on('end', function(){
            console.log("打包完成...");
        });
});


//准备发布的css打包
gulp.task('rev:css', function (done) {


    return gulp.src(['src/less/*.less'])  //第一层 是主入口
        .pipe(less())
        .pipe(autoprefixer(autoprefixerConfig))
        // .pipe(concat('style.min.css'))
        .pipe(cssmin({"keepBreaks":true}))
        .pipe(chsiRev())
        .pipe(gulp.dest('dist/css/'));

});

//准备发布的html打包
gulp.task('rev:html', function (done) {
    //也许会用到cdn
    // var prefixUrl = "http://mydomain.com/assets";
    // .pipe(prefix(prefixUrl, null, '{{'))
    return gulp.src(['src/app/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'))
});


//webpack服务器开发 适合 js编译
gulp.task('prod', ['clean'],function(){
    process.env.NODE_ENV="production";
    gulp.start('copy','rev:html','rev:css','rev:js',function(){
        console.log("打包好了");
        browserSync.init({
            server: {
                baseDir: host.path,
                directory: true
            },
            port: host.port


        });

    });
});



/////////////////////////////////////////////test////////////////////////////////


// 静态服务器
gulp.task('web', function() {
    console.log('browser------------');
    browserSync.init({
        server: {
            baseDir: host.path,
            directory: true
        },
        port: host.port


    });
    //每次dist文件发生变化 自动刷新游览器
    var watcher = gulp.watch(['dist/css/*.css','dist/**/*.html','dist/js/*.js']);

    watcher.on('change', function(event) {
        // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        browserSync.reload();
    });
});



gulp.task('default',function(){
    console.log("如果开发请输入gulp dev 生产请输入gulp pro 测试请生成dist目录后 gulp test");
});