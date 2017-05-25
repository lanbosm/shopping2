<!-- normal -->
<template>
    <div class="custom-search">
        <div class="custom-table-header">
            <div class="row">
                <div class="col-xs-5 col-xs-offset-3">
                    <div class="input-group searchCustom">
                            <span class="input-group-btn"><button class="btn btn-default" @click="$parent.doSearch" ><span class="glyphicon glyphicon-search" ></span></button>
                            </span>
                        <input type="text" v-model="$parent.username" class="form-control" @keyup.enter="$parent.doSearch" placeholder="搜索顾客">
                    </div>
                </div>
                <div class="col-xs-4">
                    <a v-if="searchShow" class="btn add-custom" @click="$parent.registerView"></a>
                    <a v-else class="btn cancel-custom" @click="$parent.cancelView">取消</a>
                    <a class="btn select-ticket btn-lightgreen" v-show="infoShow && custom && custom.appMember && custom.appMember.id" @click="$parent.chooseThis">选择</a>
                </div>
             </div>
        </div>
        <div class="custom-table-body" v-if="searchShow">
            <div class="normal" >
                <transition name="fade">
                    <p class="text-center bg-warning" v-if="$parent.searching" >{{tips}}</p>
                </transition>
            </div>
        </div>
        <div class="custom-table-body" v-if="infoShow">
             <!--<custom-info  :member="custom.appMember"></custom-info>-->
                <custom-list  :member="custom.appMember"></custom-list>
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
        data(){
            return {
                msg:''
            }
        },
        components:{
            //CustomInfo,                                //顾客信息
            CustomList                                //顾客列表
        },
        computed: {
//            classStatus () {
//                return this.$parent.searchShow === true ? "" : 'cancel-custom';
//            }
        },
        created(){


        },
        props:["custom", "infoShow","searchShow",'tips'],
        methods:{
        }
    }
</script>


