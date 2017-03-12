<!-- normal -->
<template>
    <div class="custom-search">
        <div class="custom-table-header">
                <div class="row">
                    <div class="col-xs-5 col-xs-offset-3">
                        <div class="input-group searchCustom">
                                <span class="input-group-btn"><button class="btn btn-default" ><span class="glyphicon glyphicon-search" ></span></button>
                                </span>
                            <input type="text" class="form-control" placeholder="搜索顾客">
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <a class="btn add-custom" @click="toRegister"></a>
                    </div>
                 </div>
        </div>
        <div class="custom-table-body">
               <div class="normal">
                    <!--<p class="text-center bg-success" v-show="true" >搜索中...</p>-->
                    <!--<p class="text-center bg-success" v-show="false" >没有找到此会员</p>-->
              </div>
        </div>
    </div>

</template>
<style>
    
</style>

<script>

    export default{
        name:"CustomSearch",
        data(){
            return {
                msg:''
            }
        },
        Components(){

        },
        props: {                                       //定义参数类型
             customModal: {                             //会员弹层
                 type: Object
             },
             customData: {
                 type: Object
             }
        },
        methods:{
            toRegister(){
               this.$parent.searchShow=false;
               this.$parent.registerShow=true;
               this.$parent.infoShow=false;
            }
        }
    }
</script>


