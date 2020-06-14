var tableins = "", form,where, $;

layui.use(["form", "table"], function () {
    form = layui.form;
    tableins = layui.table;
    $ = layui.jquery;

    type= window.location.href.getQuery('type');//
    console.log(type)
// 权限设置

if(type){
    qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("全库申请属性修改记录");
console.log(qx)
console.log("全库")
where = {
    XDLMCID: "1001",
    XDLMSID: "DYBH20190823124628462859201",
   
    XDLMB: "修改中"
};

}else{
    qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("申请属性修改记录");
console.log(qx)
 where = {
    XDLMCID: "1001",
    XDLMSID: "DYBH20190823124628462859201",
    XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
    XDLMB: "修改中"
};
}


    


  

    var cols = [
        [{
            checkbox: true,
            LAY_CHECKED: false
        }, {
            title: '序号',
            type: 'numbers'
        },
        {
            field: '库房名',
            title: '库房名',
            width: '10%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.库房名);
            }
        },
        {
            field: '登记名称',
            title: '登记名称',
            width: '9%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.登记名称);
            }
        },
        {
            field: '',
            title: '现登记号',
            width: '8%',
            align: 'center',
            templet: function (d) {
                if(SysConfig.UserInfo.GetCookieName("kflx") == "文物"){
                    return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.现藏品总登记号);
                }else{
                    return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.文物库内编号);
                }
            }
        },

        {
            field: '错误描述',
            title: '错误描述',
            width: '34%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.错误描述);
            }
        },
        {
            field: '申请更改时间',
            title: '申请更改时间',
            width: '10%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.申请更改时间);
            }
        },
        {
            field: '申请人用户名',
            title: '申请人',
            width: '8%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.申请人用户名);
            }
        },
        {
            field: '当前状态',
            title: '修改状态',
            width: '15%',
            align: 'center',
            templet: function (d) {
                let tt = "";

                if (qx[0].Limit.isSH) {
                switch (d.当前状态) {
                    case '修改中':
                        tt += '  <a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=Edit("' + d.id + '","modifying")>' + d.当前状态 + '</a>';
                        break;
                    case '已修改':
                        tt += '  <a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=Edit("' + d.id + '","finish")>' + d.当前状态 + '</a>';
                        break;
                    case '拒绝修改':
                        tt += '  <a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=Edit("' + d.id + '","refuse")>' + d.当前状态 + '</a>';
                        break;

                }
            }

                tt += '<a class="layui-btn layui-btn-xs layui-btn-green1 " onclick=kfshManage.ShowXQ("' + d.id + '","' + d.文物库内编号 + '")>文物信息</a>';
                
                if (qx[0].Limit.isSC) {
                    tt += '<a class="layui-btn layui-btn-danger layui-btn-xs" onclick=Edit("' + d.id + '","del") lay-event="del">删除</a>';

                }
               
               

                return tt;
            }
        },

        ]
    ];
    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 20); 


    //查询类别

    var reData_queryList = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH2020041412251301436217",
    });

    if (reData_queryList.success) {
        $('#cxlb').empty();
        for (var i = 0; i < reData_queryList.rows.length; i++) {
            $('#cxlb').append('<option value="' + reData_queryList.rows[i].查询属性 + '">' + reData_queryList.rows[i].查询显示名 + '</option>');
        }
    }


    form.on("select(modifySearchType)", function (data) {
        if(type == "all"){
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823124628462859201",
                XDLMB: data.value
            };
        }else{
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823124628462859201",
                XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                XDLMB: data.value
            };
        }
       
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 20);

    })



    //table.on("tool(demo)", function (obj) {
    //    var data = obj.data;
    //    getRowColor(obj)
    //    switch (obj.event) {
    //        case "status1":

    //            //				if(limitConfig("storeLimt", 2)) {
    //            layerPage01 = openWindow(2, 'updateRecord.html?id=' + data.id + "&type=modifying&limit=" + limitPage, "审核信息", $(window).width() - 200, $(window).height() - 200);

    //            //					} else {
    //            //						layer.msg("您没有审核权限")
    //            //					}


    //            break;
    //        case "status2":
    //            //				if(limitConfig("storeLimt", 1)) {
    //            layerPage01 = openWindow(2, 'updateRecord.html?id=' + data.id + "&type=finish", "审核信息", $(window).width() - 200, $(window).height() - 200);


    //            //					} else {
    //            //						layer.msg("您没有查看权限")
    //            //					}


    //            break;
    //        case "status3":
    //            // if (limitConfig("storeLimt", 1)) {

    //            layerPage01 = openWindow(2, 'updateRecord.html?id=' + data.id + "&type=refuse", "审核信息", $(window).width() - 200, $(window).height() - 200);


    //            // } else {
    //            //     layer.msg("您没有查看权限")
    //            // }


    //            break;
    //        case "detail":

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

    //    }
    //})

    //搜索
    $('#searchData').click(function () {
        switch ($("#cxlb").val()) {
            case "模糊查询":
                if(type == "all"){
                    where = {
                        XDLMCID: "1001",
                        XDLMSID: "DYBH20190823124628462859201",
                        QueryType: '模糊查询',
                        QueryKey: $('#queryK').val()
                    };
                }else{
                    where = {
                        XDLMCID: "1001",
                        XDLMSID: "DYBH20190823124628462859201",
                        XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                        QueryType: '模糊查询',
                        QueryKey: $('#queryK').val()
                    };
                }
                
                break;
            default:
                if(type == "all"){
                    where = {
                        XDLMCID: "1001",
                        XDLMSID: "DYBH20190823124628462859201",
                        QueryType: $("#cxlb").val(),
                        QueryKey: $('#queryK').val()
                    };
                }else{
                    where = {
                        XDLMCID: "1001",
                        XDLMSID: "DYBH20190823124628462859201",
                        XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                        QueryType: $("#cxlb").val(),
                        QueryKey: $('#queryK').val()
                    };
                }
                
                // where[$("#cxlb").val()] = $('#queryK').val()
                break;

        }
        where.XDLMB = $("#modifySearchType").val();

        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 20);
   return false
    });

    form.render();
});

function Edit(mid, type) {
    if(type == "del"){
        SysConfig.SubSystemData.SYKFGL.PLSC([{ id: mid }], '4000', 'DYBH201908231246284628140204', Callback);
    }else{
        SysConfig.ToolBox.openWindow('updateRecord.html?id=' + mid + "&type=" + type, "审核信息", $(window).width() - 200, $(window).height() - 200);
    }
}

function Callback() {
    tableins.reload('mDataTable', {
        page: {
            limits: [20, 50, 100, 300, 500],
            groups: 20,
            curr: 1
        },
        //page: {
        //    curr: 1 //重新从第 1 页开始
        //}
    });
}