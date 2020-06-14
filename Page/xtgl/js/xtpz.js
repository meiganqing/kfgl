/**
 * Created by xh on 2020/04/17
 * 文件名: xtpz.js
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

    qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("系统配置");
    console.log(qx)

    if (!qx[0].Limit.isBJ) {
      $("#add_Teamwork").addClass("layui-hide")

  }

  //获取文物组下拉选项
  let  reData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
      XDLMCID: "1001",
      XDLMSID: "DYBH2020042116061403636509",
  });

  if (reData.success) {
      //getSelect("groupkeyWords", data.data, "groupName");
      $('#queryT').empty();
      for (var i = 0; i < reData.rows.length; i++) {
          $('#queryT').append('<option value="' + reData.rows[i].查询属性 + '">' + reData.rows[i].查询显示名 + '</option>');
      }

  }


    where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462812741",   
    };

    var colList = [
        [
          { type: "checkbox" },
          { field: "id", title: "id", width: "1%", hide: true, align: "center" },
          {
            field: "sysname",
            title: "名称",
            width: "35%",
            sort: true,
            align: "center",
            templet: function(d) {
              return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.sysname);
            }
          },{
            field: "sysvalue",
            title: "内容",
            width: "48%",
            sort: true,
            align: "center",
            templet: function(d) {
              return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.sysvalue);
            }
          },
          {
            title: "操作",
            width: "12%",
            align: "center",
            templet: function(d) {
                let html = '';
                if (qx[0].Limit.isBJ) {
                  html+='<a class="layui-btn layui-btn-xs layui-btn-green1" lay-event="edit">修改</a>'
                }

                if (qx[0].Limit.isBJ) {
                  html+= '<a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del">删除</a>'

                }
              
                return html;
            }
          }
        ]
      ];

    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(table, "系统配置列表", colList, where, 18);

    table.on("tool(grid_table)", function(obj) {
        var data = obj.data;
        if(obj.event == "edit"){
          index_adddad = layer.open({
            type: 1,
            title: '添加配置',
            area: ['700px', '250px'],
            content: $('#addLayerHtml'),
            success: function(){
              console.log(data);
              $('#saveHZ').html("保存");
              for(let i in data){
                $('#'+ i).val(data[i]);
              }
            }
          })
          rowid = data.id;
            
        }else if(obj.event == "del"){
            SysConfig.SubSystemData.SYKFGL.PLSC([data], '4000', 'DYBH20190823124628462821044', XMedit);
        }
      
    })

   

    $('#add_Teamwork').click(function(){
        SysConfig.ToolBox.openWindowByDIV($('#addLayerHtml'), "修改配置", 700, 250);
        $('#saveHZ').html("添加");
        $('.input_empty').val("");
    })

    $('#saveHZ').click(function(){
      if($('#saveHZ').html() == "保存"){
          SysConfig.SubSystemData.SYKFGL.EditData('#addLayerHtml', 'GetDataInterface', '&XDLMCID=6000&XDLMSID=DYBH20190823124628462817445&XDLMID=' + rowid, XMedit);
      }else{
          SysConfig.SubSystemData.SYKFGL.AddNewData('#addLayerHtml', 'GetDataInterface', '&XDLMCID=5000&XDLMSID=DYBH2019082312462846282943', XMedit);
      }
    });

    $('#qxHZ').click(function(){
      layer.closeAll();
  })

    //查询
    $("#searchData").click(function() {
        where.QueryType = $("#queryT").val();
        where.QueryKey = $("#queryK").val();
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(table, "系统配置列表", colList, where, 18);
        
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
//         TblNum: "175",

//     }

// $(function() {
//     layui.use(["form", "table"], function() {
//         var form = layui.form,
//             table = layui.table

//         getTable("demo", where)
//             //查询类别
//         postData("wwGetDataList", {
//             TblNum: 77,
//             T777: "EQ" + 175,
//             orderby: "id"
//         }, function(data) {
//             getSelect("wwtype", data.data, "display", "chsx")
//             form.render("select")
//         })

//         if (!limitConfig("applyLimt", 2)) {
//             $("#add").addClass("layui-hide")
//         }
//         //搜索
//         $('#searchData').click(function() {

//             where.QueryType = $("#wwtype").find("option:selected").attr("attrdata");

//             where.QueryKey = $("#keyWords").val();
//             tableins.reload({
//                 where: where,
//             });
//         });
//         table.on('tool(demo)', function(obj) {
//             getRowColor(obj)
//             var data = obj.data
//             switch (obj.event) {
//                 case "edit":
//                     // if (limitConfig("storeLimt", 2)) {
//                     layerPage01 = openWindow(1, $("#addLayerHtml"), "修改", 500, 230)
//                     $("#editId").val(data.id);
//                     $("#sysname").val(data.sysname);
//                     $("#sysvalue").val(data.sysvalue);
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
//             }
//         })
//         $("#add").click(function() {
//             layerPage01 = openWindow(1, $("#addLayerHtml"), "添加", 500, 230)
//             $("#addLayerHtml").find(".layui-input").val("")
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
//                             layer.msg("执行最新配置需要重新登录")
//                             tableins.reload()
//                         }
//                     })
//                 })

//             }

//             return false;
//         })
//     })
// })