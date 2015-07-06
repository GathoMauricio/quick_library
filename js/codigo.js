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
function cargarCubiculos(id)
{
	
	$.post("http://quicklibraryfishers.com/mobile/cubiculos.php",{id:id},function(data){
		$("#contenedor_principal").html(data)
		});
	
}
function cargarFavoritos(id)
{
	
	$.post("http://quicklibraryfishers.com/mobile/favoritos.php",{id:id},function(data){
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
		alert("se descargará tu comprobante en tu equipo");
	navigator.app.loadUrl("http://quicklibraryfishers.com/php/generar_solicitud_libro.php?id_libro="+id_libro+"&id_alumno="+alumno, { openExternal:true });
		cargarLibros($("#txt_id_alumno").prop("value"));
	}
}
function solicitarCubiculo(id_cubiculo)
{
	var alumno=$("#txt_id_alumno").prop("value");
	var hora=$("#txt_hora_cubiculo_"+id_cubiculo).prop("value");
	alert(hora);
	if(confirm("¿Realmente deseas solicitar este cubiculo?")){
		alert("se descargará tu comprobante en tu equipo");
		var link="http://quicklibraryfishers.com/php/generar_solicitud_cubiculo.php?id_cubiculo=1";
	navigator.app.loadUrl("http://quicklibraryfishers.com/php/generar_solicitud_cubiculo.php?id_cubiculo="+id_cubiculoo+"&id_alumno="+alumno+"&hora="+hora, { openExternal:true });
		cargarCubiculos($("#txt_id_alumno").prop("value"));
	}
}

function agregarFavorito(id)
{
	var alumno=$("#txt_id_alumno").prop("value");
	var nota=prompt("¿Deseas agregar una nota sobre este libro?");
	$.post("http://quicklibraryfishers.com/control/agregar_favorito.php",
	{id:id,nota:nota,id_alumno:alumno},
	function(datos){
			alert(datos);
		});
}
function eliminarFavorito(id)
{
	if(confirm("¿Realmente deseas eliminar este libro de tus Favoritos?"))
	{
		$.post("http://quicklibraryfishers.com/control/eliminar_favorito.php",{id:id},function(datos){
			alert(datos)
			var alumno=$("#txt_id_alumno").prop("value");
			cargarFavoritos(alumno);
		});
	}
}