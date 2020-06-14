var relicObj = {
    '库内': '<option  value="库内">库内</option>',
    '库外': '<option  value="库外">库外</option>',
    '库内外': '<option  >库外</option>' + '<option  >库内</option>'
},

    type = window.location.href.getQuery("type"),  //ww,tp
    editId = window.location.href.getQuery("knbh"),
    tp_bh = unescape(window.location.href.getQuery("bh")),
    // id = window.location.href.getQuery("id"),
    form, upload, element, layer, laydate;
var UploadTable, UploadTableData = [];

layui.use(['element', 'table', 'layer', 'upload', 'form', 'upload', "laydate"], function () {
    form = layui.form,
        upload = layui.upload,
        UploadTable = layui.table,
        element = layui.element,
        layer = layui.layer;
        laydate = layui.laydate;
    //赋值到录入人栏
    $("#录入人").html(SysConfig.UserInfo.GetUserName());
    $("#移交人").val(SysConfig.UserInfo.GetUserName());
    $("#监督人").val(SysConfig.UserInfo.GetUserName());
    $("#接收人").val(SysConfig.UserInfo.GetUserName());
    $("#wwknbh").html(editId)
    $("#currentStore").html(SysConfig.UserInfo.GetCookieName("mCurrentStorage"));
    laydate.render({
        elem: '#预计归库时间' //指定元素
    });
    $("#预计归库时间").val(SysConfig.ToolBox.CurrentDate())
    setInterval(function () {
        $('#操作时间').html(SysConfig.ToolBox.CurrentDate() + " " + SysConfig.ToolBox.CurrentTime())
        $("#出库时间").val(SysConfig.ToolBox.CurrentDate() + " " + SysConfig.ToolBox.CurrentTime())
    }, 1000);
    //默认时间

    //上传图片
    //uploadImg = new UploadFile("filename", "filepath", "/api/kf/data");
    //uploadImg.fileupload(changefileFJ, "#showfileFJ")

    // 出库事由下拉
    var reData_fq = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462861141",
        XDLMA: "出库",
    });
    if (reData_fq.success) {
        $('#记录类型').empty();
        for (var i = 0; i < reData_fq.rows.length; i++) {
            $('#记录类型').append('<option value="' + reData_fq.rows[i].记录类型 + '" attrdata="' + reData_fq.rows[i].出库范围 + '">' + reData_fq.rows[i].记录类型 + '</option>');
        }
        $("#记录类型").val("移库");
    }

    // 获取库房列表
    var reData_ckqx = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231246284628130151",
        XDLMA: SysConfig.UserInfo.GetCookieName("kflx"),
    });
    if (reData_ckqx.success) {
        $('#目标库房').empty();
        for (var i = 0; i < reData_ckqx.rows.length; i++) {
            $('#目标库房').append('<option value="' + reData_ckqx.rows[i].库房名 + '">' + reData_ckqx.rows[i].库房名 + '</option>');
        }
    }
    $("#出库去向").append('<option value="库内">库内</option>');
    $("#出库去向").val("库内");
    $("#tjsq").html("出库")
    $("#库房显示").removeClass("layui-hide")
    $("#描述显示").addClass("layui-hide")
    $("#库外描述").removeAttr("lay-verify")


    //数据回显
    if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") { //文物
        $("#wwBasicContent").removeClass("layui-hide");
        $("#tpBasicContent").addClass("layui-hide");
        $("#listType").html("文物");
    } else { //拓片
        $("#tpBasicContent").removeClass("layui-hide");
        $("#wwBasicContent").addClass("layui-hide");
        $("#tpContent").attr("src", "carrierDetail.html?type=inner&knbh=" + editId);
        $("#wwknbh").html(editId);
        $("#listType").html("拓片");

    }
    echoData();
    SetAddUpload();
    form.render()

    //点击出库事由出现出库去向判断
    form.on("select(记录类型)", function (data) {
        $("#出库去向").empty()
        var type = $(data.elem[data.elem.selectedIndex]).attr("attrdata")
        var options = relicObj[type]
        $("#出库去向").append(options)

        if ($("#出库去向").val() == "库内") {
            $("#tjsq").html("出库")
            $("#库房显示").removeClass("layui-hide")
            $("#描述显示").addClass("layui-hide")
            $("#库外描述").removeAttr("lay-verify")
        } else if ($("#出库去向").val() == "库外") {
            $("#tjsq").html("提交申请")
            $("#库房显示").addClass("layui-hide")
            $("#描述显示").removeClass("layui-hide")
        }
        form.render('select');
    });
    //点击出库事由出现出库去向判断
    form.on("select(出库去向)", function (data) {
        if (data.value == "库内") {
            $("#库房显示").removeClass("layui-hide")
            $("#描述显示").addClass("layui-hide")
            $("#库外描述").removeAttr("lay-verify")
        } else if (data.value == "库外") {
            $("#库房显示").addClass("layui-hide")
            $("#描述显示").removeClass("layui-hide")
            $("#目标库房").removeAttr("lay-verify")
        }
    });

    //点击提交
    //form.on("submit(tjsq)", function (data) {


    //    //data.field.XDLM表对应码 = "1";
    //    data.field.XDLM库房名 = getCookieName("mCurrentStorage");
    //    if ($("#sss").hasClass("layui-hide")) {
    //        data.field.XDLM操作类型 = "出库";
    //        data.field.XDLM出库去向 = $("#ckqx").val() + "_" + $("#ckqx2").val()
    //    } else {
    //        data.field.XDLM操作类型 = "待出库";
    //        data.field.XDLM出库去向 = $("#ckqx").val() + "_" + $("#ckqx1").val()
    //    }
    //    var status_ = data.field.XDLM记录类型;
    //    if (status_ == "移库" || status_ == "移交" || status_ == "文物出展") {
    //        data.field.XDLM库存状态 = "待出库"
    //    } else {
    //        data.field.XDLM库存状态 = status_
    //    }
    //    if (type == "ww") { //文物
    //        data.field.XDLM登记号 = $("#XDLM现藏品总登记号").html();
    //    } else {
    //        data.field.XDLM登记号 = editId;
    //    }
    //    data.field.WWDJBID = editId

    //    data.field.XDLM录入人 = getCookieName("mUserName");
    //    data.field.XDLM图片地址 = uploadImg.addFileData("showfileFJ") + "|";
    //    //			data.field.XDLM操作时间=$("#XDLM操作时间").html()

    //    submitDataVertifyModule("确定要出库吗？", function () {
    //        postData("WenWuChuKu", data.field, function (data) {
    //            if (data.success) {

    //                tipMsg(data, function () {
    //                    if ($("#tjsq").html() == "出库") {
    //                        var layer002 = layer.confirm("是否打印出库单?", {
    //                            btn: ['是', '否'] //按钮
    //                        },
    //                            function () //确定
    //                            {
    //                                layer.close(layer002);
    //                                if (type == "ww") {
    //                                    layerPage01 = openWindow(2, '../../crkgl/ckHtml.html?knbh=' + $("#wwknbh").html() + '&TblNum=' + TblNum + '&type=ck&print=print&go=2&jlls=' + escape(data.log_codes), "详细信息", $(window).width(), $(window).height());

    //                                } else if (type == "tp") {
    //                                    layerPage01 = openWindow(2, '../../crkgl/carrier_lsjl.html?TblNum=386&knbh=' + $("#wwknbh").html() + '&TblNum=' + TblNum + '&type=ck&print=print&go=2&jlls=' + escape(data.log_codes), "详细信息", $(window).width(), $(window).height());


    //                                }


    //                            },
    //                            function () {
    //                                QXALL()
    //                            }
    //                        );
    //                    } else {
    //                        QXALL()
    //                    }
    //                })

    //            }
    //        })
    //    })

    //    return false
    //});

    $('#tjsq').click(function () {

        var checkStatus = UploadTable.cache.mDataTable;

        var imageList = "";
        for (var i = 0; i < checkStatus.length; i++) {
            imageList += checkStatus[i].图片地址 + "|";
        }
        imageList = imageList.substring(0, imageList.length - 1);

        let djh;
        if(type == 'tp'){
            djh = tp_bh;
        }else{
            djh = $("#XDLM现藏品总登记号").html();
        }

        let dataList = {
            XDLMCID: "9000",
            XDLMTID: "9204",
            XDLMSID: "9204001",
            XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),
            WWDJBID: editId,
            XDLM登记号: djh,
            XDLM录入人: SysConfig.UserInfo.GetUserName(),
            XDLM移交人: $("#移交人").val(),
            XDLM监督人: $("#监督人").val(),
            XDLM接收人: $("#接收人").val(),
            XDLM批次编号: "",
            XDLM图片地址: imageList,
            XDLM出库时间: $("#出库时间").val(),
            XDLM预计归库时间: $("#预计归库时间").val(),
            XDLM记录类型: $("#记录类型").val(),
            XDLM记录内容: $("#记录内容").val(),

        };
        if ($("#描述显示").hasClass("layui-hide")) {
            dataList.XDLM操作类型 = "出库";
            dataList.XDLM出库去向 = $("#出库去向").val() + "_" + $("#目标库房").val()
        } else {
            dataList.XDLM操作类型 = "待出库";
            dataList.XDLM出库去向 = $("#出库去向").val() + "_" + $("#库外描述").val()
        }
        var status_ = $("#记录类型").val();
        if (status_ == "移库" || status_ == "移交" || status_ == "文物出展") {
            dataList.XDLM库存状态 = "待出库"
        } else {
            dataList.XDLM库存状态 = status_
        }

        var rk = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", dataList);

        if (rk.success) {
            if (status_ == "移库") {
                layer.msg("移库完成！", {
                    time: 1000,
                    end: function () {
                        parent.ChukuCallback(editId, rk.log_codes);
                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        parent.layer.close(index); //再执行关闭   
                    }
                });
               
            }
            else {
                layer.msg("出库完成！请等待审核！", {
                    time: 1000,
                    end: function () {
                        parent.Callback();
                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        parent.layer.close(index); //再执行关闭   
                    }
                });
            }
 
        }
        else {
            layer.msg("出库失败！" + rk)
        }
 
    });

})


function echoData() { //回显数据
    if (editId) {
        $("#ck").html("出库");
        let where;
        if(type == "ww"){
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823124628462889251",
                XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                XDLMU: editId
            }
        }else{
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH201908231246284628202221",
                XDLMB: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                XDLMU: editId
            }
        }
        //请求数据
        let wwxx = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", where);

        for (var k in wwxx.rows[0]) {
            if ($("#XDLM" + k).prop("tagName")) {
                if ($("#XDLM" + k).prop("tagName") == "INPUT") {
                    $("#XDLM" + k).val(wwxx.rows[0][k])
                } else {
                    $("#XDLM" + k).html(wwxx.rows[0][k])
                }
            }
            if (wwxx.rows[0]['经度'] == "0" || wwxx.rows[0]['纬度'] != "0" || wwxx.rows[0]['高度'] != "0") {
                $(".gps-display").html("")
            }
           
        }
        $("#jllsh").html(wwxx.rows[0]['记录表流水号'])

        

         // 存放位置示意图：
         setTimeout(function(){
            SysConfig.SubSystemData.SYKFGL.PostDataAsync("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204005",
                mCurrentStorage: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
            },function(rerurnData_weizhi){
                if (rerurnData_weizhi.success) {
                    if(kfSort() == "正序"){
                        for (var i = 0; i < rerurnData_weizhi.data.length; i++) {
                            rerurnData_weizhi.data[i]['分层集合'];
                            rerurnData_weizhi.data[i].currentgj = wwxx.rows[0]['柜架号']
                            rerurnData_weizhi.data[i].currentch = wwxx.rows[0]['层号']
                            rerurnData_weizhi.data[i].currentfq = wwxx.rows[0]['分区号']
                            if (rerurnData_weizhi.data[i]['柜架号'] == wwxx.rows[0]['柜架号']) {
                                showTpl(rerurnData_weizhi.data[i])
                            }
        
                        }
                    }else{
                        for (var i = 0; i < rerurnData_weizhi.data.length; i++) {
                            rerurnData_weizhi.data[i]['分层集合'].reverse();
                            rerurnData_weizhi.data[i].currentgj = wwxx.rows[0]['柜架号']
                            rerurnData_weizhi.data[i].currentch = wwxx.rows[0]['层号']
                            rerurnData_weizhi.data[i].currentfq = wwxx.rows[0]['分区号']
                            if (rerurnData_weizhi.data[i]['柜架号'] == wwxx.rows[0]['柜架号']) {
                                showTpl(rerurnData_weizhi.data[i])
                            }
                        }
                    }
                }
    
            });
         },100)

         // 图片信息
        var wwImage = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823124628462851271",
            XDLMC: editId,

        });
        if (wwImage.success) {
            if (wwImage.rows.length > 0) {
                for (var i = 0; i < wwImage.rows.length; i++) {
                    showPicture(wwImage.rows[i]['图片地址'], "picBody") //获取图片
                }
            }
        }
        
    }
}

// function currentTime() {
//     var d = new Date(),
//         str = '';
//     str += d.getFullYear() + '-';
//     str += d.getMonth() + 1 + '-';
//     str += d.getDate() + '  ';
//     str += d.getHours() + ':';
//     str += d.getMinutes() + ':';
//     str += d.getSeconds() + '';
//     return str;
// }

function SetAddUpload() {
    //第一步 初始化上传控件，按各个系统
    SysConfig.SubSystemData.SYKFGL.UploadFile('#changefileFJ', upload, element, chooseCallback, doneCallback, allDoneCallback, errCallback);
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
        //, { field: '入库状态', title: '状态', hide: true } //必须 非数据库字段，用于区分数据库数据还是新增数据
        //, { field: '文件地址', title: '状态', hide: true } //必须 可以根据不同表更改字段名，对应下方的json 也要改
        , {
            field: '',
            title: '操作',
            width: "24%",
            align: 'center',
            templet: function (d) {
                let tt = "";
                tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=show("' + d.图片地址 + '") lay-event="edit">查看</a>';
                tt += ' <a class="layui-btn layui-btn-danger layui-btn-xs" onclick=del("' + d.图片编号 + '","' + d.文物入库编号 + '","' + d.文图名称 + '","' + d.图片地址 + '","' + d.分类 + '","' + d.图片类型 + '") lay-event="del">删除</a>';
                return tt;
            }

        },
    ]]


    //UploadTable = SysConfig.SubSystemData.SYKFGL.SetDataTable(UploadTable, '文物列表', cols, where, 10);

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
function del(rowid, knbh, imageName, ImagePath, imageClass, imageType) {

    //  SysConfig.SubSystemData.SYKFGL.PLSC([{ id: rowid }], '4000', 'DYBH201908231246284628185274', UploadTableCallback);
    layer.confirm('确定要删除吗？', {
        btn: ['确定', '再想想'] //按钮
    }, function () {
        for (var i in UploadTableData) {
            if (UploadTableData[i].图片编号 == rowid) {
                UploadTableData.splice(i, 1);
                UploadTableCallback();
                layer.msg("已删除！");
            }
        }
    }, function (index) {
        layer.close(index);
    });
}

//查看
function show(path) {
    //使用上传表格方式时需配置
    //for (var i in UploadTableData) {
    //    if (UploadTableData[i].图片编号 == rowid) {
    SysConfig.ToolBox.ShowVideo('查看文件', path, $(window).width() - 20, $(window).height() - 20);
    //        break;
    //    }
    //}
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



    //【重要】使用table显示调用这个
    //for (var i in UploadTableData) {
    //    if (UploadTableData[i].文件名 == res.filename) {
    //        //UploadTableData[i].状态 = "已上传";
    //        //UploadTableData[i].入库状态 = "未入库";
    //        //UploadTableData[i].文件地址 = res.filepath;大小: (file.size / 1024 / 1024).toFixed(1) + 'MB',

    //    }
    //}

    if (res.success) {
        var imgbh = "TP" + SysConfig.ToolBox.getTimeAndRandom();
        UploadTableData.push({ 图片编号: imgbh, 文图名称: res.filename, 图片地址: res.filepath, 状态: "未入库" });

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
        //page: {
        //    curr: 1 //重新从第 1 页开始
        //}
    });
}

function Callback() {
    parent.Callback();
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭   

}


// 获取柜架排序为正序还是倒序
function kfSort(){
    let kfSort = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462812741",
        XDLMA: "库房柜架排序"
    });
    if(kfSort.success){
        return kfSort.rows[0].sysvalue
    }
}


function showTpl(data) {
    layui.use("laytpl", function () {
        var laytpl = layui.laytpl;
        var getTpl = tpldemo.innerHTML

        laytpl(getTpl).render(data, function (html) {
            $("#scanPosition").append(html)
        });
    })
}

function setKrColor(d, gj, ch, fq) {
    var color_ = false
    if (d.currentgj == gj && d.currentch == ch && d.currentfq == fq) {

        color_ = true
    }
    return color_
}


function showPicture(picUrl, id, width, height) { //查看详情显示图片

    var width_ = width ? width : 96;
    var height_ = height ? height : 96;
    if (picUrl) {
        var html = "";

        var imgArry = picUrl ? picUrl.split("|") : [];

        if (imgArry.length > 0) {
            for (var i = 0; i < imgArry.length; i++) {
                if (imgArry[i]) {
                    html += `<div class="imgDiv" style="cursor: pointer;float:left;width:128px;height:128px;margin-right:0.5%;">
												<div class="layadmin-homepage-pad-ver"  onclick="lookPic('${imgArry[i].split(',')[0]}')">
													<img data-title="查看详情" style="max-width:${width_}px;max-height:${height_}px;" class="layadmin-homepage-pad-img" src="${imgArry[i].split(',')[0].replace('ss.', '.')}">
												</div>
											</div>`
                }

            }
        }

        $("#" + id).append(html)
    }
}

function lookPic(path){
    SysConfig.ToolBox.ShowVideo("查看", path, $(window).width() - 100, $(window).height() - 100);
}

