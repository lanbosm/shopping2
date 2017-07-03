<template>
	<div class="container-fluid index"  >
            <div class="row" >
                <div class="left-con">
                    <!--<div class="left-con-header">-->
                        <!--&lt;!&ndash;<breadcrumb  ref="breadcrumb" :product-params="productParams"></breadcrumb>&ndash;&gt;-->
                    <!--</div>-->
                    <div class="left-con-content">
                        <Loading v-if="listLoading"></Loading>
                        <div class="panel panel-primary">
                            <div class="panel-heading" >
                                <div class="row">
                                    <div class="col-xs-12 col-md-7">
                                        <ul class="nav nav-tabs app-nav">
                                            <li class="category-list" :class='{active:showList=="product"}' @click="openCategory('product')">
                                                <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                                    <span class="glyphicon glyphicon-th-list"></span>分类筛选<span class="caret"></span>
                                                </a>
                                                <category v-show="showCategory" :show-category="showCategory" :product-categories="productCategories" :product-params="productParams"></category>

                                            </li>
                                            <li @click="switchNavBar('act')"  :class='{active:showList=="act"}'><a href="javascript:void(0)">活动专区</a></li>
                                         </ul>
                                    </div>

                                    <div class="col-xs-12  col-md-5">
                                        <searchbar ref="searchbar" :product-params="productParams"></searchbar>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-body">

                                <product-list v-if='showList=="product"'  @open-detail="openDetail" ></product-list>
                                <act-product-main v-if='showList=="act"'  @open-detail="openDetail" ></act-product-main>

                            </div>

                        </div>
                    </div>
                </div>
               
                <div class="right-con" >
                    <!-- 购物车 -->
                    <cart ref="cart" @open-stock="openStock" @open-price="openPrice" :cart-data="cartData" :cart-item-index="cartItemIndex"></cart>
                    <!-- 计算器 -->
                    <calc ref="calc" @trigger-build-order="buildOrder" @trigger-edit-price="editPrice" :cart-data="cartData" :cart-item-index="cartItemIndex"></calc>
                </div>
            </div>

    </div>
</template>

<style>
</style>
<script>

    import breadcrumb from 'views/products/breadcrumb.vue';
    import searchbar from 'views/products/searchbar.vue';
    import category from 'views/products/category.vue';

    import AppCart from 'views/products/cart.vue';
    import AppCalc from 'views/products/calc.vue';
    import Loading from 'views/products/Loading.vue';


    import ProductList from 'views/products/ProductList.vue';
    import ActProductMain from 'views/products/ActProductMain.vue';



    import layer from 'layer';
    import util from 'util/util.js';
    import {request, API_URLS} from 'util/request.js';

    export default{
        name: 'app',
        data() {
            return {
                showList:'product',
                showCategory:false,
                editItem:{},
                cartItemIndex:0,
                pageNum:1,

            }
        },
        computed: {
            //数据来自全局
            listLoading () {
                return this.$store.state.currentPage.listLoading;
            },
            productParams(){
                return this.$store.state.currentPage.list;
            },
            page () {
                return this.$store.state.currentPage.pageData;
            },
            productDetail (){
                    return this.$store.state.itemData.appProductDetail;
            },
            itemRepertory (){
                    return this.$store.state.itemRepertory;
            },
            specifications (){
                    return this.$store.state.itemData.appSpecifications;
            },
            productCategories (){
                     return this.$store.state.currentPage.categoryData;
            },
            cartData () {
                return this.$store.state.currentPage.cartData
            },
            //数据来自全局
            customData () {
                return this.$store.state.currentPage.customData;
            },

        },
        components: {
             cart:AppCart,              //购物车
             calc:AppCalc,              //计算器
             breadcrumb,                  //面包屑
             category,                    //分类
             ProductList,                 //商品列表
             ActProductMain,                 //活动
             searchbar,
             Loading
        },
        created(){
            this.$store.commit("setProductParams", {"categoryId": null, "categoryName": null,"brandId":null,"brandName":null});
        },
        methods:{
            switchNavBar(navname){
                if (navname != 'product') {
                    this.showCategory = false;
                }
                this.showList=navname;

            },
            openCategory(navname){
                if(!this.showCategory){
                    this.showCategory=true;
                    this.$store.dispatch('fetchCategory',this.productParams.categoryId);
                }
            },

            //创建订单
            buildOrder:function(cart){
                //alert(this.mode);
                var cartParam={itemParams:[]};

                cart.forEach(function(ele,index){

                    cartParam.itemParams.push(
                        {"productId":ele.id,
                         "quantity":ele.amount,
                         'discount':ele.discountPrice,
                         'salePer':ele.sales && ele.sales!=10?ele.sales*10:null
                        }
                    )
                });


                var giftParam={giftIds:[]};
                cart.forEach(function(ele,index){

                    if(ele.appGiftItem) {
                        giftParam.giftIds.push(
                            {"productId": ele.appGiftItem.id, "quantity": ele.appGiftItem.amount}
                        )
                    }
                });


                this.$store.dispatch('bulidOrder',cartParam).then(res=>{

                    this.$router.push('/order');

                }).catch((res,cart)=>{

                    this.$alert(res.msg, {
                        type: 'error',
                    });
                });


            },
            //改价
            editPrice(){
                var item=this.cartData[this.cartItemIndex];
                this.openPrice(item);
            },
            //打开详情
            openDetail() {
                //是否存在赠品
                let vm=this;
                let item=this.$store.state.itemData.appProductDetail;
                let itemGift = !!item.appGiftActivity;
                let itemSpec = item.appSpecificationValues;
                let itemswiper = '';


                //如果该商品没有规格和赠品 直接加入购物车    appGiftActivity appSpecificationValue
                if(!itemGift && itemSpec.length==0){

                    var newitem = {};
                    Object.assign(newitem, item);
                    newitem.amount = 1; //数量默认为1
                    this.pushCart(newitem);
                    return false;
                }
                this.$root.showListItem=true;

                vm.$nextTick(() => {

                    //弹出页面层
                    layer.open({
                        id: 'layui-layer-item',
                        type: 1,            //1 普通层
                        shade: 0.01,  //遮罩
                        anim: 0,
                        zIndex: 1000,
                        closeBtn: 2,
                        title: false,
                        area: ['auto', 'auto'], //宽高
                        content: $('#layer-item-box'),
                        success: function () {
                            if (itemGift){  //如果存在赠品
                                itemswiper = new Swiper('.gift-detail-item', {
                                    initialSlide :0,
                                    pagination: '.gift-detail-item-pagination',
                                    paginationClickable: true,
                                    spaceBetween: 10,
                                    onInit:function(swiper){
                                        vm.giftIndex=swiper.activeIndex;
                                    }
                                });


                                itemswiper.on('onSlideChangeEnd', function (swiper) {
                                    //some code
                                    $(".gift-detail-tab").find('a').removeClass('selected');
                                    $(".gift-detail-tab").find('a').eq(swiper.activeIndex).addClass('selected');
                                    vm.productDetail.giftIndex=swiper.activeIndex;
                                });
                                $(".gift-detail-tab").find('a').eq(0).addClass('selected');
                                $(".gift-detail-tab").find('a').on('click',function(){
                                    $(".gift-detail-tab").find('a').removeClass('selected');
                                    itemswiper.slideTo($(this).index());//
                                    vm.productDetail.giftIndex=$(this).index();
                                    //  $(".gift-detail-tab").find('a').eq(vm.giftIndex).addClass('selected');
                                })
                            }
                        },
                        end: function () {

                            if(itemGift){
                                itemswiper.destroy(true,true);
                                itemswiper=null;
                            }
                            vm.$root.showListItem=false;

                        }
                    });

                })
            },
            closeDetail(item){

                layer.closeAll();
                this.pushCart(item);
            },
            //打开仓库详情
            openStock(item) {
                let vm=this;
                var params={
                    barcode:item.barCode,
                    quantity:item.amount-item.availableStock
                }

                this.itemRepertory.needQuantity=item.amount-item.availableStock;

                this.$store.dispatch("fetchAllocationList",params).then(res=>{
                    this.itemRepertory.appRepertories=res.appRepertories||[];
                    this.$root.showStockItem=true;

                    vm.$nextTick(() => {
                        //弹出页面层
                        layer.open({
                            id: 'layui-layer-stock',
                            type: 1,            //1 普通层
                            shade: 0.01,  //遮罩
                            anim: 0,
                            zIndex: 1000,
                            closeBtn: 2,
                            title: false,
                            area: ['auto', 'auto'], //宽高
                            content: $('#layer-stock-box'),
                            success: function () {

                            },
                            end: function () {
                                vm.itemRepertory.appRepertories=[];
                                vm.itemRepertory.needQuantity=0;
                                vm.$root.showStockItem=false;
                            }
                        });

                    })
                }).catch(res=>{
                    layer.alert("获取仓库信息失败",{"icon":2})
                })
                return false;
            },
            //关闭仓库详情
            closeStock(params){

                if(!params.shopRepertoryId){
                    //layer.closeAll();  //没有仓库
                    layer.alert("请选择调拨门店",{icon:2});
                }else{
                    this.$store.dispatch("applyAllocation",params).then(res=> {
                        layer.alert("调拨申请成功",{icon:1 ,closeBtn :false,yes:function(index){ layer.closeAll();}});
                    }).catch(res=> {
                        layer.alert("调拨申请失败",{icon:2 ,closeBtn :false,yes:function(index){ layer.closeAll();}});
                    });
                }


            },
            //打开改价
            openPrice(item){


                this.$set(item,'isDiscount',true);
                this.editItem=item;


            },
            //判断如何加入购物车
            pushCart(item){

                var find=false;

                if(this.cartData.length>0){
                    for (var i in this.cartData) {

                        if (this.cartData[i].id == item.id) {

                            //如果没赠品直接找到
                            if(!this.cartData[i].appGiftItem){
                                var cartitem=this.cartData[i];
                                cartitem.amount++;
                                this.$set(this.cartData,i,cartitem)
                                this.cartItemIndex=i;
                                find=true;
                                this.$store.commit('setLocalList');    //存储本地
                            }

                            else if (this.cartData[i].appGiftItem.id== item.appGiftItem.id) {

                                var cartitem=this.cartData[i];
                                cartitem.amount++;
                                this.$set(this.cartData,i,cartitem);
                                this.cartItemIndex=i;
                                find=true;
                                this.$store.commit('setLocalList');    //存储本地
                                //break;
                            }
                        }
                    }
                }

                if(!find){
                    item.amount=1;
                    this.cartData.push(item);
                    this.cartItemIndex=this.cartData.length-1;
                    this.$refs.calc.calcmode="qty";

                    //在存下

                    this.$store.commit('setLocalList');    //存储本地
                }

            }
        }
    }
</script>

