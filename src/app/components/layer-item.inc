<template id="layer-item-Component">
<div id="layer-item-box" class="item-layer" style="display: none;">
    <!--商品详情	-->
    <div class="item-detail">
        <div class="item-detail-con">
            <div class="price primary">{{itemDetail.appProductDetail.price |currency '¥' 2}}元</div>
            <div class="product">
                <img class="img-responsive  center-block" :src="itemDetail.appProductDetail.image" :alt="itemDetail.appProductDetail.title" :title="itemDetail.appProductDetail.title">
                <p class="name">{{itemDetail.appProductDetail.name}}</p>
                <p class="boon primary">{{itemDetail.appProductDetail.giftType}}</p>
            </div>
            <div class="specs-box">
                <div class="clearfix" v-for="(index,item ) in itemDetail.appSpecifications"  >
                    <p class="span-label">{{item.name}}</p>
                    <a class="btn specs specs-btn"  :class="{selected:itemData.newItem.specs.index==index}"
                       v-for="(index2,item2) in item.appSpecificationValues" v-on:click="switchSpec(item2.id)" >{{item2.name}}</a>
                </div>
            </div>
        </div>
        <div class="item-detail-bom">
             <a class="btn btn-lightgreen btn-block specs-ok"  @click="pushCart(itemDetail.appProductDetail)" >确定</a>
        </div>

    </div>
    <!--商品详情	-->
    <div class="gift-detail" v-show="itemDetail.appProductDetail.giftType!='none'" :data-gift="itemDetail.appProductDetail.giftType">
        <div class="gift-detail-con">
            <div class="price primary">赠 ¥ 0 / <del>100.00</del></div>
            <!-- Swiper -->
            <div class="gift-detail-item">
                    <div class="swiper-wrapper">
                    <div class="swiper-slide" style="background-image:url('../../images/naifen.jpg')"></div>
                    <div class="swiper-slide" style="background-image:url('../../images/jiu.jpg')"></div>
                    <div class="swiper-slide" style="background-image:url('../../images/naifen.jpg')"></div>
                </div>
            </div>
            <div class="gift-detail-tab">
                <a class="btn btn-block gift gift-btn">赠品1</a>
                <a class="btn btn-block gift gift-btn">赠品2</a>
                <a class="btn btn-block gift gift-btn">赠品3</a>
            </div>
            <!-- Add Pagination -->
            <div class="gift-detail-item-pagination"></div>
        </div>
    </div>
</div>
</template>
