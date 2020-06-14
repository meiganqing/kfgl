$(document).ready(function() {
	layui.use(['form'], function() {
		var form = layui.form;
		//获取用户信息
		var userId = getCookieName("mUserOnlyNum");
		$("#XDLMID").val(userId)
		postDataSYYH_origin("wwGetDataList", {
			TblNum: 7000,
			T9: "EQ" + userId
		}, function(data) {
			for(var k in data.data[0]) {
				$("#" + k).val(data.data[0][k]);
			}
		})
		$(".user-msg-text").attr("disabled", true);
		$("#icon-edit").click(function() {
			if($("#iconName").hasClass("layui-icon-edit")) {
				$("#iconName").removeClass("layui-icon-edit").addClass("layui-icon-return")
				$(".user-msg").removeClass("user-msg-text").addClass("").attr("disabled", false)
				$("#submitBtn").removeClass("layui-hide")
			} else {
				$("#iconName").addClass("layui-icon-edit").removeClass("layui-icon-return")
				$(".user-msg").addClass("user-msg-text").attr("disabled", true)
				$("#submitBtn").addClass("layui-hide")
			}
		})
		form.on("submit(modifyData)", function(data) {
			submitData(data.field, "wwModifyDataById")
			return false;
		})

	})

});

function submitData(data, method) {
	var method = method;
	layer.confirm('确定要' + $("#wwrkbc").html() + "？", {
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
							if(data.msg) {
								$(".user-msg").addClass("user-msg-text")
								$(".user-msg").attr("disabled", true)
								$("#submitBtn").addClass("layui-hide")
								layer.msg("请重新登录")
								setTimeout(function() {
									parent.location.href = "/login.html"
								}, 1000)

							}
						});

					})

				}
			});
		}
	);
}