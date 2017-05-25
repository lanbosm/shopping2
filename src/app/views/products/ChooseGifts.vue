<template>
    <div id="layer-choose" class="layer-choose">
        <div class="t text-center">
            查看赠品
        </div>
        <div class="choose-btn-all">
            <a class="choose-btn choose-btn_gray choose-btn_green">
                <span>+10</span>
            </a>
            <a class="choose-btn choose-btn_gray">
                <span>+20</span>
            </a>
            <a class="choose-btn choose-btn_gray">
                <span>+50</span>
            </a>
            <a class="choose-btn choose-btn_gray">
                <span>+100</span>
            </a>
            <a class="choose-btn choose-btn_gray">
                <span>+200</span>
            </a>
        </div>
        <div class="choose-box">
             <div class="col-xs-3">
                  <div class="item">
                       <div class="choose-item"></div>
                       <div class="choose-tt">完达山优瑞佳幼儿配方</div>
                  </div>
             </div>
        </div>
        <!--<div class="confirm_btn">确认换购</div>-->
    </div>
</template>

<style rel="stylesheet/less"  lang="less">
    @import "../../../less/util/skin.less";
    @import "../../../less/util/mixin.less";
      .layer-choose{
          width: 800px;height: 500px;overflow: hidden;padding:@gutter;color:#666;
          .t{line-height: 30px;font-size: 25px;}
      };
    .choose-btn-all{margin-top: 35px;padding-left: 12px;}
    .choose-btn{padding: 10px 30px;border-radius: 5px;text-decoration: none !important;margin-right: 25px;font-size: 18px;}
    .choose-btn_gray{background-color: #e8e9f1;color: #666;}
    .choose-btn_green{background-color: #6ec89b;color: #fff;}

    .choose-box{width: 100%;height: 320px;overflow: hidden;overflow-y:auto;-webkit-overflow-scrolling: touch;margin-top: 20px;}
    .choose-item{width: 100%; height: 120px; background: #fff;top: 0; border-radius: 5px;}
    .choose-box .item{height: auto;
        position: relative;
        margin-top: 12px;
        border: solid 1px #e5e5e5;
        border-radius: 3px;
        background-size: 100%;
        padding-bottom: 10px;}
    .choose-tt{font-size: 14px;padding-top: 10px;color: #666;padding-left: 10px;}
    .confirm_btn{width: 150px;height: 45px;line-height: 45px;text-align: center;font-size: 18px;color: #fff;background-color: #4cae4c;border-radius: 5px;margin: 0 auto}
</style>