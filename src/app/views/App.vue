<template>
	<div class="container-fluid index"  >
            <div class="row" >
                <div class="col-sm-8  col-md-9 left-con">
                    <!--<div class="left-con-header">-->
                        <!--&lt;!&ndash;<breadcrumb  ref="breadcrumb" :product-params="productParams"></breadcrumb>&ndash;&gt;-->
                    <!--</div>-->
                    <div class="left-con-content">
                        <Loading v-if="listLoading"></Loading>
                        <div class="item-box panel panel-primary">
                            <div class="panel-heading" >
                                <category :show-category="showCategory" :product-categories="productCategories" :product-params="productParams"></category>
                                <div class="row">
                                    <div class="col-xs-4 col-md-2 col-lg-2">
                                        <a class="btn btn-lightgreen shuaixuan"  @click="showCategory=!showCategory" ><span class="glyphicon glyphicon-th-list"></span>分类筛选</a>
                                    </div>
                                    <div class="col-xs-6 col-md-3 col-xs-offset-2 col-md-offset-7 ">
                                        <searchbar  :product-params="productParams"></searchbar>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-body">
                                <product-list :page="page" :product-params="productParams"  @open-detail="openDetail" ></product-list>
                            </div>
                            <div class="panel-footer">
                                <Pagination :page="page" :go-callback="goCallback" ></Pagination>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div class="col-sm-4  col-md-3 right-con" >
                    <!-- 购物车 -->
                    <cart @open-stock="openStock" :cart-data="cartData" :cart-item-index="cartItemIndex"></cart>
                    <!-- 计算器 -->
                    <calc @trigger-build-order="buildOrder" :cart-data="cartData" :cart-item-index="cartItemIndex"></calc>
                </div>
            </div>
            <list-item :product-detail="productDetail" :specifications="specifications" :gift-index="giftIndex" @close-detail="closeDetail"></list-item>

            <stock-item v-if="showStockItem" :product-detail="productDetail"  :app-repertories="appRepertories" :need-quantity="needQuantity" @close-stock="closeStock"></stock-item>

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
    import ListItem from 'views/products/ListItem.vue';
    import StockItem from 'views/products/StockItem.vue';
    import ProductList from 'views/products/List.vue';


    //import Pagination  from 'views/products/Pagination.vue';
    import Pagination from 'components/pagination/Pagination.vue';

    import layer from 'layer';
    import util from 'util/util.js';
    import {request, API_URLS} from 'util/request.js';

    export default{
        name: 'app',
        data() {
            return {
                showCategory:false,
                giftIndex:0,
                cartItemIndex:0,
                showStockItem:false,
                needQuantity:0,
                pageNum:1,
                appRepertories:[]  //调拨仓库
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
             StockItem,                   //库存详情
             ProductList,                 //商品列表
             searchbar,
             Loading
        },
        created(){
            this.fetchList();
        },
        methods:{
            //请求列表
            fetchList() {
                this.$store.dispatch('fetchList',{"pageNum":this.pageNum});
            },
            goCallback(pageIndex){
                this.pageNum=pageIndex;
                this.fetchList();
            },
            //创建订单
            buildOrder:function(cart){
                //alert(this.mode);

                console.log(cart);
                var cartParam={itemParams:[]};

                cart.forEach(function(ele,index){

                    cartParam.itemParams.push(
                        {"productId":ele.id,"quantity":ele.amount}
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


                this.$store.commit("setOrderParams",{
                        cartParam:JSON.stringify(cartParam),
                        giftIds:JSON.stringify(giftParam),
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
                    newitem.selectDate = util.getSelectDate(); //自动获取选择日期
                    newitem.amount = 1; //数量默认为1
                    this.pushCart(newitem);
                    return false;
                }

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
                                  vm.giftIndex=swiper.activeIndex;
                              });
                              $(".gift-detail-tab").find('a').eq(0).addClass('selected');
                              $(".gift-detail-tab").find('a').on('click',function(){
                                     $(".gift-detail-tab").find('a').removeClass('selected');
                                     itemswiper.slideTo($(this).index());//

                                     vm.giftIndex=$(this).index();
                                   //  $(".gift-detail-tab").find('a').eq(vm.giftIndex).addClass('selected');
                              })
                            }
                        },
                        end: function () {
                            if(itemGift){
                                itemswiper.destroy(true,true);
                                itemswiper=null;
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
            //打开仓库详情
            openStock(item) {

                let vm=this;
                var params={
                    barcode:item.barCode,
                    quantity:item.amount-item.availableStock
                }

                this.needQuantity=item.amount-item.availableStock;

                this.$store.dispatch("fetchAllocationList",params).then(res=>{
                    this.appRepertories=res.appRepertories;
                    this.showStockItem=true;
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
                                vm.appRepertories=[];
                                vm.needQuantity=0;
                                vm.showStockItem=false;
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
            //判断如何加入购物车
            pushCart(item){

                var find=false;

                if(this.cartData.length>0){
                    for (var i in this.cartData) {

                        if (this.cartData[i].id == item.id) {

                            //如果没赠品直接找到
                            if(!this.cartData[i].appGiftItem){
                                this.cartData[i].amount++;
                                find=true;
                            }

                            else if (this.cartData[i].appGiftItem.id== item.appGiftItem.id) {
                                this.cartData[i].amount++;
                                find=true;
                                //break;
                            }
                        }
                    }
                }

                if(!find){
                    this.cartData.push(item);

                }

            }
        }
    }
</script>

