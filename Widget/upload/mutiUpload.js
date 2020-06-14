$(document).ready(function () {
	layui.use('upload', function () {
		var $ = layui.jquery,
			upload = layui.upload;

		//多文件列表示例
		var demoListView = $('#demoList'),
			uploadListIns = upload.render({
				elem: '#testList',
				url: '/xdData/wwFileUpload.ashx?XKLX=sygl',
				accept: 'file',
				multiple: true,
				auto: false,
				method: "POST",
				bindAction: '#testListAction',
				choose: function (obj) {
					var files = obj.pushFile(); //将每次选择的文件追加到文件队列
					//读取本地文件
					obj.preview(function (index, file, result) {
						var tr = $(['<tr id="upload-' + index + '">', '<td>' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>', '<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));

						//单个重传
						tr.find('.demo-reload').on('click', function () {
							obj.upload(index, file);
						});

						//删除
						tr.find('.demo-delete').on('click', function () {
							delete files[index]; //删除对应的文件
							tr.remove();
						});

						demoListView.append(tr);
					});
				},
				done: function (res, index, upload) {
					if (res.code == 0) { //上传成功
						var tr = demoListView.find('tr#upload-' + index),
							tds = tr.children();
						tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
						tds.eq(3).html(''); //清空操作
						delete files[index]; //删除文件队列已经上传成功的文件
						return;
					}
					this.error(index, upload);
				},
				error: function (index, upload) {
					var tr = demoListView.find('tr#upload-' + index),
						tds = tr.children();
					tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
					tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
				}
			});
		//多文件自动上传列表示例
		var filesa;
		var demoListView = $('#demoLista'),
			uploadListIns = upload.render({
				elem: '#testLista',
				url: '/xdData/wwFileUpload.ashx?XKLX=sygl',
				accept: 'file',
				multiple: true,
				auto: true,
				method: "POST",
				before: function (obj) {
					filesa= obj.pushFile(); //将每次选择的文件追加到文件队列
					//读取本地文件
					obj.preview(function (index, file, result) {
						var tr = $(['<tr id="upload-' + index + '">', '<td>' + file.name + '</td>', '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>', '<td>等待上传</td>', '<td>', '<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>', '<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>', '</td>', '</tr>'].join(''));
//
						//单个重传
						tr.find('.demo-reload').on('click', function () {
							obj.upload(index, file);
						});
						demoListView.append(tr);
					});
				},
				done: function (res, index, upload) {
					if (res.code == 0) { //上传成功
						var tr = demoListView.find('tr#upload-' + index),
							tds = tr.children();
						tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
						tds.eq(3).html(''); //清空操作
						delete filesa[index]; //删除文件队列已经上传成功的文件
						return;
					}
					this.error(index, upload);
				},
				error: function (index, upload) {
					var tr = demoListView.find('tr#upload-' + index),
						tds = tr.children();
					tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
					tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
				}
			});
		//拖拽
		var files1;
		//拖拽上传
		var fileView = $('#viewList'),
			fileViewIns = upload.render({
				elem: '#test10',
				accept: 'file',
				url: '/xdData/wwFileUpload.ashx?XKLX=sygl',
				done: function (res) {
					$('#fileRoute').val(res.data.src);
					fileView.empty();
					var tr = $(['<tr id="upload-drag">', '<td>' +res.data.oldFileName + '</td>', '<td style="color: #5FB878;">上传成功</td>', '<td>', '<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>', '<button class="layui-btn layui-btn-xs layui-btn-primary btn-view">预览</button>', '</td>', '</tr>'].join(''));
					fileView.append(tr);
						//单个重传
						tr.find('.btn-view').on('click', function () {
							ShowVideo('预览中...', res.data.src, '100%', '100%');
						});
					console.log(res)
				}
			});
	});

});
