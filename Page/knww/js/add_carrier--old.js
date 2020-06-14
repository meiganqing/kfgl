/**
 * Created by xh on 2020/04/20.
 * 文件名: add_carrier.JS
 * 作　者: 徐航
 * 日　期: 2020/04/20
 * 描　述: 新增拓片信息
 * 版　本: 1.00
 * 修改历史纪录:
 * 版本     时间           姓名         内容
 2. 02   2020/04/20      徐航        新增拓片信息
 */
var newnum,tableins = "", loading, $, layer, laydate, upload, form, element,UploadTable,tableins_tp,
	UploadTableData_yj = [], UploadTableData_jj = [], UploadTableData_tp = [], UploadTableData_sp = [],
    addImageData_yj = [], addImageData_jj = [], addImageData_tp = [], addImageData_sp = [], delImageData = [],
    returnEditData, //修改页面获取单行的数据
    rowid_tp,
	type = window.location.href.getQuery("type"),
    knbh = window.location.href.getQuery("knbh"),
    print = window.location.href.getQuery("print");
var delData = ["XDLM在库状态", "XDLM操作类型", "XDLM记录类型", "XDLM移交人", "XDLM监督人", "XDLM接收人", "XDLM录入人"];
layui.use(['jquery', 'element', 'form', 'layer', 'laydate', 'table', 'upload'], function () {
    $ = layui.jquery;
    layer = layui.layer;
    laydate = layui.laydate;
    form = layui.form;
    upload = layui.upload;
    element = layui.element;
    UploadTable = layui.table;
    loading = layer.load(); //换了种风格
    
    
    kfDataManage.GetGuiJia();
    form.on("select(柜架号)", function (data) {
        kfDataManage.GetCengHao();
        form.render("select")
    })
    form.on("select(层号)", function (data) {
        kfDataManage.GetFenQu();
        form.render("select")
    })
    form.on("select(分区号)", function (data) {
        //查询当前的柜架信息
        let returnfenqu = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "1001",
            XDLMSID: "DYBH201908231246284628236171",
            XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
            XDLMB: $("#柜架号").val(),
            XDLMC: $("#层号").val(),
            XDLMD: $("#分区号").val(),
        });
        if (returnfenqu.success) {
            if (parseInt(returnfenqu.rows[0]['现容量']) >= parseInt(returnfenqu.rows[0]['最大容量'])) {
                layer.msg('当前位置已满，请重新选择！', {
                    title: '提示框',
                    icon: 0,
                    time: 800
                });
            }
        }


    })

    getSelectOption();  //各类下拉选项
    if(type){
        newnum=0
    }else{
        getProvince(); // 省市县
    }
  

    form.on("select(province)", function(data) {
        getCity()
    })
    form.on("select(city)", function(data) {
        getCounty()
    })
    form.on("select(county)", function(data) {
        getVillage()
    })
    

    if(type == "modify"){  //修改
        $("#formSubmit").html("修改");
		$('#modifyData').removeClass("layui-hide");
		$('#申请人用户名').val(SysConfig.UserInfo.GetUserName());
		$("#supervisePerson").addClass('layui-hide');
		$("#supervisePerson").find("input").removeAttr("lay-verify");
		setInterval(function () {
            $('#申请更改时间').val(SysConfig.ToolBox.CurrentDate() + " " + SysConfig.ToolBox.CurrentTime())
		}, 1000);

        echoData();
        layer.close(loading)

	}else{ //添加
		$("#录入人").val(SysConfig.UserInfo.GetUserName());
		$("#库房名").val(SysConfig.UserInfo.GetCookieName("mCurrentStorage"));
		$("#添加人").val(SysConfig.UserInfo.GetUserName());
        setInterval(function () {
            $('#添加时间').val(SysConfig.ToolBox.CurrentDate() + " " + SysConfig.ToolBox.CurrentTime())
		}, 1000);
		var bhdata = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "9000",
            XDLMTID: "9204",
            XDLMSID: "9204010",
        });
        $("#文物库内编号").val(bhdata.data);

        $("#modifyData").find("textarea").removeAttr("lay-verify")
        layer.close(loading)
    }
    
    //查看位置
    $("#checkPosition").click(function() { 
        SysConfig.ToolBox.openWindow('/SYKFGL/Page/kfgl/page/krck.html?type=operate', "位置查看", $(window).width() - 100, $(window).height() - 100)
    })

	SetAddUpload("#changefileYJ", "#table_yj", UploadTableData_yj, "mDataTable_yj");  //远景
	SetAddUpload("#changefileJJ", "#table_jj", UploadTableData_jj, "mDataTable_jj");  //近景
	SetAddUpload_tp();  //图片
    SetAddUpload("#changefileSP", "#table_sp", UploadTableData_sp, "mDataTable_sp");  //视频

    //添加拓片图片弹窗选择图筒
    $("#changefileTP").click(function() {
        editPic($("#文物库内编号").val(), "new");
    })

    //主图点击
    $("#lastImportPic").click(function () {
        var onlyPicSrc = $(this).attr("src")
        SysConfig.ToolBox.ShowVideo("查看文件", onlyPicSrc, $(window).width() - 100, $(window).height() - 100);
    })


    // 已拓未拓
    form.on('radio(isYiTuo)', function(data) {
        if(data.value == "否") {
            $("#weituoyuanyin").removeClass("layui-hide")
        } else {
            $("#weituoyuanyin").addClass("layui-hide")
        }
    })


    // 载体一类型radio点击切换载体二类型和载体用途
    form.on('radio(filter)', function(data) {
        showDiv(data.value)
    });
    
    $('#jwd1').click(function() {
        openJWDDiv($('#JWDBox1'));
    });
    $('#jwd2').click(function() {
        openJWDDiv($('#JWDBox2'));
    });

    $('#qd1').click(function() {
        ChangeToDu('du1', 'fen1', 'miao1', 'GPS经度');
        layer.close(index7989);
    });
    $('#qd2').click(function() {
        ChangeToDu('du2', 'fen2', 'miao2', 'GPS纬度');
        layer.close(index7989);
    });


    
    $('#formSubmit').click(function(){
         //载体二类型，载体用途添加
        $(".lx2").each(function(key, val) {
            if(!$(val).hasClass("hide")) {
                $('#XDLM载体二类型').val($(val).find(".zt2").val()) 
                $('#XDLM载体用途').val($(val).find(".yt2").val()) 
            }
        })
        if($('#编号').val() == ''){
            layer.msg("请填写原编号！",{
                icon: 0,
                time: 1500
            })
        }else{
            if (type == "modify") {
                $("#modifyDifference").empty()
                var html = "";
                var modifyContent = {}; //修改记录内容
                var data = $("#XMForm").serialize();
                data = decodeURIComponent(data, true);// 防止中文乱码 
                data = data.replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/\+/g, " ").replace(/[\r\n]/g, "<br>");
                data = "{\"" + data + "\"}";
                var mFormJson = JSON.parse(data);// 转化为json return JSON.parse(json);}
    
                for (var j in mFormJson) {
                    var echoK = j.replace("XDLM", ""); //原始数据的键
                    if (delData.indexOf(j) == -1) {
                        if (returnEditData.rows[0][echoK] != mFormJson[j]) {  //有改动
    
                            modifyContent[echoK] = {
                                "olddata": returnEditData.rows[0][echoK],
                                "newdata": mFormJson[j]
                            }
                            if (echoK == "图片地址") {
                                html += `<dd><div class="modifyContent-content"><div class="pic-module">【修改主图】</div><div  id="beforePic" style="" class="picture-div pic-module">	<img onclick="lookPic(${returnEditData.rows[0][echoK]})" class="layadmin-homepage-pad-img" src="${mFormJson[j]}" max-width="48" max-height="48" style="max-width: 48px;max-height: 48px;"></div></div></dd>`;
                            } else {
                                html += `<dd>
                                            <div style="line-height:32px;">
                                                <p>修改【${echoK}】从 <span class="modify-detail" style="color:red;">【${returnEditData.rows[0][echoK]}】</span>到<span class="modify-detail" style="color:green">【${mFormJson[j]}】</span></p>
                                            </div> 
                                        </dd>`
                            }
                        }
                    }
                }
    
                if (addImageData_yj.length > 0) { //远景
                    modifyContent["增加远景图片"] = [];
                    for (var x in addImageData_yj) {
                        modifyContent["增加远景图片"].push(addImageData_yj[x]);
                        html += `<dd>
                                    <div class="modifyContent-content">
                                        <div class="pic-module">增加远景图片</div>
                                        <div  id="beforePic" style="" class="picture-div pic-module">	
                                            <img onclick="lookPic(${addImageData_yj[x].图片地址})" class="layadmin-homepage-pad-img" src="${addImageData_yj[x].图片地址}" max-width="48" max-height="48" style="max-width: 48px;max-height: 48px;">
                                        </div>
                                    </div>
                                </dd>`;
    
                    }
                }
    
                if (addImageData_jj.length > 0) { //近景
                    modifyContent["增加近景图片"] = [];
                    for (var x in addImageData_jj) {
                        modifyContent["增加近景图片"].push(addImageData_jj[x]);
                        html += `<dd>
                                    <div class="modifyContent-content">
                                        <div class="pic-module">增加近景图片</div>
                                        <div  id="beforePic" style="" class="picture-div pic-module">	
                                            <img onclick="lookPic(${addImageData_jj[x].图片地址})" class="layadmin-homepage-pad-img" src="${addImageData_jj[x].图片地址}" max-width="48" max-height="48" style="max-width: 48px;max-height: 48px;">
                                        </div>
                                    </div>
                                </dd>`;
    
                    }
                }
    
                if (addImageData_tp.length > 0) { //拓片
                    modifyContent["增加拓片图片"] = [];
                    for (var x in addImageData_tp) {
                        modifyContent["增加拓片图片"].push(addImageData_tp[x]);
                        html += `<dd>
                                    <div class="modifyContent-content">
                                        <div class="pic-module">增加拓片图片</div>
                                        <div  id="beforePic" style="" class="picture-div pic-module">	
                                            <img onclick="lookPic(${addImageData_tp[x].图片地址})" class="layadmin-homepage-pad-img" src="${addImageData_tp[x].图片地址}" max-width="48" max-height="48" style="max-width: 48px;max-height: 48px;">
                                        </div>
                                    </div>
                                </dd>`;
    
                    }
                }
    
                if (addImageData_sp.length > 0) { //视频
                    modifyContent["增加视频"] = [];
                    for (var x in addImageData_sp) {
                        modifyContent["增加视频"].push(addImageData_sp[x]);
                        html += `<dd>
                                    <div class="modifyContent-content">
                                        <div class="pic-module">增加视频</div>
                                        <div  id="beforePic" style="" class="picture-div pic-module">	
                                            <img onclick="lookPic(${addImageData_sp[x].图片地址})" class="layadmin-homepage-pad-img" src="${addImageData_sp[x].图片地址}" max-width="48" max-height="48" style="max-width: 48px;max-height: 48px;">
                                        </div>
                                    </div>
                                </dd>`;
    
                    }
                }
    
                if (delImageData.length > 0) {
                    modifyContent["删除图片"] = [];
                    for (var y in delImageData) {
                        modifyContent["删除图片"].push(delImageData[y]);
                        html += `<dd><div class="modifyContent-content"><div class="pic-module">【删除图片】</div><div  id="beforePic" style="" class="picture-div pic-module">	<img onclick="lookPic(${delImageData[y].图片地址})" class="layadmin-homepage-pad-img" src="${delImageData[y].图片地址}" max-width="48" max-height="48" style="max-width: 48px;max-height: 48px;"></div></div></dd>`;
                    }
                }
    
                console.log(modifyContent);
                if ($.isEmptyObject(modifyContent)) { //修改记录内容对象为空则未做改动
                    layer.msg("没有需要更新的数据")
                    return false;
                } else {
                    $("#modifyDifference").append(html);
                    var postData = { //给后台传递的对象
                        XDLMCID: 5000,
                        XDLMSID: "DYBH201908231246284628247203",
                        XDLM申请人用户名: $("#申请人用户名").val(),
                        XDLM登记名称: $("#登记名称").val(),
                        // XDLM现藏品总登记号: $("#现藏品总登记号").val(),
                        XDLM错误描述: $("#错误描述").val(),
                        XDLM申请更改时间: $("#申请更改时间").val(),
                        XDLM修改内容记录: JSON.stringify(modifyContent),
                        XDLM库房名: $("#库房名").val(),
                        XDLM当前状态: "修改中",
                        XDLM文物库内编号: knbh
                    }
                    var index002 = layer.open({
                        type: 1,
                        skin: 'layui-layer-molv', //加上边框
                        area: ['420px', '240px'], //宽高
                        content: $("#modifyDifferenceDisplay"),
                        // content: $("#modifyDifference"),
                        btn: ['确定'], //按钮
                        area: [400 + 'px', 400 + 'px'],
                        yes: function () {
                            var rk = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", postData);
                            if (rk.success) {
                                var xgzt = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                                    XDLMCID: "6000",
                                    XDLMSID: "DYBH20190823124628462885225",
                                    XDLMID: rowid_tp,
                                    XDLM库存状态: "修改中"
                                });
                                debugger;
                                layer.msg("已提交修改申请，请等待审核完成！",
                                    {
                                        time: 1000,
                                        end: function () {
                                            parent.Callback();
                                            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                                            parent.layer.close(index); //再执行关闭   
                                        }
                                    });
    
                            }
                            else {
                                layer.msg("提交修改申请失败！" + rk);
                            }
    
                        }
                    });
    
                }
    
    
    
    
            }else{  //添加
    
                //载体类型二，载体用途添加
                // $(".lx2").each(function(key, val) {
                //     if(!$(val).hasClass("hide")) {
                //         $('#载体二类型').val($(val).find(".zt2").val());
                //         $('#载体用途').val($(val).find(".yt2").val());
                //     }
                // })
               
                // 拓片图片批量添加
                if(addImageData_tp.length > 0){
                    var addTP = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface",{
                        XDLMCID: "5001",
                        XDLMSID: "DYBH2020042209570401141323",
                        datalist: JSON.stringify({"key": addImageData_tp})
                    })
                }
                // 表单提交
                var requestData = $("#XMForm").serialize();
                requestData = requestData + "&XDLMCID=9000&XDLMTID=9204&XDLMSID=9204009&XDLM操作类型=入库&XDLM记录类型=新入库&XDLMKFLX=" + SysConfig.UserInfo.GetCookieName("kflx") + "&XDLM图片列表=" + getImgList();
                var rk = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", requestData);
                if (rk.success) {
                    layer.msg("入库成功！", {
                        time: 1000,
                        end: function () {
                            parent.Callback();
                            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                            parent.layer.close(index); //再执行关闭   
                        }
                    });
                }
                else {
                    layer.msg("入库失败！" + rk)
                }
    
               
    
            }
        }
       
    })
   

    form.render();

});

// 图片列表字符串
function getImgList(){
    var checkStatus = [];
    for(let i in UploadTable.cache.mDataTable_yj){
        checkStatus.push(UploadTable.cache.mDataTable_yj[i]);
    }
    for(let j in UploadTable.cache.mDataTable_jj){
        checkStatus.push(UploadTable.cache.mDataTable_jj[j]);
    }
    for(let k in UploadTable.cache.mDataTable_sp){
        checkStatus.push(UploadTable.cache.mDataTable_sp[k]);
    }
    var imageList = "";
    for (let x = 0; x < checkStatus.length; x++) {
        imageList += checkStatus[x].图片编号 + "," + checkStatus[x].图片地址 + "," + checkStatus[x].文图名称 + "," + checkStatus[x].分类 + "|";
    }
    return imageList;
}

function SetAddUpload(btnID, tableID, uploadTableList, layuiTableID) {
    console.log(btnID);
	//第一步 初始化上传控件，按各个系统
	var tpType;  //图片类型，删除用
	switch (btnID){
		case "#changefileYJ":
			SysConfig.SubSystemData.SYKFGL.UploadFile(btnID, upload, element, chooseCallback, doneCallback_yj, allDoneCallback, errCallback);
			tpType = "yj";
			break;
		case "#changefileJJ":
			SysConfig.SubSystemData.SYKFGL.UploadFile(btnID, upload, element, chooseCallback, doneCallback_jj, allDoneCallback, errCallback);
			tpType = "jj";
			break;
        case "#changefileSP":
			SysConfig.SubSystemData.SYKFGL.UploadFile(btnID, upload, element, chooseCallback, doneCallback_sp, allDoneCallback, errCallback);
			tpType = "sp";
			break;
	}
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
        , { field: '状态', width: "10%", title: '状态' } //必须 如数据库字段没有 从数据库调取后默认显示已上传
        , { field: '入库状态', title: '状态', hide: true } //必须 非数据库字段，用于区分数据库数据还是新增数据
        , {
            field: '',
            title: '操作',
            width: "24%",
            align: 'center',
            templet: function (d) {
                let tt = "";
                if(tpType != "sp"){
                    tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=setMainPhoto("' + d.图片地址 + '") lay-event="edit">设置为主图</a>';
                }
                tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=show("' + d.图片地址 + '") lay-event="edit">查看</a>';
                tt += '<a class="layui-btn layui-btn-danger layui-btn-xs" onclick=delfunction("' + d.图片编号 + '","' + d.文物入库编号 + '","' + d.文图名称 + '","' + d.图片地址 + '","' + d.分类 + '","' + d.图片类型 + '","' + tpType + '") lay-event="del">删除</a>';
                return tt;
            }

        },
    ]]


    //第三步 使用上传表格方式时需配置
    //渲染table，一般附件列表不需要翻页，此时UploadTableData 可以从数据库使用postdata获取到
    UploadTable.render({
        elem: tableID,
        cols: cols,
        data: uploadTableList,
        skin: 'row', //表格风格
        even: true,
        size: 'lg',
        defaultToolbar: [],
        loading: true,
        cellMinWidth: 30,
        id: layuiTableID,
        limit: 50
    });

    
}

 //设置主图
function setMainPhoto(url) {
    $("#图片地址").val(url);
    $("#lastImportPic").attr("src", url);
    $("#mainPhoto").removeClass("layui-hide");
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
function doneCallback_yj(res, index, upload) {
	console.log(res);
    if (res.success) {
        var imgbh = "TP" + SysConfig.ToolBox.getTimeAndRandom() + 1;
        UploadTableData_yj.push({ 图片编号: imgbh, 文图名称: res.filename, 图片地址: res.filepath, 分类: "远景", 状态: "未入库" });
        addImageData_yj.push({
            图片编号: imgbh,
            文物入库编号: $("#文物库内编号").val(),
            文图名称: res.filename,
            图片地址: res.filepath,
            分类: "远景",
            图片类型: "系统上传"
		})
        UploadTableCallback("mDataTable_yj", UploadTableData_yj);
    }
}

//单个文件上传放回
function doneCallback_jj(res, index, upload) {
	console.log(res);
    if (res.success) {
        var imgbh = "TP" + SysConfig.ToolBox.getTimeAndRandom() + 2;
        UploadTableData_jj.push({ 图片编号: imgbh, 文图名称: res.filename, 图片地址: res.filepath, 分类: "近景", 状态: "未入库" });
        addImageData_jj.push({
            图片编号: imgbh,
            文物入库编号: $("#文物库内编号").val(),
            文图名称: res.filename,
            图片地址: res.filepath,
            分类: "近景",
            图片类型: "系统上传"
		})
        UploadTableCallback("mDataTable_jj", UploadTableData_jj);
    }
}



//单个文件上传放回
function doneCallback_sp(res, index, upload) {
	console.log(res);
    if (res.success) {
        var imgbh = "TP" + SysConfig.ToolBox.getTimeAndRandom() + 4;
        UploadTableData_sp.push({ 图片编号: imgbh, 文图名称: res.filename, 图片地址: res.filepath, 分类: "视频", 状态: "未入库" });
        addImageData_sp.push({
            图片编号: imgbh,
            文物入库编号: $("#文物库内编号").val(),
            文图名称: res.filename,
            图片地址: res.filepath,
            分类: "视频",
            图片类型: "系统上传"
		})
        UploadTableCallback("mDataTable_sp", UploadTableData_sp);
    }
}




function UploadTableCallback(tableid, dataList) {
    UploadTable.reload(tableid, {
        data: dataList,
        page: {
            limits: [50],
            groups: 20,
            curr: 1
        },
    });
}

function errCallback(index, upload) {
	console.log(index);
	console.log(upload);
    //获取上传错误列表使用table显示调用这个
    // for (var i in UploadTableData) {
    //     if (UploadTableData[i].id == index) {
    //         UploadTableData[i].状态 = "上传失败";
    //     }
    // }
}


//查看
function show(path) {
    SysConfig.ToolBox.ShowVideo('查看文件', path, $(window).width() - 20, $(window).height() - 20);
}

//删除行(图片)
function delfunction(rowid, knbh, imageName, ImagePath, imageClass, imageType, delType) {
	var ImageList = [], tableid = "";
	if(delType == "yj"){
		ImageList = UploadTableData_yj;
		tableid = "mDataTable_yj";
	}else if(delType == "jj"){
		ImageList = UploadTableData_jj;
		tableid = "mDataTable_jj";
	}else if(delType == "sp"){
		ImageList = UploadTableData_sp;
		tableid = "mDataTable_sp";
	}else if(delType == "tp"){
        ImageList = UploadTableData_tp;
    }

    for (var i in ImageList) {
    // for (var i=0; i< ImageList.length; i++) {
        if (ImageList[i].图片编号 == rowid) {
			var nindex = layer.confirm('确定要删除吗？', {
                btn: ['确定', '再想想'] //按钮
            }, function () {
                var index001 = layer.msg('正在删除,请稍等...', {
                    time: 0,
                    shade: 0.3,
                    //content: '测试回调',
                    success: function (index, layero) {
                        setTimeout(function () {
                            // if (type == "modify") {
                                if (ImageList[i].状态 == "未入库")//没从数据库获取的可以直接删
                                {
                                    //delete UploadTableData[i];
                                    console.log(ImageList)
                                    console.log(i);
                                    ImageList.splice(i, 1);
                                    layer.msg('删除完成', {
                                        icon: 1,
                                        time: 1000
                                    });
                                }
                                else {
                                    delImageData.push({
                                        图片编号: rowid,
                                        文物入库编号: knbh,
                                        文图名称: imageName,
                                        图片地址: ImagePath,
                                        分类: imageClass,
                                        图片类型: imageType
                                    })
                                    ImageList[i].状态 = "删除待审";
                                    //从数据库读取到的，调用删除数据库方法
                                    //SysConfig.SubSystemData.SYYHGL.PLSC([{ id: rowid }], '4000', 'DYBH20190823102601261202204', Callback);
                                    layer.msg('已标记删除！', {
                                        icon: 1,
                                        time: 1000
                                    });
                                }
                            // }
                            // else {
                                // ImageList.splice(i, 1);
                            // }
                            
                            layer.close(index001);
                            if(delType == "tp"){
                                UploadTableData_tp = ImageList;
                                UploadTableCallback_tp();
                            }else{
                                UploadTableCallback(tableid, ImageList);
                            }
                            


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

function getProvince(){
    SysConfig.SubSystemData.SYKFGL.PostDataAsync("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462813401",
        XDLMA: -1
    },function(data){
        console.log(data);
        if(data.success){
            $('#省').empty();
            for (var i = 0; i < data.rows.length; i++) {
                $('#省').append(`<option data-id="${data.rows[i].分类id}" value="${data.rows[i].分类名}">${data.rows[i].分类名}</option>`);
            }
            getCity();
            form.render('select');
        }
    });
}

function getCity(){
    SysConfig.SubSystemData.SYKFGL.PostDataAsync("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462813401",
        XDLMA: $('#省').find("option:selected").attr("data-id")
    },function(data){
        console.log(data);
        if(data.success){
            $('#市').empty();
            for (var i = 0; i < data.rows.length; i++) {
                $('#市').append(`<option data-id="${data.rows[i].分类id}" value="${data.rows[i].分类名}">${data.rows[i].分类名}</option>`);
            }
            getCounty();
            form.render('select');
        }
        
    });
}

function getCounty(){
    SysConfig.SubSystemData.SYKFGL.PostDataAsync("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462813401",
        XDLMA: $('#市').find("option:selected").attr("data-id")
    },function(data){
        console.log(data);
        if(data.success){
            $('#县').empty();
            for (var i = 0; i < data.rows.length; i++) {
                $('#县').append(`<option data-id="${data.rows[i].分类id}" value="${data.rows[i].分类名}">${data.rows[i].分类名}</option>`);
            }
            getSerialNumber($('#县').find("option:selected").attr("data-id"));
            getVillage();
            form.render('select');
        }
    });
}

function getVillage(){
    SysConfig.SubSystemData.SYKFGL.PostDataAsync("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462813401",
        XDLMA: $('#县').find("option:selected").attr("data-id")
    },function(data){
        console.log(data);
        if(data.success){
            $('#乡').empty();
            for (var i = 0; i < data.rows.length; i++) {
                $('#乡').append(`<option data-id="${data.rows[i].分类id}" value="${data.rows[i].分类名}">${data.rows[i].分类名}</option>`);
            }
            form.render('select');
        }
    });
}

function getSerialNumber(code) {
    SysConfig.SubSystemData.SYKFGL.PostDataAsync("GetDataInterface", {
        XDLMCID: "9000",
        XDLMTID: "9204",
        XDLMSID: "9204032",
        XDLMmethod: "GetAreaCustomCode",
        area_code: code
    },function(data){
        console.log(data);
        if(data.success){
             newnum+=Number(newnum)+1
            if(newnum==1){

            }else{
                $("#新编号").val(data.data);
            }
          
        }
    });
	
}

var index7989;
function openJWDDiv(divName) {
	index7989 = layer.open({
		type: 1,
		content: divName,
		area: ['600px', '140px'],
		title: '请输入经纬度格式',
		//maxmin: true,
		success: function(layero, index) {

		}
	});
}


function ChangeToDu(du, fen, miao, id) {
	var d = document.getElementById("" + du + "").value;
	var f = document.getElementById("" + fen + "").value;
	var m = document.getElementById("" + miao + "").value;

	var f = parseFloat(f) + parseFloat(m / 60);
	var tansdu = parseFloat(f / 60) + parseFloat(d);
	var xiaoshu = tansdu.toFixed(8);
	document.getElementById("" + id + "").value = xiaoshu;
}

function getSelectOption(){
    SysConfig.SubSystemData.SYKFGL.PostDataAsync("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462880121",
        XDLMB: "拓片资料列表"
    },function(data){
        console.log(data);
        if(data.success){
            for(let i in data.rows){
                switch (data.rows[i].统计项目){
                    case "年代":
                        $('#年代').append(`<option value="${data.rows[i].定数1}">${data.rows[i].定数1}</option>`);
                        break;
                    case "类型":
                        switch (data.rows[i].定数1){
                            case "古墓葬":
                                $('#古墓葬类型').append(`<option value="${data.rows[i].定数2}">${data.rows[i].定数2}</option>`);
                                break;
                            case "摩崖石刻":
                                $('#摩崖石刻类型').append(`<option value="${data.rows[i].定数2}">${data.rows[i].定数2}</option>`);
                                break;
                            case "石窟造像":
                                $('#石窟造像类型').append(`<option value="${data.rows[i].定数2}">${data.rows[i].定数2}</option>`);
                                break;
                            case "古建筑":
                                $('#古建筑类型').append(`<option value="${data.rows[i].定数2}">${data.rows[i].定数2}</option>`);
                                break;
                            case "单体石刻":
                                $('#单体石刻类型').append(`<option value="${data.rows[i].定数2}">${data.rows[i].定数2}</option>`);
                                break;
                        }
                        break;
                    case "用途":
                        switch (data.rows[i].定数1){
                            case "古墓葬":
                                $('#古墓葬用途').append(`<option value="${data.rows[i].定数2}">${data.rows[i].定数2}</option>`);
                                break;
                            case "摩崖石刻":
                                $('#摩崖石刻用途').append(`<option value="${data.rows[i].定数2}">${data.rows[i].定数2}</option>`);
                                break;
                            case "石窟造像":
                                $('#石窟造像用途').append(`<option value="${data.rows[i].定数2}">${data.rows[i].定数2}</option>`);
                                break;
                            case "古建筑":
                                $('#古建筑用途').append(`<option value="${data.rows[i].定数2}">${data.rows[i].定数2}</option>`);
                                break;
                            case "单体石刻":
                                $('#单体石刻用途').append(`<option value="${data.rows[i].定数2}">${data.rows[i].定数2}</option>`);
                                break;
                        }
                        break;
                  
                }
            }
        }
    });
}

function showDiv(data) {
	if(data == '古墓葬') {
		$('#gmz').removeClass('hide');
		$('#mysk').addClass('hide');
		$('#skzx').addClass('hide');
		$('#gjz').addClass('hide');
		$('#dtsk').addClass('hide')
	} else if(data == '摩崖石刻') {
		$('#mysk').removeClass('hide');
		$('#gmz').addClass('hide');
		$('#skzx').addClass('hide');
		$('#gjz').addClass('hide');
		$('#dtsk').addClass('hide')
	} else if(data == '石窟造像') {
		$('#skzx').removeClass('hide');
		$('#gmz').addClass('hide');
		$('#mysk').addClass('hide');
		$('#gjz').addClass('hide');
		$('#dtsk').addClass('hide')
	} else if(data == '古建筑') {
		$('#gjz').removeClass('hide');
		$('#skzx').addClass('hide');
		$('#gmz').addClass('hide');
		$('#mysk').addClass('hide');
		$('#dtsk').addClass('hide')

	} else if(data == '单体石刻') {
		$('#dtsk').removeClass('hide');
		$('#gjz').addClass('hide');
		$('#skzx').addClass('hide');
		$('#gmz').addClass('hide');
		$('#mysk').addClass('hide');
	}
}

// 拓片图片
var index001;
function editPic(id, type) {
	if(type == "old") {
		index001 = SysConfig.ToolBox.openWindow("./addPicture.html?id=" + id + "&knbh=" + $("#文物库内编号").val() + "&type=" + type, "编辑详情", $(window).width(), $(window).height());
	} else if(type == "new") {
		index001 = SysConfig.ToolBox.openWindow("./addPicture.html?knbh=" + $("#文物库内编号").val() + "&type=" + type, "编辑详情", $(window).width(), $(window).height());
	}
}

function SetAddUpload_tp() {
    var cols = [[
        { field: '', title: '序号', width: "6%", type: "numbers" }
        , { field: '图片编号', title: '图片编号', hide: true } //必须

        , {
            field: '图片地址', width: "15%", title: '缩略图', templet: function (d) {
                return '<div class="list-img-mudule" style=""><img  class="layadmin-homepage-pad-img" style = "max-width:60px; max-height: 60px; cursor: pointer;" src="' + d.图片地址.replace("_sss", "_s") + '" alt = "" lay-event="scanPic" /></DIV>';
            }
        } //必须
        , { field: '文图名称', width: "20%", title: '文图名称' }  //必须  可以根据不同表更改字段名，对应下方的json 也要改
        , { field: '长', width: "8%", title: '长' }  //必须  可以根据不同表更改字段名，对应下方的json 也要改
        , { field: '宽', width: "8%", title: '宽' }  //必须  可以根据不同表更改字段名，对应下方的json 也要改
        , { field: '图筒编号', width: "15%", title: '图筒编号' }  //必须  可以根据不同表更改字段名，对应下方的json 也要改
        , { field: '状态', width: "10%", title: '状态' } //必须 如数据库字段没有 从数据库调取后默认显示已上传
        , {
            field: '',
            title: '操作',
            width: "18%",
            align: 'center',
            templet: function (d) {
                let tt = "";
                tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=setMainPhoto("' + d.图片地址 + '") lay-event="edit">设置为主图</a>';
                tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=show("' + d.图片地址 + '") lay-event="edit">查看</a>';
                tt += ' <a class="layui-btn layui-btn-danger layui-btn-xs" onclick=del("' + d.图片编号 + '","' + d.文物入库编号 + '","' + d.文图名称 + '","' + d.图片地址 + '","' + d.分类 + '","' + d.图片类型 + '","' + "tp" + '") lay-event="del">删除</a>';
                return tt;
            }

        },
    ]]

    //渲染table，一般附件列表不需要翻页，此时UploadTableData 可以从数据库使用postdata获取到
    tableins_tp = UploadTable.render({
        elem: "#table_tp",
        cols: cols,
        data: UploadTableData_tp,
        skin: 'row', //表格风格
        even: true,
        size: 'lg',
        defaultToolbar: [],
        loading: true,
        cellMinWidth: 30,
        id: "mDataTable_tp",
        limit: 50
    });
}

function UploadTableCallback_tp() {
    tableins_tp.reload("mDataTable_tp", {
        data: UploadTableData_tp,
        page: {
            limits: [50],
            groups: 20,
            curr: 1
        },
    });
}


function echoData(){
    returnEditData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: '1001',
        XDLMSID: 'DYBH201908231246284628202221',
        XDLMU: knbh,
    });
    if(returnEditData.success){
        
        for (var k in returnEditData.rows[0]) {
            $("#" + k).val(returnEditData.rows[0][k])
        }
        rowid_tp = returnEditData.rows[0].id;
        $('#mainPhoto').removeClass("layui-hide");
        $("#lastImportPic").attr("src", returnEditData.rows[0]['图片地址'])//主图赋值
        
        echoAdress(-1, ['省', '市', '县', '乡'], returnEditData, 0)
        
        setTimeout(function(){
            //单选框回显
           $('#年代').val(returnEditData.rows[0]["年代"])
            $.each($("#syq").find("input"), function(key, value) {  //所有权
                if($(value).val() == returnEditData.rows[0]["所有权"]) {
                    $(value).prop("checked", true)
                }
            })
            $.each($("#ztlx").find("input"), function(key, value) { //载体一类型
                if($(value).val() == returnEditData.rows[0]["载体一类型"]) {
                    $(value).prop("checked", true)
                    showDiv(returnEditData.rows[0]["载体一类型"])
                }
            })

            $(".lx2").each(function(key, value) {  //载体二类型,载体用途
                if(!$(value).hasClass("hide")) {
                    $(value).find(".zt2").val(returnEditData.rows[0]["载体二类型"])
                    $(value).find(".yt2").val(returnEditData.rows[0]["载体用途"])

                }
            })

            $.each($("#jb").find("input"), function(key, value) {  //级别
                if($(value).val() == returnEditData.rows[0]["级别"]) {
                    $(value).prop("checked", true)
                }
            })

            $.each($("#syyt").find("input"), function(key, value) { //使用用途
                if($(value).val() == returnEditData.rows[0]["使用用途"]) {
                    $(value).prop("checked", true)
                }
            })

            $.each($("#isYiTuo").find("input"), function(key, value) {  //是否已拓
                if($(value).val() == returnEditData.rows[0]["是否已拓"]) {
                    $(value).prop("checked", true)
                    form.render()
                }
                if(returnEditData.rows[0]["是否已拓"] == "否") {
                    $("#weituoyuanyin").removeClass("layui-hide")
                }
            })
       })
       


    }


    // 获取附件
    var returnImageData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462851271",
        XDLMC: $("#文物库内编号").val(),
    });
    if (returnImageData.success) {
        if(returnImageData.rows.length > 0){
            for(let i in returnImageData.rows){
                if(returnImageData.rows[i].分类 == "远景"){
                    UploadTableData_yj.push({
                        图片编号: returnImageData.rows[i].图片编号, 
                        文图名称: returnImageData.rows[i].文图名称, 
                        图片地址: returnImageData.rows[i].图片地址, 
                        状态: "已入库" 
                    });
                }else if(returnImageData.rows[i].分类 == "近景"){
                    UploadTableData_jj.push({ 
                        图片编号: returnImageData.rows[i].图片编号, 
                        文图名称: returnImageData.rows[i].文图名称, 
                        图片地址: returnImageData.rows[i].图片地址, 
                        状态: "已入库" 
                    });
                }else if(returnImageData.rows[i].分类 == "拓片"){
                    UploadTableData_tp.push({ 
                        图片编号: returnImageData.rows[i].图片编号, 
                        文图名称: returnImageData.rows[i].文图名称, 
                        图片地址: returnImageData.rows[i].图片地址, 
                        图筒编号: returnImageData.rows[i].图筒,
                        长: returnImageData.rows[i].长,
                        宽: returnImageData.rows[i].宽,
                        状态: "已入库" 
                    });
                }else if(returnImageData.rows[i].分类 == "视频"){
                    UploadTableData_sp.push({ 
                        图片编号: returnImageData.rows[i].图片编号, 
                        文图名称: returnImageData.rows[i].文图名称, 
                        图片地址: returnImageData.rows[i].图片地址, 
                        状态: "已入库" 
                    });
                }
            }
        }
    }



}


function echoAdress(code, id, echoAdressData, index) { //回显省市区的闭包
    SysConfig.SubSystemData.SYKFGL.PostDataAsync("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462813401",
        XDLMA: code
    },function(data){
        console.log(data);
        if(data.success){
            $("#" + id[index]).empty()
			$("#" + id[index]).append(getSelectHtml(data.rows));
			$("#" + id[index]).val(echoAdressData.rows[0][id[index]])
			form.render("select")
            var newcode = $("#" + id[index]).find("option:selected").attr("data-id")
			index++
			if(index < id.length) {
				echoAdress(newcode, id, echoAdressData, index)
			}
        }
    });
    getSerialNumber($('#县').find("option:selected").attr("data-id"));
}

function getSelectHtml(data) {
	var html = ""
	for(var i = 0; i < data.length; i++) {
		html += `<option data-id="${data[i].分类id}" value="${data[i].分类名}">${data[i].分类名}</option>`
	}
	return html
}
















// var knbh;
// var uploadImg;
// var fileTypeArry = ["现状", "视频", "近景",'拓片']
// var fileIdArry = ["showfileXZ", "showfileSP","showfileJJ",'showfileTP']
// var editId = window.location.href.getQuery("id");
// var echoDataObj = "";
// var delData = ["TblNum", "XDLMID", "file", "XDLM图片地址", "XDLM移交人", "XDLM监督人", "XDLM接收人", "XDLM录入人"],
// 	originalPicUrl = "",
// 	form, index001, edictPictureObj = {},
// 	where = {
// 		TblNum: 391,
// 		//		QueryType: "obscure",
// 		orderby: "id desc"
// 	},
// 	loading;
// $(document).ready(function() {
// 	layui.config({
// 		base: '../../../layuiadmin/layui/' //静态资源所在路径
// 	}).extend({
// 		tableSelect: 'lay/modules/tableSelect' //主入口模块
// 	});
// 	layui.use(['form', 'layer', 'upload', 'tableSelect','laydate'], function() {
// 		var tableSelect = layui.tableSelect;
// 		var upload = layui.upload,
// 			layer = layui.layer,
// 			laydate=layui.laydate;
// 		form = layui.form;
		
// 		loading = layer.load(); //换了种风格
// 		//上传附件
// 		uploadImg = new UploadFile("filename", "filepath", "/api/SYKFGL/data");
// 		uploadImg.fileupload(changefileXZ, "#showfileXZ") //现状  远景
// 		uploadImg.fileupload(changefileSP, "#showfileSP") //视频
// 		uploadImg.fileupload(changefileJJ, "#showfileJJ") //近景
// 		uploadImg.fileupload(changefileTP, "#showfileTP") //拓片图片
// 		//取出匹配正则表达式的内容


// 	laydate.render({
// 			value: currentYear() * 1 + 1,
// 			elem: '#拓片年度',
// 			type: 'year',
// 			isInitValue: false, //是否允许填充初始值，默认为 true
// 			done: function() {

// 			}
// 		});
// 		//提交数据
// 		form.on("submit(formSubmit)", function(data) {
// 			data.field.XDLM库存状态 = "在库";
// 			//类型二添加
// 			$(".lx2").each(function(key, val) {
// 				if(!$(val).hasClass("hide")) {
// 					data.field['XDLM载体二类型'] = $(val).find(".zt2").val()
// 					data.field['XDLM载体用途'] = $(val).find(".yt2").val()
// 				}
// 			})
// 			if(editId) {
// 				compareData(data.field, function(data) {
// 					submitDataTip("确定要提交修改", function(data) {
// //						postData("GetDataInterface", data, function(data) {
// //							if(data.success) {
// //								tipMsg(data, function() {
// //									QXALL()
// //								})
// //							}
// //						}, "/xdData/xdDataManage.ashx", "", "XKLX=sykf&XKLX_APPID=92837277")
// 						postData("wwAddNewRow", data, function(data) {
// 							if(data.success) {
// 								tipMsg(data, function() {
// 									QXALL()
// 								})
// 							}
// 						}, "/api/kf/data")
// 					}, data)
// 				});
// 			} else {
// 				submitData(data.field, "AddYZBTable", "ModifyDataById")
// 			}
// 			return false
// 		})


// 		form.on("select(provice)", function(data) {
// 			var code = $(data.elem[data.elem.selectedIndex]).attr("dataid");
// 			getCity(code, "市")
// 		})
// 		form.on("select(city)", function(data) {
// 			var code = $(data.elem[data.elem.selectedIndex]).attr("dataid");
// 			getDistrict(code, "县")
// 		})
// 		form.on("select(district)", function(data) {
// 			var code = $(data.elem[data.elem.selectedIndex]).attr("dataid")
// 			var area_code = $(data.elem[data.elem.selectedIndex]).attr("area_code");
// 			getSerialNumber(area_code)
// 			getCountry(code, "乡")
// 		})
// 		form.on("select(country)", function(data) { //村
// 			var code = $(data.elem[data.elem.selectedIndex]).attr("dataid")
// 			var area_code = $(data.elem[data.elem.selectedIndex]).attr("area_code");
// 			getVillage(code, "村")
// 		})
// 		//赋值到库房名称那边
// 		$("#库房名").val(getCookieName("mCurrentStorage"));
// 		$("#录入人").val(getCookieName("mUserName"));
// 		postData("wwGetDataList", {
// 			TblNum: 147,
// 			T1472: "EQ" + getCookieName("mCurrentStorage")
// 		}, function(data) {
// 			getCengHao(data.data[0]['柜架号'], true)
// 			getSelect("柜架号", data.data, "柜架号")

// 			form.render("select")
// 		})

// 		form.on("select(柜架号)", function(data) {
// 			getCengHao(data.value, false)
// 			form.render("select")
// 		})
// 		form.on("select(层号)", function(data) {
// 			getFenQu($("#柜架号").val(), data.value, false)
// 			form.render("select")
// 		})
// 		form.on("select(分区号)", function(data) {
// 			//查询当前的柜架信息
// 			postData("wwGetDataList", {
// 				TblNum: "151",
// 				T1512: "EQ" + getCookieName("mCurrentStorage"),
// 				T1513: "EQ" + $("#柜架号").val(),
// 				T1514: "EQ" + $("#层号").val(),
// 				T1515: "EQ" + $("#分区号").val()
// 			}, function(returnData) {
			
// 				if(Number(returnData.data[0]['现容量']) > Number(returnData.data[0]['最大容量'])) {
// 					layer.msg("当前位置已满")
// 				}
// 			})
// 		})
// 		//查看位置
// 		$("#checkPosition").click(function() {
// 			openWindow(2, '../../kfgl/page/krck_tp.html?type=operate', "位置查看", $(window).width() - 100, $(window).height() - 100)
// 		})
// 		form.on('radio(isYiTuo)', function(data) {

// 			if(data.value == "否") {
// 				$("#weituoyuanyin").removeClass("layui-hide")
// 			} else {
// 				$("#weituoyuanyin").addClass("layui-hide")
// 			}
// 		})
// 		form.on('radio(filter)', function(data) {
// 			showDiv(data.value)
// 		});
// 		$('#jwd1').click(function() {
// 			openJWDDiv($('#JWDBox1'));
// 		});
// 		$('#jwd2').click(function() {
// 			openJWDDiv($('#JWDBox2'));
// 		});
// 		$('#qd1').click(function() {
// 			ChangeToDu('du1', 'fen1', 'miao1', 'GPS经度');
// 			layer.close(index7989);
// 		});
// 		$('#qd2').click(function() {
// 			ChangeToDu('du2', 'fen2', 'miao2', 'GPS纬度');
// 			layer.close(index7989);
// 		});
// 		//获取朝代
// 		postData("wwGetDataList", {
// 			TblNum: "388",
// 			T3882: "EQ年代",

// 		}, function(data) {
// 			getSelect("年代", data.data, "定数1")
// 			form.render("select")
// 		})
// 		//获取古墓葬
// 		postData("wwGetDataList", {
// 			TblNum: "388",
// 			T3882: "EQ类型",
// 			T3883: "EQ古墓葬",

// 		}, function(data) {
// 			getSelect("古墓葬类型", data.data, "定数2")
// 			form.render("select")
// 		})
// 		postData("wwGetDataList", {
// 			TblNum: "388",
// 			T3882: "EQ用途",
// 			T3883: "EQ古墓葬",

// 		}, function(data) {
// 			getSelect("古墓葬用途", data.data, "定数2")
// 			form.render("select")
// 		})
// 		//获取摩崖石刻
// 		postData("wwGetDataList", {
// 			TblNum: "388",
// 			T3882: "EQ类型",
// 			T3883: "EQ摩崖石刻",
// 		}, function(data) {
// 			getSelect("摩崖石刻类型", data.data, "定数2")
// 			form.render("select")
// 		})
// 		postData("wwGetDataList", {
// 			TblNum: "388",
// 			T3882: "EQ用途",
// 			T3883: "EQ摩崖石刻",
// 		}, function(data) {
// 			getSelect("摩崖石刻用途", data.data, "定数2")
// 			form.render("select")
// 		})
// 		//获取石窟造像
// 		postData("wwGetDataList", {
// 			TblNum: "388",
// 			T3882: "EQ类型",
// 			T3883: "EQ石窟造像",
// 		}, function(data) {
// 			getSelect("石窟造像类型", data.data, "定数2")
// 			form.render("select")
// 		})
// 		postData("wwGetDataList", {
// 			TblNum: "388",
// 			T3882: "EQ用途",
// 			T3883: "EQ石窟造像",
// 		}, function(data) {
// 			getSelect("石窟造像用途", data.data, "定数2")
// 			form.render("select")
// 		})
// 		//获取古建筑
// 		postData("wwGetDataList", {
// 			TblNum: "388",
// 			T3882: "EQ类型",
// 			T3883: "EQ古建筑",
// 		}, function(data) {
// 			getSelect("古建筑类型", data.data, "定数2")
// 			form.render("select")
// 		})
// 		postData("wwGetDataList", {
// 			TblNum: "388",
// 			T3882: "EQ用途",
// 			T3883: "EQ古建筑",
// 		}, function(data) {
// 			getSelect("古建筑用途", data.data, "定数2")
// 			form.render("select")
// 		})
// 		//单体石刻
// 		postData("wwGetDataList", {
// 			TblNum: "388",
// 			T3882: "EQ类型",
// 			T3883: "EQ单体石刻",
// 		}, function(data) {
// 			getSelect("单体石刻类型", data.data, "定数2")
// 			form.render("select")
// 		})
// 		postData("wwGetDataList", {
// 			TblNum: "388",
// 			T3882: "EQ用途",
// 			T3883: "EQ单体石刻",
// 		}, function(data) {
// 			getSelect("单体石刻用途", data.data, "定数2")
// 			form.render("select")
// 		})
// 		//所有权：
// 		postData("wwGetDataList", {

// 			TblNum: "388",
// 			T3882: "EQ所有权",
// 		}, function(data) {
// 			getSelect("所有权", data.data, "定数1")
// 			form.render("select")
// 		})

// 		setTimeout(function() {
// 			echoData(uploadImg)
// 			layer.close(loading)
// 		}, 1000)
// 		//拓片的编辑
// 		form.on("submit(pictureSubmit)", function(obj) {
// 			if($("#modifyPictureId").val()) {
// 				postData("wwModifyDataById", obj.field, function(data, that) {
// 					tipMsg(data, function() {
// 						layer.close(index001)
// 					})
// 				})
// 			} else if($("#modifyPictureSrc").val()) {
// 				edictPictureObj[$("#modifyPictureSrc").val()] = obj.field;

// 				layer.close(index001)
// 			}
// 			return false
// 		})
// 		//添加图片
// 		$("#changefileTPSM").click(function() {
// 			editPic($("#文物库内编号").val(), "new")
// 		})

// 		form.render();
// 	});
// });

// function editPic(id, type) {
// 	if(type == "old") {
// 		index001 = openWindow(2, "./addPicture.html?id=" + id + "&knbh=" + $("#文物库内编号").val() + "&type=" + type, "编辑详情", $(window).width(), $(window).height());
// 	} else if(type == "new") {
// 		index001 = openWindow(2, "./addPicture.html?knbh=" + $("#文物库内编号").val() + "&type=" + type, "编辑详情", $(window).width(), $(window).height());
// 	}
// }

// function getFenQu(datagj, data, init) {
// 	postData("wwGetDataList", {
// 		TblNum: 151,
// 		T1512: "EQ" + getCookieName("mCurrentStorage"),
// 		T1513: "EQ" + datagj,
// 		T1514: "EQ" + data,

// 	}, function(data) {
// 		getSelect("分区号", data.data, "分区号")
// 		if(init) {
// //			echoPositionAvailable()
// 		}
// 		form.render("select")
// 	})

// }

// function getCengHao(datagj, init) { //获取柜架号
// 	layui.use(['form'], function() {
// 		postData("wwGetDataList", {
// 			TblNum: 158,
// 			T1582: "EQ" + getCookieName("mCurrentStorage"),
// 			T1583: "EQ" + datagj
// 		}, function(data) {
// 			getFenQu(datagj, data.data[0]['层号'], init)
// 			getSelect("层号", data.data, "层号")
// 			form.render("select")

// 		})
// 	})

// }

// function showDiv(data) {
// 	if(data == '古墓葬') {
// 		$('#gmz').removeClass('hide');
// 		$('#mysk').addClass('hide');
// 		$('#skzx').addClass('hide');
// 		$('#gjz').addClass('hide');
// 		$('#dtsk').addClass('hide')
// 	} else if(data == '摩崖石刻') {
// 		$('#mysk').removeClass('hide');
// 		$('#gmz').addClass('hide');
// 		$('#skzx').addClass('hide');
// 		$('#gjz').addClass('hide');
// 		$('#dtsk').addClass('hide')
// 	} else if(data == '石窟造像') {
// 		$('#skzx').removeClass('hide');
// 		$('#gmz').addClass('hide');
// 		$('#mysk').addClass('hide');
// 		$('#gjz').addClass('hide');
// 		$('#dtsk').addClass('hide')
// 	} else if(data == '古建筑') {
// 		$('#gjz').removeClass('hide');
// 		$('#skzx').addClass('hide');
// 		$('#gmz').addClass('hide');
// 		$('#mysk').addClass('hide');
// 		$('#dtsk').addClass('hide')

// 	} else if(data == '单体石刻') {
// 		$('#dtsk').removeClass('hide');
// 		$('#gjz').addClass('hide');
// 		$('#skzx').addClass('hide');
// 		$('#gmz').addClass('hide');
// 		$('#mysk').addClass('hide');
// 	}
// }

// function echoData() { //回显数据	
// 	if(editId) {
// 		$("#formSubmit").html("修改")
// 		$("#modifyData").removeClass("layui-hide")
// 		$("#noModify").addClass("layui-hide")
// 		$("#noModify").find("input").removeAttr("lay-verify")
// 		$("#申请人用户名").val(getCookieName("mUserName"))
// 		setInterval(function() {
// 			$('#申请更改时间').val(currentDate() + " " + currentTime())
// 		}, 1000);
// 		//请求数据
// 		postData("wwGetDataList", {
// 			TblNum: "386",
// 			T3861: "EQ" + editId
// 		}, function(data) {
// 			echoDataObj = data.data[0];

// 			for(var k in data.data[0]) {
// 				$("#" + k).val(data.data[0][k])
// 			}
			
// 			echoAdress(0, ['省', '市', '县', '乡', '村'], data, 0)

// 			form.render("select")

// 			//单选框回显
// 			$.each($("#fxlx").find("input"), function(key, value) {
//                 if($(value).val() == data.data[0]["发现类型"]) {
//                     $(value).prop("checked", true)
//                 }
//             })
// 			$.each($("#syq").find("input"), function(key, value) {
// 				if($(value).val() == data.data[0]["所有权"]) {
// 					$(value).prop("checked", true)
// 				}
// 			})
// 			$.each($("#ztlx").find("input"), function(key, value) {
// 				if($(value).val() == data.data[0]["载体一类型"]) {
// 					$(value).prop("checked", true)
// 					showDiv(data.data[0]["载体一类型"])
// 				}
// 			})

// 			$.each($("#jb").find("input"), function(key, value) {
// 				if($(value).val() == data.data[0]["级别"]) {
// 					$(value).prop("checked", true)
// 				}
// 			})
// 			$.each($("#syyt").find("input"), function(key, value) {
// 				if($(value).val() == data.data[0]["使用用途"]) {
// 					$(value).prop("checked", true)
// 				}
// 			})
// 			$.each($("#isYiTuo").find("input"), function(key, value) {

// 				if($(value).val() == data.data[0]["是否已拓"]) {

// 					$(value).prop("checked", true)
// 					form.render()
// 				}
// 				if(data.data[0]["是否已拓"] == "否") {
// 					$("#weituoyuanyin").removeClass("layui-hide")
// 				}
// 			})

// 			$(".lx2").each(function(key, value) {
// 				if(!$(value).hasClass("hide")) {
// 					$(value).find(".zt2").val(data.data[0]["载体二类型"])
// 					$(value).find(".yt2").val(data.data[0]["载体用途"])

// 				}
// 			})

// 			//			uploadImg.echoDataFile("showfileTP", "wwGetDataList", {
// 			//				TblNum: 104,
// 			//				T1042: "EQ" + data.data[0]['文物库内编号'],
// 			//				T10441: "EQ拓片",
// 			//			}, "拓片", "文图名称", "图片地址");
// 			getTpPictureList(data.data[0]['文物库内编号']);//获取放在图筒的扫描件
			
			
			
// 			//回显附件
		
			
// 			uploadImg.echoDataFile("showfileXZ", "wwGetDataList", {
// 				TblNum: 104,
// 				T1042: "EQ" + data.data[0]['文物库内编号'],
// 				T10441: "EQ现状"
// 			}, "现状", "文图名称", "图片地址");
		
// 			uploadImg.echoDataFile("showfileSP", "wwGetDataList", {
// 				TblNum: 104,
// 				T1042: "EQ" + data.data[0]['文物库内编号'],
// 				T10441: "EQ视频",
// 			}, "视频", "文图名称", "图片地址");
// 			uploadImg.echoDataFile("showfileJJ", "wwGetDataList", {
// 				TblNum: 104,
// 				T1042: "EQ" + data.data[0]['文物库内编号'],
// 				T10441: "EQ近景",
// 			}, "近景", "文图名称", "图片地址");
// 			uploadImg.echoDataFile("showfileTP", "wwGetDataList", {
// 				TblNum: 104,
// 				T1042: "EQ" + data.data[0]['文物库内编号'],
// 				T10441: "EQ拓片",
// 			}, "拓片", "文图名称", "图片地址");
// 			form.render("select")

// 			//对比表的回显数据里添加不同类型的数据	
// 			for(var i = 0; i < fileTypeArry.length; i++) {
// 				var echoDifferentPic = ""
// //				if(uploadImg.addFileData(fileIdArry[i], false, fileTypeArry[i])) {
// 					echoDifferentPic += uploadImg.addFileData(fileIdArry[i], false, fileTypeArry[i]);
// //				}

// 				echoDataObj[fileTypeArry[i]] = echoDifferentPic
// 			}


// 		})
// 	} else {
// 		//城市联动
// 		getProvice(0, "省")
// 		postData("RelicsCode", "", function(data) { //获取库内编号
// 			$("#文物库内编号").val(data.data);
// 		})
// 		$("#modifyData").find("textarea").removeAttr("lay-verify")
// 		$("#添加人").val(getCookieName("mUserName"));

// 	}

// }
// echoAdress(0, ['省', '市', '县', '乡', '村'], data, 0)
// function echoAdress(code, id, echoAdressData, index) { //回显省市区的闭包
// 	postData("wwGetDataList", {
// 		TblNum: 389,
// 		T3895: "EQ" + code,
// 		orderby: "id "
// 	}, function(returnData) {
// 		if(returnData.success) {
// 			$("#" + id[index]).empty()
// 			$("#" + id[index]).append(getSelectHtml(returnData.data))
// 			$("#" + id[index]).val(echoAdressData.data[0][id[index]])
// 			form.render("select")
// 			var newcode = $("#" + id[index]).find("option:selected").attr("dataid")
// 			index++
// 			if(index < id.length) {
// 				echoAdress(newcode, id, echoAdressData, index)
// 			}
// 		}
// 	})
// }

// function getTpPictureList(knbh) {
// 	uploadImg.echoDataFile_x("showfileTPSM", "wwGetDataList", {
// 		TblNum: 104,
// 		T1042: "EQ" + knbh,
// 		T10441: "EQ拓片扫描件",
// 	}, "拓片扫描件", "文图名称", "图片地址");
// }

// function submitData(data) {
// 	var method = "",
// 		postUrl = ""

// 	//遍历图片，看是否有未完成的
// 	if(!uploadImg.checkPicUpload("showfileXZ")) {
// 		return false
// 	}
// 	if(!uploadImg.checkPicUpload("showfileTP")) {
// 		return false
// 	}
// 	if(!uploadImg.checkPicUpload("showfileSP")) {
// 		return false
// 	}
// 		if(!uploadImg.checkPicUpload("showfileJJ")) {
// 		return false
// 	}
// 			if(!uploadImg.checkPicUpload("showfileTPSM")) {
// 		return false
// 	}
// 	if($("#formSubmit").html() == "添加") {
// 		method = "AddRelicsStorage";
// 		postUrl = "/api/kf/data";
// 		//验证流水号是否重复
// 		// postData("VerifyAreaCustomCode", {
// 		// 	code: $("#areaCode").val()
// 		// }, function(data) {
// 		// 	if(!data.success) {
// 		// 		getSerialNumber($("#firstareaCode").val())
// 		// 		layer.msg("新编号重复，已重新生成，再次点击确认")
// 		// 	}
// 		// })

// 	} else if($("#formSubmit").html() == "修改") {
// 		method = "wwModifyDataById";
// 		postUrl = "/api/kf/data";
// 	}
// 	layer.confirm('确定要' + $("#formSubmit").html() + "？", {
// 			btn: ['确定', '再想想'] //按钮
// 		},
// 		function() //确定
// 		{

// 			var pictureSrc_ = ""
// 			for(var i = 0; i < fileTypeArry.length; i++) {
// 				if(uploadImg.addFileData(fileIdArry[i], false, fileTypeArry[i])) {
// 					pictureSrc_ += uploadImg.addFileData(fileIdArry[i], false, fileTypeArry[i]) + "|";
// 				}
				
// 			}
// 			data.XDLM图片地址 = pictureSrc_.replace(/\|$/g, "");
// 			layer.msg('正在提交，请稍等...', {
// 				icon: 1,
// 				time: 500,
// 				success: function() {
// 					postData(method, data, function(data) {
// 						layer.msg(data.message, {
// 							title: '提示框',
// 							icon: 1,
// 							time: 800
// 						}, function() {
// 							if(data.msg || data.success) {
// 								var layer002 = layer.confirm("是否打印登记表基础信息?", {
// 										btn: ['是', '否'] //按钮
// 									},
// 									function() //确定
// 									{
// 										layer.close(layer002)
// 										layerPage01 = openWindow(2, 'carrierDetail.html?knbh=' + $("#文物库内编号").val() + '&type=print', "详细信息", $(window).width(), $(window).height());
// 									},
// 									function() {
// 										QXALL()
// 									}
// 								);
// 							}
// 						});

// 					}, postUrl)

// 				}
// 			});

// 		}
// 	);

// }

// function modify(data) {

// 	for(var i in data.data[0]) {
// 		$('#' + i + '').val(data.data[0][i]);
// 		if(i == 'GPS经度') {
// 			ChangeToDuFM(i, 'du1', 'fen1', 'miao1');
// 		}
// 		if(i == 'GPS纬度') {
// 			ChangeToDuFM(i, 'du2', 'fen2', 'miao2');
// 		}
// 		$('#' + i + '').removeAttr("disabled");
// 	}

// }

// var index7989;

// function openJWDDiv(divName) {
// 	index7989 = layer.open({
// 		type: 1,
// 		content: divName,
// 		area: ['600px', '140px'],
// 		title: '请输入经纬度格式',
// 		//maxmin: true,
// 		success: function(layero, index) {

// 		}
// 	});
// }

// function ChangeToDu(du, fen, miao, id) {
// 	var d = document.getElementById("" + du + "").value;
// 	var f = document.getElementById("" + fen + "").value;
// 	var m = document.getElementById("" + miao + "").value;

// 	var f = parseFloat(f) + parseFloat(m / 60);
// 	var tansdu = parseFloat(f / 60) + parseFloat(d);
// 	var xiaoshu = tansdu.toFixed(8);
// 	document.getElementById("" + id + "").value = xiaoshu;

// }

// function compareData(data, callback) { //比较变动内容
// 	$("#modifyDifference").empty();
// 	var html = "",modifyContent = {} //修改记录内容
// 	var newpictureUrl_ = {}

// 	//1)不同类型的图片是否相等，根据页面的最终数据来判断

// 		for(var i = 0; i < fileTypeArry.length; i++) {
// 			var echoDifferentPic = ""

// //			if(uploadImg.addFileData(fileIdArry[i], false, fileTypeArry[i])) {
// 				var newPicture_ = uploadImg.addFileData(fileIdArry[i], false, fileTypeArry[i]);
// 				if(echoDataObj[fileTypeArry[i]] != newPicture_) {
// 					modifyContent[fileTypeArry[i]] = {
// 						"olddata": echoDataObj[fileTypeArry[i]],
// 						"newdata": newPicture_
// 					}
// 				}

	
// //			} else {
// //				if(echoDataObj[fileTypeArry[i]]) {
// //					modifyContent[fileTypeArry[i]] = {
// //						"olddata": echoDataObj[fileTypeArry[i]],
// //						"newdata": ""
// //					}
// //				}
// //			}
	
// 		}

// 	//2）到这对象里只有图片的修改信息
// 		if(!$.isEmptyObject(modifyContent)) { //修改记录内容对象为空则未做改动	
// 			for(var k in modifyContent) {
// 				var oldpictureSplit = modifyContent[k]['olddata'].split("|");
// 				var newpictureSplit = modifyContent[k]['newdata'].split("|");
// 				html += `<dd>
// 			                <div class="layui-status-img"><a href="javascript:;">
// 			                <i style="color:#FFFFFF" class="layui-icon layui-icon-survey"></i>
// 			                </a></div>
// 			                <div style="line-height:32px;width:100%;"><div class="left"><p>修改【${k}】从</p></div><div class="left"><p>【</p></div><div class="left">`

	
// 				for(var i = 0; i < oldpictureSplit.length; i++) {
// 					if(oldpictureSplit[i]) {
// 						html += `<img onclick="lookPic(${oldpictureSplit[i].split(',')[0]})" class="layadmin-homepage-pad-img" src="${oldpictureSplit[i].split(',')[0]}" width="48" height="48">`
	
// 					}
	
// 				}
// 				html += ` </div><div class="left"><p>】到【</p></div><div class="left">`
	
// 				for(var i = 0; i < newpictureSplit.length; i++) {
// 					if(newpictureSplit[i]) {
// 						html += `<img onclick="lookPic(${newpictureSplit[i].split(',')[0]})" class="layadmin-homepage-pad-img" src="${newpictureSplit[i].split(',')[0]}" width="48" height="48">`
	
// 					}
	
// 				}
// 				html += `</div><div class="left"><p>】</p></div></div> </dd>`
	
// 			}
	
// 		}

	// for(var k in data) {
	// 	var echoK = k.replace("XDLM", ""); //原始数据的键
	// 	if(data[k] == "" && echoDataObj[echoK] == "") {} else {

	// 		if(data[k] != echoDataObj[echoK]) {
	// 			if(delData.indexOf(k) == -1) {

	// 				html += `<dd>
	// 	                <div class="layui-status-img"><a href="javascript:;"><i style="color:#FFFFFF" class="layui-icon layui-icon-survey"></i></a></div>
	// 	                   <div style="line-height:32px;">
	// 	                  <p>修改【${echoK}】从 <span class="modify-detail" style="color:red;">【${echoDataObj[echoK]}】</span>到<span class="modify-detail" style="color:green">【${data[k]}】</span></p>
	// 	                </div>
	// 	              </dd>`

	// 				modifyContent[echoK] = {
	// 					"olddata": echoDataObj[echoK],
	// 					"newdata": data[k]
	// 				}

	// 			}

	// 		}

	// 	}
	// }

// 	if($.isEmptyObject(modifyContent)) { //修改记录内容对象为空则未做改动
// 		layer.msg("没有需要更新的数据")
// 		return false;
// 	}
// 	$("#modifyDifference").append(html);
// 	showPicture(echoDataObj["图片地址"], "beforePic", 48, 48) //添加原始图片
// 	showPicture(data['XDLM图片地址'], "afterPic", 48, 48) //添加修改后的图片
// //	var pictureSrc_="";
// //	for(var i = 0; i < fileTypeArry.length; i++) {
// //		console.log(pictureSrc_)
// //				if(uploadImg.addFileData(fileIdArry[i], false, fileTypeArry[i])) {
// //					pictureSrc_ += uploadImg.addFileData(fileIdArry[i], false, fileTypeArry[i]) + "|";
// //				}
// //				
// //			}
// //	console.log(pictureSrc_)
// //	var oldDataPic=""
// //	if(echoDataObj["现状"]){
// //		oldDataPic+=echoDataObj["现状"]+"|"
// //	}
// //	if(echoDataObj["视频"]){
// //		oldDataPic+=echoDataObj["视频"]+"|"
// //	}
// //	if(echoDataObj["近景"]){
// //		oldDataPic+=echoDataObj["近景"]
// //	}
// //	modifyContent['图片地址拓片']={
// //		"olddata": oldDataPic,
// //		"newdata":pictureSrc_
// //	}
	
// //	var postData = { //给后台传递的对象
// //		XDLMCID: 5000,
// //		XDLMSID: "DYBH20190102155532553296233",
// //		XDLM申请人用户名: getCookieName("mUserName"),
// //		XDLM登记名称: $("#登记名称").val(),
// //		XDLM文物库内编号: $("#文物库内编号").val(),
// //		//		XDLM现藏品总登记号: $("#XDLM现藏品总登记号").val(),
// //		XDLM错误描述: $("#错误描述").val(),
// //		XDLM申请更改时间: $("#申请更改时间").val(),
// //		XDLM修改内容记录: JSON.stringify(modifyContent),
// //		XDLM库房名: $("#库房名").val(),
// //		XDLM当前状态: "修改中",
// //
// //	}
// 	var postData = { //给后台传递的对象
// 	TblNum:195,
// 		XDLM申请人用户名: getCookieName("mUserName"),
// 		XDLM登记名称: $("#登记名称").val(),
// 		XDLM文物库内编号: $("#文物库内编号").val(),
// 		//		XDLM现藏品总登记号: $("#XDLM现藏品总登记号").val(),
// 		XDLM错误描述: $("#错误描述").val(),
// 		XDLM申请更改时间: $("#申请更改时间").val(),
// 		XDLM修改内容记录: JSON.stringify(modifyContent),
// 		XDLM库房名: $("#库房名").val(),
// 		XDLM当前状态: "修改中",

// 	}
// 	var index002 = layer.open({
// 		type: 1,
// 		skin: 'layui-layer-molv', //加上边框
// 		area: ['420px', '240px'], //宽高
// 		content: $("#modifyDifferenceDisplay"),
// 		btn: ['确定'], //按钮
// 		area: [400 + 'px', 400 + 'px'],
// 		yes: function() {
// 			layer.close(index002)
// 			callback(postData)
// 		}
// 	});
// }
// //获取城市联动
// function getProvice(code, id) {
// 	postData("wwGetDataList", {
// 		TblNum: 389,
// 		T3895: "EQ" + code,
// 		orderby: "id "
// 	}, function(data) {
// 		if(data.success) {
// 			$("#" + id).empty()
// 			$("#" + id).append(getSelectHtml(data.data))
// 			$("#省").val("四川省")
// 			var code = $("#省").find("option:selected").attr("dataid");
		
// 			getCity(code, "市")
// 			form.render("select")
// 		}
// 	})
// }

// function getCity(code, id) { //获取省
// 	postData("wwGetDataList", {
// 		TblNum: 389,
// 		T3895: "EQ" + code,
// 		orderby: "id "
// 	}, function(data) {
// 		if(data.success) {
// 			$("#" + id).empty();
// 			$("#" + id).append(getSelectHtml(data.data));
// 			getDistrict(data.data[0].code, "县");
// 			form.render("select");
// 		}
// 	})
// }

// function getDistrict(code, id) { //获取省
// 	postData("wwGetDataList", {
// 		TblNum: 389,
// 		T3895: "EQ" + code,
// 		orderby: "id "
// 	}, function(data) {
// 		if(data.success) {
// 			$("#" + id).empty();
// 			$("#" + id).append(getSelectHtml(data.data));
// 			getSerialNumber(data.data[0].area_code);
// 			getCountry(data.data[0].code, "乡");
// 			form.render("select");
// 		}
// 	})
// }

// function getCountry(code, id) { //获取省
// 	postData("wwGetDataList", {
// 		TblNum: 389,
// 		T3895: "EQ" + code,
// 		orderby: "id "
// 	}, function(data) {
// 		if(data.success) {
// 			$("#" + id).empty();
// 			$("#" + id).append(getSelectHtml(data.data));
// 			getVillage(data.data[0].code, "村");
// 			form.render("select");
// 		}
// 	})
// }

// function getVillage(code, id) {
// 	postData("wwGetDataList", {
// 		TblNum: 389,
// 		T3895: "EQ" + code,
// 		orderby: "id "
// 	}, function(data) {
// 		if(data.success) {
// 			$("#" + id).empty();
// 			$("#" + id).append(getSelectHtml(data.data));
// 			form.render("select");
// 		}
// 	})
// }

// function getSelectHtml(data) {
// 	var html = ""
// 	for(var i = 0; i < data.length; i++) {
// 		html += `<option value="${data[i].address}" dataId="${data[i].code}" area_code="${data[i].area_code}">${data[i].address}</option>`
// 	}
// 	return html
// }

// function getSerialNumber(code) {
// 	$("#firstareaCode").val(code);
// 	postData("GetAreaCustomCode", {
// 		area_code: code
// 	}, function(data) {
// 		$("#新编号").val(data.data);
// 		$("#areaCode").val(data.data);

// 	})
// }

// function echoPositionAvailable() { //回显
// 	postData("GetAutoSelectAddress", {
// 		storage: getCookieName("mCurrentStorage")
// 	}, function(data) {
// 		$("#柜架号").val(data['gj'])
// 		$("#层号").val(data['ceng'])
// 		$("#分区号").val(data['fq'])
// 		form.render("select")
// 	})
// }