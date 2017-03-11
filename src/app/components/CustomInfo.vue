<!-- info -->
<template>
    <div class="custom-info">
        <div class="custom-table-header">
                <div class="row">
                    <div class="col-xs-5 col-xs-offset-3">
                        <div class="input-group searchCustom">
                            <!--@click="searchItem.text=searchItem.input;"-->
                                <span class="input-group-btn"><button class="btn btn-default" ><span class="glyphicon glyphicon-search" ></span></button>
                                </span>
                            <!--v-model="searchCustom.input" v-on:keyup.enter="searchCustom.text=searchCustom.input;"-->
                            <input type="text" class="form-control" placeholder="搜索顾客">
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <a class="btn add-custom" @click="toRegister"></a>
                        <!--<a class="btn select-ticket btn-lightgreen"  @click="">选择</a>-->

                    </div>
                 </div>
        </div>
        <div class="custom-table-body">
            <div class="info" >
                    <div class="custom-member">
                        <div class="row">
                        <div class="col-xs-12 col-sm-12 clearfix">
                            <!--{{customData.curCustom.sex | sex}}-->
                            <em class="sex-photo" :class="{male:customData.sex=='male',female:customData.sex=='female'}"><img v-show="customData.headPortrait" :src="customData.headPortrait"/></em>
                            <span class="nickname">{{customData.nickname}}</span>

                        </div>
                        </div>
                        <div class="row">
                        <div class="col-xs-12 col-sm-6">手机号<span>{{customData.phone}}</span></div>
                        <div class="col-xs-12 col-sm-6">积分<span>{{customData.point}}</span></div>
                        </div>
                        <div class="row">
                        <div class="col-xs-12 col-sm-6">余额 <span>{{customData.balance}}</span></div>
                        </div>
                    </div>
                    <div class="line"><span class="primary glyphicon glyphicon-tag"></span></div>
                    <div class="custom-ticket">
                        <div class="custom-ticket-header">优惠券</div>
                        <div class="custom-ticket-body">
                        <ul>
                        <li v-for="(index,custom) in [22,11,55,11,22]">
                        <div class="left">
                        <span class="m">300.00</span>
                        <span class="u">满300可用</span>
                        </div>
                        <div class="right">
                        <span style="color: #cccccc">有效期
                        <em class="primary">过期事件</em>
                        </span>
                        <span class="l2">种类</span>
                        <span class="l3 primary">抵用券</span>
                        </div>
                        </li>
                        </ul>
                        </div>
                    </div>
            </div>
        </div>
    </div>

</template>
<style>
    
</style>

<script>

    export default{
        name:"CustomInfo",
        data(){
            return {
                msg:''
            }
        },
        computed: {
            customData () {

                return this.$store.state.customData;
            }
        },
        methods:{
            toRegister(){
               this.$parent.searchShow=false;
               this.$parent.registerShow=true;
            },
            //to
            toCustom(){

                $('#example').modal('show')

            },
            //去登录
            tologin(){


            },
            //去注册
            toregister(customdata){
                 if (customdata){
                     this.$dispatch('register', customdata)
                 }
            }
        }
    }
</script>


