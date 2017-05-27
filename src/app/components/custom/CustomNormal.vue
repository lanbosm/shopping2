<!-- normal -->
<template>
    <div class="normal">
        <div class="custom-table-body" >
                <transition name="fade">
                    <p class="text-center bg-warning" v-if="searching" >{{tips}}</p>
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
        props:['tips','searching'],
        methods:{
        }
    }
</script>


