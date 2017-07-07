<template>
	<div class="shoppingCalc">
		<table class="table table-bordered" >
			<tbody >
				<tr>
					<td colspan="3" class="t1 calc-btn" @click="showCustomModal" ><span class="iconfont icon-guanliyuan"></span>{{customName}}</td>
					<td><a  class="num-btn calc-btn" @click="calc(1);">1</a></td>
					<td><a  class="num-btn calc-btn" @click="calc(2);">2</a></td>
					<td><a  class="num-btn calc-btn" @click="calc(3);">3</a></td>
					<td><a class="num-btn calc-btn calc-mode" :class="{selected:calcmode=='qty'}" @click="changeCalcMode('qty');" >数量</a></td>
				</tr>
			<tr>
				<td colspan="3" rowspan="3" class="t1 bulid-t1">
					<a class="bulid-btn calc-btn" @click="checkOrder"></a>
				</td>
				<td><a  class="num-btn calc-btn" @click="calc(4);">4</a></td>
				<td><a  class="num-btn calc-btn" @click="calc(5);">5</a></td>
				<td><a  class="num-btn calc-btn" @click="calc(6);">6</a></td>
				<td><a  class="num-btn calc-btn calc-mode" :class="{selected:calcmode=='disc',dis:cartZone!='cart'} "  @click="changeCalcMode('disc');" >折扣</a></td>
			</tr>
			<tr>
				<td><a class="num-btn calc-btn" @click="calc(7);">7</a></td>
				<td><a class="num-btn calc-btn" @click="calc(8);">8</a></td>
				<td><a class="num-btn calc-btn" @click="calc(9);">9</a></td>
				<td><a class="num-btn calc-btn calc-mode" :class="{selected:calcmode=='price',dis:cartZone!='cart'}" @click="changeCalcMode('price');">价格</a></td>
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
        props:['cartZone','cartZoneList','cartSelectItem'],
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

                if(!this.cartSelectItem.id){return;}

                //数量模式
				if(this.calcmode=="qty") {


						//选中的数量
						var amount=this.cartSelectItem.amount;

						if (!this.cartSelectItem.amountDiy) {
							amount = "";
                            this.$set( this.cartSelectItem,'amountDiy',true);
						}
						if(keycode=="x"){
							   		//close
									var str=amount+"";
									amount=str.substring(0,str.length-1);
									if(amount==""){
									    this.cartZoneList.forEach((ele,index)=>{
									        if(ele.id==this.cartSelectItem.id){


                                                this.cartZoneList.splice(index,1);

												if(index>0) {
                                                    this.$parent.cartSelectItem = this.cartZoneList[index - 1];
                                                }


											}
										})


										if(this.$parent.$refs.searchbar.type=='barcode'){
                                            document.querySelector('#searchBar').focus();
										}
									}
									else{
                                        this.$set( this.cartSelectItem,'amount',parseInt(amount));
									}


						}else{
                            if(keycode!='.'){
                                amount+=keycode+'';
                                console.log(this.cartSelectItem);
                                this.$set( this.cartSelectItem,'amount',parseInt(amount));
                                console.log(this.cartSelectItem);
                            }
						}

                }
                else if(this.calcmode=="disc") {

                    //只要有discountPrice就是改价状态
                    //选中的数量
                    if (!this.cartSelectItem.isSales) {
                        var sales="";
                        this.$set( this.cartSelectItem,'isSales',true);
                    }else{
                       // alert(222);
                        var sales=this.cartSelectItem.sales;
                        this.$set( this.cartSelectItem,'isSales',true);
                    }

                    if(keycode=="x"){
                        //close
                        var str=sales+"";
                        sales=str.substring(0,str.length-1);
                        if(sales==""){ //减到0
                            sales=""
                            this.$set( this.cartSelectItem,'isSales',false);
                        }
                        else{
                            this.$set( this.cartSelectItem,'sales',sales);
                        }
                    }else{
                        if(keycode=='.' && sales.indexOf('.')<0 && sales==""){
                            sales="0";
                        }
                        if(keycode=='.' && sales.indexOf('.')<0 || !isNaN(keycode)){  //如果是点的话 已经包含小数
                            this.$set( this.cartSelectItem,'isSales',true);
                            sales+=keycode+'';
                            console.log( sales);
                            this.$set( this.cartSelectItem,'sales',sales);
                        }

                    }
                }
                else if(this.calcmode=="price") {

					//只要有discountPrice就是改价状态
                    //选中的数量
                    if (!this.cartSelectItem.isDiscount) {

                        var discountPrice="";
                        this.$set( this.cartSelectItem,'isDiscount',true);
                    }else{
                        var discountPrice=this.cartSelectItem.discountPrice;
                        this.$set( this.cartSelectItem,'isDiscount',true)
					}

                    if(keycode=="x"){

                        //close
                        var str=discountPrice+"";
                        discountPrice=str.substring(0,str.length-1);
                        if(discountPrice==""){ //减到0
                            discountPrice="";
                            this.cartSelectItem.discountPrice="";
                            this.$set( this.cartSelectItem,'isDiscount',false)
                        }
                        else{
                            this.$set( this.cartSelectItem,'discountPrice',discountPrice)
                        }

                    }else{
						if(keycode=='.' && discountPrice.indexOf('.')<0 && discountPrice==""){
                            discountPrice="0";
						}
                        if(keycode=='.' && discountPrice.indexOf('.')<0 || !isNaN(keycode)){  //如果是点的话 已经包含小数
                            this.$set( this.cartSelectItem,'isDiscount',true)
                            discountPrice+=keycode+'';
                            console.log( discountPrice);
                            this.$set( this.cartSelectItem,'discountPrice',discountPrice);
						}

                    }
                }

                var pageList=this.$store.state.pageList;
                this.$store.commit('setLocalList',pageList);    //存储本地
            },
			//结账
            checkOrder:function(){

                this.$emit('trigger-build-order');

            }



        }
    }
</script>

