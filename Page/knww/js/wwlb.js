/*
 * @陕西唐远
 * @文件名: 
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-12-09 10:20:06
 * @描述: 
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:   1 2019-12-09 zlb 更换列表、查询接口
 */
var tableins = "",uploadImg = "", UploadTable, UploadTableData = [],laytpl, fztype, where, qx, $;

layui.use(['element', 'table', 'layer', 'laytpl', 'form','upload'], function () {
    tableins = layui.table;
    element = layui.element,
        layer = layui.layer;
    form = layui.form;
    laytpl = layui.laytpl;
    $ = layui.jquery

    UploadTable = layui.table;
    upload = layui.upload;

    var wwgroup = unescape(window.location.href.getQuery("wwgroup"));
    console.log(wwgroup)
    if(wwgroup == "null"){   
        where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823124628462889251",
            XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage")
        };
        
    }else{  //文物组的包含文物
        where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823124628462889251",
            XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
            XDLMP: wwgroup
        };
    }
   

    //获取权限
    qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("文物列表");
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




    //
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
            field: 'zt',
            title: '记录图',
            width: '8%',
            align: 'center',
            templet: function (d) {
                return ' <div class="list-img-mudule" style=""  onclick=imgclick("' + d.文物库内编号 + '")><img style = "max-width: 60px;max-height:60px;cursor: pointer;" src = "' + d.图片地址.replace("_sss.", "_s.") + '" alt = "" lay - event="scanPic" /></div>';
                //< img style = "max - width: 60px; max - height: 60px; cursor: pointer;" src = "getPictureUrl(d.图片地址.replace("_sss.", "_s"))" alt = "" lay - event="scanPic" /> ';
            }
        }, {
            field: '登记名称',
            title: '名称',
            width: '15%',
            align: 'center',
            templet: function (d) {
                return '<a href="javascript:;"  style="color:blue;"  onclick=kfshManage.ShowXQ("' + d.id + '","' + d.文物库内编号 + '")>' + SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.登记名称)+'</a>'; 
            }
        },
        {
            field: '现藏品总登记号',
            title: '原登记号',
            width: '12%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.现藏品总登记号);
            }
        }, {
            field: '文物库内编号',
            title: '现登记号',
            width: '10%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.文物库内编号);
            }
        },
        {
            field: '年代_纪年选项A',
            title: '文物年代',
            width: '10%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.年代_纪年选项A);
            }
        },
        {
            field: '文物类别_具体类别',
            title: '文物类别',
            width: '10%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.文物类别_具体类别);
            }
        },
        {
            field: '外形尺寸',
            title: '外形尺寸',
            width: '18%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.外形尺寸);
            }
        },
        {
            field: '完残程度',
            title: '完残程度',
            width: '7%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.完残程度);
            }
        },
        {
            field: '文物级别',
            title: '文物级别',
            width: '10%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.文物级别);
            }
        },
        {
            field: '质量_具体质量',
            title: '质量_具体质量',
            width: '6%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.质量_具体质量);
            }
        },
        {
            field: '数量',
            title: '数量',
            width: '5%',
            align: 'center',
            templet: function (d) {
                return d.数量_件套 + "组" + d.数量 + d.数量单位;
                // return d.数量 + d.数量单位;
            }
        },
    
        {
            field: '考古发掘信息_领队',
            title: '领队',
            width: '5%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.考古发掘信息_领队);
            }

        },
        {
            field: '考古发掘信息_出土地点',
            title: '出土地点',
            width: '10%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.考古发掘信息_出土地点);
            }
        },
        {
            field: '',
            title: '位置',
            width: '8%',
            align: 'center',
            templet: function (d) {
                return '<p>' + d.柜架号 + d.层号 + d.分区号 + '</p><p style="color:red;">' + d.保管信息_保存位置及编号 + '</p>';
            }
        },
        {
            field: '库存状态',
            title: '库存状态',
            width: '5%',
            align: 'center',
            //templet: '#colorKCZT'
            templet: function (d) {
                let str = "";
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
            width: '13%',
            align: 'center',
            templet: function (d) {
                let tt = '  <a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=Edit("标签","' + d.文物库内编号 + '")>标签</a>';

                if (qx[0].Limit.isBJ) {

                    if (d.库存状态 == '在库' || d.库存状态 == '归还入库' || d.库存状态 == '暂存') {
                        tt += '<a class="layui-btn layui-btn-xs layui-btn-green1 " onclick=Edit("出库","' + d.文物库内编号 + '")>出库</a>';
                        tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=Edit("编辑","' + d.文物库内编号 + '") lay-event="edit">编辑</a>';
                    }
                    else if (d.库存状态 == '待入库' || d.库存状态 == '待出库') {
                        //  tt += '<a class="layui-btn layui-btn-xs layui-btn-disabled" style="background: rgb(201, 201, 201);color: #FFFFFF;" onclick=edit("' + d.id + '")>归还</a>';
                    }
                    else if (d.库存状态 == '修改中') {
                        //  tt += '<a class="layui-btn layui-btn-xs layui-btn-disabled" style="background: rgb(201, 201, 201);color: #FFFFFF;" onclick=edit("' + d.id + '")>归还</a>';
                    }
                    else {
                        tt += '<a class="layui-btn layui-btn-xs layui-btn-warm" style="background: rgb(201, 201, 201);color: #FFFFFF;" onclick=Edit("归还","' + d.文物库内编号 + '")>归还</a>';
                    }

                }
                //if (qx[0].Limit.isSH) {
                //    tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=editSys("' + d.onlynum + '") lay-event="edit">配置系统</a>';
                //    tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=editRole("' + d.onlynum + '") lay-event="edit">配置角色</a>';
                //}
                if (qx[0].Limit.isSC) {
                    tt += ' <a class="layui-btn layui-btn-danger layui-btn-xs" onclick=Edit("删除","' + d.id + '") lay-event="del">删除</a>';
                }
                return tt;
            }
        }

        ]
    ];
    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 7);


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
                XDLMSID: "DYBH20190823124628462889251",
                XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
            };
        } else {
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823124628462889251",
                XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                XDLMB: data.value,

            };
        }
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 7);
    })

    form.on("select(cxlb)", function (data) {
        changeSearchType(data.value)

    })


    $('#searchData').click(function () {

        switch ($("#cxlb").val()) {
            case "模糊查询":
                where = {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH20190823124628462889251",
                    XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                    QueryType: '模糊查询',
                    QueryKey: $('#queryK').val()
                };
                break;
            case "XDLMP":
                where = {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH20190823124628462889251",
                    XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                    XDLMP: $("#groupkeyWords").val()
                };
                break;
            case "warehouse":
                where = {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH20190823124628462889251",
                    XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                    XDLMR: $("#柜架号").val(),
                    XDLMS: $("#层号").val(),
                    XDLMT: $("#分区号").val()
                };
                break;
            default:
                where = {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH20190823124628462889251",
                    XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),

                };
                where[$("#cxlb").val()] = $('#queryK').val()
                break;

        }
        if ($("#zkzt").val() != "所有") {
            where.XDLMB = $("#zkzt").val();
        }

        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 7);

    });


    $("#searchDataAll").click(function () {
        layerPage01 = SysConfig.ToolBox.openWindowByDIV($("#multipleSearchData"), "多条件查询,带有*的可模糊检索", 850, 700)
        getSearchTpl()
    })
    
    $("#searchdata2").click(function () {
        where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823124628462889251",
            XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
        };
        $(".searchText").each(function (key, val) {
            if ($(val).val().trim() != "") {
                where[$(val).attr("name")] = $(val).val();
            }
        })
        if ($("#zkzt").val() != "所有") {
            where.XDLMB = $("#zkzt").val();
        }
        ;
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 7);
        layer.close(layerPage01)
        return false
    })


    //扫码出库
    $("#barcodeOutStore").click(function () {
        layerPage01 = SysConfig.ToolBox.openWindow('outStoreAll.html?wwlx=ww', " ", $(window).width(), $(window).height());
    })
    //扫码归库
    $("#barcodeReturnStore").click(function () {
        layerPage01 = SysConfig.ToolBox.openWindow('returnStoreAll.html?wwlx=ww', " ", $(window).width(), $(window).height());
    })

    $("#dtjcx").click(function () {
        layerPage01 = openWindow(1, $("#dtjcxHtml"), "小提示：[组合查询适用于精确查询，应尽量输入较少的关键字，以便获取更多的查询结果]", 800, 420)
    })
    $("#bjfz").click(function () {
        layerPage01 = openWindow(2, 'add_fz.html', " ", $(window).width(), $(window).height())
    })
    //导出标签
    $('#batchLabel').click(function (e) {
        var ids = [];

        var checkStatus = tableins.checkStatus('mDataTable'),
            data = checkStatus.data;
        for (var i = 0; i < data.length; i++) {
            ids.push(data[i]['文物库内编号']);
        }

        var reData_fq = SysConfig.SubSystemData.SYKFGL.PostData("BatchItemQRCodeExport", {
            TblNum: "305",
            XDLM文物库内编号: ids.join(',')
        });
        if (reData_fq.success) {
            window.location = o.FilePath;
        }
        
    });

    //导出
    $('#outfile').click(function (e) {
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
                                XDLMSID: "DYBH2020041514514605517789",
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
        var ids = [], flag = true;
        var checkStatus = tableins.checkStatus('mDataTable'),
            data = checkStatus.data;
        for (var i = 0; i < data.length; i++) {
            if (data[i]['库存状态'] == "在库" || data[i]['库存状态'] == "归还入库") {
                ids.push(data[i]['文物库内编号']);
            } else {
                flag = false;
                break;
            }

        }


        if (flag) {
            //batchCK("WenWuChuKu", ids, "WWDJBID", '305')
            if (ids.length == 0) {
                layer.msg('请先选中行！', {
                    title: '提示框',
                    icon: 0,
                    time: 800
                });
            } else {
                layerPage01 = SysConfig.ToolBox.openWindow('outStoreAll.html?wwlx=ww&ids=' + ids.join(','), " ", $(window).width(), $(window).height())
            }
        }else{
            layer.msg("请选择在库的登记表")
        }

        // if (ids.length == 0) {
        //     layer.msg('请先选中行！', {
        //         title: '提示框',
        //         icon: 0,
        //         time: 800
        //     });
        // } else {
        //     if (flag) {
        //         //batchCK("WenWuChuKu", ids, "WWDJBID", '305')
        //         layerPage01 = SysConfig.ToolBox.openWindow('outStoreAll.html?wwlx=ww&ids=' + ids.join(','), " ", $(window).width(), $(window).height())
        //     }else{
        //         layer.msg("请选择在库的登记表")
        //     }
        // }

        

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
                break;
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
                layerPage01 = SysConfig.ToolBox.openWindow('returnStoreAll.html?wwlx=ww&ids=' + ids.join(','), " ", $(window).width(), $(window).height());
            }
        }else{
            layer.msg("请选择已出库的登记表")
        }

    })

    $("#funtionOperate").click(function () {
        layer.open({
            type: 1,
            area: ['910px', '70px'],
            fix: false, //不固定
            shade: 0.3,
            title: false,
            content: $("#operateBtn"),
            anim: 5,
            resize: false,
            success: function (layero) {

            },

        });
        //			layerPage01=openWindow(1, $("#operateBtn"), "", 600, 80)
    })

    //文物分组
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
            SysConfig.ToolBox.openWindow('volumeGroup.html?wwlx=ww&ids=' + ids.join(","), "文物组", $(window).width() - 100, $(window).height() - 100)

        }
    })
    //编辑分组
    $("#editgrounp").click(function () {
        layerPage01 = SysConfig.ToolBox.openWindow('../../xtgl/wwz.html?tabnum=305', "文物组", $(window).width() - 100, $(window).height() - 100)
    })

    $("#addData").click(function () {
        layerPage01 = SysConfig.ToolBox.openWindow('/SYKFGL/Page/crkgl/xrkww.html', "新文物入库", $(window).width() - 10, $(window).height() - 10);
    })
    // 修改位置
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
            SysConfig.ToolBox.openWindow('../../kfgl/page/scanStore.html?wwlx=ww&ids=' + ids.join(","), "位置信息", $(window).width() - 800, $(window).height() - 320);
        }
    })
    // 批量修改
    $("#alledit").click(function () {
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
            SysConfig.ToolBox.openWindow('./Modifybatch.html?ids=' + ids.join(","), "位置信息", $(window).width() - 800, $(window).height() - 320)
        }
    })

     // 一键导入
     $("#tolead").click(function(){

        layerPage01 = SysConfig.ToolBox.openWindow('/SYKFGL/Page/knww/page/uploading.html', "批量导入", $(window).width() - 800, $(window).height() - 320);

     })



    form.render();
});



//点击查看图片
function imgclick(ddata) {
    console.log(ddata)
    let returndata = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462851271",
        XDLMC: ddata
    });
    if (returndata.success) {
        if (returndata.rows && returndata.rows.length > 0) {
            let imghost = ""
            for (let i = 0; i < returndata.rows.length; i++) {
                imghost += returndata.rows[i].图片地址 + ","
            }

            lookPic(imghost.substring(0, imghost.lastIndexOf(",")))
        }
    }

}



//点击图片看所有图



function Edit(eventName, mKNBH) {
    switch (eventName) {
        case "scanPic":
            let returndata = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823124628462851271",
                XDLMA: "305",
                XDLMC: mKNBH
            });
            if (returndata.success) {
                if (returndata.rows && returndata.rows.length > 0) {
                    let imghost = ""
                    for (let i = 0; i < returndata.rows.length; i++) {
                        imghost += returndata.rows[i].图片地址 + ","
                    }
                    lookPic(imghost.substring(0, imghost.lastIndexOf(",")))
                }
            } else {
                lookPic(data['图片地址'])
            }
            break;
        case "详情":
            SysConfig.ToolBox.openWindow('wwjcxx.html?knbh=' + mKNBH, "详细信息", $(window).width(), $(window).height());
            break;
        case "出库":
            SysConfig.ToolBox.openWindow('wwckdjb.html?type=ww&knbh=' + mKNBH, "详细信息", $(window).width(), $(window).height());
            break;
        case "归还":
            SysConfig.ToolBox.openWindow('ghwwdjb.html?knbh=' + mKNBH, "归还", $(window).width(), $(window).height())
            break;
        case "ckd":
            SysConfig.ToolBox.openWindow('../../crkgl/ckHtml.html?knbh=' + mKNBH + "&type=ck" + "&TblNum=305", "详细信息", $(window).width(), $(window).height())
            break;
        case "编辑":
            SysConfig.ToolBox.openWindow("../../crkgl/xrkww.html?type=modify&knbh=" + mKNBH, "详细信息", $(window).width(), $(window).height())
            break;
        case "标签":
            SysConfig.ToolBox.openWindow('printQRCode.html?knbh=' + mKNBH + '&type=2', "标签打印", 480, 300);
            break;
        case "删除":
            SysConfig.SubSystemData.SYKFGL.PLSC([{ id: mKNBH }], '4000', 'DYBH201908231246284628217254', Callback);
            break;

    }
}


function getSearchTpl(data) {
    $("#multipleSearchDataContent").empty()
    var getTpl = searchTpl.innerHTML;
    $("#multipleSearchDataContent").append(getTpl)
    // laytpl(getTpl).render(data, function(html) {
    //     $("#multipleSearchDataContent").append(html)
    // });
}

 
function changeWhere() {
    where.QueryType = $("#cxlb").val();
    $(".search-type").each(function (key, val) {

        if ($(val).hasClass("layui-hide")) {

        } else {

            if ($(val).attr("id") == "warehouseDiv") {
                where.QueryKey = "";
                where.mCNTRNo = $("#柜架号").val();
                where.mLevelNo = $("#层号").val();
                where.mAreaNo = $("#分区号").val();

            } else {

                where.QueryKey = $(val).find(".key-words").val();
                where.mCNTRNo = "";
                where.mLevelNo = "";
                where.mAreaNo = "";
            }

        }
    })
}

function changeSearchType(value) {
    if (value == "XDLMP") { //分组
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

function ChukuCallback(knbh,lsh) {

    outputFile.OutPutGuiKu("是否打印出库单？", knbh, lsh, "", "出库单");
}



// 查看图片
function lookPic(doc, index, num) {
    // console.log(doc)
    var num_
    num ? num_ = num : num = "03"
    if (index) { //新添加的图片的查看，在函数中直接点击会陷入死循环
        if (index == "批次导入") {
            ShowVideo(false, doc, '90%', '90%', 1, "03");
        } else if (index == "系统上传") {
            ShowVideo(false, doc, '90%', '90%', 1, "01");
        } else {
            doc = fileend[index]
            ShowVideo(false, doc, '90%', '90%', 1, "01");
        }
    } else {
        ShowVideo(false, doc, '90%', '90%', 1, "01");
    }

}

function ShowVideo(mtitle, mpath, w, h, clobtn, system) {
    if (mpath == '') {
        layer.msg('未找到文件');
    } else {

        var yl = false;
        var index = mpath.lastIndexOf("\.");
        var r = mpath.substring(index + 1, mpath.length);
        var url = "/SYKFGL/widget/video/ShowVideo.html?path=" + mpath;
        switch (r.toLowerCase()) {
            case "doc":
            case "docx":
                // case "txt":
            case "zip":
            case "rar":
            case "xls":
            case "xlsx":

                let mpaths = mpath.substring(0, mpath.lastIndexOf(".") + 1)
                console.log(mpaths)
                url = '/SYKFGL/widget/pdfViewer/pdfView.html?path=' + mpaths + 'pdf';
                // yl = true;
                break;
            case "pdf":
                url = '/SYKFGL/widget/pdfViewer/pdfView.html?path=' + mpath;
                yl = true;
                break;
            case "png":
            case "jpg":
            case "bmp":
            case "gif":
            case "jpeg":
            case "tiff":
            case "psd":
            case "svg":
                if (getScanPictureType(system, mpath)) {
                    url = getScanPictureType(system, mpath)
                    yl = true;
                } else {
                    yl = false;
                }

                break;
            case "3gp":
            case "asf":
            case "avi":
            case "flv":
            case "mkv":
            case "mov":
            case "mp4":
            case "mpeg":
            case "n avi":
            case "rmvb":
            case "wmv":
            case "swf":
            case "mp5":
                url = "/SYKFGL/widget/video/ShowVideo.html?path=" + mpath;
                yl = true;
                break;
            default:
                yl = false;

        }
        if (yl) {
            if (clobtn) {
                clobtn = 1;
            } else {
                clobtn = clobtn;
            }
            var index = layer.open({
                type: 2,
                //      maxmin: true,
                content: url,
                area: [w, h],
                title: "附件",
                closeBtn: clobtn,
                shadeClose: true
            });
        } else {
            layer.msg('当前格式暂不支持预览', {
                icon: 2,
                time: 2000,
                anim: 5
            });
        }

    }

}

//判断是哪一种查看图片的方式
function getScanPictureType(pictureType, path) {
    //	pictureType  01最基本的查看图片的形式
    //	pictureType  02最基本的查看切片的形式
    //	pictureType  03可以在切片上画图的形式
    var url = "";
    var imgPath = path.split(",")[0]
        //1)系统批量上传，切片大小自己获取

    if (pictureType == "03") {
        $.ajax({
            type: "GET",
            url: imgPath.split(".")[0] + "/ImageProperties.xml",
            async: false,
            success: function(dataxml) {
                var width_ = Number($(dataxml).find("IMAGE_PROPERTIES").attr("WIDTH"));
                var heigh_ = Number($(dataxml).find("IMAGE_PROPERTIES").attr("HEIGHT"));
                url = "/SYKFGL/Widget/measurablePicture/openTitleImage.html?h=" + heigh_ + "&w=" + width_ + "&path=" + imgPath
            },
            error: function() {

                url = '/SYKFGL/Widget/imgTools/ShowImage.html?path=' + imgPath;
                //				url = "/SYKFGL/Widget/measurablePicture/openTitleImage.html?h=" + "10000" + "&w=" + "1000" + "&path=" + "TP0000002/TP0000002/"
            }
        });

    } else if (pictureType == "02") {
        url = '/SYKFGL/widget/pictureDetail/showPicture.html?path=' + imgPath;

    } else if (pictureType == "01") {
        url = '/SYKFGL/Widget/imgTools/ShowImage.html?path=' + path;
    } else {
        url = '/SYKFGL/Widget/imgTools/ShowImage.html?path=' + imgPath;
    }
    return url;
}













 
function Callback() {
    UploadTable.reload("mDataTable", {
        data: UploadTableData
    });
}