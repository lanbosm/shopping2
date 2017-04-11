    //es6 简单导入

    // {
    //     "list":[
    //     {
    //         "id":1,
    //         "createDate":1488960097000,
    //         "modifyDate":1488960099000,
    //         "amount":200,
    //         "baseline":300,
    //         "name":"充300送200"
    //     }
    // ],
    //     "code":20000,
    //     "msg":"响应成功"
    // }

    //http://blog.csdn.net/lihongxun945/article/details/49031383
    var util={

        pushLocal:function (key,value){
            var str = JSON.stringify(value); // 将对象转换为字符串
            localStorage.setItem(key,str);
        },

        pullLocal:function (key){
           var str=localStorage.getItem(key); //将字符串转换为对象
           var obj =JSON.parse(str);
           return obj;
         },

        delLocal:function (key){
           localStorage.removeItem(key);
        },

        initLocal:function(){
               localStorage.clear();

        },
        /**
         * 获取随机数
         */
        randomNum:function(n,m){
            return parseInt(Math.random() * (m + 1 - n)) + n;
        },
        /**
         * [获取分页id]
         * @return {[type]} [description]
         */
        getUrlHash:function(){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.hash.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]); return null;
        },

        /**
         * [获取选择日期]
         * @return {[type]} [2016-11-11]
         */
        getSelectDate:function(){
            var date=new Date();
            return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

        },

        // 对象深拷贝
        deepCopy:function(origin, _copy)  {
            var self = arguments.callee,
                type = Object.prototype.toString.call(origin),
                copy = origin;
            switch (type) {
                case '[object Object]':
                    copy = _copy || {};
                    for (var k in origin) {
                        if (origin.hasOwnProperty(k)) {
                            copy[k] = self(origin[k]);
                        }
                    }
                    break;
                case '[object Array]':
                    copy = _copy || [];
                    for (var i = 0, l = origin.length; i < l; i++) {
                        copy[i] = self(origin[i]);
                    }
                    break;
                case '[object Function]':
                    copy = new Function(origin.toString());
                    break;
            }
            return copy;
        }



};


//  导出
    export default util;

