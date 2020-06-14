$(function() {
	layui.use(['table', 'form'], function() {
		var form = layui.form,
			table = layui.table;
		element = layui.element,
			layer = layui.layer;
		echoData()
		form.on("submit(formSubmit)", function(data) {

			var address = $("#address").val()
			submitData(data.field, "AddYZBTable", "ModifyDataById")
			return false
		})
		form.render();
	});
})

function echoData() { //回显数据
	var editId = window.location.href.getQuery("id")

	if(editId) {

		$("#edit").html("修改")
		//请求数据
		postData("wwGetDataList", {
			TblNum: "384",
			T3841: "EQ" + editId
		}, function(data) {
			for(var k in data.data[0]) {
				$("#XDLM" + k).val(data.data[0][k])

			}

		})

	}
}
function submitData(data) {
	layer.confirm('确定要' + $("#formSubmit").html() + "？", {
			btn: ['确定', '再想想'] //按钮
		},
		function() //确定
		{
			layer.msg('正在提交，请稍等...', {
				icon: 1,
				time: 500,
				success: function() {
					var editId = window.location.href.getQuery("id")
					var action="wwAddNewRow"
					if(editId){
						 
						action="wwModifyDataById"
					}
					postData(action,data, function(data) {

						layer.msg(data.message, function() {
							if(data.msg) {

								QXALL()
							}
						});

					})

				}
			});

		}
	);

}