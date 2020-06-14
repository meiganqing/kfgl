 
	//tableins = "",
 
	//delData = [], //删除的数据数组
	//tabnum = window.location.href.getQuery("tabnum")
var form, knbhList, tableins,cols;
var wwlx = window.location.href.getQuery("wwlx");
var ids = window.location.href.getQuery("ids");

layui.use(['form', 'table'], function () {
	form = layui.form;
	var upload = layui.upload,
		laydate = layui.laydate,
		layer = layui.layer;
	tableins = layui.table;


	//获取分组下拉
	var reData_fq = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
		XDLMCID: "1001",
		XDLMSID: "DYBH201908231246284628239261",
	});
	if (reData_fq.success) {
		$('#groupSelect').empty();
		for (var i = 0; i < reData_fq.rows.length; i++) {
			$('#groupSelect').append('<option value="' + reData_fq.rows[i].groupName + '" attrdata="' + reData_fq.rows[i].groupName + '">' + reData_fq.rows[i].groupName + '</option>');
		}
	}
 

	if (ids != null) {
		knbhList = ids.split(',');
	}
	else {
		knbhList = [];
	}

	GetItemData();

	//获取文物出库清单	
	tableins.on("tool(grid_table)", function (obj) {
		switch (obj.event) {
			case "del":
				obj.del();
				break;
		}
	})

	$('#tjsq').click(function () {

		//data.field.XDLM表对应码 = "1";
		//判断是否有不在库数据
		var sid = "";
		var editList = [];
		var checkStatus = tableins.checkStatus('mDataTable'),
			data = checkStatus.data;
		if (data.length > 0) {
			switch (wwlx) {
				case "ww":
					sid = "DYBH20190823124628462889251";
					break;
				case "tp":
					sid = "DYBH202004091743450429492";
					break;
			}
			for (var i in data) {

				editList.push({ XDLMID: data[i].id, XDLM文物组: $("#groupSelect").val()});
			}

			let re = SysConfig.SubSystemData.SYKFGL.BatchEditData(editList, sid);
			let msg;
			if (re.success) {
				msg = "修改完成！";
			}
			else {
				msg = "修改失败！";
			}
			
			layer.msg(msg, {
				time: 500,
				icon: 1
			}, function () {
				Callback();
			});
		}
		else {
			layer.msg("没有选中任何数据！");
			return false;
		}
 

	});

	form.render()
})

function GetItemData() {
	let where;
	switch (wwlx) {
		case "ww":
			where = {
				XDLMCID: "1001",
				XDLMSID: "DYBH20190823124628462889251",
				XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
				XDLMU: knbhList.join(','),
			};
			cols = [
				[{
					checkbox: true,
					LAY_CHECKED: false
				}, {
					title: '序号',
					type: 'numbers'
				}, {
					field: 'zt',
					title: '记录图',
					width: '7%',
					sort: true,
					align: 'center',
					//templet: "#smallPicture"
				}, {
					field: '登记名称',
					title: '名称',
					width: '12%',
					sort: true,
					align: 'center'
				}, {
					field: '文物库内编号',
					title: '现登记号',
					width: '8%',
					sort: true,
					align: 'center'
				}, {
					field: '现藏品总登记号',
					title: '原登记号',
					width: '8%',
					sort: true,
					align: 'center'
				}, {
					field: '库房名',
					title: '库房名',
					width: '10%',
					sort: true,
					align: 'center',

				}, {
					field: '柜架号',
					title: '柜架号',
					width: '10%',
					sort: true,
					align: 'center'
				},
				{
					field: '层号',
					title: '层号',
					width: '10%',
					sort: true,
					align: 'center'
				},
				{
					field: '分区号',
					title: '分区号',
					width: '10%',
					sort: true,
					align: 'center'
				}, {
					field: '库存状态',
					title: '库存状态',
					width: '5%',
					sort: true,
					align: 'center',
					templet: '#kczt'
				}, {
					field: '',
					title: '操作',
					width: '13%',
					sort: true,
					align: 'center',
					templet: '#opeTpl'
				}

				]
			];
			break;
		case "tp":
			where = {
				XDLMCID: "1001",
				XDLMSID: "DYBH201908231246284628202221",
				XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
				XDLMU: knbhList.join(','),
			};
			cols = [
				[{
					checkbox: true,
					LAY_CHECKED: false
				}, {
					title: '序号',
					type: 'numbers'
				}, {
					field: 'zt',
					title: '记录图',
					width: '7%',
					hide: true,
					sort: true,
					align: 'center',
					//templet: "#smallPicture"
				}, {
					field: '登记名称',
					title: '名称',
					width: '15%',
					sort: true,
					align: 'center'
				}, {
					field: '文物库内编号',
					title: '文物库内编号',
					width: '10%',
					sort: true,
					align: 'center'
				}, {
					field: '整理编号',
					title: '整理编号',
					width: '8%',
					sort: true,
					align: 'center'
				}
					, {
					field: '库房名',
					title: '库房名',
					width: '10%',
					sort: true,
					align: 'center',

				}, {
					field: '柜架号',
					title: '柜架号',
					width: '10%',
					sort: true,
					align: 'center'
				},
				{
					field: '层号',
					title: '层号',
					width: '10%',
					sort: true,
					align: 'center'
				},
				{
					field: '分区号',
					title: '分区号',
					width: '10%',
					sort: true,
					align: 'center'
				}, {
					field: '库存状态',
					title: '库存状态',
					width: '8%',
					sort: true,
					align: 'center',
					templet: '#kczt'
				}, {
					field: '',
					title: '操作',
					width: '13%',
					sort: true,
					align: 'center',
					templet: '#opeTpl'
				}

				]
			];
			break;
	}
	if (knbhList.length>0) {
		
		tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 7);
	}
}

function Callback() {
	var index543 = parent.layer.getFrameIndex(window.name); //获取窗口索引
	parent.layer.close(index543);

	parent.tableins.reload('mDataTable', {
		id: 'mDataTable',
		page: {
			limits: [10, 50, 100, 300, 500],
			groups: 20,
			curr: 1
		},
		//page: {
		//    curr: 1 //重新从第 1 页开始
		//}
	});
}