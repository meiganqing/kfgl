
var kfDataManage = {
    GetWWQueryList: function () {
        //获取文物组下拉选项
        var reData_wwfz = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "1001",
            XDLMSID: "DYBH2020041112420803438236",
        });

        if (reData_wwfz.success) {
            //getSelect("groupkeyWords", data.data, "groupName");
            $('#cxlb').empty();
            for (var i = 0; i < reData_wwfz.rows.length; i++) {
                $('#cxlb').append('<option value="' + reData_wwfz.rows[i].查询属性 + '">' + reData_wwfz.rows[i].查询显示名 + '</option>');
            }

        }
    },
    GetJiLuQueryList: function () {
        //获取文物组下拉选项
        var reData_wwfz = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "1001",
            XDLMSID: "DYBH2020042109184908913132",
        });

        if (reData_wwfz.success) {
            //getSelect("groupkeyWords", data.data, "groupName");
            $('#cxlb').empty();
            for (var i = 0; i < reData_wwfz.rows.length; i++) {
                $('#cxlb').append('<option value="' + reData_wwfz.rows[i].查询属性 + '">' + reData_wwfz.rows[i].查询显示名 + '</option>');
            }

        }
    },

    GetWWGroup: function () {
        //获取文物组下拉选项
        var reData_wwfz = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "1001",
            XDLMSID: "DYBH201908231246284628239261",
        });

        if (reData_wwfz.success) {
            //getSelect("groupkeyWords", data.data, "groupName");
            $('#groupkeyWords').empty();
            for (var i = 0; i < reData_wwfz.rows.length; i++) {
                $('#groupkeyWords').append('<option value="' + reData_wwfz.rows[i].groupName + '">' + reData_wwfz.rows[i].groupName + '</option>');
            }

        }
    },
    GetGuiJia: function () {

        var reData_kfgj = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "1001",
            XDLMSID: "DYBH201908231246284628123181",
            XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
        });

        if (reData_kfgj.success) {
            //getSelect("groupkeyWords", data.data, "groupName");
            $('#柜架号').empty();
            for (var i = 0; i < reData_kfgj.rows.length; i++) {
                $('#柜架号').append('<option value="' + reData_kfgj.rows[i].柜架号 + '">' + reData_kfgj.rows[i].柜架号 + '</option>');
            }
            kfDataManage.GetCengHao();
        }
    },
    GetCengHao: function () { //获取柜架号
        var reData_ceng = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823124628462826161",
            XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
            XDLMB: $('#柜架号').val(),
        });
        if (reData_ceng.success) {
            $('#层号').empty();
            for (var i = 0; i < reData_ceng.rows.length; i++) {
                $('#层号').append('<option value="' + reData_ceng.rows[i].层号 + '">' + reData_ceng.rows[i].层号 + '</option>');
            }
            kfDataManage.GetFenQu();

        }
    },
    GetFenQu: function () {

        var reData_fq = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "1001",
            XDLMSID: "DYBH201908231246284628236171",
            XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
            XDLMB: $('#柜架号').val(),
            XDLMC: $('#层号').val(),
        });
        if (reData_fq.success) {
            $('#分区号').empty();
            for (var i = 0; i < reData_fq.rows.length; i++) {
                $('#分区号').append('<option value="' + reData_fq.rows[i].分区号 + '">' + reData_fq.rows[i].分区号 + '</option>');
            }
            //form.render("select")
        }
    },


};

var kfshManage = {
    ShowSH: function (knbh, lsh, type) {
        SysConfig.ToolBox.openWindow('/SYKFGL/page/crkgl/shzy.html?type=' + type + '&knbh=' + knbh + '&lsh=' + lsh, "审核", $(window).width() - 400, $(window).height() - 100);
    },
    ShowRKDan: function (id, knbh) {
        SysConfig.ToolBox.openWindow('/SYKFGL/page/kfgl/page/scanStore.html?type=rk&ids=' + id, "位置信息", $(window).width() - 800, $(window).height() - 120);
    },
    ShowChuKuDan: function (id, knbh, lsh) {
        SysConfig.ToolBox.openWindow('ckHtml.html?rowid=' + id + '&knbh=' + knbh + "&type=ck" + "&lsh=" + escape(lsh), "出库单", $(window).width(), $(window).height())
        // if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {
        //     SysConfig.ToolBox.openWindow('ckHtml.html?rowid=' + id + '&knbh=' + knbh + "&type=ck", "出库单", $(window).width(), $(window).height())
        // } else {
        //     SysConfig.ToolBox.openWindow('ckHtml.html?rowid=' + id + '&knbh=' + knbh + "&type=rk", "入库单", $(window).width(), $(window).height())
        // }  
    },
    ShowGKDan: function (id, knbh) {
        if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {
            SysConfig.ToolBox.openWindow('ckHtml.html?rowid=' + id + '&knbh=' + knbh + "&type=gk", "归库单", $(window).width(), $(window).height())

        } else {
            SysConfig.ToolBox.openWindow('ckHtml.html?rowid=' + id + '&knbh=' + knbh + "&type=rk", "归库单", $(window).width(), $(window).height())

        }
    },
    ShowXQ: function (id, knbh) {
        if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {
            SysConfig.ToolBox.openWindow('/SYKFGL/page/knww/page/wwjcxx.html?rowid=' + id + '&knbh=' + knbh, "详情", $(window).width(), $(window).height())
        } else {
            SysConfig.ToolBox.openWindow('/SYKFGL/page/knww/page/carrierDetail.html?rowid=' + id + '&knbh=' + knbh, "详情", $(window).width(), $(window).height())
        }
    },
    wwck: function (knbh, lsh) {
        var shck = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "9000",
            XDLMTID: "9204",
            XDLMSID: "9204008",
            XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),
            XDLM文物库内编号: knbh,
            XDLM记录表流水号: lsh,
        });
        if (shck.success) {
            layer.msg("出库完成!");
            if (shck.jlid.indexOf(',') == -1) {
                layer.confirm('出库完成!是否打印出库单？', {
                    btn: ['确定', '再想想'] //按钮
                },function () { //确定
                   
                        kfshManage.ShowChuKuDan(shck.jlid, shck.knbh, lsh);
                },function (index){ //
                    layer.close(index)
                    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                    parent.layer.close(index); //再执行关闭   
                });
            }
            Callback();
            
        }
        else {
            layer.msg("出库审核失败!" + shck);
        }
    }

}

var outputFile = {
    OutPutGuiKu: function (title, knbh, lsh, pcbh, type, Callback) {
        var index002 = layer.confirm(title, {
            btn: ['确定', '再想想'] //按钮
        }, function () {
            var index3 = layer.msg('正在导出,请稍等...', {
                time: 0,
                shade: 0.3,
                //content: '测试回调',
                success: function (index, layero) {
                    setTimeout(function () {
                        var outword = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                            XDLMCID: "9000",
                            XDLMTID: "9204",
                            XDLMSID: "9204004",
                            XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),
                            XDLMWordType: type,
                            XDLMbatch_code: pcbh,
                            XDLMKNBH: knbh,
                            XDLMLSH: lsh,
                        });

                        if (typeof (outword) == "string") {
                            layer.msg(outword);
                        }
                        else {
                            layer.msg('导出完成', {
                                time: 500,
                                icon: 1
                            }, function () {
                                window.location = outword.FilePath;
                                if(Callback){
                                    Callback();
                                }
                                
                            });
                           
                        }
                    }, 3000);
                }
            });
        }, function (index002) {
            layer.close(index002)
            if(Callback){
                Callback();
            }
        });

    }
}

var toolBox = {
    Callback: function () {
        tableins.reload('mDataTable', {
            page: {
                limits: [10, 50, 100, 300, 500],
                groups: 20,
                curr: 1
            },
            //page: {
            //    curr: 1 //重新从第 1 页开始
            //}
        });
    },
    CallbackAdnCloseWindow: function () {
        tableins.reload('mDataTable', {
            page: {
                limits: [10, 50, 100, 300, 500],
                groups: 20,
                curr: 1
            },
            //page: {
            //    curr: 1 //重新从第 1 页开始
            //}
        });
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.close(index); //再执行关闭   
    }
}

