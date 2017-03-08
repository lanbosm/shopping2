<template>
	<div class="container-fluid index" id="app">
            <div class="row" >
                <div class="col-sm-8  col-md-9 left-con">
                    <div class="left-con-header">
                        <!--<ol class="breadcrumb">-->
                            <!--<li :class="index==navData.path.length-1?'active':''" v-for="(index,nav) in navData.path"><span v-show="index==0" class="glyphicon glyphicon-home"> </span><a :href="nav.id" @click="getItemList(nav.id)">{{nav.name}}</a></li>-->
                        <!--</ol>-->
                    </div>
                    <div class="left-con-content">
                        <div class="item-box panel panel-primary">
                            <div class="panel-heading">
                                导航栏
                            </div>
                            <div class="panel-body">
                                <router-view :page-size="pageSize" :item-data="page.list"></router-view>
                                <!--<list :page-size="pageSize" :item-data="page.list"></list>-->
                            </div>
                            <div class="panel-footer">
                                <Pagination :page-size="pageSize" :page="page"></Pagination>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div class="col-sm-4  col-md-3 right-con" >
                    <!-- 购物车 -->
                    <cart></cart>
                    <!--&lt;!&ndash; 计算器 &ndash;&gt;-->
                    <calc @trigger-build-order="buildOrder"></calc>
                </div>
            </div>
    </div>
</template>

<style>
</style>
<script>


    import Pagination  from 'components/Pagination.vue';
    import AppCart from 'components/cart.vue';
    import AppCalc from 'components/calc.vue';
    export default{
        name: 'app',
        data() {
            return {
                pageSize:8,                 //一页显示多少个
                page:{},

            }
        },
        computed: {
            //数据来自全局

        },
        components: {
            'cart':AppCart,              //购物车
            'calc':AppCalc,              //计算器
             Pagination                 //分页器
        },
        methods:{
            //创建订单
            buildOrder:function(cart){

                alert("创建订单");
                console.log(cart);
                // if(this.cartData.list.length>0) {
                //     // console.log(this.cartData.list);
                //     // this.$parent.buildBill2();
                //     this.$emit('increment')
                //     //location.href = "./bill.html";
                // }else{
                //     alert('请先选择物品');
                // }
            },

        },
        created(){
            var id = this.$route.query.id;
           // alert(id);
        },
        mounted(){

            var vm = this;
            var fakeData= {
                "msg": "响应成功",
                "code": 20000,
                "page": {
                    "pageNum": 1,
                    "pageSize": 10,
                    "size": 5,
                    "orderBy": null,
                    "startRow": 1,
                    "endRow": 5,
                    "total": 5,
                    "pages": 1,
                    "list": [
                        {
                            "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-01-23/158a76d1-17f1-44c7-bdb4-327783e72427.png",
                            "name": "BananaUmbrella蕉下小黑伞遮阳伞琉璃双层晴雨两用防晒晴雨伞折叠",
                            "barCode": "201701230953",
                            "price": "400.00",
                            "id": 49,
                            "giftType": "none",
                            "brandName": "test",
                            "textTagStr": "",
                            "specDesc": "[黄色 ]",
                            "marketable": true,
                            "stock": 12,
                            "allocatedStock": 0
                        },
                        {
                            "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-01-23/158a76d1-17f1-44c7-bdb4-327783e72427.png",
                            "name": "BananaUmbrella蕉下小黑伞遮阳伞琉璃双层晴雨两用防晒晴雨伞折叠",
                            "barCode": "201701230953",
                            "price": "400.00",
                            "id": 50,
                            "giftType": "none",
                            "brandName": "test",
                            "textTagStr": "",
                            "specDesc": "[蓝色 ]",
                            "marketable": true,
                            "stock": 1,
                            "allocatedStock": 0
                        },
                        {
                            "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-01-23/158a76d1-17f1-44c7-bdb4-327783e72427.png",
                            "name": "BananaUmbrella蕉下小黑伞遮阳伞琉璃双层晴雨两用防晒晴雨伞折叠",
                            "barCode": "201701230953",
                            "price": "400.00",
                            "id": 51,
                            "giftType": "none",
                            "brandName": "test",
                            "textTagStr": "",
                            "specDesc": "[粉色 ]",
                            "marketable": true,
                            "stock": 0,
                            "allocatedStock": 0
                        },
                        {
                            "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-01-23/d2ff87eb-44d6-4b9a-a173-c647f8d5d106.png",
                            "name": "多嘉爱有机营养米粉四种口味350g+50g",
                            "barCode": "201701230932",
                            "price": "120.00",
                            "id": 52,
                            "giftType": "none",
                            "brandName": "test",
                            "textTagStr": "",
                            "specDesc": "[香草味 2016-5 400g ]",
                            "marketable": true,
                            "stock": 1,
                            "allocatedStock": 0
                        },
                        {
                            "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-01-23/bc6c8846-f6ad-4b83-b869-550ffe145406.png",
                            "name": "酱心曲奇NO.1",
                            "barCode": "201701231106",
                            "price": "0.01",
                            "id": 53,
                            "giftType": "none",
                            "brandName": "测试商品，用户勿拍",
                            "textTagStr": "",
                            "specDesc": "[草莓 2016-5 ]",
                            "marketable": true,
                            "stock": 1,
                            "allocatedStock": 0
                        }, {
                            "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-01-23/bc6c8846-f6ad-4b83-b869-550ffe145406.png",
                            "name": "酱心曲奇NO.1",
                            "barCode": "201701231106",
                            "price": "0.01",
                            "id": 53,
                            "giftType": "none",
                            "brandName": "测试商品，用户勿拍",
                            "textTagStr": "",
                            "specDesc": "[草莓 2016-5 ]",
                            "marketable": true,
                            "stock": 1,
                            "allocatedStock": 0
                        }, {
                            "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-01-23/bc6c8846-f6ad-4b83-b869-550ffe145406.png",
                            "name": "酱心曲奇NO.1",
                            "barCode": "201701231106",
                            "price": "0.01",
                            "id": 53,
                            "giftType": "none",
                            "brandName": "测试商品，用户勿拍",
                            "textTagStr": "",
                            "specDesc": "[草莓 2016-5 ]",
                            "marketable": true,
                            "stock": 1,
                            "allocatedStock": 0
                        }, {
                            "image": "http://aoupprod.oss-cn-beijing.aliyuncs.com/products/2017-01-23/bc6c8846-f6ad-4b83-b869-550ffe145406.png",
                            "name": "酱心曲奇NO.1",
                            "barCode": "201701231106",
                            "price": "0.01",
                            "id": 53,
                            "giftType": "none",
                            "brandName": "测试商品，用户勿拍",
                            "textTagStr": "",
                            "specDesc": "[草莓 2016-5 ]",
                            "marketable": true,
                            "stock": 1,
                            "allocatedStock": 0
                        }
                    ],
                    "firstPage": 1,
                    "prePage": 0,
                    "nextPage": 0,
                    "lastPage": 1,
                    "isFirstPage": true,
                    "isLastPage": true,
                    "hasPreviousPage": false,
                    "hasNextPage": false,
                    "navigatePages": 8,
                    "navigatepageNums": [
                        1
                    ]
                }
            };
            vm.page=fakeData.page;
            //组件开始挂载时获取用户信息
            //alert(66);
        },
    }
</script>

