//充值列表
<template>
    <div class="rechargelist clearfix">
        <div class="row">
             <p v-if="!activityList">加载中...</p>
             <p v-else-if="activityList.length==0">没有活动</p>
             <div v-else class="col-nn-15" v-for="activity in activityList">
                     <a class="btn btn-default btn-block rechargelist-btn" :class="{select:selectAmount == activity.baseline}" @click="chooseAmount(activity)">
                         <span>¥ {{activity.baseline}}</span>
                         <em v-if="activity.amount">赠 ¥{{activity.amount}}</em>
                         <em v-else class="dis">无赠送活动</em>
                     </a>
             </div>
        </div>
    </div>
</template>

<script>
    import {request, API_URLS} from 'util/request.js';

    export default {
        name: 'RechargeList',

        props:[
            "amount",
            "message",
            "giftAmount",
            "diySeleted"
        ],
        data (){
            return {
                activityList:[
                    {baseline:null},
                    {baseline:null},
                    {baseline:null},
                    {baseline:null},
                    {baseline:null}
                ],
                selectAmount:'',
                diyamountSeleted:false,
                diyamount:"",
                diyamountGift:{}
            }
        },
        computed: {
            //数据来自全局
            rechargeMain(){
                return  this.$parent;
            }
        },
        created(){


                this.selectAmount=this.amount;
                this.diyamount=this.amount;
                //this.diyamountSeleted = this.diySeleted;
                this.amountActivityList();


        },
        methods:{
            //选择充值
            chooseAmount(a){
                if(a){
                    this.selectAmount = a.baseline;
                    this.diyamountSeleted = false;

                    this.rechargeMain.amount=this.selectAmount;

                    //有赠送活动
                    if(a.amount){
                        this.rechargeMain.giftAmount="赠送 ¥ "+a.amount;
                    }else{
                        this.rechargeMain.giftAmount="无赠送活动";
                    }

                }else if(this.diyamount){
                    this.selectAmount = '';
                    this.diyamountSeleted = true;
                }
            },
            amountActivityList(){

                let vm = this;
                let diy = vm.diyamountSeleted;
                let apiObj = {
                    url: API_URLS.recharge,
                    data:{
                        amount: diy ? vm.diyamount : ''
                    }
                };
               // console.log(apiObj)
                request.fnGet(apiObj).then(res=>{
                    console.log(res);
                    if(diy && res.list && res.list.length){
                        vm.diyamountGift = res.list[0];
                        vm.rechargeMain.amount=vm.diyamount;
                        vm.rechargeMain.giftAmount="赠送 ¥"+ vm.diyamountGift.amount;
                       // vm.activityList = res.list;
                    }else{
                        vm.activityList = res.list;
                    }
                });
            },
            changeDiy(){
                this.selectAmount=0;
                this.diyamountSeleted = true;
                this.amountActivityList();
            }
        }
    }
</script>

<style scoped rel="stylesheet/less"  lang="less">

    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";



    .col-nn-15{
         width: 33%;
         float: left;
         padding-left: 8px;
         padding-right: 7px;
         margin: 10px 0;
     }
    .col-nn-25{
        width: 50%;
        float: left;
        padding-left: 8px;
        padding-right: 7px;
        margin: 10px 0;
    }
    .rechargelist{
        float: left;
        width: 100%;
        .rechargelist-btn{
            font-size: 18px;
            .order-custom-btn2;
            span{display: block; position: relative; }
            em{display: block; color: @themeColor; font-size: 14px; line-height: 30px;
                &.dis{opacity: 0.5;}
            }

            &.diy{
                input{ width: 80%; text-align: right;}

                span:after{content: ''; display: block;  width: 100%;
                    background: #999999;
                    height:1px;
                }
            }
            &.select{
                span:after{background: @themeColor; }
            }

        }
    }

</style>
