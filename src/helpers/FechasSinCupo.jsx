const fechasSinCupo = (reservaciones,numeroMaximoDeReservasPorDia,servicioAReservar,servicios)=>{

  let misFechasBloqueadas = [];  

  //Obtenemos toda la data referente al servicio que al usuario le interesa reservar.
  const servicioDeInteres = servicios.filter((servicio)=>   servicio.nombre == servicioAReservar  )[0];

  //Indicamos el numero de maximo de reservas por día que pueden realizar los clientes.
  numeroMaximoDeReservasPorDia = servicioDeInteres.numeroReservas*servicioDeInteres.horasSeleccionadas.length;

  //Obtenemos todas las reservaciones ya realizadas y  que sean igual al servicio seleccionado por el cliente.
  reservaciones = reservaciones.filter((reservacion)=>reservacion.servicio==servicioAReservar);


  let iterador = 0;



    for(let i =0 ; i<reservaciones.length ; i++){

  
      
     // if(!misFechasBloqueadas.includes(reservaciones[i].fecha)){

        if(!misFechasBloqueadas.includes(reservaciones[i].fecha)){

            const numeroDeReservasRealizadasPorFecha = reservaciones.filter((reservacion)=>reservacion.fecha==reservaciones[i].fecha).length;
       
            if(numeroDeReservasRealizadasPorFecha>=numeroMaximoDeReservasPorDia){

              misFechasBloqueadas.push(reservaciones[i].fecha);

            }

        


        }

       

       
     
        //  for(let j = 0 ; j<reservaciones.length ; j++ ){


          
        //     if(reservaciones[i].fecha==reservaciones[j].fecha){
 
        //       iterador++;

        //     }




        //  }

        
        //   if(iterador>=numeroMaximoDeReservasPorDia){
                          
        //                     misFechasBloqueadas.push(reservaciones[i].fecha);
        

        //                    }

             
        //                  iterador=0;


        //     }





    }

 
    return misFechasBloqueadas;


}

export default fechasSinCupo;