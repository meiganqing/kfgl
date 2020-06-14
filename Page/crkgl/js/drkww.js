var tableins;

var where = {}, typeData = "", cols;
var colsend = "";
var form, $;

var tableData = "";
var knbhArry = [],
    lshArry = [];


layui.use(['jquery', 'element', 'table', 'layer', 'form'], function () {
    $ = layui.jquery;
    form = layui.form;
    tableins = layui.table;
    element = layui.element,
        layer = layui.layer;

    //权限设置


    if(SysConfig.UserInfo.GetCookieName("kflx")=="拓片"){
        qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("待入库拓片");

    }else{

        qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("待入库文物");
    }
    console.log(qx)
    if (!qx[0].Limit.isBJ) {
        $("#warehousing").addClass("layui-hide")
        $("#warehousingsScan").addClass("layui-hide")
   

    }
    if (!qx[0].Limit.isDC) {
        $("#outfile").addClass("layui-hide")
     

    }



    //

    //postData("GetItemType", "", function (data) {
    //    getSelect("wwtype", data.data, "TabChiName", "TableNum"); //获取拓片表和文物主表的下拉	
    //    if (listType == "305") {
    //        $("#wwtype").val("文物登记表")

    //    } else {
    //        limit = 15
    //        $("#wwtype").val("拓片资料列表")
    //        if (limitConfig("applyLimt", 2)) {
    //            $("#asyncData").removeClass("layui-hide")
    //        }
    //    }
    //    typeData = data.data;
    //    changeType($("#wwtype").val());
    //    getSearchModule(where.TblNum); //获取对应表的查询字段
    //    getTable("wwrk", where, 'drkww'); //调用函数显示表格
    //})
    if(SysConfig.UserInfo.GetCookieName("kflx") == "文物"){

        where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823124628462889251",
            XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
            XDLMB: "待入库"
    
        };

        cols = [
            [{
                checkbox: true,
                LAY_CHECKED: false,
                width: '2%',
            }, {
                title: '序号',
                type: 'numbers'
            },
            // {
            //     field: 'zt',
            //     title: '记录图',
            //     width: '7%',
            //     align: 'center',
            //     templet: function (d) {
            //         return ' <div class="list-img-mudule" style=""><img style = "max-width: 60px;max-height:60px;cursor: pointer;" src = "' + d.图片地址.replace("_sss.", "_s") + '" alt = "" lay - event="scanPic" /></div>';
            //         //< img style = "max - width: 60px; max - height: 60px; cursor: pointer;" src = "getPictureUrl(d.图片地址.replace("_sss.", "_s"))" alt = "" lay - event="scanPic" /> ';
            //     }
            // },
             {
                field: '登记名称',
                title: '名称',
                width: '15%',
                align: 'center',
                templet: function (d) {
                    return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.登记名称);
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
            //					{
            //						field: '文物级别',
            //						title: '文物级别',
            //						width: '5%',
            //						align: 'center',
            //						templet: '#colorWWJB'
            //					},
            {
                field: '文物类别_具体类别',
                title: '文物类别',
                width: '8%',
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
                width: '6%',
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
                width: '8%',
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
                    return d.数量 + d.数量单位;
                }
            },
            // {
            //     field: '数量单位',
            //     title: '单位',
            //     width: '5%',
            //     align: 'center',
            //     templet: '#colorDW'
            // },
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
                width: '16%',
                align: 'center',
                templet: function (d) {
                    // isFW: false,（访问）
                    // isBJ: false,（编辑）
                    // isSC: false,（删除）
                    // isDC: false,（导出）
                    // isSH: false,（审核）
                    let tt = "";//'  <a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=Edit("标签","' + d.文物库内编号 + '")>标签</a>';
                   
                    switch (d.库存状态) {
                      
                        case "待入库":
                            if (qx[0].Limit.isBJ) {
                                tt += '<a class="layui-btn layui-btn-xs layui-btn-green1 " onclick=kfshManage.ShowRKDan("' + d.id + '","' + d.文物库内编号 + '")>入库</a>';
                               
                            } else {
                                if (qx[0].Limit.isSH) {
                                    tt += '<a class="layui-btn layui-btn-xs layui-btn-warm " onclick=kfshManage.ShowSH("' + d.文物库内编号 + '","' + d.记录表流水号 + '","rk")>审核</a>';
                                }
                            }
                        break;
                    }

                    tt += '<a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=showrkd("' + d.id + '","' + d.文物库内编号 + '")>出(归)库单</a>';
                    // tt += '<a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=kfshManage.ShowChuKuDan("' + d.id + '","' + d.文物库内编号 + '")>出(归)库单</a>';
                    tt += '<a class="layui-btn layui-btn-xs layui-btn-green1 " onclick=kfshManage.ShowXQ("' + d.id + '","' + d.文物库内编号 + '")>文物信息</a>';

                    //删除
                    if (qx[0].Limit.isSC) {
                        tt += '<a class="layui-btn layui-btn-danger layui-btn-xs" onclick=del("' + d.id + '") lay-event="del">删除</a>';
                    }

    
                    return tt;
                }
            }
    
            ]
        ];

    }else{
        $('#cxdiv_tp').show();
        $('#cxdiv_ww').hide();
        where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH201908231246284628202221",
            XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
            XDLMA: "待入库"
    
        };

        cols = [
            [{
                checkbox: true,
                LAY_CHECKED: false,
                width: '2%',
            }, {
                title: '序号',
                type: 'numbers'
            },
            // {
            //     field: 'zt',
            //     title: '记录图',
            //     width: '7%',
            //     align: 'center',
            //     templet: function (d) {
            //         return ' <div class="list-img-mudule" style=""><img style = "max-width: 60px;max-height:60px;cursor: pointer;" src = "' + d.图片地址.replace("_sss.", "_s") + '" alt = "" lay - event="scanPic" /></div>';
            //         //< img style = "max - width: 60px; max - height: 60px; cursor: pointer;" src = "getPictureUrl(d.图片地址.replace("_sss.", "_s"))" alt = "" lay - event="scanPic" /> ';
            //     }
            // },
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
                field: '编号',
                title: '编号',
                width: '12%',
                align: 'center',
                templet: function (d) {
                    return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.编号);
                }
            }, {
                field: '登记名称',
                title: '名称',
                width: '15%',
                align: 'center',
                templet: function (d) {
                    return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.登记名称);
                }
            },
            //					{
            //						field: '文物级别',
            //						title: '文物级别',
            //						width: '5%',
            //						align: 'center',
            //						templet: '#colorWWJB'
            //					},
            {
                field: '年代',
                title: '年代',
                width: '6%',
                align: 'center',
                templet: function (d) {
                    return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.年代);
                }
            },
            {
                field: '数量',
                title: '数量',
                width: '6%',
                align: 'center',
                templet: function (d) {
                    return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.数量);
                }
            },
            {
                field: '载体一类型',
                title: '类型一',
                width: '10%',
                align: 'center',
                templet: function (d) {
                    return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.载体一类型);
                }
            },
            {
                field: '载体二类型',
                title: '类型二',
                width: '10%',
                align: 'center',
                templet: function (d) {
                    return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.载体二类型);
                }
            },
            {
                field: '',
                title: '位置',
                width: '10%',
                align: 'center',
                templet: function (d) {
                    return '<p>' + d.柜架号 + d.层号 + d.分区号 + '</p>';
                }
            },
            {
                field: '',
                title: '操作',
                fixed: "right",
                width: '20%',
                align: 'center',
                templet: function (d) {
                    // isFW: false,（访问）
                    // isBJ: false,（编辑）
                    // isSC: false,（删除）
                    // isDC: false,（导出）
                    // isSH: false,（审核）
                    //'  <a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=Edit("标签","' + d.文物库内编号 + '")>标签</a>';
                    let tt = "";
    
                    switch (d.库存状态) {
                        case "待入库":
                            if (qx[0].Limit.isBJ) {
                                tt += '<a class="layui-btn layui-btn-xs layui-btn-green1 " onclick=kfshManage.ShowRKDan("' + d.id + '","' + d.文物库内编号 + '")>入库</a>';
                            }else {
                                if (qx[0].Limit.isSH) {
                                    tt += '<a class="layui-btn layui-btn-xs layui-btn-warm " onclick=kfshManage.ShowSH("' + d.文物库内编号 + '","' + d.记录表流水号 + '","rk")>审核</a>';
                                }
                            }
                            break;
    
                    }
                    tt += '<a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=showrkd("' + d.id + '","' + d.文物库内编号 + '")>出(归)库单</a>';
                    tt += '<a class="layui-btn layui-btn-xs layui-btn-green1 " onclick=kfshManage.ShowXQ("' + d.id + '","' + d.文物库内编号 + '")>文物信息</a>';
    
                    if (qx[0].Limit.isSC) {
                        tt += ' <a class="layui-btn layui-btn-danger layui-btn-xs" onclick=del("' + d.id + '") lay-event="del">删除</a>';
                    }
    
                    return tt;
                }
            }
    
            ]
        ];
    }
    

    
    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 7);


    form.on("select(wwtype)", function (data) {
        // changeType(data.value)
        // getSearchModule(where.TblNum)
        tableins.reload({
            cols: colsend,
            where: where
        })

    });



    //$("#outfile").addClass("layui-hide")
    //$("#warehousing").addClass("layui-hide")
    //$("#warehousingsScan").addClass("layui-hide")

    // changeSearchType($("#cxlb").val()) //默认显示的
    form.on("select(cxlb)", function (data) {
        changeSearchType(data.value)
    })

    form.on("select(cxlb_tp)", function (data) {
        changeSearchType(data.value)
    })
    //获取文物组下拉选项

    // kfDataManage.GetWWQueryList();
    kfDataManage.GetWWGroup();
    kfDataManage.GetGuiJia();
    //}, function (data) {
    //    getSelect("groupkeyWords", data.data, "groupName");
    //    form.render("select")
    //})
    //获取位置下拉选项
    //postData("wwGetDataList", {
    //    TblNum: 147,
    //    T1472: "EQ" + getCookieName("mCurrentStorage")
    //}, function (data) {
    //    getCengHao(data.data[0]['柜架号'])
    //    getSelect("XDLM柜架号", data.data, "柜架号")
    //    form.render("select")
    //})
    form.on("select(柜架号)", function (data) {
        // getCengHao(data.value)
        kfDataManage.GetCengHao();
        form.render("select")
    })
    form.on("select(层号)", function (data) {
        //getFenQu($("#XDLM柜架号").val(), data.value)
        kfDataManage.GetFenQuo();
        form.render("select")
    })
    //table.on('tool(wwrk)', function (obj) {
    //    getRowColor(obj)
    //    var data = obj.data;
    //    switch (obj.event) {
    //        case "detail":
    //            if (where.TblNum == "305") {
    //                layerPage01 = openWindow(2, '../knww/page/wwjcxx.html?knbh=' + data['文物库内编号'], "详细信息", $(window).width(), $(window).height());

    //            } else if (where.TblNum == "386") {

    //                openWindow(2, '../knww/page/carrierDetail.html?knbh=' + data['文物库内编号'], "查看详情", $(window).width(), $(window).height());
    //            }
    //            break;
    //        case "approval":

    //            // if (limitConfig("storeLimt", 5)) {
    //            layerPage01 = openWindow(2, 'shzy.html?id=' + data['文物库内编号'] + '&type=rk', "审核", $(window).width(), $(window).height())
    //            // } else {
    //            //     layer.msg("您没有审核权限")
    //            // }
    //            break;
    //        case "output":
    //            // if (limitConfig("storeLimt", 2)) {

    //            //1.先选择位置
    //            store.set("pisitionData", data.id)
    //            tableData = data
    //            layerPage01 = openWindow(2, '../kfgl/page/scanStore.html?&type=rk&TablNum=' + where.TblNum + '&knbh=' + data['文物库内编号'], "位置信息", 500, 670)

    //            //2.审核通过，入库

    //            // } else {
    //            //     layer.msg("您没有编辑权限")
    //            // }
    //            break;
    //        case "scanPic":
    //            lookPic(data['图片地址'].split(",")[0])
    //            break;
    //    }
    //})


    $('#searchData').click(function () {
        //debugger;
        //changeWhere()
        //tableins.reload({
        //    where: where,
        //    page: {
        //        curr: 1
        //    }
        //});
        let kflx = SysConfig.UserInfo.GetCookieName("kflx");
        if(kflx == "文物"){
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
                case "文物组": //XDLMP
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
        }else{
            switch ($('#cxlb_tp').val()) {
                case "模糊查询":
                    where = {
                        XDLMCID: "1001",
                        XDLMSID: "DYBH201908231246284628202221",
                        XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                        QueryType: '模糊查询',
                        QueryKey: $('#queryK').val()
                    };
                    break;
                case "文物组": //XDLMP
                    where = {
                        XDLMCID: "1001",
                        XDLMSID: "DYBH201908231246284628202221",
                        XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                        XDLMI: $("#groupkeyWords").val()
                    };
                    break;
                case "warehouse":
                    where = {
                        XDLMCID: "1001",
                        XDLMSID: "DYBH201908231246284628202221",
                        XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                        XDLMGJ: $("#柜架号").val(),
                        XDLMCH: $("#层号").val(),
                        XDLMFQ: $("#分区号").val()
                    };
                    break;
                default:
                    where = {
                        XDLMCID: "1001",
                        XDLMSID: "DYBH201908231246284628202221",
                        XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
    
                    };
                    where[$("#cxlb_tp").val()] = $('#queryK').val()
                    break;
    
            }
        }




        // let cxlb_val;
        // if(kflx == "文物"){
        //     cxlb_val = $("#cxlb").val()
        // }else{
        //     cxlb_val = $("#cxlb_tp").val()
        // }

        // switch (cxlb_val) {
        //     case "模糊查询":
        //         if(kflx == "文物"){
        //             where = {
        //                 XDLMCID: "1001",
        //                 XDLMSID: "DYBH20190823124628462889251",
        //                 XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
        //                 QueryType: '模糊查询',
        //                 QueryKey: $('#queryK').val()
        //             };
        //         }else{
        //             where = {
        //                 XDLMCID: "1001",
        //                 XDLMSID: "DYBH201908231246284628202221",
        //                 XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
        //                 QueryType: '模糊查询',
        //                 QueryKey: $('#queryK').val()
        //             };
        //         }
                
            
        //         break;
        //     case "文物组": //XDLMP
        //         if(kflx == "文物"){
        //             where = {
        //                 XDLMCID: "1001",
        //                 XDLMSID: "DYBH20190823124628462889251",
        //                 XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
        //                 XDLMP: $("#groupkeyWords").val()
        //             };
        //         }else{
        //             where = {
        //                 XDLMCID: "1001",
        //                 XDLMSID: "DYBH201908231246284628202221",
        //                 XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
        //                 XDLMI: $("#groupkeyWords").val()
        //             };
        //         }
                
                
        //         break;
        //     case "warehouse":
        //         if(kflx == "文物"){
        //             where = {
        //                 XDLMCID: "1001",
        //                 XDLMSID: "DYBH20190823124628462889251",
        //                 XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
        //                 XDLMR: $("#柜架号").val(),
        //                 XDLMS: $("#层号").val(),
        //                 XDLMT: $("#分区号").val()
        //             };
        //         }else{
        //             where = {
        //                 XDLMCID: "1001",
        //                 XDLMSID: "DYBH201908231246284628202221",
        //                 XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
        //                 XDLMGJ: $("#柜架号").val(),
        //                 XDLMCH: $("#层号").val(),
        //                 XDLMFQ: $("#分区号").val()
        //             };
        //         }
                
        //         break;
        //     default:
        //         if(kflx == "文物"){
        //             where = {
        //                 XDLMCID: "1001",
        //                 XDLMSID: "DYBH20190823124628462889251",
        //                 XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
    
        //             };
        //         }else{
        //             where = {
        //                 XDLMCID: "1001",
        //                 XDLMSID: "DYBH201908231246284628202221",
        //                 XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
    
        //             };
        //         }
                
        //         where[$("#cxlb").val()] = $('#queryK').val()
        //         break;

        // }

        if(kflx == "文物"){
            where.XDLMB = "待入库";
        }else{
            where.XDLMA = "待入库";
        }

        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 7);

    });
    $("#dtjcx").click(function () {
        layerPage01 = openWindow(1, $("#dtjcxHtml"), "小提示：[组合查询适用于精确查询，应尽量输入较少的关键字，以便获取更多的查询结果]", 800, 450)
    })

    $("#warehousing").click(function () { //批量入库
        warehousing_x("入库");
    })
    $("#warehousingsScan").click(function () { //扫码入库
        //默认审核通过
        warehousing_x_Scan("入库")
    })

    //批量审核
    //		$("#batchApproval").click(function() {
    //			var ids = [];
    //			var flag = true;
    //			var checkStatus = table.checkStatus('tableLayui'),
    //				data = checkStatus.data;
    //			for(var i = 0; i < data.length; i++) {
    //				if(data[i]['审核状态'] == "") {
    //					ids.push({
    //						knbh: data[i]['文物库内编号'],
    //						lsnum: data[i]['记录表流水号']
    //					})
    //				} else {
    //					flag = false;
    //					layer.msg("请选择未审批的文物")
    //					break;
    //					return flag
    //				}
    //			}
    //			if(flag) {
    //				batchSP(ids, where.TblNum, 'rk')
    //
    //			}
    //
    //		})
    //		$("#asyncData").click(function (){
    //			layerPage01 = openWindow(2, "", "未同步拓片", 800, 450)
    //			
    //		})


    //导出
    // $('#outfile').click(function (e) {
    //     var ids = [];
    //     layui.use('table', function () {
    //         var table = layui.table;
    //         var checkStatus = table.checkStatus('tableLayui'),
    //             data = checkStatus.data;
    //         for (var i = 0; i < data.length; i++) {
    //             ids.push(data[i].id);
    //         }
    //     });
    //     e.preventDefault();

    //     outfile("305", ids, "T3051");
       
    // });

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
                            let where;
                            if(SysConfig.UserInfo.GetCookieName("kflx") == "文物"){
                                where = {
                                    XDLMCID: "5002",
                                    XDLMSID: "DYBH2020041514514605517789",
                                    XDLMB: ids.toString()  
                                }
                            }else{
                                where = {
                                    XDLMCID: "5002",
                                    XDLMSID: "DYBH2020042615464402238748",
                                    XDLMB: ids.toString()      
                                }
                            }
                            let returnData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", where);
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


    form.render();
});


function showrkd(id_, knbh_){
    SysConfig.ToolBox.openWindow("ckHtml.html?rowid=" + id_ + "&knbh=" + knbh_ + "&type=drk", "出(归)库单", $(window).width(), $(window).height());
}

function del(rowid){
    if(SysConfig.UserInfo.GetCookieName("kflx") == "文物"){
        SysConfig.SubSystemData.SYKFGL.PLSC([{ id: rowid }], '4000', 'DYBH201908231246284628217254', Callback);
    }else{
        SysConfig.SubSystemData.SYKFGL.PLSC([{ id: rowid }], '4000', 'DYBH201908231246284628195224', Callback);
    }

}


function warehousing_x(tip) { //批量入库
    var statusArry = [];
    tableId = []
    knbhArry = []
    lshArry = []

    var checkStatus = tableins.checkStatus('mDataTable'),
        data = checkStatus.data;
    for (var i = 0; i < data.length; i++) {
        knbhArry.push(data[i]['文物库内编号']);
        lshArry.push(data[i]['记录表流水号']);
        statusArry.push(data[i]['审核状态'])
        tableId.push(data[i].id)
    }

    if (knbhArry.length == 0) {
        layer.msg('请先选中行！', {
            title: '提示框',
            icon: 0,
            time: 800
        });
        return false
    } else {
        SysConfig.ToolBox.openWindow('/SYKFGL/page/kfgl/page/scanStore.html?type=rkAll&ids=' + tableId.join(','), "位置信息", $(window).width() - 800, $(window).height() - 120);
        //layerPage01 = openWindow(2, '../kfgl/page/scanStore.html?&type=rkAll&TablNum=' + where.TblNum, "位置信息", $(window).width() - 1200, $(window).height() - 100
    }
    

}

function warehousing_x_Scan(tip) { //批量扫码入库
    var statusArry = [];
    tableId = []
    knbhArry = []
    lshArry = []

    var table = layui.table;
    var checkStatus = tableins.checkStatus('mDataTable'),
        data = checkStatus.data;
    for (var i = 0; i < data.length; i++) {
        knbhArry.push(data[i]['文物库内编号']);
        lshArry.push(data[i]['记录表流水号']);
        statusArry.push(data[i]['审核状态'])
        tableId.push(data[i]["文物库内编号"])
       
    }



    //入库不需要审核
    //var storeType = "";
    //if (listType == "305") {
    //    storeType = "pisitionScanDataww";
    //} else if (listType == "386") {
    //    storeType = "pisitionScanDatatp";
    //}

    ////store.set(storeType, tableId.join(","))

    SysConfig.ToolBox.openWindow('../kfgl/page/scanQRCodeStore.html?&type=rkAll&ids=' + tableId.join(","), "位置信息", $(window).width(), $(window).height())


}

// function printAllchildren(TablNum, knbh, record) {
//     if (TablNum == "305") {
//         layerPage01 = openWindow(2, '../knww/page/wwDetail.html?TblNum=' + TablNum + '&knbh=' + knbh + '&print=print&go=2&jlls=' + escape(record), "入库单", $(window).width(), $(window).height())

//         //						layerPage01 = openWindow(2, './ckHtml.html?knbh=' + knbh_ + '&TblNum=' + listType + '&type=ck&print=print&go=2', "详细信息", $(window).width(), $(window).height());

//     } else if (TablNum == "386") {


//         layerPage01 = openWindow(2, '../knww/page/tpDetail.html?TblNum=' + TablNum + '&knbh=' + knbh + '&print=print&go=2&jlls=' + escape(record), "入库单", $(window).width(), $(window).height())
//     }
// }

// function intoStorageAll() {
//     postData("WenWuShenHe", {
//         //		XDLM移交人:"马娜",
//         XDLM审核人: getCookieName("mUserName"),
//         XDLM审核状态: "同意入库",
//         XDLM文物库内编号: knbhArry.join(","),
//         XDLM记录表流水号: lshArry.join(","),
//     }, function (returnData) {
//         postData("WenWuShenHeNext", {
//             XDLM库内编号: knbhArry.join(","),
//             XDLM记录表流水号: lshArry.join(",")
//         }, function (data) {
//             if (data.success || data.msg) {
//                 layer.close(layerPage01)
//                 var layer003 = layer.confirm("是否打印入库单?", {
//                     btn: ['是', '否'] //按钮
//                 },
//                     function () //确定
//                     {
//                         printAllList(knbhArry.join(","), data.log_codes, "入库单")
//                         knbhArry = [],
//                             lshArry = [];
//                         tableins.reload()
//                         layer.close(layer003)

//                     },
//                     function () {
//                         QXALL()
//                         tableins.reload()
//                     }
//                 );

//             }
//         })
//     })
// }

// function intoStorage(data) {
//     postData("WenWuShenHe", {
//         XDLM审核人: getCookieName("mUserName"),
//         XDLM审核状态: "同意入库",
//         XDLM文物库内编号: data['文物库内编号'],
//         XDLM记录表流水号: data['记录表流水号']
//     }, function (returndata) {
//         if (returndata.success) {
//             relicOutStore("WenWuShenHeNext", {
//                 XDLM库内编号: data['文物库内编号'],
//                 XDLM记录表流水号: data['记录表流水号']
//             }, "入库")
//         }
//     })
// }

// function relicOutStore(xaction, data, tip) { //文物的最后入库	
//     var knbh_ = data['XDLM库内编号']
//     //	layer.confirm("确定要" + tip + "吗?", {
//     //			btn: ['确定', '再想想'] //按钮
//     //		},
//     //		function() //确定
//     //		{
//     //			layer.msg('正在提交，请稍等...', {
//     //				icon: 1,
//     //				time: 500,
//     //				success: function() {}
//     //			});
//     //		}
//     //
//     //	);

//     postData(xaction, data, function (data) {

//         //						var index002 = layer.msg(data.message, {
//         //							icon: 1,
//         //							time: 500,
//         //							success: function() {
//         if (data.success || data.msg) {

//             //									layer.close(index002)
//             var layer003 = layer.confirm("是否打印" + tip + "单?", {
//                 btn: ['是', '否'] //按钮
//             },
//                 function () //确定
//                 {

//                     if (listType == "305") {
//                         layerPage01 = openWindow(2, '../knww/page/wwDetail.html?TblNum=' + listType + '&knbh=' + knbh_ + '&type=print&go=2', "入库单", $(window).width(), $(window).height())

//                         //						layerPage01 = openWindow(2, './ckHtml.html?knbh=' + knbh_ + '&TblNum=' + listType + '&type=ck&print=print&go=2', "详细信息", $(window).width(), $(window).height());

//                     } else if (listType == "386") {

//                         layerPage01 = openWindow(2, './carrier_lsjl.html?knbh=' + knbh_ + '&TblNum=' + listType + '&type=ck&print=print&go=2', "详细信息", $(window).width(), $(window).height());

//                     }

//                     tableins.reload()
//                     layer.close(layer003)

//                 },
//                 function () {
//                     QXALL()
//                     tableins.reload()
//                 }
//             );

//         }
//         //							}
//         //						});

//     })

// }

// function changeWhere() {
//     where.QueryType = $("#cxlb").val();

//     $(".search-type").each(function (key, val) {

//         if ($(val).hasClass("layui-hide")) {

//         } else {

//             if ($(val).attr("id") == "warehouseDiv") {
//                 where.QueryKey = "";
//                 where.mCNTRNo = $("#XDLM柜架号").val();
//                 where.mLevelNo = $("#XDLM层号").val();
//                 where.mAreaNo = $("#XDLM分区号").val();
//             } else {
//                 where.QueryKey = $(val).find(".key-words").val();
//                 where.mCNTRNo = "";
//                 where.mLevelNo = "";
//                 where.mAreaNo = "";
//             }

//         }
//     })
// }

function changeSearchType(value) {
    $(".search-type").addClass("layui-hide")
    if (value == "文物组" || value == "warehouse") {
        $("#" + value + "Div").removeClass("layui-hide");
    } else {
        $("#keyworDiv").removeClass("layui-hide");
    }
}

//function getSearchModule(tablenum) {
//    postData("wwGetDataList", {
//        TblNum: 77,
//        T777: "EQ" + tablenum,
//        orderby: "id",
//    }, function (data) {
//        getSelect("cxlb", data.data, "display", "", "chsx");
//        form.render("select")
//    })
//}

function changeType(key) {
    where = {
        orderby: "id desc"
    }
    //1)先判断是哪一个
    for (var i = 0; i < typeData.length; i++) {
        if (typeData[i]['TabChiName'] == key) {
            var storeColnum = typeData[i].Querys.split("|")[0].split(",")[0];
            var statusColnum = typeData[i].Querys.split("|")[1].split(",")[0];
            where.TblNum = typeData[i].TableNum;
            where[storeColnum] = "EQ" + getCookieName("mCurrentStorage");
            where[statusColnum] = "EQ待入库";

            colsend = kfJson.colsName["T" + typeData[i].TableNum]["drkww"]
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









