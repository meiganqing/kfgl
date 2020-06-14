
var form, tableins,where,cols,$;
 

layui.use(['form', 'table'], function () {
    $ = layui.jquery;
    form = layui.form;
    tableins = layui.table;
    //查询列表

    //权限设置
    if(SysConfig.UserInfo.GetCookieName("kflx")=="拓片"){
        qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("拒绝出库拓片"); 
        console.log(qx)
        where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH2020042016161605625408",
         
            XDLMC: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
            XDLMB: "拒绝出库",
            XDLMD:"拓片"
        };
        
    }else{
     qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("拒绝出库文物"); 
     console.log(qx)
     where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH2020042016161605625408",
    
        XDLMC: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
        XDLMB: "拒绝出库",
        XDLMD:"文物"
    };
    }





    // where = {
    //     XDLMCID: "1001",
    //     XDLMSID: "DYBH20190823124628462889251",
    //     XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
    //     XDLMB: "拒绝出库"
    // };



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
        },
        {
            field: '审核意见',
            title: '审核意见',
            width: '20%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.接收人);
            }
        },
        {
            title: '操作',
            width: '16%',
            fixed: "right",
            align: 'center',
            templet: function (d) {
                let tt = "";
                tt += '  <a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=ShowCKD("' + d.id + '","' + d.文物库内编号 + '","' + d.记录表流水号 + '")>出(归)库单</a>';
                tt += '<a class="layui-btn layui-btn-xs layui-btn-green1 " onclick=kfshManage.ShowXQ("' + d.id + '","' + d.文物库内编号 + '")>文物信息</a>';
                if (qx[0].Limit.isSC) {
                tt += ' <a class="layui-btn layui-btn-danger layui-btn-xs" onclick=Edit("删除","' + d.id + '") lay-event="del">删除</a>';
                }
               
            
                return tt;
            }
        }

        ]
    ];
    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 15);
    // 查询类别
    kfDataManage.GetJiLuQueryList();
   
    //搜索
    $('#searchData').click(function () {
        if($("#queryK").val()){
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH2020042016161605625408",
                XDLMC: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                XDLMB: "拒绝出库",
        
                QueryType: $("#cxlb").val(),
                QueryKey: $("#queryK").val(),
            };

        }else{
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH2020042016161605625408",
                XDLMC: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                XDLMB: "拒绝出库",
            };

        }
     
        if(SysConfig.UserInfo.GetCookieName("kflx")=="拓片"){
            where.XDLMD="拓片"

        }else{
            where.XDLMD="文物"

        }
      


        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 15);

    })
    form.render();


});


//删除

function Edit(eventName, mKNBH) {
    switch (eventName) {
        case "删除":
            SysConfig.SubSystemData.SYKFGL.PLSC([{ id: mKNBH }], '4000', 'DYBH20190823124628462882234', Callback);
            break;
    }
}
//
function Callback() {
    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 15);
}

function ShowCKD(id, knbh, lsh){
    SysConfig.ToolBox.openWindow('ckHtml.html?rowid=' + id + '&knbh=' + knbh + "&type=ck" + "&lsh=" + escape(lsh), "出库单", $(window).width(), $(window).height())
}
