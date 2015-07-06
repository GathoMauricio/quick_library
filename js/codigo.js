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
				$("#txt_id_alumno").prop("value",datos);
				cargarLibros($("#txt_id_alumno").prop("value"));
				
				
			}else
			{
				alert("Datos Incorrectos");
			}
	});
}
function cargarLogin()
{
	$("#contenedor_principal").load("http://quicklibraryfishers.com/mobile/login.php");	
}
function cargarRegistro()
{
	$("#contenedor_principal").load("http://quicklibraryfishers.com/mobile/registro.php")
}
function cargarRecuperacion()
{
	$("#contenedor_principal").load("http://quicklibraryfishers.com/mobile/recuperacion.php")
}
function cargarLibros(id)
{
	
	$.post("http://quicklibraryfishers.com/mobile/libros.php",{id:id},function(data){
		$("#contenedor_principal").html(data)
		});
	
}




function insertarAlumno()
{
	var matricula=$("#txt_matricula_registro").prop("value");
	var contrasena=$("#txt_contrasena_registro").prop("value");
	var nombre=$("#txt_nombre_registro").prop("value");
	var division=$("#txt_division_registro").prop("value");

	if(matricula.length<=0 || nombre.length<=0 || contrasena.length<=0)
	{
		alert("Por favor rellena todos los campos");
	}else
	{
		$.post("http://quicklibraryfishers.com/control/insertar_alumno.php",
			{
				matricula:matricula,
				nombre:nombre,
				division:division,
				contrasena:contrasena
			},
			function(datos){
				alert(datos);
				cargarLogin();
		});
	}
}
function enviarContrasena()
{
	var email=$("#txt_email_recuperacion").prop("value");
	if(email.length<=0)
	{
		alert("Ingresa in email valido");
	}else
	{
		$("#btn_recuperar").html("<img src='img/load.gif' width='20' > Espera");
		$.post("http://quicklibraryfishers.com/control/enviar_contrasena.php",{email:email},function(datos){
			alert(datos);
			cargarLogin();
		});
	}
}
function solicitarPrestamo(id_libro)
{
	var alumno=$("#txt_id_alumno").prop("value");
	if(confirm("¿Realmente deseas solicitar este libro?")){
		window.location="http://quicklibraryfishers.com/php/generar_solicitud_libro.php?id_libro="+id_libro+"&id_alumno="+alumno;
		cargarLibros($("#txt_id_alumno").prop("value"));
	}
}