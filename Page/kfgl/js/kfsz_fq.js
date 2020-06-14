var tableins;
var
    cols,layer;
var layerPage01 = "",
    addPageTableNum = "",
    form, table,
    storeCurrent = window.location.href.getQuery("kf"),//库房名字
    gjh = window.location.href.getQuery("gjh"),
    gch = window.location.href.getQuery("gch");
    // rowid = window.location.href.getQuery("rowid")

layui.use(['element', 'table', 'layer', 'form'], function () {
    form = layui.form;
    table = layui.table;
    element = layui.element,
        layer = layui.layer;

    tableins = layui.table;
 
    // 权限设置
    qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("库房设置");
    console.log(qx)


    if (!qx[0].Limit.isBJ) {
        $("#addGuijia").addClass("layui-hide")
        $("#addCeng").addClass("layui-hide")
        $("#addFenqu").addClass("layui-hide")
        $("#quicklyAdd").addClass("layui-hide")
        $("#editkfsort").addClass("layui-hide")
    }


    if (!qx[0].Limit.isSC) {
        $("#delGuijia").addClass("layui-hide")
        $("#delCeng").addClass("layui-hide")
        // $("#delMore").addClass("layui-hide")

        $("#delAllFrame").addClass("layui-hide")
        $("#delAllLevel").addClass("layui-hide")
        $("#delAllArea").addClass("layui-hide")
    }



    //库房下拉选择
    // var This_kf = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
    //     XDLMCID: '1001',
    //     XDLMSID: 'DYBH201908231246284628130151',
    // });
    // if (This_kf.success == true) {
    //     console.log(This_kf)
    //     let data = This_kf.rows
    //     getSelect("store", data, "库房名");
    //     getGuiJia(unescape(storeCurrent))//柜架获取
    //     $("#store").val(unescape(storeCurrent))//当前库房
    // }



    //请求列表数据
    where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231246284628236171",
        XDLMA: unescape(storeCurrent),
        XDLMB: unescape(gjh),
        XDLMC: unescape(gch)

    };
    tableinsDdata()

    //库房点击
    // form.on("select(store)", function (data) {
    //     console.log('库房点击')
    //     getGuiJia(data.value)
    //     where.XDLMA = data.value;
    //     where.XDLMB = $("#guijia").val(),
    //         where.XDLMC = $("#ceng").val(),
    //         where.XDLMD = $("#fenqu").val(),
    //         tableinsDdata()

    // })
    //柜架点击
    // form.on("select(guijia)", function (data) {
    //     getCengHao(data.value, "typedelit")
    //     console.log($("#guijia").find("option:selected").attr("value"))
    //     if (!$("#guijia").find("option:selected").attr("value")) {
    //         delete where.XDLMB
    //     } else {
    //         where.XDLMB = $("#guijia").val()
    //     }
    //     if (!$("#ceng").find("option:selected").attr("value")) {
    //         delete where.XDLMC
    //     } else {
    //         where.XDLMC = $("#ceng").val()
    //     }
    //     if (!$("#fenqu").find("option:selected").attr("value")) {
    //         delete where.XDLMD
    //     } else {
    //         where.XDLMD = $("#fenqu").val()
    //     }

    //     tableinsDdata()
    // })

    //层点击
    // form.on("select(ceng)", function (data) {
    //     getFengQu(data.value,"typedelit")
    //     if (!$("#guijia").find("option:selected").attr("value")) {
    //         delete where.XDLMB
    //     } else {
    //         where.XDLMB = $("#guijia").val()
    //     }
    //     if (!$("#ceng").find("option:selected").attr("value")) {
    //         delete where.XDLMC
    //     } else {
    //         where.XDLMC = $("#ceng").val()
    //     }
    //     if (!$("#fenqu").find("option:selected").attr("value")) {
    //         delete where.XDLMD
    //     } else {
    //         where.XDLMD = $("#fenqu").val()
    //     }
    //     tableinsDdata()
    // })
    //分区点击  
    // form.on("select(fenqu)", function (data) { //分区
        
    //     if (where.XDLMC) {
    //         $("#fenqu").val(where.XDLMD)
    //         form.render("select")
    //     }
    //     if (!$("#guijia").find("option:selected").attr("value")) {
    //         delete where.XDLMB
    //     } else {
    //         where.XDLMB = $("#guijia").val()
    //     }
    //     if (!$("#ceng").find("option:selected").attr("value")) {
    //         delete where.XDLMC
    //     } else {
    //         where.XDLMC = $("#ceng").val()
    //     }
    //     if (!$("#fenqu").find("option:selected").attr("value")) {
    //         delete where.XDLMD
    //     } else {
    //         where.XDLMD = $("#fenqu").val()
    //     }
    //     tableinsDdata()
    // })

    //刷新表格
    // $("#updateTable").click(function () {
    //     tableinsDdata()
    // })



    //添加库房start
    // $("#addStore").click(function () {
    //     $("#addLayerHtml").find(".layui-inline").addClass("layui-hide")
    //     $("#addLayerHtml").find(".layui-inline:eq(0)").removeClass("layui-hide")
    //     $("#addLayerHtml").find(".layui-inline:eq(0)").find(".input-display").attr("lay-verify", "required")
    //     addPageEcho()
    //     layerPage01 = openWindow(1, $("#addLayerHtml"), "添加库房", 600, 210)
    //     // addPageTableNum = "162"
    // })
    //添加柜架
    // $("#addGuijia").click(function () {
    //     $("#addLayerHtml").find(".layui-inline").addClass("me-hide")
    //     $("#addLayerHtml").find(".layui-inline:eq(2)").prevAll(".layui-inline").removeClass("me-hide")
    //     $("#addLayerHtml").find(".layui-inline:eq(2)").prevAll(".layui-inline").find(".input-display").attr("lay-verify", "required")
    //     addPageEcho()
    //     layerPage01 = openWindow(1, $("#addLayerHtml"), "添加柜架", 600, 250)
    //     addPageTableNum = "147"

    // })
    //添加层
    // $("#addCeng").click(function () {
    //     if ($("#guijia").val()) {
    //         $("#addLayerHtml").find(".layui-inline").addClass("me-hide")
    //         $("#addLayerHtml").find(".layui-inline:eq(3)").prevAll(".layui-inline").removeClass("me-hide")
    //         addPageEcho()
    //         var cengDisplay = $("#addLayerHtml").find(".layui-inline:eq(3)").prevAll(".layui-inline").find(".input-display");
    //         $.each(cengDisplay, function (key, val) {
    //             if (!$(val).hasClass("layui-hide")) {
    //                 $(val).attr("lay-verify", "required")

    //             }
    //         })
    //         layerPage01 = openWindow(1, $("#addLayerHtml"), "添加层数", 600, 380)
    //         addPageTableNum = "158"

    //     } else {
    //         layer.msg("当前库房还选择柜架，请先选择添加柜架")
    //     }
    // })

    //添加分区
    $("#addFenqu").click(function () {
        $('#selgjh').val(unescape(gjh));
        $('#selgch').val(unescape(gch));
        SysConfig.ToolBox.openWindowByDIV($('#addfqdiv'), "新增分区", 600, 350)
        // if ($("#ceng").val()) {
        //     $("#addLayerHtml").find(".layui-inline").removeClass("me-hide")
        //     $("#addLayerHtml").find(".input-display").attr("lay-verify", "required")
        //     addPageEcho()
        //     var fenquDisplay = $("#addLayerHtml").find(".input-display");
        //     fenquDisplay.removeAttr("lay-verify");
        //     $("#addfenqu").attr("lay-verify", "required")
        //     $("#adddqrl").attr("lay-verify", "required")
        //     $("#addzdrl").attr("lay-verify", "required")
        //     layerPage01 = openWindow(1, $("#addLayerHtml"), "添加分区", 600, 390)
            // addPageTableNum = "151"
        // } else {
        //     layer.msg("当前柜架还没有层，请先添加层")
        // }
    })

    $('#addfq').click(function(){
        // 添加柜层分区
        let addwhere = {
            XDLMCID: '5000',
            XDLMSID: 'DYBH20190823124628462884173',
            XDLM库房名: unescape(storeCurrent),
            XDLM柜架号: $('#selgjh').val(),
            XDLM层号: $('#selgch').val(),
            XDLM分区号: $('#selfqh').val(),
            XDLM最大容量: $('#maxrl').val(),
        }

        // addwhere.XDLM柜架号 = $("#addguijiaSelect").val()
        // addwhere.XDLM层号 = $('#addcengSelect').val()
        // addwhere.XDLM分区号 = $('#addfenqu').val()
        // addwhere.XDLM现容量 = $('#adddqrl').val()
        // addwhere.XDLM最大容量 = $('#addzdrl').val()
        let reData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", addwhere);
        if (reData.success == true) {
            layer.msg(reData.message, {
                icon: 1,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            }, function () {
                tableinsDdata()
                window.location.reload()
            });

        } else {
            layer.msg(reData.message)
        }

        layer.close(layerPage01)

    })


    //一键添加弹框
    // $("#quicklyAdd").click(function () {
    //     $("#quicklyStoreName").html($("#store").val())
    //     layerPage01 = openWindow(1, $("#quicklyLayerHtml"), "一键添加", 1000, 500)
    // })

    //一键添加确定按钮
    // form.on("submit(quckliyBtn)", function (data) {
    //     data.field.XDLMStorage = $("#quicklyStoreName").html();
    //     data.field.XDLMCID = "9000",
    //         data.field.XDLMTID = "9204",
    //         data.field.XDLMSID = "9204026"
    //     let reData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", data.field);
    //     if (reData.success == true) {
    //         layer.msg(reData.message, {
    //             icon: 1,
    //             time: 2000 //2秒关闭（如果不配置，默认是3秒）
    //         }, function () {
    //             tableinsDdata()
    //             layer.close(layerPage01)
    //             window.location.reload()
    //         });

    //     }



    // })



    //修改库房排序弹框
    // $("#editkfsort").click(function () {
    //     $("#kfdhid").val(rowid)
    //     $("#pxkfname").val($("#store").val())
    //     $("#pxkfpx").val(px)
    //     layerPage01 = openWindow(1, $("#editkfsortHtml"), "修改库房自定义排序", 600, 290)
    // })

    //修改库房排序——确认
    // form.on("submit(xgpx)", function (data) {
    //     let redata_krjc = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", data.field);
    //     if (redata_krjc.success == true) {
    //         layer.msg(redata_krjc.message, {
    //             icon: 1,
    //             time: 2000 //2秒关闭（如果不配置，默认是3秒）
    //         }, function () {
    //             layer.close(layerPage01)
    //             tableinsDdata()
    //             thiskfdata()

    //         });

    //     } else {
    //         layer.msg(redata_krjc.message)
    //     }
    // })

    

    //删除当前柜
    // $("#delGuijia").click(function () {
    //     var tip = ""
    //     if ($("#guijia").val()) {
    //         console.log($("#guijia").find("option:selected").attr("attrdata"))
    //         submitDataVertifyModule("确定要删除当前柜架？", function () {
    //             // 01删除当前柜架
    //             let firstreData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
    //                 XDLMCID: "9000",
    //                 XDLMTID: "9204",
    //                 XDLMSID: "9204028",
    //                 XDLMKFMC: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
    //                 XDLMGJMC: $("#guijia").val(),

    //             });
    //             if (firstreData.success) {
    //                 layer.msg(firstreData.message, {
    //                     icon: 1,
    //                     time: 2000 //2秒关闭（如果不配置，默认是3秒）
    //                 }, function () {
    //                     Callback();
    //                 });
    //             }

    //         })
    //     } else {
    //         layer.msg("请选择柜架")
    //     }
    // })

    //删除当前层   
    // $("#delCeng").click(function () {
    //     var tip = ""
    //     if ($("#ceng").val() && $("#guijia").val()) {
    //         submitDataVertifyModule("确定要删除当前层？", function () {
    //             let firstreData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
    //                 XDLMCID: "9000",
    //                 XDLMTID: "9204",
    //                 XDLMSID: "9204031",
    //                 XDLMKFMC: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
    //                 XDLMCMC: $("#ceng").val(),

    //             });
    //             if (firstreData.success) {
    //                 layer.msg(firstreData.message, {
    //                     icon: 1,
    //                     time: 2000 //2秒关闭（如果不配置，默认是3秒）
    //                 }, function () {
    //                     Callback();
    //                 });
    //             }

    //         })
    //     } else {
    //         layer.msg("请选择删除所在的柜架及当柜架层")
    //     }

    // })


    //批量删除按钮
    // $("#delMore").click(function () { //批量删除
    //     $("#delMoreStoreName").html($("#store").val())
    //     layerPage01 = openWindow(1, $("#deleteHtml"), "批量删除", 1000, 200)

    // })
    //返回
    // $("#returnPrePage").click(function () {
    //     window.history.go(-1)
    // })

    //功能操作弹框
    // $("#funtionOperate").click(function () {
    //     layer.open({
    //         type: 1,
    //         offset: '200px',
    //         area: ['964px', '70px'],
    //         fix: false, //不固定
    //         shade: 0,
    //         title: false,
    //         content: $("#operateBtn"),
    //         anim: 5,

    //         success: function (layero) {

    //         }

    //     });
    //     //			layerPage01=openWindow(1, $("#operateBtn"), "", 600, 80)
    // })


    //添加库房end
    // table.on('tool(demo)', function (obj) {
    //     var data = obj.data;
    //     if (obj.event == "edit") {
    //         layerPage01 = openWindow(1, $("#editLayerHtml"), "修改", 400, 210)
    //         $("#editfenquhao").val(data["分区号"])
    //         $("#editronglinag").val(data["最大容量"])
    //         $("#editId").val(data.id)
    //     } else if (obj.event == "del") {
    //         delData(data.id, "151", function () {
    //             tableins.reload()
    //         })
    //     }
    //     form.render()
    // })



    // 添加柜子，层按钮
    form.on("submit(addsubmit)", function () {
        console.log(addPageTableNum)

        // if (addPageTableNum == "147") {
        //     // 添加柜架
        //     let addwhere = {
        //         XDLMCID: '5000',
        //         XDLMSID: 'DYBH201908231246284628229183',
        //         XDLM库房名: $("#addstore").val()
        //     }
        //     addwhere.XDLM柜架号 = $("#addguijiaInput").val()
        //     let reData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", addwhere);
        //     if (reData.success == true) {
        //         layer.msg(reData.message, {
        //             icon: 1,
        //             time: 2000 //2秒关闭（如果不配置，默认是3秒）
        //         }, function () {
        //             tableinsDdata()
        //             window.location.reload()

        //         });

        //     } else {
        //         layer.msg(reData.message)
        //     }



        // } else if (addPageTableNum == "158") {
        //     // 添加柜层
        //     let addwhere = {
        //         XDLMCID: '5000',
        //         XDLMSID: 'DYBH201908231246284628252163',
        //         XDLM库房名: $("#addstore").val()
        //     }
        //     addwhere.XDLM柜架号 = $("#addguijiaSelect").val()
        //     addwhere.XDLM层号 = $('#addcengInput').val()
        //     let reData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", addwhere);
        //     if (reData.success == true) {
        //         layer.msg(reData.message, {
        //             icon: 1,
        //             time: 2000 //2秒关闭（如果不配置，默认是3秒）
        //         }, function () {
        //             tableinsDdata()
        //             window.location.reload()

        //         });

        //     } else {
        //         layer.msg(reData.message)
        //     }



        // } else 
        if (addPageTableNum == "151") {
            // 添加柜层分区
            let addwhere = {
                XDLMCID: '5000',
                XDLMSID: 'DYBH20190823124628462884173',
                XDLM库房名: $("#addstore").val()
            }

            addwhere.XDLM柜架号 = $("#addguijiaSelect").val()
            addwhere.XDLM层号 = $('#addcengSelect').val()
            addwhere.XDLM分区号 = $('#addfenqu').val()
            addwhere.XDLM现容量 = $('#adddqrl').val()
            addwhere.XDLM最大容量 = $('#addzdrl').val()
            let reData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", addwhere);
            if (reData.success == true) {
                layer.msg(reData.message, {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    tableinsDdata()
                    window.location.reload()
                });

            } else {
                layer.msg(reData.message)
            }

        }

        layer.close(layerPage01)


    })

    //修改弹窗
    $("#editsubmit").click(function () {
        let retenData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "6000",
            XDLMSID: "DYBH201908231246284628115175",
            XDLMID:$("#editId").val(),
            XDLM分区号:$("#editfenquhao").val(),
            XDLM最大容量:$("#editronglinag").val()

        });
        if (retenData.success==true) {
            layer.msg(retenData.message, {
                icon: 1,
                time: 2000 
            }, function () {
                Callback();
            });
        }else{
         
            layer.msg(retenData)
        }


        layer.close(layerPage01)
    })

    //删除所有柜架
    // $("#delAllFrame").click(function () { //删除所有柜架
    //     submitDataVertifyModule("确定要删除所有库房柜架、层位设置？", function () {
    //         let firstreData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
    //             XDLMCID: "9000",
    //             XDLMTID: "9204",
    //             XDLMSID: "9204027",
    //             // XDLMKFMC: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
    //             XDLMKFMC:unescape(storeCurrent)

    //         });
    //         if (firstreData.success==true) {
    //             layer.msg(firstreData.message, {
    //                 icon: 1,
    //                 time: 2000 //2秒关闭（如果不配置，默认是3秒）
    //             }, function () {
    //                 Callback();
    //             });
    //         }else{
             
    //             layer.msg(firstreData)
    //         }

    //     })
    // })

    //删除所有层
    // $("#delAllLevel").click(function () { //删除所有层
    //     submitDataVertifyModule("确定要删除所有层？", function () {
    //         let firstreData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
    //             XDLMCID: "9000",
    //             XDLMTID: "9204",
    //             XDLMSID: "9204029",
    //             // XDLMKFMC: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
    //             XDLMKFMC:unescape(storeCurrent)

    //         });
    //         if (firstreData.success) {
    //             layer.msg(firstreData.message, {
    //                 icon: 1,
    //                 time: 2000 //2秒关闭（如果不配置，默认是3秒）
    //             }, function () {
    //                 Callback();
    //             });
    //         }else{
    //             layer.msg(firstreData)
    //         }
    //     })
    // })
    //删除所有分区
    $("#delAllArea").click(function () { //删除所有分区
        submitDataVertifyModule("确定要删除所有分区？", function () {
            let firstreData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204030",
                // XDLMKFMC: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                XDLMKFMC:unescape(storeCurrent)

            });
            if (firstreData.success) {
                layer.msg(firstreData.message, {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    Callback();
                });
            }else{
                layer.msg(firstreData)
            }
        })
    })

    form.render("select")
})



//获取柜架号下拉
// function getGuiJia(kdata, type) {
//     let This_kf = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
//         XDLMCID: '1001',
//         XDLMSID: 'DYBH201908231246284628123181',
//         XDLMA: kdata,
//     });
//     if (This_kf.success == true) {
//         let data = This_kf.rows
//         getSelect("guijia", data, "柜架号", "id", "柜架号", "柜架号")//柜架号
//         getSelect("addguijiaSelect", data, "柜架号")//添加时候的柜架号下拉

//         // 给一键添加设置柜架号

//         //当前库房序号
//         if (data.length > 0) {
//             $("#CNTR").val(data[0].柜架号.substring(0, data[0].柜架号.length - 2))
//             if (type) {
//                 getCengHao(data[0]['柜架号'], type)
//             } else {
//                 getCengHao(data[0]['柜架号'], "")

//             }

//         }
//         //默认的柜层
//     }
//     form.render("select")



// }


//柜层数的获取下拉
// function getCengHao(gjdata, type) {
//     let This_kf = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
//         XDLMCID: '1001',
//         XDLMSID: 'DYBH20190823124628462826161',
//         XDLMA: unescape(storeCurrent),
//         XDLMB: gjdata
//     });
//     if (This_kf.success == true) {
//         let data = This_kf.rows


//         if (type) {
//             getSelect("ceng", data, "层号", "id")

//         } else {
//             getSelect("ceng", data, "层号", "id", "层号", "层号")//柜架号
//             getSelect("addcengSelect", data, "层号")

//         }

//         if (data.length > 0) {

//             getFengQu(data[0]['层号'], type)
//         } else {
//             getSelect("fenqu", "", "分区号", "id", "分区号", "分区号")
//         }
//         //分区下拉框   
//     }
//     form.render("select")


// }
//分区下拉框
// function getFengQu(cendata, type) {
//     let This_kf = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
//         XDLMCID: '1001',
//         XDLMSID: 'DYBH201908231246284628236171',
//         XDLMA: unescape(storeCurrent),
//         XDLMB: $('#guijia').val(),//柜架号
//         XDLMC: cendata//层号
//     });
//     if (This_kf.success == true) {

//         let data = This_kf.rows
//         // getSelect("fenqu", data, "分区号", "id", "分区号", "分区号")

//         if (type) {
//             getSelect("fenqu", data, "分区号", "id")

//         } else {
//             getSelect("fenqu", data, "分区号", "id", "分区号", "分区号")
//         }

//         if (data.length > 0) {
//             getSelect("addfenquSelect", data, "分区号")
//         }

//     }
//     form.render("select")



// }


//添加柜架
function addPageEcho() {
    var length = $("#addLayerHtml").find(".me-hide").length;
    $(".input-display").addClass("layui-hide");
    $(".select-display").removeClass("layui-hide");
    $("#addLayerHtml").find(".layui-inline").find("input").val("")
    $("#addLayerHtml").find(".layui-inline").each(function (key, value) {
        if (!$(value).hasClass("me-hide")) {
            var thisId = $(value).attr("id").replace(/^out_/, "")
            if ((6 - length) != (key * 1 + 1)) {
                if (key < 3) {
                    var selectId = thisId.replace(/^add/, "")
                }
                $("#" + thisId).val($("#" + selectId).val())
                $("#" + thisId + "Select").val($("#" + selectId).val())
            } else {
                $("#" + thisId + "Input").removeClass("layui-hide");
                $("#" + thisId + "SelectDisplay").addClass("layui-hide");

            }
            form.render("select")
        }
    })
}

//请求列表数据
function tableinsDdata() {
    cols = [
        [{
            checkbox: true,
            LAY_CHECKED: false,

        }, {
            title: '序号',
            type: 'numbers',


        },

        {
            field: '库房名',
            title: '库房名',
            align: 'center',

        },
        {
            field: '柜架号',
            title: '柜架号',

            align: 'center',

        },
        {
            field: '层号',
            title: '层号',

            align: 'center',

        },
        {
            field: '分区号',
            title: '分区号',

            align: 'center',

        },
        {
            field: '最大容量',
            title: '最大容量',

            align: 'center',
        },
        {
            field: '现容量',
            title: '现容量',
            align: 'center',

        },

        {
            title: '操作',
            width: '16%',
            fixed: "right",
            align: 'center',
            templet: function (d) {
              
                let tt = ""
               
                if (qx[0].Limit.isBJ) {
                    tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=Edit("编辑","' + d.id+'","' +d.分区号+'","'+ d.最大容量+ '")>编辑</a>';

                }
                if (qx[0].Limit.isSC) {
                    tt += ' <a class="layui-btn layui-btn-danger layui-btn-xs" onclick=Edit("删除","' + d.id + '") lay-event="del">删除</a>';
                }
                return tt;
            }


        }

        ]
    ];
    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '列表展示', cols, where, 15);

}

//下来渲染方法
// function getSelect(id, data, key, attr, attrValue, defaultValue) { //获取下拉框形式的模板
//     var select = key
//     if (attrValue) {
//         select = attrValue
//     }
//     var xmmcTemplate = "";
//     //	if($('#' + id).find("option:gt(0)").attr("value")){
//     $('#' + id).empty()
//     //	}
//     if (defaultValue) {
//         xmmcTemplate += '<option value="" id="" >请选择</option>'
//     }

//     $('#' + id).find("option:gt(0)").remove();
//     if (data.length > 0) {
//         //		data.reverse()
//         if (attr) {
//             for (var i = 0; i < data.length; i++) {

//                 xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '" attrData="' + data[i][attr] + '">' + data[i][key] + '</option>'
//             }
//         } else {
//             for (var i = 0; i < data.length; i++) {
//                 xmmcTemplate += '<option value="' + data[i][select] + '" id="' + data[i][select] + '">' + data[i][key] + '</option>'
//             }
//         }

//     }

//     $('#' + id).append(xmmcTemplate)
// }


// 删除
// Array.prototype.remove = function (val) {
//     var index = this.indexOf(val);
//     if (index > -1) {
//         this.splice(index, 1);
//     }
// };


// 请求当前库房数据
// function thiskfdata() {

//     let This_kf = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
//         XDLMCID: "1001",
//         XDLMSID: "DYBH201908231246284628130151",
//         XDLMB: unescape(storeCurrent),
//     });
//     if (This_kf.success == true) {

//         let data = This_kf.rows

//         px = data[0].序号


//     }

// }

function Callback() {
    // tableins.reload('mDataTable', {
    //     page: {
    //         limits: [15, 50, 100, 200],
    //         groups: 20,
    //         curr: 1
    //     },
    //     //page: {
    //     //    curr: 1 //重新从第 1 页开始
    //     //}
    // });

    window.location.reload()//页面刷新，下来框随之刷新，制刷新列表下拉未及时更新
}


// 删除
function Edit(eventName, mKNBH,fqh,zdrl) {
     console.log(fqh)
     console.log(zdrl)
    $("#editId").val(mKNBH)
            $("#editfenquhao").val(fqh)
            $("#editronglinag").val(zdrl)

    switch (eventName) {
        case "编辑":
          
            //SysConfig.ToolBox.openWindow('wwjcxx.html?knbh=' + mKNBH, "详细信息", $(window).width(), $(window).height());
            layerPage01 = openWindow(1, $("#editLayerHtml"), "修改", 600, 250)
            break;
    
        case "删除":
            SysConfig.SubSystemData.SYKFGL.PLSC([{ id: mKNBH }], '4000', 'DYBH201908231246284628251174', Callback);
            break;

    }
}
//弹出窗口新页面
function openWindow(type, url, title, w, h, anim) {
    let maxmin = true;
    if (title == null || title == '') {
        title = false;
        maxmin = false;
    };
    if (url == null || url == '') {
        url = "/404.html";
    };
    if (w == null || w == '') {
        w = ($(window).width() - 200);
    };
    if (h == null || h == '') {
        h = ($(window).height() - 100);
    };
    if (anim == null || anim == "") {
        anim = 5
    }
    var layerPage = layer.open({
        type: type * 1,
        area: [w + 'px', h + 'px'],
        fix: false, //不固定
        maxmin: maxmin,
        shade: 0.4,
        title: title,
        content: url,
        anim: anim,
        success: function(layero, index) {
            $(window).resize(function() {
                let layerInitWidth = $("#layui-layer-iframe" + index).width()
                var docWidth = $(document).width();
                var minWidth = layerInitWidth > docWidth ? docWidth : layerInitWidth;
                layer.style(index, {
                    top: 0,
                    width: minWidth,

                });
            });
        },
        end: function() {}

    });
    return layerPage
}


function submitDataVertifyModule(tip, callback) { 

    if (localStorage.getItem("vertifyCode") == "1") { //有验证.码的弹框提示，在index.js里做了存值
        layer.open({
            title: tip,
            type: 1,
            content: `<div id='vertifyCode' style="padding-top:15px;padding-right:30px;"></div>
		<div class="layui-layer-btn layui-layer-btn-" style="position:absolute;bottom:0px;left:55px;"><a class="layui-layer-btn0" id="confirmBtn">确定</a><a class="layui-layer-btn1">再想想</a></div>
				`, //这里content是一个普通的String
            area: ['280px', '260px'],
            success: function() {

                $('#vertifyCode').codeVerify({
                    type: 1,
                    width: '200px',
                    height: '50px',
                    fontSize: '30px',
                    codeLength: 4,
                    btnId: 'confirmBtn',
                    ready: function() {},
                    success: function() {
                        callback()
                    },
                    error: function() {
                        layer.msg('验证码不匹配！');
                        return false;
                    }
                });

            }
        });
    } else {
        layer.confirm(tip, {
                btn: ['确定', '再想想'] //按钮
            },
            function() //确定
            {
                var index000002 = layer.msg('正在提交，请稍等...', {
                    icon: 1,
                    time: 500,
                    success: function() {
                        layer.close(index000002)
                        callback()

                    }
                });
            }

        );

    }

}
