var uploadImg = "",
    tableins = "",
    $, layer, laydate, form, element, UploadTable, UploadTableData = [], returnEditData, addImageData = [], delImageData = [],
    type = window.location.href.getQuery("type"),
    knbh = window.location.href.getQuery("knbh"),
    print = window.location.href.getQuery("print"),
    echoDataObj, form, originalPicUrl,
    delData = ["XDLM操作类型", "XDLM记录类型", "XDLM库存状态", "XDLM移交人", "XDLM监督人", "XDLM接收人", "XDLM录入人", "XDLM记录内容", "XDLM质地类别_单一质地_无机质", "XDLM质地类别_单一质地_有机质"],
    knbh, laydate, wwid;

layui.use(['jquery', 'element', 'form', 'layer', 'laydate', 'table', 'upload'], function () {
    $ = layui.jquery;
    layer = layui.layer;
    laydate = layui.laydate;
    form = layui.form;
    upload = layui.upload;
    element = layui.element;
    UploadTable = layui.table;


    if (print == "1") { //打印返回的
        location.reload();
    }
    // 给考古机构设置默认值
    if (!knbh) {
        $("#考古发掘信息_考古机构").attr("value", localStorage.getItem("yhname"))
    }

    getndlx();  //获取年代类型

    let returnSelect = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231246284628192331",
        XDLMA: '文物级别,文物类别_范围,文物类别_具体类别,年代_纪年选项A,年代_纪年选项B,质地类别_单一质地_有机质,质地类别_单一质地_无机质,质量_范围,完残程度,保存状态,文物来源,入藏时间_范围,文物类别_具体类别,保存状态',

    });
    if (returnSelect.success) {

        for (let i = 0; i < returnSelect.rows.length; i++) {
            $('#' + returnSelect.rows[i].统计项目).append('<option value="' + returnSelect.rows[i].统计内容 + '">' + returnSelect.rows[i].统计内容 + '</option>');
        }
        $("#文物来源").val("发掘");
        $("#文物类别_范围").val("历史文物");
    }

    //上传图片
    // uploadImg = new UploadFile("filename", "filepath", "/api/kf/data");
    // uploadImg.fileupload(changefileFJ, "#showfileFJ"); //拓片
    //日期时间选择器
    //		laydate.render({
    //			elem: '#XDLM年代_具体时间'
    //		});
    laydate.render({
        elem: '#rksj'
    });
    //		laydate.render({
    //			elem: '#XDLM入藏时间_具体时间'
    //		});
    laydate.render({
        elem: '#鉴定时间'
    });
    laydate.render({
        elem: '#保管信息_入库时间',
        type: 'datetime',
        value: SysConfig.ToolBox.CurrentDate() + " " + SysConfig.ToolBox.CurrentTime()
    });




    $(window).resize(function () {
        var widthLebal = $(window).width() / 7
        $(".layui-form-label-left").css({
            "width": widthLebal + "px"
        })
    });
    //主图点击

    $("#lastImportPic").click(function () {
        var onlyPicSrc = $(this).attr("src")
        lookPic(onlyPicSrc)

    })


    //		laydate.render({
    //			elem: '#XDLM考古发掘信息_出土时间'
    //		});

    //赋值到库房名称那边



    kfDataManage.GetGuiJia();
    form.on("select(柜架号)", function (data) {
        kfDataManage.GetCengHao();
        form.render()
    })
    form.on("select(层号)", function (data) {
        kfDataManage.GetFenQu();
        form.render()
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

    form.on("select(characterType)", function (data) {
        var displayIndex = $(data.elem).find("option:selected").attr("data-value")
        $(".characterType").addClass("layui-hide")
        $(".characterType" + displayIndex).removeClass("layui-hide")
        if (data.value == "单一质地-无机质") {
            $(".characterType01").find("select").removeAttr("name")
            $(".characterType02").find("select").attr("name", "XDLM质地类别_单一质地_无机质")
        } else if (data.value == '单一质地-有机质') {
            $(".characterType02").find("select").removeAttr("name");
            $(".characterType01").find("select").attr("name", "XDLM质地类别_单一质地_有机质")
        }
    })

    // function changeTYPE(index, value){
    //     if (data.value == "单一质地-无机质") {
    //         $(".characterType01").find("select").removeAttr("name")
    //         $(".characterType02").find("select").attr("name", "XDLM质地类别_单一质地_无机质")
    //     } else if (data.value == '单一质地-有机质') {
    //         $(".characterType02").find("select").removeAttr("name");
    //         $(".characterType01").find("select").attr("name", "XDLM质地类别_单一质地_有机质")
    //     }
    // }

    form.on("select(质地类别选项)", function (data) {
        $("#质地类别机质").val(data.value);
    })


    //查看位置
    $("#checkPosition").click(function () {
        SysConfig.ToolBox.openWindow('/SYKFGL/PAGE/kfgl/page/krck.html?type=operate', "位置查看", $(window).width() - 100, $(window).height() - 100)
    })

    //设置主图
    $("#setImportPic").click(function () {
        $(".import-img").removeClass("layui-hide")
        form.render()
    })


    ////获取下拉选项
    //for (let i = 0; i < selectArry.length; i++) {
    //    postData("wwGetDataList", {
    //        TblNum: 57,
    //        T572: "EQ" + selectArry[i],
    //        orderby: "排序"
    //    }, function (data) {
    //        getSelect("XDLM" + selectArry[i], data.data, "统计内容", "", "", true)
    //        if (selectArry[i] == "文物来源") {
    //            $("#XDLM文物来源").val("发掘")
    //        }
    //        if (selectArry[i] == "文物类别_范围") {
    //            $("#XDLM文物类别_范围").val("历史文物")
    //        }

    //        form.render("select")
    //    })
    //}
    if (type == "modify") { //申请修改
        //			$("#returnBack").removeClass("layui-hide");
        $('#modifyData').removeClass("layui-hide");
        $('#申请人用户名').val(SysConfig.UserInfo.GetUserName())
        $("#supervisePerson").addClass('layui-hide')
        $("#supervisePerson").find("input").removeAttr("lay-verify")
        setInterval(function () {
            $('#申请更改时间').val(SysConfig.ToolBox.CurrentDate() + " " + SysConfig.ToolBox.CurrentTime())
        }, 1000);


        echoData();

    } else {

        $("#录入人").val(SysConfig.UserInfo.GetUserName());
        $("#库房名").val(SysConfig.UserInfo.GetCookieName("mCurrentStorage"));
        //postData("GetAutoSelectAddress", { //获取库房可用位置

        //    storage: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
        //}, function (data) {

        //    $("#availableCeng").val(data['ceng'])
        //    $("#availableFenQu").val(data['fq'])
        //    postData("wwGetDataList", {
        //        TblNum: 147,
        //        T1472: "EQ" + SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
        //        orderby: "id"
        //    }, function (data2) {
        //        if (data2.data.length > 0) {
        //            getSelect1("XDLM柜架号", data2.data, "柜架号") //填充当前select

        //            $("#XDLM柜架号").val(data['gj'])
        //            form.render("select")

        //            getCengHao($("#XDLM柜架号").val(), true) //获取层号

        //        }
        //        form.render("select")
        //    })
        //    //			form.render('select')
        //})
        var bhdata = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "9000",
            XDLMTID: "9204",
            XDLMSID: "9204010",

        });

        $("#文物库内编号").val(bhdata.data);


        $("#modifyData").find("textarea").removeAttr("lay-verify")
    }


    SetAddUpload();

    $("#returnBack").click(function () {
        window.history.go(-1);
    })

    $("#wwrkbc").click(function () {
        let zl = $('#质量_范围').val();
        var jtzl = true;
        switch (zl) {
            case "A(<0.01kg)":
                if (parseFloat($('#质量_具体质量').val()) < 0.01) {
                    jtzl = true;
                } else {
                    jtzl = false;
                }
                break;
            case "B(0.01-1kg)":
                if (parseFloat($('#质量_具体质量').val()) >= 0.01 && parseFloat($('#质量_具体质量').val()) < 1) {
                    jtzl = true;
                } else {
                    jtzl = false;
                }
                break;
            case "C(1-50kg)":
                if (parseFloat($('#质量_具体质量').val()) >= 1 && parseFloat($('#质量_具体质量').val()) <= 50) {
                    jtzl = true;
                } else {
                    jtzl = false;
                }
                break;
            case "D(50-100kg)":
                if (parseFloat($('#质量_具体质量').val()) >= 50 && parseFloat($('#质量_具体质量').val()) <= 100) {
                    jtzl = true;
                } else {
                    jtzl = false;
                }
                break;
            case "E(100-1000kg)":
                if (parseFloat($('#质量_具体质量').val()) >= 100 && parseFloat($('#质量_具体质量').val()) <= 1000) {
                    jtzl = true;
                } else {
                    jtzl = false;
                }
                break;
            case "F(>1000kg)":
                if (parseFloat($('#质量_具体质量').val()) > 1000) {
                    jtzl = true;
                } else {
                    jtzl = false;
                }
                break;
            case "":
                if ($('#质量_具体质量').val() == "") {
                    jtzl = true;
                } else {
                    jtzl = false;
                }
                break;

        }

        if ($('#登记名称').val() == '') {
            layer.msg('请填写文物名称', {
                title: '提示框',
                icon: 0,
                time: 1500
            });
        } else if (!jtzl) {
            layer.msg('具体质量不在所选质量范围内，请重新输入！', {
                title: '提示框',
                icon: 0,
                time: 2000
            });
        } else {

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
                        if (returnEditData.rows[0][echoK] != mFormJson[j]) {

                            modifyContent[echoK] = {
                                "olddata": returnEditData.rows[0][echoK],
                                "newdata": mFormJson[j]
                            }
                            if (echoK == "图片地址") {
                                html += `<dd><div class="modifyContent-content"><div class="pic-module">【修改主图】</div><div  id="beforePic" style="" class="picture-div pic-module">	<img onclick="lookPic(${returnEditData.rows[0][echoK]})" class="layadmin-homepage-pad-img" src="${mFormJson[j]}" max-width="48" max-height="48" style="max-width: 48px;max-height: 48px;"></div></div></dd>`;
                            }
                            else {
                                html += `<dd>
                               <div style="line-height:32px;">
                              <p>修改【${echoK}】从 <span class="modify-detail" style="color:red;">【${returnEditData.rows[0][echoK]}】</span>到<span class="modify-detail" style="color:green">【${mFormJson[j]}】</span></p>
                            </div> </dd>`
                            }
                        }
                    }

                }



                if (addImageData.length > 0) {
                    modifyContent["增加图片"] = [];
                    for (var x in addImageData) {
                        modifyContent["增加图片"].push(addImageData[x]);
                        html += `<dd><div class="modifyContent-content"><div class="pic-module">【增加图片】</div><div  id="beforePic" style="" class="picture-div pic-module">	<img onclick="lookPic(${addImageData[x].图片地址})" class="layadmin-homepage-pad-img" src="${addImageData[x].图片地址}" max-width="48" max-height="48" style="max-width: 48px;max-height: 48px;"></div></div></dd>`;

                    }
                }
                if (delImageData.length > 0) {
                    console.log(delImageData)
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
                }
                else {

                    $("#modifyDifference").append(html);
                    var postData = { //给后台传递的对象
                        XDLMCID: 5000,
                        XDLMSID: "DYBH201908231246284628247203",
                        XDLM申请人用户名: $("#申请人用户名").val(),
                        XDLM登记名称: $("#登记名称").val(),
                        XDLM现藏品总登记号: $("#现藏品总登记号").val(),
                        XDLM错误描述: $("#错误描述").val(),
                        XDLM申请更改时间: $("#申请更改时间").val(),
                        XDLM修改内容记录: JSON.stringify(modifyContent),
                        //XDLM当前状态: $("#当前状态").val(),
                        XDLM库房名: $("#库房名").val(),
                        XDLM当前状态: "修改中",
                        XDLM文物库内编号: knbh
                    }
                    var index002 = layer.open({
                        type: 1,
                        skin: 'layui-layer-molv', //加上边框
                        area: ['420px', '240px'], //宽高
                        content: $("#modifyDifference"),
                        btn: ['确定'], //按钮
                        area: [400 + 'px', 400 + 'px'],
                        yes: function () {
                            var rk = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", postData);
                            if (rk.success) {
                                var xgzt = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                                    XDLMCID: "6000",
                                    XDLMSID: "DYBH201908231246284628211255",
                                    XDLMID: wwid,
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
            }
            else {

                var checkStatus = UploadTable.cache.mDataTable;

                var imageList = "";
                for (var i = 0; i < checkStatus.length; i++) {
                    imageList += checkStatus[i].图片编号 + "," + checkStatus[i].图片地址 + "," + checkStatus[i].文图名称 + ",一般" + "|";
                }
                imageList = imageList.substring(0, imageList.length - 1);
                var requestData = $("#XMForm").serialize();
                requestData = requestData + "&XDLMCID=9000&XDLMTID=9204&XDLMSID=9204009&XDLM操作类型=入库&XDLM记录类型=新入库&XDLMKFLX=" + SysConfig.UserInfo.GetCookieName("kflx") + "&XDLM图片列表=" + imageList;
                //requestData = decodeURI(requestData);
                //console.log(requestData);
                var rk = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", requestData);

                if (rk.success) {

                    layer.msg("入库完成！", {
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

    //form.on("submit(wwrkbc)", function (data) {
    //    data.field.TblNum = "305";
    //    if (type) {
    //        data.field.XDLM图片地址 = uploadImg.addFileData("showfileFJ", true, "一般");
    //    } else {
    //        data.field.XDLM图片地址 = uploadImg.addFileData("showfileFJ", "", "一般");
    //    }
    //    data.field.XDLM操作类型 = '入库';
    //    data.field.XDLM记录类型 = '新入库';

    //    //有机质的判断
    //    $(".characterType").each(function (key, val) {
    //        if (!$(val).hasClass("layui-hide")) {

    //            data.field.XDLM质地类别机质 = $(val).find(".character-type").val()
    //        }
    //    })

    //    if (type == "modify") { //
    //        compareData(data.field, function (data) {
    //            submitDataTip("确定要提交修改", function (data) {
    //                //						postData("GetDataInterface", data, function(data) {
    //                //							if(data.success) {
    //                //								tipMsg(data, function() {
    //                //									//									var layer002 = layer.confirm("是否打印文物信息?", {
    //                //									//											btn: ['是', '否'] //按钮
    //                //									//										},
    //                //									//										function() //确定
    //                //									//										{
    //                //									//											//											print('printA4');
    //                //									//											layer.close(layer002)
    //                //									//											layerPage01 = openWindow(2, '../knww/page/wwjcxx.html?knbh=' + $("#XDLM文物库内编号").val() + '&type=print', "详细信息", $(window).width(), $(window).height());
    //                //									//
    //                //									//										},
    //                //									//										function() {
    //                //									//
    //                //									//									window.history.go(-1)
    //                //									QXALL()
    //                //									//										}
    //                //									//									);
    //                //
    //                //								})
    //                //
    //                //							}
    //                //
    //                //						}, "/xdData/xdDataManage.ashx", "", "XKLX=sykf")
    //                postData("wwAddNewRow", data, function (data) {
    //                    if (data.success) {
    //                        tipMsg(data, function () {
    //                            QXALL()
    //                        })
    //                    }
    //                }, "/api/kf/data")
    //            }, data)
    //        });
    //    } else {
    //        submitData(data.field, "AddRelicsStorage", "ModifyDataById")
    //    }
    //    return false
    //});
    form.render()
});




function arrayEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1.length != arr2.length) return false;
    for (var i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function compareData(data, callback) { //比较变动内容
    $("#modifyDifference").empty()
    var html = "",
        modifyContent = {} //修改记录内容
    var newpictureUrl_ = []
    var newpictureUrl = "";
    var norepeatDataArray = []
    $.each($("#showfileFJ").find("tr"), function (key, val) {
        if (key == $("#showfileFJ").find("tr").length - 1) {
            newpictureUrl += $(val).attr("newName") + "," + $(val).attr("oldName") + ",一般";
        } else {
            newpictureUrl += $(val).attr("newName") + "," + $(val).attr("oldName") + ",一般" + "|";
        }

        newpictureUrl_.push(newpictureUrl)
    })
    //判断是否相等	

    //	echoDataObj["图片地址"].split("|").filter(function(data, i) {
    var newechoArry = echoDataObj["图片地址"].split("|")
    if (newechoArry.length != newpictureUrl.split("|").length) {
        norepeatDataArray = newpictureUrl.split("|")
    } else {
        newpictureUrl.split("|").filter(function (newData, newi) {

            if (newechoArry.indexOf(newData) == -1) {
                norepeatDataArray.push(newData)
            }
        })
    }

    //	})

    if (norepeatDataArray.length > 0) {

        html += `
													<div class="modifyContent-content">

													<div class="pic-module">修改【图片地址】从【</div>
													<div  id="beforePic" style="" class="picture-div pic-module">	

														
														</div>

													<div class="pic-module">】到【</div>
													<div id="afterPic" class="picture-div pic-module">	


													</div>
													<div class="pic-module">】</div></div>`

        modifyContent['图片地址'] = {
            "olddata": echoDataObj["图片地址"],
            "newdata": newpictureUrl
        }
    }

    for (var k in data) {
        var echoK = k.replace("XDLM", ""); //原始数据的键
        if (data[k] == "" && echoDataObj[echoK] == "") { } else {
            if (data[k] != echoDataObj[echoK]) {
                if (delData.indexOf(k) == -1) {

                    html += `<dd>

		                   <div style="line-height:32px;">
		                  <p>修改【${echoK}】从 <span class="modify-detail" style="color:red;">【${echoDataObj[echoK]}】</span>到<span class="modify-detail" style="color:green">【${data[k]}】</span></p>
		                </div>
		              </dd>`

                    modifyContent[echoK] = {
                        "olddata": echoDataObj[echoK],
                        "newdata": data[k]
                    }

                }

            }

        }
    }
    //判断是不是修改主图
    var lastImportPic_ = $("#lastImportPic").attr("src") //主图赋值
    if (lastImportPic_ != originalPicUrl) {
        modifyContent["主图地址"] = {
            "olddata": originalPicUrl,
            "newdata": lastImportPic_
        }

        html += `
													<div class="modifyContent-content">
													<div class="pic-module">修改【主图地址】从【</div>
													<div   style="" class="picture-div pic-module">	
								<img onclick="lookPic(${originalPicUrl})" class="layadmin-homepage-pad-img" src="${originalPicUrl}" max-width="48" max-height="48" style="max-width: 48px;max-height: 48px;">
	
														
														</div>

													<div class="pic-module">】到【</div>
													<div  class="picture-div pic-module">	
	<img onclick="lookPic(${lastImportPic_})" class="layadmin-homepage-pad-img" src="${lastImportPic_}" width="48" height="48" style="max-width: 48px;max-height: 48px;">

													</div>
													<div class="pic-module">】</div></div>`
    }

    if ($.isEmptyObject(modifyContent)) { //修改记录内容对象为空则未做改动
        layer.msg("没有需要更新的数据")
        return false;
    }
    $("#modifyDifference").append(html);
    showPicture(echoDataObj["图片地址"], "beforePic", 48, 48) //添加原始图片
    showPicture(data['XDLM图片地址'], "afterPic", 48, 48) //添加修改后的图片
    var postData = { //给后台传递的对象
        //		XDLMCID: 5000,
        //		XDLMSID: "DYBH20190102155532553296233",
        TblNum: 195,
        XDLM申请人用户名: $("#XDLM申请人用户名").val(),
        XDLM登记名称: $("#XDLM登记名称").val(),
        XDLM现藏品总登记号: $("#XDLM现藏品总登记号").val(),
        XDLM错误描述: $("#XDLM错误描述").val(),
        XDLM申请更改时间: $("#XDLM申请更改时间").val(),
        XDLM修改内容记录: JSON.stringify(modifyContent),
        XDLM当前状态: $("#XDLM当前状态").val(),
        XDLM库房名: $("#XDLM库房名").val(),
        XDLM当前状态: "修改中",
        XDLM文物库内编号: knbh
    }
    var index002 = layer.open({
        type: 1,
        skin: 'layui-layer-molv', //加上边框
        area: ['420px', '240px'], //宽高
        content: $("#modifyDifference"),
        btn: ['确定'], //按钮
        area: [400 + 'px', 400 + 'px'],
        yes: function () {
            layer.close(index002)
            callback(postData)
        }
    });
}

function echoData() { //回显数据	

    $("#wwrkbc").html("修改");

    $('.echo-show').removeClass("layui-hide")

    returnEditData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: '1001',
        XDLMSID: 'DYBH20190823124628462889251',
        XDLMU: knbh,
    });


    if (returnEditData.success) {
        for (var k in returnEditData.rows[0]) {
            $("#" + k).val(returnEditData.rows[0][k])
        }

        // 质地类别回显
        // setTimeout(function(){
        var displayIndex = $("#质地类别").find("option:selected").attr("data-value")
        $(".characterType" + displayIndex).removeClass("layui-hide")
        $(".characterType" + displayIndex).find(".character-type").val(returnEditData.rows[0]['质地类别机质'])
        // })


        wwid = returnEditData.rows[0]['id'];
        $("#lastImportPic").attr("src", returnEditData.rows[0]['图片地址'])//主图赋值
    }

    var where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462851271",
        XDLMC: $("#文物库内编号").val(),

    };
    returnEditImageData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", where);
    if (returnEditImageData.success) {
        for (var i in returnEditImageData.rows) {
            UploadTableData.push({ 图片编号: returnEditImageData.rows[i].图片编号,  id: returnEditImageData.rows[i].id,文图名称: returnEditImageData.rows[i].文图名称, 图片地址: returnEditImageData.rows[i].图片地址, 状态: "已入库" });
        }

    }

   
    //})

}





function AddCallback(err) {
    if (err) { }
    else {
        var layer002 = layer.confirm("是否打印文物信息?", {
            btn: ['是', '否'] //按钮
        },
            function () //确定
            {
                kfshManage.ShowXQ(id, $("#XDLM文物库内编号").val());
                //layerPage01 = openWindow(2, '../knww/page/wwDetail.html?TblNum=305&knbh=' + $("#XDLM文物库内编号").val() + '&print=print&go=3&&jlls=' + escape(data.log_codes), "详细信息", $(window).width(), $(window).height());
            },
            function () {

                location.reload()
            }
        );


    }
}

function submitData(data) {
    var method = "AddRelicsStorage"
    layer.confirm('确定要' + $("#wwrkbc").html() + "？", {
        btn: ['确定', '再想想'] //按钮
    },
        function () //确定
        {
            layer.msg('正在提交，请稍等...', {
                icon: 1,
                time: 500,
                success: function () {
                    postData(method, data, function (data) {
                        layer.msg(data.message, {
                            title: '提示框',
                            icon: 1,
                            time: 800
                        }, function () {
                            if (data.msg || data.success) {
                                var layer002 = layer.confirm("是否打印文物信息?", {
                                    btn: ['是', '否'] //按钮
                                },
                                    function () //确定
                                    {
                                        layer.close(layer002)

                                        layerPage01 = openWindow(2, '../knww/page/wwDetail.html?TblNum=305&knbh=' + $("#XDLM文物库内编号").val() + '&print=print&go=3&&jlls=' + escape(data.log_codes), "详细信息", $(window).width(), $(window).height());
                                    },
                                    function () {

                                        location.reload()
                                    }
                                );

                            }
                        });

                    })

                }
            });

        }
    );

}

//function echoPositionAvailable(callback) { //回显
//    postData("GetAutoSelectAddress", {
//        storage: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
//    }, function (data) {
//        $("#XDLM柜架号").val(data['gj'])
//        $("#XDLM层号").val(data['ceng'])
//        $("#XDLM分区号").val(data['fq'])
//        form.render('select')
//    })
//}
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
        , { field: '入库状态', title: '状态', hide: true } //必须 非数据库字段，用于区分数据库数据还是新增数据
        //, { field: '文件地址', title: '状态', hide: true } //必须 可以根据不同表更改字段名，对应下方的json 也要改
        , {
            field: '',
            title: '操作',
            width: "24%",
            align: 'center',
            templet: function (d) {
                console.log(d)
                let tt = "";
                tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=setMainPhoto("' + d.图片地址 + '") lay-event="edit">设置为主图</a>';
                tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=show("' + d.图片地址 + '") lay-event="edit">查看</a>';
                tt += ' <a class="layui-btn layui-btn-danger layui-btn-xs" onclick=delfunction("' + d.图片编号 + '","' + d.id + '","' + d.文物入库编号 + '","' + d.文图名称 + '","' + d.图片地址 + '","' + d.分类 + '","' + d.图片类型 + '") >删除</a>';
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

function setMainPhoto(url) { //设置主图

    $("#图片地址").val(url);
    $("#lastImportPic").attr("src", url);
    $("#mainPhoto").removeClass("layui-hide");

}

//删除行
function delfunction(rowid,idnum ,knbh, imageName, ImagePath, imageClass, imageType) {
 


    //  SysConfig.SubSystemData.SYKFGL.PLSC([{ id: rowid }], '4000', 'DYBH201908231246284628185274', UploadTableCallback);


console.log(idnum)
    for (var i in UploadTableData) {
        if (UploadTableData[i].图片编号 == rowid) {
            var nindex = layer.confirm('确定要删除吗？', {
                btn: ['确定', '再想想'] //按钮
            }, function () {
                var index001 = layer.msg('正在删除,请稍等...', {
                    time: 0,
                    shade: 0.3,
                    success: function (index, layero) {
                        setTimeout(function () {

                            if (UploadTableData[i].状态 == "未入库")//没从数据库获取的可以直接删
                            {
                                // delete UploadTableData[i];
                                console.log(i)
                                console.log(UploadTableData)
                                UploadTableData.splice(i, 1);
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
                                UploadTableData[i].状态 = "删除待审";
                                //从数据库读取到的，调用删除数据库方法
                                // SysConfig.SubSystemData.SYKFGL.PLSC([{ id: idnum }], '4000', 'DYBH201908231246284628185274', DCallback);
    
                           
                                layer.msg('已标记删除！', {
                                    icon: 1,
                                    time: 1000
                                });
                            }

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
        addImageData.push({
            图片编号: imgbh,
            文物入库编号: $("#文物库内编号").val(),
            文图名称: res.filename,
            图片地址: res.filepath,
            分类: "一般",
            图片类型: "系统上传"
        })
        //let returnSelect = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        //    XDLMCID: "5000",
        //    XDLMSID: "DYBH20190823124628462823273",
        //    XDLM文物入库编号: $("#文物库内编号").val(),
        //    XDLM文图名称: res.filename,
        //    XDLM图片地址: res.filepath,
        //    XDLM分类: "一般",
        //    XDLM图片类型: "系统上传",

        //});
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

function lookPic(path) {
    SysConfig.ToolBox.ShowVideo("查看", path, $(window).width() - 100, $(window).height() - 100);
}

function  DCallback(){
    alert("刷新")
    // console.log("刷新")
    UploadTableCallback()

}

function getndlx(){
    let ndlx = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462812741",
        XDLMA: "年代类型"
    });
    if(ndlx.success){
        $('#年代_类型').empty();
        if(ndlx.rows.length > 0){
            for(var i in ndlx.rows){
                $('#年代_类型').append(`<option value="${ndlx.rows[i].sysvalue}">${ndlx.rows[i].sysvalue}</option>`);
            }
        }
    }
}
