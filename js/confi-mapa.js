// function initMap() {
	// var latLng = new google.maps.LatLng(4.632427, -74.214469);
	// var homeLatLng = new google.maps.LatLng(6.750051, -72.909589);
// 
	// var map = new google.maps.Map(document.getElementById('map_canvas'), {
		// zoom : 6,
		// center : latLng,
		// mapTypeId : google.maps.MapTypeId.ROADMAP
	// });
// 
	// var marker1 = new MarkerWithLabel({
		// position : homeLatLng,
		// icon : {
			// path : google.maps.SymbolPath.CIRCLE,
			// scale : 0, //tamaño 0
		// },
		// map : map,
		// labelContent : "RUS2",
		// labelAnchor : new google.maps.Point(13, 13),
		// labelClass : "label", // the CSS class for the label
		// //labelStyle: {opacity: 0.75}
	// });
// 
	// var marker2 = new MarkerWithLabel({
		// position : new google.maps.LatLng(4.632427, -74.214469),
		// icon : {
			// path : google.maps.SymbolPath.CIRCLE,
			// scale : 0, //tamaño 0
		// },
		// map : map,
		// labelContent : "BAR2",
		// labelAnchor : new google.maps.Point(10, 10),
		// labelClass : "label", // the CSS class for the label
	// });
// 
	// var marker3 = new MarkerWithLabel({
		// position : new google.maps.LatLng(3.632427, -72.214469),
		// icon : {
			// path : google.maps.SymbolPath.CIRCLE,
			// scale : 0, //tamaño 0
		// },
		// map : map,
		// labelContent : "BAR2",
		// labelAnchor : new google.maps.Point(10, 10),
		// labelClass : "label", // the CSS class for the label
	// });
// 
	// var marker4 = new MarkerWithLabel({
		// position : new google.maps.LatLng(4.832427, -73.214469),
		// icon : {
			// path : google.maps.SymbolPath.CIRCLE,
			// scale : 0, //tamaño 0
		// },
		// map : map,
		// labelContent : "BAR2",
		// labelAnchor : new google.maps.Point(10, 10),
		// labelClass : "label", // the CSS class for the label
	// });
// 
	// var marker5 = new MarkerWithLabel({
		// position : new google.maps.LatLng(1.632427, -71.214469),
		// icon : {
			// path : google.maps.SymbolPath.CIRCLE,
			// scale : 0, //tamaño 0
		// },
		// map : map,
		// labelContent : "BAR2",
		// labelAnchor : new google.maps.Point(10, 10),
		// labelClass : "label", // the CSS class for the label
	// });
// 
// }


var url;
var tabla;
var cadena;
var network;
var idnetwork;
var idstation;
var codeNetwork;
var nameStation;
var codigostation;
var eventos = new Array();
var canalConsulta = new Array();
var stringCanales = "";
var dialog;

function initMap() {

	iniciarMapa();

}


function solicitarXml() {
	var dialog10 = $("#dialog10").data('dialog');

	if (!dialog10.element.data('opened')) {

		dialog10.open();
	} else {
		dialog10.close();
	}
	$.ajax({
		url : 'php/response.php',
		data : {
			netw : codeNetwork,
			cha : stringCanales,
			sta : codigostation
		},
		type : 'POST',
		success : function(resp) {
			if (resp == "ok") {
				window.open('http://localhost/consulta/data/response.xml', '_blank');
				dialog10.close();
				dialog.close();
			} else {
				dialog10.close();
				//dialog.close();
				var dialog11 = $("#dialog11").data('dialog');

				if (!dialog11.element.data('opened')) {

					dialog11.open();
				} else {
					dialog11.close();
				}
			}
		},

		error : function(xhr, status) {
			alert('Disculpe, existió un problema');
		},

		complete : function(xhr, status) {
			//alert('Petición realizada');
		}
	});
}

			

function canalSeleccionado(cl) {
	var repetido = false;
	for (var i = 0; i < canalConsulta.length; i++) {
		if (canalConsulta[i] == cl) {
			canalConsulta.splice(i, 1);
			repetido = true;
		}
	};
	if (repetido == false) {
		canalConsulta.push(cl)
	}
	stringCanales = "";
	for (var i = 0; i < canalConsulta.length; i++) {
		stringCanales = stringCanales + canalConsulta[i] + "&";
	};
	stringCanales = stringCanales.substring(0, stringCanales.length - 1);
}


function showDialog() {

	var da = network.Inventory.network[idnetwork].station;
	var sl = da[idstation].sensorLocation;
	var canal = "";
	var conta = 0;
	var col = 0;
	for (var k = 0; k < sl.length; k++) {
		var st = sl[k].stream;
		var locali = sl[k].code;
		var aux = "";
		for (var m = 0; m < st.length; m++) {
			var cl = st[m].code
			var env = "\'" + cl + "\'";
			aux=aux+'<label class="input-control checkbox small-check">'+
			'<input type="checkbox" id="'+cl+'" onchange="canalSeleccionado('+env+')">'+
			'<span class="check"></span> <span class="caption">'+locali+'.'+cl+'</span> </label><p>';
			conta++;

			if (conta == 3) {
				canal = canal + ' <div class="cell">' + aux + '</div>';
				conta = 0;
				aux = "";
			};

		};
		var col = col + m;

	};
	canal = '<div class="grid"><div class="row cells' + (col / 3) + '">' + canal;
	canal = canal + '</div></div>';

	dialog = $("#dialog9").data('dialog');

	if (!dialog.element.data('opened')) {
		$("#station").html("<h3>" + codigostation + ", " + nameStation + "</h3>");
		$("#componentes").html(canal);
		dialog.open();
	} else {
		dialog.close();
	}
}

			


function construirTabla(description, codigo, longitud, latitud, elevacion, data, i, j) {
	var da = data.Inventory.network[i].station;
	var sl = da[j].sensorLocation;
	nameStation = da[j].description;
	codeNetwork = data.Inventory.network[i].code;
	var canal = "";
	codigostation = codigo;
	network = data;
	idnetwork = i;
	idstation = j;

	for (var k = 0; k < sl.length; k++) {
		var st = sl[k].stream;
		var locali = sl[k].code;
		for (var m = 0; m < st.length; m++) {
			var cl = st[m].code
			canal = canal + locali + "." + cl + " - "
		};
	};
			canal= canal.substring(0, canal.length-2);			
				tabla='<table class="table striped hovered" id="main_table_demo">'+
						'<thead>		  '+
						'<tr>			  '+
						'<th>Estación</th>'+
						'<th>'+codigo+'</th>'+
						'</tr>            '+
						'</thead>         '+
						'<tbody>          '+
						'<tr >             '+
						'    <td colspan="2">'+nameStation+'</td>   '+
						'</tr>            '+
						'<tr >             '+
						'    <td colspan="2">'+description+'</td>   '+
						'</tr>            '+
						'<tr>             '+
						'    <td>Latitud</td>   '+
						'    <td>'+latitud+'</td>   '+
						'</tr>            '+
						'<tr>             '+
						'    <td>Longitud</td>   '+
						'    <td>'+longitud+'</td>   '+
						'</tr>            '+
						'<tr>             '+
						'    <td>Elevación</td>   '+
						'    <td>'+elevacion+'</td>   '+
						'</tr>            '+
						'<tr>             '+
						'    <td>Canales</td>   '+
						'    <td>'+canal+'</td>   '+
						'</tr>            '+
						'</tbody>         '+
						'</table>         '+						
						'<button class="button success small-button" onclick="showDialog()">Descargar información de respuesta</button>'
					return tabla;  
}



function iniciarMapa() {
	var infoWindow = new google.maps.InfoWindow();
	var estaciones = new Array();
	var estacion = "";
	var map = new google.maps.Map(document.getElementById('map_canvas'), {
		zoom : 5,
		center : {
			lat : 4.542903,
			lng : -73.569119
		},
		mapTypeId : google.maps.MapTypeId.TERRAIN
	});

	cadena = $.getJSON('php/data.php', function(data) {
		var codigo,
		    longitud,
		    latitud,
		    elevacion,
		    canales;
		for (l in data.Inventory.network) {
			var dataEstacion = data.Inventory.network[l].station;
			for (j in dataEstacion ) {

				estacion = new MarkerWithLabel({
					position : new google.maps.LatLng(dataEstacion[j].latitude, dataEstacion[j].longitude),
					icon : {
						path : google.maps.SymbolPath.CIRCLE,
						scale : 0, //tamaño 0
					},
					map : map,
					title : dataEstacion[j].code,
					labelContent : dataEstacion[j].code,
					tipo : data.Inventory.network[l].code,
					labelAnchor : new google.maps.Point(10, 10),
					labelClass : "label", // the CSS class for the label
				});

				estaciones.push(estacion);
				google.maps.event.addListener(estacion, 'click', (function(estacion, l, k) {
					var est = estacion;
					var i = j
					return function() {
						da = data.Inventory.network[l].station;
						infoWindow.setContent(construirTabla(data.Inventory.network[l].description, da[i].code, da[i].longitude, da[i].latitude, da[i].elevation, data, l, i));
						//infoWindow.setPosition();
						infoWindow.open(map, estacion);
					}
				})(estacion, l));

			};

		}
	})
}
