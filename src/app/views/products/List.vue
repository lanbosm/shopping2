//列表组件
<template>
    <div class="product">
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
            <div class="item" v-for="(item,index) in itemData "  @click="fetchItem(item.id);">
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
</template>
<script>
    export default {
        name: 'ProductList',
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

        },
        mounted(){


                this.$simpleScroll('.product','vertical',false);

        },
        methods:{
            //获取物品详情
            fetchItem:function(pid){
                this.$store.dispatch('fetchItem',pid).then(res=>{
                     this.$emit('open-detail'); //主动触发upup方法，'hehe'为向父组件传递的数据  父级传过来的方法  用$emit方法去触发
                })
            }

        }
    }
</script>

<style scoped>


</style>