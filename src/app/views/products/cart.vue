<template>
   	<div class="shoppingCart">
				<div class="shoppingCart-list" id="shoppingCart-list" :class="{empty:cartData.length==0}">
					<ul>
						<li :class="{checked:index==cartItemIndex}" v-for="(item,index) in cartData " track-by="$index" @click="checkCartItem(index);">
							<div class="shoppingCart-item">
								<p>{{item.title}}</p>
								<p class="small">
									<span>{{item.name}}</span> <span>{{item.selectDate}}</span>
								</p>
								<p class="small">
									<span >数量 :{{item.amount}} * 单价 {{item.price  }}</span>
									<span class="tips" @click="openStock(item)">{{item | stocktips}}</span>
								</p>
								<p class="total">
									<span v-if="item.appGiftItem">赠送：{{item.appGiftItem.name}}</span>
									<span @click="openPrice(item)" class="gaijia" :class="{editPrice:item.editPrice==true}">{{item.amount*item.price | currency }}</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="totalprice">
					总价 <span class="primary">{{totalprice | currency }}</span>
				</div>
	</div>
</template>

<style>

</style>
<script>


    export default{
        name:"cart",
        filters: {
            currency: function (value) {
                if (!value) return '0.00';
                return '¥ ' + Number(value).toFixed(2);
            },
            stocktips: function (value) {
               // console.log(value.id);
                if(value.amount>value.availableStock) {
                    return "库存不足";
                }else{
                    return "";
				}
            }
        },
		props:['cartData','cartItemIndex'],

        mounted(){
            this.$simpleScroll('.shoppingCart-list');
		},
        computed: {
            //数据来自全局
            totalprice () {
                var total=0;
                this.cartData.forEach(function(e,i){
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
                        document.getElementById("#shoppingCart-list").style.display="block";
                        document.getElementById("shoppingCart-list").style.height = lh - ch - 140 + "px";
                    } else {

                        document.getElementById("#shoppingCart-list").style.display="none";
                    }

			},
            checkCartItem:function(index){
				//console.log(this.cartData);
                this.$parent.cartItemIndex=index;
            },
            openStock:function(item){
                if(item){
                	this.$emit('open-stock',item);
                }

			},
            openPrice:function(item){
                if(item){
                    this.$emit('open-price',item);
                }

            }
        }
    }
</script>

