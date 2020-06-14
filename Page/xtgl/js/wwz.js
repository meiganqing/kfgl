/**
 * Created by xh on 2020/04/17
 * 文件名: wwz.js
 * 作　者: 徐航
 * 日　期: 2020/04/17
 * 描　述: 接口调用更换
 * 版　本: 1.00
 * 修改历史纪录:
 * 版本     时间           姓名         内容
 2. 02   2020/04/17     徐航       接口调用更换
 */
var $, form, element, table, layer, tableins, where,rowid;
layui.use(["jquery", "form", "layer", "table", "element"], function() {
  ($ = layui.$),
    (layer = layui.layer),
    (table = layui.table),
    (element = layui.element),
    (form = layui.form);

    qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("文物组");
    console.log(qx)

  


    where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231246284628239261",     
    };

    var colList = [
        [
          { type: "checkbox" },
          { field: "id", title: "id", width: "1%", hide: true, align: "center" },
          {
            field: "groupName",
            title: "组名",
            width: "80%",
            sort: true,
            align: "center",
          },
          {
            title: "操作",
            width: "14%",
            align: "center",
            templet: function(d) {
                let tt = '';
                if (qx[0].Limit.isBJ) {
                  tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" lay-event="edit">修改</a>'}
                if (qx[0].Limit.isSC) {
                  tt += ' <a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del">删除</a>'
                }
                tt += ' <a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="include">包含文物</a>'
              
                return tt;
            }
          }
        ]
      ];

      tableins = SysConfig.SubSystemData.SYKFGL.SetDataTableByTableName('#grid_table', 'mDataTable', table, "文物组列表", colList, where, 18);
      if (!qx[0].Limit.isBJ) {
        $("#toolbar_add").addClass("layui-hide")

    }
    table.on("tool(grid_table)", function(obj) {
        var data = obj.data;
        if(obj.event == "edit"){
          index_adddad = layer.open({
            type: 1,
            title: '修改文物组',
            area: ['50%', '60%'],
            content: $('#addLayerHtml'),
            success: function(){
              $('#saveHZ').html("保存");
              $('#groupName').val(data.groupName);
            }
          })
            rowid = data.id;
            
        }else if(obj.event == "del"){
            SysConfig.SubSystemData.SYKFGL.PLSC([data], '4000', 'DYBH201908231246284628219264', XMedit);
        }else if(obj.event == "include"){
          index_adddad = layer.open({
            type: 2,
            title: '包含文物列表',
            area: ['100%', '100%'],
            content: '/SYKFGL/Page/knww/page/wwlb.html?wwgroup=' + escape(data.groupName)
            
          })
        }
      
    })

    table.on("toolbar(grid_table)", function(obj) {
        var data = obj.data;
        if(obj.event == "add") {
            index_adddad = layer.open({
                type: 1,
                title: '添加文物组',
                area: ['50%', '60%'],
                content: $('#addLayerHtml'),
                success: function(){
                  $('#saveHZ').html("添加");
                  $('#groupName').val("");
                }
            })
        }

    })

   
    $('#qxHZ').click(function(){
        layer.closeAll();
    })

    $('#saveHZ').click(function(){
        if($('#saveHZ').html() == "保存"){
            SysConfig.SubSystemData.SYKFGL.EditData('#addLayerHtml', 'GetDataInterface', '&XDLMCID=6000&XDLMSID=DYBH20190823124628462836265&XDLMID=' + rowid, XMedit);
        }else{
            SysConfig.SubSystemData.SYKFGL.AddNewData('#addLayerHtml', 'GetDataInterface', '&XDLMCID=5000&XDLMSID=DYBH20190823124628462863263', XMedit);
        }
    });


    form.render();

})

function XMedit() {
    layer.closeAll();
    table.reload('mDataTable');
}

















// var tableins = "";
// var limit = 20,
//     where = {
//         TblNum: 384,
//     },
//     layerPage01;

// $(function() {
//     layui.use(["form", "table"], function() {
//         var form = layui.form,
//             table = layui.table
//         getTable("demo", where);
//         if (!limitConfig("applyLimt", 2)) {
//             $("#add").addClass("layui-hide")
//         }
//         table.on('tool(demo)', function(obj) {
//             getRowColor(obj)
//             var data = obj.data
//             switch (obj.event) {
//                 case "edit":
//                     // if (limitConfig("storeLimt", 2)) {
//                     layerPage01 = openWindow(1, $("#addLayerHtml"), "修改", 500, 200)
//                     $("#editId").val(data.id);
//                     $("#groupName").val(data.groupName);
//                     $("#addsubmit").html("修改")
//                         // } else {
//                         //     layer.msg("您当前没有编辑权限")
//                         // }
//                     break;
//                 case "del":
//                     // if (limitConfig("storeLimt", 3)) {
//                     delData(data.id, where.TblNum, function() {
//                             layer.msg('删除成功！', {
//                                 title: '提示框',
//                                 icon: 1,
//                                 time: 800
//                             }, function(alertindex) {
//                                 tableins.reload();
//                             });
//                         })
//                         // } else {
//                         //     layer.msg("您当前没有删除权限")
//                         // }

//                     break;
//                 case "WWnews":
//                     openWindow(2, "../knww/page/wwlb.html?fztype=" + escape(data.groupName) + "&limit=SY2018112809351435142", "文物列表", $(window).width(), $(window).height())
//                     break;
//             }
//         })
//         $("#add").click(function() {
//             layerPage01 = openWindow(1, $("#addLayerHtml"), "添加", 500, 200)
//             $("#editId").val("");
//             $("#groupName").val("");
//             $("#addsubmit").html("添加")
//         })
//         form.on('submit(addsubmit)', function(data) {
//             if ($("#addsubmit").html() == "添加") {
//                 submitDataTip("确定要添加？", function() {
//                     postData("wwAddNewRow", data.field, function(data) {
//                         if (data.success || data.msg) {
//                             layer.close(layerPage01)
//                             tableins.reload()
//                         }
//                     })
//                 })

//             } else if ($("#addsubmit").html() == "修改") {
//                 submitDataTip("确定要修改？", function() {
//                     postData("wwModifyDataById", data.field, function(data) {
//                         if (data.success || data.msg) {
//                             layer.close(layerPage01)
//                             tableins.reload()
//                         }
//                     })
//                 })

//             }

//             return false;
//         })
//     })
// })