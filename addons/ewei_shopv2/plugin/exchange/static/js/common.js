define(['core', 'tpl'], function (core, tpl) {
    var modal = {};
    var base = $('#url').val();
    var group = 0;
    modal.init = function (params) {
        modal.style = params.style ? params.style : null;
        modal.initStyle();
        modal.initClick()
    };
    modal.initStyle = function () {
        if (modal.style) {
            modal.style.exbtntext = modal.style.exbtntext ? modal.style.exbtntext : '兑换';
            modal.style.exbtn2text = modal.style.exbtn2text ? modal.style.exbtn2text : '已兑换'
        }
    };
    modal.initClick = function () {
        $("#exchange").unbind('click').click(function () {
            group = 0;
            $('.goods').hide();
            $('.balance').hide();
            $('.score').hide();
            $('.red').hide();
            $('.coupon').hide();
            $("#goods").removeClass('disabled');
            $("#goods").text(modal.style.exbtntext);
            $("#balance").removeClass('disabled');
            $("#balance").text(modal.style.exbtntext);
            $("#red").removeClass('disabled');
            $("#red").text(modal.style.exbtntext);
            $("#score").removeClass('disabled');
            $("#score").text(modal.style.exbtntext);
            $("#coupon").removeClass('disabled');
            $("#coupon").text(modal.style.exbtntext);
            var exchangeno = $.trim($("#exchangeno").val());
            if (!exchangeno || exchangeno == '') {
                FoxUI.toast.show("请输入兑换码");
                return
            } else {
                var url = $('#url').val() + "&key=" + exchangeno;
                $.ajax({
                    url: url, success: function (data) {
                        var obj = JSON.parse(data);
                        if (obj.status == '0') {
                            modal.message(0, obj.result.message);
                            return
                        } else if (obj.status == '1' || obj.status == '2' || obj.status == '3' || obj.status == '4' || obj.status == '5' || obj.status == '6') {
                            FoxUI.loader.show("mini");
                            setTimeout(function () {
                                $("#exchange").hide();
                                if (Number(obj.status) == 1) {
                                    $.ajax({
                                        url: base + ".groupexchange&key=" + exchangeno, success: function (json) {
                                            var arr = JSON.parse(json);
                                            $("#num").text(arr.result.count);
                                            $(".block-exchange .title .num").show();
                                            if (arr.result.goods.type == '1') {
                                                $(".goods .t2").text('可兑换' + arr.result.goods.max + '件商品')
                                            } else {
                                                $(".goods .t2").text('可兑换价值' + arr.result.goods.val + '元的商品')
                                            }
                                        }
                                    });
                                    $(".goods").show()
                                }
                                if (Number(obj.status) == 2) {
                                    $.ajax({
                                        url: base + ".groupexchange&key=" + exchangeno, success: function (json) {
                                            var arr = JSON.parse(json);
                                            $("#num").text(arr.result.count);
                                            $(".block-exchange .title .num").show();
                                            if (arr.result.balance.type == '1') {
                                                $(".balance .t2").text('面值' + arr.result.balance.val + '元')
                                            } else {
                                                $(".balance .t2").text('随机获得' + arr.result.balance.rand + '元')
                                            }
                                        }
                                    });
                                    $(".balance").show()
                                }
                                if (Number(obj.status) == 3) {
                                    $(".red").show();
                                    $.ajax({
                                        url: base + ".groupexchange&key=" + exchangeno,
                                        type: 'POST',
                                        success: function (json) {
                                            var arr = JSON.parse(json);
                                            $("#num").text(arr.result.count);
                                            $(".block-exchange .title .num").show();
                                            if (arr.result.red.type == '1') {
                                                $(".red .t2").text('面值' + arr.result.red.val + '元微信红包')
                                            } else {
                                                $(".red .t2").text('随机获得' + arr.result.red.rand + '元红包')
                                            }
                                        }
                                    })
                                }
                                if (Number(obj.status) == 4) {
                                    $(".score").show();
                                    $.ajax({
                                        url: base + ".groupexchange&key=" + exchangeno, success: function (json) {
                                            var arr = JSON.parse(json);
                                            $("#num").text(arr.result.count);
                                            $(".block-exchange .title .num").show();
                                            if (arr.result.score.type == '1') {
                                                $(".score .t2").text('面值' + arr.result.score.val + '积分')
                                            } else {
                                                $(".score .t2").text('随机获得' + arr.result.score.rand + '积分')
                                            }
                                        }
                                    })
                                }
                                if (Number(obj.status) == 5) {
                                    $(".coupon").show();
                                    $.ajax({
                                        url: base + ".groupexchange&key=" + exchangeno, success: function (json) {
                                            var arr = JSON.parse(json);
                                            $("#num").text(arr.result.count);
                                            $(".block-exchange .title .num").show();
                                            if (arr.result.coupon.type == '1') {
                                                $(".coupon .t2").text('获得全部优惠券')
                                            } else {
                                                $(".coupon .t2").text('获得一张优惠券')
                                            }
                                        }
                                    })
                                }
                                if (Number(obj.status) == 6) {
                                    group = 1;
                                    $.ajax({
                                        url: core.getUrl('exchange.groupexchange',{'key':exchangeno},1),
                                        success: function (json) {
                                            var arr = JSON.parse(json);
                                            $("#num").text(arr.result.count);
                                            $(".block-exchange .title .num").show();
                                            if (Number(arr.status) == 1) {
                                                if (arr.result.goods.has == '1') {
                                                    if (arr.result.goods.type == '1') {
                                                        $(".goods .t2").text('可兑换' + arr.result.goods.max + '件商品')
                                                    } else {
                                                        $(".goods .t2").text('可兑换价值' + arr.result.goods.val + '元的商品')
                                                    }
                                                    if (arr.result.goods.sta == '0') {
                                                        $("#goods").addClass('disabled');
                                                        $("#goods").text(modal.style.exbtn2text)
                                                    }
                                                    $(".goods").show()
                                                }
                                                if (arr.result.balance.has == '1') {
                                                    if (arr.result.balance.type == '1') {
                                                        $(".balance .t2").text('面值' + arr.result.balance.val + '元')
                                                    } else {
                                                        $(".balance .t2").text('随机获得' + arr.result.balance.rand + '元')
                                                    }
                                                    if (arr.result.balance.sta == '0') {
                                                        $("#balance").addClass('disabled');
                                                        $("#balance").text(modal.style.exbtn2text)
                                                    }
                                                    $(".balance").show()
                                                }
                                                if (arr.result.red.has == '1') {
                                                    if (arr.result.red.type == '1') {
                                                        $(".red .t2").text('面值' + arr.result.red.val + '元微信红包')
                                                    } else {
                                                        $(".red .t2").text('随机获得' + arr.result.red.rand + '元红包')
                                                    }
                                                    if (arr.result.red.sta == '0') {
                                                        $("#red").addClass('disabled');
                                                        $("#red").text(modal.style.exbtn2text)
                                                    }
                                                    $(".red").show()
                                                }
                                                if (arr.result.score.has == '1') {
                                                    if (arr.result.score.type == '1') {
                                                        $(".score .t2").text('面值' + arr.result.score.val + '积分')
                                                    } else {
                                                        $(".score .t2").text('随机获得' + arr.result.score.rand + '积分')
                                                    }
                                                    if (arr.result.score.sta == '0') {
                                                        $("#score").addClass('disabled');
                                                        $("#score").text(modal.style.exbtn2text)
                                                    }
                                                    $(".score").show()
                                                }
                                                if (arr.result.coupon.has == '1') {
                                                    if (arr.result.coupon.type == '1') {
                                                        $(".coupon .t2").text('获得全部优惠券')
                                                    } else {
                                                        $(".coupon .t2").text('获得一张优惠券')
                                                    }
                                                    if (arr.result.coupon.sta == '0') {
                                                        $("#coupon").addClass('disabled');
                                                        $("#coupon").text(modal.style.exbtn2text)
                                                    }
                                                    $(".coupon").show()
                                                }
                                            } else {
                                                return
                                            }
                                        },
                                    })
                                }
                                $(".block-exchange .list").show();
                                $(".block-exchange .input").hide();
                                $(".block-exchange #reset").show();
                                $(".block-exchange .title .text").hide();
                                $(".block-exchange .title .text2").text("兑换码: " + exchangeno).show();
                                FoxUI.loader.hide()
                            }, 500)
                        }
                    },
                })
            }
        });
        $("#reset").unbind('click').click(function () {
            FoxUI.loader.show("mini");
            setTimeout(function () {
                $("#reset").hide();
                $(".block-exchange .list").hide();
                $(".block-exchange .input").show();
                $(".block-exchange #exchange").show();
                $(".block-exchange .title .text").text("兑换码兑换").show();
                $(".block-exchange .title .text2").hide();
                $(".block-exchange .title .num").hide();
                FoxUI.loader.hide()
            }, 200)
        });
        $("#balance").unbind('click').click(function () {
            if (group === 1) {
                // var aurl = base + ".group&exchange=1"
                var aurl = core.getUrl('exchange/group',{'exchange':1},1);
            } else {
                // var aurl = base + ".balance&exchange=1"
                var aurl = core.getUrl('exchange/balance',{'exchange':1},1);
            }
            $.ajax({
                url: aurl, type: 'POST', success: function (data) {
                    var json = JSON.parse(data);
                    if (json.status == '1') {
                        modal.message(1, json.result.message);
                        $("#balance").addClass('disabled');
                        $("#balance").text(modal.style.exbtn2text)
                    } else if (json.status == '0') {
                        modal.message(0, json.result.message)
                    }
                }, error: function () {
                    modal.message(0, '很遗憾，兑换失败了！')
                }
            })
        });
        $("#score").unbind('click').click(function () {
            if (group === 1) {
                // var aurl = base + ".group&exchange=3";
                var aurl = core.getUrl('exchange.group',{'exchange':3},1);
            } else {
                // var aurl = base + ".score&exchange=1"
                var aurl = core.getUrl('exchange.score',{'exchange':1},1);
            }
            $.ajax({
                url: aurl, success: function (data) {
                    var json = JSON.parse(data);
                    if (json.status == '1') {
                        modal.message(1, json.result.message);
                        $("#score").addClass('disabled');
                        $("#score").text(modal.style.exbtn2text)
                    } else if (json.status == '0') {
                        modal.message(0, json.result.message)
                    }
                }, error: function () {
                    modal.message(0, '很遗憾，兑换失败了！')
                }
            })
        });
        $("#red").unbind('click').click(function () {
            if (group === 1) {
                // var aurl = base + ".group&exchange=2"
                var aurl = core.getUrl('exchange.group',{'exchange':2},1);

            } else {
                // var aurl = base + ".redpacket&exchange=1"
                var aurl = core.getUrl('exchange.redpacket',{'exchange':1},1);

            }
            $.ajax({
                url: aurl, type: 'POST', success: function (data) {
                    var json = JSON.parse(data);
                    if (json.status == '1') {
                        modal.message(1, json.result.message);
                        $("#red").addClass('disabled');
                        $("#red").text(modal.style.exbtn2text)
                    } else if (json.status == '0') {
                        modal.message(0, json.result.message)
                    }
                }, error: function () {
                    modal.message(0, '很遗憾，兑换失败了！')
                }
            })
        });
        $("#coupon").unbind('click').click(function () {
            if (group === 1) {
                // var aurl = base + ".group&exchange=4"
                var aurl = core.getUrl('exchange.group',{'exchange':4},1);
            } else {
                // var aurl = base + ".coupon&exchange=1"
                var aurl = core.getUrl('exchange.coupon',{'exchange':1},1);
            }
            $.ajax({
                url: aurl, success: function (data) {
                    var json = JSON.parse(data);
                    if (json.status == '1') {
                        modal.message(1, json.result.message);
                        $("#coupon").addClass('disabled');
                        $("#coupon").text(modal.style.exbtn2text)
                    } else if (json.status == '0') {
                        modal.message(0, json.result.message)
                    }
                }, error: function () {
                    modal.message(0, '很遗憾，兑换失败了！')
                }
            })
        });
        $("#goods").unbind('click').click(function () {
            if (group === 1) {
                // var aurl = base + ".group&exchange=5&ajax=1"
                var aurl = core.getUrl('exchange.group',{'exchange':5,'ajax':1},1);
            } else {
                // var aurl = base + ".goods&exchange=1"
                var aurl = core.getUrl('exchange.goods',{'exchange':1},1);
            }
            $.ajax({
                url: aurl, success: function (data) {
                    var json = JSON.parse(data);
                    if (json.status == '1') {
                        FoxUI.loader.show("mini");
                        if (group === 1) {
                            $.router.load(base + ".group&exchange=5", true)
                        } else {
                            $.router.load(base + ".goods", true)
                        }
                        $("#coupon").addClass('disabled');
                        $("#coupon").text(modal.style.exbtn2text)
                    } else if (json.status == '0') {
                        modal.message(0, json.result.message)
                    }
                }, error: function () {
                    modal.message(0, '很遗憾，兑换失败了！')
                }
            })
        })
    };
    modal.message = function (type, message) {
        type == 1 ? $("#status1").html(message) : $("#status0").html(message);
        var html = type == 1 ? $(".alert-success-outer").html() : $(".alert-error-outer").html();
        container = new FoxUIModal({
            content: html, extraClass: "popup-modal", maskClick: function () {
                container.close()
            }
        });
        container.show();
        $('.alert-success').find('.btn').unbind('click').click(function () {
            container.close()
        });
        $('.alert-error').find('.btn').unbind('click').click(function () {
            container.close()
        })
    };
    return modal
});