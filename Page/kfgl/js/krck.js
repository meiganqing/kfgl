var colorList = {
    color0: "rgb(9, 208, 62)",
    color1: "rgb(255,184,0)",
    color2: "rgb(72,144,64)",
    color3: "rgb(239,201,200)",
    color4: "rgb(255, 9, 0)"
}, loading;
var gdArry = [];
var dataList = "",
    positionId = "",
    moseData = "";
var type = window.location.href.getQuery("type");

layui.use(["form", "element", "laytpl", "colorpicker"], function () {
    var form = layui.form,
        element = layui.element,
        laytpl = layui.laytpl,
        colorpicker = layui.colorpicker;

    loading = layer.load(); //换了种风格
    // 权限设置
    qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("库容查看");
    //

    if (!qx[0].Limit.isBJ) {
        $("#sure").addClass("layui-hide")
        $("#inspect").addClass("layui-hide")
    }

    //获取颜色
    for (let i = 0; i < 5; i++) {
        var defaultColor = i;
        colorpicker.render({
            elem: '#color' + i,
            color: colorList["color" + i],
            format: 'rgb', //默认为 hex
            done: function (color) {
                var key = this.elem.replace(/\#/, "");
                colorList[key] = color;
                showTpl(laytpl, dataList)//
            }
        });
    }

    //获取当前库房信息
    var This_kf = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: '1001',
        XDLMSID: 'DYBH201908231246284628130151',
        XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
    });
    if (This_kf.success == true) {
        console.log(This_kf)
        let data = This_kf.rows
        $("#aisle").val(data[0].过道位置);//过道位置
        $("#columnNum").val(data[0].每行柜架数);//每行过架数

        dataList.aisle = $("#aisle").val();
        dataList.columnNum = $("#columnNum").val();
        positionId = data[0].id;//库房的id

    }

    //库房容量
    initData(laytpl)
    //

    //库容检查
    $("#inspect").click(function () {

        var redata_krjc = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "9000",
            XDLMTID: "9204",
            XDLMSID: "9204012",
            mCurrentStorage: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
        });
        if (redata_krjc.success == true) {

            layer.msg(redata_krjc.message, {
                icon: 1,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            }, function () {

                initData(laytpl)

            });

        } else {
            layer.msg(redata_krjc.message)
        }



    })

    //重新设置  确定按钮
    $('#sure').click(function () {
        if ($("#columnNum").val() > dataList.data.length) {
            layer.msg("每行柜架数超出柜架总数！");
            return
        }
        dataList.aisle = $("#aisle").val();
        dataList.columnNum = $("#columnNum").val();

        // 重新设置过道位置和数
        var new_kf = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {

            XDLMCID: '6000',
            XDLMSID: 'DYBH201908231246284628143155',
            XDLMID: positionId,
            XDLM过道位置: $("#aisle").val(),
            XDLM每行柜架数: $("#columnNum").val()
        });
        if (new_kf.success == true) {
            $("#view").html("")
            console.log(dataList)
            showTpl(laytpl, dataList)

        }



    });


    //柜层跳转
    $(document).on("click", ".store-fix-a", function () {

        //获取柜架号，层号，区号
        console.log($(this).attr("title"))
        let onlyhao=$(this).attr("title")
        let gui=onlyhao.split("-")[0]//柜号
        let cen=onlyhao.split("-")[1]//层号
        let quhao=onlyhao.split("-")[2]//区号
    

        if(type){
       
            //关闭当前页面
            parent.$("select[name='XDLM柜架号']").val(gui)
			parent.$("select[name='XDLM层号']").val(cen)
           parent.$("select[name='XDLM分区号']").val(quhao)

            parent.form.render('select')
            var index = parent.layer.getFrameIndex(window.name);
            parent.layer.close(index)

        }else{
            openWindow(2, './tuTongDetail.html?gui='+escape(gui)+'&cen='+escape(cen)+'&quhao='+escape(quhao), "详情", $(window).width(), $(window).height())

        }
       

        // if ($(this).attr("CNTR_no")) {
        //     moseData = $(this).attr("CNTR_no");
        //     //获取点击到的对象
        //     var dataListObj = dataList.data;
        //     var CNTR_no_ = $(this).attr("CNTR_no"),
        //         Level_no_ = $(this).attr("Level_no"),
        //         area_no_ = $(this).attr("area_no");


        //     if (type == "operate") {
        //         parent.$("select[name='XDLM柜架号']").val(dataListObj[CNTR_no_]['柜架号'])
        //         parent.$("select[name='XDLM层号']").val(dataListObj[CNTR_no_]['分层集合'][Level_no_]['层号'])
        //         parent.$("select[name='XDLM分区号']").val(dataListObj[CNTR_no_]['分层集合'][Level_no_]['分区集合'][area_no_]['分区号'])
        //         parent.form.render('select')
        //         QXALL()
        //     } else {
        //         var goodsList = dataListObj[CNTR_no_]['分层集合'][Level_no_]['分区集合'][area_no_]

        //         if (goodsList['库内物品集合'].length > 0) {
        //             store.set("tpTuTongDeatil", goodsList)
        //             openWindow(2, './tuTongDetail.html?type=ww', "详情", $(window).width(), $(window).height())
        //         } else {
        //             layer.msg("当前层为空")
        //         }

        //     }
        // }
    })
})



function initData(laytpl) {

    var index3 = layer.msg('正在计算,请稍等...', {
        time: 0,
        shade: 0.3,
        //content: '测试回调',
        success: function (index, layero) {
            setTimeout(function () {
                var rerurnData_weizhi = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                    XDLMCID: "9000",
                    XDLMTID: "9204",
                    XDLMSID: "9204005",
                    mCurrentStorage: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                });
                if (rerurnData_weizhi.success == true) {
                    // 将数据颠倒
                    if(kfSort() == "正序"){
                        for (var i = 0; i < rerurnData_weizhi.data.length; i++) {
                            rerurnData_weizhi.data[i]['分层集合']
                        }
                    }else{
                        for (var i = 0; i < rerurnData_weizhi.data.length; i++) {
                            rerurnData_weizhi.data[i]['分层集合'].reverse()
                        }
                    }

                    dataList = rerurnData_weizhi; //数据赋值，点击颜色需要
                    dataList.aisle = $("#aisle").val();
                    dataList.columnNum = $("#columnNum").val();
                    showTpl(laytpl, dataList)


                } else {
                    // layer.close(loading)

                }
                layer.close(index3);
            }, 3000);
        }
    });
}

// 获取柜架排序为正序还是倒序
function kfSort(){
    let kfSort = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462812741",
        XDLMA: "库房柜架排序"
    });
    if(kfSort.success){
        return kfSort.rows[0].sysvalue
    }
}

function showTpl(laytpl, data) {
    $("#view").empty()
    gdArry = []
    var getTpl = tpldemo.innerHTML
    laytpl(getTpl).render(data, function (html) {
        $("#view").append(html)
        layer.close(loading);
    });

}



// 过道
function getStore(callback, data) {
    var rerurnData_weizhi = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "9000",
        XDLMTID: "9204",
        XDLMSID: "9204005",
        mCurrentStorage: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
    });
    if (rerurnData_weizhi.success == true) {
        if (callback) {
            callback(rerurnData_weizhi)
        }
    }
}


function goodListDetail(data) { //查看物品详情
    layerPage01 = openWindow(2, '../../knww/page/wwjcxx.html?knbh=' + data, "详细信息", $(window).width(), $(window).height());

}

function setWidth(d) { //添加过道
    //	1)获取过道的位置
    var width;
    var padding_;
    if (d.columnNum) {
        width = (90 / d.columnNum) + "%";
        //宽度越大，padding越大

        if ((90 / d.columnNum) / 10 < 3) {

            padding_ = (90 / d.columnNum) / 10
        } else {
            padding_ = (90 / d.columnNum) / 10 * 2

        }

    } else {
        width = "400px";
        padding_ = "3"
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


function setKrColor(d) {
    var color = ""
    if (d['现容量'] == "0") {
        color = colorList.color0
    } else if ((d['现容量'] / d['最大容量']) < 0.5) {
        color = colorList.color1
    } else if ((d['现容量'] / d['最大容量']) >= 0.5 && (d['现容量'] / d['最大容量']) <= 0.7) {
        color = colorList.color3
    } else if ((d['现容量'] / d['最大容量']) > 0.7 && (d['现容量'] / d['最大容量']) < 1) {
        color = colorList.color2
    } else if ((d['现容量'] / d['最大容量']) == 1) {
        color = colorList.color4
    } else if ((d['现容量'] / d['最大容量']) > 1) {
        color = colorList.color4
    }
    return color
}

function getGridWidth(data) {

    var width_ = 100 / (data).toFixed(2) + "%"
    return width_
}




//弹出窗口新页面
function openWindow(type, url, title, w, h, anim) {
    let maxmin = true;
    if (title == null || title == '') {
        title = false;
        maxmin = false;
    };
    if (url == null || url == '') {
        url = "/404.html";
    };
    if (w == null || w == '') {
        w = ($(window).width() - 200);
    };
    if (h == null || h == '') {
        h = ($(window).height() - 100);
    };
    if (anim == null || anim == "") {
        anim = 5
    }
    var layerPage = layer.open({
        type: type * 1,
        area: [w + 'px', h + 'px'],
        fix: false, //不固定
        maxmin: maxmin,
        shade: 0.4,
        title: title,
        content: url,
        anim: anim,
        success: function (layero, index) {
            $(window).resize(function () {
                let layerInitWidth = $("#layui-layer-iframe" + index).width()
                var docWidth = $(document).width();
                var minWidth = layerInitWidth > docWidth ? docWidth : layerInitWidth;
                layer.style(index, {
                    top: 0,
                    width: minWidth,

                });
            });
        },
        end: function () { }

    });
    return layerPage
}