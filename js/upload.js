function UploadFile(oldName, newName,url) {

	this.oldName = oldName;
	this.newName = newName;
	this.url=url;
	this.choseBtn=choseBtn;
	this.demoListView=demoListView;
}
//{
//	url:"",//上传图片的地址
//	oldName:"",//图片原始名称
//	newName:"",//后台返回图片的字段
//	
////	upload:"",//layui的upload传递进来
//	choseBtn:"",//选择的按钮
//	demoListView:""//放图片的table的id,
//	
//	
//}

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

	addFileData: function(id, type, xaction) {},
	echoDataFile: function(id, xation, objData, type, type2) {},
	postData: function(mActionType, mActionData, callback, _url, async) {}
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
//判断是哪一种查看图片的方式
function getScanPictureType(pictureType, path) {
	//	pictureType  01最基本的查看图片的形式
	//	pictureType  02最基本的查看切片的形式
	//	pictureType  03可以在切片上画图的形式
	var url = "";
	var imgPath = path.split(",")[0]
	//1)系统批量上传，切片大小自己获取

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
function ShowVideo(mtitle, mpath, w, h, clobtn, system) {
	if(mpath == '') {
		layer.msg('未找到文件');
	} else {

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
