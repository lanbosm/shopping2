<template>
    <div class="member_main">
        <commom-header  :title="title" :back="back" :next="next"></commom-header>
        <!--存货-->
        <member-stock :listdata="listData"></member-stock>
    </div>
</template>

<style  rel="stylesheet/less"  lang="less">

    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .member_main{
        background: #efefef;
    .order-header{
        padding: 15px;
        position: relative;
    .order-row;
    h3{
        font-size: 18px; line-height: 30px; margin: 0;
    }
    .ok-btn,.back-btn{
    .order-header-btn;
    }
    }

    .page-con{height: 588px;}
    .page-bar{}

    .container{
        background-color:#ffffff;
        border-left: @borderDashedStyle;
        border-right: @borderDashedStyle;
    }
    .btn{
        position:relative;
    }
    .m-box{
        height: auto;
        background: #fff;
        z-index: 9999;
        border: solid 1px #ddd;
        margin-top: 12px;
        margin-bottom: 12px;
        border-radius: 3px;
        padding: 12px;
        color: #333333;

    .msg-pop-close{
        right: 12px;
        top:12px;
        position: absolute;
    }
    h3{
        color: @themeColor;
        margin: 0;
        font-size: 18px;
        line-height: 30px;
        width: 85%;
    }
    em{
        position: absolute;
        right: 24px;
        top:45px;
    }
    p{
        width: 85%;
        color: #333333;
    }
    .c{ height: 80px; line-height: 20px; overflow: hidden;  }
    .r{text-align: right; }
    .btn-agree{
        border: solid 1px @green;
        color: @green;
        position: relative;
        display: inline;
        margin-right: 12px;
        margin-left: 12px;
    }

    .btn-refuse{
        border: solid 1px @themeColor;
        color: @themeColor;
        position: relative;
        display: inline;
        margin-right: 12px;
        margin-left: 12px;

    }

    }
    }

</style>

<script>

    import MemberStock from 'components/member/MemberStock.vue'

    import layer from 'layer';
    import $ from 'jquery';
    export default{
         name:'member',
         data(){
             return{
                 title:'存货',
                 back:{"label":"返回","url":"print","show":true},
                 next:{"label":"存货","url":"","show":true,"isshow":true,"isnum":1}, //存货是1
                 message: '',
                 listType:null,
             }
         },
        components:{
            MemberStock
        },
        computed:{
            mode(){
                return this.$store.state.currentPage.mode;
            },
            listData(){
                return this.$store.state.currentPage.stockData
            }
        },
        created(){
                console.log(this.listData)
        },
        methods:{

            check(){
                 if(this.next.isshow && this.next.isnum==1){
                   var obj3=[];
                   var obj4=[];
                   var testdata=vm.$store.state.currentPage.stockData;
                   for(var i=0;i<testdata.length;i++){
                       obj3.push(0);
                       obj4.push(testdata[i].quantity)
                   }
                   msg="输入密码";
                   if(obj3.toString()==obj4.toString()){
                       layer.msg('存货数量不能为空',{
                           time:1000
                       });
                   }else{
                       layer.prompt(
                           {formType:1,title:msg},function (value,index,elem) {
                               var map={
                                   "password" :value,
                                   "memberId":vm.$store.state.currentPage.customData.id,
                                   "productlist":vm.$store.state.currentPage.stockData
                               };
                               var apiObj = {
                                   url:API_URLS.take_goods,
                                   data:{
                                       "map":map
                                   }

                               };
                               console.log(apiObj.data);
                               request.fnPost2(apiObj).then(res=>{
                                   if(res.code==20000){
                                       layer.msg('成功',{
                                           time:1000
                                       });
                                       layer.close(index)
                                   }else if(res.code==49004){
                                       layer.msg('账号或密码错误',{
                                           time:1000
                                       })
                                   }else if(res.code==49005){
                                       layer.msg('账号不存在',{
                                           time:1000
                                       })
                                   }


                               })
                           }
                       )
                   }

               } else if(this.next.isshow && this.next.isnum==2){
                    var testData=vm.$store.state.currentPage.takeData;
                    var flag=true;
                    var obj1=[];
                    var obj2=[];
                   for(var i=0;i<testData.length;i++){
                       obj1.push(0);
                       obj2.push(testData[i].operationNum)
                   }
                   msg="输入密码";
                    if(obj1.toString()==obj2.toString()){
                        layer.msg('填货数量不能为空',{
                            time:1000
                        });
                    }else {
                        layer.prompt(
                            {formType:1,title:msg},function (value,index,elem) {
                                var map={
                                    "password" :value,
                                    "memberId":vm.$store.state.currentPage.customData.id,
                                    "appConsigns":vm.$store.state.currentPage.takeData
                                };
//                           console.log(map);
                                var apiObj = {
                                    url:API_URLS.take_goods+'/take',
                                    data:{
                                        "map":map
                                    }

                                };
//                           alert(vm.$store.state.currentPage.customData.id);
                                console.log(apiObj.data);
                                request.fnPost2(apiObj).then(res=>{
                                    if(res.code==20000){
                                        layer.msg('成功',{
                                            time:1000
                                        });
                                        layer.close(index)
                                    }else if(res.code==49004){
                                        layer.msg('账号或密码错误',{
                                            time:1000
                                        })
                                    }else if(res.code==49005){
                                        layer.msg('账号不存在',{
                                            time:1000
                                        })
                                    }


                                })
                            }
                        )
                    }


            }



        }

    }

</script>
