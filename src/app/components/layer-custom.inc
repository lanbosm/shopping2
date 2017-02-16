<template id="layer-custom-Component">
    <div role="dialog" class="modal fade custom-layer" id="custom-layer">
        <div class="modal-dialog ">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">顾客</h4>
                    <a class="close" data-dismiss="modal">&times;</span></a>
                </div>
                <div class="modal-body">
                    <div class="custom-table-header">
                        <div class="row">
                            <div class="col-xs-5 col-xs-offset-3">
                                <div class="input-group searchCustom">
										       					<span class="input-group-btn">
														        <button class="btn btn-default" ><span class="glyphicon glyphicon-search" @click="searchItem.text=searchItem.input;"></span></button>
														        </span>
                                    <input type="text" class="form-control" v-model="searchCustom.input" v-on:keyup.enter="searchCustom.text=searchCustom.input;" placeholder="搜索顾客">
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <a class="btn add-custom" v-show="customModal.status=='normal'|| customModal.status=='info'" @click="customModal.status='register';"></a>
                                <a class="btn cancel-custom" v-show="customModal.status=='register'" @click="customModal.status=customModal.history">取消</a>
                                <a class="btn select-ticket btn-lightgreen" v-show="customModal.status=='info'" @click="">选择</a>
                            </div>
                        </div>
                    </div>
                    <div class="custom-table-body">
                        <!-- normal -->
                        <template v-if="customModal.status=='normal'">
                            <div class="normal">
                                <p class="text-center bg-success" v-show="customModal.code==301" >搜索中...</p>
                                <p class="text-center bg-success" v-show="customModal.code==404" >没有找到此会员</p>
                            </div>
                        </template>
                        <!-- registration -->
                        <template v-if="customModal.status=='register'">
                            <div class="registration">
                                <div class="row">
                                    <div class="col-xs-8 col-xs-offset-2">
                                        <div class="custom-sex clearfix text-center">
                                            <div class="man-radio radio">
                                                <input type="radio"  name="sex" value="男" id="custom-man" checked="checked" v-model="customData.newCustom.sex"/>
                                                <label for="custom-man"></label>
                                            </div>
                                            <div class="women-radio radio">
                                                <input type="radio" name="sex" id="custom-women" v-model="customData.newCustom.sex" value="女">
                                                <label for="custom-women"></label>
                                            </div>
                                        </div>
                                        <div class="input-group custom-name custom-group">
                                            <span class="input-group-addon "><i class="iconfont icon-peoplefill"></i></span>
                                            <input type="text" class="form-control" placeholder="姓名"  v-model="customData.newCustom.name">
                                        </div>
                                        <div class="input-group custom-phone custom-group">
                                            <span class="input-group-addon"><i class="iconfont icon-mobilefill"></i></span>
                                            <input type="num" class="form-control" placeholder="手机号" maxlength="13" v-model="customData.newCustom.phone">
                                        </div>
                                        <a class="btn btn-lightgreen btn-block" @click="save(customData)">保存</a>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <!-- custominfo -->
                        <template v-if="customModal.status=='info'">
                            <div class="info" >
                                <div class="custom-info">
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-12 clearfix">
                                            <em class="sex-photo {{customData.curCustom.sex | sex}} "></em><span class="nickname">{{customData.curCustom.name}}</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6">手机号<span>{{customData.curCustom.phone}}</span></div>
                                        <div class="col-xs-12 col-sm-6">积分<span>{{customData.curCustom.points}}</span></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xs-12 col-sm-6">余额 <span>{{customData.curCustom.monney}}</span></div>
                                    </div>
                                </div>
                                <div class="line"><span class="primary glyphicon glyphicon-tag">
								       					</span></div>
                                <div class="custom-ticket">
                                    <div class="custom-ticket-header">优惠券</div>
                                    <div class="custom-ticket-body">
                                        <ul>
                                            <li v-for="(index,custom) in customData.curCustom.tickets">
                                                <div class="left">
                                                    <span class="m">{{custom.price}}</span>
                                                    <span class="u">{{custom.condition}}</span>
                                                </div>
                                                <div class="right">
                                                    <span style="color: #cccccc">有效期
                                                        <em class="primary">{{custom.expired}}</em>
                                                    </span>
                                                    <span class="l2">{{custom.category}}</span>
                                                    <span class="l3 primary">抵用券</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>