/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("ready", function(){
	$("#eliminar").on("click", function(){
		if($("#codigo").val() == ""){
			alert("No se puede Eliminar el registro sin un codigo")
			$("#editMaquinariaForm").hide();
		}else{
			var data = buildDataDelete();
			ejecuteRequestEliminar(data);
		}
	});
});

var buildDataDelete = function(){
	var codigo = $("#codigo").val();
	var data = {
			"codigo" : codigo,
			"action" : "delete"
	};
	return data;
}

var ejecuteRequestEliminar = function(data){
    $.ajax({
        type: "POST",
        url: "../MaquinariaController",
        data: data
        }).done(function(respuesta){
        	eliminacionCorrecta();
        }).fail(function(){
        	$("#respuesta").html("Error: No se pudo eliminar el registro");
        });
};

var eliminacionCorrecta = function(){
	$("#limpiar").click();
	$("#codigo").val("");
	$("#editMaquinariaForm").hide();
	$("#respuesta").html("El registro se ha eliminado correctamente!");
}