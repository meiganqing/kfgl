//地址

var ip_url = "/api/kf/data";
var ip_url_user = "/api/com/role"; //请求角色部分的地址
var databaseType = "sykf"; //请求不同数据库
var form;
var knbh = window.location.href.getQuery("knbh");
var type = window.location.href.getQuery("type");
var lsjl = window.location.href.getQuery("lsjl")
var kf = window.location.href.getQuery("kf")
var bcode = new Base64();
//********详情**********

//新入库入库单显示的字段
//'文物库内编号', '现藏品总登记号', '登记名称', '记录类型', '库房名', '柜架号', '层号', '分区号', '原名', ''
var newRkdShowKey = [{
		key: "文物库内编号",
		displayValue: "系统登记号 "

	},
	{
		key: "现藏品总登记号",
		displayValue: "原登记号 "
	}, {
		key: "登记名称",
		displayValue: "文物名称 "
	}, {
		key: "库房名",
		displayValue: "库房名"
	}, {
		key: "柜架号",
		displayValue: "柜架号"
	}, {
		key: "层号",
		displayValue: "层号"
	}, {
		key: "分区号",
		displayValue: "分区号"
	}, {
		key: "原名",
		displayValue: "曾用名 "

	},
	{
		key: "项目名称",
		displayValue: "项目名称 "

	},
	{
		key: "考古发掘信息_领队",
		displayValue: "领队（负责人） "

	}, {
		key: "文物来源",
		displayValue: "来源方式  "

	},
	{
		key: "考古发掘信息_出土时间",
		displayValue: "出土时间   "

	},
	{
		key: "考古发掘信息_出土地点",
		displayValue: "出土地点  "

	},
	{
		key: "年代_纪年选项A",
		displayValue: "年代_纪年选项A"

	},
	{
		key: "年代_纪年选项B",
		displayValue: "年代_纪年选项B"

	},
	{
		key: "文物级别",
		displayValue: "文物级别"

	},
	{
		key: "文物类别_具体类别",
		displayValue: "功能类别"

	},
	{
		key: "质地类别",
		displayValue: "质地类别"

	}, {
		key: "完残程度",
		displayValue: "完残程度"
	},
	{
		key: "保存状态",
		displayValue: "保存状态"
	}, {
		key: "数量_件套",
		displayValue: "组"
	}, {
		key: "数量",
		displayValue: "数量"
	}, {
		key: "数量单位",
		displayValue: "单位"
	}, {
		key: "考古发掘信息_考古机构",
		displayValue: "考古机构"
	}, {
		key: "入藏时间_具体时间",
		displayValue: "原入库时间"
	}, {
		key: "外形尺寸_通长",
		displayValue: "通长"
	}, {
		key: "外形尺寸_通宽",
		displayValue: "通宽"
	}, {
		key: "外形尺寸_通高",
		displayValue: "通高"
	}, {
		key: "外形尺寸",
		displayValue: "外形尺寸"
	},
	{
		key: "质量_具体质量",
		displayValue: "具体质量"
	},
	{
		key: "文物描述",
		displayValue: "文物描述"
	}, {
		key: "保管信息_备注",
		displayValue: "备注"
	}
]

//*********对账单*********

var dzdOtherKey = ['记录类型', '出库去向', '记录时间', '移交人', '接收人', '监督人']

$(function() {
	layui.use(['form'], function() {
		form = layui.form;
		//先判断是否是当前库房
		var qcodeKf = bcode.decode(kf)
	
		if(qcodeKf == getCookieName("mCurrentStorage")) {
			echoData();
		} else {
			$("#content").append('<div style="text-align: center;"><img src="../../images/nothing.png" alt="" style="margin-top:70px" /></div>')
			
			layer.msg("二维码对应库房为"+qcodeKf+",请重新登录", {
				time: 2500
			}, function() {
				window.location.href = window.location.origin + "/SYKFGL/login-app.html?nextUrl=" + escape(window.location.href)
			});
		}

	})
});

function echoData() {
	//1)先判断是文物登记表还是遗址主列表
	postData("wwGetDataList", {
		TblNum: "385",
		T3852: "EQ" + knbh
	}, function(retrunData) {

		if(retrunData.data[0]['表对应码'] == "386") {
			var where = {
				TblNum: retrunData.data[0]['表对应码'],
				T3862: "EQ" + knbh
			}
		} else if(retrunData.data[0]['表对应码'] == "305") {
			var where = {
				TblNum: retrunData.data[0]['表对应码'],
				T3056: "EQ" + knbh
			}
		}
		//2)获取数据，回显数据
		postData("wwGetDataList", where, function(data) {
			var data_ = data.data[0];

			if(data.success) {
				getTemplate(data_, retrunData.data[0]['表对应码'])
			}

		})
	})
}

function getTemplate(data, tabNum) {
	//305文物主列表
	//386拓片列表
	var html = "";
	if(type == "detail") { //详情
		if(tabNum == "305") {
			$("#contentWWdeatil").removeClass("layui-hide")
			for(var n in data) {
				$("#contentWWdeatil").find("#XDLM" + n).html(data[n])
			}
			postData("wwGetDataList", {
				TblNum: 104,
				T1042: "EQ" + data['文物库内编号'],
				T10441: "EQ一般"
			}, function(data1) {
				for(var i = 0; i < data1.data.length; i++) {
					showPicture_(data1.data[i]['图片地址'], "pictureWWdetail") //获取图片
				}
			})

		} else if(tabNum == "386") { //遗址主列表
			$("#contentTp").removeClass("layui-hide");
			postData("wwGetDataList", {
				TblNum: 104,
				T1042: "EQ" + data['文物库内编号'],
				T10441: "EQ近景"
			}, function(data1) {
				for(var i = 0; i < data1.data.length; i++) {
					showPicture_(data1.data[i]['图片地址'], "pictureJJ") //获取图片
				}
			})
			postData("wwGetDataList", {
				TblNum: 104,
				T1042: "EQ" + data['文物库内编号'],
				T10441: "EQ现状"
			}, function(data1) {
				for(var i = 0; i < data1.data.length; i++) {
					showPicture_(data1.data[i]['图片地址'], "pictureYJ") //获取图片
				}
			})
			postData("wwGetDataList", {
				TblNum: 104,
				T1042: "EQ" + data['文物库内编号'],
				T10441: "EQ拓片"
			}, function(data1) {
				for(var i = 0; i < data1.data.length; i++) {
					showPicture_(data1.data[i]['图片地址'], "pictureTP") //获取图片
				}
			})
			for(var n in data) {
				$("#contentTp").find("#" + n).html(data[n])
			}
		}

	} else if(type == "ck" || type == "rk") { //对账单
		var dzdId = ""
		var pictureId = ""
		if(tabNum == "305") {
			//			html += getHtml(data, wwdjbBasicKey, -1);
			dzdId = "dzdWW";
			pictureId = "wwPic";

		} else if(tabNum == "386") {
			dzdId = "dzdTp";
			pictureId = "tpPic";
		}

		$("#" + dzdId).removeClass("layui-hide")
		var form_type = ""
		if(type == "ck") {
			form_type = "出库单"
		} else if(type == "rk") {
			form_type = "归库单"
		}

		var newlsjl = bcode.decode(lsjl)
		postData("GetInOutActData", {
			relics_code: knbh,
			form_type: form_type,
			logs_code: newlsjl
		}, function(returnData) {
			if(returnData.inside.length > 0) { //归库
				for(var k in returnData.inside[0]) {
					$("#" + dzdId).find("#" + k).html(returnData.inside[0][k])
				}
				postData("wwGetDataList", { //入库图片
						TblNum: "119",
						T1193: "EQ" + returnData.inside[0]['归库记录流水号']
					},
					function(data1) {
						for(var n = 0; n < data1.data.length; n++) {
							showPicture_(data1.data[n]['图片地址'], pictureId + "RK") //获取图片
						}

					});
			}

			if(returnData.outside.length > 0) { //出库
				for(var k in returnData.outside[0]) {
					$("#" + dzdId).find("#" + k).html(returnData.outside[0][k])
				}
				postData("wwGetDataList", { //入库图片
						TblNum: "119",
						T1193: "EQ" + returnData.outside[0]['出库记录流水号']
					},
					function(data1) {

						for(var n = 0; n < data1.data.length; n++) {
							showPicture_(data1.data[n]['图片地址'], pictureId + "CK") //获取图片
						}

					});
			}

			if(returnData.relics.length > 0) {
				for(var k in returnData.relics[0]) {
					$("#" + dzdId).find("#XDLM" + k).html(returnData.relics[0][k])
				}

			}

		})

	} else if(type == "newRkd") {
		for(var i = 0; i < newRkdShowKey.length; i++) {
			html += '<tr>' +
				'<td>' + newRkdShowKey[i].displayValue + '</td>' +
				'<td>' + data[newRkdShowKey[i].key] + '</td>' +
				'</tr>'

		}
		$("#content").append(html)
		postData("wwGetDataList", {
			"TblNum": "178",
			"T17812": "EQ" + knbh,
			"orderby": '记录时间  desc'
		}, function(returnData) {
			var html2 = ""
			for(var i = 0; i < returnData.data.length; i++) {
				if(returnData.data[i]['记录类型'] == "新入库") {
					html2 += getHtml(returnData.data[0], dzdOtherKey, -1)
				}
			}

			$("#content").append(html2)

		})

	}
}

function getHtml(data, keyArry, num, type) {
	var html_ = "";
	var type_ = type ? type : "";

	for(var i = 0; i < keyArry.length; i++) {
		if(data[keyArry[i]]) {
			html_ += '<tr>' +
				'<td>' + type_ + keyArry[i] + '</td>' +
				'<td>' + data[keyArry[i]] + '</td>' +
				'</tr>'
		}
	}
	return html_
}

function postData(mActionType, mActionData, callback, _url, async_, type) {

	var url_ = "",
		type_;
	if(_url) {
		url_ = _url;
	} else {
		url_ = ip_url;
	}
	if(type) {
		type_ = "&" + type
	} else {
		type_ = "&sykf=SYKFGL"
	}
	if(mActionType) {
		url_ = url_ + "?XAction=" + mActionType + type_
	}
	var async = true;
	if(async_ == false) {
		async = async_;
	}

	var rv;
	var index33;
	try {
		$.ajax({
			async: async,
			cache: false,
			type: "post",
			url: url_,
			data: mActionData, // $('#mkufang').val() 
			dataType: 'json',
			success: function(returnValue) {

				if(returnValue.success) {
					if(callback) {
						callback(returnValue, this)
					}
					rv = returnValue
				} else {
					rv = returnValue.message;
					if(rv == "NOTLOGIN") {
						var isQcode = window.location.href.getQuery("ewm"); //是否手机打开的

						if(isQcode) {
							window.location.href = window.location.origin + "/SYKFGL/login-app.html?nextUrl=" + escape(window.location.href)
						} else {
							parent.location.href = "/SYKFGL/login.html"
						}
					}
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				rv = XMLHttpRequest.responseText;
			}
		});
	} catch(e) {
		rv = e.message;
	}
	return rv;
}
function showPicture_(picUrl, id, width, height) { //查看详情显示图片

	var width_ = width ? width : 96;
	var height_ = height ? height : 96;
	if(picUrl) {
		var html = "";

		var imgArry = picUrl ? picUrl.split("|") : [];
		if(imgArry.length > 0) {
			for(var i = 0; i < imgArry.length; i++) {
				if(imgArry[i]) {
					html += `<div class="imgDiv" style="cursor: pointer;float:left;">
												<div class="layadmin-homepage-pad-ver"  onclick="lookPic_('${imgArry[i].split(',')[0]}')">
													<img data-title="查看详情" class="layadmin-homepage-pad-img" src="${imgArry[i].split(',')[0].replace('ss.','.')}" width="${width_}" height="${height_}">
												</div>
											</div>`
				}

			}
		}

		$("#" + id).append(html)
	}
}
function lookPic_(doc, index) {

	if(index) { //新添加的图片的查看，在函数中直接点击会陷入死循环
		if(index == "批次导入") {
			ShowVideo(false, doc, '100%', '100%', 1, "03");
		} else if(index == "系统上传") {
			ShowVideo(false, doc, '100%', '100%', 1, "03");
		} else {
			doc = fileend[index]
			ShowVideo(false, doc, '100%', '100%', 1, "03");
		}
	} else {
		ShowVideo(false, doc, '100%', '100%', 1, "03");
	}

}