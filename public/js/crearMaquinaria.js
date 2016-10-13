/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("ready", function(){
	$("#manipuladorLabel").hide();
	$("#manipulador").hide();
	$("#manipulador").hide("");
	$("#estado").on("change", function(){
		if($("#estado").val() == "Ocupado"){
			$("#manipuladorLabel").show();
			$("#manipulador").show();
			$("#manipulador").prop("required", true);
		}else{
			$("#manipulador").prop("required", false);
			$("#manipuladorLabel").hide();
			$("#manipulador").hide();
			$("#manipulador").val("");
		}
	});
   $("#createMaquinariaForm").on("submit", function(){
	   var data = buildData();
	   ejecuteRequest(data);
   });
});

var buildData = function(){
	var tipoMaquinaria = $("#tipoMaquinaria").val();
	var proveedor = $("#proveedor").val();
	var nombre = $("#nombre").val();
	var estado = $("#estado").val();
	var manipulador = $("#manipulador").val();
	var data = {
			"tipoMaquinaria" : tipoMaquinaria,
			"proveedor" : proveedor,
			"nombre" : nombre,
			"estado" : estado,
			"manipulador" : manipulador,
			"action" : "create"
	};
	return data;
}

var ejecuteRequest = function(data){
    $.ajax({
        type: "POST",
        url: "../MaquinariaController",
        data: data
    }).done(function(respuesta){
    	$("#respuesta").html(respuesta.mensaje);
	    }).always(function(){
	    }).fail(function(){
	    	alert("Ocurrió un error en el servidor");
	    });
};