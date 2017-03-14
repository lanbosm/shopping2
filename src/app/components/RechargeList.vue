//充值列表
<template>
    <div class="rechargelist clearfix">
        <div  class="col-nn-15" v-for="activity in activityList">
             <a class="btn btn-default btn-block rechargelist-btn" :class="{select:selectAmount == activity.baseline}" @click="chooseAmount(activity)">
                 <span>¥ {{activity.baseline}}</span>
                 <em v-if="activity.amount">赠 ¥{{activity.amount}}</em>
                 <em v-else class="dis">无赠送活动</em>
             </a>
        </div>
        <div  class="col-nn-25">
            <a class="btn btn-default btn-block rechargelist-btn diy"  :class="{select:diyamountSeleted}" >
                 <span>¥ <input class="diy" type="tel" @keyup.enter="changeDiy" v-model="diyamount" @focus="chooseAmount()" placeholder="输入金额" /></span>
                 <em v-if="diyamountGift.amount">赠 ¥{{diyamountGift.amount}}</em>
                 <em v-else class="dis">无赠送活动</em>
            </a>
        </div>
    </div>
</template>

<script>
    import {request, API_URLS} from 'util/request.js';

    export default {
        name: 'RechargeList',
        mounted(){
            this.amountActivityList();
        },
        computed:{
        },
        data (){
            return {
                activityList:[
                    {baseline:10},
                    {baseline:50},
                    {baseline:100},
                    {baseline:500},
                    {baseline:1000}
                ],
                selectAmount:'',
                diyamountSeleted:false,
                diyamount:"",
                diyamountGift:{}
            }
        },
        methods:{
            //选择充值
            chooseAmount(a){
                if(a){
                    this.selectAmount = a.baseline;
                    this.diyamountSeleted = false;
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
                console.log(apiObj)
                request.fnGet(vm, apiObj, function(res){
                    console.log(res);
                    if(diy && res.list && res.list.length){
                        vm.diyamountGift = res.list[0];
                    }else{
                        vm.activityList = res.list;
                    }
                });
            },
            changeDiy(){
                this.diyamountSeleted = true;
                this.amountActivityList();
            }
        }
    }
</script>

<style scoped rel="stylesheet/less"  lang="less">

    @themeColor:#e84593;

    .class-order-btn(@fontColor,@bgcolor,@borderColor,@radius:5px,@padding:25px){
        color: @fontColor;
        padding: @padding;
        border-color:@borderColor;
        border-radius: @radius;
        background: @bgcolor;
    }

    .order-custom-btn(){
        .class-order-btn(#666666,#ffffff,#cccccc,5px,10px);
        &:active{ .class-order-btn(#666666,#ffffff,@themeColor,5px,10px);}
        &.select{.class-order-btn(#666666,#ffffff,@themeColor,5px,10px);}
    }


    .col-nn-15{
         width: 15%;
         float: left;
         padding-left: 8px;
         padding-right: 7px;
     }
    .col-nn-25{
        width: 25%;
        float: left;
        padding-left: 8px;
        padding-right: 7px;

    }
    .rechargelist{
        float: left;
        width: 70%;
        .rechargelist-btn{
            font-size: 18px;
            .order-custom-btn;
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
