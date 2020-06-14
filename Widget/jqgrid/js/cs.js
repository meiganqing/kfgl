$(function(){
	//页面加载完成之后执行
	pageInit();
});
function pageInit(){
	//创建jqGrid组件
	jQuery("#list2").jqGrid({

		url: '/xdData/xdDataManage.ashx?XAction=GetDataList&XKLX=syyh', //#后端的数据交互程序，改为你的
		datatype: "json", //前后交互的格式是json数据
		mtype: 'post', //交互的方式是发送httpget请求
		postData: {
			XDLMGridType: "jqgrid",
			XDLMTableName: 'xdRole',
			XDLMTable_OrderBy: 'order by id desc',
//			page: 1,
//			rows: 10,
//			XDLMTable_Where: XMNum
		},
		altRows: true,
		altclass: 'rowStyle',
		viewrecords: true,
		height:600,
		colNames: ['序号', '角色名称', '角色描述', '操作'], //表格的列名
		colModel: [{
				name: 'rank',
				index: '序号',
				width: 50,
				align: "center",
				sortable: true,
				height: 30
			}, {
				name: '角色名称',
				index: '角色名称',
				width: 150,
				sortable: false,
				align: "center",
				height: 30,
				formatter: function (cellvalue, options, rowObject) {
					return rowObject.rolename;
				}
			}, {
				name: '角色描述',
				index: '角色描述',
				align: "center",
				width: 300,
				ssortable: false,
				height: 30,
				formatter: function (cellvalue, options, rowObject) {
					return rowObject.miaoshu;
				}
			},
			{
				name: '操作',
				index: '操作',
				width: 150,
				align: "center",
				height: 30,
				formatter: function (cellvalue, options, rowObject) {
					var html = '';
//					if (qx1.substring(2, 3) == "1") {
						//编辑
						html += '<a title="设置" onclick="setXMById(' + "'" + rowObject.id + "'" + ',' + "'" + rowObject.rolename + "'" + ',' + "'" + rowObject.qx + "'" + ',' + "'" + rowObject.itemlm + "'" + ')" href="javascript:;" class="btn btn-white btn-purple btn-sm">权限设置</a> <a title="编辑" onclick="ModifyXMById(' + "'" + rowObject.id + "'" + ')" href="javascript:;" class="btn btn-white btn-purple btn-sm">编辑</a> ';
//					}
//					if (qx1.substring(3, 4) == "1") {
						//删除
//						if(rowObject.rolename=='系统管理员'){
//							html+='';
//						}else{
							html += '<a title="删除" href="javascript:;" onclick="DelXMById(' + "'" + rowObject.id + "'" + ',' + "'" + rowObject.rolename + "'" + ');" class="btn btn-white btn-danger btn-sm">删除</a>';
//						}
						
//					}

					return html;
				}
			}
		],
		rowNum: 10,
		rowList: [10, 20, 30, 50, 100, 200, 500],
		pager: $("#pager2"),
		viewrecords: true,
		forceFit: true,
//		caption : "项目表",
		autowidth: true,
		loadError: function (xhr, status, error) {
			alert(status + error);
		},
		loadComplete: function (data) {
			console.log(data);
			var table = this;

			//var a = $(grid_selector).jqGrid('getRowData', rowId);

			//var para = "where 项目编号='" + a.项目编号 + "'";
//			var grid = $(grid_selector);
//			var ids = grid.getDataIDs();
//			for (var i = 0; i < ids.length; i++) {
//				grid.setRowData(ids[i], false, {
//					height: h1
//				});
//			}
//			$('#load_grid-table')[0].style.display = 'none';
//			setTimeout(function () {
				//styleCheckbox(table);
				//updateActionIcons(table);
//				updatePagerIcons(table);
				//enableTooltips(table);
//			}, 0);
		}

	});
	/*创建jqGrid的操作按钮容器*/
	/*可以控制界面上增删改查的按钮是否显示*/
	jQuery("#list2").jqGrid('navGrid', '#pager2', {edit : false,add : false,del : false});
}
function addRole(){
	
}