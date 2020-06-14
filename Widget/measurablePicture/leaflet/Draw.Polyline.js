var lineMeasure = {
    MEASURERESULT: 0,
    Scale: 1,
    points: [],
    lines: null,
    tempLines: null,
    DRAWLAYERS: DRAWLAYERS,
    init: function (mScale)
    {
    	console.log("初始化")
    	console.log(mScale)
        lineMeasure.Scale = mScale;
        console.log(  lineMeasure.Scale )
        lineMeasure.lines = new L.polyline(lineMeasure.points, { color: 'yellow', opacity: '0.8', weight: '3' });
        lineMeasure.tempLines = new L.polyline(lineMeasure.points, { color: 'yellow', opacity: '0.8', weight: '3' });
        map.on('click', lineMeasure.click);
        map.on('dblclick', lineMeasure.dblclick);
    },
    click: function (e)
    {
        map.doubleClickZoom.disable();

      

        if (lineMeasure.points.length == 0)
        {
            var cicon = L.divIcon({
                className: ' ',
                html: '<span  style="color:yellow; font-style: 宋体 ;font-weight:nomal;font-size:10px;">' + "" + '</span>'
            });
            lineMeasure.DRAWLAYERS.addLayer(L.marker(e.latlng, { icon: cicon }));

        }
        else
        {
            lineMeasure.MEASURERESULT += lineMeasure.GetMeasure(e.latlng);
            if (lineMeasure.MEASURERESULT > 0)
            {
                var cicon = L.divIcon({
                    className: ' ',
                    html: '<span  style="color:yellow; font-style: 宋体 ;font-weight:nomal;font-size:12px;">' + "" + lineMeasure.MEASURERESULT.toFixed(2) + '</span>'
                });
                latlng3 = L.latLng(e.latlng.lat + 0.1, e.latlng.lng);
                lineMeasure.DRAWLAYERS.addLayer(L.marker(latlng3, { icon: cicon }));
            }
        }
        lineMeasure.points.push([e.latlng.lat, e.latlng.lng])
        lineMeasure.lines.addLatLng(e.latlng)
        lineMeasure.DRAWLAYERS.addLayer(L.circle(e.latlng, { color: '#ff0000', fillColor: 'ff0000', fillOpacity: 1, radius: 0.01 }));
        lineMeasure.lines.addTo(lineMeasure.DRAWLAYERS);
        map.on('mousemove', lineMeasure.mousemove);
    },
    mousemove: function (e)
    {

        if (lineMeasure.points.length > 0)
        {
            ls = [lineMeasure.points[lineMeasure.points.length - 1], [e.latlng.lat, e.latlng.lng]]

            var tempM = lineMeasure.MEASURERESULT + lineMeasure.GetMeasure(e.latlng);
            var cicon = L.divIcon({
                className: ' ',
                html: '<span  style="color:yellow; font-style: 宋体 ;font-weight:nomal;font-size:12px;">' + "" + tempM.toFixed(2) + '</span>'
            });
            latlng3 = L.latLng(e.latlng.lat + 0.1, e.latlng.lng);
            lineMeasure.cleanUpMarkers();
            L.marker(latlng3, { icon: cicon, clickable: true, riseOnHover: true, type: 'tmp' }).addTo(lineMeasure.DRAWLAYERS);
            lineMeasure.tempLines.setLatLngs(ls);
            lineMeasure.tempLines.addTo(lineMeasure.DRAWLAYERS);
            lineMeasure.DRAWLAYERS.addTo(map);
        }
    },
    dblclick: function (e)
    {
        lineMeasure.MEASURERESULT = 0;
        lineMeasure.cleanUpMarkers();
        lineMeasure.DRAWLAYERS.addLayer(lineMeasure.lines);
        lineMeasure.points = [];
        lineMeasure.lines = new L.polyline(lineMeasure.points, { color: 'red', opacity: '0.8', weight: '3' });

        map.off('click', lineMeasure.click).off('mousemove', lineMeasure.mousemove).off('dblclick', lineMeasure.dblclick);
        if (lineMeasure.Scale == 1)
        {
            alert("未设置比例系数，默认尺寸仅供参考");
        }
    },
    GetMeasure: function (latlng)
    {   //var from = turf.point([lineMeasure.points[lineMeasure.points.length - 1][0], lineMeasure.points[lineMeasure.points.length - 1][1]]);
        //var to = turf.point([e.latlng.lat, e.latlng.lng]);
        //var options = { units: 'miles' };
        //var distance = turf.distance(from, to, options) / 64;
        //var distance = map.distance(latlng1, latlng2) * 1;
        var latlng1 = L.latLng(lineMeasure.points[lineMeasure.points.length - 1][0], lineMeasure.points[lineMeasure.points.length - 1][1]);
        var latlng2 = L.latLng(latlng.lat, latlng.lng);

        var distance = Math.sqrt(Math.abs(latlng2.lat - latlng1.lat) * Math.abs(latlng2.lat - latlng1.lat) + Math.abs(latlng2.lng - latlng1.lng) * Math.abs(latlng2.lng - latlng1.lng));
        return distance / lineMeasure.Scale;
    },
    cleanUpMarkers: function ()
    {
        lineMeasure.DRAWLAYERS.eachLayer(function (l)
        {
            if (l.options && l.options.type === 'tmp')
            {
                lineMeasure.DRAWLAYERS.removeLayer(l);
            }
        })
    },
    destory: function ()
    {

    }
}
