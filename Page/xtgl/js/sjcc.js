var tableins = "";
var limit = 20,
	where = {
		TblNum: 84,
	}

$(function (){
	layui.use(["form","table"],function (){
		var form = layui.form,
			table = layui.table
		getTable("demo", where)
	})
})