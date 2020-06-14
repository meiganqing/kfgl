/**
 * Created by xh on 2020/04/16
 * 文件名: all_tplb.js
 * 作　者: 徐航
 * 日　期: 2020/04/16
 * 描　述: 接口调用更换
 * 版　本: 1.00
 * 修改历史纪录:
 * 版本     时间           姓名         内容
 2. 02   2020/04/16     徐航       接口调用更换
 */
var $, form, element, table, layer, tableins, where,rowid;
layui.use(["jquery", "form", "layer", "table", "element"], function() {
  ($ = layui.$),
    (layer = layui.layer),
    (table = layui.table),
    (element = layui.element),
    (form = layui.form);

    // 权限设置
    qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("文物属性管理");
    console.log(qx)
    if (!qx[0].Limit.isBJ) {
      $("#add_Teamwork").addClass("layui-hide")

    }

    getQueryList(); // 查询下拉

    if(SysConfig.UserInfo.GetCookieName("kflx") == "文物"){
      where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231246284628192331",   
        XDLMB: "文物登记表"
      };
    }else{
      where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231246284628192331",   
        XDLMB: "拓片资料列表"
      };
    }
    
    var colList = [
        [
          { type: "checkbox" },
          { field: "id", title: "id", width: "1%", hide: true, align: "center" },
          {
            field: "排序",
            title: "排序",
            width: "6%",
            sort: true,
            align: "center",
            templet: function(d) {
              return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.排序);
            }
          },
          {
            field: "统计区分",
            title: "类别",
            width: "15%",
            sort: true,
            align: "center",
            templet: function(d) {
              return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.统计区分);
            }
          },{
            field: "统计项目",
            title: "属性名称",
            width: "20%",
            sort: true,
            align: "center",
            templet: function(d) {
              return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.统计项目);
            }
          },
          {
            field: "统计内容简名",
            title: "属性内容简名",
            width: "20%",
            sort: true,
            align: "center",
            templet: function(d) {
              return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.统计内容简名);
            }
          },
          {
            field: "统计内容",
            title: "属性内容",
            width: "22%",
            sort: true,
            align: "center",
            templet: function(d) {
              return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.统计内容);
            }
          },
          {
            title: "操作",
            width: "12%",
            align: "center",
            templet: function(d) {
                let html = '';
                if (qx[0].Limit.isBJ) {
                
                  html += `<a class="layui-btn layui-btn-xs layui-btn-green1" lay-event="edit">修改</a>`
                }
                if (qx[0].Limit.isSC) {
                  html += `<a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="del">删除</a>`
                

                }
                return html;
            }
          }
        ]
      ];

    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(table, "文物属性列表", colList, where, 18);

    table.on("tool(grid_table)", function(obj) {
        var data = obj.data;
        if(obj.event == "edit"){
          index_adddad = layer.open({
            type: 1,
            title: '修改文物属性',
            area: ['50%', '60%'],
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
            SysConfig.SubSystemData.SYKFGL.PLSC([data], '4000', 'DYBH201908231246284628108334', XMedit);
        }
      
    })

    // form.on('select(queryT)', function(data){
    //   where.XDLMB = data.value;
    //   tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(table, "文物属性列表", colList, where, 18);
    // })

    $('#add_Teamwork').click(function(){
        SysConfig.ToolBox.openWindowByDIV($('#addLayerHtml'), "添加文物属性", 600, 400);
        $('#saveHZ').html("添加");
        $('#统计区分').val($('#queryT').find("option:selected").val());
        $('.input_empty').val("");
    })

    $('#saveHZ').click(function(){
      if($('#saveHZ').html() == "保存"){
          SysConfig.SubSystemData.SYKFGL.EditData('#addLayerHtml', 'GetDataInterface', '&XDLMCID=6000&XDLMSID=DYBH201908231246284628181335&XDLMID=' + rowid, XMedit);
      }else{
          SysConfig.SubSystemData.SYKFGL.AddNewData('#addLayerHtml', 'GetDataInterface', '&XDLMCID=5000&XDLMSID=DYBH201908231246284628111333', XMedit);
      }
    });

    $('#qxHZ').click(function(){
      layer.closeAll();
  })

    //查询
    $("#searchData").click(function() {
        where.QueryType = $("#queryT").val();
        where.QueryKey = $("#queryK").val();
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(table, "文物属性列表", colList, where, 18);
        
    });
    

    form.render();

})

//查询下拉
function getQueryList() {
  $("#queryT").empty();
  // $("#queryT").append('<option value=" "></option>');
  var returnData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
    XDLMCID: "1001",
    XDLMSID: "DYBH2020041717275908580405"
  });
  if (returnData.success) {
    console.log(returnData);
    for (var i in returnData.rows) {
      $("#queryT").append('<option value="' + returnData.rows[i].查询属性 + '">' + returnData.rows[i].查询显示名 + "</option>" );
    }
    $("#queryT").find("option[value='模糊查询']").attr("selected", true);
  }
}


function XMedit() {
  layer.closeAll();
  table.reload('mDataTable');
}



















// var tableins = "";
// var limit = 17,
//     where = {
//         TblNum: 57,
//         T576: "EQ拓片资料列表"
//     }
// var layerPage01 = "",
//     typeData = "",
//     where_ = {},
//     form;
// $(function() {
//     layui.use(["form", "table"], function() {
//         form = layui.form;
//         var table = layui.table
//             //添加内容
//         $("#add").click(function() {
//             $('#addsubmit').html("添加")
//             layerPage01 = openWindow(1, $("#addLayerHtml"), "添加分类内容", 600, 400)
//             $("#addLayerHtml").find("input").val("")
//             $("#统计区分").val($("#wwtype").val())
//         });

//         // if (!limitConfig("applyLimt", 2)) {
//         //     $("#add").addClass("layui-hide")
//         // }
//         postData("GetItemType", "", function(data) {
//             getSelect("wwtype", data.data, "TabChiName", "TableNum");
//             typeData = data.data
//             changeType($("#wwtype").val())
//             getSearchModule(where_.TblNum)
//         }, "", "", "sykf=SYKFGL")
//         form.on("select(wwtype)", function(data) {
//             changeType(data.value)
//             getSearchModule(where_.TblNum);
//             where.T576 = 'EQ' + data.value
//             tableins.reload({

//                 where: where
//             })

//         });
//         form.on("select(cxlb)", function(data) {
//             where.T572 = "EQ" + data.value;
//             tableins.reload({

//                 where: where
//             })
//         })

//         getTable("demo", where)
//         form.render("select")

//         table.on('tool(demo)', function(obj) {
//             getRowColor(obj)
//             for (var k in obj.data) {
//                 $("#" + k).val(obj.data[k])
//             }
//             if (obj.event == "edit") {
//                 // if(limitConfig("storeLimt", 2)) {
//                 $('#addsubmit').html("修改")
//                 $('#editId').val(obj.data.id)
//                 layerPage01 = openWindow(1, $("#addLayerHtml"), "修改分类内容", 600, 400)
//                     // } else {
//                     // 	layer.msg("您当前没有编辑权限")
//                     // }

//             } else if (obj.event == "del") {
//                 // if(limitConfig("storeLimt", 3)) {
//                 delData(obj.data.id, where.TblNum, function() {
//                         tableins.reload()
//                     })
//                     // } else {
//                     // 	layer.msg("您当前没有删除权限")
//                     // }

//             }
//         })


//         form.on('submit(addsubmit)', function(data) {
//                 data.field.TblNum = "57"

//                 if ($('#addsubmit').html() == "修改") {
//                     postData("wwModifyDataById", data.field, function(data) {
//                         tipMsg(data, function() {
//                             tableins.reload();
//                         })

//                     })
//                 } else {

//                     postData("wwAddNewRow", data.field, function(data) {
//                         tipMsg(data, function() {
//                             tableins.reload();
//                         })
//                     })
//                 }
//                 layer.close(layerPage01)
//                 return false
//             })
//             //搜索
//             //		$('#searchData').click(function() {
//             //			where.QueryJllx = $("#jllx").val();
//             //			where.QueryType = $("#cxlb").val();
//             //			where.QueryKey = $("#keyWords").val();
//             //			tableins.reload({
//             //				where: where,
//             //				page: {
//             //						curr: 1
//             //					}
//             //			});
//             //
//             //		});

//         form.render()
//     })
// })

// function getSearchModule(tablenum) {
//     postData("wwGetDataList", {
//         TblNum: 77,
//         T777: "EQ" + tablenum,
//         orderby: "id",
//     }, function(data) {
//         getSelect("cxlb", data.data, "display", "", "chsx");
//         form.render("select")
//     })
// }

// function changeType(key) {
//     where_ = {}
//         //1)先判断是哪一个
//     for (var i = 0; i < typeData.length; i++) {
//         if (typeData[i]['TabChiName'] == key) {
//             var storeColnum = typeData[i].Querys.split("|")[0].split(",")[0];
//             var statusColnum = typeData[i].Querys.split("|")[1].split(",")[0];
//             where_.TblNum = typeData[i].TableNum;

//         }
//     }
// }