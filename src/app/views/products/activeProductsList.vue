<template>
   <div class="activeProducts container">
        <div class="product_main">
            <div class="pay_money">
                <p class="pay_p">¥ <span>300</span>.00</p>
                <p>当前金额</p>
            </div>
            //
            <!--<div class="pay_div">-->
                <!--<a class="pay_btn active_pay">-->
                    <!--<span>满 100</span>-->
                <!--</a>-->
                <!--<a class="pay_btn active_pay">-->
                    <!--<span>满 200</span>-->
                <!--</a>-->
                <!--<a class="pay_btn active_pay">-->
                    <!--<span>满 300</span>-->
                <!--</a>-->
                <!--<a class="pay_btn active_pay">-->
                    <!--<span>满 500</span>-->
                <!--</a>-->
            <!--</div>-->
        </div>
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
           <div class="col-xs-3" v-for="(item,index) in itemData ">
               <div class=" item" @click="fetchItem(item.id);">
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
</template>
<style rel="stylesheet/less"  lang="less">
    .product_main{overflow: hidden;position: relative;margin-bottom: 10px;}
    .pay_money{float: left;
        p{color:#999;margin-bottom: 0px;
            span{
               font-size: 30px
            }
        };
        .pay_p{color: #e84593}
    };
    .pay_div{float:left;padding-top: 20px;margin-left:30px;
          .pay_btn{padding: 5px 20px;margin-left: 10px;border-radius: 8px;text-decoration: none;cursor: pointer}

    }
    .active_pay{background: #f0eeee;color: #666;}
    .active_money{background-color: #6ec89b;color: #fff}
</style>
<script>
   export default{
       name:'activeProductsList',
       data(){
           return{
               itemData:[]
           }
       }
   }

</script>