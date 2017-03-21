<template>
	<div class="container-fluid index" >
            <div class="row" >
                <div class="col-sm-8  col-md-9 left-con">
                    <div class="left-con-header">
                        <breadcrumb  ref="breadcrumb" :product-params="productParams"></breadcrumb>
                    </div>
                    <div class="left-con-content">
                        <Loading v-if="loading"></Loading>
                        <div class="item-box panel panel-primary">
                            <div class="panel-heading" >
                                <category :show-category="showCategory" :product-categories="productCategories" :product-params="productParams"></category>
                                <div class="row">
                                    <div class="col-xs-4 col-md-2 col-lg-2">
                                        <a class="btn btn-lightgreen shuaixuan"  @click="showCategory=!showCategory" ><span class="glyphicon glyphicon-th-list"></span>分类筛选</a>
                                    </div>
                                    <div class="col-xs-6 col-md-3 col-xs-offset-2 col-lg-offset-7">
                                        <searchbar  :product-params="productParams"></searchbar>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-body">
                                <div  v-if="!showlist">载入中...</div>
                                <product-list  v-if="showlist" :product-params="productParams"  @open-detail="openDetail" ></product-list>
                            </div>
                            <div class="panel-footer">
                                <Pagination :page="page" :product-params="productParams" ></Pagination>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div class="col-sm-4  col-md-3 right-con" >
                    <!-- 购物车 -->
                    <cart :cart-data="cartData" :cart-item-index="cartItemIndex"></cart>
                    <!-- 计算器 -->
                    <calc @trigger-build-order="buildOrder" :cart-data="cartData" :cart-item-index="cartItemIndex"></calc>
                </div>
            </div>
            <list-item :product-detail="productDetail" :specifications="specifications" :gift-index="giftIndex" @close-detail="closeDetail"></list-item>
    </div>
</template>

<style>
</style>
<script>

    import breadcrumb from 'components/breadcrumb.vue';
    import searchbar from 'components/searchbar.vue';
    import category from 'components/category.vue';
    import Pagination  from 'components/Pagination.vue';
    import AppCart from 'components/cart.vue';
    import AppCalc from 'components/calc.vue';
    import Loading from 'components/Loading.vue';
    import ListItem from 'components/ListItem.vue';
    import ProductList from 'components/list.vue';

    import layer from 'layer';
    import util from 'util/util.js';
    import {request, API_URLS} from '../../js/util/request.js';

    export default{
        name: 'app',
        data() {
            return {
                pageSize:8,                 //一页显示多少个
                showCategory:false,
                giftIndex:0,
                cartItemIndex:0
            }
        },
        computed: {
            //数据来自全局
            showlist(){
                if(this.$store.state.pageData.list){
                    return true;
                }else{
                   // console.log(this.);
                    console.log(this);
                    this.fetchList();
                    return false;
                }

            },
            loading () {
                return this.$store.state.loading;
            },
            productParams(){
                return this.$store.state.productParams;
            },
            page () {
                return this.$store.state.pageData
            },
            productDetail (){
                    return this.$store.state.itemData.appProductDetail;
            },
            specifications (){
                    return this.$store.state.itemData.appSpecifications;
            },
            productCategories (){
                     return this.$store.state.categoryData;
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
             Pagination,                 //分页器
             breadcrumb,                  //面包屑
             category,                    //分类
             ListItem,                    //商品详情
             ProductList,                 //商品列表
             searchbar,
             Loading
        },
        methods:{
            //请求列表
            fetchList() {
                let apiObj={
                    url: API_URLS.products,
                    data:{
                        'categoryId': this.productParams.categoryId,
                        'brandId': this.productParams.brandId,
                        'pageNum': this.productParams.pageNum,
                        'searchStr': this.productParams.searchStr
                    }
                };
                request.fnGet(this,apiObj,(res)=>{
                    this.$store.commit("setPageData",res.page);
                })
            },
            //创建订单
            buildOrder:function(cart){
                //alert(this.mode);
                if(!this.customData.id){
                    alert("请先选择会员");
                    return false;
                }

                var cartParam={itemParams:[]};

                cart.forEach(function(ele,index){

                    cartParam.itemParams.push(
                        {"productId":ele.id,"quantity":ele.amount}
                    )
                });


                this.$store.commit("setOrderParams",{
                        cartParam:JSON.stringify(cartParam),
                        couponCodeId:null,
                        usePoint:false,
                        useBalance:false,
                        memberId:this.customData.id,
                        guiderId:null
                })



                var apiObj={
                    url:API_URLS.b2b_orders+"/build",
                    data:this.$store.state.currentPage.orderParams
                }

                request.fnPost(this,apiObj,(res)=>{
                     this.$store.commit("setMode",'order');
                     this.$store.commit("setOrderData",res.appOrderConfirmBean);
                     this.$router.push('/order');
                })




            },
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
                    newitem.selectDate = util.getSelectDate(); //自动获取选择日期
                    newitem.amount = 1; //数量默认为1
                    this.pushCart(newitem);
                    return false;
                }



                //(
               // console.log(vm.$store.state.itemData.appProductDetail);

                //console.log(
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
                                     pagination: '.gift-detail-item-pagination',
                                    paginationClickable: true,
                                    spaceBetween: 10

                                });
                              itemswiper.on('onSlideChangeEnd', function (swiper) {
                                   //some code
                                  $(".gift-detail-tab").find('a').removeClass('selected');
                                  $(".gift-detail-tab").find('a').eq(swiper.activeIndex).addClass('selected');
                                  vm.giftIndex=swiper.activeIndex;
                              });
                              $(".gift-detail-tab").find('a').eq(0).addClass('selected');
                              $(".gift-detail-tab").find('a').on('click',function(){

                                     itemswiper.slideTo($(this).index());//
                                     vm.giftIndex=$(this).index();
                               })
                            }
                        },
                        end: function () {
                            if(itemGift){
                                itemswiper.destroy();
                                $(".gift-detail-tab").find('a').off().removeClass('selected');
                            }
                        }
                    });

                })
            },
            closeDetail(item){
                layer.closeAll();
                this.pushCart(item);
            },
            pushCart(item){
                this.cartData.push(item);
            }
        },
        created(){
        },
        mounted(){

            //组件开始挂载时获取用户信息
            //alert(66);
        },
    }
</script>

