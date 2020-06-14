var scaleMeasure = {
	MEASURERESULT: 0,
	points: [],
	lines: null,
	tempLines: null,
	DRAWLAYERS: DRAWLAYERS,
	init: function() {
		scaleMeasure.lines = new L.polyline(scaleMeasure.points, {
			color: 'yellow',
			opacity: '0.8',
			weight: '3'
		});
		scaleMeasure.tempLines = new L.polyline(scaleMeasure.points, {
			color: 'yellow',
			opacity: '0.8',
			weight: '3'
		});
		map.on('click', scaleMeasure.click);
		map.on('dblclick', scaleMeasure.dblclick);
	},
	click: function(e) {
		map.doubleClickZoom.disable();
		var that = this;
		var latlng1;
		var latlng2;
		if(scaleMeasure.points.length == 0) {
			var cicon = L.divIcon({
				className: ' ',
				html: '<span  style="color:yellow; font-style: 宋体 ;font-weight:nomal;font-size:10px;">' + "" + '</span>'
			});
			scaleMeasure.DRAWLAYERS.addLayer(L.marker(e.latlng, {
				icon: cicon
			}));
			latlng1 = 0;
			latlng2 = 0;

			scaleMeasure.points.push([e.latlng.lat, e.latlng.lng])
			scaleMeasure.lines.addLatLng(e.latlng)
			scaleMeasure.DRAWLAYERS.addLayer(L.circle(e.latlng, {
				color: '#ff0000',
				fillColor: 'ff0000',
				fillOpacity: 1,
				radius: 0.01
			}));
			scaleMeasure.lines.addTo(scaleMeasure.DRAWLAYERS);

			map.on('mousemove', scaleMeasure.mousemove);
		} else {
			latlng1 = L.latLng(scaleMeasure.points[scaleMeasure.points.length - 1][0], scaleMeasure.points[scaleMeasure.points.length - 1][1]);
			latlng2 = L.latLng(e.latlng.lat, e.latlng.lng);
			var distance = Math.sqrt(Math.abs(latlng2.lat - latlng1.lat) * Math.abs(latlng2.lat - latlng1.lat) + Math.abs(latlng2.lng - latlng1.lng) * Math.abs(latlng2.lng - latlng1.lng));
			distance = distance
			scaleMeasure.MEASURERESULT += distance;
			if(distance > 0) {
				var cicon = L.divIcon({
					className: ' ',
					html: '<span  style="color:yellow; font-style: 宋体 ;font-weight:nomal;font-size:12px;">' + "" + scaleMeasure.MEASURERESULT.toFixed(2) + '</span>'
				});
				latlng3 = L.latLng(e.latlng.lat + 0.1, e.latlng.lng);
				scaleMeasure.DRAWLAYERS.addLayer(L.marker(latlng3, {
					icon: cicon
				}));
			}

			scaleMeasure.points.push([e.latlng.lat, e.latlng.lng])
			scaleMeasure.lines.addLatLng(e.latlng)
			scaleMeasure.DRAWLAYERS.addLayer(L.circle(e.latlng, {
				color: '#ff0000',
				fillColor: 'ff0000',
				fillOpacity: 1,
				radius: 0.01
			}));
			scaleMeasure.lines.addTo(scaleMeasure.DRAWLAYERS);

			//此处获取长度scaleMeasure.MEASURERESULT
			//比例系数按20计算
			//比例系数计算方式  
			// 系数=scaleMeasure.MEASURERESULT/20;
		
			var value_measure=scaleMeasure.MEASURERESULT / 20;
			store.set("value_measure",value_measure);
			var pictureMsg = store.get("pictureMsg");
			postData("wwModifyDataById", {
				TblNum: 104,
				XDLMID: pictureMsg.id,
				XDLM比例: value_measure
			}, function(data,that) {
				if(data.success) {

					alert("比例已设定"+value_measure)
					cleanLayer()
				}
			})
			scaleMeasure.MEASURERESULT = 0;
			scaleMeasure.cleanUpMarkers();
			scaleMeasure.DRAWLAYERS.addLayer(scaleMeasure.lines);
			scaleMeasure.points = [];
			scaleMeasure.lines = new L.polyline(scaleMeasure.points, {
				color: 'red',
				opacity: '0.8',
				weight: '3'
			});

			map.off('click', scaleMeasure.click).off('mousemove', scaleMeasure.mousemove).off('dblclick', scaleMeasure.dblclick);
		}
return value_measure
	},
	mousemove: function(e) {

		if(scaleMeasure.points.length > 0) {
			ls = [scaleMeasure.points[scaleMeasure.points.length - 1],
				[e.latlng.lat, e.latlng.lng]
			]

			latlng1 = L.latLng(scaleMeasure.points[scaleMeasure.points.length - 1][0], scaleMeasure.points[scaleMeasure.points.length - 1][1]);
			latlng2 = L.latLng(e.latlng.lat, e.latlng.lng);
			//var distance = map.distance(latlng1, latlng2) * 1;
			//var from = turf.point([scaleMeasure.points[scaleMeasure.points.length - 1][0], scaleMeasure.points[scaleMeasure.points.length - 1][1]]);
			//var to = turf.point([e.latlng.lat, e.latlng.lng]);
			//var options = { units: 'miles' };
			//var distance = turf.distance(from, to, options) / 64;
			var distance = Math.sqrt(Math.abs(latlng2.lat - latlng1.lat) * Math.abs(latlng2.lat - latlng1.lat) + Math.abs(latlng2.lng - latlng1.lng) * Math.abs(latlng2.lng - latlng1.lng));

			var tempM = scaleMeasure.MEASURERESULT + distance;
			var cicon = L.divIcon({
				className: ' ',
				html: '<span  style="color:yellow; font-style: 宋体 ;font-weight:nomal;font-size:12px;">' + "" + tempM.toFixed(2) + '</span>'
			});
			latlng3 = L.latLng(e.latlng.lat + 0.1, e.latlng.lng);
			scaleMeasure.cleanUpMarkers();
			L.marker(latlng3, {
				icon: cicon,
				clickable: true,
				riseOnHover: true,
				type: 'tmp'
			}).addTo(scaleMeasure.DRAWLAYERS);
			scaleMeasure.tempLines.setLatLngs(ls);
			scaleMeasure.tempLines.addTo(scaleMeasure.DRAWLAYERS);
			scaleMeasure.DRAWLAYERS.addTo(map);
		}
	},

	cleanUpMarkers: function() {
		scaleMeasure.DRAWLAYERS.eachLayer(function(l) {
			if(l.options && l.options.type === 'tmp') {
				scaleMeasure.DRAWLAYERS.removeLayer(l);
			}
		})
	},
	destory: function() {

	},

}