
var listType = ""
//var loading;
var rowid = window.location.href.getQuery("rowid");
var knbh = window.location.href.getQuery("knbh");
var type = window.location.href.getQuery("type");
var lsh, wwxx_lsh, wwxx_kczt;   //流水号，库存状态

layui.use(['element', 'table', 'layer', 'form'], function () {
    //loading = layer.load(); //换了种风格

    // $("#pageTitle2").html(newLsName); //标题2

    //文物入库表
    var where = "";

    if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {
        $("#pageTitle1").html(SysConfig.UserInfo.GetCookieName("mCurrentStorage") + "文物出库/文物归库登记表");
        $('.ck_ww').show();
        $('.ck_tp').hide();
        $('#ms_txt').html('文物描述');
    }
    else {
        $("#pageTitle1").html(SysConfig.UserInfo.GetCookieName("mCurrentStorage") + "拓片出库/拓片归库登记表");
        $('.ck_ww').hide();
        $('.ck_tp').show();
        $('#ms_txt').html('拓片描述');
    }


    //二维码
    var QRCodeImg = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "9000",
        XDLMTID: "9204",
        XDLMSID: "9204003",
        XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),
        XDLM文物库内编号: knbh
    });
    console.log(QRCodeImg);

    if (typeof (QRCodeImg) == "string") {
        layer.msg(QRCodeImg);
    }


    if ($("body").find("#newRK").attr("id")) {
        //SetQRurl(knbh, "detail", newLsName)
        $("#qrimage").attr("src", QRCodeImg.data)
        $("#pageTitle3").html(SysConfig.UserInfo.GetCookieName("mCurrentStorage") + "入库登记表")
    } else {
        //SetQRurl(knbh, type, newLsName)
        $("#qrimage").attr("src", QRCodeImg.data)
    }

    echoData();//回显数据

    //拓片与文物打印区分
    if (SysConfig.UserInfo.GetCookieName("kflx") == "拓片") {
        $("#basicDisplay").removeClass("layui-hide")
        $("#printBtn").click(function () {
            var tata = document.execCommand("print");//打印当前页面
        })

    } else {
        $("#printBtn").click(function () {

            if (type == "rk") {
                outputFile.OutPutGuiKu("是否打印" + listType + "?", knbh, wwxx_lsh, "", "入库单", Callback);

            } else if (type == "gk") {
                if(wwxx_kczt == "待入库"){
                    outputFile.OutPutGuiKu("是否打印" + listType + "?", knbh, wwxx_lsh, "", "出库单", Callback);
                }else{
                    outputFile.OutPutGuiKu("是否打印" + listType + "?", knbh, wwxx_lsh, "", "归库单", Callback);
                }

            } else {
                outputFile.OutPutGuiKu("是否打印" + listType + "?", knbh, wwxx_lsh, "", "出库单", Callback);
            }
            //文物入库登记单打印


        })

    }






    $("#dayin").click(function () {
        $("#printBtn").hide()
        $("#dayin").hide()
        $("#mmpd").removeClass('table-content').addClass('content-table');
        $(".hhh>img").addClass('widder')
        $("table tr td ").css("height", "35px")
        window.print(); //打
        $("#printBtn").show()
        $("#dayin").show()
        $("#mmpd").removeClass('content-table').addClass('table-content');
        $(".hhh>img").removeClass('widder')
        $("table tr td ").css("height", "30px")
    })
})





function echoData() { //回显数据
    $("#ckxq").html("查看详情")
    var sid;

    // 01
    // var wwxx_image, wwxx_image2;
    if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {
        //获取文物列表
        sid =  "DYBH20190823124628462889251";
    } else {
        //获取拓片列表
        sid = "DYBH201908231246284628202221";
    }

    var wwxx = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: sid,
        XDLMU: knbh
    });
    
    //02 列表页通过id获取单条数据，回显赋值
    if (wwxx.success) {
        if(wwxx.rows.length > 0){
            wwxx_lsh = wwxx.rows[0]['记录表流水号'];
            wwxx_kczt = wwxx.rows[0]['库存状态'];
            
            
            showPicture(wwxx.rows[0]['图片地址'], "picBodyImportant")//入库单图片回显
            for (var k in wwxx.rows[0]) {
                $("#XDLM" + k).html(wwxx.rows[0][k])
            }
            if (wwxx.rows[0]['质地类别机质'] == null || wwxx.rows[0]['质地类别机质'] == "") {
                $("#zdlb").html("" + wwxx.rows[0]['质地类别'] + "" + " " + "")
            } else {
                $("#zdlb").html("" + wwxx.rows[0]['质地类别'] + "、" + wwxx.rows[0]['质地类别机质'] + "")
            }
        }
    }

    let d_type;
    if(type == "gk" || type == "rk"){
        console.log("gkrk单子：")
        console.log(wwxx_kczt);
        if(wwxx_kczt == "待入库" || wwxx_kczt == "待出库" ){
            d_type = "出库单";
        }else if(wwxx_kczt == "新入库" || wwxx_kczt == "移库"){
            d_type = "入库单";
        }else{
            d_type = "归库单";
        }
    }else if(type == "ck"){
        console.log("ck单子：")
        console.log(wwxx_kczt);
        d_type = "出库单";
    }

    console.log("结果：")
    console.log(d_type);
    //拓片的入库单根据类型显示人员信息
    if(wwxx_kczt == "新入库" || wwxx_kczt == "移库" || wwxx_kczt == "归还入库"){
        console.log(111111111);
        console.log(wwxx_kczt);
        $('#people_ck1').addClass("layui-hide");
        $('#people_ck2').addClass("layui-hide");
        $('#people_rk1').removeClass("layui-hide");
        $('#people_rk2').removeClass("layui-hide");
    }else if(wwxx_kczt == "待入库" || wwxx_kczt == "新出库"){
        console.log(222222222);
        console.log(wwxx_kczt);
        $('#people_ck1').removeClass("layui-hide");
        $('#people_ck2').removeClass("layui-hide");
        $('#people_rk1').addClass("layui-hide");
        $('#people_rk2').addClass("layui-hide");
    }


    // 获取单个记录表流水记录  （20200519因待入库文物的归库单无流水信息修改，后台给的接口）
    let wwxx_jilu = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "9000",
        XDLMTID: "9204",
        XDLMSID: "9204036",
        XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),
        relics_code: knbh,
        logs_code: wwxx_lsh,
        form_type: d_type
        // XDLMCID: "1001",
        // XDLMSID: "DYBH20190823124628462811232",
        // XDLMA: rowid
    });
    if(wwxx_jilu.success){
        if(wwxx_jilu.inside.length > 0){
            for(var k in wwxx_jilu.inside[0]) {
                $("#" + k).html(wwxx_jilu.inside[0][k])
            }
            let wwxx_image1 = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823124628462861241",
                XDLMA: wwxx_jilu.inside[0]['归库记录流水号'],
            });
            if(wwxx_image1.success){
                for (var n = 0; n < wwxx_image1.rows.length; n++) {
                    showPicture(wwxx_image1.rows[n]['图片地址'], "picBodyRK") //获取图片
                }
            }
        }

        if(wwxx_jilu.outside.length > 0){
            for(var k in wwxx_jilu.outside[0]) {
                $("#" + k).html(wwxx_jilu.outside[0][k])
            }
            let wwxx_image2 = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823124628462861241",
                XDLMA: wwxx_jilu.outside[0]['出库记录流水号'],
            });
            if(wwxx_image2.success){
                for (var n = 0; n < wwxx_image2.rows.length; n++) {
                    showPicture(wwxx_image2.rows[n]['图片地址'], "picBodyCK") //获取图片
                }
            }
        }
    }
    





    // 获取单个记录表流水记录  
    // let wwxx_jilu = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
       
    //     XDLMCID: "1001",
    //     XDLMSID: "DYBH20190823124628462810231",
    //     XDLMC: knbh
    // });
    // if(wwxx_jilu.success){
    //     if(wwxx_jilu.rows.length > 0){
    //         lsh = wwxx_jilu.rows[0].记录表流水号;//记录表流水号
    //         // 流水记录所获值判断
    //         switch (wwxx_jilu.rows[0].操作类型) {
    //             case "出库":
    //             case "待出库":
    //             case "拒绝出库":
    //                 listType = "出库单";
    //                 for (var k in wwxx_jilu.rows[0]) {
    //                     $("#出库" + k).html(wwxx_jilu.rows[0][k])
    //                 }

    //                 if (wwxx_jilu.rows[0].记录表流水号) {
    //                     wwxx_image = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
    //                         XDLMCID: "1001",
    //                         XDLMSID: "DYBH20190823124628462861241",
    //                         XDLMA: wwxx_jilu.rows[0].记录表流水号,

    //                     });

    //                     if (wwxx_image.success) {
    //                         for (var n = 0; n < wwxx_image.rows.length; n++) {
    //                             showPicture(wwxx_image.rows[n]['图片地址'], "picBodyCK") //获取图片
    //                         }
    //                     }

    //                 } else {

    //                 }
    //                 break;

    //             case "入库":
    //                 if (wwxx_jilu.rows[0].记录类型 == "归还入库") {
    //                     listType = "归库单"
    //                     //归还时调取出库时的数据，归还时的入库流水号就是出库的归还流水号
    //                     let wwxx_jilu_chuku = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
    //                         XDLMCID: "1001",
    //                         XDLMSID: "DYBH20190823124628462810231",
    //                         XDLMF: lsh
    //                     });

    //                     for (var k in wwxx_jilu_chuku.rows[0]) {
    //                         $("#出库" + k).html(wwxx_jilu_chuku.rows[0][k])
    //                     }


    //                     for (var w in wwxx_jilu.rows[0]) {
    //                         $("#归库" + w).html(wwxx_jilu.rows[0][w])
    //                     }

    //                     if (wwxx_jilu_chuku.rows.length > 0) {

    //                         wwxx_image_chuku = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
    //                             XDLMCID: "1001",
    //                             XDLMSID: "DYBH20190823124628462861241",
    //                             XDLMA: wwxx_jilu_chuku.rows[0].记录表流水号,

    //                         });
    //                         if (wwxx_image_chuku.success) {

    //                             for (var n = 0; n < wwxx_image_chuku.rows.length; n++) {
    //                                 showPicture(wwxx_image_chuku.rows[n]['图片地址'], "picBodyCK") //获取图片
    //                             }
    //                         }

    //                         wwxx_image2_ruku = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
    //                             XDLMCID: "1001",
    //                             XDLMSID: "DYBH20190823124628462861241",
    //                             XDLMA: lsh,

    //                         });
    //                         if (wwxx_image2_ruku.success) {

    //                             for (var n = 0; n < wwxx_image2_ruku.rows.length; n++) {
    //                                 showPicture(wwxx_image2_ruku.rows[n]['图片地址'], "picBodyRK") //获取图片
    //                             }
    //                         }

    //                     } else {

    //                     }
    //                 } else if(wwxx_jilu.rows[0].操作类型 == "新入库"||wwxx_jilu.rows[0].操作类型 == "入库") {


    //                     for (var k in wwxx_jilu.rows[0]) {
                        
    //                         if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {
                            
    //                             $("#"+k).html(wwxx_jilu.rows[0][k])
    //                         } else {
                            
    //                             $("#XDLM" + k).html(wwxx_jilu.rows[0][k])

    //                         }
    //                     }
    //                 }

    //                 break;
    //         }
    //     }
    // }

    










    // 老版本：
    //if (knbh) {
    //    //新入库
    //    if (type == "rk") {
    //        listType = "入库单"
    //        wwxx_image = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
    //            XDLMCID: "1001",
    //            XDLMSID: "DYBH20190823124628462861241",
    //            XDLMA: wwxx_jilu.rows[0].记录表流水号,

    //        });

    //        if (wwxx_image.success) {

    //            for (var n = 0; n < wwxx_image.rows.length; n++) {
    //                showPicture(wwxx_image.rows[n]['图片地址'], "picBodyRK") //获取图片
    //            }
    //        }
    //    } else {
    //    }


    //    layer.close(loading);


    //postData("GetInOutActData", {
    //    relics_code: knbh,
    //    form_type: listType,
    //    logs_code: newLsName
    //}, function (returnData) {
    //    if (returnData.inside.length > 0) { //归库
    //        for (var k in returnData.inside[0]) {
    //            $("#" + k).html(returnData.inside[0][k])
    //        }


    //        postData("wwGetDataList", { //入库图片
    //            TblNum: "119",
    //            T1193: "EQ" + returnData.inside[0]['归库记录流水号'],
    //            page: 1,
    //            limit: 1
    //        },
    //            function (data1) {
    //                for (var n = 0; n < data1.data.length; n++) {
    //                    showPicture(data1.data[n]['图片地址'], "picBodyRK") //获取图片
    //                }

    //            });
    //    }

    //    if (returnData.outside.length > 0) { //出库
    //        for (var k in returnData.outside[0]) {
    //            $("#" + k).html(returnData.outside[0][k])
    //        }

    //        postData("wwGetDataList", { //出库图片
    //            TblNum: "119",
    //            T1193: "EQ" + returnData.outside[0]['出库记录流水号'],
    //            page: 1,
    //            limit: 1
    //        },
    //            function (data1) {
    //                for (var n = 0; n < data1.data.length; n++) {
    //                    showPicture(data1.data[n]['图片地址'], "picBodyCK") //获取图片
    //                }

    //            });
    //    }

    //    if (returnData.relics.length > 0) {
    //        for (var k in returnData.relics[0]) {
    //            $("#XDLM" + k).html(returnData.relics[0][k])
    //        }

    //        if (returnData.relics[0]['质地类别机质'] == null || returnData.relics[0]['质地类别机质'] == "") {
    //            $("#zdlb").html("" + returnData.relics[0]['质地类别'] + "" + " " + "")
    //        } else {
    //            $("#zdlb").html("" + returnData.relics[0]['质地类别'] + "、" + returnData.relics[0]['质地类别机质'] + "")
    //        }

    //        if ($("body").find("#picBodyImportant").attr("id")) {

    //            showPicture_(returnData.relics[0]['图片地址'], "picBodyImportant") //获取图片
    //        }

    //        if ($("#gpsDisplay").attr("id")) {

    //            if (returnData.relics[0]['经度'] && returnData.relics[0]['纬度'] && returnData.relics[0]['高度']) {

    //            } else {
    //                $(".gps-display").html("")
    //            }
    //        }

    //    }

    //})



    //    }

    //}

    //layer.close(loading)

    //} else {
    //    layer.close(loading)
    //}

    //}
}

function showPicture(picUrl, id, width, height) { //查看详情显示图片

    var width_ = width ? width : 96;
    var height_ = height ? height : 96;
    if (picUrl) {
        var html = "";
        var imgArry = picUrl ? picUrl.split("|") : [];
        if (imgArry.length > 0) {
            for (var i = 0; i < imgArry.length; i++) {
                if (imgArry[i]) { //float:left;
                    html += `<div class="imgDiv" style="cursor: pointer;">
                                <div class="layadmin-homepage-pad-ver  hhh"  >
                                    <img data-title="查看详情" style="width:100%" onclick="lookPic('${imgArry[i].split(',')[0]}')" class="layadmin-homepage-pad-img" src="${imgArry[i].split(',')[0].replace('ss.', '.')}" >
                                </div>
                            </div>`
                }

            }
        }

        $("#" + id).append(html)
    }
}

function lookPic(imagePath) {
    SysConfig.ToolBox.ShowVideo("查看", imagePath, $(window).width() - 20, $(window).height() - 20);
}

function Callback(){
    var index852 = parent.layer.getFrameIndex(window.name); //获取窗口索引
    if (parent.tableins) {
        parent.tableins.reload("mDataTable");
    }
    parent.layer.close(index852);
}

// function print_a4(id) {

//     $("input,select option").each(function() {
//         $(this).attr('value', $(this).val());
//     });

//     //搞定 type=checkbox,type=radio 选中状态
//     $("input[type='checkbox'],input[type='radio']").each(function() {
//         if ($(this).attr('checked'))
//             $(this).attr('checked', true);
//         else
//             $(this).removeAttr('checked');
//     });

//     //搞定select选中状态
//     $("select option").each(function() {
//         if ($(this).attr('selected'))
//             $(this).attr('selected', true);
//         else
//             $(this).removeAttr('selected');
//     });

//     // var index = layer.load(1, {
//     //     shade: [0.1, '#fff'] //0.1透明度的白色背景
//     // });
//     $("#" + id).jqprint({

//         noPrintSelector: ".no-print",
//         debug: false,
//         importCSS: true,
//         printContainer: true,
//         operaSupport: true,

//     })

//     setTimeout(function() {
//         layer.close(index)
//     }, 500)
// }