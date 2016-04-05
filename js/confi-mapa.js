function initMap() {
	var latLng = new google.maps.LatLng(4.632427, -74.214469);
	var homeLatLng = new google.maps.LatLng(6.750051, -72.909589);

	var map = new google.maps.Map(document.getElementById('map_canvas'), {
		zoom : 6,
		center : latLng,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});

	var marker1 = new MarkerWithLabel({
		position : homeLatLng,
		icon : {
			path : google.maps.SymbolPath.CIRCLE,
			scale : 0, //tamaño 0
		},
		map : map,
		labelContent : "RUS2",
		labelAnchor : new google.maps.Point(13, 13),
		labelClass : "label", // the CSS class for the label
		//labelStyle: {opacity: 0.75}
	});

	var marker2 = new MarkerWithLabel({
		position : new google.maps.LatLng(4.632427, -74.214469),
		icon : {
			path : google.maps.SymbolPath.CIRCLE,
			scale : 0, //tamaño 0
		},
		map : map,
		labelContent : "BAR2",
		labelAnchor : new google.maps.Point(10, 10),
		labelClass : "label", // the CSS class for the label
	});

	var marker3 = new MarkerWithLabel({
		position : new google.maps.LatLng(3.632427, -72.214469),
		icon : {
			path : google.maps.SymbolPath.CIRCLE,
			scale : 0, //tamaño 0
		},
		map : map,
		labelContent : "BAR2",
		labelAnchor : new google.maps.Point(10, 10),
		labelClass : "label", // the CSS class for the label
	});

	var marker4 = new MarkerWithLabel({
		position : new google.maps.LatLng(4.832427, -73.214469),
		icon : {
			path : google.maps.SymbolPath.CIRCLE,
			scale : 0, //tamaño 0
		},
		map : map,
		labelContent : "BAR2",
		labelAnchor : new google.maps.Point(10, 10),
		labelClass : "label", // the CSS class for the label
	});

	var marker5 = new MarkerWithLabel({
		position : new google.maps.LatLng(1.632427, -71.214469),
		icon : {
			path : google.maps.SymbolPath.CIRCLE,
			scale : 0, //tamaño 0
		},
		map : map,
		labelContent : "BAR2",
		labelAnchor : new google.maps.Point(10, 10),
		labelClass : "label", // the CSS class for the label
	});

}
