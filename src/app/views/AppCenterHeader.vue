<template>
   	   <div class="container order-header">
            <div class="row">
                <div class="col-sm-2 col-md-2 col-lg-2">
                    <a class="btn btn-default back-btn pull-left" @click="toBack();"  v-if="back.show" >&laquo;{{back.label}} </a>
                </div>
                <div class="col-sm-8 col-md-8 col-lg-8 text-center">
                    <h3>{{title}}</h3>
                </div>
                <div class="col-sm-2 col-md-2 col-lg-2 pull-right" >
                    <a class="btn btn-default ok-btn pull-right"  @click="toNext();" v-if="next.show"> {{next.label}}  &raquo;</a>
                </div>
            </div>
        </div>
</template>


<style>
</style>
<script>

    import layer from 'layer';
    import $ from 'jquery';
    import {request, API_URLS, HOST} from 'util/request.js';

    export default{
        name: 'AppCenterHeader',
        props:["title","back","next","mode"],
        computed:{
          data(){
              return this.$store.state.currentPage.stockData
          }
        },
        methods:{
            toBack (){
                var vm=this;
                if(vm.back.cb){
                    vm.back.cb();
                }else {
                    vm.$store.commit("setMode", vm.back.url);
                    vm.$router.replace(vm.back.url);
                }
            },
            toNext (){
                var msg="确定"+this.next.label+"吗?";
                var vm=this;
//               if(this.next.isshow && this.next.isnum==1){
//                   var obj3=[];
//                   var obj4=[];
//                   var testdata=vm.$store.state.currentPage.stockData;
//                   for(var i=0;i<testdata.length;i++){
//                       obj3.push(0);
//                       obj4.push(testdata[i].quantity)
//                   }
//                   msg="输入密码";
//                   if(obj3.toString()==obj4.toString()){
//                       layer.msg('存货数量不能为空',{
//                           time:1000
//                       });
//                   }else{
//                       layer.prompt(
//                           {formType:1,title:msg},function (value,index,elem) {
//                               var map={
//                                   "password" :value,
//                                   "memberId":vm.$store.state.currentPage.customData.id,
//                                   "productlist":vm.$store.state.currentPage.stockData
//                               };
//                               var apiObj = {
//                                   url:API_URLS.take_goods,
//                                   data:{
//                                       "map":map
//                                   }
//
//                               };
//                               console.log(apiObj.data);
//                               request.fnPost2(apiObj).then(res=>{
//                                   if(res.code==20000){
//                                       layer.msg('成功',{
//                                           time:1000
//                                       });
//                                       layer.close(index)
//                                   }else if(res.code==49004){
//                                       layer.msg('账号或密码错误',{
//                                           time:1000
//                                       })
//                                   }else if(res.code==49005){
//                                       layer.msg('账号不存在',{
//                                           time:1000
//                                       })
//                                   }
//
//
//                               })
//                           }
//                       )
//                   }
//
//               } else if(this.next.isshow && this.next.isnum==2){
//                    var testData=vm.$store.state.currentPage.takeData;
//                    var flag=true;
//                    var obj1=[];
//                    var obj2=[];
//                   for(var i=0;i<testData.length;i++){
//                       obj1.push(0);
//                       obj2.push(testData[i].operationNum)
//                   }
//                   msg="输入密码";
//                    if(obj1.toString()==obj2.toString()){
//                        layer.msg('填货数量不能为空',{
//                            time:1000
//                        });
//                    }else {
//                        layer.prompt(
//                            {formType:1,title:msg},function (value,index,elem) {
//                                var map={
//                                    "password" :value,
//                                    "memberId":vm.$store.state.currentPage.customData.id,
//                                    "appConsigns":vm.$store.state.currentPage.takeData
//                                };
////                           console.log(map);
//                                var apiObj = {
//                                    url:API_URLS.take_goods+'/take',
//                                    data:{
//                                        "map":map
//                                    }
//
//                                };
////                           alert(vm.$store.state.currentPage.customData.id);
//                                console.log(apiObj.data);
//                                request.fnPost2(apiObj).then(res=>{
//                                    if(res.code==20000){
//                                        layer.msg('成功',{
//                                            time:1000
//                                        });
//                                        layer.close(index)
//                                    }else if(res.code==49004){
//                                        layer.msg('账号或密码错误',{
//                                            time:1000
//                                        })
//                                    }else if(res.code==49005){
//                                        layer.msg('账号不存在',{
//                                            time:1000
//                                        })
//                                    }
//
//
//                                })
//                            }
//                        )
//                    }
//
//               }else {
                   //询问框
                   layer.confirm(msg, {
                       btn: ['确定'] //按钮
                   }, function(index){
                       if(vm.next.cb){
                           vm.next.cb();
                       }else {
                           vm.$store.commit("setMode",vm.next.url);
                           vm.$router.replace(vm.next.url);
                       }
                       layer.close(index);
                   });
              // }


            }
        },
        filters: {
            currency: function (value) {
                if (!value) return '0.00';
                return '¥ ' + Number(value).toFixed(2);
            }
        },
    }
</script>

