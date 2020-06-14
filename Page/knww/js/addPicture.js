var tableins = "",$, layer, laydate, upload, form, element, where,table,tableSelect;
var knbh = window.location.href.getQuery("knbh"),
	id = window.location.href.getQuery("id"),
	UploadTable, UploadTableData = [], addImageData = [], delImageData = [];
layui.config({
	base: '/SXSY/layuiextend/' //静态资源所在路径
}).extend({
	tableSelect: 'tableSelect' //主入口模块
});
layui.use(['jquery', 'element', 'form', 'layer', 'laydate', 'table', 'upload', 'tableSelect'], function () {
    $ = layui.jquery;
    layer = layui.layer;
    laydate = layui.laydate;
    table = layui.table;
    form = layui.form;
    upload = layui.upload;
    element = layui.element;
	UploadTable = layui.table;
	tableSelect = layui.tableSelect;

	getTPBH();

	//添加图筒
	$("#addPreliminary").click(function() {
		getNewTTBH();
	})

	where = {
		XDLMCID: "1001",
		XDLMSID: "DYBH201908231246284628230211",
	}
	//图筒下拉
	tableSelect.render({
		elem: '#图筒', //定义输入框input对象
		checkedKey: 'id', //表格的唯一建值，非常重要，影响到选中状态 必填
		searchKey: 'QueryKey', //搜索输入框的name值 默认keyword
		searchPlaceholder: '关键词搜索', //搜索输入框的提示文字 默认关键词搜索
		table: { //定义表格参数，与LAYUI的TABLE模块一致，只是无需再定义表格elem
			response: {
                statusName: 'code', //规定数据状态的字段名称，默认：code
                statusCode: 0, //规定成功的状态码，默认：0
                msgName: 'message', //规定状态信息的字段名称，默认：msg
                countName: 'total', //规定数据总数的字段名称，默认：count
                dataName: 'rows' //规定数据列表的字段名称，默认：data
            },
            request: {
                pageName: 'page', //页码的参数名称，默认：page
                limitName: 'rows' //每页数据量的参数名，默认：limit
            },
			headers: {
                Authorization: SysConfig.UserInfo.GetSysToken(),
            },
			url: '/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYKFGL',
			where: where,
			cols: [
				[{
						type: 'radio'
					}, {
						title: '序号',
						type: 'numbers'

					}, {
						field: '图筒编号',
						title: '图筒编号',
						width: '46%',
						align: 'center',
						templet: '#xmbh'
					},
					{
						field: '操作',
						title: '删除',
						width: '40%',
						align: 'center',
						templet: '#operate'
					}
				]
			]
		},
		done: function(elem, data) {
			if(data.data.length > 0){
				elem.val(data.data[0]['图筒编号'])
			}else{
				layer.msg("请选择图筒！");
			}
			//选择完后的回调，包含2个返回值 elem:返回之前input对象；data:表格返回的选中的数据 []
			//拿到data[]后 就按照业务需求做想做的事情啦~比如加个隐藏域放ID...
		},
		tableEvent: function(data) {
			switch(data.event) {
				case "del":
                    // 检查图筒中是否存在拓片，存在则不可删
                    var getTpData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                        XDLMCID: "1001",
                        XDLMSID: "DYBH2020042117140505702283",
                        XDLMA: data.data.图筒编号
                    });
                    console.log(getTpData);
                    if(getTpData.success){
                        if(getTpData.total > 0){
                            layer.msg("此图筒中已存放拓片，不可删除！");
                        }else{
                            SysConfig.SubSystemData.SYKFGL.PLSC([{ id: data.data.id }], '4000', 'DYBH201908231246284628234214', delcallback);
                        }
                    }
					
					break;
			}
		}
	})

	form.on('radio(autoUpload)', function(data) {
		if(data.value == "手动上传") {
			$("#uploadFileDiv").removeClass("layui-hide")

		} else {
			$("#uploadFileDiv").addClass("layui-hide")
		}

	});

	SetAddUpload();

	$('#pictureSubmit').click(function(){
		if($("#图筒").val() == ''){
			layer.msg("请选择图筒！");
		}else{
			addPictureToData();
			
		}
		
		
	});



	
})

function getTPBH(){
	// 获取拓片编号
	var data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH2020042111140304960960",
		XDLMA: knbh
	});
	if(data.success){
		$('#图片编号').val(data.rows[0].拓片编号);
	}
}

function getNewTTBH(){
	// 获取图筒编号
	var data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
		XDLMCID: "9000",
		XDLMTID: "9204",
		XDLMSID: "9204032",
		XDLMmethod: "GetTubesCode"
	});
	if(data.success){
		layer.confirm("自动生成图筒号：" + data.data + "确定要添加吗?", {
            btn: ['确定', '再想想'] //按钮
        },function(){
            var index000002 = layer.msg('正在提交，请稍等...', {
                icon: 1,
                time: 500,
                success: function() {
					var addbh = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
						XDLMCID: "9000",
						XDLMTID: "9204",
						XDLMSID: "9204032",
						XDLMmethod: "AddTubesCode"
					});
					if(addbh.success){
						layer.msg("添加成功", {
							icon: 1,
							time: 500
						});
						layer.close(index000002);
					}
					
                }
            });
        });
	}
}

function delcallback(){
	// tableSelect.reload();
}

// 添加图片
function addPictureToData() {
	
	if(!$("#sysUpload").prop("checked")) { //系统上传

		if(UploadTableData.length == 0) {
            layer.msg("手动上传必须添加图片");
            return;
		} else{
            parent.SetAddUpload_tp();
            parent.UploadTableCallback_tp();
            var index852 = parent.layer.getFrameIndex(window.name); //获取窗口索引
            parent.layer.close(index852);
        }
	}else{  //批次导入
		var imgbh = "TP" + SysConfig.ToolBox.getTimeAndRandom();
		parent.UploadTableData_tp.push({ 图片编号: imgbh, 文图名称: "", 图片地址: "", 状态: "未入库",图筒编号: $('#图筒').val(), 长: $('#长').val(), 宽: $('#宽').val() });
		parent.addImageData_tp.push({
            图片编号: imgbh,
            文物入库编号: knbh,
            文图名称: "",
            图片地址: "",
            分类: "拓片",
            图筒: $('#图筒').val(),
			图片类型: "批次导入",
			长: $('#长').val(),
            宽: $('#宽').val(),
            
        })

        parent.SetAddUpload_tp();
        parent.UploadTableCallback_tp();
        var index852 = parent.layer.getFrameIndex(window.name); //获取窗口索引
        parent.layer.close(index852);
            
    }
    
    

}


function SetAddUpload() {
    //第一步 初始化上传控件，按各个系统
    SysConfig.SubSystemData.SYKFGL.UploadFile('#changefileXZ', upload, element, chooseCallback, doneCallback, allDoneCallback, errCallback);
    //第二步 使用上传表格方式时需配置
    //数据化数据集合与列

    var cols = [[
        { field: '', title: '序号', width: "6%", type: "numbers" }
        , { field: '图片编号', title: '图片编号', hide: true } //必须

        , {
            field: '图片地址', width: "20%", title: '缩略图', templet: function (d) {
                return '<div class="list-img-mudule" style=""><img  class="layadmin-homepage-pad-img" style = "max-width:60px; max-height: 60px; cursor: pointer;" src="' + d.图片地址.replace("_sss", "_s") + '" alt = "" lay-event="scanPic" /></DIV>';
            }
        } //必须
        , { field: '文图名称', width: "40%", title: '文图名称' }  //必须  可以根据不同表更改字段名，对应下方的json 也要改
        //, { field: '大小', width: "10%", title: '大小' } //必须  如数据库字段没有 不必填充
        , { field: '状态', width: "10%", title: '状态' } //必须 如数据库字段没有 从数据库调取后默认显示已上传
        , { field: '入库状态', title: '状态', hide: true } //必须 非数据库字段，用于区分数据库数据还是新增数据
        //, { field: '文件地址', title: '状态', hide: true } //必须 可以根据不同表更改字段名，对应下方的json 也要改
        , {
            field: '',
            title: '操作',
            width: "24%",
            align: 'center',
            templet: function (d) {
                let tt = "";
                // tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=setMainPhoto("' + d.图片地址 + '") lay-event="edit">设置为主图</a>';
                tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=show("' + d.图片地址 + '") lay-event="edit">查看</a>';
                tt += ' <a class="layui-btn layui-btn-danger layui-btn-xs" onclick=del("' + d.图片编号 + '","' + d.文物入库编号 + '","' + d.文图名称 + '","' + d.图片地址 + '","' + d.分类 + '","' + d.图片类型 + '") lay-event="del">删除</a>';
                return tt;
            }

        },
    ]]


    //第三步 使用上传表格方式时需配置
    //渲染table，一般附件列表不需要翻页，此时UploadTableData 可以从数据库使用postdata获取到
    UploadTable.render({
        elem: "#grid_table",
        cols: cols,
        data: UploadTableData,
        skin: 'row', //表格风格
        even: true,
        size: 'lg',
        defaultToolbar: [],
        loading: true,
        cellMinWidth: 30,
        id: "mDataTable",
        limit: 50
    });
}

//删除行
function del(rowid, knbh, imageName, ImagePath, imageClass) {
    for (var i in UploadTableData) {
        if (UploadTableData[i].图片编号 == rowid) {
           var nindex = layer.confirm('确定要删除吗？', {
                btn: ['确定', '再想想'] //按钮
            }, function () {
               var index001 = layer.msg('正在删除,请稍等...', {
                    time: 0,
                    shade: 0.3,
                    //content: '测试回调',
                    success: function (index, layero) {
                        setTimeout(function () {
                            UploadTableData.splice(i, 1);
                            parent.UploadTableData_tp.splice(i, 1);
                            parent.addImageData_tp.splice(i, 1);
                            layer.close(index001);
                            UploadTableCallback();


                        }, 100);
                        
                    }
                })
            }, function () {
                layer.close(nindex);
            });

            break;

        }
    }
}

//查看
function show(path) {
    SysConfig.ToolBox.ShowVideo('查看文件', path, $(window).width() - 20, $(window).height() - 20);
}

//上传预加载，可自定义
function chooseCallback(obj) {
    //使用上传表格方式时需配置
    //obj.preview(function (index, file, result) {
    //    UploadTableData.push({ id: index, 文件名: file.name, 大小: (file.size / 1024 / 1024).toFixed(1) + 'MB', 状态: "等待上传", 入库状态: "未入库" });
    //    UploadTableCallback();
    //});
    //;

}

//所有上传完成，多文件上传返回
function allDoneCallback(obj) {
    //console.log(obj.total); //得到总文件数
    //console.log(obj.successful); //请求成功的文件数
    //console.log(obj.aborted); //请求失败的文件数

}

//单个文件上传放回
function doneCallback(res, index, upload) {
    if (res.success) {
        var imgbh = "TP" + SysConfig.ToolBox.getTimeAndRandom();
        UploadTableData.push({ 图片编号: imgbh, 文图名称: res.filename, 图片地址: res.filepath, 状态: "未入库",图筒编号: $('#图筒').val(), 长: $('#长').val(), 宽: $('#宽').val() });
        parent.UploadTableData_tp.push({ 图片编号: imgbh, 文图名称: res.filename, 图片地址: res.filepath, 状态: "未入库",图筒编号: $('#图筒').val(), 长: $('#长').val(), 宽: $('#宽').val() });
        addImageData.push({
            图片编号: imgbh,
            文物入库编号: knbh,
            文图名称: res.filename,
            图片地址: res.filepath,
            分类: "拓片",
            图筒: $('#图筒').val(),
			图片类型: "系统上传",
			长: $('#长').val(),
            宽: $('#宽').val(),
		})
		parent.addImageData_tp.push({
            图片编号: imgbh,
            文物入库编号: knbh,
            文图名称: res.filename,
            图片地址: res.filepath,
            分类: "拓片",
            图筒: $('#图筒').val(),
			图片类型: "系统上传",
			长: $('#长').val(),
            宽: $('#宽').val(),
        })
       
        UploadTableCallback();
    }

}

function errCallback(index, upload) {

    //获取上传错误列表使用table显示调用这个
    for (var i in UploadTableData) {
        if (UploadTableData[i].id == index) {
            UploadTableData[i].状态 = "上传失败";
        }
    }
}


function UploadTableCallback() {
    UploadTable.reload('mDataTable', {
        data: UploadTableData,
        page: {
            limits: [50],
            groups: 20,
            curr: 1
        },
    });
}













// var knbh = window.location.href.getQuery("knbh"),
// 	form,
// 	id = window.location.href.getQuery("id"),
// 	where = {
// 		TblNum: 391,
// 		//		QueryType: "obscure",
// 		orderby: "id desc"
// 	},
// 	loading;
// $(function() {
// 	layui.config({
// 		base: '../../../layuiadmin/layui/' //静态资源所在路径
// 	}).extend({
// 		tableSelect: 'lay/modules/tableSelect' //主入口模块
// 	});
// 	layui.use(['form', 'tableSelect'], function() {
// 		form = layui.form;
// 		var tableSelect = layui.tableSelect;
// 		loading = layer.load(); //换了种风格
// 		uploadImg = new UploadFile("filename", "filepath", "/api/kf/data");
// 		uploadImg.fileupload(changefileXZ, "#showfileXZ") //现状
// 		//获取图片编号
// 		postData("RubbingFileCode", {
// 			RelicsCode: knbh
// 		}, function(data) {
// 			$("#图片编号 ").val(data.data)
// 		})
// 		if(id) {
// 			echoData()
// 		}
// 		//添加图片
// 		form.on("submit(pictureSubmit)", function(obj) {

// 			addPictureToData()
// 			return false
// 		})
// 		//添加图筒
// 		$("#addPreliminary").click(function() {
// 			postData("GetTubesCode", "", function(data) {
// 				submitDataTip("自动生成图筒号：" + data.data + "确定要添加吗?", function() {
// 					postData("AddTubesCode", "", function(data) {
// 						tipMsg(data, function() {

// 						})
// 					})
// 				})
// 			})

// 		})
// 		form.on('radio(autoUpload)', function(data) {
// 			if(data.value == "手动上传") {
// 				$("#uploadFileDiv").removeClass("layui-hide")

// 			} else {
// 				$("#uploadFileDiv").addClass("layui-hide")
// 			}

// 		});
// 		//图筒下拉
// 		tableSelect.render({
// 			elem: '#图筒', //定义输入框input对象
// 			checkedKey: 'id', //表格的唯一建值，非常重要，影响到选中状态 必填
// 			searchKey: 'QueryKey', //搜索输入框的name值 默认keyword
// 			searchPlaceholder: '关键词搜索', //搜索输入框的提示文字 默认关键词搜索
// 			table: { //定义表格参数，与LAYUI的TABLE模块一致，只是无需再定义表格elem
// 				url: '/api/kf/data?XAction=wwGetDataList&sykf=SYKFGL',
// 				where: where,
// 				cols: [
// 					[{
// 							type: 'radio'
// 						}, {
// 							title: '序号',
// 							type: 'numbers'

// 						}, {
// 							field: '图筒编号',
// 							title: '图筒编号',
// 							width: '40%',
// 							align: 'center',
// 							templet: '#xmbh'
// 						},
// 						{
// 							field: '操作',
// 							title: '删除',
// 							width: '40%',
// 							align: 'center',
// 							templet: '#operate'
// 						}
// 					]
// 				]
// 			},
// 			done: function(elem, data) {

// 				elem.val(data.data[0]['图筒编号'])
// 				//选择完后的回调，包含2个返回值 elem:返回之前input对象；data:表格返回的选中的数据 []
// 				//拿到data[]后 就按照业务需求做想做的事情啦~比如加个隐藏域放ID...
// 			},
// 			tableEvent: function(data) {

// 				switch(data.event) {
// 					case "del":
// 						delData(data.data.id, where.TblNum, function() {
// 							layer.msg('删除成功！', {
// 								title: '提示框',
// 								icon: 1,
// 								time: 800
// 							}, function(alertindex) {

// 								tableins.reload();
// 							});
// 						})
// 						break;
// 				}
// 			}
// 		})

// 		layer.close(loading)

// 	})

// })

// function echoData() {
// 	postData("wwGetDataList", {
// 		TblNum: "104",
// 		T1041: "EQ" + id
// 	}, function(data) {
// 		for(var k in data.data[0]) {
// 			$("#" + k).val(data.data[0][k])
// 		}
// 		if(data.data[0]['图片类型'] == "批次导入") {
// 			$("#sysUpload").prop("checked", true)
// 		} else {
// 			$("#autoUpload").prop("checked", true)
// 			$("#uploadFileDiv").removeClass("layui-hide")
// 			echoPicture("showfileXZ", data, "old", "文图名称", "图片地址")

// 		}
// 		form.render()
// 	})
// }

// function addPictureToData() {
// 	var pictureData = uploadImg.addFileData("showfileXZ", false, "拓片");
// 	var xaction = "";
// 	var where = {
// 		TblNum: "104",
// 		XDLM分类: "拓片扫描件",
// 		XDLM长: $("#长").val(),
// 		XDLM宽: $("#宽").val(),
// 		XDLM文图名称: $("#文图名称").val(),
// 		XDLM备注: $("#备注").val(),
// 		XDLM文物入库编号: knbh,
// 		XDLM图筒: $("#图筒").val(),
// 		XDLM图片编号: $("#图片编号").val(),
// 		XDLM表对应码: "386",

// 	}
// 	if(id) {
// 		xaction = "wwModifyDataById";
// 		where.XDLMID = id
// 	} else {
// 		xaction = "wwAddNewRow";

// 	}
// 	if(!$("#sysUpload").prop("checked")) { //系统上传

// 		if(pictureData) {
// 			if(xaction == "wwModifyDataById") {
// 				where.XDLM图片类型= "系统上传";
// 			}
// 		} else {
// 			layer.msg("手动上传必须添加图片");
// 			return

// 		}
// 	}else{
// 		if(xaction == "wwModifyDataById") {
// 				where.XDLM图片类型= "批次导入";
// 			}
// 	}

// 	if(pictureData) {
// 		where.XDLM图片地址 = pictureData.split(",")[0]
// 	}

// 	postData(xaction, where, function(data) {
// 		tipMsg(data, function() {
// 			parent.getTpPictureList(knbh)
// 			QXALL()
// 		})
// 	})
// }

// function echoPicture(id, data, type2, oldName, newName) {

// 	var html = ""
// 	for(var i = 0; i < data.data.length; i++) {
// 		var pictureType = data.data[i]['图片类型'];
// 		html += `
// 			<tr id="upload-${type2+i}" oldName="${data.data[i][oldName]}" newName="${data.data[i][newName]}">
// 			<td>
// 			<div  style="cursor: pointer;">
// 				<div class="layadmin-homepage-pad-ver imgDiv" >
// 				<img onclick="lookPic('${data.data[i][newName]}')" type="${pictureType}" class="layadmin-homepage-pad-img" src="${data.data[i][newName].replace('ss.','.')}" width="66" height="66">
// 				</div>
// 			</div>
// 			</td>
// 			<td>${data.data[i][oldName]}</td>
// 			<td><div class="layui-progress">
//   			<div class="layui-progress-bar" lay-percent="100%" style="width:100%"></div>
// 			</div></td>
// 			<td>上传成功</td>
// 			<td>
// 			<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>
// 			<span class="layui-btn layui-btn-xs layui-btn-danger " id="delete${i}" onclick="deleteFile('${data.data[i][newName]}','${type2+i}','edit','${data.data[i].id}')">删除</span>
// 			<span class="layui-btn layui-btn-xs layui-btn-warm demo-look"  onclick="lookPic('${data.data[i][newName]}')" >预览</span>			
// 			<span class="layui-hide import-img layui-btn layui-btn-xs " onclick="firstPic(this)">设为主图</span>

// 			</td></tr>`
// 	}
// 	$("#" + id).append(html)

// }