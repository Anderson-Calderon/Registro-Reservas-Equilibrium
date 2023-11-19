const fechaLarga = (fechaOriginal)=>{

    
// Dividir la cadena de fecha en día, mes y año
var partesFecha = fechaOriginal.split("-");
var mes = parseInt(partesFecha[1], 10);
var dia = parseInt(partesFecha[0], 10);
var anio = parseInt(partesFecha[2], 10);

// Crear un objeto de fecha en JavaScript
var fechaObjeto = new Date(anio, mes - 1, dia);

// Días de la semana y meses en español
var diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

// Obtener el día de la semana y el nombre del mes en formato deseado
var diaSemana = diasSemana[fechaObjeto.getUTCDay()];
var nombreMes = meses[fechaObjeto.getUTCMonth()];


const espacio = "%20";
// Crear la fecha en el formato deseado
var fechaLarga = `${diaSemana}${espacio}${dia}${espacio}de${espacio}${nombreMes}${espacio}del${espacio}${anio}`;

return fechaLarga;

}

export default fechaLarga;