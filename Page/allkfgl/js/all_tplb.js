/**
 * Created by xh on 2020/04/16
 * 文件名: all_tplb.js
 * 作　者: 徐航
 * 日　期: 2020/04/16
 * 描　述: 接口调用更换，权限配置
 * 版　本: 1.00
 * 修改历史纪录:
 * 版本     时间           姓名         内容
 2. 02   2020/04/16     徐航       接口调用更换，权限配置
 */
var $, form, element, table, layer, tableins, where;
layui.use(["jquery", "form", "layer", "table", "element"], function() {
  ($ = layui.$),
    (layer = layui.layer),
    (table = layui.table),
    (element = layui.element),
    (form = layui.form);

    getQueryList(); // 查询下拉

    where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231246284628202221",     
        // XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage")
    };


    
    var cols = [
        [
          { type: "checkbox" },
          { field: "id", title: "id", width: "1%", hide: true, align: "center" },
          {
            field: "编号",
            title: "编号",
            width: "8%",
            sort: true,
            align: "center",
            templet: function(d) {
              return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.编号);
            }
          },
          {
            field: "新编号",
            title: "新编号",
            width: "12%",
            sort: true,
            align: "center",
            templet: function(d) {
              return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.新编号);
            }
          },
          {
            field: "登记名称",
            title: "登记名称",
            width: "8%",
            sort: true,
            align: "center",
            templet: function(d) {
              return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.登记名称);
            }
          },
          {
            field: "拓片年度",
            title: "拓片年度",
            width: "7%",
            sort: true,
            align: "center",
            templet: function(d) {
              return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.拓片年度);
            }
          },
          {
            field: "文物点名称",
            title: "文物点名称",
            width: "9%",
            sort: true,
            align: "center",
            templet: function(d) {
              return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.文物点名称);
            }
          },
          {
            field: "载体一类型",
            title: "载体一类型",
            width: "10%",
            sort: true,
            align: "center",
            templet: function(d) {
              return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.载体一类型);
            }
          },
          {
            field: "载体二类型",
            title: "载体二类型",
            width: "10%",
            sort: true,
            align: "center",
            templet: function(d) {
              return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(),d.载体二类型);
            }
          },
          {
            field: "存放位置",
            title: "存放位置",
            width: "15%",
            sort: true,
            align: "center",
            templet: function(d) {
              return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.库房名) + " " + SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.柜架号) + " " + SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.层号) + " " + SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.分区号);
            }
          },
          {
            field: "库存状态",
            title: "库存状态",
            width: "8%",
            sort: true,
            align: "center",
            templet: function(d) {
              return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(),d.库存状态);
            }
          },
          {
            title: "操作",
            width: "10%",
            align: "center",
            templet: function(d) {
                let html = '';
                html = `<a class="layui-btn layui-btn-xs" lay-event="label">标签</a><a class="layui-btn layui-btn-danger layui-btn-xs btn-width" lay-event="check">详情</a>`
                return html;
            }
          }
        ]
      ];

    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(table, "全库房拓片列表", cols, where, 19);

    table.on("tool(grid_table)", function(obj) {
        var data = obj.data;
        if(obj.event == "label"){
            SysConfig.ToolBox.openWindow('/SYKFGL/Page/knww/page/printQRCode.html?knbh=' + data.文物库内编号 + '&type=1', "标签打印", 350, 400);
        }else if(obj.event == "check"){
            SysConfig.ToolBox.openWindow('/SYKFGL/Page/knww/page/carrierDetail.html?knbh=' + data.文物库内编号 + "&check=1", "查看详情", $(window).width(), $(window).height());
        }
      
    })

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

    // var reData_kfgj = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
    //     XDLMCID: "1001",
    //     XDLMSID: "DYBH201908231246284628123181",
    // });

    // if (reData_kfgj.success) {
    //     //getSelect("groupkeyWords", data.data, "groupName");
    //     $('#柜架号').empty();
    //     for (var i = 0; i < reData_kfgj.rows.length; i++) {
    //         $('#柜架号').append('<option value="' + reData_kfgj.rows[i].柜架号 + '">' + reData_kfgj.rows[i].柜架号 + '</option>');
    //     }
    //     getCengHao(reData_kfgj.rows[0]['柜架号']);
    // }

    // form.on("select(柜架号)", function (data) {
    //     getCengHao(data.value)
    //     form.render("select")
    // })
    // form.on("select(层号)", function (data) {
    //     getFenQu($("#柜架号").val(), data.value)
    //     form.render("select")
    // })

    form.on('select(zkzt)', function (data) { //切换在库状态
      if (data.value == "所有") {
          where = {
              XDLMCID: "1001",
              XDLMSID: "DYBH201908231246284628202221",
              // XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
          };
      } else {
          where = {
              XDLMCID: "1001",
              XDLMSID: "DYBH201908231246284628202221",
              // XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
              XDLMA: data.value,

          };
      }
      tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '全库房拓片列表', cols, where, 17);
  })

  form.on("select(cxlb)", function (data) {
      changeSearchType(data.value)

  })

    //查询
    $("#searchData").click(function() {
      switch ($("#cxlb").val()) {
        case "模糊查询":
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH201908231246284628202221",
                // XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                QueryType: '模糊查询',
                QueryKey: $('#queryK').val()
            };
            break;
        case "XDLMI":
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH201908231246284628202221",
                // XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                XDLMP: $("#groupkeyWords").val()
            };
            break;
        case "warehouse":
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH201908231246284628202221",
                // XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                XDLMR: $("#柜架号").val(),
                XDLMS: $("#层号").val(),
                XDLMT: $("#分区号").val()
            };
            break;
        default:
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH201908231246284628202221",
                // XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),

            };
            where[$("#cxlb").val()] = $('#queryK').val()
            break;

    }

    if ($("#zkzt").val() != "所有") {
        where.XDLMA = $("#zkzt").val();
    }







        // where.QueryType = $("#queryT").val();
        // where.QueryKey = $("#queryK").val();
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(table, "全库房拓片列表", cols, where, 17);
        
    });
    

    form.render();

})

//查询下拉
function getQueryList() {
    $("#queryT").empty();
    $("#queryT").append('<option value=" "></option>');
    var returnData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
      XDLMCID: "1001",
      XDLMSID: "DYBH2020041613551907571632"
    });
    if (returnData.success) {
      console.log(returnData);
      for (var i in returnData.rows) {
        $("#queryT").append('<option value="' + returnData.rows[i].查询属性 + '">' + returnData.rows[i].查询显示名 + "</option>" );
      }
      $("#queryT").find("option[value='模糊查询']").attr("selected", true);
    }
  }


  function changeSearchType(value) {
    if (value == "XDLMI") { //分组
        $("#XDLMIDiv").removeClass("layui-hide");
        $('#keyworDiv').addClass("layui-hide");
        $('#warehouseDiv').addClass("layui-hide");
        $("#queryK").val("")
    } else if (value == "warehouse") { //存放位置
        $("#warehouseDiv").removeClass("layui-hide");
        $("#XDLMIDiv").addClass("layui-hide");
        $('#keyworDiv').addClass("layui-hide");
        $("#queryK").val("")
    } else { //正常
        $("#keyworDiv").removeClass("layui-hide");
        $("#warehouseDiv").addClass("layui-hide");
        $("#XDLMIDiv").addClass("layui-hide");
    }
}

function getFenQu(datagj, ceng) {

  var reData_fq = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
      XDLMCID: "1001",
      XDLMSID: "DYBH201908231246284628236171",
      XDLMB: datagj,
      XDLMC: ceng,
  });
  if (reData_fq.success) {
      $('#分区号').empty();
      for (var i = 0; i < reData_fq.rows.length; i++) {
          $('#分区号').append('<option value="' + reData_fq.rows[i].分区号 + '">' + reData_fq.rows[i].分区号 + '</option>');
      }
      form.render("select")
  }
}

function getCengHao(datagj) { //获取柜架号
  var reData_ceng = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
      XDLMCID: "1001",
      XDLMSID: "DYBH20190823124628462826161",
      XDLMB: datagj,
  });
  if (reData_ceng.success) {
      $('#层号').empty();
      for (var i = 0; i < reData_ceng.rows.length; i++) {
          $('#层号').append('<option value="' + reData_ceng.rows[i].层号 + '">' + reData_ceng.rows[i].层号 + '</option>');
      }
      getFenQu(datagj, reData_ceng.rows[0].层号);

  }
}



























// var tableins = "",
//     limit = 17,
//     where = {
//         TblNum: 386,
//         // T38672: "EQ" + getCookieName("mCurrentStorage"),
//         orderby: "id desc"
//     },
//     form;

// $(function() {
//     layui.use(['element', 'table', 'layer', 'form'], function() {
//         var table = layui.table;
//         element = layui.element,
//             layer = layui.layer;
//         form = layui.form;
//         postData("wwGetDataList", {
//             TblNum: 77,
//             T777: "EQ" + 386,
//             orderby: "id"
//         }, function(data) {
//             getSelect("searchType", data.data, "display", "", "chsx")
//         });
//         getTable("djblb", where, "djblb");



//         //获取库房下拉选项
//         postData_("GetDataInterface", {
           
//             XDLMCID: "1001",
//             XDLMSID: "DYBH201908231246284628130151",
//             XDLMA: "拓片"
//         }, function(returnData) {
//             if (returnData.rows) {


//                 getSelect("XDLM库房", returnData.rows, "库房名");
//                 if (returnData.rows[0].库房名) {
//                     getguijiaHao(returnData.rows[0].库房名)
//                 }
//             }

//         }, "/xdData/xdDataManage.ashx", "", "XKLX=SYKFGL");


       
//         form.on("select(XDLM库房)", function(data) {
//             getguijiaHao(data.value)
//             form.render("select")
//         })
//         form.on("select(XDLM柜架号)", function(data) {
//             getCengHao($("#XDLM库房").val(), data.value)
//             form.render("select");
//         });
//         form.on("select(XDLM层号)", function(data) {
//             getFenQu($("#XDLM库房").val(), $("#XDLM柜架号").val(), data.value)
//             form.render("select");
//         });
//         changeSearchType($("#searchType").val()); //默认显示的
//         //table操作事件
//         table.on('tool(djblb)', function(obj) {
//             var data = obj.data;
//             getRowColor(obj)
//             switch (obj.event) {
//                 case "edit":
//                     if (limitConfig("storeLimt", 2)) {
//                         layerPage01 = openWindow(2, 'add_carrier.html?id=' + data.id, "修改", $(window).width(), $(window).height());
//                     } else {
//                         layer.msg("您没有编辑权限")
//                     }
//                     break;
//                 case "del":
//                     if (limitConfig("storeLimt", 3)) {
//                         delData(data.id, where.TblNum, function() {
//                             layer.msg('删除成功！', {
//                                 title: '提示框',
//                                 icon: 1,
//                                 time: 800
//                             }, function(alertindex) {

//                                 tableins.reload();
//                             });
//                         })
//                     } else {
//                         layer.msg("您没有删除权限")
//                     }
//                     break;
//                 case "ck":
//                     if (limitConfig("storeLimt", 2)) {
//                         layerPage01 = openWindow(2, 'wwckdjb.html?type=tp&knbh=' + data['文物库内编号'] + '&id=' + data.id, "详细信息", $(window).width(), $(window).height());

//                     } else {
//                         layer.msg("您没有编辑权限")
//                     }
//                     break;
//                 case "xq":
//                     openWindow(2, '../knww/page/carrierDetail.html?knbh=' + data['文物库内编号'] + "&check=1", "查看详情", $(window).width(), $(window).height());
//                     break;
//                 case "gh":
//                     if (limitConfig("storeLimt", 2)) {
//                         layerPage01 = openWindow(2, 'returnCarrier.html?knbh=' + data['文物库内编号'], "归还", $(window).width(), $(window).height())

//                     } else {
//                         layer.msg("您没有编辑权限")
//                     }
//                     break;
//                 case "wz":
//                     if (limitConfig("storeLimt", 2)) {
//                         layerPage04 = openWindow(2, '../kfgl/page/scanStore.html?knbh=' + data['文物库内编号'] + "&type=crList&TablNum=386" + "&check=1", "位置信息", $(window).width() - 800, $(window).height() - 400)

//                     } else {
//                         layer.msg("您没有编辑权限")
//                     }
//                     break;
//                 case "label":
//                     layerPage04 = openWindow(2, '../knww/page/printQRCode.html?knbh=' + data['文物库内编号'] + '&type=1', "标签打印", 350, 400);
                   
//                     break;
//             }

//         });

//         //查询类别查询
//         form.on("select(searchType)", function(data) {
//             changeSearchType(data.value)
//         });
//         form.render();
//         //关键字查询
//         $('#searchData').click(function() {

//             cahngeWhere();
//             tableins.reload({
//                 where: where

//             });
//             var page = 1

//         });
//         $('#YZClass').click(function(e) {
//             e.preventDefault();
//             addFL();
//         });
//         $("#add").click(function() {
//             layerPage01 = openWindow(2, 'add_carrier.html', "新增拓片", $(window).width(), $(window).height())

//         });
//         $('#outfile').click(function(e) {

//             var ids = [];
//             layui.use('table', function() {
//                 var table = layui.table;
//                 var checkStatus = table.checkStatus('tableLayui'),
//                     data = checkStatus.data;
//                 for (var i = 0; i < data.length; i++) {
//                     ids.push(data[i].id);
//                 }
//             });
//             e.preventDefault();
//             outfile("386", ids, "T3861");
//         });
//         //批量出库
//         $("#batchOutStore").click(function() {
//             var ids = [];
//             var flag = true;
//             var checkStatus = table.checkStatus('tableLayui'),
//                 data = checkStatus.data;
//             for (var i = 0; i < data.length; i++) {
//                 if (data[i]['库存状态'] == "在库" || data[i]['库存状态'] == "归还入库") {
//                     ids.push(data[i]['文物库内编号']);
//                 } else {

//                     flag = false;
//                     layer.msg("请选择在库的文物");
//                     break;
//                     return flag
//                 }

//             }
//             if (flag) {
//                 batchCK("WenWuChuKu", ids, "WWDJBID", "386")
//             }

//         });
//         //文物组
//         $("#grounp").click(function() {
//             var ids = [];
//             var checkStatus = table.checkStatus('tableLayui'),
//                 data = checkStatus.data;
//             for (var i = 0; i < data.length; i++) {

//                 ids.push(data[i]['文物库内编号']);

//             }
//             batchGroup(ids)
//         });
//         //编辑分组
//         $("#editgrounp").click(function() {
//             layerPage01 = openWindow(2, '../../xtgl/wwz.html?tabnum=386', "", $(window).width() - 100, $(window).height() - 100)
//         })
//     });
// });

// function batchGroup(ids) { //批量出库
//     if (ids.length == 0) {
//         layer.msg('请先选中行！', {
//             title: '提示框',
//             icon: 0,
//             time: 800
//         });
//     } else {
//         store.set("volumeGroup", ids.join(","));
//         layerPage01 = openWindow(2, 'volumeGroup.html?tabnum=386', "", $(window).width() - 100, $(window).height() - 100)

//     }
// }

// function getFenQu(kfdata, gjdata, cengdata) { //分区号
//     postData("wwGetDataList", {
//         TblNum: 151,
//         T1512: "EQ" + kfdata,
//         T1513: "EQ" + gjdata,
//         T1514: "EQ" + cengdata,
//     }, function(data) {
//         if (data.data && data.data.length > 0) {
//             getSelect("XDLM分区号", data.data, "分区号")
//         }
//         form.render("select")
//     })
// }

// function getCengHao(kfdata, gjdata) { //获取层号
//     layui.use(['form'], function() {
//         postData("wwGetDataList", {
//             TblNum: 158,
//             T1582: "EQ" + kfdata,
//             T1583: "EQ" + gjdata
//         }, function(data) {
//             if (data.data && data.data.length > 0) {
//                 getSelect("XDLM层号", data.data, "层号")
//                 if (data.data[0]['层号']) {
//                     getFenQu(kfdata, gjdata, data.data[0]['层号'])
//                 }
//             } else {
//                 $('#XDLM层号').empty();
//                 $('#XDLM分区号').empty();
//             }

//             form.render("select")
//         })
//     })
// }

// function getguijiaHao(kfdata) { //获取柜架号
//     layui.use(['form'], function() {
//         postData("wwGetDataList", {
//             TblNum: 158,
//             T1582: "EQ" + kfdata,
//             // T1583: "EQ" + datagj
//         }, function(data) {
//             if (data.data && data.data.length > 0) {
//                 let wwkf = []
//                 let gjkf = []
//                 for (let i in data.data) {
//                     // console.log(wwkf.includes(data.data[i].柜架号))
//                     if (gjkf.includes(data.data[i].柜架号)) {

//                     } else {
//                         gjkf.push(data.data[i].柜架号)
//                         wwkf.push(data.data[i])
//                     }
//                 }
//                 // console.log(wwkf)
//                 getSelect("XDLM柜架号", wwkf, "柜架号")
//                 if (data.data[0]['柜架号']) {
//                     getCengHao(kfdata, data.data[0]['柜架号'])
//                 }
//             } else {
//                 $('#XDLM柜架号').empty();
//                 $('#XDLM层号').empty();
//                 $('#XDLM分区号').empty();
//             }

//             form.render("select")
//         })
//     })
// }

// function changeSearchType(value) {
//     $(".search-type").addClass("layui-hide");
//     if (value == "文物组" || value == "warehouse") {
//         $("#" + value + "Div").removeClass("layui-hide");
//     } else {
//         $("#keyworDiv").removeClass("layui-hide");
//     }
// }

// function cahngeWhere() {
//     where.QueryType = $("#searchType").val();
//     $(".search-type").each(function(key, val) {

//         if (!$(val).hasClass("layui-hide"))

//         {

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