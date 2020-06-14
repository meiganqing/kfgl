var form, laypage, loading, layerPage01, where;

$(function () {
    layui.use(['form', 'laypage'], function () {
        form = layui.form;
        laypage = layui.laypage;
        loading = layer.load(); //换了种风格


        // 库房列表
        kflb()
        // 权限设置
        qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("库房设置");
        console.log(qx)

        if (!qx[0].Limit.isBJ) {
            $("#addStore").addClass("layui-hide")
            $(".editkfsortonly").addClass("layui-hide")//修改

        }
        if (!qx[0].Limit.isSC) {

            $(".kfdelet").addClass("layui-hide")//修改

        }
        //


        //添加库房start
        $("#addStore").click(function () {
            layerPage01 = openWindow(1, $("#addLayerHtml"), "添加库房", 600, 350)
            addPageTableNum = "162"
        })

        $("#addsubmit").click(function () {

            // 库房名字验证是否重复
            let ycData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface",
                {
                    XDLMCID: "1001",
                    XDLMSID: "DYBH201908231246284628130151",
                    XDLMB: $("#storageType").val(),
                    XDLMB: $("#addstore").val()
                }
            );
            if (ycData.success == true) {
                if (ycData.rows.length > 0) {
                    layer.msg('库房不可重复添加');

                } else {
                    //添加
                    let addwhere = {
                        XDLMCID: "5000",
                        XDLMSID: "DYBH20190823124628462867153",
                        XDLM库房名: $("#addstore").val(),
                        XDLM分类: $("#storageType").val(),
                        XDLM过道位置: $("#aisle").val(),
                        XDLM每行柜架数: $("#columnNum").val(),
                        XDLM序号: $("#storageSort").val()
                    }
                    let ruquerData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface",
                        addwhere
                    );



                    if (ruquerData.success == true) {

                        let addkfname = {
                            XDLMCID: '5000',
                            XDLMitemNum: SysConfig.ToolBox.getTimeAndRandom(),
                            XDLMSID: 'DYBH20190823102601261157143',
                            XDLMxmbh: "sykf",
                            XDLMitemlm: "库房",
                            XDLMitemname: $("#addstore").val()//子栏目名称

                        }

                        //向安防系统新增添加库房列表
                        let kfaddname = SysConfig.SubSystemData.SYYHGL.PostData('GetDataInterface', addkfname);
                        if (kfaddname.success == true) {
                            layer.msg(ruquerData.message, { icon: 1, time: 800 }, function () {
                                layer.close(layerPage01)//关闭添加弹窗
                                window.location.reload()

                            });

                        }


                    } else {
                        layer.msg(ruquerData)

                    }

                }

            } else {
                layer.msg(ycData)

            }



        })



        form.on('radio(paixuevent)', function (data) {
            console.log(data.value)
            where.orderby = data.value
            kflb()
        });


        //修改库房排序——确认
        form.on("submit(xgpx)", function (data) {
            let redata_krjc = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", data.field);
            if (redata_krjc.success == true) {


                // 修改安防里面的数据名称
                // let addkfname={
                //     XDLMCID:'6000',
                //     XDLMID:$("#kfdhid").val(),
                //     XDLMitemNum:SysConfig.ToolBox.getTimeAndRandom(),
                //     XDLMSID:'w3333',
                //     XDLMxmbh:"sykf",
                //     XDLMitemlm:"库房",
                //     XDLMitemname:$("#pxkfname").val()//子栏目名称

                // }

                // //向安防系统新增添加库房列表
                // let kfxgname=SysConfig.SubSystemData.SYYHGL.PostData('GetDataInterface',addkfname);
                //  if (kfxgname.success == true) {
                //     layer.msg(kfxgname.message, { icon: 1, time: 800 }, function () {
                //         layer.close(layerPage01)//关闭添加弹窗
                //         window.location.reload()

                //     });

                //  }


                //

                layer.msg(redata_krjc.message, {
                    icon: 1,
                    time: 2000
                }, function () {
                    layer.close(layerPage01)
                    window.location.reload()


                });

            } else {
                layer.msg(redata_krjc.message)
            }
        })

    })



})

function kflb() {
    var reData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231246284628130151",
        page: '1',
        rows: '20'

    });
    if (reData.success == true) {
        if (reData.rows.length > 0) {
            let data = reData.rows
            $("#storageSort").val(reData.total * 1 + 1)//库房排序
            getTemplate(data, "storeContent")
            laypage.render({
                elem: 'demo0',
                count: reData.total, //数据总数
                limit: 20,
                jump: function (obj, first) {
                    console.log(first)
                    //首次不执行
                    if (!first) {
                        //do something
                        loading = layer.load(); //换了种风格
                        let firstreData = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                            XDLMCID: "1001",
                            XDLMSID: "DYBH201908231246284628130151",
                            page: obj.curr,
                            rows: 20
                        });
                        if (firstreData.success == true) {
                            getTemplate(firstreData.rows, "storeContent")
                        }


                    }

                }
            });

        }



    } else {
        layer.msg(reData.message)
    }


}

//修改库房排序弹框
function editkfsort(rowid, name, px, gjs, gds, wwfl) {

    $("#kfdhid").val(rowid)//id值
    $("#pxkfname").val(unescape(name))//库房名字
    $("#pxkfpx").val(px)//库房排序
    $("#gjs").val(gjs)//柜架子数
    $("#gds").val(gds)//库房过道数
    $("#wwfl").val(wwfl)//文物分类
    form.render()
    layerPage01 = openWindow(1, $("#editkfsortHtml"), "修改库房自定义排序", 600, 350)
}

// 删除库房
function kfdelet(namekf, rowid) {

    // 删除库房前检测库房下是否存在柜架，层，分区数据
    let redata_krjc = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: '1001',
        XDLMSID: 'DYBH2020042014391806591604',
        XDLMA: unescape(namekf)
    });
    if (redata_krjc.success == true) {

        if (redata_krjc.rows.length > 0) {
            layer.msg("库房内存在数据，请先删除库房数据")

        } else {
            SysConfig.SubSystemData.SYKFGL.PLSC([{ id: rowid }], '4000', 'DYBH201908231246284628154154', Callback);

            // SysConfig.SubSystemData.SYYHGL.PLSC([{ id: rowid }], '4000', 'DYBH20190823102601261214142');//删除安防里面数据

        }

    } else {
        layer.msg(redata_krjc)
    }


}
//列表库房循环
function getTemplate(data, id) {

    $("#" + id).empty()
    $("#" + id).html("")
    var html = "";
    for (var i = 0; i < data.length; i++) {
        html += `<li class="layui-col-xs3" style="position:relative;" >
        <span id="kfdelet" 
        class="kfdelet"
        onclick="kfdelet('${escape(data[i]['库房名'])}','${data[i]['id']}')"
         style=" color: black;
        position: absolute;
        top: 4px;
        right: 10px;
        cursor: pointer;
        font-size: 20px;
        z-index: 5;
        border-radius: 50%;;" >×</span>  
         
        <button class="layui-btn layui-btn-xs layui-btn-primary editkfsortonly"   style="position:absolute; bottom:10px;
        right: 10px;z-index: 5;"id="editkfsort"  onclick="editkfsort('${data[i]['id']}','${escape(data[i]['库房名'])}','${data[i]['序号']}','${data[i]['每行柜架数']}','${data[i]['过道位置']}','${data[i]['分类']}')" >修改</button>
					<a href="./kfsz_gj.html?store=${escape(data[i]['库房名'])}&px=${data[i]['序号']}&rowid=${data[i]['id']}">
					<!--<a href="./kfsz2.html?limit=SY201811280937593759247&store=${escape(data[i]['库房名'])}&px=${data[i]['序号']}&rowid=${data[i]['id']}">-->
                    <div class="module">
							<i class=" store-icon"></i>
							<div class="module-right">
								<p class="store-name">${data[i]['库房名']}</p>
							</div>
						</div>
					</a>
				</li>`
    }
    $("#" + id).append(html)
    layer.close(loading)
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
        success: function (layero, index) {
            $(window).resize(function () {
                let layerInitWidth = $("#layui-layer-iframe" + index).width()
                var docWidth = $(document).width();
                var minWidth = layerInitWidth > docWidth ? docWidth : layerInitWidth;
                layer.style(index, {
                    top: 0,
                    width: minWidth,

                });
            });
        },
        end: function () { }

    });
    return layerPage
}


function Callback() {
    layer.close(layerPage01)
    window.location.reload()
}

function CallbackAF() {

}