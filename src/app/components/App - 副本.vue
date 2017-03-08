<template>
	<div class="container-fluid index">
                    <div class="row" >
                        <div class="col-sm-8  col-md-9 left-con">
                            <div class="left-con-header">
                                <ol class="breadcrumb">
                                    <li :class="index==navData.path.length-1?'active':''" v-for="(index,nav) in navData.path"><span v-show="index==0" class="glyphicon glyphicon-home"> </span><a :href="nav.id" @click="getItemList(nav.id)">{{nav.name}}</a></li>
                                </ol>
                            </div>
                            <div class="left-con-content">
                                <div class="item-box panel panel-primary">
                                    <div class="panel-heading" >
                                        <!--分类航条-->
        `                               <div class="row" v-show="navData.show" >
                                            <div class="col-xs-12 category-list clearfix" @mouseleave="navData.show=false">
                                                <div class="menu">
                                                    <a :href="nav.id" class="sub btn-lightgreen" v-on:mouseenter="navData.index=index" v-for="(index,nav) in navData.list" @click="getItemList(nav.id)" >{{nav.name}}</a>
                                                </div>
                                                <div class="sub-menu" >
                                                    <template v-if="!navData.list[navData.index]">
                                                        <p> 数据加载中...</p>
                                                        <template v-if="1<2">
                                                            <p> 没有分类</p>
                                                        </template>
                                                    </template>
                                                    <template v-else>
                                                        <a  class="btn btn-default sub-menu-category" :href="nav.id" v-for="(index,nav) in navData.list[navData.index].children" @click="getItemList(nav.id)">{{nav.name}}</a>
                                                    </template>

                                                </div>

                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-6 col-md-3 col-lg-2">
                                                <a class="btn btn-lightgreen shuaixuan"  @click="navData.show=!navData.show" ><span class="glyphicon glyphicon-th-list"></span>分类筛选</a>
                                            </div>
                                            <div class="searchbar  col-xs-6 col-md-3 col-md-offset-6 col-lg-offset-7  ">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" v-model="searchItem.input" v-on:keyup.enter="searchItem.text=searchItem.input;" placeholder="搜索商品">
                                                    <span class="input-group-btn">
                                                                    <button class="btn btn-default" @click="searchItem.text=searchItem.input;"><span class="glyphicon glyphicon-search"></span></button>
                                                                  </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel-body">
                                        <!--<div class="row"  v-show="itemData.length!=0">-->
                                            <!--<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 item" v-for="(index,item) in filteredItemDataList ">-->
                                                <!--<div class="thumbnail" @click="openItem(item.id);">-->
                                                    <!--<a  class="list-btn" role="button"  v-show="item.specDesc&&item.specDesc.length"><span class="iconfont icon-liebiao"></span></a>-->
                                                    <!--<div class="prcie primary">{{item.price |currency '¥' 2}}元</div>-->
                                                    <!--<div class="photo"  >-->
                                                        <!--<img class="img-responsive" :src="item.image" :alt="item.title" :title="item.title" >-->
                                                    <!--</div>-->
                                                    <!--<div class="caption">-->
                                                        <!--<p>{{item.name}}</p>-->
                                                    <!--</div>-->
                                                    <!--<a  class="buy-btn" role="button"   v-show="item.giftType!='none'"-->
                                                    <!--&gt;<span class="iconfont icon-baobei"></span></a>-->
                                                <!--</div>-->
                                            <!--</div>-->
                                        <!--</div>-->
                                        <!--<div class="row"  v-else>-->
                                            <!--<div class="col-xs-12">-->
                                                <!--数据加载中....-->
                                            <!--</div>-->
                                        <!--</div>-->
                                        <!--<div class="row"  v-show="filteredItemDataList.length==0 && itemData.list.length!=0">-->
                                            <!--<div class="col-xs-12">-->
                                                <!--没有相关数据....-->
                                            <!--</div>-->
                                        <!--</div>-->
                                    </div>
                                    <div class="panel-footer">
                                        <!--<div class="page-bar">-->
                                            <!--<ul class="pagination">-->
                                                <!--<li><span class="pagination-label">第 {{page.pageNum}} 页,共 {{page.pages}} 页</span></li>-->
                                                <!--<li v-if="page.hasPreviousPage"><a @click="pageTo(page.pageNum-1)">上一页</a></li>-->
                                                <!--<li v-for="index in page.pages"  :class="{ 'active': page.pageNum == index+1}">-->
                                                    <!--<a @click="pageTo(index+1)">{{ (index+1) }}</a> </li>-->
                                                <!--<li v-if="page.hasNextPage"><a @click="pageTo(page.pageNum+1)">下一页</a></li>-->
                                            <!--</ul>-->
                                        <!--</div>-->
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
</template>

<style>
</style>
<script>
    "use strict";
    import util from 'util/util.js';
    import $ from 'jquery';
    import appCart from 'components/cart.vue';
    import appCalc from 'components/calc.vue';
    //定义购物车组件
    Vue.component('cart',appCart);
    //定义计算器组件
    Vue.component('calc',appCalc);
    /**
     * [设置购物车的高]
     */
    export default{
        compiled() {

        },
        ready(){
            //数据传递

        },
        computed: {
            //数据来自全局
            cartData () {
                return this.$store.state.cartData
            }
        },
        methods:{
            //计算器
            calc:function(keycode){
                var vm=this;
                if(this.cartData.list.length==0){return;}

                var index=this.cartData.index;
                //选中的单价
                var price=this.cartData.list[index].price;
                //选中的数量
                var amount=this.cartData.list[index].amount;

                if(isNaN(keycode)){
                    switch (keycode) {
                        case 'qty': //resize
                            this.cartData[index].amount=1;
                            break;
                        case 'x':   //close
                            var str=amount+"";
                            amount=str.substring(0,str.length-1);
                            if(amount==""){
                                this.cartData.list.splice(index,1);
                            }
                            else{
                                this.cartData.list[index].amount=parseInt(amount);
                            }
                            break;
                    }
                }else{
                    if(amount!=1){
                        amount+=keycode+'';
                    }else{

                        amount=keycode;
                    }
                    this.cartData.list[index].amount=parseInt(amount);

                    //console.log(this.cartData.list);
                }
            },
			//结账
            checkOrder:function(){
                if(this.cartData.list.length>0) {

                    this.$emit('trigger-build-order',this.cartData);

                }else{
                    alert('请先选择物品');
                }
            }

        }
    }
</script>

