<template>
                <!--现金方式-->
                    <div class="tab-con tab-con-1 text-center tabShow">
                        <h1 class="pay-amount ">￥ {{amount}}</h1>
                        <p class="pay-gift-amount" v-if="giftAmount">{{giftAmount}}</p>

                        <div class="list-box ">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>价格</th>
                                    <th>付款</th>
                                    <th>找零</th>
                                    <th>支付方式</th>
                                </tr>
                                </thead>
                                <tbody class="text-left">
                                <tr>
                                    <td>{{amount}}</td>
                                    <td>{{rmb}}</td>
                                    <td>{{change}}</td>
                                    <td>现金</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="calc-box ">
                            <ul class="clearfix">
                                <li @click="calc(1);">1</li>
                                <li @click="calc(2);">2</li>
                                <li @click="calc(3);">3</li>
                                <li @click="calc(4);">4</li>
                                <li @click="calc(5);">5</li>
                                <li @click="calc(6);">6</li>
                                <li @click="calc(7);">7</li>
                                <li @click="calc(8);">8</li>
                                <li @click="calc(9);">9</li>
                                <li @click="calc('.');">.</li>
                                <li @click="calc(0);">0</li>
                                <li @click="calc('x');">X</li>

                            </ul>
                        </div>
                        <shop-admin-btn v-show="showShopAdminBtn"></shop-admin-btn>
         </div>

</template>

<style>
</style>
<script>
    import shopAdminBtn from 'components/ShopAdminBtn.vue';
    export default{
        props:['message','amount','giftAmount','showShopAdminBtn'],
        data(){
            return {
                rmb:0
            }
        },
        computed: {
            //数据来自全局
            mode(){
                return this.$store.state.currentPage.mode;
            },
            change(){
                var b=this.rmb-this.amount;
                if(b<0){b=0;}
                return b;
            }

        },
        components:{
            shopAdminBtn
        },
        methods:{
            calc:function(keycode){

                var amount=this.rmb;

                if(isNaN(keycode)){
                    switch (keycode) {
                        case 'x':   //close
                            var str=this.rmb+"";
                            this.rmb=str.substring(0,str.length-1);
                            break;
                        case '.':   //close
                            var str=this.rmb+".";
                            this.rmb=str;
                            break;
                    }
                }else{
                    if(amount){
                        this.rmb+=keycode+'';
                    }else{
                        this.rmb=keycode;
                    }


                }
            },
        }
    }
</script>