var tableins;
var type = window.location.href.getQuery("type");
var where = {},
    typeData = "";
var colsend = "";
var form, where = {}, cols,

    listType = window.location.href.getQuery("tabnum");

layui.use(['element', 'table', 'layer', 'form'], function () {
    form = layui.form;
    tableins = layui.table;
    element = layui.element;
    layer = layui.layer;

  


    //权限设置

    if(SysConfig.UserInfo.GetCookieName("kflx")=="拓片"){
        qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("待出库拓片");

    }else{

        qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("待出库文物");
    }


    if (!qx[0].Limit.isBJ) {
        $("#batchOutStore").addClass("layui-hide")
    
   

    }
    if (!qx[0].Limit.isDC) {
        $("#outfile").addClass("layui-hide")
     

    }
    if (!qx[0].Limit.isSH) {
        $("#batchApproval").addClass("layui-hide")
     

    }

    where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462810231",
        XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
        XDLMD: "待出库"
    };
    cols = [
        [{
            checkbox: true,
            LAY_CHECKED: false,

        }, {
            title: '序号',
            type: 'numbers',


        },
        
        {
            field: '登记号',
            title: '原登记号',
            width: '8%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.登记号);
            }
        },
        {
            field: '文物库内编号',
            title: '现登记号',
            width: '8%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.文物库内编号);
            }
        },
        {
            field: '批次编号',
            title: '批次编号',
            width: '9%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.批次编号);
            }
        },
        {
            field: '记录表流水号',
            title: '记录表流水号',
            width: '9%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.记录表流水号);
            }

        }, {
            field: '记录时间',
            title: '记录时间',
            width: '9%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.记录时间);
            }
        },



        {
            field: '操作类型',
            title: '操作类型',
            width: '6%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.操作类型);
            }
        },
        {
            field: '记录类型',
            title: '记录类型',
            width: '6%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.记录类型);
            }
        },
        {
            field: '出库去向',
            title: '出库去向',
            width: '6%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.出库去向);
            }
        },
        {
            field: '录入人',
            title: '录入人',
            width: '6%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.录入人);
            }
        },
        {
            field: '监督人',
            title: '监督人',
            width: '6%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.监督人);
            }
        },
        {
            field: '移交人',
            title: '移交人',
            width: '7%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.移交人);
            }
        },
        {
            field: '接收人',
            title: '接收人',
            width: '7%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.接收人);
            }
        },
        {
            title: '操作',
            width: '18%',
            fixed: "right",
            align: 'center',
            templet: function (d) {
                let tt = "";
                
                
                switch (d.操作类型) {
                    case "待出库":
            
                        if(d.审核状态=="同意出库"){
                            if (qx[0].Limit.isBJ) {
                                tt += '<a class="layui-btn layui-btn-xs layui-btn-green1 " onclick=kfshManage.wwck("' + d.文物库内编号 + '","' + d.记录表流水号 + '")>出库</a>';
                            }

                        }else{
                            if (qx[0].Limit.isSH) {
                                tt += '<a class="layui-btn layui-btn-xs layui-btn-warm " onclick=kfshManage.ShowSH("' + d.文物库内编号 + '","' + d.记录表流水号 + '","ck")>审核</a>';
    
                            }
                        }
                        
                
                        break;

                }
               

                tt += '<a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=showckd("' + d.id + '","' + d.文物库内编号 + '","' + d.记录表流水号 + '")>出(归)库单</a>';
                // tt += '  <a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=kfshManage.ShowChuKuDan("' + d.id + '","' + d.文物库内编号 + '")>出(归)库单</a>';
                tt += '<a class="layui-btn layui-btn-xs layui-btn-green1 " onclick=kfshManage.ShowXQ("' + d.id + '","' + d.文物库内编号 + '")>文物信息</a>';
                //删除


                if (qx[0].Limit.isSC) {
                    tt += ' <a class="layui-btn layui-btn-danger layui-btn-xs" onclick=del("' + d.id + '") lay-event="del">删除</a>';
                }

                return tt;
                
            }
        }

        ]
    ];
   

    
    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 7);



    form.on("select(wwtype)", function (data) {
        changeType(data.value);
        getSearchModule(where.TblNum);
        tableins.reload({
            cols: colsend,
            where: where
        })
    });

    $('#searchData').click(function () {
        where.QueryType = $("#cxlb").val();
        where.QueryKey = $("#queryK").val();
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 7);
        // tableins.reload('mDataTable', {
        //     id: 'mDataTable',
        //     where: where,
        //     page: {
        //         limits: [10, 50, 100, 300, 500],
        //         groups: 20,
        //         curr: 1
        //     },
        // });

    });

    //获取文物组下拉选项
    kfDataManage.GetJiLuQueryList();
    kfDataManage.GetWWGroup();
    kfDataManage.GetGuiJia();

    form.on("select(柜架号)", function (data) {
        kfDataManage.GetCengHao();
        form.render("select")
    })

    form.on("select(层号)", function (data) {
        kfDataManage.GetFenQuo();
        form.render("select")
    })

    changeSearchType($("#cxlb").val()) //默认显示的

    form.on("select(cxlb)", function (data) {
        changeSearchType(data.value)

    })
    //table.on('tool(wwck)', function (obj) {
    //    var data = obj.data;
    //    getRowColor(obj)
    //    switch (obj.event) {
    //        case "detail":
    //            if (where.TblNum == "305") {
    //                layerPage01 = openWindow(2, '../knww/page/wwjcxx.html?knbh=' + data['文物库内编号'] + '&type=ck', "详细信息", $(window).width(), $(window).height())
    //            } else if (where.TblNum == "386") {
    //                openWindow(2, '../knww/page/carrierDetail.html?knbh=' + data['文物库内编号'], "查看详情", $(window).width(), $(window).height());

    //            }

    //            break;
    //        case "approval":
    //            // if (limitConfig("storeLimt", 5)) {
    //            layerPage01 = openWindow(2, 'shzy.html?id=' + data['文物库内编号'] + '&type=ck', "审核", $(window).width(), $(window).height())

    //            // } else {
    //            //     layer.msg("您没有审核权限")
    //            // }

    //            break;
    //        case "output":
    //            // if (limitConfig("storeLimt", 2)) {
    //            relicOutStore("WenWuShenHeNext", {
    //                XDLM库内编号: data['文物库内编号'],
    //                XDLM记录表流水号: data['记录表流水号'] ? data['记录表流水号'] : 1
    //            }, "出库")
    //            // } else {
    //            //     layer.msg("您没有编辑权限")
    //            // }

    //            break;
    //        case "scanPic":
    //            lookPic(data['图片地址'].split(",")[0])

    //            break;

    //    }

    //})

    $("#dtjcx").click(function () {
        layerPage01 = openWindow(1, $("#dtjcxHtml"), "小提示：[组合查询适用于精确查询，应尽量输入较少的关键字，以便获取更多的查询结果]", 800, 450)
    })

    //导出
    $('#outfile').click(function (e) {
        var ids = [];
        var checkStatus = tableins.checkStatus('mDataTable'),
            data = checkStatus.data;
        for (var i = 0; i < data.length; i++) {
            ids.push(data[i].id);
        }
        if(ids.length == 0){
            layer.msg('请先选中行！', {
                title: '提示框',
                icon: 0,
                time: 800
            });
        }else{
            var index002 = layer.confirm('确定要导出吗？', {
                btn: ['确定', '再想想'] //按钮
            }, function () {
                var index3 = layer.msg('正在导出,请稍等...', {
                    time: 0,
                    shade: 0.3,
                    //content: '测试回调',
                    success: function (index, layero) {
                        setTimeout(function () {
                            let returnData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                                XDLMCID: "5002",
                                XDLMSID: "DYBH2020041515341704613112",
                                XDLMA: ids.join(',')
                            });
                            if (returnData.success) {
    
                                layer.msg('导出完成', {
                                    time: 500,
                                    icon: 1
                                }, function () {
                                    layer.closeAll();
                                    window.location = returnData.FilePath;
    
                                });
    
    
                            } else {
                                layer.msg(returnData, {
                                    icon: 0,
                                    time: 2000
                                });
    
                            }
    
                        }, 100);
    
                    }
                });
    
            }, function () {
                layer.close(index002);
            });
        }
        
    });

    //批量审核
    $("#batchApproval").click(function () {

        var knbh = [];
        var lsh = [];
        var flag = true;
        var checkStatus = tableins.checkStatus('mDataTable'),
            data = checkStatus.data;
        for (var i = 0; i < data.length; i++) {
            if (data[i]['审核状态'] == "同意出库") {

                flag = false;
                layer.msg("请选择未审批的文物")
                break;
                return flag
            } else {

                knbh.push(data[i]['文物库内编号']);
                lsh.push(data[i]['记录表流水号']);
            }
        }
        if (flag) {
            if(knbh.length == 0){
                layer.msg('请先选中行！', {
                    title: '提示框',
                    icon: 0,
                    time: 800
                });
            }else{

                kfshManage.ShowSH(knbh.join(","), lsh.join(","), 'ck');
            }
            //  batchSP(ids, where.TblNum, 'ck')

        }
    })

    $("#batchOutStore").click(function () { //批量入库
        plck("出库");
    })
    form.render();
});

function showckd(id_, knbh_, lsh_){
    SysConfig.ToolBox.openWindow("ckHtml.html?rowid="+id_+"&knbh="+knbh_+"&type=ck"+"&lsh="+escape(lsh_), "出(归)库单", $(window).width(), $(window).height());
}

//删除
function del(rowid){
    SysConfig.SubSystemData.SYKFGL.PLSC([{ id: rowid }], '4000', 'DYBH20190823124628462882234', Callback);
}



function relicOutStore(xaction, data, tip) { //文物的最后入库	
    var knbh_ = data['XDLM库内编号']
    var jllsNumber = data['XDLM记录表流水号']
    layer.confirm("确定要" + tip + "吗?", {
        btn: ['确定', '再想想'] //按钮
    },
        function () //确定
        {
            layer.msg('正在提交，请稍等...', {
                icon: 1,
                time: 500,
                success: function () {
                    postData(xaction, data, function (data1) {

                        //						var index002 = layer.msg(data.message, {
                        //							icon: 1,
                        //							time: 500,
                        //							success: function() {
                        if (data1.success || data1.msg) {

                            //									layer.close(index002)
                            var layer003 = layer.confirm("是否打印" + tip + "单?", {
                                btn: ['是', '否'] //按钮
                            },
                                function () //确定
                                {

                                    if (listType == "305") {

                                        layerPage01 = openWindow(2, './ckHtml.html?knbh=' + knbh_ + '&jlls=' + escape(data1.log_codes) + '&TblNum=' + listType + '&type=ck&print=print&go=2', "详细信息", $(window).width(), $(window).height());

                                    } else if (listType == "386") {

                                        layerPage01 = openWindow(2, './carrier_lsjl.html?knbh=' + knbh_ + '&jlls=' + escape(data1.log_codes) + '&TblNum=' + listType + '&type=ck&print=print&go=2', "详细信息", $(window).width(), $(window).height());

                                    }

                                    tableins.reload()
                                    layer.close(layer003)

                                },
                                function () {
                                    QXALL()
                                    tableins.reload()
                                }
                            );

                        }
                        //							}
                        //						});

                    })

                }
            });
        }

    );

}



function changeSearchType(value) {
    $(".search-type").addClass("layui-hide")
    if (value == "文物组" || value == "warehouse") {
        $("#" + value + "Div").removeClass("layui-hide");
    } else {
        $("#keyworDiv").removeClass("layui-hide");
    }
}

function getSearchModule(tablenum) {

    postData("wwGetDataList", {
        TblNum: 77,
        T777: "EQ" + tablenum,
        orderby: "id",
    }, function (data) {

        $("#cxlb").empty()
        getSelect("cxlb", data.data, "display", "", "chsx")
        form.render("select")
    })

}

function changeType(key) {
    where = {}
    //1)先判断是哪一个
    for (var i = 0; i < typeData.length; i++) {
        if (typeData[i]['TabChiName'] == key) {
            var storeColnum = typeData[i].Querys.split("|")[0].split(",")[0];
            var statusColnum = typeData[i].Querys.split("|")[1].split(",")[0];
            where.TblNum = typeData[i].TableNum;
            where[storeColnum] = "EQ" + getCookieName("mCurrentStorage");
            where[statusColnum] = "EQ待出库";
            colsend = kfJson.colsName["T" + typeData[i].TableNum]["dckww"]
        }
    }

}

function plck(tip) { //批量出库
    var knbhArry = [], lshArry = [];
    var checkStatus = tableins.checkStatus('mDataTable'),
        data = checkStatus.data;
    let isok = true;
    for (var i = 0; i < data.length; i++) {
        if (data[i]['审核状态'] !== "同意" + tip) {
            layer.msg('选项中有未审核的数据！', {
                title: '提示框',
                icon: 0,
                time: 800
            });
            isok = false;
            break;
        }
        else {
            knbhArry.push(data[i]['文物库内编号']);
            lshArry.push(data[i]['记录表流水号']);
        }
    }
    if (isok) {
        if (knbhArry.length == 0) {
            layer.msg('请先选中行！', {
                title: '提示框',
                icon: 0,
                time: 800
            });
        } else {
            kfshManage.wwck(knbhArry.join(","), lshArry.join(","));
            //var ruku = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            //    XDLMCID: "9000",
            //    XDLMTID: "9204",
            //    XDLMSID: "9204008",
            //    XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),
            //    XDLM文物库内编号: knbhArry.join(","),
            //    XDLM记录表流水号: lshArry.join(","),
            //});


            //if (ruku.success) {
            //    layer.msg('出库完成！', {
            //        title: '提示框',
            //        icon: 0,
            //        time: 800
            //    });
            //    Callback();
            //}
            //else {
            //    layer.msg(ruku, {
            //        title: '提示框',
            //        icon: 0,
            //        time: 800
            //    });
            //}

        }
    }

}


function Callback() {

    tableins.reload('mDataTable', {
        id: 'mDataTable',
        page: {
            limits: [10, 50, 100, 300, 500],
            groups: 20,
            curr: 1
        },
        //page: {
        //    curr: 1 //重新从第 1 页开始
        //}
    });
}


