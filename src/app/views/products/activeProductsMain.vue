<template>
    <div class="member_main">
        <commom-header  :title="title" :back="back" :next="next" mode="mode"></commom-header>
        <active-products-list></active-products-list>
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
    import activeProductsList from 'views/products/activeProductsList.vue'
    import layer from 'layer';
    import $ from 'jquery';
    import CommomHeader from "../../components/commom/Header";
    export default{
        name:'activeproductsmain',
        data(){
            return{
                title:'全部商品',
                back:{"label":"返回","url":"index","show":true,},
                next:{"label":"确定","url":"","show":true},
                message: '',
                listType:null,
            }
        },
        components:{
            activeProductsList
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