var editId = window.location.href.getQuery("knbh");
type = window.location.href.getQuery('type'),
    check = window.location.href.getQuery('check');
var loading, newrk = window.location.href.getQuery('newrk')
var pictuer = 0
var go = window.location.href.getQuery("go");




layui.use(['element', 'table', 'layer', 'form'], function () {
    if (check == 1) { //所有库房文物查看详情
        $('#printWord').hide();
    }
    //loading = layer.load(); //换了种风格
    if (type == "print") {
        $(".no-print").addClass("layui-hide")
    }
    //      $("#pageTitle3").html(getCookieName("mCurrentStorage") + "入库登记表")
    echoData();
    // layer.close(loading);
    $("#modifyWWLB").click(function () {
        self.window.location.href = "../../crkgl/xrkww.html?type=modify&knbh=" + editId
    })


    $(".moveA4").removeClass("layui-hide");
    $(".A4dayin").addClass("layui-hide");
    $("#printBtn").click(function () {
        $(".A4dayin").removeClass("layui-hide");
        $(".moveA4").addClass("layui-hide");
        $(".no-print").addClass("layui-hide");
        // window.print(); //打
        var tata = document.execCommand("print");//打印当前页面
        // window.print();
        if (tata) {
            $(".no-print").removeClass("layui-hide");
            $(".moveA4").removeClass("layui-hide");
            $(".A4dayin").addClass("layui-hide");
        }


    })


    $("#printBtnA5").click(function () {
        self.window.location.href = "./printA5.html?knbh=" + editId
    })
    $("#printWord").click(function () {
        postData("SaveWord", {
            XDLMID: $("#rk文物库内编号").html()

        }, function (returnData) {
            if (returnData.success || returnData.msg) {
                layer.msg('导出完成', {
                    time: 500,
                    icon: 1
                }, function () {
                    layer.closeAll();
                    window.location = returnData.FilePath;

                });

            } else {
                layer.msg(returnData, {
                    icon: 0,
                    time: 2000
                });

            }
        });

    })
})


function echoData() { //回显数据	
    if (editId) {
        $("#ckxq").html("详情") //请求数据
        if (SysConfig.UserInfo.GetCookieName("kflx") == "文物") {
            //获取文物列表
            wwxx = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "1001",
                XDLMSID: "DYBH20190823124628462889251",
                // XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                XDLMU: editId
            });
        }
        else {
            //获取拓片列表
            wwxx = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "1001",
                XDLMSID: "DYBH201908231246284628202221",
                // XDLMA: SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
                XDLMU: editId
            });
        }

        if (wwxx.success) {

            if (wwxx.rows[0]['库存状态'] != "在库") {
                $("#modifyWWLB").addClass("layui-hide");
            }
            for (var k in wwxx.rows[0]) {
                $("#XDLM" + k).html(wwxx.rows[0][k]);
            }
            if (wwxx.rows[0]['经度'] && wwxx.rows[0]['纬度'] && wwxx.rows[0]['高度']) {

            } else {
                $(".gps-display").html("")
            }
            if (wwxx.rows[0]['质地类别'] == "单一质地-有机质") {
                $("#zhilileibie").html(wwxx.rows[0]['质地类别_单一质地_有机质'])
            } else if (wwxx.rows[0]['质地类别'] == "单一质地-无机质") {

                $("#zhilileibie").html(wwxx.rows[0]['质地类别_单一质地_无机质'])
            } else if (wwxx.rows[0]['质地类别'] == "复合或组合质地") {
                $("#zhilileibie").html(wwxx.rows[0]['质地类别_复合或组合质地_有机质'])
            }
        }
        var wwImage = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823124628462851271",
            XDLMC: editId,

        });

        if (wwImage.success) {
            if (wwImage.rows.length > 0) {
                var htmlpic = ""
                for (var i = 0; i < wwImage.rows.length; i++) {
                    showPicture(wwImage.rows[i]['图片地址'], "picBody") //获取图片
                    htmlpic += '<div class="swiper-slide" style="background-image:url(' + wwImage.rows[i]['图片地址'] + ')"></div>'
                }
                $("#swiperone").append(htmlpic)
                $("#swipertwo").append(htmlpic)

                var galleryThumbs = new Swiper('.gallery-thumbs', {
                    spaceBetween: 10,
                    slidesPerView: 4,
                    freeMode: true,
                    watchSlidesVisibility: true,
                    watchSlidesProgress: true,
                })
                var galleryTop = new Swiper('.gallery-top', {
                    spaceBetween: 10,
                    // loop: true,
                    // loopedSlides: 5, 
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    thumbs: {
                        swiper: galleryThumbs,
                    },
                });


            } else {
         
                    
                // showPicture(wwImage.rows[0]['图片地址'], "picBody") //获取图片

                
            }
        }

        $("#picture").attr("src", wwxx.rows[0]['图片地址'])

        let wwxx_jilu = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "1001",
            XDLMSID: "DYBH20190823124628462810231",
            XDLMC: editId
        });
        if (wwxx_jilu.success) {

            var html = "";
            var liushuiNumArry = []
            for (var i = 0; i < wwxx_jilu.rows.length; i++) {
                if (wwxx_jilu.rows[i]['记录类型'] == "新入库" || wwxx_jilu.rows[i]['记录类型'] == "移库") {
                    for (var k in wwxx_jilu.rows[i]) {

                        $("#rk" + k).html(wwxx_jilu.rows[i][k])

                    }

                }

                // 获取文物变更附图
                let wwjl_img = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH20190823124628462861241",
                    XDLMA: wwxx_jilu.rows[i].记录表流水号,
                    page: 1,
                    rows: 1
                });
                let wwimg, jllsbh;
                if(wwjl_img.success){
                    if(wwjl_img.rows.length > 0){
                        wwimg = wwjl_img.rows[0].图片地址;
                        jllsbh = wwjl_img.rows[0].记录表流水号;
                    }
                }
                //  <td ><img class="img-list" id="${wwxx_jilu.rows[i]['记录表流水号'].replace(/\(/g, "").replace(/\)/g, "")}" onclick=lookPic("${wwxx_jilu.rows[i]['记录图']}") src="${wwxx_jilu.rows[i]['记录图'].split(",")[0]}") alt="" /></td>
                html += `<tr id="${wwxx_jilu.rows[i].id}">
                            <td>
                                <img id="${jllsbh}" src="${wwimg}" alt="">
                            </td>
                            <td id="库房名">${wwxx_jilu.rows[i]['库房名']}</td>
                            <td id="记录时间">${wwxx_jilu.rows[i]['记录时间']}</td>
                            <td id="记录类型">${wwxx_jilu.rows[i]['记录类型']}</td>
                            <td>${wwxx_jilu.rows[i]['出库去向']}</td>
                            <td>${wwxx_jilu.rows[i]['录入人']}</td>
                            <td id="监督人">${wwxx_jilu.rows[i]['监督人']}</td>
                            <td id="移交人">${wwxx_jilu.rows[i]['移交人']}</td>
                            <td>${wwxx_jilu.rows[i]['接收人']}</td>
                            <td>${wwxx_jilu.rows[i]['审核状态']}</td>
                        </tr>`;
                liushuiNumArry.push(wwxx_jilu.rows[i]['记录表流水号'])
            }

            $("#recordList").append(html)
        }

        if (check !== "1") {
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
            
        }

        // 三维
        let wwxx_3d = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "1001",
            XDLMSID: "DYBH201908231246284628101191",
            XDLMA: editId
        });
        if (wwxx_3d.success) {
            var html = ""
            var htmltable = ""
            for (var i = 0; i < wwxx_3d.rows.length; i++) {
                htmltable = `<tr><td>` + wwxx_3d.rows[i]['三维名称'] + `</td><td>` + wwxx_3d.rows[i]['登记名称'] + `</td><td>` + wwxx_3d.rows[i]['库房名'] + `</td><td>` + wwxx_3d.rows[i]['文物库内编号'] + `</td><td ><span style="color: blue;cursor: pointer;" 	onclick="seethreeD('${wwxx_3d.rows[i]['文件地址']}','${wwxx_3d.rows[i]['id']}')">查看</span></td></tr>`
            }
            $("#three3DTable").append(htmltable)
        }

        var QRCodeImg = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
            XDLMCID: "9000",
            XDLMTID: "9204",
            XDLMSID: "9204003",
            XDLMKFLX: SysConfig.UserInfo.GetCookieName("kflx"),
            XDLM文物库内编号: editId

        });
        debugger;
        if (typeof (QRCodeImg) == "string") {
            layer.msg(QRCodeImg);
        }

        if (newrk == "newrk") {
            $("#newrkDisplay").removeClass("layui-hide")
            //SetQRurl(data.data[0]['文物库内编号'], "detail", "qrcode2", "qrimage2")
            $("#qrimage2").attr("src", QRCodeImg.data)
        } else {
            $("#basicDisplay").removeClass("layui-hide")
            //SetQRurl(data.data[0]['文物库内编号'], "detail")
            $("#qrimage").attr("src", QRCodeImg.data)
        }
        if (type == "print") {
            setTimeout(function () {
                var tata = document.execCommand("print");
                if (tata) {
                    $(".no-print").addClass("layui-hide");
                    if (go == "1") {
                        QXALL()
                    } else if (go == "2") {

                        QXALL()
                        parent.QXALL()
                    }

                }
            }, 2000)

        }


        layer.close(loading)

     

    }
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

// 查看3D
function seethreeD(address, idthree) {

    layer.open({
        type: 1,
        area: ['600px', '350px'],
        content: `<div class="layui-card-body layuiadmin-card-list three-3D" id="three3D"><div class="three3D-module"><i class="me-icon" onclick="httpOrFlv('${address}','${idthree}')"></i>
        <iframe  src="${address}" ></iframe>
        </div></div>`
    });
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
                    html += `<div class="imgDiv" style="cursor: pointer;float:left;width:128px;height:128px;">
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