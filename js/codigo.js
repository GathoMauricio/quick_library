// JavaScript Document
function validarAlumno()
{
	var matricula = $("#txt_matricula_login").prop("value");
	var contrasena = $("#txt_contrasena_login").prop("value");
	$.post("http://quicklibraryfishers.com/control/validar_alumno.php",
		{matricula:matricula,contrasena:contrasena},
		function(datos){
			if(datos>=1)
			{
				alert("Datos Correctos");
			}else
			{
				alert("Datos Incorrectos");
			}
	});
}