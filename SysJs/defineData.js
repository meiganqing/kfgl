var defineData = {
	requestIp: "",
	requestUrl: "",

}
defineData.prototype = {
	//	TODO:**mActionData请求的data数据对象,【必须】
	//	callback为回调函数，异步请求需要用到【非必须，异步必须】
	//	_url和全局URL不一致的特殊url，默认使用全局url，【非必须】
	//	async调用的方法，默认异步【非必须】
	postData: function(mActionData, callback, _url, async) { //【请求数据的ajax】
		var that = this;
		var url_ = "";
		if(_url) {
			url_ = _url;
		} else {
			url_ = that.requestIp;
		}
		if(mActionType) {
			url_ = url_
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
					if(typeof callback == 'function') {
						callback(returnValue)
					}

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
	//	TODO:**id为select的id,
	//	data请求接口返回的数组对象,【必须】
	//	key返回数据中要展示的字段,【必须】
	//	attr为自定义属性中展示的字段【非必须】
	getSelect: function(id, data, key, attr) { //【获取下拉框形式的模板】
		var xmmcTemplate = "";
		$('#' + id).empty()
		if(data.length > 0) {
			if(attr) {
				for(var i = 0; i < data.length; i++) {

					xmmcTemplate += '<option id="' + data[i][key] + '" attrData="' + data[i][attr] + '">' + data[i][key] + '</option>'
				}
			} else {
				for(var i = 0; i < data.length; i++) {
					xmmcTemplate += '<option id="' + data[i][key] + '">' + data[i][key] + '</option>'
				}
			}
		}

		$('#' + id).append(xmmcTemplate)

	},
	//	TODO:**获取后台返回的cookie值，name参数对应后台的key值【必须】
	getCookieName: function(name) {

		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

		if(arr = document.cookie.match(reg))

			return decodeURIComponent(arr[2]);
		else
			window.parent.location.href = "/login.html";
	},
	//	TODO:**统一获取table表单，
	//		id为要渲染的table的id,【必须】
	//		where为请求数据的data对象,【必须】
	//		colsKey为table表单的表头json的key值，【必须】
	//		type为几个表单请求同一个接口，但是表头显示不一样的情况【非必须】
	getTable: function(id, where, colsKey, type) {
		var that = this;
		layui.use(["table"], function() {
			var table = layui.table
			var cols = kfJson.colsName[colsKey]
			if(type) {
				cols = kfJson.colsName[colsKey][type]
			}
			tableins = table.render({
				elem: '#' + id,
				url: that.requestUrl,
				where: where,
				method: 'post',
				cols: cols,
				skin: 'row', //表格风格
				even: true,
				size: 'sm',
				//			width: $(window).width() - 40,
				height: $(document).height() - 125,
				loading: true,
				cellMinWidth: 30,
				//				height: 'full-70',
				page: true, //是否显示分页
				limits: [limit, 50, 100, 200, 500, 1000],
				limit: limit, //每页默认显示的数量
				id: "tableLayui",
				done: function(res, curr, count) {}
			});

		})

	},
	closeLayer: function() { //【关闭当前页面，如果父元素页面有表单，自动刷新表单】
		var index852 = parent.layer.getFrameIndex(window.name); //获取窗口索引

		if(parent.tableins) {
			parent.tableins.reload();
		}
		parent.layer.close(index852);
	},
	openWindow: function(type, url, title, w, h, anim) {
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
	},
	//TODO:【where请求ajax的参数data】
	//	      【删除完成后要执行的回调函数】
	delData: function(where callback) { //删除数据

		var that = this;
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
							that.postData("wwDelDataById", where, function(data) {
								if(data.msg) {
									that.tipMsg(data, callback)
								}
							})
						}
					});

				}
			);
		});

	},
	tipMsg: function(data, callback) { //【提示消息】
		var iconType = ""
		if(data.msg) {
			iconType = 1

		} else {
			iconType = 5

		}
		layer.msg(data.message, {
			icon: iconType,
			success: function() {
				if(callback) {
					callback()
				}

			}
		});
	},
	//TODO:提交时询问
	//tip:询问的提示
	//data:给后台接口要传送的数据
	submitData: function(tip, data) {
		var that = this;
		layer.confirm(tip, {
				btn: ['确定', '再想想'] //按钮
			},
			function() //确定
			{
				layer.msg('正在提交，请稍等...', {
					icon: 1,
					time: 500,
					success: function() {
						that.postData(data, function(data) {
							layer.msg(data.message, {
								icon: 1,
								time: 500,
								success: function() {
									if(data.msg) {
										QXALL()
									}
								}
							});

						})

					}
				});
			}

		);

	},
	//TODO:需要引入vertify.js
	//tip:弹框提示信息
	//data:要传入的数据
	submitDataVertify: function(tip, data, callback) { //带有验证码的弹框
		var that = this;
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
						if(callback) {
							callback()
						}
					},
					error: function() {
						layer.msg('验证码不匹配！');
						return false;
					}
				});

			}
		});

	}

}


//*******************************瀑布流*******************************