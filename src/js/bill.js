import util from 'util/util.js';
import $ from 'jquery';
import layer from 'layer';
import {request, API_URLS, HOST} from 'util/request.js';

    new Vue({
        compiled:function(){

        },
        ready: function() {

        },
        data: {
            message: '请选择一个付款方式'
        },
        computed:{

        },
        methods: {
            toBack:function(){
                location.href="./index.html";
            },
            toPrint:function(){
                // layer.load( {
                //     shade: [0.1,'#fff'] //0.1透明度的白色背景
                // });

                //location.href="./print.html";
            }


        }
    }).$mount('#main');