<template>
   	  <div class="log">

        <app-center-header  :title="title" :back="back" :next="next" mode="mode"></app-center-header>

        <div class="log-body">

              <div v-if="!listType">没有日记</div>
              <log-cash v-if="listType=='cash'"></log-cash>
              <log-recharge v-if="listType=='recharge'"></log-recharge>
        </div>
    </div>

</template>

<style  rel="stylesheet/less"  lang="less">

    @import "../../../css/util/skin.less";
    @import "../../../css/util/mixin.less";

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


    import {request, API_URLS} from 'util/request.js';
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
            LogRecharge

        },
        watch: {
            '$route':'fetchList'
        },
        created(){
                this.fetchList();
        },
        computed: {

        },
        methods:{
            fetchList(){
                this.listType=this.$route.params.type;


                if(this.listType=="cash"){

                    this.title="现金收款";
                }

                if(this.listType=="recharge"){

                    this.title="会员充值";
                }






              //  alert( this.listType);
            }
        }
    }
</script>

