//var editId = window.location.href.getQuery("knbh"),
//	delData = [], //删除的数据数组
//	tabnum = window.location.href.getQuery("tabnum"),
//	tableins = "",

//var lastSendKnbh = [];

var form, knbhList;
 
var ids = window.location.href.getQuery("ids");
var tableins, cols, layer;  

layui.use(['element', 'table', 'layer', 'form'], function () {
	var form = layui.form,
		
	element = layui.element,
		layer = layui.layer;
	tableins = layui.table;
	if (ids != null) {
		knbhList = ids.split(',');
	}
	else {
		knbhList = [];
	}

	if (SysConfig.UserInfo.GetCookieName("kflx") == "文物")  {
		$('#wwType').html("文物");
	}
	else {
		$('#wwType').html("拓片");
	}
	
	//支持扫码枪
	$('#guncode').focus();
	$('#guncode').keydown(function (event) {
		if (event.which == 13) {
			var checkStatus = tableins.checkStatus('mDataTable'),
				data = checkStatus.data;
			if (data.length > 0) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].length > 0) {
						if (data[i]['文物库内编号'] != $('#guncode').val()) {
							knbhList.push($('#guncode').val());
							break;
						}
					}
				}
			}
			else {
				knbhList.push($('#guncode').val());
			}

			layer.msg('载入扫码数据...', {
				time: 800
			}, function () {
				GetItemData();
				$('#guncode').val("");
			});

		}
	});

	$("#currentStore").html(SysConfig.UserInfo.GetCookieName("mCurrentStorage"));
	$("#录入人").html(SysConfig.UserInfo.GetUserName());
	$("#移交人").val(SysConfig.UserInfo.GetUserName());
	$("#接收人").val(SysConfig.UserInfo.GetUserName());
	$("#监督人").val(SysConfig.UserInfo.GetUserName());
	//获取批次编号
	var returnData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
		XDLMCID: "9000",
		XDLMTID: "9204",
		XDLMSID: "9204002",
	});
	$('#批次编号').val(returnData.data);

	//数据回显
	GetItemData();
	setInterval(function () {
		$('#归库时间').html(SysConfig.ToolBox.CurrentDate() + " " + SysConfig.ToolBox.CurrentTime())
	}, 1000);
	//获取文物出库清单

	tableins.on("tool(grid_table)", function (obj) {
		switch (obj.event) {
			case "del":
				obj.del();
				break;
		}
	})

	//form.on('submit(tjsq)', function (data) {

	//	if (tabnum == "305") {
	//		store.get("batchReturnBoundww").split(",").filter(function (val, key) {
	//			//									if(delData.indexOf(val) == -1) {
	//			lastSendKnbh.push(val)
	//			//									}
	//		})
	//	} else if (tabnum == "386") {
	//		store.get("batchReturnBoundtp").split(",").filter(function (val, key) {
	//			//									if(delData.indexOf(val) == -1) {
	//			lastSendKnbh.push(val)
	//			//									}
	//		})
	//	}
	//	if (lastSendKnbh.length > 0) {
	//		var djhArry = []
	//		var rkData = ""
	//		if (tabnum = 305) {
	//			rkData = {
	//				TblNum: tabnum,
	//				T3056: "in(" + lastSendKnbh.join(",") + ") "
	//			}
	//		} else {
	//			rkData = {
	//				TblNum: tabnum,
	//				T3862: "in(" + lastSendKnbh.join(",") + ") "
	//			}
	//		}
	//		postData("wwGetDataList", rkData, function (returnData) {
	//			for (var i = 0; i < returnData.data.length; i++) {
	//				djhArry.push(returnData.data[i]['现藏品总登记号'])
	//			}
	//		}, "", false)

	//		data.field.WWDJBID = lastSendKnbh.join(",")
	//		data.field.XDLM登记号 = djhArry.join(",");
	//		data.field.XDLM录入人 = getCookieName("mUserName");
	//		data.field.XDLM批次编号 = $("#XDLM批次编号").val();
	//		data.field.XDLM库房名 = getCookieName("mCurrentStorage");
	//		data.field.XDLM操作类型 = "入库";
	//		data.field.XDLM出库去向 = $("#出库去向").html();
	//		data.field.XDLM记录类型 = "归还入库";
	//		data.field.XDLM状态 = "在库";
	//		data.field.XDLM图片地址 = "";
	//		submitData(data.field, "WenWuChuKu", "ModifyDataById")
	//		return false
	//	}
	//})

	$('#tjsq').click(function () {

		//data.field.XDLM表对应码 = "1";
		//判断是否有不在库数据
		var KnbhArry = [];
		var DjhArry = []
		var checkStatus = tableins.checkStatus('mDataTable'),
			data = checkStatus.data;
		if (data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].库存状态 == "文物出展" || data[i].库存状态 == "文物修复" || data[i].库存状态 == "资料整理" || data[i].库存状态 == "文物拍照" || data[i].库存状态 == "其他原因" || data[i].库存状态 == "调拨" || data[i].库存状态 == "移交") {
					KnbhArry.push(data[i]['文物库内编号']);
					if (SysConfig.UserInfo.GetCookieName("kflx") == "文物")  {
						DjhArry.push(data[i]['现藏品总登记号']);
					}
					else {
						DjhArry.push(data[i]['编号']);
					}

				}
				else {
					layer.msg("编号：【" + data[i]['文物库内编号'] + "】不可归库！");
				}
			}
		}
		else {
			layer.msg("归库清单为空");
		}



		if (KnbhArry.length > 0) {
			let dataList = {
				XDLMCID: "9000",
				XDLMTID: "9204",
				XDLMSID: "9204001",
				XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),
				WWDJBID: KnbhArry.join(","),
				XDLM登记号: DjhArry.join(","),
				XDLM录入人: SysConfig.UserInfo.GetUserName(),
				XDLM移交人: $("#移交人").val(),
				XDLM监督人: $("#监督人").val(),
				XDLM接收人: $("#接收人").val(),
				XDLM批次编号: $("#批次编号").val(),
				XDLM图片地址: "",
				XDLM归库时间: SysConfig.ToolBox.CurrentDate() + " " + SysConfig.ToolBox.CurrentTime(),
				XDLM记录类型: "归还入库",
				XDLM记录内容: $("#记录内容").val(),
				XDLM操作类型: "入库",
				XDLM出库去向: $("#出库去向").html(),
				XDLM状态: "在库" 
			};
 
			layer.confirm("确定要将文物归还入库吗？", {
				btn: ['确定', '再想想'] //按钮
			}, function () {
				var returnData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", dataList);

				if (returnData.success) {
					parent.Callback();
					// 导出word:
					outputFile.OutPutGuiKu("批量归还入库完成！是否打印归库单?", KnbhArry.join(","), returnData.log_codes, $('#批次编号').val(), "归库单", CloseWindow);
					 
				}
				else {
					layer.msg("归还入库失败！");
				}

			}, function () {

			});

		} else {
			layer.msg("文物出库清单为空")
		}

	});

});


 

 

function GetItemData() {
	let where;
	switch (SysConfig.UserInfo.GetCookieName("kflx")) {
		case "文物":
			where = {
				XDLMCID: "1001",
				XDLMSID: "DYBH20190823124628462889251",
				XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
				XDLMU: knbhList.join(','),
			};
			cols = [
				[{
					checkbox: true,
					LAY_CHECKED: false
				}, {
					title: '序号',
					type: 'numbers'
				}, {
					field: 'zt',
					title: '记录图',
					width: '7%',
					align: 'center',
					//templet: "#smallPicture"
				}, {
					field: '登记名称',
					title: '名称',
					width: '15%',
					align: 'center'
				}, {
					field: '文物库内编号',
					title: '现登记号',
					width: '8%',
					align: 'center'
				}, {
					field: '现藏品总登记号',
					title: '原登记号',
					width: '8%',
					align: 'center'
				}, {
					field: '库房名',
					title: '库房名',
					width: '10%',
					align: 'center',

				}, {
					field: '柜架号',
					title: '柜架号',
					width: '10%',
					align: 'center'
				},
				{
					field: '层号',
					title: '层号',
					width: '10%',
					align: 'center'
				},
				{
					field: '分区号',
					title: '分区号',
					width: '10%',
					align: 'center'
				}, {
					field: '库存状态',
					title: '库存状态',
					width: '5%',
					align: 'center',
					templet: '#kczt'
				}, {
					field: '',
					title: '操作',
					width: '12%',
					align: 'center',
					templet: '#opeTpl'
				}

				]
			];
			break;
		case "拓片":
			where = {
				XDLMCID: "1001",
				XDLMSID: "DYBH201908231246284628202221",
				XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
				XDLMU: knbhList.join(','),
			};
			cols = [
				[{
					checkbox: true,
					LAY_CHECKED: false
				}, {
					title: '序号',
					type: 'numbers'
				}, {
					field: 'zt',
					title: '记录图',
					width: '7%',
					hide: true,
					align: 'center',
					//templet: "#smallPicture"
				}, {
					field: '登记名称',
					title: '名称',
					width: '15%',
					align: 'center'
				}, {
					field: '文物库内编号',
					title: '文物库内编号',
					width: '8%',
					align: 'center'
				}, {
					field: '编号',
					title: '编号',
					width: '8%',
					align: 'center'
				}, {
					field: '库房名',
					title: '库房名',
					width: '10%',
					align: 'center',

				}, {
					field: '柜架号',
					title: '柜架号',
					width: '10%',
					align: 'center'
				},
				{
					field: '层号',
					title: '层号',
					width: '10%',
					align: 'center'
				},
				{
					field: '分区号',
					title: '分区号',
					width: '10%',
					align: 'center'
				}, {
					field: '库存状态',
					title: '库存状态',
					width: '5%',
					align: 'center',
					templet: '#kczt'
				}, {
					field: '',
					title: '操作',
					width: '12%',
					align: 'center',
					templet: '#opeTpl'
				}

				]
			];
			break;
	}
	if (knbhList != null) {
		
		tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 7);
	}
}

function CloseWindow() {
	var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭  
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