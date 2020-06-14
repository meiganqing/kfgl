
$(function () {
	layui.use(['table', 'form'], function () {
		var form = layui.form
		var $ = layui.jquery
		var rowid = window.location.href.getQuery('rowid')

		//回显数据
		if (rowid) {
			let editId = window.location.href.getQuery("rowid")
			$("#edit").html("编辑")
			var reData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
				XDLMCID: "1001",
				XDLMSID: "DYBH201908231246284628105192",
				XDLMA: editId,
			});
			if (reData.success == true) {
				for (var k in reData.rows[0]) {
					$("#XDLM" + k).val(reData.rows[0][k])

				}

			}
			$("#submitBtn").html("修改")

		}

		$("#XDLM库房名").val(mUserInfoConfig.GetCookieName('mCurrentStorage'))

		//添加
		form.on("submit(XMForm)", function (data) {
			if (rowid) {
				//修改
				SysConfig.SubSystemData.SYKFGL.EditData('#XMForm', 'GetDataInterface', '&XDLMCID=6000&XDLMSID=DYBH20190823124628462870195&XDLMID=' + rowid, EditCallback);


			} else {
				// 添加
				SysConfig.SubSystemData.SYKFGL.AddNewData('#XMForm', 'GetDataInterface', "&XDLMCID=5000&XDLMSID=DYBH20190823124628462814193", AddCallback);

			}
			return false
		})
		form.render();
	});



})




function AddCallback(msg) {
	QXALL()

}


function EditCallback() {

	QXALL()
}





function QXALL() {
	var index852 = parent.layer.getFrameIndex(window.name); //获取窗口索引
	if (parent.tableins) {
		parent.tableins.reload("mDataTable", {
            page: {
                curr: 1
            }
        });
	}
	parent.layer.close(index852);
}