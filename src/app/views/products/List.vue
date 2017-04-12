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
    <div class="row"  v-else>

        <div class="col-xs-12 col-sm-4 col-md-3" v-for="(item,index) in itemData ">
                <div class=" item" @click="fetchItem(item.id);">
                    <!--图片盒子-->
                    <div class="c">
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
                    <div class="t">

                        {{item.name}} {{item.name}} {{item.name}} {{item.name}} {{item.name}} {{item.name}} {{item.name}} {{item.name}} {{item.name}} {{item.name}} {{item.name}}

                    </div>

                </div>

             <!--<div class="thumbnail" @click="fetchItem(item.id);">-->
                 <!--<a  class="list-btn" role="button"  v-show="item.specDesc&&item.specDesc.length"><span class="iconfont icon-liebiao"></span></a>-->
                 <!--<div class="title">{{item.price | currency }}元 <span class="stock">库存：{{item.availableStock}}件</span> </div>-->
                 <!--<div class="photo"  >-->
                 <!--<img class="img-responsive" :src="item.image" :alt="item.title" :title="item.title" />-->
             <!--</div>-->
             <!--<div class="caption"><p>{{item.name}}{{item.specDesc}}</p></div>-->
                <!--<a  class="buy-btn" role="button"   v-show="item.giftType!='none'"><span class="iconfont icon-baobei"></span></a>-->
             <!--</div>-->
        </div>
    </div>
</template>
<style lang="less">
    @import "../../../css/util/skin.less";
    @import "../../../css/util/mixin.less";
    .item{height: auto; position: relative;  margin-top:@gutter;
        border:  @borderStyle; border-radius: 3px;
        background:#ffffff  url('/images/lazyload.png') 50% 50% no-repeat;
        background-size:100%;
        padding-bottom: 10px;
    }

    .c{width: 100%; height: 200px; background: #fff;
        top:0;
        border-radius: 5px;
        .photo{
            position: relative;
            background-size:cover;
            width: 100%;
            height: 100%;
        }
        .txt{width: 100%; background: blank; height: 30px; background: rgba(0,0,0,0.5);
            padding: 5px 10px;
            z-index:10;
            bottom:0; position: absolute; line-height: 20px;
            .iconfont{
                font-size: 12px;
                line-height: 20px;
                text-decoration: none;
            }
            .icon-liebiao{
                font-size: 14px;
                line-height: 22px;
            }

            color: #ffffff;
            .norow;
            .info{
                float:right;}
            .price{color:@themeColor; }
            .stock{margin-left: 10px; color: #ffffff;}
            .list-btn,.buy-btn{position:relative;z-index: 99;  float: left; margin-left: @gutter/2; margin-right: @gutter/2;  color: @themeColor}
        }
    }

    .t{

        width: 100%;  position: relative;

        padding: 5px;
         z-index:10;
         font-size: 16px;
         position:relative;padding:5px 10px 10px 5px;height:25px; line-height:25px; font-size:12px;
         .norow();


    }



</style>
<script>
    export default {
        name: 'ProductList',
        props:["productParams","page"],
        computed: {
            itemData () {
                return this.page.list;
            }
        },
        filters: {
            currency: function (value) {
                if (!value) return '';
                return '¥ ' + value;
            }
        },
        methods:{
            //获取物品详情
            fetchItem:function(pid){
                this.$store.dispatch('fetchItem',pid).then(res=>{
                     this.$emit('open-detail'); //主动触发upup方法，'hehe'为向父组件传递的数据
                })
            }

        }
    }
</script>

<style scoped>


</style>