
layui.use(["form"], function () {
    var form = layui.form;

   
    getBH();

    qx = SysConfig.SubSystemData.SYKFGL.GetUserAuthority("系统设置");
    console.log(qx)

    if (!qx[0].Limit.isBJ) {
        $(".bjbutton").addClass("layui-hide")

    }
    if (!qx[0].Limit.isSC) {
        $(".scbutton").addClass("layui-hide")

    }

    //清空所有系统日志记录
    $("#clearXTRZ").click(function () {
        submitDataVertifyPassword("关键操作，必须验证密码", function () {
            let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204013",
            });
            if (data.success) {
                layer.msg("操作成功")
            } else {
                layer.msg("操作失败")
            }

        })
    });

    //清空文物变更记录
    $("#clearWWBGJL").click(function () {
        submitDataVertifyPassword("关键操作，必须验证密码", function () {
            let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204014",
            });
            if (data.success) {
                layer.msg("操作成功")
            } else {
                layer.msg("操作失败")
            }
        })
    });

    //清除图筒编号列表
    $("#clearTTLB").click(function () {
        submitDataVertifyPassword("关键操作，必须验证密码", function () {
 
            let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204015",
            });
            if (data.success) {
                layer.msg("操作成功")
            } else {
                layer.msg("操作失败")
            }
        })
    });

    //清空申请属性变更
    $("#clearWWSQSXBG").click(function () {
        submitDataVertifyPassword("关键操作，必须验证密码", function () {
 
            let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204016",
            });
            if (data.success) {
                layer.msg("操作成功")
            } else {
                layer.msg("操作失败")
            }
        })
    });

    //清空数据库文物列表
    $("#clearWWLB").click(function () {
        submitDataVertifyPassword("关键操作，必须验证密码", function () {
 
            let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204017",
            });
            if (data.success) {
                layer.msg("操作成功")
            } else {
                layer.msg("操作失败")
            }
        })
    });

    //清空行政区文物编号
    $("#clearXZQMBH").click(function () {
        submitDataVertifyPassword("关键操作，必须验证密码", function () {
 
            let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204018",
            });
            if (data.success) {
                layer.msg("操作成功")
            } else {
                layer.msg("操作失败")
            }
        })
    });

    //初始化行政区码
    $("#initXZQMBH").click(function () {
        submitDataVertifyPassword("关键操作，必须验证密码", function () {
 
            let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204019",
            });
            if (data.success) {
                layer.msg("操作成功")
            } else {
                layer.msg("操作失败")
            }
        })
    });

    //初始化图筒编号
    $("#initTubesCode").click(function () {
        submitDataVertifyPassword("关键操作，必须验证密码", function () {
            let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204020",
            });
            if (data.success) {
                layer.msg("操作成功")
            } else {
                layer.msg("操作失败")
            }
        })
    });

    //所有文物设置为在库状态
    $("#reinstallStatusZK").click(function () {
        submitDataVertifyPassword("关键操作，必须验证密码", function () {
            let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204021",
                XDLMKFNAME: SysConfig.UserInfo.GetCookieName("mCurrentStorage")
            });
            if (data.success) {
                layer.msg("操作成功")
            } else {
                layer.msg("操作失败")
            }
            
        })
    });

    //所有重设库内编号
    $("#reinstallKNBH").click(function () {
        submitDataVertifyPassword("关键操作，必须验证密码", function () {
            let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204022",
            });
            if (data.success) {
                layer.msg("操作成功")
            } else {
                layer.msg("操作失败")
            }
        })
       
    });

    //重新设置库内文物列表编号
    $("#reinstallLBBH").click(function () {
        submitDataVertifyPassword("关键操作，必须验证密码", function () {
            let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204023",
                fieldName: "库内编号",
                fieldValue: $('#knbh').val()
            });
            if (data.success) {
                layer.msg("操作成功")
            } else {
                layer.msg("操作失败")
            }
        })
    });

    //重新设置文物出库流水号
    $("#reinstallCKLSH").click(function () {
        submitDataVertifyPassword("关键操作，必须验证密码", function () {
            let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204023",
                fieldName: "出库流水号",
                fieldValue: $('#cklsh').val()
            });
            if (data.success) {
                layer.msg("操作成功")
            } else {
                layer.msg("操作失败")
            }
        })
    });

    //重新设置文物入库流水号
    $("#reinstallRKLSH").click(function () {
        submitDataVertifyPassword("关键操作，必须验证密码", function () {
            let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204023",
                fieldName: "入库流水号",
                fieldValue: $('#rklsh').val()
            });
            if (data.success) {
                layer.msg("操作成功")
            } else {
                layer.msg("操作失败")
            }
        })
    });

    //重新设置图筒流水号
    $("#reinstallTTLSH").click(function () {
        submitDataVertifyPassword("关键操作，必须验证密码", function () {
            let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204023",
                fieldName: "图筒编号",
                fieldValue: $('#ttlsh').val()
            });
            if (data.success) {
                layer.msg("操作成功")
            } else {
                layer.msg("操作失败")
            }
        })
    });

    //重新设置批次流水号
    $("#reinstallPCLSH").click(function () {
        submitDataVertifyPassword("关键操作，必须验证密码", function () {

            let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204023",
                fieldName: "批次编号",
                fieldValue: $('#pclsh').val()
            });
            if (data.success) {
                layer.msg("操作成功")
            } else {
                layer.msg("操作失败")
            }
        })
    });

     
 
    //一键清除所有数据
    $("#clearSysAllData").click(function () {
        submitDataVertifyPassword("关键操作，必须验证密码", function () {
            let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
                XDLMCID: "9000",
                XDLMTID: "9204",
                XDLMSID: "9204024",
            });
            if (data.success) {
                layer.msg("操作成功")
            } else {
                layer.msg("操作失败")
            }
        })
    });

})



function getBH() {
 
   let bhdata = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
        XDLMCID: "1001",
        XDLMSID: "DYBH201908231246284628176291",
        
    });
    if (bhdata.success) {
        $('#knbh').val(bhdata.rows[0].库内编号);
        $('#cklsh').val(bhdata.rows[0].出库流水号);
        $('#rklsh').val(bhdata.rows[0].入库流水号);
        $('#ttlsh').val(bhdata.rows[0].图筒编号);
        $('#pclsh').val(bhdata.rows[0].批次编号);

    }
}

function submitDataVertifyPassword(tip, callback) { //验证密码的弹框

    var index002 = layer.prompt({
        formType: 1,
        value: '',
        title: '警告！系统关键操作，必须再次输入确认密码',

    }, function (value, index, elem) {
        if (value == "3.1415") {
            layer.close(index002);
            if (callback) {
                callback()
            }
        } else {
            layer.msg("密码错误")
        }

    });
}