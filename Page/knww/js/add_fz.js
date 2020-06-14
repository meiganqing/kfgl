var tableins = "";
var limit = 20,
	where = {
		TblNum: 384,

	}
$(function() {
	layui.use(['table', 'form'], function() {
		var form = layui.form,
			table = layui.table;
		element = layui.element,
			layer = layui.layer;
		//表格传值
		/*getStore(function(data) {
			console.log("data");
			getTable(table, where)
		})*/
		getTable('wwz', where)
		//、点击按钮添加
		$("#add").click(function() {
			layerPage01 = openWindow(2, 'addfz.html', "添加三维", 400, 200)
		})
		//监听删除事件
		table.on('tool(wwz)', function(obj) {
		
			getRowColor(obj)
			var data = obj.data;
			if(obj.event == "edit") {
				layerPage01 = openWindow(2, 'addfz.html?id=' + data.id, "修改分组", 400, 200)

			} else if(obj.event == "del") {
				delData(data.id, "384", function() {
					tableins.reload()
					
				})
			}

		})
	});
})
