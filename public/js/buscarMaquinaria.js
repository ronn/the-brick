/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("ready", function(){
	$("#editMaquinariaForm").hide();
    $("#searchMaquinariaForm").on("submit", function(){
    	var dataBus = buildDataBus();
    	ejecuteRequestBuscar(dataBus);
   });
});

var buildDataBus = function(){
	var codigo = $("#codigo").val();
	var data = {
			"codigo" : codigo,
			"action" : "search"
	};
	return data;
}

var ejecuteRequestBuscar = function(dataBus){
    $.ajax({
        type: "POST",
        url: "../MaquinariaController",
        data: dataBus
        }).done(function(respuesta){
        	$("#respuesta").html("");
        	mostrarCamposBus(respuesta);
        }).fail(function(){
        	$("#respuesta").html("El registro solicitado no existe");
        	$("#editMaquinariaForm").hide();
        });
};

var mostrarCamposBus = function(respuesta){
    $("#editMaquinariaForm").show();
	$("#tipoMaquinaria").val(respuesta.tipoMaquinaria);
	$("#proveedor").val(respuesta.proveedor);
	$("#nombre").val(respuesta.nombre);
	$("#estado").val(respuesta.estado);
	habilitarManipuladorBus(respuesta.estado, respuesta.manipulador)
	$("#estado").on("change", function(){
    	habilitarManipuladorBus($("#estado").val(), "");
    });
}

function habilitarManipuladorBus(estado, manipulador){
		if(estado == "Ocupado"){
			$("#manipuladorLabel").show();
			$("#manipulador").show();
			$("#manipulador").prop("required", true);
			$("#manipulador").val(manipulador);
		}else{
			$("#manipulador").prop("required", false);
			$("#manipuladorLabel").hide();
			$("#manipulador").hide();
			$("#manipulador").val("");
		}
}