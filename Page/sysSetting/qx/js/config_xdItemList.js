var colsName;
var tableins;
var where;
var editUrl = '';
var id; //流程配置的id
var onlynum; //流程配置的唯一值
var qxList;
var rolenames;
var miaoshus;
var xmbhs;
console.log("修改")
layui.use(['table', 'layer', 'jquery','form'], function () {
		var table = layui.table,
			layer = layui.layer,
			form = layui.form,
			$ = layui.jquery;
//		id = window.location.href.getQuery('id');
		
		onlynum = window.location.href.getQuery('onlynum');
		rolenames=unescape(window.location.href.getQuery('rolename'));
		miaoshus=unescape(window.location.href.getQuery('miaoshu'));
//		xmbhs=unescape(window.location.href.getQuery('xmbhs'));
		var returnData = PostDatasyyh('wwGetDataList', {
			TblNum:7013,
			X103:onlynum,
			T90:'NE99999'
		});
	console.log(returnData);
	if(returnData.msg){

		if(returnData.data.length>0){
			$('#rolename').html(returnData.data[0].rolename);
		}
		
	}
	where = {
//				wsql: "select * from xdItemList t1 left outer join (select t3.rolename,t3.roleNum,lmid,qx from xdRole t3 where roleNum='"+onlynum+"' and xmbh='"+returnData.data[0].xmbh+"') t2 on t1.itemNum=t2.lmid  where t1.xmbh='"+returnData.data[0].xmbh+"'",
				wRoleNum:onlynum,
				wXMBH:'sygr'
			}
		//xmbhList
		 var rvbhList = PostDatasyyh('wwGetDataList', {
						TblNum:7015,
						select:'distinct(xmbh)'
		});
		console.log(rvbhList);
		 if(rvbhList.msg){
			 var rvbhListHtml='';
			if(rvbhList.count>0){
			
				for(var i in rvbhList.data){
//					console.log(rvbhList.data[i]);
					if (rvbhList.data[i].xmbh === "sygr") {
						rvbhList.data.splice(i, 1);
						break;
					}
//					var rvcnbh = PostDatasyyh('wwGetDataList', {
//									TblNum:7010,
//									X68:rvbhList.data[i].xmbh
//					});
//					console.log(rvcnbh);
//					rvbhListHtml+='<option value="'+rvbhList.data[i].xmbh+'">'+rvcnbh.data[0].xmmc+'</option>';
					
				}
				rvbhList.data.unshift({xmbh:"sygr"});
		
				for(var i in rvbhList.data){
					var rvcnbh = PostDatasyyh('wwGetDataList', {
									TblNum:7010,//info_setting 基础信息表
									X68:rvbhList.data[i].xmbh
					});
					console.log(rvcnbh);
					rvbhListHtml+='<option value="'+rvbhList.data[i].xmbh+'">'+rvcnbh.data[0].xmmc+'</option>';
				}
				$('#xmbhList').append(rvbhListHtml);
				form.render();
			}
		 }
	//xmbhList
//		 var rvItmlist = PostDatasyyh('wwGetDataList', {
//						TblNum:7015,
//						select:'distinct(itemlm)'
//		});
//		  console.log(rvItmlist);
//		 if(rvItmlist.msg){
//			 var rvItmlistHtml='';
//			if(rvItmlist.count>0){
//				for(var i in rvItmlist.data){
////					console.log(rvbhList.data[i]);
//					rvItmlistHtml+='<option value="'+rvItmlist.data[i].itemlm+'">'+rvItmlist.data[i].itemlm+'</option>';
//					
//				}
//				$('#itemList').append(rvItmlistHtml);
//				form.render();
//			}
//		 }
		xmbhs=$('#xmbh').val();
		form.on('select(xmbhList)', function (data) {
			console.log(data);
			xmbhs=data.value;
			where.wXMBH = data.value;
			tableins.reload({
				where: where
			});
			if (data.value != '') {
				$('#isbmzr').val(1);
				$('#isRecMsg').val(1);
			}else{
				
			}
		});
	
//		form.on('checkbox(checkbox_fw)', function(data){
//			console.log(data);
////		  console.log(data.elem); //得到checkbox原始DOM对象
////		  console.log(data.elem.checked); //是否被选中，true或者false
////		  console.log(data.value); //复选框value值，也可以通过data.elem.value得到
////		  console.log(data.othis); //得到美化后的DOM对象
//		});        
		
			//		$('#lcshow').append(LCProcess(onlynum));
			//		$('#fuelux-wizard-container').wizard({
			//			selectedItem: {
			//				step: 0
			//			}
			//		});
		console.log(where);
		colsName = [
			[{
				checkbox: true,
				LAY_CHECKED: true,
				width: '5%',
			}, 
			 {
				field: 'itemlm',
				title: '栏目名称',
				width: '10%',
				align: 'center',
				templet: "#itemlm"
			},
			 {
				field: 'itemname',
				title: '子栏目名称',
				width: '10%',
				align: 'center'
			}, {
				field: 'id',
				title: '访问权限',
				width: '10%',
				align: 'center',
//				type:'checkbox'
				templet: "#fwqx"
			}, {
				field: 'id',
				title: '编辑权限',
				width: '10%',
				align: 'center',
				templet: "#bjqx"
			}, {
				field: 'id',
				title: '删除权限',
				width: '10%',
				align: 'center',
				templet: "#scqx"
			},  {
				field: 'id',
				title: '导出',
				width: '10%',
				align: 'center',
				templet: "#dcqx"
			},  {
				field: 'id',
				title: '审核',
				width: '10%',
				align: 'center',
				templet: "#shqx"
			}, {
				title: '操作',
				width: '15%',
				align: 'center',
				toolbar: '#opeTpllcjd'
			}]
		];
		tableins = table.render({
			elem: '#demo',
			url: '/wwSYGR/wwData/wwDataManageGR.ashx?XAction=FindRoleItem&XKLX=syyh',
//			url: '/wwSYGR/wwData/wwDataManageGR.ashx?XAction=sqlRun&XKLX=syyh',
//			url: '/xdData/xdDataManageGR.ashx?XAction=SqlRun&XKLX=syyh',
			where: where,
			method: 'post',
			cols: colsName,
			skin: 'row', //表格风格
			even: true,
			size: 'sm',
			
			height: $(document).height() - 160,
			page: true, //是否显示分页
			limits: [6, 20, 30, 40, 50],
			limit: 6, //每页默认显示的数量
			id: "tableLayui",
			done: function (res, curr, count) {
				console.log("**********")
								console.log(res);
				
			}
		});

		table.on('tool(xmTable)', function (obj) {
			getRowColor(obj)
			var data = obj.data;
			//			console.log(data);
			var layEvent = obj.event;
			if (layEvent == 'edit') {
				
				editUrl=$('#TJRolediv');
				openWindow(1, editUrl, '修改栏目',800,450);
				var returnData = PostDatasyyh('wwGetDataList', {
						TblNum:7015,
						X98:data.id
					});
				if(returnData.msg){
					for( var item in returnData.data[0]){
						$('#'+item).val(returnData.data[0][item]);
					}
//					console.log(returnData.data[0].xmbh);
					$('#XDLMID').val(returnData.data[0].id);
					form.render();
					$('#saveHZ').html('修改');
				}
			} else if (layEvent == 'del') {
				DelDatasyyh2(7015, data.id,data.itemNum);
				 
			}
		});
		$('#PLSC').click(function () {
			var checkStatus = table.checkStatus('tableLayui');
			console.log(checkStatus)
			PLSC(checkStatus);
		});
	//添加
    $('#add_RolePower').click(function ()
    {
		editUrl=$('#TJRolediv');
		$('#itemlm').val('');
		$('#itemname').val('');
		$('#saveHZ').html('添加');
		var returnDataTimes = PostData("GeOnlyNum");
		$('#itemNum').val(returnDataTimes.OnlyNum);
		openWindow(1, editUrl, '添加栏目',600,420);
//       addTeamMList();
    });
	//点击checkbox编辑删除啥的，选中对应的每一行表格权限
	
	qxList=['all_fw','all_bj','all_sc','all_dc','all_sh'];
	for(var i=0;i<qxList.length;i++){
//		console.log(qxList[i]);
		form.on('checkbox('+qxList[i]+')', function (data) {
//					console.log(data.value);
//			 		console.log(data.elem.checked); //checked为true,否则为false
			if(data.elem.checked){
				$('[name="'+data.value+'"]').each(function(i,e){
						if(e.checked){
						}else{
							e.checked=true;
						}
					});
				form.render();
			}else{
				$('[name="'+data.value+'"]').each(function(i,e){
						if(e.checked){
							e.checked=false;
						}else{
							
						}
					});
				form.render();
			}
				});
	}
//	 var getdatalist;
//	 if(id!=null){
//		getdatalist = PostDatasyyh('wwGetDataList', {
//				TblNum:7013,
//				X88:id
//		});
//		console.log(getdatalist);
//	}
	
		//确认设置权限
	 $('#saveRole').click(function (e)
    {
        e.preventDefault();
		console.log(xmbhs);
		 var rowNetbarid=table.cache.tableLayui;
//		 console.log(JSON.stringify( table));

		 console.log(rowNetbarid);
		 
//		 var checkStatus = table.checkStatus('tableLayui'); //test即为基础参数id对应的值
//		 console.log(checkStatus.data) //获取选中行的数据
//        var rowNetbarid = $("#grid-table").getRowData();
		
		
		 if(rowNetbarid.length>0){
				for (var i in rowNetbarid)
				{
					var qx = 900000;
					if ($("[value=checkbox_fw" + rowNetbarid[i].id + "]")[0].checked) {
						qx = qx + 10000;
					}
					if ($("[value=checkbox_bj" + rowNetbarid[i].id + "]")[0].checked)
					{
						qx = qx + 1000;
					}
					if ($("[value=checkbox_sc" + rowNetbarid[i].id + "]")[0].checked)
					{
						qx = qx + 100;
					}
					if ($("[value=checkbox_dc" + rowNetbarid[i].id + "]")[0].checked)
					{
						qx = qx + 10;
					}
					if ($("[value=checkbox_sh" + rowNetbarid[i].id + "]")[0].checked)
					{
						qx = qx + 1;
					}
					console.log(qx);
//					if(getdatalist.msg){
//						if(getdatalist.data.length>0){
								var DelData = PostDatasyyh("wwDelRoleLm", {
									roleNum:onlynum,
//									wXMBH:xmbhs,
									wXMBH:xmbhs,
									wLmOnlynum:rowNetbarid[i].itemNum,
								});

								var returnData = PostDatasyyh("wwAddRoleLm", {

									roleNum:onlynum,
									wXMBH:xmbhs,
//									wXMBH: xmbhs,
									wLmOnlynum:rowNetbarid[i].itemNum,
									wDescript:miaoshus,
									wQX:qx,
									wRoleName:rolenames,
								});



//						}

//					}
					
//					 var DelData = PostDatasyyh("wwDelRoleLm", {
//						 roleNum:onlynum,
//						 wXMBH:
////		            	TblNum: 7013,
////		            	T103:'EQ'+onlynum,//roleNum
////						T91:'EQ'+rowNetbarid[i].itemNum//lmid
//		            });
//		            var DelData = PostDatasyyh("wwDelDataByWhere", {
//		            	TblNum: 7013,
//		            	T103:'EQ'+onlynum,//roleNum
//						T91:'EQ'+rowNetbarid[i].itemNum//lmid
//		            });
//					console.log(DelData);
//					console.log(returnData.data[0].xmbh);
//		          var returnData = PostDatasyyh("wwAddNewRow", {
//		          	TblNum: 7013,
//		          	XDLMroleNum:onlynum,
//		          	XDLMmiaoshu: '99999',
//					XDLMrolename :$('#rolename').html(),
//		          	XDLMlmid: rowNetbarid[i].itemNum,
//		          	XDLMqx: qx
////		          	XDLMxmbh: $('#xmbh').val()
//		          });
//					console.log(returnData);
				}
		}
		 //获取管理中心的数据，更新setingLimt的值
		var applyLimt = {}
		getxdItemList("sygr", function(data) {

			for(var j = 0; j < data.length; j++) {
				setLimt("sygr", data[j].itemNum, function(dataonly) { //获取所有个人权限列表内容

					$("#" + data[j].itemNum).hideDiv(dataonly.qx)
					applyLimt[data[j].itemNum] = dataonly.qx
				})
			}

			store.set("applyLimt", applyLimt)
		})
		 
		 console.log("----------------")
		 console.log(applyLimt)
		 
       layer.msg('权限设置成功！', { title: '提示框', icon: 1, time: 500 }, function () {
//		   window.location.reload();    
		   			console.log(where);	
					tableins.reload({
						where: where
					});
		   			$('[name="all_fw"]').attr('checked',false)
					$('[name="all_bj"]').attr('checked',false)
					$('[name="all_sc"]').attr('checked',false)
					$('[name="all_dc"]').attr('checked',false)
					$('[name="all_sh"]').attr('checked',false)
					form.render();
		
		   			
                        
       });
		
		
    });
	//提交添加新栏目
	form.on('submit(XMForm)',function(data){
			console.log(data);
			if($('#saveHZ').html()!='添加'){
				layer.confirm('确定要修改吗？',function(index){
					var returnMsg=PostDatasyyh('wwModifyDataById',data.field);
					console.log(returnMsg);
					if(returnMsg.msg){
						layer.msg('修改完成',{icon:1,time:1000},function(){
							 layer.close(index);
								tableins.reload();
							 	layer.closeAll();
							
						})
					}
				})
				return false;
			}else{
				layer.confirm('确定要添加吗？',function(index){
					var add_data = PostDatasyyh('wwAddNewRow',data.field);
					 console.log(add_data);
					 if(add_data.msg){
						 layer.msg('添加完成',{icon:1,time:800},function(){
								tableins.reload();
							 	layer.closeAll();
						 });
					 }
					 layer.close(index);
					
				 })
				return false;

			}

		});
	}) //初始化end
function funToText(funid) {
	//	console.log(funid);
	var funName = '';
	if (funid != '') {
		if (funid.indexOf(',') != -1) { //说明不止一个功能
			var funArr = funid.split(',');

			for (var i = 0; i < funArr.length; i++) {
				var data = PostDatasygr('wwGetDataList', {
					TblNum: 8017,
					T231: 'EQ' + funArr[i]
				});
				funName += data.data[0].func + ',';
				//				console.log(funName);
			}
			funName = funName.slice(0, -1);
		} else { //说明只有一个功能
			var data = PostDatasygr('wwGetDataList', {
				TblNum: 8017,
				T231: 'EQ' + funid
			});
			funName += data.data[0].func;
		}
	}

	//	console.log(data);
	return funName;
}

function PLSC(ids) {
	console.log(ids);
	if (ids.data.length == 0) {
		var index111 = layer.msg('请先选中行！', {
			title: '提示框',
			icon: 2,
			time: 800
		}, function (alertindex) {
			layer.close(index111);
		});
	} else {


		indexPrompt = layer.open({
				title: '警告！系统关键操作，必须输入确认密码',
//				formType: 2
				content: ' <div class="layui-form-item">'+
               '<label style="text-algin:center;width:80px!important;" class="layui-form-label">用户名</label>'+
               '<div class="layui-input-block" style="margin-left:110px!important">'+
               '<input type="text"  class="layui-input" id="user">'+
               '</div>'+
          	   '</div>'+
         	   '<div class="layui-form-item">'+
               '<label style="text-algin:center;width:80px!important;"  class="layui-form-label">密码</label>'+
               '<div class="layui-input-block" style="margin-left:110px!important">'+
               '<input type="text"  class="layui-input" id="psd">'+
               '</div>'+
               '</div>',
               btn:["确定","取消"],
               yes:function (){
               	if($("#user").val()==""){               	
               		return false
               	}
               	if($("#psd").val()==""){
               		return false
               	}
				//再次效验账户名密码
				var returnValue = PostDatasyyh('ZWUserLogin', {
					XDLMUserName: $("#user").val(),
					XDLMPassword: $("#psd").val()
				});	
				if (returnValue.msg) {


					layer.msg('正在删除,请稍等...', {
						time: 0,
						shade: 0.3,
						//content: '测试回调',
						success: function (index, layero) {

							for (var i = 0; i < ids.data.length; i++) {
								var rvs = PostDatasyyh("wwDelDataById", {
									TblNum: 7015,
									XDLMID: ids.data[i].id
								});
								//删除xdrole里面对应lm的权限数据
								 var DelData = PostDatasyyh("wwDelDataByWhere", {
									TblNum: 7013,
									T103:'EQ'+onlynum,//roleNum
//									T93:'EQ'+$('#xmbh').val(),//xmbh
									T91:'EQ'+ ids.data[i].itemNum//lmid
								});
//								console.log(rvs);
							};
							layer.msg('删除完成！', {
								title: '提示框',
								icon: 1,
								time: 500
							}, function () {
								//								$('#lcshow').empty();
								//								$('#lcshow').append(LCProcess(onlynum));
								tableins.reload();
								layer.close(indexPrompt);

							});

						}
					});
				} else {
					layer.msg('密码错误,请重新输入', {
						icon: 0,
						time: 800
					});
					return false
				}
			
               }
			}, //prompt风格，支持0-2},
			function (pass) {});
	}
}
//删除单行
function DelDatasyyh2(taname, id,roleNumz){
	layui.use(['layer'], function(){
	layer.confirm('确定要删除？删除后不可恢复！！', {
			btn: ['确定删除', '再想想'] //按钮
		},
		function () //确定
		{
			layer.msg('确定删除，请稍等...', {
				icon: 1,
				time: 500,
			});
			var rvs = PostDatasyyh("wwDelDataById", {
				TblNum: taname,
				XDLMID: id
			});
//		console.log(rvs);
			try {
				//				return rvs;
				if (rvs.msg) {
					layer.msg('删除完成！', {
						icon: 1,
						time: 800
					}, function () {
						//删除xdrole里面对应lm的权限数据
						 var DelData = PostDatasyyh("wwDelDataByWhere", {
							TblNum: 7013,
							T103:'EQ'+onlynum,//roleNum
//							T93:'EQ'+$('#xmbh').val(),//xmbh
							T91:'EQ'+roleNumz//lmid
						});
						tableins.reload();
						//						console.log(where.TblNum==9983);
						
						//						return rvs;
					});
				} else {
					layer.alert(rvs, {
						title: '系统提示',
						icon: 2,
					});
					//					return rvs;
				}
			} catch (e) {
				layer.alert(e.message, {
					title: '系统提示',
					icon: 2,
				});
				//				return rvs;
			}

		},
		function () //取消
		{

		});
		});
}
