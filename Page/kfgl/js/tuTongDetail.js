var form, limit = 20, tableins;
var colorTuTongBH = {};
var type = window.location.href.getQuery("type");

var get=unescape(window.location.href.getQuery("gui"));
var cen=unescape(window.location.href.getQuery("cen"));
var quh=unescape(window.location.href.getQuery("quhao"));

var dataTable;
$(function () {
	layui.use(["form", "table"], function () {
		tableins = layui.table;
		form = layui.form;

		if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {

			where = {
				XDLMCID: "1001",
				XDLMSID: "DYBH20190823124628462889251",
				XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
				XDLMR:get,
				XDLMS:cen,
				XDLMT:quh
			};
		}else{
			where = {
				XDLMCID: "1001",
				XDLMSID: "DYBH201908231246284628202221",
				XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
				XDLMD:get,
				XDLME:cen,
				XDLMF:quh
			};

		}


		var cols = [
			[{
				checkbox: true,
				LAY_CHECKED: false,
				width: '2%',
			}, {
				title: '序号',
				type: 'numbers'
			},
			{
				field: '登记名称',
				title: '名称',
		
				align: 'center',
			},
			{
				title: '库房名',
				field: '库房名',
				align: 'center'
			},
			{
				field: '柜架号',
				title: '柜架号',
				align: 'center',

			},

			{
				field: '层号',
				title: '层号',

				align: 'center'

			},
			{
				field: '分区号',
				title: '分区号',
				align: 'center'

			},

			{
				field: '',
				title: '操作',
				align: 'center',
				templet: function (d) {
					let tt = '  <a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=Edit("详情","' + d.文物库内编号 + '")>详情</a>';
					return tt;
				}
			}

			]
		];


		tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 15);

	

	})
})




function Edit(eventName, mKNBH) {
    switch (eventName) {
        case "详情":
			if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {
				SysConfig.ToolBox.openWindow('/SYKFGL/Page/knww/page/wwjcxx.html?knbh=' + mKNBH, "详细信息", $(window).width(), $(window).height());

			}else{
				SysConfig.ToolBox.openWindow('/SYKFGL/Page/knww/page/carrierDetail.html?knbh=' + mKNBH, "详细信息", $(window).width(), $(window).height());


			}
           
            break;
     
        case "删除":
            SysConfig.SubSystemData.SYKFGL.PLSC([{ id: mKNBH }], '4000', 'DYBH201908231246284628217254', Callback);
            break;

    }
}




