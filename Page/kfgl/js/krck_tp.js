var colorList = {
    color0: "rgb(9,127,208)",
    color1: "rgb(255,184,0)",
    color2: "rgb(72,144,64)",
    color3: "rgb(239,201,200)",
    //	color4: "rgb(255, 9, 0)"
};
var gdArry = [];
var dataList = "",
    positionId = "",
    moseData = "",
    loading, laytpl;
var type = window.location.href.getQuery("type");
$(function() {
    layui.use(["form", "element", "laytpl", "colorpicker"], function() {
        var form = layui.form,
            element = layui.element;
        laytpl = layui.laytpl;
        colorpicker = layui.colorpicker;
        loading = layer.load(); //换了种风格
        //获取颜色
        for (let i = 0; i < 4; i++) {
            var defaultColor = i;
            colorpicker.render({
                elem: '#color' + i,
                color: colorList["color" + i],
                format: 'rgb', //默认为 hex
                done: function(color) {
                    var key = this.elem.replace(/\#/, "");
                    colorList[key] = color;

                    showTpl(laytpl, dataList)
                }
            });
        }
        initData()
        $("#inspect").click(function() {
            initData()
        })

        if (!limitConfig("applyLimt", 2)) {
            $("#sure").addClass("layui-hide")
            $("#inspect").addClass("layui-hide")
        }
        //重新设置
        $('#sure').click(function() {
            if ($("#columnNum").val() > dataList.data.length) {
                layer.msg("每行柜架数超出柜架总数！");
                return
            }
            dataList.aisle = $("#aisle").val();
            dataList.columnNum = $("#columnNum").val();
            postData("wwModifyDataById", {
                TblNum: "162",
                XDLMID: positionId,
                XDLM过道位置: $("#aisle").val(),
                XDLM每行柜架数: $("#columnNum").val()
            }, function(data) {
                if (data.msg || data.success) {
                    showTpl(laytpl, dataList)
                }
            })

        });

        $(document).on("click", ".store-level", function(event) {

            if ($(this).attr("CNTR_no")) {
                var dataListObj = dataList.data;
                var CNTR_no_ = $(this).attr("CNTR_no"),
                    Level_no_ = $(this).attr("Level_no"),
                    area_no_ = $(this).attr("area_no");
                moseData = $(this).attr("CNTR_no");
                if (type == "operate") {
                    parent.$("select[name='XDLM柜架号']").val(dataListObj[CNTR_no_]['柜架号'])
                    parent.$("select[name='XDLM层号']").val(dataListObj[CNTR_no_]['分层集合'][Level_no_]['层号'])
                        //					parent.$("select[name='XDLM分区号']").val(dataListObj[CNTR_no_]['分层集合'][Level_no_]['分区集合'][area_no_]['分区号'])
                    parent.form.render('select')
                    QXALL()
                } else {

                    var goodsList = dataListObj[CNTR_no_]['分层集合'][Level_no_]
                    store.set("tpTuTongDeatil", goodsList)
                    layerPage01 = openWindow(2, './tuTongDetail.html', "详情", $(window).width(), $(window).height())
                }
            }
        })

        $("#closeBtn").click(function() {
            $("#relicPosition").addClass("layui-hide")
        })
    })
})

function initData() {
    getStore(function(dataposition) {
        $("#aisle").val(dataposition.data[0]['过道位置']);
        $("#columnNum").val(dataposition.data[0]['每行柜架数']);
        positionId = dataposition.data[0].id;
        postData("GetStorageInfo", {
            mCurrentStorage: getCookieName("mCurrentStorage")
        }, function(data) {
            if (data.success) {
                for (var i = 0; i < data.data.length; i++) {
                    data.data[i]['分层集合'].reverse()
                }
                dataList = data; //数据赋值，点击颜色需要
                dataList.aisle = $("#aisle").val();
                dataList.columnNum = $("#columnNum").val();
                showTpl(laytpl, data)
            } else {
                layer.close(loading)
            }
        })

    }, {
        TblNum: 162,
        T1622: "EQ" + getCookieName("mCurrentStorage")
    });
}

function goodListDetail(data) { //查看物品详情
    layerPage01 = openWindow(2, '../../knww/page/carrierDetail.html?knbh=' + data, "详情", $(window).width(), $(window).height())
        //	layerPage01 = openWindow(2, '../../knww/page/wwjcxx.html?knbh=' +data, "详细信息", $(window).width(), $(window).height());

}

function setWidth(d) { //添加过道
    //	1)获取过道的位置
    var width;
    var padding_;
    if (d.columnNum) {
        width = (95 / d.columnNum) + "%";
        //宽度越大，padding越大
        if ((95 / d.columnNum) / 10 < 3) {
            padding_ = (95 / d.columnNum) / 10
        } else {
            padding_ = (95 / d.columnNum) / 10 * 2
        }
    } else {
        width = "400px";
        padding_ = "7"
    }
    return "width:" + width + ";padding-left:" + padding_ + "%;padding-right:" + padding_ + "%"
}

function setGuoDao(d, index) {
    //1)确定过道的位置，位置+一行的柜架数*第几行	
    var flag = false;
    var rows = Math.ceil(d.data.length / d.columnNum);
    var gdPosition = d.aisle * 1 + index * d.columnNum - 1;

    if (gdPosition < d.data.length + 1) {
        gdArry.push(gdPosition)
    }
    if (gdArry.indexOf(index) != -1) {
        flag = true
    } else {
        flag = false
    }

    return flag;
}

function showTpl(laytpl, data) {
    $("#view").empty()
    gdArry = []
    var getTpl = tpldemo.innerHTML
    laytpl(getTpl).render(data, function(html) {
        $("#view").append(html)
        layer.close(loading);
        if (data.data.length == 0) {
            layer.msg('当前库房暂无数据！');
        }
    });
}

function setKrColor(d) {
    var color = ""

    if (d['现容量'] == "0") {
        color = colorList.color0
    } else if ((d['现容量'] / d['最大容量']) < 0.5) {
        color = colorList.color1
    } else if ((d['现容量'] / d['最大容量']) > 0.7) {
        color = colorList.color2
    } else {
        color = colorList.color3
    }

    return color
}