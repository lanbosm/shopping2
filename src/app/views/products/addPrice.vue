//列表组件
<template>
    <div class="row"  v-if="!itemData">
        <div class="col-xs-12">
            加载中...
        </div>
    </div>
    <div class="row"  v-else-if="itemData.length == 0">
        <div class="col-xs-12">
            没有数据
        </div>
    </div>
    <div class="row" style="position: relative"  v-else>
        <div class="mask">
            <div class="mask_red">
                <img src="/images/redBg.png" alt="">
                <div class="mask_red_main">
                     <p class="full">满 200</p>
                     <p class="mask_add">加10元</p>
                     <div class="mask_gift" @click="PartActive">
                         <p class="part">查看赠品</p>
                         <p>当前金额￥180.00</p>
                     </div>
                     <p class="look_full" @click="AllActiveGood">查看全部→</p>
                </div>
            </div>
            <div class="mask_red mask_green">
                <img src="../../../images/greenBg.png" alt="">
                <div class="mask_red_main">
                    <p class="full">满 200</p>
                    <p class="mask_add">加价购</p>
                    <div class="mask_gift" @click="PartActive">
                        <p class="part">参与活动</p>
                        <p>已经满足活动金额</p>
                    </div>
                    <p class="look_full" @click="AllActiveGood">查看全部→</p>
                </div>
            </div>
        </div>
      <div class="add-price-item">
        <!-- Swiper -->
        <div class="swiper-container1">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in itemData " @click="fetchItem(item.id);" style="width: 25%">
                    <div class="itme_main">
                        <div class=" item">
                            <!--图片盒子-->
                            <div class="cc">
                                <div class="photo" :style="{'background-image':'url('+item.image+')'}">

                                    <div class="txt">
                                        <a  class="buy-btn" role="button"   v-show="item.giftType!='none'" ><span class="iconfont icon-baobei"></span></a>
                                        <a  class="list-btn" role="button"   v-show="item.specDesc&&item.specDesc.length"><span class="iconfont icon-liebiao"></span></a>
                                        <span class="info">
                                     <span class="price">{{item.price | currency }}</span><span class="stock">&times;{{item.availableStock}}</span>
                                </span>
                                    </div>
                                </div>
                            </div>
                            <!--http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/08b32783-e2aa-407d-a1f8-ee1faced0364.png-->
                            <!--文本盒子-->
                            <div class="tt">

                                {{item.name}}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

        <div class="add-price-item">
            <!-- Swiper -->
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in itemData " @click="fetchItem(item.id);" style="width: 25%">
                        <div class="itme_main">
                            <div class=" item">
                                <!--图片盒子-->
                                <div class="cc">
                                    <div class="photo" :style="{'background-image':'url('+item.image+')'}">

                                        <div class="txt">
                                            <a  class="buy-btn" role="button"   v-show="item.giftType!='none'" ><span class="iconfont icon-baobei"></span></a>
                                            <a  class="list-btn" role="button"   v-show="item.specDesc&&item.specDesc.length"><span class="iconfont icon-liebiao"></span></a>
                                            <span class="info">
                                     <span class="price">{{item.price | currency }}</span><span class="stock">&times;{{item.availableStock}}</span>
                                </span>
                                        </div>
                                    </div>
                                </div>
                                <!--http://aoupprod.oss-cn-beijing.aliyuncs.com/ads/2017-03-25/08b32783-e2aa-407d-a1f8-ee1faced0364.png-->
                                <!--文本盒子-->
                                <div class="tt">

                                    {{item.name}}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .add-price-item{height: 250px;overflow: hidden;width: 100%;position: relative;}
    .itme_main{padding-left: 12px;padding-right:12px;}
    .mask{width: 240px;height: auto;position: absolute;right:-12px;top:0;z-index: 9999;}
    .mask_red{width: 240px;height: 220px;border-radius: 5px;overflow: hidden;position: relative;z-index: 9999}
    .mask_red_main{width: 100%;height:auto;position: absolute;left: 0;top:0;text-align: center;color: #fff;}
    .mask_red_main .full{font-size: 34px;}
    .mask_gift{width: 130px;margin: 0 auto;border:1px solid #fff;border-radius:5px;}
    .mask_gift p{margin: 0 5px;}
    .mask_add{margin-bottom: 18px;}
    .mask_gift p:last-child{font-size: 12px;}
    .look_full{margin-top: 43px;}
    .now-money{width: 180px; height: 50px;background: #e84593; border-radius: 5px;margin: 0 auto;text-align: center;color: #fff;margin-top: 20px;}
    .now-money p{margin-bottom: 0;}
    .now-money span{font-size: 23px;}
    .mask_green{margin-top: 35px;}
    .part{font-size: 16px;}
</style>
<script>
    import $ from 'jquery';
    export default{
        name:'addPrice',
        props:["productParams","page"],
        computed: {
            itemData () {
                return this.page.list;
            },
            activeid(){
                return this.$store.state.activeId.number;
            }
        },
        filters: {
            currency: function (value) {
                if (!value) return '';
                return '¥ ' + value;
            }
        },
        created(){

              setTimeout(this.showSwiper,3000);

        },
        methods:{
            showSwiper(){
                var mySwiper=new Swiper('.swiper-container',{
                    autoplay:2000,
                    loop:true,
                    freeMode : false,
                    autoplayDisableOnInteraction : false,
                    slidesPerView:4,
                    loopedSlides :4,
                });
                var mySwiper1=new Swiper('.swiper-container1',{
                    autoplay:2000,
                    loop:false,
                    autoplayDisableOnInteraction : false,
                    freeMode : true,
                    slidesPerView:4,
                    loopedSlides :4,
                });


            },
            //点击后跳到全部商品
            AllActiveGood(){
                this.$router.push({path:'/active'})
            },
            //参与活动与加价购
            PartActive(){
                var vm=this;
                this.$root. showChooseGifts=true;
                this.$nextTick(()=>{
                    layer.open({
                        id: 'layui-choose',
                        type: 1,            //1 普通层
                        shade: 0.01,  //遮罩
                        anim: 0,
                        zIndex: 1000,
                        closeBtn: 2,
                        title: false,
                        area: ['auto', 'auto'], //宽高
                        content: $('#layer-choose'),
                        success: function () {


                        },
                        end: function () {

                            vm.$root. showChooseGifts=false
                        }
                    });
                })
            },
            //获取物品详情
            fetchItem:function(pid){
                this.$store.dispatch('fetchItem',pid).then(res=>{
                    this.$emit('open-detail'); //主动触发upup方法，'hehe'为向父组件传递的数据
                })
            }
        }
    }
</script>