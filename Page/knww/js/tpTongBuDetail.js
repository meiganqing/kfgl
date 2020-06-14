var editId = window.location.href.getQuery("id")
$(function() {
	layui.use(["form", "laytpl"], function() {
		var laytpl = layui.laytpl,
			form = layui.form;
	
		echoData()
		

	})
})



function echoData(uploadImg) { //回显数据

	if(editId) {

		//请求数据
		postData("GetInfoById", {
			XDLMTableName: "遗址主列表",
			XDLMID: editId
		}, function(data) {
			for(var k in data.rows[0]) {
				$("#" + k).html(data.rows[0][k])
			}

			if(data.rows[0]['是否已拓'] == "是") {
				$("#是否已拓").html("已拓")
			} else {
				$("#是否已拓").html("未拓")
			}

			//回显附件
			//			showPicture(data.data[0]['图片地址'], "picBody") //获取图片

//			var getpicData = {
//				XDLMTableName: "遗址资料列表",
//				XDLMTable_ColumnName: "*",
//				XDLMTable_Where: "where 关联编号 = '" + data.rows[0]['库内编号'] + "' and 分类名称='拓片'"
//			}
//			postData("GetAutoListOnePage", getpicData, function(data) {
//				showPicture(data.rows, "picBody1")
//			})
//				var getpicData = {
//				XDLMTableName: "遗址资料列表",
//				XDLMTable_ColumnName: "*",
//				XDLMTable_Where: "where 关联编号 = '" + data.rows[0]['库内编号'] + "' and 分类名称='现状'"
//			}
//			postData("GetAutoListOnePage", getpicData, function(data) {
//				showPicture(data.rows, "picBody2")
//			})
		})
	}

}

