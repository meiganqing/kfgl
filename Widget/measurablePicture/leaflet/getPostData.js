	var ip_url = "/api/kf/data";
	function postData(mActionType, mActionData, callback, _url, async_, type) {

		var url_ = "",
			type_;
		if(_url) {
			url_ = _url;
		} else {
			url_ = ip_url;
		}
		if(type) {
			type_ = "&" + type
		} else {
			type_ = "&sykf=SYKFGL"
		}
		if(mActionType) {
			url_ = url_ + "?XAction=" + mActionType + type_
		}
		var async = true;
		if(async_ == false) {
			async = async_;
		}

		var rv;
		var index33;
		try {
			$.ajax({
				async: async,
				cache: false,
				type: "post",
				url: url_,
				data: mActionData, // $('#mkufang').val() 
				dataType: 'json',
				success: function(returnValue) {

					if(returnValue.success || returnValue.msg) {
						if(callback) {
							callback(returnValue, this)
						}
						rv = returnValue
					} else {
						rv = returnValue.message;
						if(rv == "NOTLOGIN") {
							var isQcode = window.location.href.getQuery("ewm"); //是否手机打开的

							if(isQcode) {
								window.location.href = window.location.origin + "/kf/login.html?nextUrl=" + escape(window.location.href)
							} else {
								parent.location.href = "/kf/login.html"
							}
						} else {
							layer.msg(rv)
						}
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					rv = XMLHttpRequest.responseText;
					layer.msg(rv)
				}
			});
		} catch(e) {
			rv = e.message;
		}
		return rv;
	}
