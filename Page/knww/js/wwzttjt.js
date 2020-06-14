var myChart;
var chartTypeArry = []
var where = {
	showfieldname: "统计内容简名",
	tglb: "保存状态"
}
$(document).ready(function() {
	layui.use(['table', 'form'], function() {
		var form = layui.form,
			table = layui.table;
		//获取统计类型
		postData("GetStatisticsType", {
			TblNum: "305",
		}, function(data) {
			getSelect("tglb", data.data, "统计项目")
			form.render("select")
		});
		postData("GetStatusStatistics", {
			TblNum: "305",
		}, function(data) {

			delete data.code
			delete data.success

			for(var k in data) {

				switch(k) {
					case "文物级别":
					case "完残程度":
					case "质量_范围":
						getChartBar(k, data[k]);
						break;
					case "保存状态":
						getChartLinex(k, data[k], "line");
						break;
					default:
						getChartLinex(k, data[k]);
						break;

				}

			}

		})
	});
});