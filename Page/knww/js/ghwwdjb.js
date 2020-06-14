var knbh = window.location.href.getQuery("knbh")
var UploadTable, UploadTableData = [], form, table, element, layer, $;

layui.use(['jquery', 'element', 'table', 'layer', 'form', 'upload'], function () {
	form = layui.form,
		upload = layui.upload,
		UploadTable = layui.table,
		element = layui.element,
		$ = layui.jquery,
		layer = layui.layer;
	$("#currentStore").html(SysConfig.UserInfo.GetCookieName("mCurrentStorage"))
	$('#归库移交人').val(SysConfig.UserInfo.GetUserName());
	$('#归库接收人').val(SysConfig.UserInfo.GetUserName());
	$('#归库监督人').val(SysConfig.UserInfo.GetUserName());
	//上传图片
	//uploadImg = new UploadFile("filename", "filepath", "/api/kf/data");
	//uploadImg.fileupload(changefileWWGK, "#showfileWWGK") //拓片
	if(SysConfig.UserInfo.GetCookieName("kflx") == "文物"){
		$('.gh_ww').show();
		$('.gh_tp').hide();
	}else{
		$('.gh_tp').show();
		$('.gh_ww').hide();
	}
	echoData();
	SetAddUpload();
	//form.on('submit(tjsq)', function (data) {
	//	//			data.field.XDLM登记号 = knbh;
	//	if ($("#showfileWWGK").find("tr").length > 6) {
	//		layer.msg("图片最多能添加六张")
	//		return false
	//	}

	//	data.field.XDLM录入人 = getCookieName("mUserName");
	//	data.field.XDLM图片地址 = uploadImg.addFileData("showfileWWGK") + "|";
	//	data.field.XDLM库房名 = getCookieName("mCurrentStorage");
	//	data.field.XDLM操作类型 = "入库";
	//	data.field.XDLM出库去向 = $("#出库去向").html();
	//	data.field.XDLM记录类型 = "归还入库";
	//	data.field.XDLM状态 = "在库";
	//	data.field.XDLM登记号 = $("#现藏品总登记号").html()

	//	data.field.WWDJBID = knbh;
	//	submitData(data.field, "WenWuChuKu", "ModifyDataById")
	//	return false

	//})

	$("#tjsq").click(function () {
		var checkStatus = UploadTable.cache.mDataTable;

		var imageList = "";
		for (var i = 0; i < checkStatus.length; i++) {
			imageList += checkStatus[i].图片地址 + "|";
		}
		imageList = imageList.substring(0, imageList.length - 1);

		let dataList = {
			XDLMCID: "9000",
			XDLMTID: "9204",
			XDLMSID: "9204001",
			XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),
			WWDJBID: knbh,
			XDLM登记号: $("#现藏品总登记号").html(),
			XDLM录入人: SysConfig.UserInfo.GetUserName(),
			XDLM移交人: $("#归库移交人").val(),
			XDLM监督人: $("#归库监督人").val(),
			XDLM接收人: $("#归库接收人").val(),
			XDLM批次编号: "",
			XDLM图片地址: imageList,
			XDLM归库时间: SysConfig.ToolBox.CurrentDate() + " " + SysConfig.ToolBox.CurrentTime(),
			XDLM记录类型: "归还入库",
			XDLM记录内容: $("#归库记录内容").val(),
			XDLM操作类型: "入库",
			XDLM出库去向: "",

		};
		layer.confirm("确定归还入库吗？", {
			btn: ['确定', '再想想'] //按钮
		}, function () {
			var rk = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", dataList);

			if (rk.success) {

				layer.msg("归还入库完成！", {
					time: 1000,
					end: function () {
						parent.Callback();
						var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
						parent.layer.close(index); //再执行关闭   
					}
				});

			}
			else {
				layer.msg("归还入库失败！" + rk)
			}


		}, function () {

		});


	});



});

function SetAddUpload() {
	//第一步 初始化上传控件，按各个系统
	SysConfig.SubSystemData.SYKFGL.UploadFile('#changefileWWGK', upload, element, chooseCallback, doneCallback, allDoneCallback, errCallback);
	//第二步 使用上传表格方式时需配置
	//数据化数据集合与列

	var cols = [[
		{ field: '', title: '序号', width: "6%", type: "numbers" }
		, { field: '图片编号', title: '图片编号', hide: true } //必须

		, {
			field: '图片地址', width: "20%", title: '缩略图', templet: function (d) {
				return '<div class="list-img-mudule" style=""><img  class="layadmin-homepage-pad-img" style = "max-width:60px; max-height: 60px; cursor: pointer;" src="' + d.图片地址.replace("_sss", "_s") + '" alt = "" lay-event="scanPic" /></DIV>';
			}
		} //必须
		, { field: '文图名称', width: "40%", title: '文图名称' }  //必须  可以根据不同表更改字段名，对应下方的json 也要改
		//, { field: '大小', width: "10%", title: '大小' } //必须  如数据库字段没有 不必填充
		, { field: '状态', width: "10%", title: '状态' } //必须 如数据库字段没有 从数据库调取后默认显示已上传
		//, { field: '入库状态', title: '状态', hide: true } //必须 非数据库字段，用于区分数据库数据还是新增数据
		//, { field: '文件地址', title: '状态', hide: true } //必须 可以根据不同表更改字段名，对应下方的json 也要改
		, {
			field: '',
			title: '操作',
			width: "24%",
			align: 'center',
			templet: function (d) {
				let tt = "";
				tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=show("' + d.图片地址 + '") lay-event="edit">查看</a>';
				tt += ' <a class="layui-btn layui-btn-danger layui-btn-xs" onclick=del("' + d.图片编号 + '","' + d.文物入库编号 + '","' + d.文图名称 + '","' + d.图片地址 + '","' + d.分类 + '","' + d.图片类型 + '") lay-event="del">删除</a>';
				return tt;
			}

		},
	]]


	//UploadTable = SysConfig.SubSystemData.SYKFGL.SetDataTable(UploadTable, '文物列表', cols, where, 10);

	//第三步 使用上传表格方式时需配置
	//渲染table，一般附件列表不需要翻页，此时UploadTableData 可以从数据库使用postdata获取到
	UploadTable.render({
		elem: "#grid_table",
		cols: cols,
		data: UploadTableData,
		skin: 'row', //表格风格
		even: true,
		size: 'lg',
		defaultToolbar: [],
		loading: true,
		cellMinWidth: 30,
		id: "mDataTable",
		limit: 50
	});
}

function currentTime() {
	var d = new Date(),
		str = '';
	str += d.getFullYear() + '-';
	str += d.getMonth() + 1 + '-';
	str += d.getDate() + '  ';
	str += d.getHours() + ':';
	str += d.getMinutes() + ':';
	str += d.getSeconds() + '';
	return str;
}

function echoData() { //回显数据

	if (knbh) {
		$("#gh").html("归还")
		//请求数据
		setInterval(function () {
			$('#XDLM归库时间').html(currentTime)
		}, 1000);

		if(SysConfig.UserInfo.GetCookieName("kflx") == "文物"){
			sid = "DYBH20190823124628462889251"
		}else{
			sid = "DYBH201908231246284628202221"
		}
		let wwxx = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
			XDLMCID: "1001",
			XDLMSID: sid,
			XDLMU: knbh
		});
		if (wwxx.success) {
			$("#wwid").val(wwxx.rows[0]["文物库内编号"])
			for (var k in wwxx.rows[0]) {

				if ($("#" + k).prop("tagName")) {
					if ($("#" + k).prop("tagName") == "INPUT") {
						$("#" + k).val(wwxx.rows[0][k])
					} else {
						$("#" + k).html(wwxx.rows[0][k])
					}
				}
			}
			$("#jllsh").html(wwxx.rows[0]['记录表流水号'])

			if (wwxx.rows[0]['质地类别机质'] == null || wwxx.rows[0]['质地类别机质'] == "") {
                $("#zdlb").html("" + wwxx.rows[0]['质地类别'] + "" + " " + "")
            } else {
                $("#zdlb").html("" + wwxx.rows[0]['质地类别'] + "、" + wwxx.rows[0]['质地类别机质'] + "")
            }

			//文物入库表
			let wwxx_jilu = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
				XDLMCID: "1001",
				XDLMSID: "DYBH20190823124628462810231",
				XDLME: wwxx.rows[0]["记录表流水号"]
			});

			for (var m in wwxx_jilu.rows[0]) {
				$("#" + m).html(wwxx_jilu.rows[0][m])
			}

			//文物出库记录图
			let wwxx_jilu_image = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
				XDLMCID: "1001",
				XDLMSID: "DYBH20190823124628462861241",
				XDLMA: wwxx.rows[0]["记录表流水号"]
			});

			for (var n in wwxx_jilu_image.rows) {
				showPicture(wwxx_jilu_image.rows[n]['图片地址'], "picBody")
			}
		}
		//postData("wwGetDataList", {
		//	TblNum: "305",
		//	T3056: "EQ" + knbh,
		//	//			T3052:"EQ测试库"
		//}, function (data) {
		//	//$("#wwid").val(data.data[0]["文物库内编号"])
		//	//for (var k in data.data[0]) {

		//	//	if ($("#" + k).prop("tagName")) {
		//	//		if ($("#" + k).prop("tagName") == "INPUT") {
		//	//			$("#" + k).val(data.data[0][k])
		//	//		} else {
		//	//			$("#" + k).html(data.data[0][k])
		//	//		}
		//	//	}
		//	//}
		//	//$("#jllsh").html(data.data[0]['记录表流水号'])
		//	//文物入库表
		//	postData("wwGetDataList", {
		//		TblNum: "178",
		//		T17813: "EQ" + data.data[0]['记录表流水号']
		//	}, function (data) {
		//		for (var k in data.data[0]) {
		//			$("#" + k).html(data.data[0][k])
		//		}

		//	})
		//	//文物出库记录图
		//	postData("wwGetDataList", {
		//		TblNum: "119",
		//		T1193: "EQ" + data.data[0]["记录表流水号"]
		//	}, function (data) {
		//		for (var n = 0; n < data.data.length; n++) {
		//			showPicture(data.data[n]['图片地址'], "picBody") //获取图片
		//			//															showPicture(data1.data[0]['图片地址'], "picBodyRK") //获取图片
		//			//																showPicture(data1.data[n]['图片地址'], "picBodyCK") //获取图片s
		//		}

		//	})

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
				if (imgArry[i]) { //float:left;
					html += `<div class="imgDiv" style="cursor: pointer;">
                                                <div class="layadmin-homepage-pad-ver  hhh"  onclick="lookPic('${imgArry[i].split(',')[0]}')">
                                                    <img data-title="查看详情" style="width:100%" class="layadmin-homepage-pad-img" src="${imgArry[i].split(',')[0].replace('ss.', '.')}" >
                                                </div>
                                            </div>`
				}

			}
		}

		$("#" + id).append(html)
	}
}

function submitData(data, action1) {
	var method = action1

	layer.confirm('确定要将文物归还入库吗？', {
		btn: ['确定', '再想想'] //按钮
	},
		function () //确定
		{
			layer.msg('正在提交，请稍等...', {
				icon: 1,
				time: 500,
				success: function () {
					postData(method, data, function (data) {

						layer.msg(data.message, {
							title: '提示框',
							icon: 1,
							time: 800
						}, function () {
							if (data.success) {
								QXALL()

							}
						});

					})

				}
			});

		}
	);

}


//删除行
function del(rowid, knbh, imageName, ImagePath, imageClass, imageType) {

	//  SysConfig.SubSystemData.SYKFGL.PLSC([{ id: rowid }], '4000', 'DYBH201908231246284628185274', UploadTableCallback);

	layer.confirm('确定要删除吗？', {
		btn: ['确定', '再想想'] //按钮
	}, function () {
		for (var i in UploadTableData) {
			if (UploadTableData[i].图片编号 == rowid) {
				UploadTableData.splice(i, 1);
				UploadTableCallback();
				layer.msg("已删除！");
			}
		}
	}, function (index) {
		layer.close(index);
	});
}

//查看
function show(path) {
	//使用上传表格方式时需配置
	//for (var i in UploadTableData) {
	//    if (UploadTableData[i].图片编号 == rowid) {
	SysConfig.ToolBox.ShowVideo('查看文件', path, $(window).width() - 20, $(window).height() - 20);
	//        break;
	//    }
	//}
}

//上传预加载，可自定义
function chooseCallback(obj) {
	//使用上传表格方式时需配置
	//obj.preview(function (index, file, result) {
	//    UploadTableData.push({ id: index, 文件名: file.name, 大小: (file.size / 1024 / 1024).toFixed(1) + 'MB', 状态: "等待上传", 入库状态: "未入库" });
	//    UploadTableCallback();
	//});
	//;

}

//所有上传完成，多文件上传返回
function allDoneCallback(obj) {
	//console.log(obj.total); //得到总文件数
	//console.log(obj.successful); //请求成功的文件数
	//console.log(obj.aborted); //请求失败的文件数

}

//单个文件上传放回
function doneCallback(res, index, upload) {



	//【重要】使用table显示调用这个
	//for (var i in UploadTableData) {
	//    if (UploadTableData[i].文件名 == res.filename) {
	//        //UploadTableData[i].状态 = "已上传";
	//        //UploadTableData[i].入库状态 = "未入库";
	//        //UploadTableData[i].文件地址 = res.filepath;大小: (file.size / 1024 / 1024).toFixed(1) + 'MB',

	//    }
	//}

	if (res.success) {
		var imgbh = "TP" + SysConfig.ToolBox.getTimeAndRandom();
		UploadTableData.push({ 图片编号: imgbh, 文图名称: res.filename, 图片地址: res.filepath, 状态: "未入库" });

		UploadTableCallback();
	}


}

function errCallback(index, upload) {

	//获取上传错误列表使用table显示调用这个
	for (var i in UploadTableData) {
		if (UploadTableData[i].id == index) {
			UploadTableData[i].状态 = "上传失败";
		}
	}
}




function UploadTableCallback() {
	UploadTable.reload('mDataTable', {
		data: UploadTableData,
		page: {
			limits: [50],
			groups: 20,
			curr: 1
		},
		//page: {
		//    curr: 1 //重新从第 1 页开始
		//}
	});
}