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


    //获取文物组下拉选项
    let  reData_wwfz = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH2020042112390205445173",
    });

    if (reData_wwfz.success) {
        //getSelect("groupkeyWords", data.data, "groupName");
        $('#queryT').empty();
        for (var i = 0; i < reData_wwfz.rows.length; i++) {
            $('#queryT').append('<option value="' + reData_wwfz.rows[i].查询属性 + '">' + reData_wwfz.rows[i].查询显示名 + '</option>');
        }

    }


    where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH2019082312462846286081",   
    };

    var colList = [
        [
          { type: "checkbox" },
          { field: "id", title: "id", width: "1%", hide: true, align: "center" },
          {
				field: 'mUserName',
				title: '用户名',
				width: '10%',
				sort: true,
				align: 'center',
				templet: function (d) {
					return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.mUserName);
				}
			}, {
				field: 'mDataTime',
				title: '时间',
				width: '15%',
				sort: true,
				align: 'center',
				templet: function (d) {
					return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.mDataTime);
				}
			}, {
				field: 'mUserIP',
				title: 'IP地址',
				width: '15%',
				sort: true,
				align: 'center',
				templet: function (d) {
					return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.mUserIP);
				}
			}, {
				field: 'mUserBehavior',
				title: '记录类型',
				width: '16%',
				sort: true,
				align: 'center',
				templet: function (d) {
					return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.mUserBehavior);
				}
			}, {
				field: 'mUserContent',
				title: '记录内容',
				width: '40%',
				sort: true,
				align: 'center',
				templet: function (d) {
					return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.mUserContent);
				}
			},
        ]
      ];

    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(table, "系统日志列表", colList, where, 18);

    
   


    //查询
    $("#searchData").click(function() {
        where.QueryType = $("#queryT").val();
        where.QueryKey = $("#queryK").val();
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(table, "系统日志列表", colList, where, 18);
        
    });
    

    form.render();

})







// var tableins = "";
// var limit = 17,
// 	where = {
// 		TblNum: 32,
// 	}

// $(function (){
// 	layui.use(["form","table"],function (){
// 		var form = layui.form,
// 			table = layui.table
// 		getTable("demo", where)
// 			//查询类别
// 		postData("wwGetDataList", {
// 			TblNum: 77,
// 			T777: "EQ" + 32,
// 			orderby:"id"
// 		}, function(data) {
// 			getSelect("wwtype", data.data, "display","chsx")
// 			form.render("select")
// 		})
// 			//搜索
// 		$('#searchData').click(function() {
	
// 			where.QueryType = $("#wwtype").find("option:selected").attr("attrdata");

// 			where.QueryKey = $("#keyWords").val();
// 			tableins.reload({
// 				where: where,
// 			});
// 		});
// 	})
// })
