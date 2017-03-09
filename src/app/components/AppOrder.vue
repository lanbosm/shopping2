<template>
	<div class="content">
        <router-view :page-size="12" ></router-view>
    </div>
</template>

<style>
</style>
<script>

    import Order from './Order.vue'
   

    export default{
        name: 'appOrder',
        data() {
            return {
                pageSize:8,                 //一页显示多少个
                page:{},
                categoryShow:false
            }
        },
        computed: {
            //数据来自全局

        },
        components: {
            Order                         //订单
        },
        methods:{
            //创建订单
            buildOrder:function(cart){
                alert("创建订单");
                console.log(cart);
                // if(this.cartData.list.length>0) {
                //     // console.log(this.cartData.list);
                //     // this.$parent.buildBill2();
                //     this.$emit('increment')
                //     //location.href = "./bill.html";
                // }else{
                //     alert('请先选择物品');
                // }
            },

        },
        created(){

            
           // alert(id);
        },
        mounted(){

            var vm = this;

            //组件开始挂载时获取用户信息
            //alert(66);
        },
    }
</script>

