<template>
   	<div class="shoppingCart">
				<div class="shoppingCart-list" id="shoppingCart-list" :class="{empty:cartData.list.length==0}">
					<ul>
						<li :class="{checked:cartData.index==index}" v-for="(index,item) in cartData.list " track-by="$index" @click="checkcartData($event,index);">
							<div class="shoppingCart-item">
								<p>{{item.title}}</p>
								<p class="small">
									<span>{{item.name}}</span> <span>{{item.selectDate}}</span>
								</p>
								<p class="small">
									<span>数量{{author}} :{{item.amount}} * 单价 {{item.price|currency '¥' 2 }}</span><span></span>
								</p>
								<p class="total">
									<span>{{item.amount*item.price |currency '¥' 2 }}</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="totalprice" @click="setAuthor">
					总价 <span class="primary">{{totalprice |currency '¥' 2 }}</span>
				</div>
	</div>
</template>

<style>
</style>
<script>
    "use strict";
    import util from 'util/util.js';
    import $ from 'jquery';

    /**
     * [设置购物车的高]
     */
    export default{
        compiled() {

        },
        ready(){
            //数据传递
			this.setCartHeight();
            window.onresize=this.setCartHeight;
        },
        computed: {
            //数据来自全局
            cartData () {
                return this.$store.state.cartData
            },
            totalprice () {
                var total=0;
                this.cartData.list.forEach(function(e,i){
                    total+=e.price*e.amount;
                })
                return total;
            }
        },
        methods:{
            //自适应高
           setCartHeight (){

                    var w = window.innerWidth;
                    var lh = document.querySelector('.left-con').offsetHeight;
                    var ch = document.querySelector('.shoppingCalc').offsetHeight;


                    if (w >= 768) {
                        $("#shoppingCart-list").show();
                        document.getElementById("shoppingCart-list").style.height = lh - ch - 140 + "px";
                    } else {

                        $("#shoppingCart-list").hide();
                    }

			},
            checkcartData:function(ev,index){

                this.cartData.index=index;
            }
        }
    }
</script>

