var editId = window.location.href.getQuery("id")
$(function() {
	layui.use(['form'], function() {
		var form = layui.form;
		echoData()
		form.on("submit(addData)", function(data) {
			if(editId) {

				//				submitDataOverall("确定要修改吗？", data.field, "wwModifyDataById");
				submitDataTip("确定要修改吗？", function() {
					postDataSYYH("wwModifyDataById", data.field, function(retrundata) {
						if(retrundata.msg || retrundata.success) {
							if(retrundata.msg || retrundata.success) {
							tipMsg(retrundata, QXALL) 
						
						}
						}
					})
				})
			} else {
				//				submitDataOverall("确定要添加吗？", data.field, "wwAddNewRow");
				submitDataTip("确定要添加吗？", function() {
					postDataSYYH("wwAddNewRow", data.field, function(retrundata) {
						if(retrundata.msg || retrundata.success) {
							tipMsg(retrundata, QXALL) 
						
						}
					})
				})
			}
			return false;
		})
	})
})

function echoData() { //回显数据

	if(editId) {
		$("#addxm").html("修改")
		//请求数据
		postDataSYYH("wwGetDataList", {
			TblNum: "7013",
			T88: "EQ" + editId,
		}, function(data) {
			for(var k in data.data[0]) {
				if(data.data[0][k] == "NULL") {
					$("#" + k).val("")

				} else {
					$("#" + k).val(data.data[0][k])

				}

			}
			showPicture(data.data[0]['图片地址'], "picBody") //获取图片
			//文物入库表
			postData("wwGetDataList", {
				TblNum: "178",
				T17813: "EQ" + data.data[0]['记录表流水号']
			}, function(data2) {
				for(var k in data2.data[0]) {

					if(data2.data[0][k] == "NULL") {
						$("#ck" + k).html("")
					} else {
						$("#ck" + k).html(data2.data[0][k])
					}

				}

			})

		})

	} else {

		var returnDataTimes = postData("GetOnlyNum", "", function(data) {
			$('#roleNum').val(data.OnlyNum);
		},"/DataInterface/DataCenterHandler.ashx","","XKLX=syyh");

	}
}