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
									<span>数量:{{item.amount}} * 单价 {{item.price|currency '¥' 2 }}</span><span></span>
								</p>
								<p class="total">
									<span>{{item.amount*item.price |currency '¥' 2 }}</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="totalprice">
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
        data(){
            return {
                cartData:{
                    index:0,
                    list:[],
                }
            }
        },
        props: {                                       //定义参数类型

        },
        methods:{
            //自适应高
           setCartHeight (){
					var w = window.innerHeight;
					var lh = document.querySelector('.left-con').offsetHeight;
					var ch = document.querySelector('.shoppingCalc').offsetHeight;

					if (w >= 768 ) {
						$("#shoppingCart-list").show();
						document.getElementById("shoppingCart-list").style.height=lh-ch-140+"px";
					} else {
						$("#shoppingCart-list").hide();
					}
			},
            removeCustom(){
                var index=this.listData.index-1;
                this.listData.list.splice(index,1);
                this.saveLocalData();
            },
            switchCustom(index){
                this.listData.index=index;
                this.saveLocalData();
            },
            getLocalData(){


            },
            saveLocalData(){
                this.$parent.headerData=this.listData;
                util.pushLocal("queue",this.$parent.headerData);
            }
        }
    }
</script>

