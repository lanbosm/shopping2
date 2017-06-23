<template>
   	  <!--默认无选择-->
        <div class="tab-con tab-con-0 text-center tabShow">
            <h1 class="pay-amount ">￥ {{amount}}</h1>
            <p class="pay-gift-amount" v-if="giftAmount" >{{giftAmount}}</p>
            <div class="pay-type-box">
                <div class="wxpay paytype">
                    微信
                    <input type="radio" v-model="payMethod" value="17" @change="setPay()"/>
                </div>
                <div class="alipay paytype">
                    支付宝
                     <input type="radio" v-model="payMethod" value="18" @change="setPay()"/>
                </div>
            </div>
            <p class="txt">请选择二维码类型</p>
            <shop-admin-btn v-show="showShopAdminBtn"></shop-admin-btn>
        </div>
</template>


<script>
    import shopAdminBtn from 'views/shopAdmin/ShopAdminBtn.vue';
    export default{
        props:['message','amount','giftAmount','showShopAdminBtn'],
        data () {
            return {
                payMethod: '17'
            };
        },
        components:{
            shopAdminBtn
        },
        methods:{
          setPay(){
              this.$store.commit('setOrderParams',{'paymentMethodId':this.payMethod})
          }

        }
    }
</script>

