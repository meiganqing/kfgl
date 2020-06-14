//var id = window.location.href.getQuery("knbh");
//var TablNum = window.location.href.getQuery("TablNum");
//var check = window.location.href.getQuery("check");
//var echoDataId = ["库房名", "柜架号", "分区号", "层号"];
//var editId = "";
var form;
var where;
var type = window.location.href.getQuery("type");
var ids = window.location.href.getQuery("ids");

//if (check == 1) { //所有库房文物位置查看
//	$('#modifyData').hide();
//	$('#柜架号').attr('disabled', true);
//	$('#层号').attr('disabled', true);
//	$('#分区号').attr('disabled', true);
//}
layui.use(["form"], function () {
	form = layui.form
	$("#库房名").html(SysConfig.UserInfo.GetCookieName("mCurrentStorage"));
	if (type == "rk" || type == "rkAll") {
		$("#modifyData").html("入库")

		$("#移交人_tr").css('display', '');
		$("#监督人_tr").css('display', '');
		$("#接收人_tr").css('display', '');
		$("#录入人_tr").css('display', '');
		$("#录入人").val(SysConfig.UserInfo.GetUserName());
		$("#移交人").val(SysConfig.UserInfo.GetUserName());
		$("#监督人").val(SysConfig.UserInfo.GetUserName());
		$("#接收人").val(SysConfig.UserInfo.GetUserName());
	}
	//获取存储数据
	//		var positionData=store.get("pisitionData");

	//获取位置
	//getGuiJia(getCookieName("mCurrentStorage"));

	// 获取库房柜架
	var reData_kfgj = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
		XDLMCID: "1001",
		XDLMSID: "DYBH201908231246284628123181",
		XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
	});

	if (reData_kfgj.success) {
		//getSelect("groupkeyWords", data.data, "groupName");
		$('#柜架号').empty();
		for (var i = 0; i < reData_kfgj.rows.length; i++) {
			$('#柜架号').append('<option value="' + reData_kfgj.rows[i].柜架号 + '">' + reData_kfgj.rows[i].柜架号 + '</option>');
		}
		getCengHao(reData_kfgj.rows[0]['柜架号']);
	}
	//$("#录入人").html(getCookieName("mUserName"));

	form.on("select(store)", function (data) {
		getCengHao(data.value)
	})
	form.on("select(level)", function (data) {
		getFenQu($('#柜架号').val(),data.value)
	})

	$('#modifyData').click(function () {

		//data.field.XDLM表对应码 = "1";
		//判断是否有不在库数据
		var sid = "";
		if (type == "rk" || type == "rkAll") {
			//data.field.type = "入库"; //泾渭基地要求  入库时需要文物变更中记录
			//submitData("BatchSetLocation", data.field, "入库")
			if($('#移交人').val() == "" ||　$('#监督人').val() == ""　|| $('#接收人').val() == ""){
				layer.msg("请填写移交人/监督人/接收人信息！",{
					icon: 0,
					title: '提示框',
					time: 1500
				})
			}else{
				layer.confirm('确定要入库吗？', {
					btn: ['确定', '再想想'] //按钮
				}, function (){
					layer.msg('正在入库,请稍等...', {
						time: 0,
						shade: 0.3,
						//content: '测试回调',
						success: function (index, layero){
							
							setTimeout(function (){
								var ruku = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
									XDLMCID: "9000",
									XDLMTID: "9204",
									XDLMSID: "9204006",
									XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),
									mCurrentStorage: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
									XDLMids: ids,
									XDLM柜架号: $("#柜架号").val(),
									XDLM层号: $("#层号").val(),
									XDLM分区号: $("#分区号").val(),
									XDLM移交人: $("#移交人").val(),
									XDLM监督人: $("#监督人").val(),
									XDLM接收人: $("#接收人").val(),
									XDLM录入人: $("#录入人").val(),
									XDLMtype: "入库"
								});
								debugger;
								let msg;
								if (ruku.success) {
									msg = "入库完成！";
								}
								else {
									msg = "入库失败！";
								}
								layer.msg(msg, {
									time: 500,
									icon: 1
								}, function () {

									var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
									parent.layer.close(index543);
									parent.Callback();
								});
								
							},100)
						}
					})
				},function(index){
					layer.close(index);
				})
			}
			
			
			
		} else {
			//submitData("BatchSetLocation", data.field, "修改")
			var editList = [];
			var idList = ids.split(',');
			if (idList.length > 0) {
				switch (SysConfig.UserInfo.GetCookieName("kflx")) {
					case "文物":
						sid = "DYBH20190823124628462889251";
						break;
					case "拓片":
						sid = "DYBH2020042017561902954422";
						break;
				}
				for (var i in idList) {

					editList.push({ XDLMID: idList[i], XDLM柜架号: $("#柜架号").val(), XDLM层号: $("#层号").val(), XDLM分区号: $("#分区号").val() });
				}

				let re = SysConfig.SubSystemData.SYKFGL.BatchEditData(editList, sid);
				if (re.success) {
					msg = "修改完成！";
				}
				else {
					msg = "修改失败！";
				}
				
				layer.msg(msg, {
					time: 500,
					icon: 1
				}, function () {
					var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
					parent.layer.close(index543);
					parent.Callback();
				});
				
			}
			else {
				layer.msg("没有选中任何数据！");
				return false;
			}
		}

	});

	//form.on("submit(modifyData)", function (data) { //修改位置信息
	//	data.field.TblNum = TablNum;
	//	data.field.ids = store.get("pisitionData");
	//	data.field.mCurrentStorage = getCookieName("mCurrentStorage")
		

	//})
	form.render();
 

})


//function getGuiJia(data) {
//	postData("wwGetDataList", {
//		TblNum: 147,
//		T1472: "EQ" + data,
//		orderby: "id "
//	}, function (returndata) {
//		if (returndata.data.length > 0) {
//			getSelect("柜架号", returndata.data, "柜架号");
//			getCengHao(returndata.data[0]['柜架号']);
//		}

//		form.render("select");
//	})
//}

//function getCengHao(data) {
//	postData("wwGetDataList", {
//		TblNum: 158,
//		T1582: "EQ" + getCookieName("mCurrentStorage"),
//		T1583: "EQ" + data,
//		orderby: "id "
//	}, function (returndata) {
//		if (returndata.data.length > 0) {
//			getSelect("层号", returndata.data, "层号");
//			getFengQu(returndata.data[0]['层号']);
//		}

//		form.render("select");
//	})

//}

//function getFengQu(data) {
//	postData("wwGetDataList", {
//		TblNum: 151,
//		T1512: "EQ" + getCookieName("mCurrentStorage"),
//		T1513: "EQ" + $('#柜架号').val(),
//		T1514: "EQ" + data,
//		orderby: "id "
//	}, function (retrundata) {
//		if (retrundata.data.length > 0) {
//			getSelect("分区号", retrundata.data, "分区号");
//		}

//		form.render("select");

//	})
//}

function getFenQu(datagj, ceng) {

	var reData_fq = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
		XDLMCID: "1001",
		XDLMSID: "DYBH201908231246284628236171",
		XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
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
		XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
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



//function submitData(method, data, tip) {
//	layer.confirm('确定要' + tip + "？", {
//		btn: ['确定', '再想想'] //按钮
//	},
//		function () //确定
//		{
//			var layer003 = layer.msg('正在提交，请稍等...', {
//				icon: 1,
//				time: 5000,
//				success: function () {
//					postData(method, data, function (data) {
//						layer.msg(data.message, {
//							title: '提示框',
//							icon: 1,
//							time: 800
//						}, function () {
//							if (data.msg || data.success) {
//								layer.close(layer003)
//								var index852 = parent.layer.getFrameIndex(window.name); //获取窗口索引
//								if (tip == "修改") { //只修改位置
//									layer.close(index852)
//									QXALL()

//									return false
//								}
//								if (type == "rkAll") {
//									var layer003 = layer.confirm("是否打印入库单?", {
//										btn: ['是', '否'] //按钮
//									},
//										function () //确定
//										{
//											//printAllList(parent.knbhArry.join(","), data.log_codes,"入库单")
//											printAllList(parent.knbhArry.reverse().join(","), data.log_codes, "入库单")
//											tableins.reload()
//											layer.close(layer003)

//										},
//										function () {
//											QXALL()
//											tableins.reload()
//										}
//									);
//									//		parent.intoStorage(parent.tableData)
//								} else if (type == "rk") {

//									//		parent.intoStorageAll()
//									var layer003 = layer.confirm("是否打印" + tip + "单?", {
//										btn: ['是', '否'] //按钮
//									},
//										function () //确定
//										{
//											parent.layer.close(index852);
//											parent.printAllchildren(TablNum, knbh, data.log_codes)

//											parent.tableins.reload()
//											layer.close(layer003)

//										},
//										function () {
//											QXALL()
//											tableins.reload()
//										}
//									);
//								}

//							} else {
//								layer.close(layer003)
//							}
//						});
//					})
//				}
//			});

//		}
//	);

//}