/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).on("ready", function(){
	$("#editMaquinariaForm").on("submit", function(){
		if($("#codigo").val() == ""){
			alert("No se puede editar el registro sin un codigo")
			$("#editMaquinariaForm").hide();
		}else{
			var data = buildDataMod();
			executeRequestMod(data);
		}
	});
});

var buildDataMod = function(){
	var codigo = $("#codigo").val();
	var tipoMaquinaria = $("#tipoMaquinaria").val();
	var proveedor = $("#proveedor").val();
	var nombre = $("#nombre").val();
	var estado = $("#estado").val();
	var manipulador = $("#manipulador").val();
	var data = {
			"codigo" : codigo,
			"tipoMaquinaria" : tipoMaquinaria,
			"proveedor" : proveedor,
			"nombre" : nombre,
			"estado" : estado,
			"manipulador" : manipulador,
			"action" : "update"
	};
	return data;
}

var executeRequestMod = function(data){
	$.ajax({
        type: "POST",
        url: "../MaquinariaController",
        data: data
    }).done(function(respuesta){
    	$("#respuesta").html(respuesta.mensaje);
	    }).always(function(){
	    }).fail(function(){
	    	$("#respuesta").html("Error: " + respuesta.mensaje);
	    });
}