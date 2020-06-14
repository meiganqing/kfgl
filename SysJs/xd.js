//地址

var ip_url = "/api/kf/data";
var ip_url_user = "/wwSYGR/wwData/wwDataManageGR.ashx"; //请求角色部分的地址
var databaseType = "sykf"; //请求不同数据库

String.prototype.getQuery = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = this.substr(this.indexOf("?") + 1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

//全局统一调用,同步
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

				if(returnValue.success || returnValue.msg) {
				
					 if(callback) {
						callback(returnValue, this)
					 }
					rv = returnValue
				} else {
					rv = returnValue.message;
					if(rv == "NOTLOGIN") {
						var isQcode = window.location.href.getQuery("ewm"); //是否手机打开的

						if(isQcode) {
							window.location.href = window.location.origin + "/SYKFGL/login.html?nextUrl=" + escape(window.location.href)
						} else {
							parent.location.href = "/SYKFGL/login.html"
						}
					} else {
						layer.msg(rv)
					}
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				rv = XMLHttpRequest.responseText;
				layer.msg(rv)
			}
		});
	} catch(e) {
		rv = e.message;
	}
	return rv;
}

function postDataSYYH_origin(mActionType, mActionData, callback, _url, async, type) {

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
		type_ = "&sykf=syyh&XKLX=syyh"
	}
	if(mActionType) {
		url_ = url_ + "?XAction=" + mActionType + type_
	}
	var async = false;
	if(async) {
		async = async;
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

				if(callback) {
					callback(returnValue)
				}
				if(returnValue.msg || returnValue.success) {
					rv = returnValue
				} else {
					rv = returnValue.message;
					if(rv == "NOTLOGIN") {
						var isQcode = window.location.href.getQuery("ewm"); //是否s手机打开的
						if(isQcode) {
							window.location.href = window.location.origin + "/SYKFGL/login.html?nextUrl=" + escape(window.location.href)
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

function postDataSYYH(mActionType, mActionData, callback, _url, async, type) {

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
		type_ = "&sykf=syyh&XKLX=syyh"
	}
	if(mActionType) {
		url_ = url_ + "?XAction=" + mActionType + type_
	}
	var async = false;
	if(async) {
		async = async;
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
				if(callback) {
					callback(returnValue)
				}
				if(returnValue.msg || returnValue.success) {
					rv = returnValue
				} else {
					rv = returnValue.message;
					if(rv == "NOTLOGIN") {
						var isQcode = window.location.href.getQuery("ewm"); //是否手机打开的
						if(isQcode) {
							window.location.href = window.location.origin + "/SYKFGL/login.html?nextUrl=" + window.location.href
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
//时间设置
function currentDate() {
	var d = new Date(),
		str = '';
	str += d.getFullYear() + '-';

	if((d.getMonth() + 1) < 10) {

		str += '0' + parseInt(d.getMonth() + 1) + '-';
	} else {
		str += d.getMonth() + 1 + '-';
	}
	if(d.getDate() < 10) {
		str += '0' + d.getDate();
	} else {
		str += d.getDate();
	}
	return str;
}

function currentDateMonth() {
	var d = new Date(),
		str = '';
	str += d.getFullYear() + '-';

	if((d.getMonth() + 1) < 10) {

		str += '0' + parseInt(d.getMonth() + 1);
	} else {
		str += d.getMonth() + 1;
	}

	return str;
}

function lastcurrentDate() {
	var d = new Date(),
		str = '';
	str += d.getFullYear() - 1 + '-';

	if((d.getMonth() + 1) < 10) {

		str += '0' + parseInt(d.getMonth() + 1) + '-';
	} else {
		str += d.getMonth() + 1 + '-';
	}
	if(d.getDate() < 10) {
		str += '0' + d.getDate();
	} else {
		str += d.getDate();
	}
	return str;
}

function currentTime() {
	var d = new Date(),
		str = '';
	var times = d.toLocaleDateString();
	if(d.getHours() < '10') {
		str += '0' + d.getHours() + ':';
	} else {
		str += d.getHours() + ':';
	}
	if(d.getMinutes() < '10') {
		str += '0' + d.getMinutes() + ':';
	} else {
		str += d.getMinutes() + ':';
	}
	if(d.getSeconds() < '10') {
		str += '0' + d.getSeconds() + '';
	} else {
		str += d.getSeconds() + '';
	}
	return str;
}

function currentYear() {
	var d = new Date(),
		str = '';
	str += d.getFullYear() - 1;
	return str;
}
//时间格式化
function timeEXchange(obj) {

	if(obj == '') {
		return '';
	} else {

		if(obj.split(' ')[0].indexOf('-') != '-1') {
			var arrTime = obj.split(' ')[0].trim().split('-');
		} else {
			var arrTime = obj.split(' ')[0].trim().split('/');
		}

		return arrTime[0] + '年' + arrTime[1] + '月' + arrTime[2] + '日';
	}

}

function getSelect(id, data, key, attr, attrValue) { //获取下拉框形式的模板
	var select = key
	if(attrValue) {
		select = attrValue
	}
	var xmmcTemplate = "";
	$('#' + id).empty()
	if(data.length > 0) {
		//		data.reverse()
		if(attr) {
			for(var i = 0; i < data.length; i++) {

				xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '" attrData="' + data[i][attr] + '">' + data[i][key] + '</option>'
			}
		} else {
			for(var i = 0; i < data.length; i++) {
				xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '">' + data[i][key] + '</option>'
			}
		}

	}

	$('#' + id).append(xmmcTemplate)

}

//写cookies 
//这是有设定过期时间的使用示例： 
//s20是代表20秒 
//h是指小时，如12小时则是：h12 
//d是天数，30天则：d30 
//setCookie("name","hayden","s20");
function setCookie(name, value, time) {
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec * 1);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getsec(str) {
	alert(str);
	var str1 = str.substring(1, str.length) * 1;
	var str2 = str.substring(0, 1);
	if(str2 == "s") {
		return str1 * 1000;
	} else if(str2 == "h") {
		return str1 * 60 * 60 * 1000;
	} else if(str2 == "d") {
		return str1 * 24 * 60 * 60 * 1000;
	}
}
//删除cookies 
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
//获取cookie用户名
function getUserName() {
	var name = 'mUserName';
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	if(arr = document.cookie.match(reg)) {
		return decodeURIComponent(arr[2]);
	} else {

	}
	//		window.parent.location.href = "/SYKFGL/login.html";
}

function getCookieName(name) {

	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	if(arr = document.cookie.match(reg)) {
		return decodeURIComponent(arr[2]);

	} else {

	}
	//		window.parent.location.href = "/SYKFGL/login.html";
}

function getStore(callback, data) {
	var wheredata = {
		TblNum: 162
	}
	if(data) {
		wheredata = data
	}
	postData("wwGetDataList", wheredata, function(data) {
		if(callback) {
			callback(data)
		}
	})
}

function QXALL() {
	var index852 = parent.layer.getFrameIndex(window.name); //获取窗口索引

	if(parent.tableins) {
		parent.tableins.reload();
	}

	parent.layer.close(index852);
}
//弹出窗口新页面
function openWindow(type, url, title, w, h, anim) {
	let maxmin = true;
	if(title == null || title == '') {
		title = false;
		maxmin = false;
	};
	if(url == null || url == '') {
		url = "/404.html";
	};
	if(w == null || w == '') {
		w = ($(window).width() - 200);
	};
	if(h == null || h == '') {
		h = ($(window).height() - 100);
	};
	if(anim == null || anim == "") {
		anim = 5
	}
	var layerPage = layer.open({
		type: type * 1,
		area: [w + 'px', h + 'px'],
		fix: false, //不固定
		maxmin: maxmin,
		shade: 0.4,
		title: title,
		content: url,
		anim: anim,
		success: function(layero) {},
		end: function() {

		}

	});
	return layerPage
}

function delData(id, TblNum, callback) { //删除数据
	layui.use(['layer'], function() {
		layer.confirm('确定要删除？删除后不可恢复！！', {
				btn: ['确定删除', '再想想'] //按钮
			},
			function() //确定
			{
				layer.msg('确定删除，请稍等...', {
					icon: 1,
					time: 500,
					success: function() {
						postData("wwDelDataById", {

							TblNum: TblNum,
							XDLMID: id
						}, function(data) {
							if(data.msg || data.success) {
								tipMsg(data, callback)
							}
						})
					}
				});

			}
		);
	});

}

function delDataSYYH(id, TblNum, callback) { //删除数据
	layui.use(['layer'], function() {
		layer.confirm('确定要删除？删除后不可恢复！！', {
				btn: ['确定删除', '再想想'] //按钮
			},
			function() //确定
			{
				layer.msg('确定删除，请稍等...', {
					icon: 1,
					time: 500,
					success: function() {
						postDataSYYH("wwDelDataById", {

							TblNum: TblNum,
							XDLMID: id
						}, function(data) {
							if(data.msg || data.success) {
								tipMsg(data, callback)
							}
						})
					}
				});

			}
		);
	});

}

function tipMsg(data, callback) {
	var iconType = ""
	if(data.msg || data.success) {
		iconType = 1;

	} else {
		iconType = 5;
	}
	layer.msg(data.message, {
		icon: iconType,
	}, function() {
		if(callback) {
			callback();
		}
	});
}

function getTable(id, where, type, action, height) {
	var height_ = $(document).height() - 140;

	if(height == "") {
		height_ = ""
	}
	layui.use(["table"], function() {
		var table = layui.table
		var cols = kfJson.colsName["T" + where.TblNum]
		var xAction = "wwGetDataList"

		if(type) {
			cols = kfJson.colsName["T" + where.TblNum][type]
		}
		if(action) {
			xAction = action;
			cols = kfJson.colsName[action];
		}

		tableins = table.render({
			elem: '#' + id,
			url: ip_url + "?sykf=SYKFGL&XAction=" + xAction,
			where: where,
			method: 'post',
			cols: cols,
			skin: 'row', //表格风格
			even: true,
			size: 'sm',
			toolbar: false, //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
			//			width: $(window).width() - 40,
			height: height_,
			loading: true,
			cellMinWidth: 30,
			//				height: 'full-70',
			page: true, //是否显示分页
			limits: [limit, 50, 100, 200, 500, 1000],
			limit: limit, //每页默认显示的数量
			id: "tableLayui",
			done: function(res, curr, count) {
				if(res.message == "NOTLOGIN") {
					parent.location.href = "/SYKFGL/login.html";
				}
			},
			error: function() {

			}
		});

	})

}
//获取统计图，全局同意
function getChartLine() { //折现统计图
	option = {
		title: {
			text: '堆叠区域图'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
				name: '邮件营销',
				type: 'line',
				stack: '总量',
				areaStyle: {},
				data: [120, 132, 101, 134, 90, 230, 210]
			},
			{
				name: '联盟广告',
				type: 'line',
				stack: '总量',
				areaStyle: {},
				data: [220, 182, 191, 234, 290, 330, 310]
			},
			{
				name: '视频广告',
				type: 'line',
				stack: '总量',
				areaStyle: {},
				data: [150, 232, 201, 154, 190, 330, 410]
			},
			{
				name: '直接访问',
				type: 'line',
				stack: '总量',
				areaStyle: {
					normal: {}
				},
				data: [320, 332, 301, 334, 390, 330, 320]
			},
			{
				name: '搜索引擎',
				type: 'line',
				stack: '总量',
				label: {
					normal: {
						show: true,
						position: 'top'
					}
				},
				areaStyle: {
					normal: {}
				},
				data: [820, 932, 901, 934, 1290, 1330, 1320]
			}
		]
	};

}
//****************上传附件start****************
function UploadFile(oldName, newName, url) {

	this.oldName = oldName;
	this.newName = newName;
	this.addPicUrl = url;

}

function QueryKeyColor(field) {

	var dd = $('#keyWords').val().split(" ");
	if(field != null) {
		for(var i = 0; i < dd.length; i++) {
			field = field.replace(dd[i], "<span style='color:red;'>" + dd[i] + "</span>");
		}
	}

	return field;
}
//创建监听函数
var xhrOnProgress = function(fun) {
	xhrOnProgress.onprogress = fun; //绑定监听
	//使用闭包实现监听绑
	return function() {
		//通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
		var xhr = $.ajaxSettings.xhr();
		//判断监听函数是否为函数
		if(typeof xhrOnProgress.onprogress !== 'function')
			return xhr;
		//如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
		if(xhrOnProgress.onprogress && xhr.upload) {
			xhr.upload.onprogress = xhrOnProgress.onprogress;
		}
		return xhr;
	}
}
UploadFile.prototype = {
	fileupload: function(ele, demoListView, value) { //上传附件
		var that = this;
		layui.use(["upload", "element"], function() {
			var upload = layui.upload,
				element = layui.element;
			var filexxx = { //上传进度需要用到
				fileIndex: [],
				loadIndex: 0
			}
			fileend = {};
			uploadListIns = upload.render({
				elem: ele,
				url: '/xdGetData/KuFangUploadFile.ashx?XKLX=' + databaseType,
				accept: 'file',
				multiple: true,
				auto: true,
				method: "POST",
				xhr: xhrOnProgress,
				choose: function(obj) {},
				before: function(obj) {

					obj.preview(function(index, file, result) { //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
						var res = file
						filexxx.fileIndex.push(index) //将选择的index加到load的数组中					
						var tr = $(['<tr type="new" id="upload-' + index + '" oldName="' + res.name + '" newName="">',
							'<td><div class="imgDiv" style="cursor: pointer;">',
							'<div class="layadmin-homepage-pad-ver" >',
							'<img onclick=lookPic("' + index + '","' + index + '") id="uploadImg' + index + '"  class="layadmin-homepage-pad-img" src="" width="66" height="66">',
							'</div>',
							'</div></td>',
							'<td>' + res.name + '</td>',
							'<td><div class="layui-progress" lay-showpercent="true" lay-filter="demo' + index + '">',
							'<div class="layui-progress-bar" lay-percent="20%"></div>',
							'</div></td>',
							'<td id="load' + index + '">正在上传</td>',
							'<td>',
							'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>',
							'<span class="layui-btn layui-btn-xs layui-btn-danger " id="delete' + index + '" onclick=deleteFile("' + index + '","' + index + '")>删除</span>',
							'<span class="layui-btn layui-btn-xs layui-btn-warm demo-look" id="look' + index + '" onclick=lookPic("' + index + '","' + index + '")>预览</span>',
							//							'<span class="layui-btn layui-btn-xs edit-picture" id="edit' + index + '" onclick=editPic("' + index + '","new")>编辑</span>',
							'<span class="layui-hide import-img layui-btn layui-btn-xs " onclick="firstPic(this)">设为主图</span>',
							'</td>', '</tr>'
						].join(''));
						$(demoListView).append(tr);
					});
				},
				progress: function(value) { //上传进度回调 value进度值					
					var progress = 'demo' + filexxx.fileIndex[filexxx.loadIndex]
					element.progress(progress, value + '%') //设置页面进度条
					if(value == "100") { //进度条是回调函数，多个文件是需要一一对应
						filexxx.loadIndex++
					}
				},
				done: function(res, index, upload) {

					filexxx.fileIndex = []; //上传成功本次操作选择的值都要清零
					filexxx.loadIndex = 0;
					fileend[index] = res[that.newName]
					$("#upload-" + index).attr("newName", res[that.newName]);
					console.log(res[that.newName])
					$("#uploadImg" + index).attr("src", res[that.newName].replace("ss.", "."))
					element.progress("demo" + index, '100%'); //设置页面进度条,不管成功没成功走到这都成功了
					$("#load" + index).html("上传成功");
					layer.closeAll('loading'); //关闭loading
					return;

					this.error(index, upload);
				},
				error: function(index, upload) {
					layer.closeAll('loading'); //关闭loading
					var tr = $(demoListView).find('tr#upload-' + index),
						tds = tr.children();
					tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');

				}
			});
		})

	},
	addFileData: function(id, nopicName, type, xaction) { //tr的ID，附件加到数据库里
		var that = this;
		var addurl = that.addPicUrl;
		var pictureUrl = ""
		$.each($("#" + id).find("tr"), function(key, val) {
			//			if($(val).attr("type") == "new") { //避免修改的时候重复传数据
			if(nopicName) {
				if($("#" + id).find("tr").length - 1 == key) {

					$("#" + id).find("tr").length > 1 ? pictureUrl += $(val).attr("newName") : pictureUrl += $(val).attr("newName")

				} else {
					$("#" + id).find("tr").length > 1 ? pictureUrl += $(val).attr("newName") + "|" : pictureUrl += $(val).attr("newName")

				}

			} else {
				var pictureUrl_ = $(val).attr("newName") + "," + $(val).attr("oldName")
				if(type) { //图片有类型的
					pictureUrl_ = $(val).attr("newName") + "," + $(val).attr("oldName") + "," + type

				}
				if($("#" + id).find("tr").length - 1 == key) {
					pictureUrl += pictureUrl_
				} else {
					pictureUrl += pictureUrl_ + "|"
				}

			}
			//			}
		})

		return pictureUrl
	},
	echoDataFile: function(id, xation, objData, type2, oldName, newName) { //回显附加信息，需要在另一个表里请求
		$("#" + id).empty();
		var that_ = this
		that_.postData(xation, objData, function(data) {
			var html = ""
			for(var i = 0; i < data.data.length; i++) {
				var pictureType = data.data[i]['图片类型'];
				html += `
			<tr id="upload-${type2+i}" oldName="${data.data[i][oldName]}" newName="${data.data[i][newName]}">
			<td>
			<div  style="cursor: pointer;">
				<div class="layadmin-homepage-pad-ver imgDiv" >
				<img onclick="lookPic('${data.data[i][newName]}')" type="${pictureType}" class="layadmin-homepage-pad-img" src="${data.data[i][newName].replace('ss.','.')}" width="66" height="66">
				</div>
			</div>
			</td>
			<td>${data.data[i][oldName]}</td>
			<td><div class="layui-progress">
  			<div class="layui-progress-bar" lay-percent="100%" style="width:100%"></div>
			</div></td>
			<td>上传成功</td>
			<td>
			<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>
			<span class="layui-btn layui-btn-xs layui-btn-danger " id="delete${i}" onclick="deleteFile('${data.data[i][newName]}','${type2+i}','edit','${data.data[i].id}')">删除</span>
			<span class="layui-btn layui-btn-xs layui-btn-warm demo-look"  onclick="lookPic('${data.data[i][newName]}')" >预览</span>			
			<span class="layui-hide import-img layui-btn layui-btn-xs " onclick="firstPic(this)">设为主图</span>
			<span class="layui-btn layui-btn-xs edit-picture"  onclick="editPic('${data.data[i].id}','old')" >编辑</span>
			</td></tr>`
			}
			$("#" + id).append(html)
		})
	},
		echoDataFile_x: function(id, xation, objData, type2, oldName, newName) { //回显附加信息，需要在另一个表里请求
		$("#" + id).empty();
		var that_ = this
		that_.postData(xation, objData, function(data) {
			var html = ""
			for(var i = 0; i < data.data.length; i++) {
				var pictureType = data.data[i]['图片类型'];
				html += `
			<tr id="upload-${type2+i}" oldName="${data.data[i][oldName]}" newName="${data.data[i][newName]}">
			<td>
			<div  style="cursor: pointer;">
				<div class="layadmin-homepage-pad-ver imgDiv" >
				<img onclick="lookPic('${data.data[i][newName]}')" type="${pictureType}" class="layadmin-homepage-pad-img" src="${data.data[i][newName].replace('ss.','.')}" width="66" height="66">
				</div>
			</div>
			</td>
			<td>${data.data[i][oldName]}</td>
			<td>${data.data[i]['长']}</td>
			<td>${data.data[i]['宽']}</td>
			<td>
			<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>
			<span class="layui-btn layui-btn-xs layui-btn-danger " id="delete${i}" onclick="deleteFile('${data.data[i][newName]}','${type2+i}','edit','${data.data[i].id}')">删除</span>
			<span class="layui-btn layui-btn-xs layui-btn-warm demo-look"  onclick="lookPic('${data.data[i][newName]}')" >预览</span>			
			<span class="layui-hide import-img layui-btn layui-btn-xs " onclick="firstPic(this)">设为主图</span>
			<span class="layui-btn layui-btn-xs edit-picture"  onclick="editPic('${data.data[i].id}','old')" >编辑</span>
			</td></tr>`
			}
			$("#" + id).append(html)
		})
	},
	echoDataFile_: function(id, picArry, type2, oldName, newName) { //回显附加信息，字符串格式
		var that_ = this;
		var html = "";
		for(var i = 0; i < picArry.length; i++) {
			var pictureType = data.data[i]['图片类型'];
			html += `<tr id="upload-${type2+i}" oldName="${picArry[i][oldName]}" newName="${picArry[i][newName]}">
			<td>${picArry[i][oldName]}</td>
			<td><div class="layui-progress">
			<div class="layui-progress-bar" lay-percent="100%"></div>
			</div></td>
			<td>上传成功</td>
			<td>
			<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>
			<span class="layui-btn layui-btn-xs layui-btn-danger " id="delete${i}" onclick="deleteFile('${picArry[i]["存放路径"]}','${type2+i}','edit','${picArry[i].id}')">删除</span>
			<span class="layui-btn layui-btn-xs layui-btn-warm demo-look"  onclick="lookPic('${data.rows[i][newName]}')" >预览</span>			
			<span class="layui-btn layui-btn-xs  edit-picture"  onclick="editPic('${data.rows[i][newName]}')" >编辑</span>
			</td></tr>`
		}
		$("#" + id).append(html)

	},
	postData: function(mActionType, mActionData, callback, _url, async) {
		var url_ = ""
		if(_url) {
			url_ = _url;
		} else {
			url_ = ip_url;
		}
		if(mActionType) {
			url_ = url_ + "?XAction=" + mActionType + "&sykf=SYKFGL"
		}
		var async = true;
		if(async) {
			async = async;
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
					callback(returnValue)
					if(returnValue.msg || returnValue.success) {
						rv = returnValue
					} else {
						rv = returnValue.message;
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
	},
	checkPicUpload: function(id) { //查看是否有待上传的照片
		var flag = true
		$.each($("#" + id).find("tr"), function(key, val) {
			if($(val).attr("type") == "new") { //避免修改的时候重复传数据

				if($(val).find("td:eq(3)").html() == "正在上传") {
					layer.msg("图片还处于正在上传状态，请等待...")
					flag = false
				}
			}
		})
		return flag
	}
}

function lookPic(doc, index) {

	if(index) { //新添加的图片的查看，在函数中直接点击会陷入死循环
		if(index == "批次导入") {
			ShowVideo(false, doc, '90%', '90%', 1, "03");
		} else if(index == "系统上传") {
			ShowVideo(false, doc, '90%', '90%', 1, "03");
		} else {
			doc = fileend[index]
			ShowVideo(false, doc, '90%', '90%', 1, "03");
		}
	} else {
		ShowVideo(false, doc, '90%', '90%', 1, "03");
	}

}

function deleteFile(res, index, type, id, tableName, url) {
	var delurl = "/xdData/xdDelData.ashx";
	if(url) {
		delurl = url
	}
	var index007 = layer.confirm("确定要删除吗？", {
		btn: ['确定', '再想想']
	}, function() {
		//1)从数据库删除图片
		if(type == "edit") { //修改的删除
			postData('wwDelDataById', {
				TblNum: "104",
				XDLMID: id
			}, function(data) {
				if(data.msg || data.success) {
					layer.msg(data.message, {
						icon: 1,
						time: 1000
					})
					$("#upload-" + index).remove()
					layer.close(index007)
				}
			})
		}
		//2)从服务器上删除图片
		//		that.PostData('DeleteFile', {
		//			XKLX: "sygr",
		//			path: res
		//		}, function(data) {
		//			if(data.msg) {
		//				layer.msg(data.message, {
		//					icon: 1,
		//					time: 1000
		//				})
		//				$("#upload-" + index).remove()
		//				//				$(this).parents("tr").remove()
		//				layer.close(index007)
		//			}
		//		})
		$("#upload-" + index).remove()

		layer.close(index007)
	})
}

//判断是哪一种查看图片的方式
function getScanPictureType(pictureType, path) {
	//	pictureType  01最基本的查看图片的形式
	//	pictureType  02最基本的查看切片的形式
	//	pictureType  03可以在切片上画图的形式
	var url = "";
	var imgPath = path.split(",")[0]
	//1)系统批量上传，切片大小自己获取
	console.log(pictureType)
	if(pictureType == "03") {
		$.ajax({
			type: "GET",
			url: imgPath.split(".")[0] + "/ImageProperties.xml",
			async: false,
			success: function(dataxml) {
				var width_ = Number($(dataxml).find("IMAGE_PROPERTIES").attr("WIDTH"));
				var heigh_ = Number($(dataxml).find("IMAGE_PROPERTIES").attr("HEIGHT"));
				url = "/SYKFGL/Widget/measurablePicture/openTitleImage.html?h=" + heigh_ + "&w=" + width_ + "&path=" + imgPath
			},
			error: function() {
				console.log("错误")
				url = '/SYKFGL/Widget/imgTools/ShowImage.html?path=' + imgPath;
				//				url = "/SYKFGL/Widget/measurablePicture/openTitleImage.html?h=" + "10000" + "&w=" + "1000" + "&path=" + "TP0000002/TP0000002/"
			}
		});

	} else if(pictureType == "02") {
		url = '/SYKFGL/widget/pictureDetail/showPicture.html?path=' + imgPath;

	} else if(pictureType == "01") {
		url = '/SYKFGL/Widget/imgTools/ShowImage.html?path=' + imgPath;
	} else {
		url = '/SYKFGL/Widget/imgTools/ShowImage.html?path=' + imgPath;
	}
	return url;
}

function ShowVideo(mtitle, mpath, w, h, clobtn, system) {
	if(mpath == '') {
		layer.msg('未找到文件');
	} else {
		console.log(mpath)
		var yl = false;
		var index = mpath.lastIndexOf("\.");
		var r = mpath.substring(index + 1, mpath.length);

		var url = "/SYKFGL/widget/video/ShowVideo.html?path=" + mpath;
		switch(r.toLowerCase()) {
			case "doc":
			case "docx":
			case "txt":
			case "zip":
			case "rar":
			case "xls":
			case "xlsx":
				break;
			case "pdf":
				url = '/SYKFGL/widget/pdfViewer/pdfView.html?path=' + mpath;
				yl = true;
				break;
			case "png":
			case "jpg":
			case "bmp":
			case "gif":
			case "jpeg":
			case "tiff":
			case "psd":
			case "svg":
				if(getScanPictureType(system, mpath)) {
					url = getScanPictureType(system, mpath)
					yl = true;
				} else {
					yl = false;
				}
				console.log(url)
				break;
			case "3gp":
			case "asf":
			case "avi":
			case "flv":
			case "mkv":
			case "mov":
			case "mp4":
			case "mpeg":
			case "n avi":
			case "rmvb":
			case "wmv":
			case "swf":
			case "mp5":
				url = "/SYKFGL/widget/video/ShowVideo.html?path=" + mpath;
				yl = true;
				break;
			default:
				yl = false;

		}
		if(yl) {
			if(clobtn) {
				clobtn = 1;
			} else {
				clobtn = clobtn;
			}
			var index = layer.open({
				type: 2,
				//      maxmin: true,
				content: url,
				area: [w, h],
				title: mtitle,
				closeBtn: clobtn,
				shadeClose: true
			});
		} else {
			layer.msg('当前格式暂不支持预览', {
				icon: 2,
				time: 2000,
				anim: 5
			});
		}

	}

}
//****************上传附件end****************
function showPicture(picUrl, id, width, height) { //查看详情显示图片

	var width_ = width ? width : 96;
	var height_ = height ? height : 96;
	if(picUrl) {
		var html = "";
		var imgArry = picUrl ? picUrl.split("|") : [];
		if(imgArry.length > 0) {
			for(var i = 0; i < imgArry.length; i++) {
				if(imgArry[i]) {
					html += `<div class="imgDiv" style="cursor: pointer;">
												<div class="layadmin-homepage-pad-ver"  onclick="lookPic('${imgArry[i].split(',')[0]}')">
													<img data-title="查看详情" class="layadmin-homepage-pad-img" src="${imgArry[i].split(',')[0]}" width="${width_}" height="${height_}">
												</div>
											</div>`
				}

			}
		}

		$("#" + id).append(html)
	}
}

function print(id) {

	$("input,select option").each(function() {
		$(this).attr('value', $(this).val());
	});

	//搞定 type=checkbox,type=radio 选中状态
	$("input[type='checkbox'],input[type='radio']").each(function() {
		if($(this).attr('checked'))
			$(this).attr('checked', true);
		else
			$(this).removeAttr('checked');
	});

	//搞定select选中状态
	$("select option").each(function() {
		if($(this).attr('selected'))
			$(this).attr('selected', true);
		else
			$(this).removeAttr('selected');
	});

	var index = layer.load(1, {
		shade: [0.1, '#fff'] //0.1透明度的白色背景
	});
	$("#" + id).jqprint({

		noPrintSelector: ".no-print",
		debug: false,
		importCSS: true,
		printContainer: true,
		operaSupport: true,

	})

	setTimeout(function() {
		layer.close(index)
	}, 500)
}

function SetQRcode(txt) {
	$("#qrcode").qrcode({
		width: 64,
		height: 64,
		text: txt
	});
	$("canvas").attr("id", "erw");
	var canvas = document.getElementById('erw');
	var context = canvas.getContext('2d');
	var image = new Image();
	var strDataURI = canvas.toDataURL("image/png");
	document.getElementById('qrimage').src = strDataURI;
	document.getElementById('qrimage2').src = strDataURI;
}

function SetQRurl(knbh, type) {

	var a = window.location.origin + "/SYKFGL/Page/qrCode/detailApp.html?ewm=true&knbh=" + knbh + "&type=" + type;
	//  a=a.replace("xdWenWuInfo", "xdWenWuInfo2")

	$("#qrcode").qrcode({
		width: 64,
		height: 64,
		text: a,
		correctLevel: 0,
		render: "canvas",
	});
	$("canvas").attr("id", "erw");
	var b = document.getElementById('erw');
	var c = b.getContext('2d');
	var d = new Image();
	var e = b.toDataURL("image/png");
	document.getElementById('qrimage').src = e

}

function getChart(id, data, xtype, ytype, charttype) {
	var colorList = ['#62B9B9', '#E5D386', '#C467A2', '#AD55AD', '#DB5F5F', '#556FB2', '#99DD00', "#6CBFD6", "#E583AA", "#90C6ED", '#CC0000', '#FFC8B4', '#FFA488', '#FFBB00', '#DDAA00', '#FFFFBB', '#FFFF77', '#00DD00', '#BBFFEE', '#77FFCC', '#33FFAA', '#00FF99', '#00DD77', '#AAFFEE', '#77FFEE', '#FF7744', '#FF5511', '#E63F00', '#FFDDAA', '#FFBB66', '#FFAA33', '#FF8800', '#EE7700', '#FFEE99', '#FFDD55', '#FFCC22', '#33FFDD', '#00FFCC', '#00DDAA', '#99FFFF', '#66FFFF', '#33FFFF', '#00FFFF', '#00DDDD', '#CCEEFF', '#77DDFF', '#33CCFF', '#009FCC', '#CCFF99', '#BBFF66', '#99FF33', '#77FF00', '#66DD00', '#99FF99', '#66FF66', '#33FF33', '#00FF00', '#FFFF00', '#EEEE00', '#EEFFBB', '#FFCCCC'];

	var datas = []; //x轴
	var sss = []; //y轴
	var charttype_ = "bar"
	if(charttype) {
		charttype_ = charttype
	}
	if(data.length > 0) {

		for(var i = 0; i < data.length; i++) {
			datas.push(data[i][xtype]);
			sss.push(data[i][ytype]);
		}
	}

	var myChart = echarts.init(document.getElementById(id));

	var optionBar = {
		title: {
			text: '统计图'
		},
		tooltip: {},
		legend: {
			data: ['']
		},
		toolbox: {
			show: true,
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				dataView: {
					show: true,
					readOnly: false
				},
				magicType: {
					type: ['line', 'bar']
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		xAxis: {
			data: datas,
		},
		yAxis: {},

		series: [{
			name: '',
			type: charttype_,
			data: sss,
			itemStyle: {
				normal: {
					barBorderRadius: 5,
					color: function(params) {
						return colorList[params.dataIndex]
					}
				}
			},
			label: {
				symbol: 'pin',
				normal: {
					show: true,
					position: 'top'
				}
			}
		}]

	};

	myChart.setOption(optionBar);

}

function batchCK(xaction, ids, t, tabnum) { //批量出库
	if(ids.length == 0) {
		layer.msg('请先选中行！', {
			title: '提示框',
			icon: 0,
			time: 800
		});
	} else {
		store.set("batchOutBound", ids.join(","))

		layerPage01 = openWindow(2, 'outStoreAll.html?tabnum=' + tabnum, " ", $(window).width(), $(window).height())
	}
}

function batchSP(ids, tabnum, type) { //批量审批
	if(ids.length == 0) {
		layer.msg('请先选中行！', {
			title: '提示框',
			icon: 0,
			time: 800
		});
	} else {
		//			store.set("batchApprove",{
		//				knbh:ids.join(","),
		//				lsnum:lsnum.join(",")
		//			})
		store.set("batchApprove", ids)

		layerPage01 = openWindow(2, 'approveAll.html?tabnum=' + tabnum + '&type=' + type, " ", $(window).width(), $(window).height())
	}
}

function outfile(TblNum, ids, t) {
	if(ids.length == 0) {
		layer.msg('请先选中行！', {
			title: '提示框',
			icon: 0,
			time: 800
		});
	} else {

		var index002 = layer.confirm('确定要导出吗？', {
			btn: ['确定', '再想想'] //按钮
		}, function() {
			var index3 = layer.msg('正在导出,请稍等...', {
				time: 0,
				shade: 0.3,
				//content: '测试回调',
				success: function(index, layero) {

					postData("wwTableSaveToExcel", {
						TblNum: TblNum,
						[t]: "in (" + ids.join(',') + ")"
					}, function(returnData) {
						if(returnData.success || returnData.msg) {
							layer.msg('导出完成', {
								time: 500,
								icon: 1
							}, function() {
								layer.closeAll();
								window.location = returnData.FilePath;

							});

						} else {
							layer.msg(returnData, {
								icon: 0,
								time: 2000
							});

						}
					}, "/api/kf/data");

				}
			});

		}, function() {
			layer.close(index002);
		});

	}
}

function getImgSrc(d) {
	var imgSrc = d
	if(imgSrc) {
		var imgSrcindex = d.indexOf(".")
		var imgSrc_ = imgSrc.slice(0, imgSrcindex - 2) + imgSrc.slice(imgSrcindex)
	}

	return imgSrc_
}

function statusColor(d) { //状态的颜色
	var defineData = {
		"同意出库": "orange",
		"拒绝出库": "red",
		"拒绝入库": "green",
		"在库": "#D82E62",
		"待入库": "#34A7D8",
		"入库": "green",
		"新入库": "red",
		"归还入库": "green",
	}

	return defineData[d]
}
//柱状图和折线图
function getChartLinex(id, data, charttype) {

	var colorList = ['#62B9B9', '#E5D386', '#C467A2', '#AD55AD', '#DB5F5F', '#556FB2', '#99DD00', '#FF8888', '#FF3333', '#FF0000', '#CC0000', '#FFC8B4', '#FFA488', '#FFBB00', '#DDAA00', '#FFFFBB', '#FFFF77', '#00DD00', '#BBFFEE', '#77FFCC', '#33FFAA', '#00FF99', '#00DD77', '#AAFFEE', '#77FFEE', '#FF7744', '#FF5511', '#E63F00', '#FFDDAA', '#FFBB66', '#FFAA33', '#FF8800', '#EE7700', '#FFEE99', '#FFDD55', '#FFCC22', '#33FFDD', '#00FFCC', '#00DDAA', '#99FFFF', '#66FFFF', '#33FFFF', '#00FFFF', '#00DDDD', '#CCEEFF', '#77DDFF', '#33CCFF', '#009FCC', '#CCFF99', '#BBFF66', '#99FF33', '#77FF00', '#66DD00', '#99FF99', '#66FF66', '#33FF33', '#00FF00', '#FFFF00', '#EEEE00', '#EEFFBB', '#FFCCCC'];
	var datas = data.category; //x轴
	var sss = data.series[0].data; //y轴
	var legend = data.legend[0];

	var charttype_ = "bar"
	if(charttype) {
		charttype_ = charttype
	}
	var myChart = echarts.init(document.getElementById(id));

	var optionBar = {
		title: {
			text: data.legend
		},
		tooltip: {},
		legend: {
			data: ['']
		},
		toolbox: {
			show: true,
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				dataView: {
					show: true,
					readOnly: false
				},
				magicType: {
					type: ['line', 'bar']
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		xAxis: {
			data: datas,
			axisLine: {
				lineStyle: {
					color: '#0087ED',
					width: 1, //这里是为了突出显示加上的
				}
			}
		},
		yAxis: {
			splitLine: {
				lineStyle: {
					// 使用深浅的间隔色
					color: ['#0087ED']
				}
			},
			nameTextStyle: {
				color: ['red']
			},
			axisLine: {
				lineStyle: {
					color: '#0087ED',
					width: 1, //这里是为了突出显示加上的
				}
			}
		},

		series: [{
			name: '',
			type: charttype_,
			data: sss,
			itemStyle: {
				normal: {
					barBorderRadius: 5,
					color: function(params) {
						return colorList[params.dataIndex]
					}
				}
			},
			label: {
				symbol: 'pin',
				normal: {
					show: true,
					position: 'top'
				}
			},
			areaStyle: {

			}

		}]

	};
	myChart.setOption(optionBar);
}

function getChartBar(id, data) {

	var myChart = echarts.init(document.getElementById(id));
	var datas = data.category; //x轴
	var sss = data.series[0].data; //y轴
	var legend = data.legend[0];
	var seriesData_ = []
	for(var i = 0; i < datas.length; i++) {
		seriesData_.push({
			name: datas[i],
			value: sss[i]
		})
	}

	var optionBar = {
		title: {
			text: data.legend,
			x: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			data: datas
		},
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: seriesData_,
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)',
					color: function(params) {
						return colorList[params.dataIndex]
					}
				}
			}
		}]
	};
	myChart.setOption(optionBar);
}

function submitDataOverall(tip, data, xaction, url, type) { //没有验证码的弹框	
	var index0001 = layer.confirm(tip, {
			btn: ['确定', '再想想'] //按钮
		},
		function() //确定
		{
			var index000002 = layer.msg('正在提交，请稍等...', {
				icon: 1,
				time: 500,
				success: function() {

					postData(xaction, data, function(data) {
						layer.msg(data.message, {
							icon: 1,
							time: 500,
							success: function() {
								if(data.success || data.msg) {
									QXALL()
									if(layerPage01) {
										layer.close(layerPage01)
									}
								}
							}
						});

					}, url, "", type)

				}
			});
		}

	);

}

function submitDataTip(tip, callback, data) { //没有验证码的弹框	
	layer.confirm(tip, {
			btn: ['确定', '再想想'] //按钮
		},
		function() //确定
		{
			var index000002 = layer.msg('正在提交，请稍等...', {
				icon: 1,
				time: 500,
				success: function() {
					layer.close(index000002)
					callback(data)

				}
			});
		}

	);

}

function submitDataVertifyModule(tip, callback) { //

	layer.open({
		title: tip,
		type: 1,
		content: `<div id='vertifyCode' style="padding-top:15px;padding-right:30px;"></div>
		<div class="layui-layer-btn layui-layer-btn-" style="position:absolute;bottom:0px;left:55px;"><a class="layui-layer-btn0" id="confirmBtn">确定</a><a class="layui-layer-btn1">再想想</a></div>
				`, //这里content是一个普通的String
		area: ['280px', '260px'],
		success: function() {

			$('#vertifyCode').codeVerify({
				type: 1,
				width: '200px',
				height: '50px',
				fontSize: '30px',
				codeLength: 4,
				btnId: 'confirmBtn',
				ready: function() {},
				success: function() {
					callback()
				},
				error: function() {
					layer.msg('验证码不匹配！');
					return false;
				}
			});

		}
	});

}

function submitDataVertifyPassword(tip, callback) { //验证密码的弹框

	var index002 = layer.prompt({
		formType: 1,
		value: '',
		title: '警告！系统关键操作，必须再次输入确认密码',

	}, function(value, index, elem) {
		if(value == "3.1415") {
			layer.close(index002);
			if(callback) {
				callback()
			}
		}else {
			layer.msg("密码错误")
		}

	});
}

function submitDataVertify(tip, data, xaction) { //带有验证码的弹框
	var method = xaction;
	layer.open({
		title: tip,
		type: 1,
		content: `<div id='vertifyCode' style="padding-top:15px;padding-right:30px;"></div>
		<div class="layui-layer-btn layui-layer-btn-" style="position:absolute;bottom:0px;left:55px;"><a class="layui-layer-btn0" id="confirmBtn">确定</a><a class="layui-layer-btn1">再想想</a></div>
				`, //这里content是一个普通的String
		area: ['280px', '260px'],
		success: function() {
			$('#vertifyCode').codeVerify({
				type: 1,
				width: '200px',
				height: '50px',
				fontSize: '30px',
				codeLength: 4,
				btnId: 'confirmBtn',
				ready: function() {},
				success: function() {
					postData(method, data, function(data) {
						layer.msg(data.message, {
							title: '提示框',
							icon: 1,
							time: 800
						}, function() {
							if(data.success) {
								QXALL()

							}
						});

					})
				},
				error: function() {
					layer.msg('验证码不匹配！');
					return false;
				}
			});

		}
	});

}

function getPictureUrl(d) {

	var url = d ? d.split(',')[0] : ' '
	return url
}

function warehousing(tip) { //批量入库
	var knbhArry = [],
		lshArry = [],
		statusArry = [];

	layui.use('table', function() {
		var table = layui.table;
		var checkStatus = table.checkStatus('tableLayui'),
			data = checkStatus.data;
		for(var i = 0; i < data.length; i++) {
			knbhArry.push(data[i]['文物库内编号']);
			lshArry.push(data[i]['记录表流水号']);
			statusArry.push(data[i]['审核状态'])
		}
		if(knbhArry.length == 0) {
			layer.msg('请先选中行！', {
				title: '提示框',
				icon: 0,
				time: 800
			});
			return false
		} else {
			if(statusArry.indexOf("") != -1) {
				var index_ = findall(statusArry, "").join(',')
				layer.msg('选中栏目第' + index_ + '条为待审核文物，请先审核！', {
					title: '提示框',
					icon: 0,
					time: 800
				});
				return false
			} else {
				relicOutput("WenWuShenHeNext", {
					XDLM库内编号: knbhArry.join(","),
					XDLM记录表流水号: lshArry.join(",")
				}, tip)
			}

		}

	});
}

function findall(a, x) {
	var results = [],
		len = a.length,
		pos = 0;
	while(pos < len) {
		pos = a.indexOf(x, pos);
		if(pos === -1) { //未找到就退出循环完成搜索
			break;
		}
		results.push(pos + 1); //找到就存储索引
		pos += 1; //并从下个位置开始搜索
	}
	return results;
}

function relicOutput(xaction, data, tip) { //文物的最后入库	
	var knbh_ = data['XDLM库内编号']
	layer.confirm("确定要" + tip + "吗?", {
			btn: ['确定', '再想想'] //按钮
		},
		function() //确定
		{
			layer.msg('正在提交，请稍等...', {
				icon: 1,
				time: 500,
				success: function() {
					postData(xaction, data, function(data) {

						var index002 = layer.msg(data.message, {
							icon: 1,
							time: 500,
							success: function() {
								if(data.success || data.msg) {

									layer.close(index002)
									var layer003 = layer.confirm("是否打印" + tip + "单?", {
											btn: ['是', '否'] //按钮
										},
										function() //确定
										{
											printAllList(knbh_)
											tableins.reload()
											layer.close(layer003)

										},
										function() {

											tableins.reload()
										}
									);

								}
							}
						});

					})

				}
			});
		}

	);

}
//打开三维视图窗口//.swf格式
function openSWById(uuid) {
	var index = layer.open({
		type: 2,
		content: '/xdPage/OpenWindow/window_SW.html',
		area: ['900px', '590px'],
		title: '三维',
		maxmin: true
	});
}

//链接
function openSWhref(href) {
	var index = layer.open({
		type: 2,
		content: href,
		area: ['900px', '590px'],
		title: '三维',
		maxmin: true
	});
}

//如果三维文件是网址那么是以http开头，判断前4位如果是http那么就打开连接
function httpOrFlv(add, uid) {
	if(add.trim().slice(0, 4) == 'http') {

		openSWhref(add);
		//$('#三维'+uid+'').attr('href',add);				
	} else {
		//$('#三维'+uid+'').attr('href','javascript:;');
		$('#filePathSW').val(add);
		SW = $('#filePathSW').val();
		openSWById(uid);
	}
}

function searchDateType(data) {
	if(data.value == "记录时间") {
		$("#serachDate").removeClass("layui-hide")
		$("#keyWord").addClass("layui-hide")
	} else {
		where.startTime = "";
		where.endTime = "";
		$("#keyWord").removeClass("layui-hide")
		$("#serachDate").addClass("layui-hide")
	}
}

function printAllList(id) {
	postData("WordPrint", {
		relics_code: id
	}, function(data) {
		if(data.success) {
			window.location = data.FilePath;

		} else {
			layer.msg("打印失败")
		}
	})
}
//table列表合并位置
function combinePosition(data) {
	var position_ = "";
	if(data['柜架号']) {
		position_ += data['柜架号'] + "，";
	}
	if(data['层号']) {
		position_ += data['层号'] + "，";
	}
	if(data['分区号']) {
		position_ += data['分区号'];
	}
	return position_
}

//添加需要的js文件,要加到最下边，否则上边的方法不会调用
var needLimit = true;
needLimit ? $(document).append('<script type="text/javascript" src="/SYKFGL/SysJs/limit.js"></script>') : ""; //权限的js