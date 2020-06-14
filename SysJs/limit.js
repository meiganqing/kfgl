//权限的js ,根据元素的class控住元素的权限
//TODO:针对页面当中按钮,按钮统一的class为userLimit-btn
var limitOfAuthority = window.location.href.getQuery("limit"); //当前用户对应模块的权限onlunum
var has_limit = true;
//store.set("userLimt", {
//	900010: "90000"
//})
//权限配置start//type:1查看 2编辑 3审核 4导出
//		end_key:存进去的key值
//		type:权限拆成数组后要取得第几个值，每个值都代表不同权限
//		tip:没有权限时的提示
function limitConfig(end_key, type, tip) {
    var flag = true
    if (!has_limit) {
        flag = true
        return has_limit
    }

    if (limitOfAuthority) {
        if (store.get(end_key)) {
            if (store.get(end_key)[limitOfAuthority]) {
                if (store.get(end_key)[limitOfAuthority].split("")[type] == "1") {} else {
                    if (tip) {
                        layer.msg("您当前没有" + tip + "权限", {
                            time: 2000
                        })
                    }
                    flag = false
                }
            } else {
                if (has_limit) {
                    if (tip) {
                        layer.msg("您当前没有" + tip + "权限", {
                            time: 2000
                        })
                    }
                    flag = false
                }
            }
        }
    }
    return flag
}
layui.use(["layer"], function() {
    var layer = layui.layer;
    //TODO:查看权限时，1)在添加页面的情况是只能查看，不能进行添加，修改操作，直接操作隐藏按钮
    //2)判断页面有没有这四个属性的class

    if ($(".userLimit-btn-look").length > 0) {
        if (!limitConfig("storeLimt", 1, "查看")) {
            $(".userLimit-btn-operate").addClass("layui-hide") //要隐藏的
            $(".userLimit-btn-look").addClass("layui-btn-disabled")
            $(".userLimit-btn-look").attr("disabled", true)
        }
    }
    if ($(".userLimit-btn-edit").length > 0) {
        if (!limitConfig("storeLimt", 2)) {
            $(".userLimit-btn-edit").addClass("layui-btn-disabled")
            $(".userLimit-btn-edit").attr("disabled", true)
        }
    }
    if ($(".userLimit-btn-delete").length > 0) {
        if (!limitConfig("storeLimt", 3)) {
            $(".userLimit-btn-delete").addClass("layui-btn-disabled")
            $(".userLimit-btn-delete").attr("disabled", true)
        }
    }

    if ($(".userLimit-btn-export").length > 0) {
        if (!limitConfig("storeLimt", 4)) {
            $(".userLimit-btn-export").addClass("layui-btn-disabled")
            $(".userLimit-btn-export").attr("disabled", true)
        }
    }

    if ($(".userLimit-btn-approve").length > 0) {
        if (!limitConfig("storeLimt", 5)) {
            $(".userLimit-btn-approve").addClass("layui-btn-disabled")
            $(".userLimit-btn-approve").attr("disabled", true)
        }
    }
    //2)在table页时的按钮不能操作，则是不能点击，增加不能点击事件
    //	$(".userLimit-btn-look").click(function() {
    //		if(!limitConfig("storeLimt", 1, "查看")) {
    //			return false
    //		}
    //
    //	})
    //	$(".userLimit-btn-delete").click(function() {
    //		if(!limitConfig("storeLimt", 3, "删除")) {
    //			return false
    //		}
    //
    //	})
    //	$(".userLimit-btn-edit").click(function() {
    //		if(!limitConfig("storeLimt", 2, "编辑")) {
    //			return false
    //		}
    //
    //	})
    //	$(".userLimit-btn-export").click(function() {
    //		if(!limitConfig("storeLimt", 4, "导出")) {
    //			return false
    //		}
    //
    //	})
})

function setLimt(XKLX, wLmOnlynum, callback) { //权限配置，后续增加  
    //2)获取权限
    var limtReturn = postDataSYYH_origin("GetUserLimitList", {
        "XKLX": "syyh",
        "userOnlynum": getCookieName("mUserOnlyNum"),

        "xmbh": XKLX,
        "itemlm": wLmOnlynum
    })

    if (limtReturn.msg) {
        callback(limtReturn)
    }
}
$.fn.showDiv = function(options) { //控制当前div隐藏,社科还没有编号

    if (options == "0") {

    } else {
        var limt = options.split("")
        if (limt[1] == "1") {

            $(this).removeClass("layui-hide")
        }
    }
}

// 根据访问权限隐藏页面
function indexlimit(qxsz, type) {
    let qxszobj = {}

    if (store.get(qxsz)) {

        qxszobj = store.get(qxsz)
        for (let k in qxszobj) {
            if (qxszobj[k].split("")[1] == "1") {

                $("#" + k).removeClass("layui-hide")
            } else {
                $("#" + k).addClass("layui-hide")
            }
        }
    }
}