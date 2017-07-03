<template>
   	  <!--默认无选择-->
        <div class="tab-con tab-con-0 text-center tabShow">
            <h1 class="pay-amount ">{{amount | currency}}</h1>
            <p class="pay-gift-amount" v-if="giftAmount" >{{giftAmoun | currencyt}}</p>
            <div class="pay-type-box">
                <p class="txt">请选择扫码类型</p>
                <div class="paytype" :class="{selected:payMethod==17}">
                    <input type="radio" id="wxpay" v-model="payMethod" value="17" @change="setPay()"/>
                    <label title="微信支付" class="paybox wxpay" for="wxpay"></label>
                </div>
                <div class="paytype"  :class="{selected:payMethod==18}">
                    <input type="radio" id="alipay" v-model="payMethod" value="18" @change="setPay()"/>
                    <label title="支付宝支付" class="paybox alipay" for="alipay"></label>
                </div>
            </div>
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

