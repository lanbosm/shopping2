<template>
    <div id="layer-cash-box" class="layer-cash">
        <!--商品详情	-->
        <div class="item-detail">
            备用金
        </div>
    </div>
</template>

<style  rel="stylesheet/less"  lang="less">
    @import "../../../css/util/skin.less";

    /*!item modale*/
    .layer-cash {
        width: auto;
        display: none;
        overflow: hidden;
        .item-detail {
            width: 640px;
            height: 360px;
            padding: 15px;
            position: relative;

        }
    }
    .norow{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}

</style>




<script>
    import {request, API_URLS, HOST} from 'util/request.js';
    import util from 'util/util.js';



    export default{
        name:"CashModal",
        computed: {


        },
        data(){
            return {
                stockQuantity:0,
                shopRepository:{},
                shopRepositoryList:null

            }

        },
        filters: {
            currency: function (value) {
                if (!value) return '';
                return '¥ ' + value;
            }
        },
        created(){
           
        },
        methods:{





        }
    }
</script>
