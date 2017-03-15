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
                                    <td>70</td>
                                    <td><span>1000</span></td>
                                    <td>30</td>
                                    <td>现金</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="calc-box ">
                            <ul class="clearfix">
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>5</li>
                                <li>6</li>
                                <li>7</li>
                                <li>8</li>
                                <li>9</li>
                                <li>C</li>
                                <li>0</li>
                                <li>X</li>
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
        components:{
            shopAdminBtn
        }
    }
</script>