var tableins = "",
	limit = 20,
	originalDataKnbh = [],
	delData = [], //删除的数据数组
	tabnum = window.location.href.getQuery("tabnum"),
	originalData = store.get("batchApprove"),
	type = window.location.href.getQuery('type'),
	operateType=""
$(function() {
	layui.use(['form', 'table'], function() {
		var form = layui.form,
			table = layui.table
			$("#approvePeople").val(getCookieName("mUserName"))
		for(var i = 0; i < originalData.length; i++) {
			originalDataKnbh.push(originalData[i].knbh)
		}

		//数据回显
		if(tabnum == "305") {

			getTable("list", {
				TblNum: tabnum,
				T3056: "in(" + originalDataKnbh + ") "
			}, "wwckList","","") //调用函数显示表格
		} else if(tabnum == "386") {

			getTable("list", {
				TblNum: tabnum,
				T3862: "in(" + originalDataKnbh + ") "
			}, "djblb","","") //调用函数显示表格
		}
		if(type == "ck") {

			$("#approveMsg").html('<i class="title-icon fa fa-tags"></i>出库信息')
			$("#approvelType").html('<i class="title-icon fa fa-tags"></i>出库审核')
			operateType = "出库";
			$("#approveStatus").append(`<input type="radio" name="XDLM审核状态" lay-filter="approveIdea" value="同意出库" title="同意出库" checked="">
											<input type="radio" name="XDLM审核状态" lay-filter="approveIdea" value="拒绝出库" title="拒绝出库">`)
		} else if(type == "rk") {
			$("#approveMsg").html('<i class="title-icon fa fa-tags"></i>入库信息')
			$("#approvelType").html('<i class="title-icon fa fa-tags"></i>入库审核')
			operateType = "入库";
			$("#approveStatus").append(`<input type="radio" name="XDLM审核状态" value="同意入库" title="同意入库" checked="">											<input type="radio" name="XDLM审核状态" value="拒绝出库" title="拒绝入库">`)
		}
		table.on("tool(wwckList)", function(obj) {
			switch(obj.event) {
				case "del":
					submitDataTip("确定要移除吗？", function() {
						obj.del();
						delData.push(obj.data['文物库内编号'])
					})
					break;
			}
		});
			form.on("radio(approveIdea)", function(data) {

			if(data.value.indexOf("拒绝") != -1) {
				$("#approveIdea").removeClass("layui-hide")
			} else {
				$("#approveIdea").addClass("layui-hide")
			}

		})
		//点击提交
		form.on("submit(tjsq)", function(data) {
			var lastSendKnbh = [],
				lastSendLsnum = []

			originalData.filter(function(val, key) {
				if(delData.indexOf(val.knbh) == -1) {
					lastSendKnbh.push(val.knbh)
					lastSendLsnum.push(val.lsnum)
				}
			});
		
			if(lastSendKnbh.length > 0) {
			
				data.field.XDLM文物库内编号 = lastSendKnbh.join(",");
				data.field.XDLM记录表流水号 = lastSendLsnum.join(",");
				submitData(data.field, "WenWuShenHe")

			};
			return false
		});
		form.render();
	})
})

function submitData(data, xaction) {

	var method = xaction;
	var tip = '确定要审核通过吗';
	
	if(data.XDLM审核状态.indexOf("拒绝") != -1) {
		tip = '确定要拒绝' + operateType + '吗';
	}
	layer.confirm(tip, {
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