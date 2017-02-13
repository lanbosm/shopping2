    //es6 简单导入
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
           var str=localStorage.removeItem(key);
           return str;
        },

        initLocal:function(key){
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

        /**
         * [获取单件价格 ]
         * @return {[type]} [数量*单价]
         */
        getItemPrice:function(){
            var date=new Date();
            return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        }

};


//  导出
    export default util;

