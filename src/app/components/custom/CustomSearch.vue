<!-- normal -->
<template>
    <div class="search">
        <div class="custom-table-header">
            <div class="row">
                <div class="col-xs-5 col-xs-offset-3">
                    <div class="input-group searchCustom">
                            <span class="input-group-btn"><button class="btn btn-default" @click="doSearch()"><span class="glyphicon glyphicon-search" ></span></button>
                            </span>        <input type="text" v-model="searchstr" class="form-control" @keyup.enter="doSearch()" placeholder="搜索顾客">

                    </div>
                </div>
                <div class="col-xs-4">

                        <a v-if="step=='normal' || step=='list'" class="btn add-custom" @click="toAdd()"></a>
                        <a v-if="step=='register' || step=='detail'" class="btn cancel-custom"  @click="toAdd()">取消</a>
                        <a v-if="step=='detail'" class="btn select-ticket btn-lightgreen"   @click="$parent.$parent.chooseThis">选择</a>

                </div>

             </div>
        </div>
    </div>
</template>
<style>

</style>

<script>
   // import CustomInfo from './CustomInfo.vue';
    import CustomList from './CustomList.vue';

    import $ from 'jquery';

    export default{
        name:"CustomSearch",
        props:["custom",'tips','step',"searchCallback",'addCallback'],
        data(){
            return {
                msg:'',
                searchstr:'',
            }
        },
        created(){


        },
        methods:{
            //注册按钮
            toAdd(){
                this.addCallback();
            },
            //搜索
            doSearch(){
                var str=this.searchstr;
                this.searchCallback(str);
            }

        }
    }
</script>


