<div id="layer-item-box" class="item-layer" style="display: none;">
    <!--商品详情	-->
    <div class="item-detail">
        <div class="item-detail-con">
            <div class="price primary">{{itemData.newItem.price |currency '¥' 2}}元</div>
            <div class="product">
                <img class="img-responsive  center-block" :src="itemData.newItem.imgurl" :alt="itemData.newItem.title" :title="itemData.newItem.title">
                <p class="name">{{itemData.newItem.title}}</p>
                <p class="boon primary">{{itemData.newItem.boon}}</p>
            </div>
            <div class="specs-box">
                <a class="btn specs specs-btn"  :class="{selected:itemData.newItem.specs.index==index}"
                   v-for="(index,specs) in itemData.newItem.specs.list" @click="itemData.newItem.specs.index=index;" >{{specs.label}}</a>
            </div>
            <a class="btn btn-lightgreen btn-block specs-ok"  @click="pushCart" >确定</a>
        </div>

    </div>
    <!--商品详情	-->
    <div class="gift-detail">
        <div class="gift-detail-con">
            <div class="price primary">赠 ¥ 0 / <del>100.00</del></div>
            <!-- Swiper -->
            <div class="gift-detail-item">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" style="background-image:url('../images/naifen.jpg')"></div>
                    <div class="swiper-slide" style="background-image:url('../images/jiu.jpg')"></div>
                    <div class="swiper-slide" style="background-image:url('../images/naifen.jpg')"></div>
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