<template>
	<div class="container-fluid index" id="app">
            <div class="row" >
                <div class="col-sm-8  col-md-9 left-con">
                    <div class="left-con-header">
                        <breadcrumb></breadcrumb>
                    </div>
                    <div class="left-con-content">
                        <div class="item-box panel panel-primary">
                            <div class="panel-heading">
                                <!--<div class="row" v-show="navData.show" >-->
                                    <!--<div class="col-xs-12 category-list clearfix" @mouseleave="navData.show=false">-->
                                        <!--<div class="menu">-->
                                            <!--<a :href="nav.id" class="sub btn-lightgreen" v-on:mouseenter="navData.index=index" v-for="(index,nav) in navData.list" @click="getItemList(nav.id)" >{{nav.name}}</a>-->
                                        <!--</div>-->
                                        <!--<div class="sub-menu" >-->
                                            <!--<template v-if="!navData.list[navData.index]">-->
                                                <!--<p> 数据加载中...</p>-->
                                                <!--<template v-if="1<2">-->
                                                    <!--<p> 没有分类</p>-->
                                                <!--</template>-->
                                            <!--</template>-->
                                            <!--<template v-else>-->
                                                <!--<a  class="btn btn-default sub-menu-category" :href="nav.id" v-for="(index,nav) in navData.list[navData.index].children" @click="getItemList(nav.id)">{{nav.name}}</a>-->
                                            <!--</template>-->

                                        <!--</div>-->

                                    <!--</div>-->
                                <!--</div>-->
                                <div class="row">
                                    <div class="col-xs-6 col-md-3 col-lg-2">
                                        <a class="btn btn-lightgreen shuaixuan"  @click="categoryShow=!categoryShow" ><span class="glyphicon glyphicon-th-list"></span>分类筛选</a>
                                    </div>
                                    <!--<div class="searchbar  col-xs-6 col-md-3 col-md-offset-6 col-lg-offset-7  ">-->
                                        <!--<div class="input-group">-->
                                            <!--<input type="text" class="form-control" v-model="searchItem.input" v-on:keyup.enter="searchItem.text=searchItem.input;" placeholder="搜索商品">-->
                                            <!--<span class="input-group-btn">-->
                                                                    <!--<button class="btn btn-default" @click="searchItem.text=searchItem.input;"><span class="glyphicon glyphicon-search"></span></button>-->
                                                                  <!--</span>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                </div>
                            </div>
                            <div class="panel-body">
                                <router-view :page-size="pageSize" ></router-view>
                            </div>
                            <div class="panel-footer">
                                <Pagination :page-size="pageSize" ></Pagination>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div class="col-sm-4  col-md-3 right-con" >
                    <!-- 购物车 -->
                    <cart></cart>
                    <!-- 计算器 -->
                    <calc @trigger-build-order="buildOrder"></calc>
                </div>
            </div>
    </div>
</template>

<style>
</style>
<script>

    import breadcrumb from 'components/breadcrumb.vue';
    import Pagination  from 'components/Pagination.vue';
    import AppCart from 'components/cart.vue';
    import AppCalc from 'components/calc.vue';

    export default{
        name: 'app',
        data() {
            return {
                pageSize:8,                 //一页显示多少个
                page:{},
                categoryShow:false
            }
        },
        computed: {
            //数据来自全局

        },
        components: {
            'cart':AppCart,              //购物车
            'calc':AppCalc,              //计算器
             Pagination,                 //分页器
             breadcrumb                  //面包屑
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

            //组件开始挂载时获取用户信息
            //alert(66);
        },
    }
</script>

