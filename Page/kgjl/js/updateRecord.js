var form, $;
var rowid = window.location.href.getQuery("id");
var modifyData = "",
    type = window.location.href.getQuery("type"),
    knbh, modifyContnet;

layui.use(['jquery', 'form'], function () {
    form = layui.form;
    $ = layui.jquery;
    echoData();
    form.on('radio(filter)', function (data) {
        if (data.value == "已修改") {
            $("#refuseReson").addClass("layui-hide")
        } else {
            $("#refuseReson").removeClass("layui-hide")
        }
    });

    //此处权限判断,无审核权限隐藏
    // $("#wwrkbc").addClass("layui-hide")

    $("#wwrkbc").click(function () { //批量入库
        let sid, sid2, kflx_;
        if(SysConfig.UserInfo.GetCookieName("kflx") == "文物"){
            sid = "DYBH20190823124628462889251"
            kflx_ = "文物"
            // sid2 = "DYBH201908231246284628211255"
        }else{
            sid = "DYBH201908231246284628202221"
            kflx_ = "拓片"
            // sid2 = "DYBH20190823124628462885225"
        }
        var reData_wwxx = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "1001",
            XDLMSID: sid,
            XDLMU: knbh
        });

        // var postData = {
        //     // XDLMCID: "6000",
        //     // XDLMSID: sid2,
        //     // XDLMID: reData_wwxx.rows[0].id,
        //     XDLM库存状态: "在库",
        //     XDLM文物库内编号: knbh
            
        // };
        var postData=[], postData_where={};
        var AddImageData = [], AddImageData_tp = [];
        var DelImageData = [];
        for (var k in modifyContnet) {
            switch (k) {
                case "增加图片":
                case "增加远景图片":
                case "增加近景图片":
                case "增加视频":
                    for (var m in modifyContnet[k]) {
                        AddImageData.push({
                            XDLM图片编号: modifyContnet[k][m].图片编号,
                            XDLM文物入库编号: modifyContnet[k][m].文物入库编号,
                            XDLM文图名称: modifyContnet[k][m].文图名称,
                            XDLM图片地址: modifyContnet[k][m].图片地址,
                            XDLM分类: modifyContnet[k][m].分类,
                            XDLM图片类型: modifyContnet[k][m].图片类型
                        });
                    }

                    break;
                
                case "增加拓片图片":
                    for (var i in modifyContnet[k]) {
                        AddImageData_tp.push({
                            XDLM图片编号: modifyContnet[k][i].图片编号,
                            XDLM文物入库编号: modifyContnet[k][i].文物入库编号,
                            XDLM文图名称: modifyContnet[k][i].文图名称,
                            XDLM图片地址: modifyContnet[k][i].图片地址,
                            XDLM分类: modifyContnet[k][i].分类,
                            XDLM图片类型: modifyContnet[k][i].图片类型,
                            XDLM长: modifyContnet[k][i].长,
                            XDLM宽: modifyContnet[k][i].宽,
                            XDLM图筒: modifyContnet[k][i].图筒
                        });
                    }

                    break;
                case "删除图片":
                    for (var n in modifyContnet[k]) {
                        DelImageData.push(modifyContnet[k][n].图片编号);
                    }
                    break;
                default:
                
                    postData_where["XDLM" + k] = modifyContnet[k].newdata;
                    // postData["XDLM" + k] = modifyContnet[k].newdata;
                    break;
            }
        }
        postData_where.XDLM库存状态 = "在库"
        postData_where.XDLM文物库内编号 = knbh
        postData.push(postData_where);
        console.log(postData);
        if ($("input[name=当前状态]:checked").val() == "已修改") {
            layer.confirm('确定同意修改吗？', {
                btn: ['确定', '再想想'] //按钮
            }, function () {
               
                //更新主表
                var rk = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                    XDLMCID: "9000",
                    XDLMTID: "9204",
                    XDLMSID: "9204033",
                    XDLMKFLX: kflx_,
                    datalist: JSON.stringify({ "key": postData})
                });
                // var rk = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", postData);
                //更新图片
                if (AddImageData.length > 0) {
                    var rk2 = SysConfig.SubSystemData.SYKFGL.BatchAddData(AddImageData, "DYBH202004141954300342000");
                }
                // 更新拓片图片，近景远景视频
                if (AddImageData_tp.length > 0) {
                    var rk2 = SysConfig.SubSystemData.SYKFGL.BatchAddData(AddImageData_tp, "DYBH202004141954300342000");
                }
                if (DelImageData.length > 0) {
                    var rk2 = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                        XDLMCID: "4001",
                        XDLMSID: "DYBH2020041419582709291708",
                        XDLMA: DelImageData.join(',')
                    });
                }
                UpdateSH();
            }, function () {

            });


        } else {
            layer.confirm('确定拒绝修改吗？', {
                btn: ['确定', '再想想'] //按钮
            }, function () {
                SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                    XDLMCID: "6000",
                    XDLMSID: "DYBH201908231246284628211255",
                    XDLMID: reData_wwxx.rows[0].id,
                    XDLM库存状态: "在库"
                });
                UpdateSH();
            }, function () {

            });
        }

    })

    //form.on('submit(submit)', function (data) {
    //    var where = { //提交申请修改表
    //        TblNum: "195",
    //        XDLMID: rowid,
    //        XDLM当前状态: data.field['XDLM当前状态'],
    //        XDLM修改人用户名: $("#修改人用户名").html(),
    //        XDLM完成修改时间: $("#完成修改时间").html(),
    //        XDLM拒绝原因: data.field['XDLM拒绝原因'],
    //        XDLM错误描述: data.field['XDLM错误描述'],
    //    },
    //        tip;

    //    if (data.field['XDLM当前状态'] == "已修改") {
    //        tip = "确定同意修改吗?"
    //    } else {
    //        tip = "确定拒绝修改吗?"
    //    }

    //    submitDataTip(tip, function () {
    //        postData("wwModifyDataById", where, function (data) {
    //            if (data.success) {
    //                if (tip == "确定同意修改吗?") {
    //                    addModifyPicture("图片地址")
    //                    if (modifyContnet['近景']) {
    //                        addModifyPicture("近景")
    //                    }
    //                    if (modifyContnet['视频']) {
    //                        addModifyPicture("视频")
    //                    }
    //                    if (modifyContnet['现状']) {
    //                        addModifyPicture("现状")
    //                    }
    //                    if (modifyContnet['拓片']) {
    //                        addModifyPicture("拓片")
    //                    }
    //                    postData("ModifyData", modifyData, function (data) { //修改文物入库登记表							
    //                        tipMsg(data, function () {
    //                            QXALL()
    //                        })
    //                    })
    //                } else {
    //                    tipMsg(data, function () {
    //                        QXALL()
    //                    })
    //                }
    //            }
    //        })
    //    })
    //    return false
    //})
    form.render()
})

function UpdateSH() {
    //更新审核表
    var postData2 = {
        XDLMCID: "6000",
        XDLMSID: "DYBH20190823124628462841205",
        XDLMID: rowid,
        XDLM当前状态: $("input[name=当前状态]:checked").val(),
        XDLM修改人用户名: SysConfig.UserInfo.GetUserName(),
        XDLM完成修改时间: SysConfig.ToolBox.CurrentDate() + " " + SysConfig.ToolBox.CurrentTime(),
        XDLM拒绝原因: $("#拒绝原因").val(),
    };
    var rk = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", postData2);
    if (rk.success) {
        layer.msg("审核完成！", {
            time: 1000,
            end: function () {
                parent.Callback();
                var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                parent.layer.close(index); //再执行关闭   
            }
        });

    }
    else {
        layer.msg("审核失败！" + rk);
    }
}

function echoData() {
    let html = "";
    if (rowid) {
        //		$("#修改人用户名").html(getCookieName("mUserName"))
        

        var reData_sxbg = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "1001",
            XDLMSID: "DYBH201908231246284628224202",
            XDLMA: rowid
        });

        if (reData_sxbg.success) {
            knbh = reData_sxbg.rows[0]['文物库内编号'];
            for (var k in reData_sxbg.rows[0]) {
                
                    $("#" + k).html(reData_sxbg.rows[0][k])
                
            }

            $("#登记名称").html(reData_sxbg.rows[0].登记名称 +"[" + reData_sxbg.rows[0].文物库内编号+"]");
            $("#修改原因").html(reData_sxbg.rows[0].错误描述);

            var testData = "质地类别_复合或组合质地_有机质|||csdsd|||csdsd西安,质地类别_复合或组合质地_无机质|||cds|||,数量|||6|||65"//第一版的编辑内容
            //获取区分拓片和文物登记表
            // if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {

                if (reData_sxbg.rows[0]['修改内容记录'].indexOf("|||") != -1) {

                    //				var lastDataArry= testData.split(",")
                    var lastDataArry = data.data[0]['修改内容记录'].split(",")

                    for (var f = 0; f < lastDataArry.length; f++) {
                        var showData = lastDataArry[f].split("|||")
                        html += `<div>修改【${showData[0]}】从<span class="modify-detail" >【${showData[1]}】</span>到
						<span class="modify-detail">【${showData[2]}】</span></div>`
                    }

                } else {
                    modifyContnet = JSON.parse(reData_sxbg.rows[0]['修改内容记录'])
                    if (modifyContnet['主图地址']) {
                        html += `
					<div class="modifyContent-content">
					<div class="pic-module">修改【主图地址】从【</div>
					<div style="" class="picture-div pic-module">	
					<img onclick="lookPic(${modifyContnet['主图地址']["olddata"]})" class="layadmin-homepage-pad-img" src="${modifyContnet['主图地址']["olddata"]}" width="48" height="48">
					</div><div class="pic-module">】到【</div>
					<div  class="picture-div pic-module">	
					<img onclick="lookPic(${modifyContnet['主图地址']["newdata"]})" class="layadmin-homepage-pad-img" src="${modifyContnet['主图地址']["newdata"]}" width="48" height="48">
					</div><div class="pic-module">】</div></div>`
                        modifyData["XDLM图片地址"] = modifyContnet['主图地址']["newdata"]; //主图地址赋值
                        delete modifyContnet['主图地址'] //删除主图地址

                    }
                    for (var k in modifyContnet) {
                        switch (k) {
                            case "图片地址":
                            case "视频":
                            case "现状":
                            case "近景":
                            case "拓片":
                                var oldpictureSplit = modifyContnet[k]['olddata'].split("|");
                                var newpictureSplit = modifyContnet[k]['newdata'].split("|");
                                html += `<div class="modifyContent-content">	<div class="pic-module">修改【${k}】从【</div>`
                                for (var i = 0; i < oldpictureSplit.length; i++) {
                                    if (oldpictureSplit[i]) {
                                        html += `<div  class="picture-div pic-module">	<img style="margin:7px" onclick="lookPic(${oldpictureSplit[i].split(',')[0]})" class="layadmin-homepage-pad-img" src="${oldpictureSplit[i].split(',')[0]}" width="48" height="48"></div>`
                                    }
                                }
                                html += `<div class="pic-module">】到【</div>`
                                for (var i = 0; i < newpictureSplit.length; i++) {
                                    if (newpictureSplit[i]) {
                                        html += `<div  class="picture-div pic-module">	<img style="margin:7px" onclick="lookPic(${newpictureSplit[i].split(',')[0]})" class="layadmin-homepage-pad-img" src="${newpictureSplit[i].split(',')[0]}" width="48" height="48"></div>`

                                    }
                                }
                                html += `<div class="pic-module">】</div></div>	`
                                if (modifyContnet["图片地址"]) {
                                    if (modifyData["XDLM图片地址"]) {
                                    } else {
                                        modifyData["XDLM图片地址"] = modifyContnet['图片地址']["newdata"].split("|")[0].split(",")[0]
                                    }
                                } else {
                                    modifyData["XDLM图片地址"] = ""; //主图地址赋值
                                }
                                break;
                            case "图片地址拓片":
                                //						modifyData["XDLM图片地址"]=modifyContnet["图片地址拓片"].newdata
                                break;
                            case "增加图片":
                           
                                addImageData = modifyContnet["增加图片"];
                                for (var x = 0; x < addImageData.length; x++) {
                                    html += `<dd><div class="modifyContent-content"><div class="pic-module">【增加图片】</div><div  id="beforePic" style="" class="picture-div pic-module">	<img onclick="lookPic(${addImageData[x].图片地址})" class="layadmin-homepage-pad-img" src="${addImageData[x].图片地址}" max-width="48" max-height="48" style="max-width: 48px;max-height: 48px;"></div></div></dd>`;
                                }
                                break;
                            case "增加远景图片":
                            case "增加近景图片":
                            case "增加拓片图片":
                            case "增加视频":
                                addImageData_tp = modifyContnet[k];
                                for (var x = 0; x < addImageData_tp.length; x++) {
                                    html += `<dd><div class="modifyContent-content"><div class="pic-module">【${k}】</div><div  id="beforePic" style="" class="picture-div pic-module">	<img onclick="lookPic(${addImageData_tp[x].图片地址})" class="layadmin-homepage-pad-img" src="${addImageData_tp[x].图片地址}" max-width="48" max-height="48" style="max-width: 48px;max-height: 48px;"></div></div></dd>`;
                                }
                                break;
                            case "删除图片":
                                delImageData = modifyContnet["删除图片"];
                                for (var y = 0; y < delImageData.length; y++) {
                                    html += `<dd><div class="modifyContent-content"><div class="pic-module">【删除图片】</div><div  id="beforePic" style="" class="picture-div pic-module">	<img onclick="lookPic(${delImageData[y].图片地址})" class="layadmin-homepage-pad-img" src="${delImageData[y].图片地址}" max-width="48" max-height="48" style="max-width: 48px;max-height: 48px;"></div></div></dd>`;
                                }
                                break;
                            default:
                                html += `<div>修改【${k}】从<span class="modify-detail" >【${modifyContnet[k]["olddata"]}】</span>到<span class="modify-detail">【${modifyContnet[k]["newdata"]}】</span></div>`
                                modifyData["XDLM" + k] = modifyContnet[k]["newdata"] ? modifyContnet[k]["newdata"] : "";
                                break;
                        }

                    }
                }

                $("#modifyContent").append(html)

            // } else {

            // }
        }

        if (type == 'finish') {
            $("#modifyReason").addClass("layui-hide")
            $("#submitBtn").addClass("layui-hide")
        } else if (type == 'refuse') {
            $("#modifyReason").addClass("layui-hide")
            $("#refuseReson").removeClass("layui-hide")
            $("#submitBtn").addClass("layui-hide")
        } else if (type == 'modifying') {
            setInterval(function () {
                $("#完成修改时间").html(SysConfig.ToolBox.CurrentDate() + " " + SysConfig.ToolBox.CurrentTime())
            }, 1000);
            $("#修改人用户名").html(SysConfig.UserInfo.GetUserName());
        }

        //请求数据
        //   postData("wwGetDataList", {
        //       TblNum: "195",
        //       T1951: "EQ" + rowid
        //   }, function (data) {
        //       knbh = data.data[0]['文物库内编号'];
        //       for (var k in data.data[0]) {
        //           if ($("#" + k).prop("tagName") == "TD") {
        //               $("#" + k).html(data.data[0][k])
        //           } else {
        //               $("#" + k).val(data.data[0][k])
        //           }
        //       }
        //       //获取表编号，区分拓片和文物登记表
        //       if (data.data[0]['文物库内编号']) {
        //           tblNum_ = postData("wwGetDataList", {
        //               TblNum: "385",
        //               T3852: "EQ" + data.data[0]['文物库内编号']
        //           }, function (data) { }, "", false).data[0]['表对应码']

        //           modifyData = {
        //               TblNum: tblNum_,
        //               XDLMWhere: " where 文物库内编号='" + data.data[0]['文物库内编号'] + "'"
        //           }
        //       }
        //       var html = "";
        //       var testData = "质地类别_复合或组合质地_有机质|||csdsd|||csdsd西安,质地类别_复合或组合质地_无机质|||cds|||,数量|||6|||65"
        //       //data.data[0]['修改内容记录'].indexOf("|||")!=-1
        //       if (data.data[0]['修改内容记录'].indexOf("|||") != -1) {

        //           //				var lastDataArry= testData.split(",")
        //           var lastDataArry = data.data[0]['修改内容记录'].split(",")

        //           for (var f = 0; f < lastDataArry.length; f++) {
        //               var showData = lastDataArry[f].split("|||")
        //               html += `<div>修改【${showData[0]}】从<span class="modify-detail" >【${showData[1]}】</span>到
        //	<span class="modify-detail">【${showData[2]}】</span></div>`
        //           }

        //       } else {
        //           modifyContnet = JSON.parse(data.data[0]['修改内容记录'])
        //           if (modifyContnet['主图地址']) {
        //               html += `
        //<div class="modifyContent-content">
        //<div class="pic-module">修改【主图地址】从【</div>
        //<div style="" class="picture-div pic-module">	
        //<img onclick="lookPic(${modifyContnet['主图地址']["olddata"]})" class="layadmin-homepage-pad-img" src="${modifyContnet['主图地址']["olddata"]}" width="48" height="48">
        //</div><div class="pic-module">】到【</div>
        //<div  class="picture-div pic-module">	
        //<img onclick="lookPic(${modifyContnet['主图地址']["newdata"]})" class="layadmin-homepage-pad-img" src="${modifyContnet['主图地址']["newdata"]}" width="48" height="48">
        //</div><div class="pic-module">】</div></div>`
        //               modifyData["XDLM图片地址"] = modifyContnet['主图地址']["newdata"]; //主图地址赋值
        //               delete modifyContnet['主图地址'] //删除主图地址

        //           }
        //           for (var k in modifyContnet) {
        //               if (k == "图片地址" || k == "视频" || k == "现状" || k == "近景" || k == "拓片") {
        //                   var oldpictureSplit = modifyContnet[k]['olddata'].split("|");
        //                   var newpictureSplit = modifyContnet[k]['newdata'].split("|");
        //                   html += `<div class="modifyContent-content">	<div class="pic-module">修改【${k}】从【</div>`
        //                   for (var i = 0; i < oldpictureSplit.length; i++) {
        //                       if (oldpictureSplit[i]) {
        //                           html += `<div  class="picture-div pic-module">	<img style="margin:7px" onclick="lookPic(${oldpictureSplit[i].split(',')[0]})" class="layadmin-homepage-pad-img" src="${oldpictureSplit[i].split(',')[0]}" width="48" height="48"></div>`
        //                       }

        //                   }

        //                   html += `<div class="pic-module">】到【</div>`

        //                   for (var i = 0; i < newpictureSplit.length; i++) {
        //                       if (newpictureSplit[i]) {
        //                           html += `<div  class="picture-div pic-module">	<img style="margin:7px" onclick="lookPic(${newpictureSplit[i].split(',')[0]})" class="layadmin-homepage-pad-img" src="${newpictureSplit[i].split(',')[0]}" width="48" height="48"></div>`

        //                       }
        //                   }
        //                   html += `<div class="pic-module">】</div></div>	`

        //                   if (modifyContnet["图片地址"]) {
        //                       if (modifyData["XDLM图片地址"]) {

        //                       } else {
        //                           modifyData["XDLM图片地址"] = modifyContnet['图片地址']["newdata"].split("|")[0].split(",")[0]
        //                       }
        //                   } else {
        //                       modifyData["XDLM图片地址"] = ""; //主图地址赋值
        //                   }
        //               } else if (k == "图片地址拓片") {
        //                   //						modifyData["XDLM图片地址"]=modifyContnet["图片地址拓片"].newdata
        //               } else {

        //                   html += `<div>修改【${k}】从<span class="modify-detail" >【${modifyContnet[k]["olddata"]}】</span>到
        //	<span class="modify-detail">【${modifyContnet[k]["newdata"]}】</span></div>`

        //                   modifyData["XDLM" + k] = modifyContnet[k]["newdata"] ? modifyContnet[k]["newdata"] : "";
        //               }

        //           }
        //       }

        //       $("#modifyContent").append(html)

        //   })
    }

}

//function addModifyPicture(k) {
//    //修改图片附图的表，将新添加的图片添加进去
//    if (modifyContnet[k]) {
//        var addPicData = modifyContnet[k]['newdata'].split("|");
//        var oldPicData = modifyContnet[k]['olddata'].split("|"); //新数据中含有旧数据	
//        var repeatflag = []; //重复的数组
//        addPicData.filter(function (n, i) {
//            if (oldPicData.indexOf(n) != -1) { //重复的数据
//                if (n) {
//                    repeatflag.push(n)
//                }
//            } else {
//                if (n) {
//                    postData("wwAddNewRow", {
//                        TblNum: "104",
//                        XDLM文物入库编号: knbh,
//                        XDLM图片地址: n.split(",")[0],
//                        XDLM文图名称: n.split(",")[1],
//                        XDLM分类: n.split(",")[2],
//                        XDLM表对应码: tblNum_

//                    }, function (data) { })
//                }
//            }
//        });
//        if (repeatflag.length == 0) { //没有重复的，证明之前的数据被删除了，或者为空
//            if (oldPicData.length > 0) { //删除全部旧数据
//                for (var i = 0; i < oldPicData.length; i++) {
//                    if (oldPicData[i]) {
//                        postData("wwDelDataByWhere", {
//                            TblNum: "104",
//                            T1043: "EQ" + oldPicData[i].split(",")[0],
//                        }, function (data) { })
//                    }
//                }
//            }
//        } else { //有重复的，个数不确定，找到重复的，删除没有重复的
//            oldPicData.filter(function (data, i) {
//                if (repeatflag.indexOf(data) == -1) {
//                    if (data) {
//                        postData("wwDelDataByWhere", {
//                            TblNum: "104",
//                            X1042: "EQ" + knbh,
//                            T1043: "EQ" + data.split(",")[0]
//                        }, function (data) { })
//                    }
//                }
//            })
//        }
//    }
//}