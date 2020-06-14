/**
 * Created by xh on 2020/04/20.
 * 文件名: djblb.JS
 * 作　者: 徐航
 * 日　期: 2020/04/20
 * 描　述: 拓片列表增删改查
 * 版　本: 1.00
 * 修改历史纪录:
 * 版本     时间           姓名         内容
 2. 02   2020/04/20      徐航        拓片列表增删改查
 */
var tableins = "", laytpl, fztype, where, qx, $, table;
layui.use(["element", "table", "layer", "form"], function () {
    table = layui.table;
    element = layui.element,
    layer = layui.layer;
    form = layui.form;
    laytpl = layui.laytpl;
    $ = layui.jquery


    //获取权限
    qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("拓片列表");
    console.log(qx)
    //编辑权限
    if (!qx[0].Limit.isBJ) {
        $("#batchOutStore").addClass("layui-hide")
        $("#batchReturnStore").addClass("layui-hide")
        $("#barcodeOutStore").addClass("layui-hide")
        $("#barcodeReturnStore").addClass("layui-hide")
        $("#grounp").addClass("layui-hide")
        $("#editgrounp").addClass("layui-hide")
        $("#modifyPosition").addClass("layui-hide")
        $("#alledit").addClass("layui-hide")

        $("#addData").addClass("layui-hide")//新增文物

    }
    if (!qx[0].Limit.isDC) {
        $("#outfile").addClass("layui-hide")//导出权限
        $("#tolead").addClass("layui-hide")//批量导入
    }

    //



    
    where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231246284628202221",
        XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage")
    };

    if (window.location.href.getQuery("knbh") != null) {
        where.XDLMU = window.location.href.getQuery("knbh")
    }

    fztype = unescape(window.location.href.getQuery("fztype"))

    if (fztype !== "null") {
        $("#tableHeader").addClass("layui-hide")
        where.XDLMP = fztype
    } else {
        $("#tableHeader").removeClass("layui-hide")
    }

    var cols = [
        [{
            checkbox: true,
            LAY_CHECKED: false,
            width: '2%',
        }, {
            title: '序号',
            type: 'numbers'
        },
        {
            field: '文物库内编号',
            title: '现登记号',
            width: '9%',
            sort: true,
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.文物库内编号);
            }
        }, {
            field: '编号',
            title: '编号',
            width: '10%',
            sort: true,
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.编号);
            }
        },
        {
            field: '新编号',
            title: '新编号',
            width: '10%',
            sort: true,
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.新编号);
            }
        }, 
        // {
        //     field: '原始编号',
        //     title: '原始编号',
        //     width: '10%',
        //     sort: true,
        //     align: 'center',
        //     templet: function (d) {
        //         return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.原始编号);
        //     }
        // },

        {
            field: '登记名称',
            title: '名称',
            width: '15%',
            sort: true,
            align: 'center',
            templet: function (d) {
                return '<a href="javascript:;"  style="color:blue;"  onclick=kfshManage.ShowXQ("' + d.id + '","' + d.文物库内编号 + '")>' + SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.登记名称)+'</a>'; 
            }
        },
        {
            field: '载体一类型',
            title: '类型一',
            width: '10%',
            sort: true,
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.载体一类型);
            }
        },
        {
            field: '载体二类型',
            title: '类型二',
            width: '10%',
            sort: true,
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.载体二类型);
            }
        },
        {
            field: '位置',
            title: '位置',
            width: '9%',
            sort: true,
            align: 'center',
            templet: function (d) {
                return d.柜架号 + d.层号 + d.分区号;
            }
        },
        {
            field: '库存状态',
            title: '库存状态',
            width: '8%',
            sort: true,
            align: 'center',
            templet: function (d) {
                let colorValue;
                switch (d.库存状态) {
                    //case "同意出库": "orange"break;
                    //"拒绝出库": "red",
                    //"拒绝入库": "green",
                    case "在库":
                        colorValue = "green";
                        break;
                    case "待入库": colorValue = "#34A7D8";
                        break;
                    case "待出库": colorValue = "red";
                        break;
                    case "入库": colorValue = "green";
                        break;
                    case "新入库": colorValue = "red";
                        break;
                    case "归还入库": colorValue = "green";
                        break;
                    case "修改中": colorValue = "red";
                        break;
                }
                //if (d.审核状态) {
                //    str = '<span id="" style="color:{{statusColor(d['审核状态'])}}">{{ d['审核状态']}}</span>';
                //}
                //else {

                //}
                return '<span id="" style="color:' + colorValue + '">' + d.库存状态 + '</span>';

            }

        }, {
            field: '',
            title: '操作',
            fixed: "right",
            width: '17%',
            align: 'center',
            templet: function (d) {
        
                let html = `<a class="layui-btn layui-btn-xs" lay-event="label" onclick=Edit("标签","${d.文物库内编号}")>标签</a>`;
                html += `<a class="layui-btn layui-btn-xs layui-btn-normal" lay-event="editTP" onclick=Edit("描述","${d.文物库内编号}")>拓片描述</a>`;
                if (qx[0].Limit.isBJ) {
                if (d.库存状态 == '在库' || d.库存状态 == '归还入库' || d.库存状态 == '暂存') {
                    html += `<a class="layui-btn layui-btn-xs" lay-event="ck" onclick=Edit("出库","${d.文物库内编号}","${d.编号}")>出库</a>`;
                    html += `<a class="layui-btn layui-btn-xs layui-btn-warm" lay-event="edit" onclick=Edit("编辑","${d.文物库内编号}")>编辑</a>`;

                } else if(d.库存状态 == '待入库' || d.库存状态 == '待出库') {
                    html += `<a class="layui-btn layui-btn-xs layui-btn-disabled" lay-event="gh">归还</a>`;
                } else if (d.库存状态 == '修改中') {
                    html += `<a class="layui-btn layui-btn-xs layui-btn-disabled" lay-event="gh">归还</a>`;
                } else {
                    html += `<a class="layui-btn layui-btn-xs layui-btn-warm" lay-event="gh" onclick=Edit("归还","${d.文物库内编号}")>归还</a>`;
                }
               
               }
               if (qx[0].Limit.isSC) {
                html += `<a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del" onclick=Edit("删除","${d.id}")>删除</a>`;
                // let tt = '  <a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=Edit("标签","' + d.文物库内编号 + '")>标签</a>';
}
                // if (qx[0].Limit.isBJ) {

                    // if (d.库存状态 == '在库' || d.库存状态 == '归还入库' || d.库存状态 == '暂存') {
                    //     tt += '<a class="layui-btn layui-btn-xs layui-btn-green1 " onclick=Edit("出库","' + d.文物库内编号 + '")>出库</a>';
                    //     tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=Edit("编辑","' + d.文物库内编号 + '") lay-event="edit">编辑</a>';
                    // }
                    // else if (d.库存状态 == '待入库' || d.库存状态 == '待出库') {
                    //     //  tt += '<a class="layui-btn layui-btn-xs layui-btn-disabled" style="background: rgb(201, 201, 201);color: #FFFFFF;" onclick=edit("' + d.id + '")>归还</a>';
                    // }
                    // else if (d.库存状态 == '修改中') {
                    //     //  tt += '<a class="layui-btn layui-btn-xs layui-btn-disabled" style="background: rgb(201, 201, 201);color: #FFFFFF;" onclick=edit("' + d.id + '")>归还</a>';
                    // }
                    // else {
                    //     tt += '<a class="layui-btn layui-btn-xs layui-btn-warm" style="background: rgb(201, 201, 201);color: #FFFFFF;" onclick=Edit("归还","' + d.文物库内编号 + '")>归还</a>';
                    // }

                // }
                //if (qx[0].Limit.isSH) {
                //    tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=editSys("' + d.onlynum + '") lay-event="edit">配置系统</a>';
                //    tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=editRole("' + d.onlynum + '") lay-event="edit">配置角色</a>';
                //}
                // if (qx[0].Limit.isSC) {
                    // tt += ' <a class="layui-btn layui-btn-danger layui-btn-xs" onclick=Edit("删除","' + d.id + '") lay-event="del">删除</a>';
                // }
                return html;
            }
        }

        ]
    ];

    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(table, '拓片列表', cols, where, 16);


     //获取文物组下拉选项
     var reData_wwfz = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231246284628239261",
    });

    if (reData_wwfz.success) {
        $('#groupkeyWords').empty();
        for (var i = 0; i < reData_wwfz.rows.length; i++) {
            $('#groupkeyWords').append('<option value="' + reData_wwfz.rows[i].groupName + '">' + reData_wwfz.rows[i].groupName + '</option>');
        }

    }

    kfDataManage.GetGuiJia();

    form.on("select(柜架号)", function (data) {
        kfDataManage.GetCengHao();
        form.render("select")
    })
    form.on("select(层号)", function (data) {
        kfDataManage.GetFenQu;
        form.render("select")
    })

    form.on('select(zkzt)', function (data) { //切换在库状态
        if (data.value == "所有") {
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH201908231246284628202221",
                XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
            };
        } else {
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH201908231246284628202221",
                XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                XDLMA: data.value
            };
        }
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '拓片列表', cols, where, 17);
    })

    form.on("select(queryT)", function (data) {
        changeSearchType(data.value);
    })

   

    $("#addData").click(function () {
        layerPage01 = SysConfig.ToolBox.openWindow('/SYKFGL/Page/knww/page/add_carrier.html', "新拓片入库", $(window).width() - 10, $(window).height() - 10);
    })

    $('#searchData').click(function () {
        switch ($("#queryT").val()){
            case "模糊查询":
                where = {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH201908231246284628202221",
                    XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                    QueryType: '模糊查询',
                    QueryKey: $('#queryK').val()
                }
                break;
            case "XDLMI": //文物组
                where = {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH201908231246284628202221",
                    XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                    XDLMI: $('#groupkeyWords').val()
                }
                break;
            case "warehouse":
                where = {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH201908231246284628202221",
                    XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                    XDLMGJ: $('#柜架号').val(),
                    XDLMCH: $('#层号').val(),
                    XDLMFQ: $('#分区号').val()
                }
                break;
            default:
                where = {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH201908231246284628202221",
                    XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),

                };
                where[$("#queryT").val()] = $('#queryK').val()
                break;
        }
        if ($("#zkzt").val() != "所有") {
            where.XDLMA = $("#zkzt").val();
        }
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '拓片列表', cols, where, 17);
    })



    // 多条件查询
    $("#searchDataAll").click(function () {
        layerPage01 = SysConfig.ToolBox.openWindowByDIV($("#multipleSearchData"), "多条件查询,带有*的可模糊检索", 980, 500)
        getSearchTpl();
    })

    // 多条件查询执行
    $("#searchdata2").click(function () {
        where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH201908231246284628202221",
            XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
        };
        $(".searchText").each(function (key, val) {
            if ($(val).val().trim() != "") {
                where[$(val).attr("name")] = $(val).val();
            }
        })
        if ($("#zkzt").val() != "所有") {
            where.XDLMA = $("#zkzt").val();
        }
        
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '拓片列表', cols, where, 17);
        layer.close(layerPage01)
        return false
    })

    //选择行导出
    $('#outfile').click(function (e) {
        var ids = [];
        var checkStatus = tableins.checkStatus('mDataTable'),
            data = checkStatus.data;
        for (var i = 0; i < data.length; i++) {
            ids.push(data[i].id);
        }
        if (ids.length == 0) {
            layer.msg('请先选中行！', {
                title: '提示框',
                icon: 0,
                time: 1000
            });
        } else {
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
                                XDLMSID: "DYBH2020042615464402238748",
                                XDLMB: ids.join(',')
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
      
    //批量出库
    $("#batchOutStore").click(function () {
        var ids = [];
        var flag = true;
        var checkStatus = tableins.checkStatus('mDataTable'),
            data = checkStatus.data;
            console.log(ids)

            
        for (var i = 0; i < data.length; i++) {
            if (data[i]['库存状态'] == "在库" || data[i]['库存状态'] == "归还入库") {
                ids.push(data[i]['文物库内编号']);
            } else {

                flag = false;
                layer.msg("请选择在库的登记表")
                break;
                return flag
            }

        }
        if (flag) {
            if (ids.length == 0) {
                layer.msg('请先选中行！', {
                    title: '提示框',
                    icon: 0,
                    time: 800
                });
            } else {

                layerPage01 = SysConfig.ToolBox.openWindow('outStoreAll.html?wwlx=tp&ids=' + ids.join(','), " ", $(window).width(), $(window).height())
            }
        }

    })

    //批量归库
    $("#batchReturnStore").click(function () {
        var ids = [];
        var flag = true;
        var checkStatus = tableins.checkStatus('mDataTable'),
            data = checkStatus.data;
        for (var i = 0; i < data.length; i++) {
            if (data[i]['库存状态'] == "在库" || data[i]['库存状态'] == "归还入库" || data[i]['库存状态'] == "待入库" || data[i]['库存状态'] == "待出库") {

                flag = false;
                layer.msg("请选择已出库的登记表")
                break;
                return flag
            } else {
                ids.push(data[i]['文物库内编号']);

            }

        }
        if (flag) {
            if (ids.length == 0) {
                layer.msg('请先选中行！', {
                    title: '提示框',
                    icon: 0,
                    time: 800
                });
            } else {

                layerPage01 = SysConfig.ToolBox.openWindow('returnStoreAll.html?wwlx=tp&ids=' + ids.join(','), " ", $(window).width(), $(window).height());
            }
        }

    })

    //扫码出库
    $("#barcodeOutStore").click(function () {
        layerPage01 = SysConfig.ToolBox.openWindow('outStoreAll.html?wwlx=tp', " ", $(window).width(), $(window).height());
    })

    //扫码归库
    $("#barcodeReturnStore").click(function () {
        layerPage01 = SysConfig.ToolBox.openWindow('returnStoreAll.html?wwlx=tp', " ", $(window).width(), $(window).height());
    })

     //拓片分组
     $("#grounp").click(function () {
        var ids = [];
        var checkStatus = tableins.checkStatus('mDataTable'),
            data = checkStatus.data;
        for (var i = 0; i < data.length; i++) {

            ids.push(data[i]['文物库内编号']);
        }
        if (ids.length == 0) {
            layer.msg('请先选中行！', {
                title: '提示框',
                icon: 0,
                time: 800
            });
        } else {
            // store.set("volumeGroup", ids.join(","))
            SysConfig.ToolBox.openWindow('volumeGroup.html?wwlx=tp&ids=' + ids.join(","), "拓片组", $(window).width() - 100, $(window).height() - 100)

        }
    })

    //编辑分组
    $("#editgrounp").click(function () {
        layerPage01 = SysConfig.ToolBox.openWindow('../../xtgl/wwz.html?tabnum=305', "拓片组", $(window).width() - 100, $(window).height() - 100)
    })

    // 位置修改
    $("#modifyPosition").click(function () {
        var ids = [];
        var checkStatus = tableins.checkStatus('mDataTable'),
            data = checkStatus.data;
        for (var i = 0; i < data.length; i++) {
            ids.push(data[i]['id']);
        }
        if (ids.length == 0) {
            layer.msg('请先选中行！', {
                title: '提示框',
                icon: 0,
                time: 800
            });
        } else {
            SysConfig.ToolBox.openWindow('../../kfgl/page/scanStore.html?wwlx=tp&ids=' + ids.join(","), "位置信息", $(window).width() - 800, $(window).height() - 320);
        }
    })

   







   // 一键导入
   $("#tolead").click(function(){

    layerPage01 = SysConfig.ToolBox.openWindow('/SYKFGL/Page/knww/page/uploading.html', "批量导入", $(window).width() - 400, $(window).height() - 300);

 })

    form.render();

});



function changeSearchType(value) {
    if (value == "XDLMI") { //文物组
        $("#XDLMPDiv").removeClass("layui-hide");
        $('#keyworDiv').addClass("layui-hide");
        $('#warehouseDiv').addClass("layui-hide");
        $("#queryK").val("")
    } else if (value == "warehouse") { //存放位置
        $("#warehouseDiv").removeClass("layui-hide");
        $("#XDLMPDiv").addClass("layui-hide");
        $('#keyworDiv').addClass("layui-hide");
        $("#queryK").val("")
    } else { //正常
        $("#keyworDiv").removeClass("layui-hide");
        $("#warehouseDiv").addClass("layui-hide");
        $("#XDLMPDiv").addClass("layui-hide");
    }
}
  
// 多条件查询模板
function getSearchTpl(data) {
    $("#multipleSearchDataContent").empty()
    var getTpl = searchTpl.innerHTML;
    $("#multipleSearchDataContent").append(getTpl)
    // laytpl(getTpl).render(data, function(html) {
    //     $("#multipleSearchDataContent").append(html)
    // });
}



function Edit(eventName, mKNBH, mBH) {
    switch (eventName) {
        // case "scanPic":
        //     let returndata = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        //         XDLMCID: "1001",
        //         XDLMSID: "DYBH20190823124628462851271",
        //         XDLMA: "305",
        //         XDLMC: mKNBH
        //     });
        //     if (returndata.success) {
        //         if (returndata.rows && returndata.rows.length > 0) {
        //             let imghost = ""
        //             for (let i = 0; i < returndata.rows.length; i++) {
        //                 imghost += returndata.rows[i].图片地址 + ","
        //             }
        //             lookPic(imghost.substring(0, imghost.lastIndexOf(",")))
        //         }
        //     } else {
        //         lookPic(data['图片地址'])
        //     }
        //     break;
        case "描述":
            SysConfig.ToolBox.openWindow('editPicture.html?knbh=' + mKNBH, "拓片信息", $(window).width(), $(window).height());
            break;
        case "详情":
            SysConfig.ToolBox.openWindow('wwjcxx.html?knbh=' + mKNBH, "详细信息", $(window).width(), $(window).height());
            break;
        case "出库":
            SysConfig.ToolBox.openWindow('wwckdjb.html?type=tp&knbh=' + mKNBH + '&bh=' + escape(mBH), "详细信息", $(window).width(), $(window).height());
            break;
        case "归还":
            SysConfig.ToolBox.openWindow('ghwwdjb.html?knbh=' + mKNBH, "归还", $(window).width(), $(window).height())
            break;
        case "ckd":
            SysConfig.ToolBox.openWindow('../../crkgl/ckHtml.html?knbh=' + mKNBH + "&type=ck" + "&TblNum=305", "详细信息", $(window).width(), $(window).height())
            break;
        case "编辑":
            SysConfig.ToolBox.openWindow("/SYKFGL/Page/knww/page/add_carrier.html?type=modify&knbh=" + mKNBH, "详细信息", $(window).width(), $(window).height())
            break;
        case "标签":
            //         layerPage04 = openWindow(
//           2,
//           "printQRCode.html?knbh=" + data["文物库内编号"] + "&type=1",
//           "标签打印",
//           350,
//           400
//         );
            SysConfig.ToolBox.openWindow('printQRCode.html?knbh=' + mKNBH + '&type=1', "标签打印", 350, 400);
            break;
        case "删除":
            SysConfig.SubSystemData.SYKFGL.PLSC([{ id: mKNBH }], '4000', 'DYBH201908231246284628195224', Callback);
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
    });
}

function ChukuCallback(knbh,lsh) {
    outputFile.OutPutGuiKu("是否打印出库单？", knbh, lsh, "", "出库单");
}

// function combinePositionTP(data) {
//   var position_ = "";
//   if (data["柜架号"]) {
//     position_ += data["柜架号"];
//   }
//   if (data["层号"]) {
//     position_ += data["层号"];
//   }
//   if (data["分区号"]) {
//     position_ += data["分区号"];
//   }
//   if (data["图筒"]) {
//     position_ += "(图筒：" + data["图筒"] + ")";
//   }
//   return "<p>" + position_ + "</p>";
// }

// function batchGroup(ids) {
//   //批量出库
//   if (ids.length == 0) {
//     layer.msg("请先选中行！", {
//       title: "提示框",
//       icon: 0,
//       time: 800,
//     });
//   } else {
//     store.set("volumeGroup", ids.join(","));
//     layerPage01 = openWindow(
//       2,
//       "volumeGroup.html?tabnum=386",
//       "",
//       $(window).width() - 100,
//       $(window).height() - 100
//     );
//   }
// }

// function getFenQu(datagj, data) {
//   postData(
//     "wwGetDataList",
//     {
//       TblNum: 151,
//       T1512: "EQ" + getCookieName("mCurrentStorage"),
//       T1513: "EQ" + datagj,
//       T1514: "EQ" + data,
//     },
//     function (data) {
//       getSelect("XDLM分区号", data.data, "分区号");
//       form.render("select");
//     }
//   );
// }

// function getCengHao(datagj) {
//   //获取柜架号
//   layui.use(["form"], function () {
//     postData(
//       "wwGetDataList",
//       {
//         TblNum: 158,
//         T1582: "EQ" + getCookieName("mCurrentStorage"),
//         T1583: "EQ" + datagj,
//       },
//       function (data) {
//         getFenQu(datagj, data.data[0]["层号"]);
//         getSelect("XDLM层号", data.data, "层号");
//         form.render("select");
//       }
//     );
//   });
// }

// function changeSearchType(value) {
//   $(".search-type").addClass("layui-hide");
//   if (value == "文物组" || value == "warehouse") {
//     $("#" + value + "Div").removeClass("layui-hide");
//   } else {
//     $("#keyworDiv").removeClass("layui-hide");
//   }
// }

// function cahngeWhere() {
//   where.QueryType = $("#searchType").val();
//   $(".search-type").each(function (key, val) {
//     if (!$(val).hasClass("layui-hide")) {
//       if ($(val).attr("id") == "warehouseDiv") {
//         where.QueryKey = "";
//         where.mCNTRNo = $("#XDLM柜架号").val();
//         where.mLevelNo = $("#XDLM层号").val();
//         where.mAreaNo = $("#XDLM分区号").val();
//       } else {
//         where.QueryKey = $(val).find(".key-words").val();
//         where.mCNTRNo = "";
//         where.mLevelNo = "";
//         where.mAreaNo = "";
//       }
//     }
//   });
// }

// function positionModify(ids) {
//   if (ids.length == 0) {
//     layer.msg("请先选中行！", {
//       title: "提示框",
//       icon: 0,
//       time: 800,
//     });
//   } else {
//     store.set("pisitionData", ids.join(","));
//     layerPage01 = openWindow(
//       2,
//       "../../kfgl/page/scanStore.html?&type=crList&TablNum=386",
//       "位置信息",
//       $(window).width() - 800,
//       $(window).height() - 400
//     );
//   }
// }
