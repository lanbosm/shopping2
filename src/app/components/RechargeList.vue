//充值列表
<template>
    <div class="rechargelist clearfix">
        <div  class="col-nn-15">
             <a class="btn btn-default btn-block rechargelist-btn" :class="{select:amountIndex==1}" @click="chooseAmount(1)">
                 <span>¥ 10</span>
                 <em>赠 ¥10</em>
             </a>
        </div>
        <div  class="col-nn-15">
            <a class="btn btn-default btn-block rechargelist-btn" :class="{select:amountIndex==2}" @click="chooseAmount(2)">
                <span>¥ 50</span>
                <em>赠 ¥50</em>
            </a>
        </div>
        <div  class="col-nn-15">
            <a class="btn btn-default btn-block rechargelist-btn" :class="{select:amountIndex==3}" @click="chooseAmount(3)">
                <span>¥ 100</span>
                <em>赠 ¥100</em>
            </a>
        </div>
        <div  class="col-nn-15">
            <a class="btn btn-default btn-block rechargelist-btn" :class="{select:amountIndex==4}" @click="chooseAmount(4)">
                <span>¥ 500</span>
                <em>赠 ¥500</em>
            </a>
        </div>
        <div  class="col-nn-15">
            <a class="btn btn-default btn-block rechargelist-btn" :class="{select:amountIndex==5}" @click="chooseAmount(5)">
                <span>¥ 1000</span>
                <em>赠 ¥100</em>
            </a>
        </div>
        <div  class="col-nn-25">
            <a class="btn btn-default btn-block rechargelist-btn diy" :class="{select:amountIndex==6}" @click="chooseAmount(6)">
                 <span>¥ <input class="diy" type="text" v-model="diyamount" placeholder="自定义金额" /></span>
                 <em>赠 {{diyamount}}</em>
            </a>
        </div>
    </div>
</template>

<script>
    import {request, API_URLS, HOST} from 'util/request.js';

    export default {
        name: 'ProductList',
        props:["pageSize"],
        computed:{
            activity (){                //活动 充多少送多少
                return true;
            }
        },
        data (){
            return {
                defaultAmount:['10','50','100','500','1000'],
                amountIndex:0,
                amount:0,
                diyamount:""

            }

        },
        methods:{
            //选择充值
            chooseAmount: function(index){
                this.amountIndex=index;
                if(index==6) {  //自定义充钱
                    this.amount ="";
                }else{
                    this.amount = this.defaultAmount[index - 1];
                }

                if(page !=  this.page.pageNum){

                   // this.productParams.pageNum=page;
                    //this.getItemList();
                }
            }
        }
    }
</script>

<style scoped rel=”stylesheet/less”  lang="less">

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

    .rechargelist-btn{
        font-size: 18px;
        .order-custom-btn;

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
            span{display: block; position: relative; }
            em{display: block; color: #999999; font-size: 14px; line-height: 30px;}
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
