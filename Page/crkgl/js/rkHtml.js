$(function() {
	layui.use(['element', 'table', 'layer', 'form'], function() {
		echoData()
		
	})
})

function echoData() { //回显数据
	var editId = window.location.href.getQuery("id")

	if(editId) {

		$("#ckxq").html("查看详情")
		//请求数据
		postData("wwGetDataList", {
			TblNum: "178",
			T1781: "EQ"+editId
		}, function(data) {
			for(var k in data.data[0]) {
				$("#XDLM" + k).html(data.data[0][k])

			}
			//文物入库表
			postData("wwGetDataList", {
				TblNum: "305",
				T3056: "EQ" + data.data[0]['文物库内编号']
			}, function(data2) {
				for(var k in data2.data[0]) {
					$("#XDLM" + k).html(data2.data[0][k])
				}
				//图片
				showPicture(data2.data[0]['图片地址'], "picBody") //获取图片

			})

		})
		SetQRcode(editId)//获取二维码

	}
}

