//加载中的效果组件

<template>
    <div class="apploading">
        <div class="apploadEffect">
            <div class="loading-circle">
                <div class="outer"></div>
            </div>
            <!--<div class="inner">-->
                <!--<div class="spiner"></div>-->
                <!--<div class="filler"></div>-->
                <!--<div class="masker"></div>-->
            <!--</div>-->
            <!--<div class="inner2">-->
                <!--<div class="spiner"></div>-->
                <!--<div class="filler"></div>-->
                <!--<div class="masker"></div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
export default {
  name: 'AppCenterLoading',
}
</script>

<style scoped>
    .apploading{width: 100%; height: 100%; position: fixed;
        top:0; background: none;z-index:9999;}
    .apploadEffect { width:100px; height: 100px;  position: fixed; padding: 18px;
        top:50%; left: 50%; margin-left: -35px; margin-top:-35px; background: #ffffff; border-radius: 5px; }
    .loading-circle{width: 100%; height: 100%; position: relative}
    .outer { position: absolute; width: 100%; height: 100%; background: url('/images/icon-spin-s.png') no-repeat; animation: spin 800ms infinite linear; }
    .inner, .inner2 { position: absolute; width: 38px; height: 38px; border-radius: 40px; overflow: hidden; left: 13px; top: 13px; }
    .inner { opacity: 1; background-color: #89abdd; animation: second-half-hide 1.6s steps(1, end) infinite; }
    .inner2 { opacity: 0; background-color: #4b86db; animation: second-half-show 1.6s steps(1, end) infinite; }
    .spiner, .filler, .masker { position: absolute; width: 50%; height: 100%; }
    .spiner { border-radius: 40px 0 0 40px; background-color: #4b86db; transform-origin: right center; animation: spin 800ms infinite linear; left: 0; top: 0; }
    .filler { border-radius: 0 40px 40px 0; background-color: #4b86db; animation: second-half-hide 800ms steps(1, end) infinite; left: 50%; top: 0; opacity: 1; }
    .masker { border-radius: 40px 0 0 40px; background-color: #89abdd; animation: second-half-show 800ms steps(1, end) infinite; left: 0; top: 0; opacity: 0; }

    .inner2 .spiner, .inner2 .filler { background-color: #89abdd; }
    .inner2 .masker { background-color: #4b86db; }

    @keyframes spin {
        0%   { transform: rotate(360deg); }
        100% { transform: rotate(0deg); }
    }
    @keyframes second-half-hide {
        0%        { opacity: 1; }
        50%, 100% { opacity: 0; }
    }
    @keyframes second-half-show {
        0%        { opacity: 0; }
        50%, 100% { opacity: 1; }
    }
</style>
