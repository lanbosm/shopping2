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
                    <a v-if="$parent.searchShow" class="btn add-custom" @click="$parent.registerView"></a>
                    <a v-else class="btn cancel-custom" @click="$parent.registerView">取消</a>
                    <a class="btn select-ticket btn-lightgreen" v-show="$parent.searchShow && custom && custom.appMember && custom.appMember.id" @click="$parent.chooseThis">选择</a>
                </div>
             </div>
        </div>
        <div class="custom-table-body" v-show="$parent.searchShow">
            <div class="normal" v-if="!infoShow">
            </div>
            <custom-info v-else :member="custom.appMember"></custom-info>
        </div>
    </div>
</template>
<style>
    
</style>

<script>
    import CustomInfo from 'components/CustomInfo.vue';
    import $ from 'jquery';

    export default{
        name:"CustomSearch",
        data(){
            return {
                msg:''
            }
        },
        components:{
            CustomInfo                                //顾客信息
        },
        computed: {
//            classStatus () {
//                return this.$parent.searchShow === true ? "" : 'cancel-custom';
//            }
        },
        props:["custom", "infoShow"],
        methods:{
        }
    }
</script>


