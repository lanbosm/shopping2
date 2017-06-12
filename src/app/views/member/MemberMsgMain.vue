<template>
    <div class="member_main">
        <app-center-Header  :title="title" :back="back" :next="next" mode="mode"></app-center-Header>
        <!--会员-->
        <member-msg></member-msg>
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
    import AppCenterHeader from 'views/AppCenterHeader.vue'
    import MemberMsg from './MemberMsg.vue'

    import layer from 'layer';
    import $ from 'jquery';
    export default{
        name:'member',
        data(){
            return{
                title:'会员',
                back:{"label":"返回","url":"index","show":true,},
                next:{"label":"","url":"","show":false},
                message: '',
                listType:null,
            }
        },
        components:{
            AppCenterHeader,
            MemberMsg
        },
        computed:{
            mode(){
                return this.$store.state.currentPage.mode;
            },
        },
        created(){

        },
        methods:{
        }

    }

</script>
