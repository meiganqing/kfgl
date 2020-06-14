var tableins,cols,where;

layui.use(['element', 'table', 'layer', 'form', 'laydate'], function () {
    var form = layui.form,
        element = layui.element,
        $ = layui.jquery;
        laydate = layui.laydate,
        layer = layui.layer;
    // 权限设置文物入库流水
    //获取权限
   

    tableins = layui.table;
     where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH2020042016161605625408",
        XDLMC: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
        XDLMB: "出库,拒绝出库"
    };

    if(SysConfig.UserInfo.GetCookieName("kflx")=="拓片"){
        //拓片系统
        qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("拓片出库流水记录");
        where.XDLMD="拓片"

  
    
    }else if(SysConfig.UserInfo.GetCookieName("kflx")=="文物"){
        //文物系统
        qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("文物出库流水记录");
        where.XDLMD="文物"
    }



     cols = [
        [{
            checkbox: true,
            LAY_CHECKED: false
        }, {
            title: '序号',
            type: 'numbers',

        },
        // {
        //     field: 'zt',
        //     title: '记录图',
        //     width: '6%',
        //     align: 'center',
        //     templet: function (d) {
        //         //return ' <div class="list-img-mudule" style=""><img style = "max-width: 60px;max-height:60px;cursor: pointer;" src = "' + d.记录图.replace("_sss.", "_s") + '" alt = "" lay - event="scanPic" /></div>';
        //         //< img style = "max - width: 60px; max - height: 60px; cursor: pointer;" src = "getPictureUrl(d.图片地址.replace("_sss.", "_s"))" alt = "" lay - event="scanPic" /> ';
        //     }
        // },
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
            width: '10%',
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
        }
            ,
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
            width: '10%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.出库去向);
            }
        }
            ,
        {
            field: '审核人',
            title: '审核人',
            width: '6%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.审核人);
            }
        },
        {
            field: '审核时间',
            title: '审核时间',
            width: '10%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.审核时间);
            }
        },
        {
            field: '审核状态',
            title: '审核状态',
            width: '7%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.审核状态);
            }
        }
            , {
            title: '操作',
            fixed: "right",
            width: '14%',
            align: 'center',
            templet: function (d) {
                let tt = ""
                tt += ' <a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=ShowChuKuDan("' + d.id + '","' + d.文物库内编号 + '","' + d.记录表流水号 + '")>出(归)库单</a>';
                tt += '<a class="layui-btn layui-btn-xs layui-btn-green1 " onclick=kfshManage.ShowXQ("' + d.id + '","' + d.文物库内编号 + '")>文物信息</a>';
                if (qx[0].Limit.isFW) {

                }
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

                // tt += ' <a class="layui-btn layui-btn-danger layui-btn-xs" onclick=Edit("删除","' + d.id + '") lay-event="del">删除</a>';

                // return tt;
            }
        }

        ]
    ];
    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '出库列表', cols, where,15);

//文物信息导出，入库单导出
 


 if (!qx[0].Limit.isDC) {
    $("#outfile").addClass("layui-hide")
}
// 查询类别
kfDataManage.GetJiLuQueryList();

    //记录时间的切换
    laydate.render({
        elem: '#start',
        range: true,
        done: function (value, date, endDate) {

            console.log(value)
            if(value){
                where.startTime = value.split(" - ")[0];
                where.endTime = value.split(" - ")[1];
                tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '出库列表', cols, where,15);
            }else{
                QueryRun($("#jllx").val()) 
            
            }
           
        }
    });
// 时间记录
    form.on("select(cxlb)", function (data) {
        // searchDateType(data)
    })

    // 记录类型
    form.on("select(selxmz)", function (data) {
        QueryRun(data.value);
    })

    //搜索
    $('#searchData').click(function () {
        QueryRun($("#jllx").val());
    });
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


    //出库单导出 暂时不展示
    $("#outfileCKD").click(function () {
        var knbhPrint = [];
        var lsjlPrint = [];
        layui.use('table', function () {
            var table = layui.table;
            var checkStatus = table.checkStatus('tableLayui'),
                data = checkStatus.data;
            for (var i = 0; i < data.length; i++) {
                knbhPrint.push(data[i]['文物库内编号']);
                lsjlPrint.push(data[i]['记录表流水号'])
            }

            printAllList(knbhPrint.join(","), lsjlPrint.join(","), '出库单')
        });
    })

    //刷新表格
    $("#updateTable").click(function () {
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '出库列表', cols, where,15);
    })

    form.render();
});



//删除

function Edit(eventName, mKNBH) {
    switch (eventName) {
    
        case "删除":
            // SysConfig.SubSystemData.SYKFGL.PLSC([{ id: mKNBH }], '4000', 'DYBH201908231246284628217254', Callback);
                 SysConfig.SubSystemData.SYKFGL.PLSC([{ id: mKNBH }], '4000', 'DYBH20190823124628462882234', Callback);
            break;

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

//
function QueryRun(jllx) {
    if (jllx == "所有") {
        where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH2020042016161605625408",
            XDLMC: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),//库房名
            XDLMB: "出库,拒绝出库",
            QueryType: $("#cxlb").val(),
            QueryKey: $("#queryK").val(),
        };
    }
    else {

        where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH2020042016161605625408",
            XDLMA: jllx,
            XDLMC: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),//库房名
            XDLMB: "出库,拒绝出库",
            QueryType: $("#cxlb").val(),
            QueryKey: $("#queryK").val(),
        };
    }


    if(SysConfig.UserInfo.GetCookieName("kflx")=="拓片"){
        //拓片系统
        qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("拓片出库流水记录");
        where.XDLMD="拓片"
    }else if(SysConfig.UserInfo.GetCookieName("kflx")=="文物"){
        //文物系统
        qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("文物出库流水记录");
        where.XDLMD="文物"
    }

    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 15);
}

// 记录时间
function searchDateType(data) {
    if (data.value == "记录时间") {
        $("#serachDate").removeClass("layui-hide")
        $("#keyWord").addClass("layui-hide")
    } else {
        where.startTime = "";
        where.endTime = "";
        $("#keyWord").removeClass("layui-hide")
        $("#serachDate").addClass("layui-hide")
    }
}

//出库归库单子
function ShowChuKuDan(id,knbh,lsh){
    // if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {
        SysConfig.ToolBox.openWindow('ckHtml.html?rowid=' + id + '&knbh=' + knbh + "&type=ck" + "&lsh=" + escape(lsh), "出库单", $(window).width(), $(window).height())
    // } else {
    //     SysConfig.ToolBox.openWindow('ckHtml.html?rowid=' + id + '&knbh=' + knbh + "&type=rk", "出库单", $(window).width(), $(window).height())

    // }
}