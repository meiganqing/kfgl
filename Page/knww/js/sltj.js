var tableins = "";
var limit = 20,
	where = {
		year: currentYear()*1+1,
		mCurrentStorage:getCookieName("mCurrentStorage")
	}
$(document).ready(function() {
	layui.use(['element', 'layer', 'table', 'layer', 'laydate', 'form'], function() {
		var form = layui.form,
			upload = layui.upload,
			laydate = layui.laydate,
			layer = layui.layer;
		laydate.render({
			elem: '#年度',
			type: 'year',
			value:currentYear()*1+1,
			change:function (data){
				where.year=data;
				tableins.reload()

			}
		});

		getTablexx("wwsltj", where, "GetMonthStatistics")
		//导出
		// $('#outfile').click(function(e) {
		// 	var ids = [];
		// 	layui.use('table', function() {
		// 		var table = layui.table;
		// 		var checkStatus = table.checkStatus('tableLayui'),
		// 			data = checkStatus.data;
		// 		for(var i = 0; i < data.length; i++) {
		// 			ids.push(data[i].id);
		// 		}
		// 	});
		// 	e.preventDefault();
		// 	outfile("385", ids, "T3851");
		// });
		form.render()
	});
})

function getTablexx(id, where, action) {

	layui.use(["table"], function() {
		var table = layui.table
		var cols = kfJson.colsName["T292"]
		var xAction = "wwGetDataList"

		if(action) {
			xAction = action
		}

		tableins = table.render({
			elem: '#' + id,
			url: ip_url + "?sykf=SYKFGL&XAction=" + action,
			where: where,
			method: 'post',
			cols: cols,
			skin: 'row', //表格风格
			even: true,
			size: 'sm',
			toolbar: true, //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
			//			width: $(window).width() - 40,
			height: $(document).height() - 135,
			loading: true,
			cellMinWidth: 30,
			//				height: 'full-70',
			page: true, //是否显示分页
			limits: [limit, 50, 100, 200, 500, 1000],
			limit: limit, //每页默认显示的数量
			id: "tableLayui",
			done: function(res, curr, count) {}
		});

	})

}