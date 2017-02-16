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
            message: '请选择一个付款方式',
            index:0
        },
        computed:{

        },
        methods: {
            toBack:function(){
                location.href="./index.html";
            },
            toPrint:function(){
                location.href="./print.html";
            },
            switchPay:function (index) {
                this.index = index;
            }


        }
    }).$mount('#main');