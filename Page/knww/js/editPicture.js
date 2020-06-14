var $,from, laytpl,layedit;
var knbh = window.location.href.getQuery("knbh");
var returndataall = [];
layui.use(["jquery", "form", "laytpl", "layedit"], function() {
	laytpl = layui.laytpl, form = layui.form,layedit = layui.layedit, $ = layui.jquery;

	// 获取图片
	SysConfig.SubSystemData.SYKFGL.PostDataAsync("GetDataInterface", {
		XDLMCID: "1001",
		XDLMSID: "DYBH20190823124628462851271",
		XDLMC: knbh,
	},function(imageData){
		if(imageData.success){
			if(imageData.rows.length > 0){
				for(let i in imageData.rows){
					returndataall.push(imageData.rows[i])
				}
			}else{
				$("#nothing").removeClass("layui-hide")
			}

			showTpl(imageData.rows, laytpl)
		}

	});

	$("#submit").click(function() {
		layer.confirm('确定要添加吗?', {
			btn: ['确定', '再想想'] //按钮
		}, function() { //确定
			layer.msg('正在提交，请稍等...', {
				icon: 1,
				time: 500,
				success: function() {
					var editImg = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
						XDLMCID: "6000",
						XDLMSID: "DYBH201908231246284628208275",
						XDLMID: editId,
						XDLM备注: layedit.getContent(index0002),
					});
					if(editImg.success){
						layer.msg("添加成功！", {
							title: '提示框',
							icon: 1,
							time: 800
						}, function() {
							layer.close(layerPage01)
						});
					}
				}
			});
		});
	})

	

})

function showTpl(returndata, laytpl) {
	$("#demoTpl").empty();
	var getTpl = templateHtml.innerHTML;
	laytpl(getTpl).render(returndata, function(html) {
		$("#demoTpl").append(html)
	});

}

function getDetail(that) { //获取图片详情
	var mpath = $(that).attr("datasrc");

	var issection = $(that).attr("dataTp");
	var flag = false;
	if(issection) {
		if(issection == "是") {
			flag = true;
		}
	}
	
	returndataall.filter(function(elem, index, arr) {
		if(elem['图片地址'] == mpath) {
			var getImgData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
				XDLMCID: "1001",
				XDLMSID: "DYBH201908231246284628198272",
				XDLMA: elem.id,
			});
			if(getImgData.success){
				$("#view").html(getImgData.rows[0]['备注'])
			}
			
		}
	})
	var url_=getScanPictureType("03", mpath)
	$("#pictureScan").attr("src", url_)
	layerPage01 = SysConfig.ToolBox.openWindowByDIV($("#picDetail"), "编辑", $(window).width() - 50, $(window).height() - 50) //参数1 打开当前页面的div，2页面跳转
}

function editPic(d,type) {
	layui.use(["layedit"], function() {
		var layedit = layui.layedit;
		layerPage01 = SysConfig.ToolBox.openWindowByDIV($("#editHtml"), "编辑", $(window).width() - 50, $(window).height() - 50) //参数1 打开当前页面的div，2页面跳转
		editId = d
		var imgdata = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
			XDLMCID: "1001",
			XDLMSID: "DYBH201908231246284628198272",
			XDLMA: d,
		});
		if(imgdata.success){
			if(imgdata.rows[0]['是否切片']){
				if(imgdata.rows[0]['是否切片'] == "是") {
					flag = true
				}
			}
			var url_=getScanPictureType("03", imgdata.rows[0]['图片地址'] )
			$("#editpictureScan").attr("src", url_)
			$("#demo").html(imgdata.rows[0]['备注']);
		}
		index0002 = layedit.build('demo', {
			height: 550,
			tool: ['strong' //加粗
				, 'italic' //斜体
				, 'underline' //下划线
				, 'del' //删除线
				, '|' //分割线
				, 'left' //左对齐
				, 'center' //居中对齐
				, 'right' //右对齐
				, 'face' //表情
			]
		});
	})

}



function getImgSrc(d) {
	return d['图片地址'].replace(/sss./g,"s.")
}

//判断是哪一种查看图片的方式
function getScanPictureType(pictureType, path) {
    //	pictureType  01最基本的查看图片的形式
    //	pictureType  02最基本的查看切片的形式
    //	pictureType  03可以在切片上画图的形式
    var url = "";
    var imgPath = path.split(",")[0]
        //1)系统批量上传，切片大小自己获取

    if (pictureType == "03") {
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

    } else if (pictureType == "02") {
        url = '/SYKFGL/widget/pictureDetail/showPicture.html?path=' + imgPath;

    } else if (pictureType == "01") {
        url = '/SYKFGL/Widget/imgTools/ShowImage.html?path=' + path;
    } else {
        url = '/SYKFGL/Widget/imgTools/ShowImage.html?path=' + imgPath;
    }
    return url;
}









// var fileTypeArry = [{
// 	name: "拓片",
// 	viewid: "demoTpl2"
// }]
// var knbh = window.location.href.getQuery("knbh")
// var returndataall = [];
// var editId = "";
// var index0002 = "";
// var layerPage01 = ""
// $(function() {
// 	layui.use(['layedit','laytpl','form'], function() {
// 		var layedit = layui.layedit,
// 		form=layui.form,
// 			laytpl = layui.laytpl;
// 		//获取图片
// 		for(var i = 0; i < fileTypeArry.length; i++) {
// 			var getpicData = {
// 				TblNum: 104,
// 				T1042: "EQ" + knbh,
// 				T10441: "EQ拓片"
// 			}
// 			postData("wwGetDataList", getpicData, function(data) {
// 				if(data.data.length > 0) {
// 					$("#nothing").addClass("layui-hide")
// 					for(var i = 0; i < data.data.length; i++) {
// 						returndataall.push(data.data[i])
// 					}
// 				} else {
// 					$("#nothing").removeClass("layui-hide")
// 				}

// 				showTpl(data.data, laytpl)
// 			})
// 		}
// 		//切换类型
// 		form.on("radio(miaoshuType)",function (radiodata){
// 			console.log(radiodata.value)
// 				var getpicData = {
// 				TblNum: 104,
// 				T1042: "EQ" + knbh,
// 				T10441: "EQ"+radiodata.value
// 			}
// 			postData("wwGetDataList", getpicData, function(data) {
// 				if(data.data.length > 0) {
// 					$("#nothing").addClass("layui-hide");
					
// 					for(var i = 0; i < data.data.length; i++) {
// 						returndataall.push(data.data[i])
// 					}
// 				} else {
// 					$("#nothing").removeClass("layui-hide");
// 					$("#nothingTitle").html("当前项目没有"+radiodata.value)
// 				}

// 				showTpl(data.data, laytpl)
// 			})
// 		})
// 		$("#submit").click(function() {

// 			layer.confirm('确定要添加吗?', {
// 					btn: ['确定', '再想想'] //按钮
// 				},
// 				function() //确定
// 				{
// 					layer.msg('正在提交，请稍等...', {
// 						icon: 1,
// 						time: 500,
// 						success: function() {
// 							postData(
// 								"wwModifyDataById", {
// 									TblNum: "104",
// 									XDLMID: editId,
// 									XDLM备注: layedit.getContent(index0002),
// 								},
// 								function(data) {
// 									layer.msg(data.message, {
// 										title: '提示框',
// 										icon: 1,
// 										time: 800
// 									}, function() {
// 										if(data.success) {
// 											layer.close(layerPage01)
// 										}
// 									});
// 								})
// 						}
// 					});
// 				}
// 			);
// 		})
// 	});
// })





// function editPic(d,type) {
// 	layui.use(["layedit"], function() {
// 		var layedit = layui.layedit;
// 		layerPage01 = openWindow(1, $("#editHtml"), "", $(window).width() - 50, $(window).height() - 50) //参数1 打开当前页面的div，2页面跳转
// 		editId=d
// 		var getpicData = {
// 				TblNum: 104,
// 				T1041: "EQ" + d,
// //				T10441: "EQ拓片"
// T10441: "EQ"+type
		
// 		}
// 		postData("wwGetDataList", getpicData, function(data) {
// 			var flag = false
// 			if(data.data[0]['是否切片']) {
// 				if(data.data[0]['是否切片'] == "是") {
// 					flag = true
// 				}

// 			}
// 			var url_=getScanPictureType("03", data.data[0]['图片地址'] )
// 			$("#editpictureScan").attr("src", url_)
// 			$("#demo").html(data.data[0]['备注']);
// 		})
// 		index0002 = layedit.build('demo', {
// 			height: 550,
// 			tool: ['strong' //加粗
// 				, 'italic' //斜体
// 				, 'underline' //下划线
// 				, 'del' //删除线
// 				, '|' //分割线
// 				, 'left' //左对齐
// 				, 'center' //居中对齐
// 				, 'right' //右对齐
// 				, 'face' //表情
// 			]
// 		});

// 	})

// }

