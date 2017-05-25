<template>
   	  <div class="log">
        <app-center-header  :title="title" :back="back" :next="next" mode="mode"></app-center-header>
        <div class="log-body">

              <div v-if="!listType">没有记录</div>
              <log-cash v-if="listType=='cash'"></log-cash>
              <log-sales v-if="listType=='sales'"></log-sales>
              <log-recharge v-if="listType=='recharge'"></log-recharge>
              <log-products v-if="listType=='products'"></log-products>
              <log-promotion v-if="listType=='promotion'"></log-promotion>

        </div>
    </div>

</template>

<style  rel="stylesheet/less"  lang="less">

    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";

    .log{
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

    import AppCenterHeader from 'views/AppCenterHeader.vue';

    import LogCash from 'components/log/LogCash.vue';
    import LogRecharge from 'components/log/LogRecharge.vue';
    import LogProducts from 'components/log/LogProducts.vue';
    import LogPromotion from 'components/log/LogPromotion.vue';
    import LogSales from 'components/log/LogSales.vue';

    import {request, API_URLS} from 'util/request.js';
    import uti from 'util/request.js';
    import layer from 'layer';
    import $ from 'jquery';

    export default{
        name:"log",
        data() {
            return {
                title:"日记",
                back:{"label":"返回","url":"/index","show":true,},
                next:{"label":"打印","url":"/print","show":false},
                message: '',
                listType:null,
            }
        },
        components:{
            AppCenterHeader,
            LogCash,
            LogRecharge,
            LogSales,
            LogProducts,
            LogPromotion
        },
        watch: {
            '$route':'fetchType'
        },
        created(){
                this.fetchType();
        },
        methods:{
            fetchType(){
                this.listType=this.$route.params.type;

                if(this.listType=="cash"){
                    this.title="现金记录";
                }

                if(this.listType=="recharge"){
                    this.title="充值记录";
                }

                if(this.listType=="sales"){
                    this.title="销售记录";
                }

                if(this.listType=="promotion"){
                    this.title="促销记录";
                }

                if(this.listType=="products"){

                    this.title="销售商品报表";
                    this.back={"label":"返回","url":"/index","show":true};
                    this.next={"label":"导出","url":"#export","show":true,"cb":this.exportProducts};
                }

              //  alert( this.listType);
            },
            exportProducts(){


                this.$store.dispatch("exportProducts").then(res=>{
                    window.open(res);
                })
            }
        }
    }
</script>

