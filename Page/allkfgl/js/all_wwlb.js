

/*
 * @陕西唐远
 * @文件名: 
 * @作者: 张黎博
 * @Git: zlb
 * @Date: 2019-12-09 10:20:06
 * @描述: 
 * @版本: 1.00
 * @修改历史纪录: （版本 修改时间 修改人 修改内容）
 * @记录:   1 2019-12-09 zlb 更换列表、查询接口
 */
var tableins = "", laytpl, fztype, where, qx, $;

layui.use(['element', 'table', 'layer', 'laytpl', 'form'], function () {
    tableins = layui.table;
    element = layui.element,
        layer = layui.layer;
    form = layui.form;
    laytpl = layui.laytpl;
    $ = layui.jquery


    where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462889251",
    };

    //获取权限
    qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("全库文物列表");
    //编辑权限
  

    if (window.location.href.getQuery("knbh") != null) {
        where.XDLMU = window.location.href.getQuery("knbh")
    }

    fztype = unescape(window.location.href.getQuery("fztype"))
    if (fztype !== "null") {
        $("#tableHeader").addClass("layui-hide")
        where.XDLMP = fztype
    } else {
        $("#tableHeader").removeClass("layui-hide")
    }

    //
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
            field: 'zt',
            title: '记录图',
            width: '7%',
            align: 'center',
            templet: function (d) {
                return ' <div class="list-img-mudule" style=""  onclick=imgclick("' + d.文物库内编号 + '")><img style = "max-width: 60px;max-height:60px;cursor: pointer;" src = "' + d.图片地址.replace("_sss.", "_s.") + '" alt = "" lay - event="scanPic" /></div>';
               
            }
        }, {
            field: '登记名称',
            title: '名称',
            width: '8.5%',
            align: 'center',
            templet: function (d) {
                return '<a href="javascript:;"  style="color:blue;"  onclick=kfshManage.ShowXQ("' + d.id + '","' + d.文物库内编号 + '")>' + SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.登记名称)+'</a>'; 
            }
        },
        {
            field: '现藏品总登记号',
            title: '原登记号',
            width: '12%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.现藏品总登记号);
            }
        }, {
            field: '文物库内编号',
            title: '现登记号',
            width: '7%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.文物库内编号);
            }
        },

        {
            field: '文物类别_具体类别',
            title: '文物类别',
            width: '5%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.文物类别_具体类别);
            }
        },
        {
            field: '外形尺寸',
            title: '外形尺寸',
            width: '5%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.外形尺寸);
            }
        },
        {
            field: '完残程度',
            title: '完残程度',
            width: '5%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.完残程度);
            }
        },
        {
            field: '数量',
            title: '数量',
            width: '5%',
            align: 'center',
            templet: function (d) {
                return d.数量 + d.数量单位;
            }
        },

        {
            field: '考古发掘信息_领队',
            title: '领队',
            width: '5%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.考古发掘信息_领队);
            }

        },
        {
            field: '考古发掘信息_出土地点',
            title: '出土地点',
            width: '10%',
            align: 'center',
            templet: function (d) {
                return SysConfig.ToolBox.QueryKeyColor($("#queryK").val(), d.考古发掘信息_出土地点);
            }

        },
        {
            field: '',
            title: '位置',
            width: '8%',
            align: 'center',
            templet: function (d) {
                return '<p>' + d.柜架号 + d.层号 + d.分区号 + '</p><p style="color:red;">' + d.保管信息_保存位置及编号 + '</p>';
            }
        },
        {
            field: '库存状态',
            title: '库存状态',
            width: '5%',
            align: 'center',
            //templet: '#colorKCZT'
            templet: function (d) {
                let str = "";
                let colorValue;
                switch (d.库存状态) {
                    //case "同意出库": "orange"break;
                    //"拒绝出库": "red",
                    //"拒绝入库": "green",
                    case "在库":
                        colorValue = "green";
                        break;
                    case "待入库": colorValue = "#34A7D8";
                        break;
                    case "待出库": colorValue = "red";
                        break;
                    case "入库": colorValue = "green";
                        break;
                    case "新入库": colorValue = "red";
                        break;
                    case "归还入库": colorValue = "green";
                        break;
                    case "修改中": colorValue = "red";
                        break;
                }
              
                return '<span id="" style="color:' + colorValue + '">' + d.库存状态 + '</span>';

            }

        }, {
            field: '',
            title: '操作',
            width: '13.2%',
            align: 'center',
            templet: function (d) {
                let tt = '  <a class="layui-btn layui-btn-xs layui-btn-warm"  onclick=Edit("标签","' + d.文物库内编号 + '")>标签</a>';
                return tt;
            }
        }

        ]
    ];
    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 7);



    //获取文物组下拉选项
    var reData_wwfz = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231246284628239261",
    });

    if (reData_wwfz.success) {
        //getSelect("groupkeyWords", data.data, "groupName");
        $('#groupkeyWords').empty();
        for (var i = 0; i < reData_wwfz.rows.length; i++) {
            $('#groupkeyWords').append('<option value="' + reData_wwfz.rows[i].groupName + '">' + reData_wwfz.rows[i].groupName + '</option>');
        }

    }


    var reData_kfgj = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231246284628123181",
    
    });

    if (reData_kfgj.success) {
        //getSelect("groupkeyWords", data.data, "groupName");
        $('#XDLM柜架号').empty();
        for (var i = 0; i < reData_kfgj.rows.length; i++) {
            $('#XDLM柜架号').append('<option value="' + reData_kfgj.rows[i].柜架号 + '">' + reData_kfgj.rows[i].柜架号 + '</option>');
        }
        getCengHao(reData_kfgj.rows[0]['柜架号']);
    }


    form.on("select(XDLM柜架号)", function (data) {
        getCengHao(data.value)
        form.render("select")
    })
    form.on("select(XDLM层号)", function (data) {
        getFenQu($("#XDLM柜架号").val(), data.value)
        form.render("select")
    })

    form.on('select(zkzt)', function (data) { //切换在库状态
        if (data.value == "所有") {
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823124628462889251",
           
            };
        } else {
            where = {
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823124628462889251",
               
                XDLMB: data.value,

            };
        }
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 7);
    })

    form.on("select(cxlb)", function (data) {
        changeSearchType(data.value)

    })


    $('#searchData').click(function () {

        switch ($("#cxlb").val()) {
            case "模糊查询":
                where = {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH20190823124628462889251",
             
                    QueryType: '模糊查询',
                    QueryKey: $('#queryK').val()
                };
                break;
            case "XDLMP":
                where = {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH20190823124628462889251",
                 
                    XDLMP: $("#groupkeyWords").val()
                };
                break;
            case "warehouse":
                where = {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH20190823124628462889251",
                 
                    XDLMR: $("#XDLM柜架号").val(),
                    XDLMS: $("#XDLM层号").val(),
                    XDLMT: $("#XDLM分区号").val()
                };
                break;
            default:
                where = {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH20190823124628462889251",
                 

                };
                where[$("#cxlb").val()] = $('#queryK').val()
                break;

        }
        if ($("#zkzt").val() != "所有") {
            where.XDLMB = $("#zkzt").val();
        }

        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '全库文物列表', cols, where, 7);

    });
    $("#searchDataAll").click(function () {
        layerPage01 = SysConfig.ToolBox.openWindowByDIV($("#multipleSearchData"), "多条件查询,带有*的可模糊检索", 850, 700)
        getSearchTpl()
    })

    //查询
    $("#searchdata2").click(function () {
        where = {
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823124628462889251",
         
        };
        $(".searchText").each(function (key, val) {
            if ($(val).val().trim() != "") {
                where[$(val).attr("name")] = $(val).val();
            }
        })
        if ($("#zkzt").val() != "所有") {
            where.XDLMB = $("#zkzt").val();
        }
        ;
        tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 7);
        layer.close(layerPage01)
        return false
    })

    form.render();
});



//点击查看图片
function imgclick(ddata) {
    console.log(ddata)
    let returndata = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462851271",
        // XDLMA: "305",
        XDLMC: ddata
    });
    if (returndata.success) {
        if (returndata.rows && returndata.rows.length > 0) {
            let imghost = ""
            for (let i = 0; i < returndata.rows.length; i++) {
                imghost += returndata.rows[i].图片地址 + ","
            }

            lookPic(imghost.substring(0, imghost.lastIndexOf(",")))
        }
    }

}



//点击图片看所有图



function Edit(eventName, mKNBH) {
    switch (eventName) {
        case "scanPic":
            let returndata = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823124628462851271",
                // XDLMA: "305",
                XDLMC: mKNBH
            });
            if (returndata.success) {
                if (returndata.rows && returndata.rows.length > 0) {
                    let imghost = ""
                    for (let i = 0; i < returndata.rows.length; i++) {
                        imghost += returndata.rows[i].图片地址 + ","
                    }
                    lookPic(imghost.substring(0, imghost.lastIndexOf(",")))
                }
            } else {
                lookPic(data['图片地址'])
            }
            break;
        case "详情":
            SysConfig.ToolBox.openWindow('wwjcxx.html?knbh=' + mKNBH, "详细信息", $(window).width(), $(window).height());
            break;
     
        case "标签":
            SysConfig.ToolBox.openWindow('/SYKFGL/Page/knww/page/printQRCode.html?knbh=' + mKNBH + '&type=2', "标签打印", 480, 300);
            break;
      

    }
}


function getSearchTpl(data) {
    $("#multipleSearchDataContent").empty()
    var getTpl = searchTpl.innerHTML;
    $("#multipleSearchDataContent").append(getTpl)
    // laytpl(getTpl).render(data, function(html) {
    //     $("#multipleSearchDataContent").append(html)
    // });
}

function getTable_x(id, where, type, action, height, xklx) {
    var height_ = $(document).height() - 145;
    // var xklx_ = "sykf=KF_SC";
    // if (height == "") {
    //     height_ = ""
    // }
    // if (xklx) {
    //     xklx_ = xklx
    // }

    layui.use(["table"], function () {
        var table = layui.table;
        // var cols = kfJson.colsName["T" + where.TblNum];

        var xAction = "wwGetDataList";

        // if (type) {
        //     cols = kfJson.colsName["T" + where.TblNum][type]
        // }
        // if (action) {
        //     xAction = action;
        //     if (kfJson.colsName[action] instanceof Function) {
        //         cols = kfJson.colsName[action]()
        //     } else {
        //         cols = kfJson.colsName[action];
        //     }
        // }

        tableins = table.render({
            elem: '#' + id,
            // url: ip_url + "?" + xklx_ + "&XAction=" + xAction,
            url: "/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYKFGL",
            where: where,
            method: 'post',
            cols: cols,
            skin: 'row', //表格风格
            even: true,
            size: 'sm',
            toolbar: false, //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
            //			width: $(window).width() - 40,
            headers: {
                Authorization: getAuth()
            },
            height: height_,
            request: {
                pageName: 'page' //页码的参数名称，默认：page
                ,
                limitName: 'rows' //每页数据量的参数名，默认：limit
            },
            response: {
                //				statusName: 'success', //规定数据状态的字段名称，默认：code					
                //				statusCode: true, //规定成功的状态码，默认：0					
                //				msgName: 'success', //规定状态信息的字段名称，默认：msg					
                countName: 'total', //规定数据总数的字段名称，默认：count					
                dataName: 'rows' //规定数据列表的字段名称，默认：data
            },
            loading: true,
            cellMinWidth: 30,
            //				height: 'full-70',
            page: true, //是否显示分页
            limits: [limit, 50, 100, 200, 500, 1000],
            limit: limit, //每页默认显示的数量
            id: "tableLayui",
            done: function (res, curr, count) {
                if (res.message == "NOTLOGIN") {
                    var isQcode = window.location.href.getQuery("ewm"); //是否手机打开的
                    if (isQcode) {
                        window.location.href = window.location.origin + "/SYKFGL/login-app.html?nextUrl=" + escape(window.location.href);
                    } else {
                        parent.location.href = "/SYKFGL/login.html"
                    }

                }
                if (res.success == true & res.data == "") {
                    layer.msg("文物信息未在当前库房");
                }

            },
            error: function () {

            }
        });

    })

}

function changeWhere() {
    where.QueryType = $("#cxlb").val();
    $(".search-type").each(function (key, val) {

        if ($(val).hasClass("layui-hide")) {

        } else {

            if ($(val).attr("id") == "warehouseDiv") {
                where.QueryKey = "";
                where.mCNTRNo = $("#XDLM柜架号").val();
                where.mLevelNo = $("#XDLM层号").val();
                where.mAreaNo = $("#XDLM分区号").val();

            } else {

                where.QueryKey = $(val).find(".key-words").val();
                where.mCNTRNo = "";
                where.mLevelNo = "";
                where.mAreaNo = "";
            }

        }
    })
}

function changeSearchType(value) {
    $(".search-type").addClass("layui-hide")

    if (value == "XDLMP") { //分组
        $("#XDLMPDiv").removeClass("layui-hide");
        $("#queryK").val("")
    } else if (value == "warehouse") { //存放位置
        $("#warehouseDiv").removeClass("layui-hide");
        $("#queryK").val("")
    } else { //正常
        $("#keyworDiv").removeClass("layui-hide");
    }
}

function getFenQu(datagj, ceng) {

    var reData_fq = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231246284628236171",
  
        XDLMB: datagj,
        XDLMC: ceng,
    });
    if (reData_fq.success) {
        $('#XDLM分区号').empty();
        for (var i = 0; i < reData_fq.rows.length; i++) {
            $('#XDLM分区号').append('<option value="' + reData_fq.rows[i].分区号 + '">' + reData_fq.rows[i].分区号 + '</option>');
        }
        form.render("select")
    }
}

function getCengHao(datagj) { //获取柜架号
    var reData_ceng = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462826161",
      
        XDLMB: datagj,
    });
    if (reData_ceng.success) {
        $('#XDLM层号').empty();
        for (var i = 0; i < reData_ceng.rows.length; i++) {
            $('#XDLM层号').append('<option value="' + reData_ceng.rows[i].层号 + '">' + reData_ceng.rows[i].层号 + '</option>');
        }
        getFenQu(datagj, reData_ceng.rows[0].层号);

    }
}

function checkDetail(data) {
    if (data['表对应码'] == '386') {
        layerPage02 = SysConfig.ToolBox.openWindow('carrierDetail.html?knbh=' + data['文物库内编号'], "详细信息", $(window).width(), $(window).height())
    } else {
        layerPage01 = SysConfig.ToolBox.openWindow('wwjcxx.html?knbh=' + data['文物库内编号'], "详细信息", $(window).width(), $(window).height());
    }

}

function Callback() {

    tableins.reload('mDataTable', {
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



// 查看图片
function lookPic(doc, index, num) {
    // console.log(doc)
    var num_
    num ? num_ = num : num = "03"
    if (index) { //新添加的图片的查看，在函数中直接点击会陷入死循环
        if (index == "批次导入") {
            ShowVideo(false, doc, '90%', '90%', 1, "03");
        } else if (index == "系统上传") {
            ShowVideo(false, doc, '90%', '90%', 1, "01");
        } else {
            doc = fileend[index]
            ShowVideo(false, doc, '90%', '90%', 1, "01");
        }
    } else {
        ShowVideo(false, doc, '90%', '90%', 1, "01");
    }

}

function ShowVideo(mtitle, mpath, w, h, clobtn, system) {
    if (mpath == '') {
        layer.msg('未找到文件');
    } else {

        var yl = false;
        var index = mpath.lastIndexOf("\.");
        var r = mpath.substring(index + 1, mpath.length);
        var url = "/SYKFGL/widget/video/ShowVideo.html?path=" + mpath;
        switch (r.toLowerCase()) {
            case "doc":
            case "docx":
                // case "txt":
            case "zip":
            case "rar":
            case "xls":
            case "xlsx":

                let mpaths = mpath.substring(0, mpath.lastIndexOf(".") + 1)
                console.log(mpaths)
                url = '/SYKFGL/widget/pdfViewer/pdfView.html?path=' + mpaths + 'pdf';
                // yl = true;
                break;
            case "pdf":
                url = '/SYKFGL/widget/pdfViewer/pdfView.html?path=' + mpath;
                yl = true;
                break;
            case "png":
            case "jpg":
            case "bmp":
            case "gif":
            case "jpeg":
            case "tiff":
            case "psd":
            case "svg":
                if (getScanPictureType(system, mpath)) {
                    url = getScanPictureType(system, mpath)
                    yl = true;
                } else {
                    yl = false;
                }

                break;
            case "3gp":
            case "asf":
            case "avi":
            case "flv":
            case "mkv":
            case "mov":
            case "mp4":
            case "mpeg":
            case "n avi":
            case "rmvb":
            case "wmv":
            case "swf":
            case "mp5":
                url = "/SYKFGL/widget/video/ShowVideo.html?path=" + mpath;
                yl = true;
                break;
            default:
                yl = false;

        }
        if (yl) {
            if (clobtn) {
                clobtn = 1;
            } else {
                clobtn = clobtn;
            }
            var index = layer.open({
                type: 2,
                //      maxmin: true,
                content: url,
                area: [w, h],
                title: "附件",
                closeBtn: clobtn,
                shadeClose: true
            });
        } else {
            layer.msg('当前格式暂不支持预览', {
                icon: 2,
                time: 2000,
                anim: 5
            });
        }

    }

}

//判断是哪一种查看图片的方式
function getScanPictureType(pictureType, path) {
    //	pictureType  01最基本的查看图片的形式
    //	pictureType  02最基本的查看切片的形式
    //	pictureType  03可以在切片上画图的形式
    var url = "";
    var imgPath = path.split(",")[0]
        //1)系统批量上传，切片大小自己获取

    if (pictureType == "03") {
        $.ajax({
            type: "GET",
            url: imgPath.split(".")[0] + "/ImageProperties.xml",
            async: false,
            success: function(dataxml) {
                var width_ = Number($(dataxml).find("IMAGE_PROPERTIES").attr("WIDTH"));
                var heigh_ = Number($(dataxml).find("IMAGE_PROPERTIES").attr("HEIGHT"));
                url = "/SYKFGL/Widget/measurablePicture/openTitleImage.html?h=" + heigh_ + "&w=" + width_ + "&path=" + imgPath
            },
            error: function() {

                url = '/SYKFGL/Widget/imgTools/ShowImage.html?path=' + imgPath;
                //				url = "/SYKFGL/Widget/measurablePicture/openTitleImage.html?h=" + "10000" + "&w=" + "1000" + "&path=" + "TP0000002/TP0000002/"
            }
        });

    } else if (pictureType == "02") {
        url = '/SYKFGL/widget/pictureDetail/showPicture.html?path=' + imgPath;

    } else if (pictureType == "01") {
        url = '/SYKFGL/Widget/imgTools/ShowImage.html?path=' + path;
    } else {
        url = '/SYKFGL/Widget/imgTools/ShowImage.html?path=' + imgPath;
    }
    return url;
}

// /*
//  * @陕西唐远
//  * @文件名: 
//  * @作者: 张黎博
//  * @Git: zlb
//  * @Date: 2019-12-06 17:56:10
//  * @描述: 
//  * @版本: 1.00
//  * @修改历史纪录: （版本 修改时间 修改人 修改内容）
//  * @记录:  1 2019-12-06 zlb 更换列表、查询接口
//  */
// var tableins = "",
//     laytpl;
// var limit = 7,
//     where = {
 
//         XDLMCID: "1001",
//         XDLMSID: "DYBH20190823124628462889251"
//     },
//     form;

// $(function() {
//     layui.use(['element', 'table', 'layer', 'laytpl', 'form'], function() {
//         var table = layui.table;
//         element = layui.element,
//             layer = layui.layer;
//         laytpl = layui.laytpl;
//         form = layui.form;
//         // getTable("wwzllb", where, 'wwzllb') //调用函数显示表格

//         getTablee("wwzllb", where)

//         if (!limitConfig("applyLimt", 4)) {
//             $("#outfile").addClass("layui-hide")
//         }
//         // postData("wwGetDataList", {
//         //     TblNum: 77,
//         //     T777: "EQ" + 305,
//         //     orderby: "id"
//         // }, function(data) {
//         //     getSearchTpl(data.data)
//         //         getSelect("cxlb", data.data, "display", "", "chsx")
//         // })


//         //获取文物组下拉选项
//         postData("wwGetDataList", {
//             TblNum: 384
//         }, function(data) {
//             getSelect("groupkeyWords", data.data, "groupName");
//             form.render("select")
//         })

//         //获取库房下拉选项
//         postData_("GetDataInterface", {
//             // XDLMCID: "1001",
//             // XDLMSID: "DYBH2019101613433807104720",
//             // XDLMA: getCookieName("mUserOnlyNum"),
//             // XDLMB: "sykf"
//             XDLMCID: "1001",
//             XDLMSID: "DYBH201908231246284628130151",
//             XDLMA: "文物"
//         }, function(returnData) {
//             if (returnData.rows) {


//                 getSelect("XDLM库房", returnData.rows, "库房名");
//                 if (returnData.rows[0].库房名) {
//                     getguijiaHao(returnData.rows[0].库房名)
//                 }
//             }

//         }, "/xdData/xdDataManage.ashx", "", "XKLX=SYKFGL");

//         //获取位置下拉选项
//         //		postData("wwGetDataList", {
//         //			TblNum: 147,
//         //			T1472: "EQ" + getCookieName("mCurrentStorage")
//         //		}, function(data) {
//         //			getCengHao(data.data[0]['柜架号'])
//         //			getSelect("XDLM柜架号", data.data, "柜架号")
//         //			form.render("select")
//         //		})
//         form.on("select(XDLM库房)", function(data) {
//             getguijiaHao(data.value)
//             form.render("select")
//         })

//         form.on("select(XDLM柜架号)", function(data) {
//             getCengHao($("#XDLM库房").val(), data.value)
//             form.render("select")
//         })
//         form.on("select(XDLM层号)", function(data) {
//             getFenQu($("#XDLM库房").val(), $("#XDLM柜架号").val(), data.value)
//             form.render("select")
//         })

//         form.on('select(zkzt)', function(data) { //切换在库状态
//             $("#keyWords").val("")
//             $("#cxlb").val("XDLMC")
//             if (data.value == "所有") {
//                 for (let k in where) {
//                     if (k == "XDLMA" || k == "XDLMCID" || k == "XDLMSID") {

//                     } else {
//                         delete where[k]
//                     }
//                 }
//                 // where.T30563 = "";
//             } else {
//                 // where.T30563 = "EQ" + data.value;
//                 where.XDLMB = data.value
//                 for (let k in where) {
//                     if (k == "XDLMB" || k == "XDLMCID" || k == "XDLMSID") {

//                     } else {
//                         delete where[k]
//                     }
//                 }
//             }
//             // changeWhere()
//             tableins.reload({
//                 where: where,
//                 page: {
//                     curr: 1
//                 }
//             });
//         })
//         changeSearchType($("#cxlb").val()) //默认显示的
//         form.on("select(cxlb)", function(data) {
//             changeSearchType(data.value)

//         })
//         $('#searchData').click(function() {
//             // changeWhere()
//             if ($("#keyworDiv").is(":visible")) {
//                 if ($("#keyWords").val()) {
//                     let searchCS = ""
//                     searchCS = $("#cxlb option:selected").val()
//                         // console.log($("#cxlb option:selected").val())
//                     where[searchCS] = $("#keyWords").val()
//                     for (let k in where) {
//                         if (k == searchCS || k == "XDLMB" || k == "XDLMCID" || k == "XDLMSID") {

//                         } else {
//                             delete where[k]
//                         }
//                     }
//                 } else {

//                     layer.msg("查询关键字不能为空")
//                     return false
//                 }
//             } else if ($("#XDLMPDiv").is(":visible")) {
//                 where.XDLMP = $("#groupkeyWords").val()
//                 for (let k in where) {
//                     if (k == "XDLMP" || k == "XDLMB" || k == "XDLMCID" || k == "XDLMSID") {

//                     } else {
//                         delete where[k]
//                     }
//                 }
//             } else if ($("#warehouseDiv").is(":visible")) {
//                 where.XDLMA = $("#XDLM库房").val()
//                 where.XDLMR = $("#XDLM柜架号").val()
//                 where.XDLMS = $("#XDLM层号").val()
//                 where.XDLMT = $("#XDLM分区号").val()
//                 for (let k in where) {
//                     if (k == "XDLMR" || k == "XDLMS" || k == "XDLMT" || k == "XDLMB" || k == "XDLMA" || k == "XDLMCID" || k == "XDLMSID") {} else {
//                         delete where[k]
//                     }
//                 }
//             }

//             tableins.reload({
//                 where: where,
//                 page: {
//                     curr: 1
//                 }
//             });

//         });
//         table.on('tool(wwzllb)', function(obj) {
//             var data = obj.data;
//             getRowColor(obj)
//             switch (obj.event) {
//                 case "scanPic":
//                     lookPic(data['图片地址'])
//                     break;
//                 case "xq":
//                     if (data['表对应码'] == '386') {
//                         layerPage02 = openWindow(2, 'carrierDetail.html?knbh=' + data['文物库内编号'], "详细信息", $(window).width(), $(window).height())
//                     } else {
//                         layerPage01 = openWindow(2, '../knww/page/wwjcxx.html?knbh=' + data['文物库内编号'] + '&check=1', "详细信息", $(window).width(), $(window).height());
//                     }
//                     break;
//                 case "ck":
//                     // if (limitConfig("storeLimt", 2)) {
//                     layerPage02 = openWindow(2, 'wwckdjb.html?type=ww&knbh=' + data['文物库内编号'], "详细信息", $(window).width(), $(window).height())

//                     // } else {
//                     //     layer.msg("您没有编辑权限")
//                     // }

//                     break;
//                 case "gh":
//                     // if (limitConfig("storeLimt", 2)) {
//                     layerPage03 = openWindow(2, 'ghwwdjb.html?knbh=' + data['文物库内编号'], "归还", $(window).width(), $(window).height())

//                     // } else {
//                     //     layer.msg("您没有编辑权限")
//                     // }

//                     break;
//                 case "ckd":
//                     layerPage04 = openWindow(2, '../../crkgl/ckHtml.html?knbh=' + data['文物库内编号'] + "&type=ck" + "&TblNum=305", "详细信息", $(window).width(), $(window).height())
//                     break;
//                 case "wz":
//                     // if (limitConfig("storeLimt", 2)) {
//                     layerPage04 = openWindow(2, '../kfgl/page/scanStore.html?knbh=' + data['文物库内编号'] + "&type=crList&TablNum=305" + "&check=1", "位置信息", $(window).width() - 800, $(window).height() - 400)

//                     // } else {
//                     //     layer.msg("您没有编辑权限")
//                     // }
//                     break;
//                 case "edit":
//                     // if (limitConfig("storeLimt", 2)) {
//                     self.window.location.href = "../../crkgl/xrkww.html?type=modify&knbh=" + data['文物库内编号'];

//                     // } else {
//                     //     layer.msg("您没有编辑权限")
//                     // }

//                     break;
//                 case "label":
//                     layerPage04 = openWindow(2, '../knww/page/printQRCode.html?knbh=' + data['文物库内编号'] + '&type=2', "标签打印", 350, 400);
//                     // postData("BatchItemQRCodeExport", {
//                     //     TblNum: "305",
//                     //     XDLM文物库内编号: data['文物库内编号']
//                     // }, function(o) {
//                     //     lookPic(o.data, "", "01")
//                     // })
//                     break;
//             }

//         })
//         $("#searchDataAll").click(function() {
//             layerPage01 = openWindow(1, $("#multipleSearchData"), "多条件查询", 800, 600)
//             getSearchTpl()
//             postData_("GetDataInterface", {
//                 XDLMCID: "1001",
//                 XDLMSID: "DYBH201908231246284628130151",
//                 XDLMA: "文物"
//             }, function(returnData) {
//                 if (returnData.rows) {
//                     getSelect("duokf", returnData.rows, "库房名", "", "", "1");
//                 }
//             }, "/xdData/xdDataManage.ashx", "", "XKLX=SYKFGL");
//         })
//         $("#searchdata2").click(function(data) {

//             // var QueryType = "",
//             //     QueryKey = "";
//             // $(".searchText").each(function(key, val) {
//             //     if ($(val).val()) {
//             //         QueryKey += $(val).val() + ",";
//             //         QueryType += $(val).attr("name") + ",";

//             //     }
//             // })
//             // where.QueryKey = QueryKey.slice(0, QueryKey.length - 1);
//             // where.QueryType = QueryType.slice(0, QueryType.length - 1);

//             for (let k in where) {
//                 if (k == "XDLMB" || k == "XDLMCID" || k == "XDLMSID") {

//                 } else {
//                     delete where[k]
//                 }
//             }
//             $(".searchText").each(function(key, val) {
//                 if ($(val).val()) {
//                     where[$(val).attr("name")] = $(val).val();
//                 }
//             })
//             tableins.reload({
//                 where: where,
//                 page: {
//                     curr: 1
//                 }
//             });
//             layer.close(layerPage01)
//             return false
//         })
//         $("#updateTable").click(function() {
//             tableins.reload()
//         })
//         $("#dtjcx").click(function() {
//             layerPage01 = openWindow(1, $("#dtjcxHtml"), "小提示：[组合查询适用于精确查询，应尽量输入较少的关键字，以便获取更多的查询结果]", 800, 420)
//         })
//         $("#bjfz").click(function() {
//                 layerPage01 = openWindow(2, 'add_fz.html', " ", $(window).width(), $(window).height())
//             })
//             //导出
//         $('#outfile').click(function(e) {
//             var ids = [];
//             layui.use('table', function() {
//                 var table = layui.table;
//                 var checkStatus = table.checkStatus('tableLayui'),
//                     data = checkStatus.data;
//                 for (var i = 0; i < data.length; i++) {
//                     ids.push(data[i].id);
//                 }
//             });
//             e.preventDefault();
//             outfile("305", ids, "T3051");
//         });
//         //批量出库
//         $("#batchOutStore").click(function() {
//                 var ids = [];
//                 var flag = true;
//                 var checkStatus = table.checkStatus('tableLayui'),
//                     data = checkStatus.data;
//                 for (var i = 0; i < data.length; i++) {
//                     if (data[i]['库存状态'] == "在库" || data[i]['库存状态'] == "归还入库") {
//                         ids.push(data[i]['文物库内编号']);
//                     } else {

//                         flag = false;
//                         layer.msg("请选择在库的登记表")
//                         break;
//                         return flag
//                     }

//                 }
//                 if (flag) {
//                     batchCK("WenWuChuKu", ids, "WWDJBID", '305')
//                 }

//             })
//             //文物组
//         $("#grounp").click(function() {
//                 var ids = [];
//                 var checkStatus = table.checkStatus('tableLayui'),
//                     data = checkStatus.data;
//                 for (var i = 0; i < data.length; i++) {

//                     ids.push(data[i]['文物库内编号']);

//                 }
//                 batchGroup(ids)
//             })
//             //编辑分组
//         $("#editgrounp").click(function() {
//             layerPage01 = openWindow(2, '../../xtgl/wwz.html?tabnum=305', "", $(window).width() - 100, $(window).height() - 100)
//         })

//         form.render("select")
//     });
// })

// // function getSearchTpl(data) {
// //     var getTpl = searchTpl.innerHTML;
// //     console.log(getTpl)
// //     laytpl(getTpl).render(data, function(html) {
// //         $("#multipleSearchDataContent").append(html)
// //     });
// // }

// function getSearchTpl() {
//     $("#multipleSearchDataContent").empty()
//     var getTpl = searchTpl.innerHTML;
//     $("#multipleSearchDataContent").append(getTpl)
// }

// function changeWhere() {
//     where.QueryType = $("#cxlb").val();
//     $(".search-type").each(function(key, val) {
//         console.log($(val).hasClass("layui-hide"))
//         if ($(val).hasClass("layui-hide")) {

//         } else {

//             if ($(val).attr("id") == "warehouseDiv") {
//                 where.QueryKey = "";
//                 where.mCNTRNo = $("#XDLM柜架号").val();
//                 where.mLevelNo = $("#XDLM层号").val();
//                 where.mAreaNo = $("#XDLM分区号").val();

//             } else {

//                 where.QueryKey = $(val).find(".key-words").val();

//                 where.mCNTRNo = "";
//                 where.mLevelNo = "";
//                 where.mAreaNo = "";
//             }

//         }
//     })
// }

// function changeSearchType(value) {
//     $(".search-type").addClass("layui-hide")
//         // if (value == "文物组" || value == "warehouse") {
//         //     $("#" + value + "Div").removeClass("layui-hide");
//         // } else {
//         //     $("#keyworDiv").removeClass("layui-hide");
//         // }
//     if (value == "XDLMP") { //分组
//         $("#XDLMPDiv").removeClass("layui-hide");
//         $("#keyWords").val("")
//     } else if (value == "warehouse") { //存放位置
//         $("#warehouseDiv").removeClass("layui-hide");
//         $("#keyWords").val("")
//     } else { //正常
//         $("#keyworDiv").removeClass("layui-hide");
//     }
// }

// function batchGroup(ids) { //批量出库
//     if (ids.length == 0) {
//         layer.msg('请先选中行！', {
//             title: '提示框',
//             icon: 0,
//             time: 800
//         });
//     } else {
//         store.set("volumeGroup", ids.join(","))
//         layerPage01 = openWindow(2, 'volumeGroup.html?tabnum=305', "", $(window).width() - 100, $(window).height() - 100)

//     }
// }

// function getFenQu(kfdata, gjdata, cengdata) { //分区号
//     postData("wwGetDataList", {
//         TblNum: 151,
//         T1512: "EQ" + kfdata,
//         T1513: "EQ" + gjdata,
//         T1514: "EQ" + cengdata,
//     }, function(data) {
//         if (data.data && data.data.length > 0) {
//             getSelect("XDLM分区号", data.data, "分区号")
//         }
//         form.render("select")
//     })
// }

// function getCengHao(kfdata, gjdata) { //获取层号
//     layui.use(['form'], function() {
//         postData("wwGetDataList", {
//             TblNum: 158,
//             T1582: "EQ" + kfdata,
//             T1583: "EQ" + gjdata
//         }, function(data) {
//             if (data.data && data.data.length > 0) {
//                 getSelect("XDLM层号", data.data, "层号")
//                 if (data.data[0]['层号']) {
//                     getFenQu(kfdata, gjdata, data.data[0]['层号'])
//                 }
//             } else {
//                 $('#XDLM层号').empty();
//                 $('#XDLM分区号').empty();
//             }

//             form.render("select")
//         })
//     })
// }

// function getguijiaHao(kfdata) { //获取柜架号
//     layui.use(['form'], function() {
//         postData("wwGetDataList", {
//             TblNum: 158,
//             T1582: "EQ" + kfdata,
//             // T1583: "EQ" + datagj
//         }, function(data) {
//             if (data.data && data.data.length > 0) {
//                 let wwkf = []
//                 let gjkf = []
//                 for (let i in data.data) {
//                     // console.log(wwkf.includes(data.data[i].柜架号))
//                     if (gjkf.includes(data.data[i].柜架号)) {

//                     } else {
//                         gjkf.push(data.data[i].柜架号)
//                         wwkf.push(data.data[i])
//                     }
//                 }
//                 // console.log(wwkf)
//                 getSelect("XDLM柜架号", wwkf, "柜架号")
//                 if (data.data[0]['柜架号']) {
//                     getCengHao(kfdata, data.data[0]['柜架号'])
//                 }
//             } else {
//                 $('#XDLM柜架号').empty();
//                 $('#XDLM层号').empty();
//                 $('#XDLM分区号').empty();
//             }

//             form.render("select")
//         })
//     })
// }

// function combinePosition_(data) {
//     var position_ = "";
//     if (data['库房名']) {
//         position_ += data['库房名'];
//     }
//     if (data['柜架号']) {
//         position_ += data['柜架号'];
//     }
//     if (data['层号']) {
//         position_ += data['层号'];
//     }
//     if (data['分区号']) {
//         position_ += data['分区号'];
//     }
//     return '<p>' + position_ + '</p>'
// }



// function getTablee(id, where) {

//     var limit = 7;
//     cols = [
//         [{
//                 checkbox: true,
//                 LAY_CHECKED: false,
//                 width: '2%',
//             }, {
//                 title: '序号',
//                 type: 'numbers'
//             },
//             {
//                 field: 'zt',
//                 title: '记录图',
//                 width: '7%',
//                 align: 'center',
//                 templet: "#smallPicture"
//             }, {
//                 field: '登记名称',
//                 title: '名称',
//                 width: '8.5%',
//                 align: 'center',
//                 templet: '#colorMC'
//             },
//             {
//                 field: '现藏品总登记号',
//                 title: '原登记号',
//                 width: '12%',
//                 align: 'center',
//                 templet: '#colorYDJH'
//             }, {
//                 field: '文物库内编号',
//                 title: '现登记号',
//                 width: '7%',
//                 align: 'center',
//                 templet: '#colorWWKNBH'
//             },
//             //					{
//             //						field: '文物级别',
//             //						title: '文物级别',
//             //						width: '5%',
//             //						align: 'center',
//             //						templet: '#colorWWJB'
//             //					},
//             {
//                 field: '文物类别_具体类别',
//                 title: '文物类别',
//                 width: '5%',
//                 align: 'center',
//                 templet: '#colorWWLB'
//             },

//             {
//                 field: '外形尺寸',
//                 title: '外形尺寸',
//                 width: '5%',
//                 align: 'center',
//                 templet: '#colorWXCC'
//             },
//             {
//                 field: '完残程度',
//                 title: '完残程度',
//                 width: '5%',
//                 align: 'center',
//                 templet: '#colorWCCD'
//             },
//             {
//                 field: '数量',
//                 title: '数量',
//                 width: '5%',
//                 align: 'center',
//                 templet: '#colorSL'
//             },
//             // {
//             //     field: '数量单位',
//             //     title: '单位',
//             //     width: '5%',
//             //     align: 'center',
//             //     templet: '#colorDW'
//             // },
//             {
//                 field: '考古发掘信息_领队',
//                 title: '领队',
//                 width: '5%',
//                 align: 'center',
//                 templet: '#colorLD'

//             },
//             {
//                 field: '考古发掘信息_出土地点',
//                 title: '出土地点',
//                 width: '10%',
//                 align: 'center',
//                 templet: '#colorCTDD'

//             },
//             {
//                 field: '',
//                 title: '位置',
//                 width: '8%',
//                 align: 'center',
//                 templet: "#positionDisplay"

//             },

//             {
//                 field: '库存状态',
//                 title: '库存状态',
//                 width: '5%',
//                 align: 'center',
//                 templet: '#colorKCZT'
//             }, {
//                 field: '',
//                 title: '操作',
//                 width: '13.2%',
//                 align: 'center',
//                 templet: '#opeTpl'
//             }

//         ]
//     ]

//     layui.use(["table"], function(data) {
//         var table = layui.table;
//         tableins = table.render({
//             elem: '#' + id,
//             url: "/xdData/xdDataManage.ashx?XAction=GetDataInterface&XKLX=SYKFGL",
//             where: where,
//             method: 'post',
//             cols: cols,
//             skin: 'line', //表格风格
//             even: true,
//             size: 'sm',
//             toolbar: false,
//             headers: {

//                 Authorization: getAuth()
//             },
//             // data: testData,
//             //			toolbar: true, //开启工具栏，此处显示默认图标，可以自定义模板，详见文档
//             //			width: $(window).width() - 40,
//             // defaultToolbar: [],
//             height: $(document).height() - 145,
//             response: {
//                 //				statusName: 'success', //规定数据状态的字段名称，默认：code					
//                 //				statusCode: true, //规定成功的状态码，默认：0					
//                 //				msgName: 'success', //规定状态信息的字段名称，默认：msg					
//                 countName: 'total', //规定数据总数的字段名称，默认：count					
//                 dataName: 'rows' //规定数据列表的字段名称，默认：data
//             },
//             loading: true,
//             cellMinWidth: 30,
//             request: {
//                 pageName: 'page' //页码的参数名称，默认：page
//                     ,
//                 limitName: 'rows' //每页数据量的参数名，默认：limit
//             },
//             //				height: 'full-70',
//             page: true, //是否显示分页
//             limits: [limit, 50, 100, 200, 500, 1000],
//             limit: limit, //每页默认显示的数量
//             id: "tableLayui",
//             done: function(res, curr, count) {
//                 if (res.message == "NOTLOGIN") {
//                     var isQcode = window.location.href.getQuery("ewm"); //是否手机打开的
//                     if (isQcode) {
//                         window.location.href = window.location.origin + "/SYKFGL/login-app.html?nextUrl=" + escape(window.location.href);
//                     } else {
//                         //						parent.location.href = "/SYKFGL/login.html"
//                     }

//                 }
//             },
//             error: function() {

//             }
//         });
//     })
// }