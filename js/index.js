var itemList = []; 
layui.use(['element', "form", "layer"], function () {
    var element = layui.element,
        form = layui.form,
        layer = layui.layer;
    // var storage = getCookieName("mUserStorage").split(",");
    // var html = "";
    
       

    itemList.push({ mDataType: "文物管理", mDataName: "文物列表", mTitle: "文物列表", mUrl: "/SYKFGL/Page/knww/page/wwlb.html", mId: "1001", mIcon: "fa fa-tasks"});
    //itemList.push({ mDataType: "文物管理", mDataName: "新文物入库", mTitle: "新文物入库", mUrl: "/SYKFGL/Page/crkgl/xrkww.html", mId: "1002", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "文物管理", mDataName: "文物入库流水记录", mTitle: "文物入库流水记录", mUrl: "/SYKFGL/Page/crkgl/wwrklsjl.html?tabnum=305", mId: "1003", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "文物管理", mDataName: "文物出库流水记录", mTitle: "文物出库流水记录", mUrl: "/SYKFGL/Page/crkgl/wwcklsjl.html?tabnum=305", mId: "1004", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "文物管理", mDataName: "待入库文物", mTitle: "待入库文物", mUrl: "/SYKFGL/Page/crkgl/drkww.html?type=drk", mId: "1005", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "文物管理", mDataName: "待出库文物", mTitle: "待出库文物", mUrl: "/SYKFGL/Page/crkgl/dckww.html", mId: "1006", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "文物管理", mDataName: "拒绝出库文物", mTitle: "拒绝出库文物", mUrl: "/SYKFGL/Page/crkgl/refusePage.html?tabnum=305", mId: "107", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "文物管理", mDataName: "图片列表展示", mTitle: "图片列表展示", mUrl: "/SYKFGL/Page/knww/page/tplbzs.html?type=01&tabnum=305", mId: "1008", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "文物管理", mDataName: "三维列表展示", mTitle: "三维列表展示", mUrl: "/SYKFGL/Page/knww/page/swlbzs.html?type=ww", mId: "1009", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "拓片管理", mDataName: "拓片列表", mTitle: "拓片列表", mUrl: "/SYKFGL/Page/knww/page/djblb.html", mId: "2001", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "拓片管理", mDataName: "拓片入库流水记录", mTitle: "拓片入库流水记录", mUrl: "/SYKFGL/Page/crkgl/wwrklsjl.html?tabnum=386", mId: "2002", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "拓片管理", mDataName: "拓片出库流水记录", mTitle: "拓片出库流水记录", mUrl: "/SYKFGL/Page/crkgl/wwcklsjl.html?tabnum=386", mId: "2003", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "拓片管理", mDataName: "待入库拓片", mTitle: "待入库拓片", mUrl: "/SYKFGL/Page/crkgl/drkww.html?tabnum=386", mId: "2004", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "拓片管理", mDataName: "待出库拓片", mTitle: "待出库拓片", mUrl: "/SYKFGL/Page/crkgl/dckww.html?tabnum=386", mId: "2005", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "拓片管理", mDataName: "拒绝出库拓片", mTitle: "拒绝出库拓片", mUrl: "/SYKFGL/Page/crkgl/refusePage.html?tabnum=386", mId: "2006", mIcon: "fa fa-tasks"});
   
    itemList.push({ mDataType: "拓片管理", mDataName: "拓片图片展示", mTitle: "拓片图片展示", mUrl: "/SYKFGL/Page/knww/page/tplbzsTwo.html?type=02", mId: "206", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "拓片管理", mDataName: "远景图片展示", mTitle: "远景图片展示", mUrl: "/SYKFGL/Page/knww/page/tplbzsTwo.html?type=03", mId: "208", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "拓片管理", mDataName: "近景图片展示", mTitle: "近景图片展示", mUrl: "/SYKFGL/Page/knww/page/tplbzsTwo.html?type=04", mId: "209", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "拓片管理", mDataName: "同步拓片", mTitle: "同步拓片", mUrl: "/SYKFGL/Page/knww/page/tptongbu.html", mId: "2007", mIcon: "fa fa-tasks"});

       
    itemList.push({ mDataType: "文物数据统计", mDataName: "文物状态统计图", mTitle: "文物状态统计图", mUrl: "/SYKFGL/Page/allkfgl/all_wwtj.html?type=only", mId: "202", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "拓片数据统计", mDataName: "拓片状态统计图", mTitle: "拓片状态统计图", mUrl: "/SYKFGL/Page/allkfgl/all_tptj.html?type=only", mId: "205", mIcon: "fa fa-tasks"});
    
    
    itemList.push({ mDataType: "库房管理", mDataName: "库房设置", mTitle: "库房设置", mUrl: "/SYKFGL/Page/kfgl/page/kfsz.html", mId: "2008", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "库房管理", mDataName: "库容查看", mTitle: "库容查看", mUrl: "/SYKFGL/Page/kfgl/page/krck.html", mId: "2009", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "库管记录", mDataName: "申请属性修改记录", mTitle: "申请属性修改记录", mUrl: "/SYKFGL/Page/kgjl/xgjl.html", mId: "3001", mIcon: "fa fa-tasks" });
    itemList.push({ mDataType: "库管记录", mDataName: "收到申请属性修改记录", mTitle: "收到申请属性修改记录", mUrl: "/SYKFGL/Page/kgjl/xgjl.html", mId: "3001", mIcon: "fa fa-tasks" });
    itemList.push({ mDataType: "全库房管理", mDataName: "全库房数据", mTitle: "全库房数据", mUrl: "/SYKFGL/Page/allkfgl/all_main.html", mId: "4001", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "全库房管理", mDataName: "全库文物列表", mTitle: "全库文物列表", mUrl: "/SYKFGL/Page/allkfgl/all_wwlb.html", mId: "4002", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "全库房管理", mDataName: "全库拓片列表", mTitle: "全库拓片列表", mUrl: "/SYKFGL/Page/allkfgl/all_tplb.html", mId: "4003", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "全库房管理", mDataName: "全库拓片状态统计图", mTitle: "全库拓片状态统计图", mUrl: "/SYKFGL/Page/allkfgl/all_tptj.html", mId: "4004", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "全库房管理", mDataName: "全库文物状态统计图", mTitle: "全库文物状态统计图", mUrl: "/SYKFGL/Page/allkfgl/all_wwtj.html", mId: "4005", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "全库房管理", mDataName: "文物数据查重", mTitle: "文物数据查重", mUrl: "/SYKFGL/Page/allkfgl/repeatedRecord.html?tabnum=305", mId: "4006", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "全库房管理", mDataName: "拓片数据查重", mTitle: "拓片数据查重", mUrl: "/SYKFGL/Page/allkfgl/repeatedRecord.html?tabnum=386", mId: "4007", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "全库房管理", mDataName: "全库申请属性修改记录", mTitle: "全库申请属性修改记录", mUrl: "/SYKFGL/Page/kgjl/xgjl.html?type=all", mId: "4008", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "系统管理", mDataName: "文物属性管理", mTitle: "文物属性管理", mUrl: "/SYKFGL/Page/xtgl/wwsxgl.html", mId: "5001", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "系统管理", mDataName: "行政区设置", mTitle: "行政区设置", mUrl: "/SYKFGL/Page/xtgl/administrativeRegion.html", mId: "5002", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "系统管理", mDataName: "系统日志", mTitle: "系统日志", mUrl: "/SYKFGL/Page/xtgl/xtrz.html", mId: "5003", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "系统管理", mDataName: "文物组", mTitle: "文物组", mUrl: "/SYKFGL/Page/xtgl/wwz.html", mId: "5004", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "系统管理", mDataName: "系统设置", mTitle: "系统设置", mUrl: "/SYKFGL/Page/xtgl/xtsz.html", mId: "5005", mIcon: "fa fa-tasks"});
    itemList.push({ mDataType: "系统管理", mDataName: "系统配置", mTitle: "系统配置", mUrl: "/SYKFGL/Page/xtgl/xtpz.html", mId: "5006", mIcon: "fa fa-tasks"});

    var item = "";
    for(let i in itemList){
        item += itemList[i].mDataName + ",";
    }
    item = item.substring(0, item.length - 1);
    console.log(item);
    let qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority(item);
  
    console.log(qx);
    if(qx.length > 0){
        for(let i in itemList){
            for (var j in qx) {
                if (qx[j].Limit.isFW) {
                    if (qx[j].mDataName == itemList[i].mDataName) {
                        $("#" + itemList[i].mDataType).append(GetChildItem(itemList[i].mUrl, itemList[i].mDataName, itemList[i].mId, itemList[i].mIcon));
                        $("#" + itemList[i].mDataType + "_li").removeClass("layui-hide");
                        break;
                    }
                }
            }
        }
    }

    if(SysConfig.UserInfo.GetCookieName("kflx") == "文物"){
        $('#拓片管理_li').addClass("layui-hide");
        $('#拓片数据统计_li').addClass("layui-hide");
    }else if(SysConfig.UserInfo.GetCookieName("kflx") == "拓片"){
        $('#文物管理_li').addClass("layui-hide");
        $('#文物数据统计_li').addClass("layui-hide");
    }



    $("#userName").html(SysConfig.UserInfo.GetUserName());
    $("#currentStore").html(SysConfig.UserInfo.GetCookieName("mCurrentStorage"));
    $('#xitong').append(SysConfig.SubSystemData.SYKFGL.GetSysList());
    //系统配置
    var aa = SysConfig.GetTableData.SystemInfo();
    for (var i in aa.rows) {
        switch (aa.rows[i].配置名称) {
            case "版权所有":
                $('#copyright_name_value').html(aa.rows[i].配置值);
                break;
            case "技术支持":
                $('#support_name_value').html(aa.rows[i].配置值);
                break;
            case "用户图标":
                // $("#logo").attr("src", aa.rows[i].配置值);用黄色图标时
                break;
            case "用户图标2":
                $("#logo").attr("src", aa.rows[i].配置值);
                break;
        }
    }

    $("#currentStore1").click(function () {
        // openWindowbtnclose(2, './chooseStorage.html?butclose=0', "", 628, 377);
        // SysConfig.ToolBox.openWindow('./chooseStorage.html?butclose=0', "选择库房", 628, 377);
        layer.open({
            type: 2,
            area: ['628px',  '377px'],
            fix: false, //不固定
            maxmin: false,
            shade: 0.4,
            title: "",
            content: './chooseStorage.html?butclose=0',
            anim: 1,
            closeBtn: 0,
            shade: 0,
            skin: 'demo-class',
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
    })



    // $(".item-nav").each(function (key, val) {
    //     // if ($(val).find("dd").css('display') == "block") {
    //     //     $(val).removeClass("layui-hide")
    //     //     return false
    //     // }
    //     $(val).find("dd").each(function (k, v) {
    //         if ($(v).css('display') == "block") {
    //             $(val).removeClass("layui-hide")
    //             return false
    //         }
    //     })
    // })


    var reData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231246284628130151",
        XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
        // XDLMB: $('#xmbhList').val()
    });

        
    // if (reData.rows[0]['分类'] == '文物') {
    //     $('.tp-item').addClass("layui-hide")
    //     $("#SY201811280938313831244").find("a").attr("lay-href", "./Page/kfgl/page/krck.html?limit=SY201811280938313831244")

    // } else if (reData.rows[0]['分类'] == '拓片') {
    //     $('.ww-item').addClass("layui-hide")
    //     $("#SY201811280938313831244").find("a").attr("lay-href", "./Page/kfgl/page/krck_tp.html?limit=SY201811280938313831244")

    // }






    // }
    //postData("wwGetDataList", {
    //    TblNum: 175
    //}, function(data) {
    //    for (var i = 0; i < data.data.length; i++) {
    //        if (data.data[i]['sysname'] == "技术支持") {
    //            $("#support_name_value").html(data.data[i]['sysvalue'])
    //        }
    //        if (data.data[i]['sysname'] == "使用单位") {
    //            $("#copyright_name_value").html(data.data[i]['sysvalue'])
    //        }
    //        if (data.data[i]['sysname'] == "验证码出入库") {
    //            if (data.data[i]['sysvalue'] == "是") {
    //                localStorage.setItem("vertifyCode", "1") //是在出入库的验证码弹窗，在xddatamange会用到，只在这用
    //            } else {
    //                localStorage.setItem("vertifyCode", "0")
    //            }

    //        }

    //    }
    //})
    form.render();
});

function GetChildItem(mUrl, mTitle, mID, mIcon){
    return `<dd>
                <a href="javascript:;" data-icon="${mIcon}" data-title="${mTitle}" kit-target data-id='${mID}' lay-href="${mUrl}"> 
                    <i class="${mIcon}"></i> 
                    <span>${mTitle}</span> 
                </a>
            </dd>`;
    
}