var tuTongBh = window.location.href.getQuery("bh");
var knbh = window.location.href.getQuery("knbh");
var where = {
	TblNum: "386",
	T3862: "EQ" + knbh
}
var form, table, element, $;
layui.use(['element', 'table', 'layer', 'form'], function () {
	form = layui.form;
	table = layui.table;
	element = layui.element;
	layer = layui.layer;
	$ = layui.jquery;

	SetQRurl_("qrcode1", "tuTongBh", "detail", "qrimage1")
	SetQRurl_("qrcode2", "tuTongBh", "detail", "qrimage2")

	echoData(tuTongBh)
	echoBh(tuTongBh)

	$("#printBtn").click(function() {
		$(".no-print").addClass("layui-hide");
		$(".tt").css({
			"border": "none"
		})
		var tata = document.execCommand("print");
		if(tata) {
			$(".no-print").removeClass("layui-hide");
			$(".tt").css({
				"border": "1px dashed #000"
			})

		}
	})

})

function SetQRurl_(id, knbh, type, imgID) {
	var b = new Base64();
	var curKf = b.encode(SysConfig.UserInfo.GetCookieName("mCurrentStorage"))
	var a = window.location.origin + "/SYKFGL/Page/knww/page/tutongDetailApp.html?ewm=true&tuTongBh=" + tuTongBh + "&kf=" + curKf;
	//  a=a.replace("xdWenWuInfo", "xdWenWuInfo2")

	//	var a = window.location.origin + "/SYKFGL/Page/qrCode/detailApp.html?ewm=true&knbh=" + knbh + "&kf=" + curKf + "&type=" + type + str;

	$("#" + id).qrcode({
		width: 64,
		height: 64,
		text: a,
		correctLevel: 0,
		render: "canvas",
	});
	$("canvas").attr("id", "erw");
	var b = document.getElementById('erw');
	var c = b.getContext('2d');
	var d = new Image();
	var e = b.toDataURL("image/png");
	document.getElementById(imgID).src = e

}

function echoData(id) {
	if(id) {
		let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
			XDLMCID: "1001",
			XDLMSID: "DYBH201908231246284628202221",
			XDLMU: knbh
		});
		if(data.success){
			$("#ttbh1").html(tuTongBh.replace("TT",""))
			$("#ttbh2").html(tuTongBh.replace("TT",""))
			$("#库房名1").html(data.rows[0]['库房名'])
			$("#柜架号1").html(data.rows[0]['柜架号'])
			$("#层号1").html(data.rows[0]['层号'])
			$("#库房名2").html(data.rows[0]['库房名'])
			$("#柜架号2").html(data.rows[0]['柜架号'])
			$("#层号2").html(data.rows[0]['层号'])
		}
		// postData("wwGetDataList", where, function(data) {
		// 	$("#ttbh1").html(tuTongBh.replace("TT",""))
		// 	$("#ttbh2").html(tuTongBh.replace("TT",""))

		// 	$("#库房名1").html(data.data[0]['库房名'])
		// 	$("#柜架号1").html(data.data[0]['柜架号'])
		// 	$("#层号1").html(data.data[0]['层号'])
		// 	$("#库房名2").html(data.data[0]['库房名'])
		// 	$("#柜架号2").html(data.data[0]['柜架号'])
		// 	$("#层号2").html(data.data[0]['层号'])
		// })
	}
}

function echoBh(bh) {
	var wherebh = {
		TblNum: "386",
		T38672: "EQ" + SysConfig.UserInfo.GetCookieName("mCurrentStorage"),
		orderby: "id desc",
		QueryType: "图筒",
		QueryKey: bh,
		limit: 5,
		page: 1,
	}
	let data = SysConfig.SubSystemData.SYKFGL.PostData("GetDataInterface", {
		XDLMCID: "1001",
		XDLMSID: "DYBH201908231246284628202221",
		XDLMU: knbh
	});
	if(data.success){
		if(data.rows.length>0){
			for (var i=0;i<data.rows.length;i++){
				$("#bh1"+(i*1+1)).html(data.rows[i].新编号)
				$("#bh2"+(i*1+1)).html(data.rows[i].新编号)
			}
		}

		setTimeout(function() {
			$(".no-print").addClass("layui-hide");
			$(".tt").css({
				"border": "none"
			})
			var tata = document.execCommand("print");
			if(tata) {
				$(".tt").css({
					"border": "1px dashed #000"
				})
				$(".no-print").removeClass("layui-hide");

			}

		}, 1000)
	}


	// postData("wwGetDataList", wherebh, function(data) {
	// 	if(data.data.length>0){
	// 		for (var i=0;i<data.data.length;i++){

	// 			$("#bh1"+(i*1+1)).html(data.data[i].新编号)
	// 			$("#bh2"+(i*1+1)).html(data.data[i].新编号)
	// 		}
	// 	}
	// 		setTimeout(function() {
	// 			$(".no-print").addClass("layui-hide");
	// 			$(".tt").css({
	// 				"border": "none"
	// 			})
	// 			var tata = document.execCommand("print");
	// 			if(tata) {
	// 				$(".tt").css({
	// 					"border": "1px dashed #000"
	// 				})
	// 				$(".no-print").removeClass("layui-hide");

	// 			}

	// 		}, 1000)
	// })
}

function Base64() {

    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    _utf8_encode = function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}