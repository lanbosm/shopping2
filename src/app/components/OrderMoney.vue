<template>
                <!--现金方式-->
                    <div class="tab-con tab-con-2 text-center tabShow">
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
                                <li>+10</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>+20</li>
                                <li>7</li>
                                <li>8</li>
                                <li>9</li>
                                <li>+50</li>
                                <li>C</li>
                                <li>0</li>
                                <li>.</li>
                                <li>X</li>
                            </ul>
                        </div>
                    </div>
</template>

<style>
</style>
<script>
    export default{
        compiled() {

        },
        ready(){
            //数据传递
            
        },
        computed: {
            //数据来自全局
            listData () {
                return [];
            },
        },
        methods:{
            filterList:function(id){

                this.cartData.index=index;
            }
        }
    }
</script>