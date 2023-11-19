const formatearFecha = (fechaActual)=>{

    const options = {year:"numeric",month:"2-digit",day:"2-digit"} ;
    
    let fechaActualFormateada = fechaActual.toLocaleDateString("es-ES",options);
       
    fechaActualFormateada = fechaActualFormateada.replace(/\//g,"-");

    return fechaActualFormateada;

}

export default formatearFecha;