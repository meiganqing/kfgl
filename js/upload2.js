function UploadFile(oldName, newName,url) {

	this.oldName = oldName;
	this.newName = newName;
	this.url=url
}
//创建监听函数
var xhrOnProgress = function(fun) {//上传进度必需的
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
	uploadFile: function(upload, ele, demoListView, value) { //上传附件
		var that = this
		var indexload = ""
		layui.use(["form", "upload", "element"], function() {
			var upload = layui.upload,
				element = layui.element;
			var filexxx = { //上传进度需要用到
				fileIndex: [],
				loadIndex: 0
			}
			uploadListIns = upload.render({
				elem: ele,
				url: '/xdData/xdFileUpload.ashx',
				accept: 'file',
				multiple: true,
				auto: true,
				method: "POST",
				xhr: xhrOnProgress,
				choose: function(obj) {
					var files = obj.pushFile(); //将每次选择的文件追加到文件队列				
					obj.preview(function(index, file, result) { //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
						var res = file
						filexxx.fileIndex.push(index) //将选择的index加到load的数组中					
						var tr = $(['<tr type="new" id="upload-' + index + '" oldName="' + res.name + '" newName="">',
							'<td>' + res.name + '</td>',
							'<td><div class="layui-progress" lay-showpercent="true" lay-filter="demo' + index + '">',
							'<div class="layui-progress-bar" lay-percent="20%"></div>',
							'</div></td>',
							'<td id="load' + index + '">正在上传</td>',
							'<td>',
							'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>',
							'<span class="layui-btn layui-btn-xs layui-btn-danger " id="delete' + index + '">删除</span><span class="layui-btn layui-btn-xs layui-btn-warm demo-look" id="look' + index + '"  >预览</span>',
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
				before: function(obj) {},
				done: function(res, index, upload) {
					filexxx.fileIndex = []; //上传成功本次操作选择的值都要清零
					filexxx.loadIndex = 0

					element.progress("demo" + index, '100%') //设置页面进度条,不管成功没成功走到这都成功了
					$("#load" + index).html("上传成功")
					$("#upload-" + index).attr("newName", res[that.newName])
					layer.closeAll('loading'); //关闭loading
					$("#look" + index).click(function() { //预览
						lookPic(res[that.newName])
					})
					$("#delete" + index).click(function() { //删除
						deleteFile(res[that.newName], index)
					})
					return;
					this.error(index, upload);
				},
				error: function(index, upload) {
					layer.closeAll('loading'); //关闭loading
					var tr = $(demoListView).find('tr#upload-' + index),
						tds = tr.children();
					tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
					//					tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
				}
			});
		})

	},

	addFileData: function(id, type, xaction) { //tr的ID，附件加到数据库里
		var addurl = this.url;
		var that = this;
		$.each($("#" + id).find("tr"), function(key, val) {
			if($(val).attr("type") == "new") { //避免修改的时候重复传数据
				that.postData(
					"AddAutoTable", {
						XDLMTableName: "遗址资料列表",
						XDLM关联编号: $("#库内编号").val(),
						XDLM遗址名称: $("#名称").val(),
						XDLM分类名称: type,
						XDLM资料名称: $(val).attr("oldName"),
						XDLM存放路径: $(val).attr("newName"),
					},

					function(data) {}, addurl)
			}
		})
	},
	echoDataFile: function(id, xation, objData, type, type2) { //回显附加信息
		//1)从附件数据库里获取当前项目onlynum对应的附件
		//		var objData = {
		//			XDLMTableName: "遗址资料列表",
		//			XDLMTable_ColumnName: "*",
		//			XDLMTable_Where: "where 关联编号 = '" + $("#库内编号").val() + "' and 分类名称='" + type2 + "'"
		//		}
		var that_ = this
		that_.postData(xation, objData, function(data) {

			var html = ""

			for(var i = 0; i < data.rows.length; i++) {

				html += `
			<tr id="upload-${type2+i}" oldName="${data.rows[i]['资料名称']}" newName="${data.rows[i]['存放路径']}">
			<td>${data.rows[i]['资料名称']}</td>
			<td><div class="layui-progress">
  			<div class="layui-progress-bar" lay-percent="100%"></div>
			</div></td>
			<td>上传成功</td>
			<td>
			<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>
			<span class="layui-btn layui-btn-xs layui-btn-danger " id="delete${i}" onclick="deleteFile('${data.rows[i]["存放路径"]}','${type2+i}','edit','${data.rows[i].id}')">删除</span>
			<span class="layui-btn layui-btn-xs layui-btn-warm demo-look"  onclick="lookPic('${data.rows[i]["存放路径"]}')" >预览</span>
			</td></tr>`
			}
			$("#" + id).append(html)
		})
	},
	postData: function(mActionType, mActionData, callback, _url, async) {
		var url_ = ""
		if(_url) {
			url_ = _url;
		} else {
			url_ = ip_url;
		}
		if(mActionType) {
			url_ = url_ + "?Method=" + mActionType
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
	}
}

function lookPic(doc) {
	console.log(doc)
	ShowVideo(false, doc, '90%', '90%', 1);
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
			postData('DelDataById', {
				XDLMTableName: "遗址资料列表",
				XDLMID: id
			}, function(data) {
				if(data.msg) {
					layer.msg(data.message, {
						icon: 1,
						time: 1000
					})
					$("#upload-" + index).remove()
					layer.close(index007)
				}
			}, delurl)
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

function ShowVideo(mtitle, mpath, w, h, clobtn) {

	if(mpath == '') {
		layer.msg('未找到文件');
	} else {
		var yl = false;

		var index = mpath.lastIndexOf("\.");
		var r = mpath.substring(index + 1, mpath.length);

		//		var r = mpath.split('.');
		var url = "/widget/video/ShowVideo.html?path=" + mpath;

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
				//              url = '/widget/pdfD/ShowPDF.html?path=' + mpath;
				url = '/widget/pdfViewer/pdfView.html?path=' + mpath;
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
				url = '/widget/imgTools/ShowImage.html?path=' + mpath;
				yl = true;
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
				url = "/widget/video/ShowVideo.html?path=" + mpath;
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