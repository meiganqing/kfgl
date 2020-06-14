var tableins, cols,type,$,where;
//var limit = 7,
//    where = {
//        TblNum: 178,
//        T178110: "EQ" + window.location.href.getQuery("tabnum"),
//        T17810: "EQ入库",
//        T1782: "EQ" + getCookieName("mCurrentStorage"),
//        orderby: "记录时间 desc"
//        /*T3052: "EQ" + getCookieName("mCurrentStorage")*/
//    }


layui.use(['element', 'table', 'layer', 'form', "laydate"], function () {
    var form = layui.form,
    $ = layui.jquery;
    laydate = layui.laydate,
    layer = layui.layer;
    tableins = layui.table;


     where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH2020042016161605625408",
        XDLMC: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),//库房名
        XDLMB: "入库"//操作类型
    };

    //权限设置
    if(SysConfig.UserInfo.GetCookieName("kflx")=="拓片"){
        //拓片系统
        qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("拓片入库流水记录");
        where.XDLMD="拓片"

    }else if(SysConfig.UserInfo.GetCookieName("kflx")=="文物"){
        //文物系统
        qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("文物入库流水记录");
        where.XDLMD="文物"

    }

//入库导出权限
    if (!qx[0].Limit.isDC) {
        $("#outfile").addClass("layui-hide")
    }

     cols = [
        [{
            checkbox: true,
            LAY_CHECKED: false
        }, {
            title: '序号',
            type: 'numbers',

        },
    
        {
            field: '登记号',
            title: '原登记号',
            width: '10%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.登记号);
            }
        },
        {
            field: '文物库内编号',
            title: '现登记号',
            width: '10%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.文物库内编号);
            }
        },
        {
            field: '批次编号',
            title: '批次编号',
            width: '10%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.批次编号);
            }
        },
        {
            field: '记录表流水号',
            title: '记录表流水号',
            width: '7%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.记录表流水号);
            }

        }, {
            field: '记录时间',
            title: '记录时间',
            width: '12%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.记录时间);
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
            field: '接收人',
            title: '接收人',
            width: '7%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.接收人);
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
        }, {
            title: '操作',
            // width: '14%',
            align: 'center',
            templet: function (d) {
              
                let tt = ""
                if (d.记录类型 == "归还入库") {
                    tt += ' <a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=ShowGuiKu("' + d.id + '","' + d.文物库内编号 + '","' + d.记录表流水号 +'")>归库单</a>';
                    // tt += ' <a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=kfshManage.ShowGKDan("' + d.id + '","' + d.文物库内编号 + '")>归库单</a>';
                }
                else {
                    tt += ' <a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=ShowRuKu("' + d.id + '","' + d.文物库内编号 + '","' + d.记录表流水号 + '")>入库单</a>';
                }

                tt += '<a class="layui-btn layui-btn-xs layui-btn-green1 " onclick=ShowXQ("' + d.id + '","' + d.文物库内编号 + '")>文物信息</a>';
                
                if (qx[0].Limit.isSC) {
                    tt += ' <a class="layui-btn layui-btn-danger layui-btn-xs" onclick=Edit("删除","' + d.id + '") lay-event="del">删除</a>';

                }
                return tt;


                //tt += '<a class="layui-btn layui-btn-xs layui-btn-warm" style="background: rgb(201, 201, 201);color: #FFFFFF;" onclick=Edit("归还","' + d.文物库内编号 + '")>归还</a>';
                //tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=Edit("编辑","' + d.文物库内编号 + '") lay-event="edit">编辑</a>';

                //if (qx[0].Limit.isSH) {
                //    tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=editSys("' + d.onlynum + '") lay-event="edit">配置系统</a>';
                //    tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=editRole("' + d.onlynum + '") lay-event="edit">配置角色</a>';
                //}




            }
        }

        ]
    ];
    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '入库列表', cols, where, 15);

//文物信息导出，入库单导出
    $("#Cultural").addClass("layui-hide")
    $("#outfileCKD").addClass("layui-hide")
    kfDataManage.GetJiLuQueryList();


    //table.on('tool(wwrk)', function (obj) {
    //    var data = obj.data;
    //    getRowColor(obj)
    //    switch (obj.event) {
    //        case "xq":
    //            postData("wwGetDataList", {
    //                TblNum: "385",
    //                T3852: "EQ" + data['文物库内编号']
    //            }, function (retrunData) { //区分拓片表和文物列表
    //                if (retrunData.data[0]['表对应码'] == "305") {

    //                    layerPage01 = openWindow(2, '../knww/page/wwjcxx.html?TblNum=' + retrunData.data[0]['表对应码'] + '&knbh=' + data['文物库内编号'], "详情", $(window).width(), $(window).height())

    //                } else if (retrunData.data[0]['表对应码'] == "386") {
    //                    layerPage01 = openWindow(2, '../knww/page/carrierDetail.html?TblNum=' + retrunData.data[0]['表对应码'] + '&knbh=' + data['文物库内编号'], "详情", $(window).width(), $(window).height())

    //                }

    //            })
    //            break;

    //        case "xq2":
    //            postData("wwGetDataList", {
    //                TblNum: "385",
    //                T3852: "EQ" + data['文物库内编号']
    //            }, function (retrunData) { //区分拓片表和文物列表
    //                if (retrunData.data[0]['表对应码'] == "305") {
    //                    layerPage01 = openWindow(2, '../knww/page/wwDetail.html?TblNum=' + retrunData.data[0]['表对应码'] + '&knbh=' + data['文物库内编号'] + '&jlls=' + escape(data['记录表流水号']) + "&type=rk", "入库单", $(window).width(), $(window).height())

    //                    //                          layerPage01 = openWindow(2, '../knww/page/wwjcxx.html?newrk=newrk&TblNum=' + retrunData.data[0]['表对应码'] +'&knbh=' + data['文物库内编号'], "详情", $(window).width(), $(window).height())

    //                } else if (retrunData.data[0]['表对应码'] == "386") {
    //                    layerPage01 = openWindow(2, '../knww/page/tpDetail.html?TblNum=' + retrunData.data[0]['表对应码'] + '&knbh=' + data['文物库内编号'] + '&jlls=' + escape(data['记录表流水号']) + "&type=rk", "入库单", $(window).width(), $(window).height())

    //                }

    //            })
    //            break;
    //        case "scanPic":
    //            lookPic(data['记录图'])
    //            break;
    //        case "detail":
    //            postData("wwGetDataList", {
    //                TblNum: "385",
    //                T3852: "EQ" + data['文物库内编号']
    //            }, function (retrunData) { //区分拓片表和文物列表
    //                if (retrunData.data[0]['表对应码'] == "305") {
    //                    layerPage01 = openWindow(2, 'ckHtml.html?TblNum=' + retrunData.data[0]['表对应码'] + '&jlls=' + escape(data['记录表流水号']) + '&knbh=' + data['文物库内编号'] + "&type=rk", "详情", $(window).width(), $(window).height())

    //                } else if (retrunData.data[0]['表对应码'] == "386") {
    //                    layerPage01 = openWindow(2, 'carrier_lsjl.html?TblNum=' + retrunData.data[0]['表对应码'] + '&knbh=' + data['文物库内编号'] + '&jlls=' + escape(data['记录表流水号']) + "&type=rk", "详情", $(window).width(), $(window).height())

    //                }

    //            })

    //            break;

    //        // 修改
    //        case "editor":
    //            // if (limitConfig("storeLimt", 2)) {
    //            // 01步请求文物列表数据
    //            wwlbwhere = {
    //                XDLMCID: "1001",
    //                XDLMSID: "DYBH20190823124628462889251",
    //                XDLMU: data['文物库内编号']
    //            },
    //                PostData_new('/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYKFGL', wwlbwhere, function (wwdata) {
    //                    // console.log("文物列表数据")
    //                    // console.log(wwdata)
    //                    // 02判断请求全库房数据是否有数据
    //                    if (wwdata.rows.length > 0 & wwdata.success == true) {
    //                        // 03判断是否在当前库房
    //                        //  getCookieName("mCurrentStorage")当前库房
    //                        if (wwdata.rows[0].库房名 == getCookieName("mCurrentStorage")) {

    //                            layerPage04 = openWindow(2, "../knww/page/wwlb.html?type=modify&knbh=" + data['文物库内编号'], "文物列表", $(window).width(), $(window).height())
    //                        } else {
    //                            layer.msg("文物不在当前库房，请转至【" + wwdata.rows[0].库房名 + "】进行修改")
    //                        }

    //                    } else {
    //                        layer.msg("文物信息不存在")
    //                    }

    //                })
    //            // 跳转到文物列表
    //            // } else {
    //            //     layer.msg("您没有编辑权限")
    //            // }
    //            break;
    //    }
    //});

    form.on("select(seljllx)", function (data) {
        QueryRun(data.value);
    })
    //搜索
    $('#searchData').click(function () {
        QueryRun($("#jllx").val());
    });
    //记录时间的切换
    laydate.render({
        elem: '#start',
        range: true,
        change: function (value, date, endDate) {
            where.startTime = value.split(" - ")[0];
            where.endTime = value.split(" - ")[1];
        }
    });



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

    // 文物信息导出
    // $('#Cultural').click(function (e) {
    //     var ids = [];

    //     var checkStatus = tableins.checkStatus('mDataTable'),

    //         data = checkStatus.data;
    //     for (var i = 0; i < data.length; i++) {
    //         ids.push(data[i].文物库内编号);
    //     }
    //     outfile("305", ids, "T3056");
    // });

    
    //
    //出库单导出
    // $("#outfileCKD").click(function () {
    //     var knbhPrint = [];
    //     var lsjlPrint = [];
    //     var ckdType = ""
    //     if ($("#jllx").val() == "所有") {
    //         layer.msg("请指定记录类型为新入库或归还入库")
    //         return false
    //     } else if ($("#jllx").val() == "新入库") {
    //         ckdType = "入库单"
    //     } else if ($("#jllx").val() == "移库") {
    //         ckdType = "入库单"
    //     } else if ($("#jllx").val() == "归还入库") {
    //         ckdType = "归库单"
    //     }

    //     var checkStatus = tableins.checkStatus('mDataTable'),
    //         data = checkStatus.data;
    //     for (var i = 0; i < data.length; i++) {
    //         //                  if(data[i]['记录类型']=="移库"){
    //         //                  
    //         //                      
    //         //                  }else {
    //         //                      layer.msg("请选择记录类型为归还入库的栏目")
    //         //                      return false
    //         //                  }
    //         knbhPrint.push(data[i]['文物库内编号']);
    //         lsjlPrint.push(data[i]['记录表流水号'])

    //     }

    //     printAllList(knbhPrint.join(","), lsjlPrint.join(","), ckdType)

    // })

    form.render();
});


//删除
function Edit(eventName, mKNBH) {
    switch (eventName) {

        case "删除":
            // DYBH20190823124628462882234
            // SysConfig.SubSystemData.SYKFGL.PLSC([{ id: mKNBH }], '4000', 'DYBH201908231246284628217254', Callback);
            SysConfig.SubSystemData.SYKFGL.PLSC([{ id: mKNBH }], '4000', 'DYBH20190823124628462882234', Callback);
            break;

    }
}


function ShowGuiKu(id, knbh, lsh){
    layerPage01 = SysConfig.ToolBox.openWindow('ckHtml.html?rowid=' + id + '&knbh=' + knbh + "&type=gk" + '&lsh=' + escape(lsh), "归库单", $(window).width(), $(window).height())
}

function ShowRuKu(id, knbh, lsh) {
    if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {
        layerPage01 = SysConfig.ToolBox.openWindow('../knww/page/wwDetail.html?rowid=' + id + '&knbh=' + knbh + "&type=rk" + "&lsh="+escape(lsh), "入库单", $(window).width(), $(window).height())
    } else {
        layerPage01 = SysConfig.ToolBox.openWindow('../knww/page/tpDetail.html?rowid=' + id + '&knbh=' + knbh + "&type=rk" + "&lsh="+escape(lsh), "入库单", $(window).width(), $(window).height())

    }
}

function ShowXQ(id, knbh) {
    if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {

        layerPage01 = SysConfig.ToolBox.openWindow('../knww/page/wwjcxx.html?rowid=' + id + '&knbh=' + knbh, "详情", $(window).width(), $(window).height())

    } else {
        layerPage01 = SysConfig.ToolBox.openWindow('../knww/page/carrierDetail.html?type=rk&rowid=' + id + '&knbh=' + knbh, "详情", $(window).width(), $(window).height())

    }
}

function QueryRun(jllx) {

    if (jllx == "所有") {
        where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH2020042016161605625408",
            XDLMC: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),//库房名
            XDLMB: "入库",//操作类型
            QueryType: $("#cxlb").val(),
            QueryKey: $("#queryK").val(),
        };

        
    }else {

        where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH2020042016161605625408",
            XDLMA: jllx,
            XDLMC: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),//库房名
            XDLMB: "入库",//操作类型
            QueryType: $("#cxlb").val(),
            QueryKey: $("#queryK").val(),
        };
    }
    if(SysConfig.UserInfo.GetCookieName("kflx")=="拓片"){
        //拓片系统
        qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("拓片入库流水记录");
        where.XDLMD="拓片"

    }else if(SysConfig.UserInfo.GetCookieName("kflx")=="文物"){
        //文物系统
        qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("文物入库流水记录");
        where.XDLMD="文物"

    }
    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 15);
    // tableins.reload('mDataTable', {
    //     id: 'mDataTable',
    //     where: where,
    //     page: {
    //         limits: [10, 50, 100, 300, 500],
    //         groups: 20,
    //         curr: 1
    //     },
    //     //page: {
    //     //    curr: 1 //重新从第 1 页开始
    //     //}
    // });
 
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
