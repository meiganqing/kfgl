var editId = window.location.href.getQuery("knbh")
$(function() {
	layui.use(['element', 'table', 'layer', 'form'], function() {
		var form = layui.form,
			table = layui.table;
		element = layui.element,
			layer = layui.layer;
		//上传图片
		uploadImg = new UploadFile("filename", "filepath", "/api/kf/data");
		uploadImg.fileupload(changefileWWGK, "#showfileWWGK") //拓片
		echoData()
		form.on('submit(tjsq)', function(data) {
			if($("#showfileWWGK").find("tr").length > 6) {
				layer.msg("图片最多能添加六张")
				return false
			}
			data.field.XDLM录入人 = getCookieName("mUserName");
			data.field.XDLM图片地址 = uploadImg.addFileData("showfileWWGK");
			data.field.XDLM库房名 = getCookieName("mCurrentStorage");
			data.field.XDLM操作类型 = "入库";
			data.field.XDLM出库去向 = $("#出库去向").html();
			data.field.XDLM记录类型 = "归还入库";
			data.field.XDLM登记号 = $("#编号").html()
			data.field.XDLM状态 = "在库";
			data.field.WWDJBID = editId;
			
			submitData(data.field, "WenWuChuKu", "ModifyDataById")
			return false

		})

	});
})

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
	if(editId) {
		$("#carrierBasic").attr("src", "carrierDetail.html?type=inner&knbh=" + editId)
		$("#gh").html("归还")
		//请求数据
		setInterval(function() {
			$('#XDLM归库时间').html(currentTime)
		}, 1000);
		postData("wwGetDataList", {
			TblNum: "386",
			T3862: "EQ" + editId,

		}, function(data) {
			$("#wwid").val(data.data[0]["文物库内编号"])
			for(var k in data.data[0]) {
				if($("#" + k).prop("tagName")) {
					if($("#" + k).prop("tagName") == "INPUT") {
						$("#" + k).val(data.data[0][k])
					} else {
						$("#" + k).html(data.data[0][k])
					}
				}
			}
			//文物出库记录图
//			postData("wwGetDataList", {
//				TblNum: "104",
//				T1042: "EQ" + data.data[0]['记录表流水号']
//			}, function(data) {
//
//				
//
//			})
			//文物入库表
			postData("wwGetDataList", {
				TblNum: "178",
				T17813: "EQ" + data.data[0]['记录表流水号']
			}, function(data) {
				for(var k in data.data[0]) {
					$("#" + k).html(data.data[0][k])
				}
showPicture(data.data[0]['记录图'], "picBody") //获取图片
			})

		})

	}
}

function submitData(data, action1) {
	var method = action1

	layer.confirm('确定要将文物归还入库吗？', {
			btn: ['确定', '再想想'] //按钮
		},
		function() //确定
		{
			layer.msg('正在提交，请稍等...', {
				icon: 1,
				time: 500,
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

				}
			});

		}
	);

}