import util from 'util/util.js';
import $ from 'jquery';
import layer from 'layer';
import {request, API_URLS, HOST} from 'util/request.js';

    new Vue({
        compiled:function(){

        },
        ready: function() {
                alert(111111)
        },
        data: {
            accessToken:'',
            message: '请选择一个付款方式'
        },
        computed:{

        },
        methods: {
            toNext:function(){
                location.href="./index.html";
            },
            printBill:function(){

                //引入第三方打印
                window.print();

             
            }


        }
    }).$mount('#main');