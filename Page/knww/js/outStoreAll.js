var form, knbhList;
var relicObj = {
	'库内': '<option  value="库内">库内</option>',
	'库外': '<option  value="库外">库外</option>',
	'库内外': '<option  >库外</option>' + '<option  >库内</option>'
};
var wwlx = window.location.href.getQuery("wwlx");
var ids = window.location.href.getQuery("ids");
var table, cols, layer, tableins;  

layui.use(['form', 'table'], function () {
	form = layui.form;
	table = layui.table;

	var upload = layui.upload,
		laydate = layui.laydate;

	
	if (ids != null) {
		knbhList = ids.split(',');
	}
	else {
		knbhList = [];
	}
	//支持扫码枪
	$('#guncode').focus();


	//赋值到录入人栏
	$("#录入人").html(SysConfig.UserInfo.GetUserName());
	$("#移交人").val(SysConfig.UserInfo.GetUserName());
	$("#监督人").val(SysConfig.UserInfo.GetUserName());
	$("#接收人").val(SysConfig.UserInfo.GetUserName());



	setInterval(function () {
		$('#操作时间').html(SysConfig.ToolBox.CurrentDate() + " " + SysConfig.ToolBox.CurrentTime());
		$("#出库时间").val(SysConfig.ToolBox.CurrentDate() + " " + SysConfig.ToolBox.CurrentTime())
	}, 1000);



	//获取批次编号
	var returnData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
		XDLMCID: "9000",
		XDLMTID: "9204",
		XDLMSID: "9204002",
	});
	$('#批次编号').val(returnData.data);

	//上传图片
	//uploadImg = new UploadFile("filename", "filepath", "/xdGetData/DataHandler.ashx");
	//uploadImg.fileupload(changefileFJ, "#showfileFJ")


	// 获取出库事由（记录类型）下拉
	var reData_fq = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
		XDLMCID: "1001",
		XDLMSID: "DYBH20190823124628462861141",
		XDLMA: "出库",

	});
	if (reData_fq.success) {
		$('#记录类型').empty();
		for (var i = 0; i < reData_fq.rows.length; i++) {
			$('#记录类型').append('<option value="' + reData_fq.rows[i].记录类型 + '" attrdata="' + reData_fq.rows[i].出库范围 + '">' + reData_fq.rows[i].记录类型 + '</option>');
		}
		$("#记录类型").val("移库");
	}

 
	// 获取库房列表
	var reData_ckqx = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
		XDLMCID: "1001",
		XDLMSID: "DYBH201908231246284628130151",
		XDLMA: SysConfig.UserInfo.GetCookieName("kflx"),
	});
	if (reData_ckqx.success) {
		$('#目标库房').empty();
		for (var i = 0; i < reData_ckqx.rows.length; i++) {
			$('#目标库房').append('<option value="' + reData_ckqx.rows[i].库房名 + '">' + reData_ckqx.rows[i].库房名 + '</option>');
		}
	}

	$("#出库去向").append('<option value="库内">库内</option>');
	$("#出库去向").val("库内");
	$("#tjsq").html("出库")
	$("#库房显示").removeClass("layui-hide")
	$("#描述显示").addClass("layui-hide")
	$("#库外描述").removeAttr("lay-verify")

	//postData("wwGetDataList", {
	//	TblNum: 166,
	//	T1662: "EQ出库"
	//}, function (data) {
	//	getSelect("XDLM记录类型", data.data, "记录类型", "出库范围")

	//	var options = relicObj[data.data[2]['出库范围']]
	//	$("#出库去向").append(options)

	//	form.render('select');
	//})

	//获取库房
	//数据回显
	GetItemData();

	$('#guncode').keydown(function (event) {
		if (event.which == 13) {
			var checkStatus = table.checkStatus('mDataTable'),
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

	//点击出库事由出现出库去向判断
	form.on("select(记录类型)", function (data) {
		$("#出库去向").empty()
		var type = $(data.elem[data.elem.selectedIndex]).attr("attrdata")
		var options = relicObj[type]
		$("#出库去向").append(options)

		if ($("#出库去向").val() == "库内") {
			$("#tjsq").html("出库")
			$("#库房显示").removeClass("layui-hide")
			$("#描述显示").addClass("layui-hide")
			$("#库外描述").removeAttr("lay-verify")
		} else if ($("#出库去向").val() == "库外") {
			$("#tjsq").html("提交申请")
			$("#库房显示").addClass("layui-hide")
			$("#描述显示").removeClass("layui-hide")
		}
		form.render('select');
	});
	//点击出库事由出现出库去向判断
	form.on("select(出库去向)", function (data) {

		if (data.value == "库内") {
			$("#库房显示").removeClass("layui-hide")
			$("#描述显示").addClass("layui-hide")
			$("#库外描述").removeAttr("lay-verify")
		} else if (data.value == "库外") {
			$("#库房显示").addClass("layui-hide")
			$("#描述显示").removeClass("layui-hide")
			$("#目标库房").removeAttr("lay-verify")


		}
	});

	//获取文物出库清单
	tableins.on("tool(grid_table)", function (obj) {
		switch (obj.event) {
			case "del":
				obj.del();
				break;
		}
	})


	// 提交
	$('#tjsq').click(function () {
		//data.field.XDLM表对应码 = "1";
		//判断是否有不在库数据
		var KnbhArry = [];
		var DjhArry = []
		var checkStatus = table.checkStatus('mDataTable'),
			data = checkStatus.data;
			console.log(data)
		if (data.length > 0) {
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				if (data[i].库存状态 == "在库") {
					KnbhArry.push(data[i]['文物库内编号']);
					if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {
						DjhArry.push(data[i]['现藏品总登记号']);
					}
					else {  //拓片
						DjhArry.push(data[i]['整理编号']);
					}

				}
				else {  //非在库状态不可出库
					layer.msg("编号：【" + data[i]['文物库内编号'] + "】不可出库！");
				}
			}
		}
		else {
			layer.msg("出库清单为空");
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
				XDLM出库时间: $("#出库时间").val(),
				XDLM记录类型: $("#记录类型").val(),
				XDLM记录内容: $("#记录内容").val(),

			};


			if ($("#描述显示").hasClass("layui-hide")) {
				dataList.XDLM操作类型 = "出库";
				dataList.XDLM出库去向 = $("#出库去向").val() + "_" + $("#目标库房").val()
			} else {
				dataList.XDLM操作类型 = "待出库";
				dataList.XDLM出库去向 = $("#出库去向").val() + "_" + $("#库外描述").val()
			}
			var status_ = $("#记录类型").val();
			if (status_ == "移库" || status_ == "移交" || status_ == "文物出展") {
				dataList.XDLM库存状态 = "待出库"
			} else {
				dataList.XDLM库存状态 = status_
			}

			//data.field.XDLM图片地址 = uploadImg.addFileData("showfileFJ");

			layer.confirm("确定要批量出库吗？", {
				btn: ['确定', '再想想'] //按钮
			}, function () {
				var returnData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", dataList);

				if (returnData.success) {

					layer.msg('出库完成！', {
						time: 1000,
						icon: 1
					}, function () {
						// 导出word:
						outputFile.OutPutGuiKu("批量出库完成！是否打印出库单?", KnbhArry.join(","), returnData.log_codes, $('#批次编号').val(), "出库单", Callback);
						

					});

					
				}
				else {
					layer.msg("批量出库失败！" + returnData);
				}

			}, function () {

			});

		} else {
			layer.msg("文物出库清单为空")
		}

	});

	form.render()
})



// function checkStatus() {
// 	var flag = true
// 	var checkStatus = tableins.checkStatus('mDataTable'),
// 		data = checkStatus.data;
// 	if (data.length > 0) {
// 		for (var i = 0; i < data.length; i++) {
// 			if (data[i].length > 0) {
// 				if (data[i]['库存状态'] != "在库") {
// 					layer.msg("请移除不在库的文物再提交数据")
// 					flag = false
// 					break;
// 				}
// 			}
// 		}
// 	} else {
// 		flag = false

// 		layer.msg("文物出库清单为空")
// 	}
// 	return flag;
// }



function GetItemData() {
	let where;
	switch (wwlx) {
		case "ww":
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
					width: '12%',
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
					width: '13%',
					align: 'center',
					templet: '#opeTpl'
				}

				]
			];
			break;
		case "tp":
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
					field: '整理编号',
					title: '整理编号',
					width: '8%',
					align: 'center'
				}
					, {
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
					width: '17%',
					align: 'center',
					templet: '#opeTpl'
				}

				]
			];
			break;
	}
	if (knbhList != null) {
		tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(table, '文物列表', cols, where, 7);
	}
}

function Callback() {
	var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
	parent.layer.close(index543);
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