//var id = window.location.href.getQuery("knbh");
// var TablNum = window.location.href.getQuery("TablNum");
var check = window.location.href.getQuery("check");
// var echoDataId = ["库房名", "柜架号", "分区号", "层号"];
// var editId = "";
// var form;
// var where;
var type = window.location.href.getQuery("type");
// var knbh = window.location.href.getQuery("knbh")
var ids = window.location.href.getQuery("ids")
var tableins = "", knbhList;
// var limit = 20;
// var delData = []; //删除的数据数组
var form, table, element, layer, cols;
layui.use(['element', 'table', 'layer', 'form'], function() {
    form = layui.form, table = layui.table, element = layui.element, layer = layui.layer;


    if(ids != null){
        knbhList = ids.split(',');
    }else{
        knbhList = [];
    }

    //支持扫码枪
	$('#guncode').focus();
    $('#guncode').keydown(function (event) {
        if (event.which == 13) {
            var checkStatus = tableins.checkStatus('mDataTable'),
                data = checkStatus.data;
            if(data.length > 0){
                for (var i = 0; i < data.length; i++) {
                    if (data[i].length > 0) {
                        if (data[i]['文物库内编号'] != $('#guncode').val()) {
							knbhList.push($('#guncode').val());
							break;
						}
                    }
                }
            }
            else{
                knbhList.push($('#guncode').val());
            }

            layer.msg('载入扫码数据...', {
				time: 800
			}, function () {
				GetItemData();
				$('#guncode').val("");
			});
        }
    })

    if (check == 1) { //所有库房文物位置查看
        $('#modifyData').hide();
        $('#柜架号').attr('disabled', true);
        $('#层号').attr('disabled', true);
        $('#分区号').attr('disabled', true);
    }

    $("#库房名").html(SysConfig.UserInfo.GetCookieName("mCurrentStorage"));
    if (type == "rk" || type == "rkAll") {
        $("#modifyData").html("入库")
        $("#移交人_tr").css('display', '');
        $("#监督人_tr").css('display', '');
        $("#接收人_tr").css('display', '');
        $("#录入人_tr").css('display', '');
        $("#XDLM录入人").val(SysConfig.UserInfo.GetUserName());
        $("#XDLM移交人").val(SysConfig.UserInfo.GetUserName());
        $("#XDLM接收人").val(SysConfig.UserInfo.GetUserName());
        $("#XDLM监督人").val(SysConfig.UserInfo.GetUserName());
    }
    
    // 获取库房柜架
	var reData_kfgj = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
		XDLMCID: "1001",
		XDLMSID: "DYBH201908231246284628123181",
		XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
	});

	if (reData_kfgj.success) {
		$('#柜架号').empty();
		for (var i = 0; i < reData_kfgj.rows.length; i++) {
			$('#柜架号').append('<option value="' + reData_kfgj.rows[i].柜架号 + '">' + reData_kfgj.rows[i].柜架号 + '</option>');
		}
		getCengHao(reData_kfgj.rows[0]['柜架号']);
	}

	form.on("select(store)", function (data) {
		getCengHao(data.value)
	})
	form.on("select(level)", function (data) {
		getFenQu($('#柜架号').val(),data.value)
    })
    
    //数据回显
    GetItemData();
    
    tableins.on("tool(grid_table)", function (obj) {
		switch (obj.event) {
			case "del":
				obj.del();
				break;
		}
    })
    

    $('#modifyData').click(function(){
        var KnbhArry = [];
        var checkStatus = tableins.checkStatus('mDataTable'),
            data = checkStatus.data;
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                KnbhArry.push(data[i]['文物库内编号']);
            }
        }
        else {
			layer.msg("入库清单为空");
        }

        if (KnbhArry.length > 0) {
            let dataList = {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204006",
                XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),
                mCurrentStorage: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                XDLMids: ids,
                XDLM柜架号: $("#柜架号").val(),
                XDLM层号: $("#层号").val(),
                XDLM分区号: $("#分区号").val(),
                XDLM移交人: $("#XDLM移交人").val(),
                XDLM监督人: $("#XDLM监督人").val(),
                XDLM接收人: $("#XDLM接收人").val(),
                XDLM录入人: $("#XDLM录入人").val(),
                XDLMtype: "入库"
            };

            layer.confirm("确定要入库吗？", {
				btn: ['确定', '再想想'] //按钮
			}, function () {
				var returnData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", dataList);

				if (returnData.success) {
					parent.Callback();
				}
				else {
					layer.msg("入库失败！");
				}

			}, function () {

			});
        }else{
            layer.msg("请选中入库清单！");
        }
        

    })



    form.render('select');




















        //清除本机存储
        // store.remove('pisitionScanDataww')
        // store.remove('pisitionScanDatatp')
        //回显数据
        // GetItemData();

        //支持扫码枪
        // $('#guncode').focus();
        // $('#guncode').keydown(function(event) {
        //     if (event.which == 13) {
        //         var batchStoreType = "";
        //         if (TablNum == "305") {
        //             batchStoreType = "pisitionScanDataww";
        //         } else if (TablNum == "386") {
        //             batchStoreType = "pisitionScanDatatp";
        //         }

        //         //当前扫码内容验重
        //         //1.存储内容时验证当前输入是否已经存在  
        //         if (store.get(batchStoreType) != undefined) {
        //             if ($.inArray($('#guncode').val(), store.get(batchStoreType).split(',')) == -1) {
        //                 //不存在则写入
        //                 store.set(batchStoreType, (store.get(batchStoreType) == undefined ? $('#guncode').val() : store.get(batchStoreType) + ',' + $('#guncode').val()))
        //             }
        //         } else {
        //             store.set(batchStoreType, $('#guncode').val());
        //         };

        //         layer.msg('载入扫码数据...', { time: 800 }, function() {
        //             GetItemData();
        //             $('#guncode').val("");
        //         }); //扫码后必须清空文本框
        //     }
        // });

        // if (check == 1) { //所有库房文物位置查看
        //     $('#modifyData').hide();
        //     $('#柜架号').attr('disabled', true);
        //     $('#层号').attr('disabled', true);
        //     $('#分区号').attr('disabled', true);
        // }

        // layui.use(["form"], function() {
            // $("#库房名").html(getCookieName("mCurrentStorage"));
            // if (type == "rk" || type == "rkAll") {
            //     $("#modifyData").html("入库")

            //     $("#移交人_tr").css('display', '');
            //     $("#监督人_tr").css('display', '');
            //     $("#接收人_tr").css('display', '');
            //     $("#录入人_tr").css('display', '');
            //     $("#XDLM录入人").val(getCookieName('mUserName'))
            // }

            //获取存储数据
            //var positionData=store.get("pisitionScanDataww");

            //获取位置
            // getGuiJia(getCookieName("mCurrentStorage"));
            // $("#录入人").html(getCookieName("mUserName"));

            // form.on("select(store)", function(data) {
            //     getCengHao(data.value)
            // })
            // form.on("select(level)", function(data) {
            //     getFengQu(data.value)
            // })
            //获取文物清单
            // table.on("tool(wwgkList)", function(obj) {
            //     switch (obj.event) {
            //         case "del":
            //             submitDataTip("确定要移除吗？", function() {
            //                 obj.del();
            //                 delData.push(obj.data['文物库内编号'])
            //             })
            //             break;
            //     }
            // })
//             form.on("submit(modifyData)", function(data) { //修改位置信息
//                 data.field.TblNum = TablNum;
// data.field.mCurrentStorage=getCookieName("mCurrentStorage")
//                 //批量设置位置时用的ids 这里文物库内编号需要转为 ID

//                 var idsArry = [];
//                 var gundata = layui.table.cache.tableLayui;
//                 for (var i = 0; i < gundata.length; i++) {
//                     idsArry.push(gundata[i].id);
//                 }

//                 data.field.ids = idsArry.join(',');

//                 if (type == "rk" || type == "rkAll") {
//                     data.field.type = "入库"; //泾渭基地要求  入库时需要文物变更中记录
//                     submitData("BatchSetLocation", data.field, "入库")
//                 } else {
//                     submitData("BatchSetLocation", data.field, "修改")
//                 }

//             })
//             form.render();
//             form.render("select");
//         })

        // function getGuiJia(data) {
        //     postData("wwGetDataList", {
        //         TblNum: 147,
        //         T1472: "EQ" + data,
        //         orderby: "id "
        //     }, function(returndata) {
        //         if (returndata.data.length > 0) {
        //             getSelect("柜架号", returndata.data, "柜架号");
        //             getCengHao(returndata.data[0]['柜架号']);
        //         }

        //         form.render("select");
        //     })
        // }

        // function getCengHao(data) {
        //     postData("wwGetDataList", {
        //         TblNum: 158,
        //         T1582: "EQ" + getCookieName("mCurrentStorage"),
        //         T1583: "EQ" + data,
        //         orderby: "id "
        //     }, function(returndata) {
        //         if (returndata.data.length > 0) {
        //             getSelect("层号", returndata.data, "层号");
        //             getFengQu(returndata.data[0]['层号']);
        //         }

        //         form.render("select");
        //     })

        // }

        // function getFengQu(data) {
        //     postData("wwGetDataList", {
        //         TblNum: 151,
        //         T1512: "EQ" + getCookieName("mCurrentStorage"),
        //         T1513: "EQ" + $('#柜架号').val(),
        //         T1514: "EQ" + data,
        //         orderby: "id "
        //     }, function(retrundata) {
        //         if (retrundata.data.length > 0) {
        //             getSelect("分区号", retrundata.data, "分区号");
        //         }

        //         form.render("select");

        //     })
        // }

});


function GetItemData() {
    let where;
    switch (SysConfig.UserInfo.GetCookieName("kflx")) {
        case "文物":
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
                    align: 'center',
                    //templet: "#smallPicture"
                }, {
                    field: '登记名称',
                    title: '名称',
                    width: '15%',
                    align: 'center'
                }, {
                    field: '文物库内编号',
                    title: '现登记号',
                    width: '8%',
                    align: 'center'
                }, {
                    field: '现藏品总登记号',
                    title: '原登记号',
                    width: '8%',
                    align: 'center'
                }, {
                    field: '库房名',
                    title: '库房名',
                    width: '10%',
                    align: 'center',

                }, {
                    field: '柜架号',
                    title: '柜架号',
                    width: '10%',
                    align: 'center'
                },
                {
                    field: '层号',
                    title: '层号',
                    width: '10%',
                    align: 'center'
                },
                {
                    field: '分区号',
                    title: '分区号',
                    width: '10%',
                    align: 'center'
                }, {
                    field: '库存状态',
                    title: '库存状态',
                    width: '5%',
                    align: 'center',
                    templet: '#kczt'
                }, {
                    field: '',
                    title: '操作',
                    width: '12%',
                    align: 'center',
                    templet: '#opeTpl'
                }

                ]
            ];
            break;
        case "拓片":
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
                    align: 'center',
                    //templet: "#smallPicture"
                }, {
                    field: '登记名称',
                    title: '名称',
                    width: '15%',
                    align: 'center'
                }, {
                    field: '文物库内编号',
                    title: '文物库内编号',
                    width: '8%',
                    align: 'center'
                }, {
                    field: '整理编号',
                    title: '整理编号',
                    width: '8%',
                    align: 'center'
                }
                    , {
                    field: '库房名',
                    title: '库房名',
                    width: '10%',
                    align: 'center',

                }, {
                    field: '柜架号',
                    title: '柜架号',
                    width: '10%',
                    align: 'center'
                },
                {
                    field: '层号',
                    title: '层号',
                    width: '10%',
                    align: 'center'
                },
                {
                    field: '分区号',
                    title: '分区号',
                    width: '10%',
                    align: 'center'
                }, {
                    field: '库存状态',
                    title: '库存状态',
                    width: '5%',
                    align: 'center',
                    templet: '#kczt'
                }, {
                    field: '',
                    title: '操作',
                    width: '12%',
                    align: 'center',
                    templet: '#opeTpl'
                }

                ]
            ];
            break;
    }
    if (knbhList != null) {
        
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(table, '文物列表', cols, where, 7);
    }
}
    
function getFenQu(datagj, ceng) {

	var reData_fq = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
		XDLMCID: "1001",
		XDLMSID: "DYBH201908231246284628236171",
		XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
		XDLMB: datagj,
		XDLMC: ceng,
	});
	if (reData_fq.success) {
		$('#分区号').empty();
		for (var i = 0; i < reData_fq.rows.length; i++) {
			$('#分区号').append('<option value="' + reData_fq.rows[i].分区号 + '">' + reData_fq.rows[i].分区号 + '</option>');
		}
		// form.render("select")
	}
}

function getCengHao(datagj) { //获取柜架号
	var reData_ceng = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
		XDLMCID: "1001",
		XDLMSID: "DYBH20190823124628462826161",
		XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
		XDLMB: datagj,
	});
	if (reData_ceng.success) {
		$('#层号').empty();
		for (var i = 0; i < reData_ceng.rows.length; i++) {
			$('#层号').append('<option value="' + reData_ceng.rows[i].层号 + '">' + reData_ceng.rows[i].层号 + '</option>');
		}
		getFenQu(datagj, reData_ceng.rows[0].层号);

	}
}


// function submitData(method, data, tip) {
//     layer.confirm('确定要' + tip + "？", {
//             btn: ['确定', '再想想'] //按钮
//         },
//         function() //确定
//         {
//             layer.msg('正在提交，请稍等...', {
//                 icon: 1,
//                 time: 500,
//                 success: function() {
//                     postData(method, data, function(data) {
//                         layer.msg(data.message, {
//                             title: '提示框',
//                             icon: 1,
//                             time: 800
//                         }, function() {
//                             if (data.msg || data.success) {
//                                 var index852 = parent.layer.getFrameIndex(window.name); //获取窗口索引

//                                 if (type == "rkAll") {
//                                     var batchStoreType = "";
//                                     if (TablNum == "305") {
//                                         batchStoreType = "pisitionScanDataww";
//                                     } else if (TablNum == "386") {
//                                         batchStoreType = "pisitionScanDatatp";
//                                     }

//                                     var layer003 = layer.confirm("是否打印入库单?", {
//                                             btn: ['是', '否'] //按钮
//                                         },
//                                         function() //确定
//                                         {
//                                             //printAllList(parent.knbhArry.join(","), data.log_codes,"入库单")
//                                             printAllList(store.get(batchStoreType), data.log_codes, "入库单")
//                                             tableins.reload()
//                                             layer.close(layer003)

//                                         },
//                                         function() {
//                                             QXALL()
//                                             tableins.reload()
//                                         }
//                                     );

//                                     //操作完成后清除客户端本地存储(LocalStorage)
//                                     store.remove(batchStoreType);
//                                     //      parent.intoStorage(parent.tableData)
//                                 } else if (type == "rk") {

//                                     //      parent.intoStorageAll()
//                                     var layer003 = layer.confirm("是否打印" + tip + "单?", {
//                                             btn: ['是', '否'] //按钮
//                                         },
//                                         function() //确定
//                                         {
//                                             parent.layer.close(index852);
//                                             parent.printAllchildren(TablNum, knbh, data.log_codes)

//                                             parent.tableins.reload()
//                                             layer.close(layer003)

//                                         },
//                                         function() {
//                                             QXALL()
//                                             tableins.reload()
//                                         }
//                                     );
//                                 }

//                             }
//                         });
//                     })
//                 }
//             });

//         }
//     );

// }

//获取数据
// function GetItemData() {
//     //扫码内容为库内编号
//     if (TablNum == "305") {
//         if (store.get("pisitionScanDataww") != "") {
//             $("#wwType").html("文物")
//             getTable("wwgkList", {
//                 TblNum: TablNum,
//                 T3056: "in(" + store.get("pisitionScanDataww") + ") "
//             }, "wwckList", "", "") //调用函数显示表格
//         }

//     } else if (TablNum == "386") {
//         if (store.get("pisitionScanDatatp") != "") {
//             $("#wwType").html("拓片")
//             getTable("wwgkList", {
//                 TblNum: TablNum,
//                 T3862: "in(" + store.get("pisitionScanDatatp") + ") "

//             }, "djblb", "", "") //调用函数显示表格};
//         }
//     }
// }