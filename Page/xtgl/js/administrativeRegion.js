var form, treetable, tree, tableSelect;
var proviceCode, cityCode, areaCode, townCode;
var tableins = "";

var addType = "", tableins;

layui.config({
    base: '../../layuiadmin/layui/' //静态资源所在路径
}).extend({
    tableSelect: 'lay/modules/tableSelect' //主入口模块
});
layui.use(['form', 'table', 'tableSelect'], function () {
    form = layui.form;
    treetable = layui.treetable;
    tableSelect = layui.tableSelect;
    tableins = layui.table
    getProvice("-1", "省", "市", false);

    qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("行政区设置");
    console.log(qx)

    if (!qx[0].Limit.isBJ) {
        $("#provice").addClass("layui-hide")

    }
    where = {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462813401"

    }
    var cols = [
        [
            {
            type: 'checkbox'
        },
         {
            title: '序号',
            type: 'numbers',
 
        }, 
        {
            field: '分类名',
            title: '名称',
      
            align: 'center'

        },
        {
            field: '分类id',
            title: '行政区码',
     
            align: 'center'

        },
        {
            field: '操作',
            title: '操作',
       
            align: 'center',
            templet: function (d) {
                let tt = "";
                if (qx[0].Limit.isBJ) {
                    tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=addtj("' + d.父类id + '") lay-event="edit">添加同级行政区</a>'
                    tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=add("' + d.分类名 + '","' + d.分类id + '") lay-event="edit">添加下属行政区</a>'
                    tt += '<a class="layui-btn layui-btn-xs layui-btn-green1" onclick=edit("' + d.id + '","' + d.父类id + '","' + d.分类名 + '","' + d.分类id + '") lay-event="edit">编辑</a>'
                  }
                  if (qx[0].Limit.isSC) {
                                 
                tt += ' <a class="layui-btn layui-btn-danger layui-btn-xs" onclick=del("' + d.id + '","' + d.分类id + '") lay-event="del">删除</a>'
                  }
            
                return tt;
            }
        }
        ]
    ];

 
    tableins = SysConfig.SubSystemData.SYKFGL.SetDataTable(tableins, '文物列表', cols, where, 15);

    form.on("select(省)", function (data) {
        where['XDLMB']=""
        where.XDLMA = data.value;
        tableins.reload('mDataTable', {
            where: where
        })
        getCity(data.value);
    })
    form.on("select(市)", function (data) {
        where['XDLMB']=""
        where.XDLMA = data.value;
        tableins.reload('mDataTable', {
            where: where
        })
        getDistrict(data.value, "县", "乡")
    })
    form.on("select(县)", function (data) {
        where['XDLMB']=""
        where.XDLMA = data.value;
        tableins.reload('mDataTable', {
            where: where
        })
        getCountry(data.value, "乡", "村")


    })
    form.on("select(乡镇)", function (data) { //村
        
        where['XDLMB']=""
        where.XDLMA = data.value;
       
        tableins.reload('mDataTable', {
            where: where
        })
        getVillage(data.value, "村", "镇")
    })

    //村委会
    form.on("select(村)", function (data) { //村
        console.log(($('#村 option:selected').text()))
        // $("#领用后使用人id option:selected").text()
       
       console.log( data.value)
        where.XDLMB =$('#村 option:selected').text();
        tableins.reload('mDataTable', {
            where: where
        })
     
    })


    //


    form.on("select(provice1)", function (data) {
        var code = $(data.elem[data.elem.selectedIndex]).attr("dataid");

        getCity(data.value, "citySelect", "districtSelect", true)
    })
    form.on("select(city1)", function (data) {
        var code = $(data.elem[data.elem.selectedIndex]).attr("dataid");

        getDistrict(data.value, "districtSelect", "", true)
    })


    //添加

    $(".add-btn").click(function () {
      
        $("#addsubmit").html("增加")
      
    
        $("#父类名").val("省")
        $("#父类id").val("-1")
     
         layerPage01 = SysConfig.ToolBox.openWindowByDIV($("#addLayerHtml"), '增加', 543, 287);
    })
   

    $('#addsubmit').click(function () {

        if($('#本级名称').val() == ""){
            layer.msg("请输入名称",{
                icon:0,
                time: 1500
            })
        }else{
            if ($("#addsubmit").html() == "修改") {

                SysConfig.SubSystemData.SYKFGL.EditData('#addLayerHtml', 'GetDataInterface', '&XDLMCID=6000&XDLMSID=DYBH20190823124628462818805&XDLMID=' + $("#editid").val(), Callback);
               
            }else if("增加"){
                SysConfig.SubSystemData.SYKFGL.AddNewData('#addLayerHtml', 'GetDataInterface', "&XDLMCID=5000&XDLMSID=DYBH2019082312462846281203", Callback);
    
            }
            else {
    
                SysConfig.SubSystemData.SYKFGL.AddNewData('#addLayerHtml', 'GetDataInterface', "&XDLMCID=5000&XDLMSID=DYBH2019082312462846281203", Callback);
                
            }
        }
        
      
    });
 
 

})
 
//
//获取城市联动
function getXZQ(code) {
    return SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH20190823124628462813401",
        XDLMA: code,
    });
}
//获取城市联动
function getProvice(code, id, child, flag) {
    let returnData = getXZQ(code);
    if (returnData.success) {
        $("#" + id).empty()
        if (flag) { //没有全部
            $("#" + id).append(getSelectHtml2(returnData.rows))
        } else {
            $("#" + id).append(getSelectHtml(returnData.rows))
        }
        getCity(returnData.rows[0].分类id, child, flag);
        form.render("select")
    }

}

function getCity(code, id, child, flag) { //获取省

    let returnData = getXZQ(code);
    if (returnData.success) {
        $("#市").empty()
        if (flag) { //没有全部
            $("#市").append(getSelectHtml2(returnData.rows))
        } else {
            $("#市").append(getSelectHtml(returnData.rows))
        }
        getDistrict(returnData.rows[0].分类id, child, flag);
        form.render("select")
    }
}

function getDistrict(code, id, child, flag) { //获取省

    let returnData = getXZQ(code);
    if (returnData.success) {
        $("#县").empty()
        if (flag) { //没有全部
            $("#县").append(getSelectHtml2(returnData.rows))
        } else {
            $("#县").append(getSelectHtml(returnData.rows))
        }
        getCountry(returnData.rows[0].分类id, child, flag);
        form.render("select")
    }

}

function getCountry(code, id, child, flag) { //获取省
    let returnData = getXZQ(code);
    if (returnData.success) {
        $("#乡镇").empty()
        if (flag) { //没有全部
            $("#乡镇").append(getSelectHtml2(returnData.rows))
        } else {
            $("#乡镇").append(getSelectHtml(returnData.rows))
        }
        getVillage(returnData.rows[0].分类id, child, flag);
        form.render("select")
    }

}

function getVillage(code, id, flag) {

    let returnData = getXZQ(code);

    if (returnData.success) {
        $("#村").empty()
        if (flag) { //没有全部
            $("#村").append(getSelectHtml2(returnData.rows))
        } else {
            $("#村").append(getSelectHtml(returnData.rows))
        }

        form.render("select")
    }
}
 

function getSelectHtml(data) {
    var html = "<option value='-1'>全部</option>"
    for (var i = 0; i < data.length; i++) {
        html += `<option value="${data[i].分类id}" dataId="${data[i].分类id}" area_code="${data[i].分类id}">${data[i].分类名}</option>`
    }
    return html
}


function getSelectHtml2(data) {
    var html = ""
    for (var i = 0; i < data.length; i++) {
        html += `<option value="${data[i].分类id}" dataId="${data[i].分类id}" area_code="${data[i].分类id}">${data[i].分类名}</option>`
    }
    return html
}


function addtj(flid) {
    $("#ff").hide();
   
    $("#父类id").val(flid);
    $("#本级id").val(flid + "0000");
    $('#本级名称').val("");

    SysConfig.ToolBox.openWindowByDIV($("#addLayerHtml"), '添加', 543, 287);
}

function add(name,flid) {
    $("#ff").show();
    $("#父类名").val(name);
    $("#父类id").val(flid);
    $("#本级id").val(flid+"0000");
    $('#本级名称').val("");
    
    SysConfig.ToolBox.openWindowByDIV($("#addLayerHtml"), '添加', 543, 287);
}

function edit(rowid,fid, mname, mid) {
    
    $("#editid").val(rowid);

    if (getXZQ(mid).rows.length > 0) {
        layer.msg("当前行政区包含下级行政区，不可修改行政区编号！", {
            end: function () {
                $("#本级id").attr({ "readOnly": true });
                $("#父类id").val(fid);
                $("#ff").hide();
                $("#本级名称").val(mname);
                $("#本级id").val(mid);
                $("#addsubmit").html("修改");
                SysConfig.ToolBox.openWindowByDIV($("#addLayerHtml"), '修改', 543, 287);
            }
        });
     
    }
    else {
        $("#本级id").attr({ "readOnly": false });
        $("#父类id").val(fid);
        $("#ff").hide();
        $("#本级名称").val(mname);
        $("#本级id").val(mid);
        $("#addsubmit").html("修改");
        SysConfig.ToolBox.openWindowByDIV($("#addLayerHtml"), '修改', 543, 287);
    }
    
    
}
 

function del(rowid, mid) {
    if (getXZQ(mid).rows.length > 0) {
        layer.msg("当前行政区包含下级行政区，不可删除！");
    }
    else {
        SysConfig.SubSystemData.SYKFGL.PLSC([{ id: rowid }], '4000', 'DYBH20190823124628462817904', Callback);
    }
}

function Callback() {
    
    // tableins.reload('mDataTable', {
    //     page: {
    //         limits: [15, 50, 100, 300, 500],
    //         groups: 20,
    //         curr: 1
    //     },
    //     //page: {
    //     //    curr: 1 //重新从第 1 页开始
    //     //}
    // });
    window.location.reload()
    layer.closeAll();

}

// echoAdressData=['省','市','县']
// function echoAdress(code, id, index) { //回显省市区的闭包
// 	postData("wwGetDataList", {
// 		TblNum: 389,
// 		T3895: "EQ" + code,
// 		orderby: "id "
// 	}, function(returnData) {
// 		if(returnData.success) {
// 			$("#" + id[index]).empty()
// 			$("#" + id[index]).append(getSelectHtml2(returnData.data))
// //			var newcode = $("#" + id[index]).find("option:selected").attr("dataId")
			
			
// 			form.render("select")


// 			$("#" + id[index]).val($("#"+echoAdressData[index]).val())
// 			var newcode = $("#" + id[index]).find("option:selected").attr("dataid")
// 			form.render("select")
// 			index++
// 			if(index < id.length) {
// 				echoAdress(newcode, id, index)
// 			}
// 		}
// 	})
// }