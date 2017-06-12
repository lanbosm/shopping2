// 引入必要的模块
var path = require('path');
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.dev.conf')
var consolidate = require('consolidate');

var _resolve;
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})
var server;
var port = process.env.PORT || 3000;
var uri = 'http://localhost:' + port
// 调用webpack并把配置传递过去
module.exports = {

    ready: readyPromise,
    close: () => {
        server.close()
    },
    open:function (cb,bs) {

        var compiler = webpack(config)


        var devMiddleware = require('webpack-dev-middleware')(compiler, {
            publicPath: config.output.publicPath,
            noInfo: false,
            stats: {
                colors: true
            }
        })

        var hotMiddleware = require('webpack-hot-middleware')(compiler, {
            log: () => {}
        })

        // 创建一个express实例
        var app = express();
        app.engine('html', consolidate.ejs);
        app.set('view engine', 'html');
        app.set('views', config.output.path);


        app.locals.env = process.env.NODE_ENV || 'dev';
        app.locals.reload = false;


        app.use(devMiddleware);


        app.use(hotMiddleware);

        //静态文件目录，
        app.use(express.static(config.output.path));

        // var apiProxy = proxy('/browser-sync/*', { target: 'http://localhost:8089',changeOrigin: true });
        // app.use('/*', apiProxy);//api子目录下的都是用代理

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



        console.log('> Starting dev server...')
        devMiddleware.waitUntilValid(() => {
            if (bs) {
                cb();
                console.log('> express Listening at ' + uri + '\n')
            }
            _resolve()
        })
        // 监听 8888端口，开启服务器
        server=app.listen(port, function (err) {
            if (err) {
                console.log(err)
                return
            }
            console.log('Listening at http://localhost:'+port)
        })
    }
}





