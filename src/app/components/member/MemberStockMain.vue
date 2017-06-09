<template>
    <div class="member_main">
        <commom-header  :title="title" :back="back" :next="next"></commom-header>
        <!--存货-->
        <member-stock :list-data="listData"></member-stock>
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
                 next:{"label":"存货","url":"","show":true,"cb":this.save}, //存货是1
                 message: '',
                 listType:null,
             }
         },
        components:{
            MemberStock
        },
        computed:{
            listData(){
                return this.$store.state.currentPage.stockData
            }
        },
        created(){

        },
        methods:{

            save(){

                    var vm=this;
                    var obj3 = [];
                    var obj4 = [];
                    var testdata = vm.$store.state.currentPage.stockData;
                    for (var i = 0; i < testdata.length; i++) {
                        obj3.push(0);
                        obj4.push(testdata[i].quantity)
                    }
                    if (obj3.toString() == obj4.toString()) {
                        this.$message.error('存货数量不能为空');
                    } else {

                        var consignList = [];

                        testdata.forEach(function (ele, index) {
                            consignList.push({
                                'quantity': ele.quantity,
                                'productId': ele.productId,
                                'b2cOrderItemId': ele.orderItemId
                            })


                        })
                        var aa = JSON.stringify(consignList);


                        this.$store.dispatch("savePickList", {"memberId": this.$route.query.mid,"consignParamJson": aa}).then(res => {

                            this.$alert('操作成功', {
                                type: 'success'
                            }).then(_ => {
                                this.$store.dispatch("stockGoods", {"orderSn": this.$route.query.sn,"mid":this.$route.query.mid}).then(res=>{
                                        var temp=this.listData;

                                         temp.forEach(function(ele,index){
                                             ele.quantity=ele.productCount;
                                         })
                                    this.listData=temp;
                                })
                            })
                        }).catch(_ => {

                            this.$alert('操作成功', {
                                type: 'error'
                            })
                        });
                    }


            }



        }

    }

</script>
