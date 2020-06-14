var colsName;
var tableins;
var where;
var editUrl = '';
var id; //流程配置的id
var onlynum; //流程配置的唯一值
var qxList;
layui.use(['table', 'layer', 'jquery', 'form'], function() {
	var table = layui.table,
		layer = layui.layer,
		form = layui.form,
		$ = layui.jquery;
	//		id = window.location.href.getQuery('id');

	onlynum = window.location.href.getQuery('onlynum');

	//		var returnData = PostDatasyyh('wwGetDataList', {
	//			TblNum:7013,
	//			X103:onlynum,
	//			T90:'NE99999'
	//		});
	//	if(returnData.msg){
	//		console.log(returnData.data[0].xmbh);
	//		console.log(returnData.data[0].rolename);
	//		$('#xmbh').val(returnData.data[0].xmbh);
	//		$('#rolename').html(returnData.data[0].rolename);
	//	}
	$("#saveRole").click(function() {
		saveRoleBind(table)
	})
	where = {
		TblNum: 7013,
		T93:"EQsykf",
		X91: "-1"
	};
	colsName = [
		[{
				field: 'rolename',
				title: '角色名称',
				width: '50%',
				align: 'center',
				templet: "#itemlm"
			},
			{
				field: 'rolenum',
				title: '绑定权限',
				width: '50%',
				align: 'center',
				templet: "#shqx"
			}
		]
	];
	tableins = table.render({
		elem: '#demo',
		url: ip_url+'?XAction=wwGetDataList&sykf=syyh&XKLX=syyh',
		//			url: '/xdData/xdDataManageGR.ashx?XAction=SqlRun&XKLX=syyh',
		where: where,
		method: 'post',
		cols: colsName,
		skin: 'row', //表格风格
		even: true,
		size: 'sm',
		height: $(document).height() - 240,
		page: true, //是否显示分页
		limits: [10, 20, 30, 40, 50],
		limit: 10, //每页默认显示的数量
		id: "tableLayui",
		done: function(res, curr, count) {

			SetUserRoleChecked();
		}
	});
}); //初始化end
function SetUserRoleChecked() {
	//获取当前用户都有哪些角色的权限
	var reData = postDataSYYH('wwGetDataList', {
		TblNum: 7014,
		X94: onlynum
	});
	$("input[name='checkedValue']").each(function(i, elem) {
		for(var i in reData.data) {
			if(reData.data[i].roleNum == elem.value) {
				if(elem.checked) {} else {
					elem.checked = true;
				}
			}
		}

	});
	layui.use(['form'], function() {
		let form = layui.form;
		form.render();
	});
}
var checkedIDs = [];

function saveRoleBind(table) {
	//	var DelData = PostDatasyyh("wwDelDataByWhere", {
	//		TblNum: 7014,
	//		T94: 'EQ' + onlynum //roleNum
	//	});

	$("input[name='checkedValue']").each(function(i, elem) {

		var DelData = postDataSYYH("wwDelDataByWhere", {
			TblNum: 7014,
			T104: 'EQ' + elem.value, //roleNum
			T94:"EQ"+onlynum
		});
		if(elem.checked == true) {

			var rvrole = postDataSYYH('wwGetDataList', {
				TblNum: 7013,
				X103: elem.value,
				T90: 'NE99999'
			});
			if(rvrole.msg||rvrole.success) {

				var returnData = postDataSYYH("wwAddNewRow", {
					TblNum: 7014,
					XDLMroleNum: elem.value,
					XDLMuserid: onlynum,
					XDLMrolename: rvrole.data[0].rolename,
					XDLMxmbh: rvrole.data[0].xmbh
				});

			}

			//      var returnData = PostDatasyyh("AddNewRow", { XDLMTableName: userRole, XDLMrolename:elem.value ,XDLMuserid: userId,XDLMxmbh: getCookieName('xmbh') });
		}
	});
	layer.msg('设置完成！', {
		title: '提示框',
		icon: 1,
		time: 800
	}, function(alertindex) {
		QXALL();
	});

}