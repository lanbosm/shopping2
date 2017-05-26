<!-- normal -->
<template>
    <div class="normal">
        <div class="custom-table-body" >
                <transition name="fade">
                    <p class="text-center bg-warning" v-if="$parent.searching" >{{tips}}</p>
                </transition>
        </div>
    </div>
</template>
<style>
    
</style>

<script>
    import $ from 'jquery';

    export default{
        name:"CustomNormal",
        data(){
            return {
                msg:''
            }
        },
        components:{
            //CustomInfo,                                //顾客信息
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


