<template>
	<div class="shoppingCalc">
		<table class="table table-bordered" >
			<tbody >
				<tr>
					<td colspan="3" class="t1 calc-btn" @click="showCustomModal" ><span class="iconfont icon-guanliyuan"></span>{{customName}}</td>
					<td><a  class="num-btn calc-btn" @click="calc(1);">1</a></td>
					<td><a  class="num-btn calc-btn" @click="calc(2);">2</a></td>
					<td><a  class="num-btn calc-btn" @click="calc(3);">3</a></td>
					<td><a class="num-btn calc-btn calc-mode" :class="{selected:calcmode=='qty'}" @click="changeCalcMode('qty');" >Qty</a></td>
				</tr>
			<tr>
				<td colspan="3" rowspan="3" class="t1 bulid-t1">
					<a class="bulid-btn calc-btn" @click="checkOrder"></a>
				</td>
				<td><a  class="num-btn calc-btn" @click="calc(4);">4</a></td>
				<td><a  class="num-btn calc-btn" @click="calc(5);">5</a></td>
				<td><a  class="num-btn calc-btn" @click="calc(6);">6</a></td>
				<td><a  class="num-btn calc-btn calc-mode" :class="{selected:calcmode=='disc'}"  @click="changeCalcMode('disc');" >Disc</a></td>
			</tr>
			<tr>
				<td><a class="num-btn calc-btn" @click="calc(7);">7</a></td>
				<td><a class="num-btn calc-btn" @click="calc(8);">8</a></td>
				<td><a class="num-btn calc-btn" @click="calc(9);">9</a></td>
				<td><a class="num-btn calc-btn calc-mode" :class="{selected:calcmode=='price'}" @click="changeCalcMode('price');">Price</a></td>
			</tr>
			<tr>
				<td colspan="2" ><a class="num-btn calc-btn" @click="calc(0);">0</a></td>
				<td><a class="num-btn calc-btn" @click="calc('.');">.</a></td>
				<td><a class="num-btn calc-btn calc-mode" @click="calc('x');">x</a></td>
			</tr>
			</tbody>
		</table>

	</div>
</template>


<script>
    import util from 'util/util.js';
    import $ from 'jquery';
    export default{
        name:"calc",
		data(){
			return {
                calcmode: 'qty'
            }

		},
		computed:{
			customName(){
				let customs = this.$store.state.currentPage.customData;
				if(customs.nickname){
					return customs.nickname;
				}
			}
		},
        props:['cartData','cartItemIndex'],
        methods:{
            //显示会员模块
			showCustomModal(){
                this.$root.showCustomDialog=true;
			},
            changeCalcMode(keycode){

                switch (keycode) {
                    case 'qty': //数量
                        this.calcmode = "qty";
                        break;
                    case 'disc': //resize
                        this.calcmode = "disc";
                        break;
                    case 'price': //resize
                        this.calcmode = "price";
                        break;
                }
			},
            //计算器
            calc:function(keycode){

                if(this.cartData.length==0){return;}

                var index=this.cartItemIndex;


                //数量模式
				if(this.calcmode=="qty") {


						//选中的数量
						var amount=this.cartData[index].amount;

						if (!this.cartData[index].amountDiy) {
							amount = "";
							this.cartData[index].amountDiy=true;
						}
						if(keycode=="x"){
							   		//close
									var str=amount+"";
									amount=str.substring(0,str.length-1);
									if(amount==""){
										this.cartData.splice(index,1);
									}
									else{
										this.cartData[index].amount=parseInt(amount);
									}
									var pageList=this.$store.state.pageList;
									this.$store.commit('setLocalList',pageList);    //存储本地
						}else{
                            if(keycode!='.'){
                                amount+=keycode+'';
                                this.cartData[index].amount=parseInt(amount);
                            }
						}
                }
                else if(this.calcmode=="disc") {

                    //只要有discountPrice就是改价状态
                    //选中的数量
                    if (!this.cartData[index].isSales) {
                        var sales="";
                        this.cartData[index].isSales = true;
                    }else{
                        var sales=this.cartData[index].sales;
                        this.cartData[index].isSales = true;
                    }

                    if(keycode=="x"){

                        //close
                        var str=sales+"";
                        sales=str.substring(0,str.length-1);
                        if(sales==""){ //减到0
                            sales="";
                            this.cartData[index].sales=null;
                            this.cartData[index].isSales = false;
                        }
                        else{
                            this.cartData[index].sales=sales;
                        }

                        var pageList=this.$store.state.pageList;
                        this.$store.commit('setLocalList',pageList);    //存储本地
                    }else{
                        if(keycode=='.' && sales.indexOf('.')<0 && sales==""){
                            sales="0";
                        }
                        if(keycode=='.' && sales.indexOf('.')<0 || !isNaN(keycode)){  //如果是点的话 已经包含小数
                            this.cartData[index].isSales = true;
                            sales+=keycode+'';
                            console.log( sales);
                            this.$set( this.cartData[index],'sales',sales);
                        }

                    }
                }
                else if(this.calcmode=="price") {

					//只要有discountPrice就是改价状态
                    //选中的数量
                    if (!this.cartData[index].isDiscount) {
                        var discountPrice="";
                        this.cartData[index].isDiscount = true;
                    }else{
                        var discountPrice=this.cartData[index].discountPrice;
                        this.cartData[index].isDiscount = true;
					}

                    if(keycode=="x"){

                        //close
                        var str=discountPrice+"";
                        discountPrice=str.substring(0,str.length-1);
                        if(discountPrice==""){ //减到0
                            discountPrice="";
                            this.cartData[index].discountPrice=null;
                            this.cartData[index].isDiscount = false;
                        }
                        else{
                            this.cartData[index].discountPrice=discountPrice;
                        }

                        var pageList=this.$store.state.pageList;
                        this.$store.commit('setLocalList',pageList);    //存储本地
                    }else{
						if(keycode=='.' && discountPrice.indexOf('.')<0 && discountPrice==""){
                            discountPrice="0";
						}
                        if(keycode=='.' && discountPrice.indexOf('.')<0 || !isNaN(keycode)){  //如果是点的话 已经包含小数
                            this.cartData[index].isDiscount = true;
                            discountPrice+=keycode+'';
                            console.log( discountPrice);
                            this.$set( this.cartData[index],'discountPrice',discountPrice);
						}

                    }
                }
            },
			//结账
            checkOrder:function(){
                if(this.cartData.length>0) {

                    this.$emit('trigger-build-order',this.cartData);

                }else{
                    this.$message.info('请先选择物品');
                }
            },

            gai:function(){

                this.$emit('trigger-edit-price');

			}

        }
    }
</script>

