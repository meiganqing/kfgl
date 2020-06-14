$(document).ready(function () {
	layui.use('upload', function () {
		var $ = layui.jquery,
		upload = layui.upload;
		  //普通图片上传
		var uploadInst = upload.render({
			elem: '#test1'
			,url:'/xdData/wwFileUpload.ashx?XKLX=sygl'
			,size:0
			,before: function(obj){	    	
			  //预读本地文件示例，不支持ie8
			  obj.preview(function(index, file, result){
				//index:得到文件索引、file:得到文件对象、result:得到文件base64编码，比如图片
				$('#demo1').attr('width', '100px'); //图片链接（base64）
				$('#demo1').attr('height', '100px'); //图片链接（base64）
				$('#demo1').attr('src', result); //图片链接（base64）
			  });
			}
			//上传请求完毕后的回调
			,done: function(res){
				console.log(res);
			  if(res.code > 0){
				  var demoText = $('#demoText');
				  demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
				  demoText.find('.demo-reload').on('click', function(){
					uploadInst.upload();
				  });
			  }else{
				  return layer.msg('上传成功');  
			  }
			}
			
		  });
//	  var uploadInst = upload.render({
//		elem: '#test1'
//		 ,method:'post'
//		,url: '/xdData/wwFileUpload.ashx',
//		 data:{'XKLX':'sygl'}
//		,before: function(obj){
//		  //预读本地文件示例，不支持ie8
//		  obj.preview(function(index, file, result){
//			$('#demo1').attr('src', result); //图片链接（base64）
//		  });
//		}
//		,done: function(res){
//		  //如果上传失败
//			console.log(res);
//		  if(res.code > 0){
//			return layer.msg('上传失败');
//		  }
//		  //上传成功
//		}
//		,error: function(){
//		  //演示失败状态，并实现重传
//		  var demoText = $('#demoText');
//		  demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
//		  demoText.find('.demo-reload').on('click', function(){
//			uploadInst.upload();
//		  });
//		}
//	  });
		//多图片上传
		upload.render({
			elem: '#mutiPhotoBtn',
			url: '/xdData/wwFileUpload.ashx?XKLX=sygl',
			multiple: true,
			before: function (obj) {
				//预读本地文件示例，不支持ie8
				obj.preview(function (index, file, result) {
					$('#mutiPhoto').append('<img src="' + result + '" alt="' + file.name + '" class="layui-upload-img">')
				});
			},
			done: function (res) {
				//上传完毕
				console.log(res);
			},allDone: function(obj){ //当文件全部被提交后，才触发
				console.log(obj.total); //得到总文件数
				console.log(obj.successful); //请求成功的文件数
				console.log(obj.aborted); //请求失败的文件数
				$('#infodiv').addClass('layui-show').removeClass('layui-hide');
				$('#successCount').html(obj.successful);
				$('#failCount').html(obj.aborted);
				$('#total').html(obj.total);
			  }
		});
		var files;
		//多图片上传样式2
		var previewDiv=$('#mulphlist'),
		uploadDemo=upload.render({
			elem: '#mulbtn',
			url: '/xdData/wwFileUpload.ashx?XKLX=sygl',
			multiple: true,
			auto:false,
			bindAction:"#upbtn",
			choose: function (obj) {
				files = obj.pushFile(); //将每次选择的文件追加到文件队列
				//预读本地文件示例，不支持ie8
				obj.preview(function (index, file, result) {
					var html=$(['<div class="upmul-item layui-inline" id="uploadPH-'+index+'"><div class="upmul-ab layui-show"><a class="delsingle" href="javascript:;"><i class="layui-icon"></i></a></div><img src="'+result+'"  alt="'+file.name+'" class="layui-upload-img"><span class="success layui-hide"></span></div>'].join(''));
						html.find('.delsingle').on('click', function () {
							console.log(1);
							delete files[index]; //删除对应的文件
							html.remove();
							console.log(files);
						});
					previewDiv.append(html);
					
				});		
			},
			done: function (res, index, upload) {
					if (res.code == 0) { //上传成功
						var div = previewDiv.find('div#uploadPH-' + index);
							div.find('.success').addClass('layui-show').removeClass('layui-hide');
							div.find('.upmul-ab').addClass('layui-hide').removeClass('layui-show');
						delete files[index]; //删除文件队列已经上传成功的文件
						return;
					}
					this.error(index, upload);
			}
		});

	});

});
