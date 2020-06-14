var knbh = window.location.href.getQuery("knbh");
var lsh = window.location.href.getQuery("lsh");
var type = window.location.href.getQuery("type")

var operateType, form, table,element, shzt;

layui.use(['element', 'table', 'layer', 'form'], function () {
	form = layui.form;
	table = layui.table;
	element = layui.element;
	layer = layui.layer;

	$("#approvePeople").val(SysConfig.UserInfo.GetUserName());


	echoData(knbh);

	form.on("radio(approveIdea)", function (data) {

		shzt = data.value;
		if (data.value.indexOf("拒绝") != -1) {
			$("#approveIdea").removeClass("layui-hide")
		} else {
			$("#approveIdea").addClass("layui-hide")
		}

	})
	//form.on('submit(submit)', function (data) {
	//	submitData(data.field, "WenWuShenHe")
	//	return false
	//})

	$('#wwrkbc').click(function (e) {
		//var method = xaction;
		//var tip = '确定要审核通过吗';
		//if (data.XDLM审核状态.indexOf("拒绝") != -1) {
		//	tip = '确定要拒绝' + operateType + '吗';
		//}
		layer.confirm('确定要提交审核吗', {
			btn: ['确定', '再想想'] //按钮
		}, function () { //确定
				layer.msg('正在提交，请稍等...', {
					icon: 1,
					time: 500,
					success: function () {
						var sh = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
							XDLMCID: "9000",
							XDLMTID: "9204",
							XDLMSID: "9204007",
							XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),
							XDLM文物库内编号: $("#文物库内编号").val(),
							XDLM记录表流水号: $("#记录表流水号").val(),
							XDLM审核状态: shzt,
							XDLM审核人: SysConfig.UserInfo.GetUserName(),
							XDLM审核意见: $("#审核意见").val(),
							XDLM审核时间: SysConfig.ToolBox.CurrentDate() + " " + SysConfig.ToolBox.CurrentTime()
						});

						if (sh.success) {

							if (type == "ck") {
								layer.msg("出库审核完成!", {
									time: 1000,
									end: function () {
										Callback();
										// var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
										// parent.layer.close(index); //再执行关闭   
									}
								});


							}
							else {
								layer.msg("入库审核完成!", {
									time: 1000,
									end: function () {
										Callback();
										// var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
										// parent.layer.close(index); //再执行关闭   
									}
								});
							}

							
						}
						else {
							layer.msg("审核失败!" + sh);
						}
						//postData(method, data, function (data) {
						//	layer.msg(data.message, {
						//		title: '提示框',
						//		icon: 1,
						//		time: 800
						//	}, function () {
						//		if (data.success) {
						//			QXALL()

						//		}
						//	});

						//})

					}
				});
			}

		);
	});


	form.render();
});


function echoData(knbh) { //回显数据

	if (type == "ck") {
		$("#approveMsg").html('<i class="title-icon fa fa-tags"></i>出库信息')
		$("#approvelType").html('<i class="title-icon fa fa-tags"></i>出库审核')
		shzt = "同意出库";
		$("#approveStatus").append(`<input type="radio" name="XDLM审核状态" lay-filter="approveIdea" value="同意出库" title="同意出库" checked>
											<input type="radio" name="XDLM审核状态" lay-filter="approveIdea" value="拒绝出库" title="拒绝出库">`)
	} else if (type == "rk") {
		$("#approveMsg").html('<i class="title-icon fa fa-tags"></i>入库信息')
		$("#approvelType").html('<i class="title-icon fa fa-tags"></i>入库审核')
		shzt = "同意入库";
		$("#approveStatus").append(`<input type="radio" name="XDLM审核状态" value="同意入库" title="同意入库" lay-filter="approveIdea" checked >
                  <input type="radio" name="XDLM审核状态" value="拒绝出库" title="拒绝入库" lay-filter="approveIdea" ">`)
	}

	if (knbh) {
		//请求数据
		let sid;
		if(SysConfig.UserInfo.GetCookieName("kflx") == "文物"){
			sid = "DYBH20190823124628462889251";
		}else{
			sid = "DYBH201908231246284628202221";
		}
		let wwxx = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
			XDLMCID: "1001",
			XDLMSID: sid,
			XDLMU: knbh
		});
		let lsh = [];
		let bh = [];
		for (var i in wwxx.rows) {
			bh.push(wwxx.rows[i].文物库内编号);
			lsh.push(wwxx.rows[i].记录表流水号);
		}
		$("#文物库内编号").val(bh.join(","));
		$("#记录表流水号").val(lsh.join(","));
		let wwxx_jilu = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
			XDLMCID: "1001",
			XDLMSID: "DYBH20190823124628462810231",
			XDLME: wwxx.rows[0]["记录表流水号"]
		});
		if (wwxx_jilu.success) {
			for (var k in wwxx_jilu.rows[0]) {
				$("#XDLM" + k).html(wwxx_jilu.rows[0][k])
			}


			//获取图片
			if (bh.length == 1) {
				let wwxx_jilu_image = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
					XDLMCID: "1001",
					XDLMSID: "DYBH20190823124628462861241",
					XDLMA: wwxx.rows[0]["记录表流水号"]
				});
				if (wwxx_jilu_image.success) {
					if (wwxx_jilu_image.rows.length > 0) {
						for (var i = 0; i < wwxx_jilu_image.rows.length; i++) {
							showPicture(wwxx_jilu_image.rows[i]['图片地址'], "picBodyCK") //获取图片
						}
					}
				}
			}

			//postData("wwGetDataList", {
			//	TblNum: "119",
			//	T1193: "EQ" + data.data[0]["记录表流水号"]
			//}, function (data2) {
			//	if (data2.data.length > 0) {
			//		for (var i = 0; i < data2.data.length; i++) {
			//			showPicture(data2.data[i]['图片地址'], "picBodyCK") //获取图片
			//		}
			//	}


			//})
		}
		//postData("wwGetDataList", {
		//	TblNum: "178",
		//	T17812: "EQ" + editId,
		//	orderby: "记录时间 desc"

		//}, function (data) {

		//	for (var k in data.data[0]) {
		//		$("#XDLM" + k).html(data.data[0][k])
		//	}
		//	$("#wwknbh").val(data.data[0]["文物库内编号"])
		//	$("#jlblsh").val(data.data[0]["记录表流水号"])
		//	//获取图片
		//	postData("wwGetDataList", {
		//		TblNum: "119",
		//		T1193: "EQ" + data.data[0]["记录表流水号"]
		//	}, function (data2) {
		//		if (data2.data.length > 0) {
		//			for (var i = 0; i < data2.data.length; i++) {
		//				showPicture(data2.data[i]['图片地址'], "picBodyCK") //获取图片
		//			}
		//		}


		//	})

		//	//showPicture(data.data[0]['记录图'], "picBodyCK") //获取图片

		//})

	}
}



function showPicture(picUrl, id, width, height) { //查看详情显示图片

	var width_ = width ? width : 96;
	var height_ = height ? height : 96;
	if (picUrl) {
		var html = "";

		var imgArry = picUrl ? picUrl.split("|") : [];

		if (imgArry.length > 0) {
			for (var i = 0; i < imgArry.length; i++) {
				if (imgArry[i]) {
					html += `<div class="imgDiv" style="cursor: pointer;float:left;width:128px;height:128px;margin-right: 5px;">
								<div class="layadmin-homepage-pad-ver"  onclick="lookPic('${imgArry[i].split(',')[0]}')">
									<img data-title="查看详情" style="max-width:${width_}px;max-height:${height_}px;" class="layadmin-homepage-pad-img" src="${imgArry[i].split(',')[0].replace('ss.', '.')}">
								</div>
							</div>`
				}

			}
		}

		$("#" + id).append(html)
	}
}

function lookPic(path){
	SysConfig.ToolBox.ShowVideo("查看", path, $(window).width() - 100, $(window).height() - 100);
}

function Callback() {
	var index852 = parent.layer.getFrameIndex(window.name); //获取窗口索引
	if (parent.tableins) {
		parent.tableins.reload('mDataTable', {
			id: 'mDataTable',
			page: {
				limits: [10, 50, 100, 300, 500],
				groups: 20,
				curr: 1
			},
		});
	}
	parent.layer.close(index852);
}