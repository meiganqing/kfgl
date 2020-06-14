 
var     where = {};
var form, tableins,SelectList;


 
layui.use(['form', 'table'], function () {
    form = layui.form;
    tableins = layui.table;

    
    qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("拓片入库流水记录");
    console.log(qx)

    // getTable_x("wwzllb", whereTable, '', 'SearchDataRepeatT' + tabnum) //调用函数显示表格

    where = {
        XDLMCID: "9000",
        XDLMTID: "9204",
        XDLMSID: "9204025",
        XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),

    };
   

    if(SysConfig.UserInfo.GetCookieName("kflx")=="文物"){
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
                field: '图片地址',
                title: '记录图',
                width: '7%',
                align: 'center',
                templet: function (d) {
                    if (d.图片地址) {
                        return ' <div class="list-img-mudule" style=""  onclick=imgclick("' + d.文物库内编号 + '")><img style = "max-width: 60px;max-height:60px;cursor: pointer;" src = "' + d.图片地址.replace("_sss.", "_s.") + '" alt = "" lay - event="scanPic" /></div>';
                    }
                    else {
                        return '';
                    }
                   
                }
            }, {
                field: '登记名称',
                title: '名称',
                width: '8.5%',
                align: 'center',
                templet: function (d) {
                    return '<a href="javascript:;"  style="color:blue;"  onclick=kfshManage.ShowXQ("' + d.id + '","' + d.文物库内编号 + '")>' + d.登记名称 + '</a>';
                }
            },
            {
                field: '现藏品总登记号',
                title: '原登记号',
                width: '12%',
                align: 'center',
                templet: function (d) {
                    return d.现藏品总登记号;
                }
            }, {
                field: '文物库内编号',
                title: '现登记号',
                width: '7%',
                align: 'center',
                templet: function (d) {
                    return d.文物库内编号;
                }
            },
    
            {
                field: '文物类别_具体类别',
                title: '文物类别',
                width: '5%',
                align: 'center',
                templet: function (d) {
                    return d.文物类别_具体类别;
                }
            },
            {
                field: '外形尺寸',
                title: '外形尺寸',
                width: '5%',
                align: 'center',
                templet: function (d) {
                    return d.外形尺寸;
                }
            },
            {
                field: '完残程度',
                title: '完残程度',
                width: '5%',
                align: 'center',
                templet: function (d) {
                    return d.完残程度;
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
           
            {
                field: '考古发掘信息_领队',
                title: '领队',
                width: '5%',
                align: 'center',
                templet: function (d) {
                    return d.考古发掘信息_领队;
                }
    
            },
            {
                field: '考古发掘信息_出土地点',
                title: '出土地点',
                width: '10%',
                align: 'center',
                templet: function (d) {
                    return d.考古发掘信息_出土地点;
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
                width: '13.2%',
                align: 'center',
                templet: function (d) {
                    let tt = '';
    
                    if(qx[0].Limit.isBJ){
                        if (d.库存状态 == '在库' || d.库存状态 == '归还入库' || d.库存状态 == '暂存') {
                            tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=Edit("编辑","' + d.文物库内编号 + '") lay-event="edit">编辑</a>';
                        }
        
                        else if (d.库存状态 == '待入库' || d.库存状态 == '待出库') {
                            //  tt += '<a class="layui-btn layui-btn-xs layui-btn-disabled" style="background: rgb(201, 201, 201);color: #FFFFFF;" onclick=edit("' + d.id + '")>归还</a>';
                        }
                        else if (d.库存状态 == '修改中') {
                            //  tt += '<a class="layui-btn layui-btn-xs layui-btn-disabled" style="background: rgb(201, 201, 201);color: #FFFFFF;" onclick=edit("' + d.id + '")>归还</a>';
                        }
                        else {
                            //tt += '<a class="layui-btn layui-btn-xs layui-btn-warm" style="background: rgb(201, 201, 201);color: #FFFFFF;" onclick=Edit("归还","' + d.文物库内编号 + '")>归还</a>';
                        }
    
                    }
                
    
                    if(qx[0].Limit.isSC){
                        tt += ' <a class="layui-btn layui-btn-danger layui-btn-xs" onclick=Edit("删除","' + d.id + '") lay-event="del">删除</a>';
        
                    }
                 
    
                    return tt;
                }
            }
    
            ]
        ];

    }else{
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
                field: '',
                title: '记录图',
                width: '7%',
                align: 'center',
                templet: function (d) {
                    if (d.图片地址) {
                        return ' <div class="list-img-mudule" style=""  onclick=imgclick("' + d.文物库内编号 + '")><img style = "max-width: 60px;max-height:60px;cursor: pointer;" src = "' + d.图片地址.replace("_sss.", "_s.") + '" alt = "" lay - event="scanPic" /></div>';
                    }
                    else {
                        return '';
                    }
                   
                }
            }, {
                field: '登记名称',
                title: '名称',
                width: '8.5%',
                align: 'center',
                templet: function (d) {
                    return '<a href="javascript:;"  style="color:blue;"  onclick=kfshManage.ShowXQ("' + d.id + '","' + d.文物库内编号 + '")>' + d.登记名称 + '</a>';
                }
            },
            {
                field: '记录表流水号',
                title: '记录表流水号',
                width: '12%',
                align: 'center',
                templet: function (d) {
                    return d.记录表流水号;
                }
            }, {
                field: '文物库内编号',
                title: '现登记号',
                width: '7%',
                align: 'center',
                templet: function (d) {
                    return d.文物库内编号;
                }
            },
    
            {
                field: '年代',
                title: '年代',
                width: '5%',
                align: 'center',
                templet: function (d) {
                    return d.年代;
                }
            },
            {
                field: '外形尺寸',
                title: '外形尺寸',
                width: '5%',
                align: 'center',
                templet: function (d) {
                    return '<span>'+d.长+","+d.宽+'</span> ';
                }
            },
            {
                field: '是否已拓',
                title: '是否已拓',
                width: '5%',
                align: 'center',
                templet: function (d) {
                    return d.是否已拓;
                }
            },
            {
                field: '原始编号',
                title: '原始编号',
                width: '5%',
                align: 'center',
                templet: function (d) {
                    return d.原始编号;
                }
            },
           
            
         
            {
                field: '具体位置',
                title: '具体位置',
                width: '10%',
                align: 'center',
                templet: function (d) {
                    return d.具体位置;
                }
    
            },
            {
                field: '',
                title: '位置',
          
                align: 'center',
                templet: function (d) {
                    return '<p>' + d.柜架号 + d.层号 + d.分区号 + '</p>';
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
                 
                    return '<span id="" style="color:' + colorValue + '">' + d.库存状态 + '</span>';
    
                }
    
            }, {
                field: '',
                title: '操作',
                width: '13.2%',
                align: 'center',
                templet: function (d) {
                    let tt = '';
    
                    if(qx[0].Limit.isBJ){
                        if (d.库存状态 == '在库' || d.库存状态 == '归还入库' || d.库存状态 == '暂存') {
                            tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=Edit("编辑","' + d.文物库内编号 + '") lay-event="edit">编辑</a>';
                        }
        
                        else if (d.库存状态 == '待入库' || d.库存状态 == '待出库') {
                            //  tt += '<a class="layui-btn layui-btn-xs layui-btn-disabled" style="background: rgb(201, 201, 201);color: #FFFFFF;" onclick=edit("' + d.id + '")>归还</a>';
                        }
                        else if (d.库存状态 == '修改中') {
                            //  tt += '<a class="layui-btn layui-btn-xs layui-btn-disabled" style="background: rgb(201, 201, 201);color: #FFFFFF;" onclick=edit("' + d.id + '")>归还</a>';
                        }
                        else {
                            //tt += '<a class="layui-btn layui-btn-xs layui-btn-warm" style="background: rgb(201, 201, 201);color: #FFFFFF;" onclick=Edit("归还","' + d.文物库内编号 + '")>归还</a>';
                        }
    
                    }
                
    
                    if(qx[0].Limit.isSC){
                        tt += ' <a class="layui-btn layui-btn-danger layui-btn-xs" onclick=Edit("删除","' + d.id + '") lay-event="del">删除</a>';
        
                    }
                 
    
                    return tt;
                }
            }
    
            ]
        ];

    }
    // tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 15);
    //$("#delBatch").addClass("layui-hide")



    //var urlApi
    //if (tabnum == "305") {
    //    urlApi = "not in(id,文物库内编号,记录表流水号,审核状态,审核意见,审核时间,图片地址,库存状态)"
    //} else if (tabnum == "386") {
    //    urlApi = "not in(id,文物库内编号,记录表流水号,审核状态,审核意见,审核时间,图片地址,库存状态,添加时间,添加人,所属公司)"
    //}
    var selectData = [];
    let tname = "文物登记表";
    let QueryList = ['现藏品总登记号', '登记名称', '文物描述', '外形尺寸'];
    if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {   
        tname = "文物登记表";
        QueryList = ['现藏品总登记号', '登记名称', '文物描述', '外形尺寸'];
    } else {
       
        tname = "拓片资料列表";
        QueryList = ['原始编号'];
    }
    let returndata = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH2019082312462846287221",
        XDLMA: tname,

    });
    if (returndata.success) {
        if (returndata.rows.length > 0) {
            for (let i = 0; i < returndata.rows.length; i++) {
                selectData.push({ name: returndata.rows[i].FieldName, value: returndata.rows[i].FieldName, selected: false });
            }
        }
    }  
    
    //初始化用户列表
    SelectList = xmSelect.render({
        el: "#keyWords",
        initValue: QueryList,
        data: selectData,
        on: function (data) {
            //arr:  当前多选已选中的数据
            var arr = data.arr;
            //change, 此次选择变化的数据,数组
            var change = data.change;
            //isAdd, 此次操作是新增还是删除
            var isAdd = data.isAdd;

            //可以return一个数组, 代表想选中的数据
            //return []
        },
    });
   // SelectList.setValue('现藏品总登记号, 登记名称, 文物描述, 保管信息_藏品现登记号, 外形尺寸')
    

    $("#searchData").click(function () {

        where = {
            XDLMCID: "9000",
            XDLMTID: "9204",
            XDLMSID: "9204025",
            XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),
            keyword: SelectList.getValue('valueStr'),

        };
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 10);
    })

})




function Edit(eventName, mKNBH) {
    switch (eventName) {
        case "scanPic":
            let returndata = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823124628462851271",
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
            SysConfig.ToolBox.openWindow('/SYKFGL/PAGE/KNWW//wwjcxx.html?knbh=' + mKNBH, "详细信息", $(window).width(), $(window).height());
            break;
        case "出库":
            SysConfig.ToolBox.openWindow('/SYKFGL/PAGE/KNWW//wwckdjb.html?type=ww&knbh=' + mKNBH, "详细信息", $(window).width(), $(window).height());
            break;
        case "归还":
            SysConfig.ToolBox.openWindow('/SYKFGL/PAGE/KNWW//ghwwdjb.html?knbh=' + mKNBH, "归还", $(window).width(), $(window).height())
            break;
        case "ckd":
            SysConfig.ToolBox.openWindow('/SYKFGL/PAGE/crkgl/ckHtml.html?knbh=' + mKNBH + "&type=ck" + "&TblNum=305", "详细信息", $(window).width(), $(window).height())
            break;
        case "编辑":
            if(SysConfig.UserInfo.GetCookieName("kflx")=="文物"){
                SysConfig.ToolBox.openWindow("/SYKFGL/PAGE/crkgl/xrkww.html?type=modify&knbh=" + mKNBH, "详细信息", $(window).width(), $(window).height())

            }else{
               
                SysConfig.ToolBox.openWindow(" /SYKFGL/Page/knww/page/add_carrier.html?type=modify&knbh=" + mKNBH, "详细信息", $(window).width(), $(window).height())

            }
           
            break;
        case "标签":
            SysConfig.ToolBox.openWindow('printQRCode.html?knbh=' + mKNBH + '&type=2', "标签打印", 480, 300);
            break;
        case "删除":
           
            
            if(SysConfig.UserInfo.GetCookieName("kflx")=="文物"){
                SysConfig.SubSystemData.SYKFGL.PLSC([{ id: mKNBH }], '4000', 'DYBH201908231246284628217254', Callback);

            }else{
                SysConfig.SubSystemData.SYKFGL.PLSC([{ id: mKNBH }], '4000', 'DYBH201908231246284628195224', Callback);

            }
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