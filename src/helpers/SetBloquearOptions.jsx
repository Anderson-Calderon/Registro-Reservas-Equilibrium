const setBloquearOptions = (arregloOpciones  , hoy , horaYMinutos , reservas ,numeroMaximoDeReservasPorHora,servicioSeleccionado,servicios)=>{

    let horasBloquear = [];
   
    //OBTENEMOS TODA LA DATA DEL SERVICIO QUE EL USUARIO QUIERE RESERVAR.
    const servicioDeInteres = servicios.filter((servicio)=>  servicio.nombre == servicioSeleccionado)[0];

    //PRIMERO OBTENEMOS TODAS LAS HORAS QUE DESEAMOS BLOQUEAR , PORQUE PARA ESA FECHA ESTAS HORAS YA HAN
    //SIDO RESERVADAS POR OTROS USUARIOS.
    for(let i=0 ; i<arregloOpciones.length ; i++){
        
      const hora = arregloOpciones[i].value;
      
       
      let cuantasVecesRepiteLaMismaHoraYFecha = reservas.filter((reserva)=> reserva.hora==hora  );
        
        
        if(cuantasVecesRepiteLaMismaHoraYFecha.length==servicioDeInteres.numeroReservas){
  
             horasBloquear.push(cuantasVecesRepiteLaMismaHoraYFecha[0].hora);
            
        }
        
    }
     
     
    
     

    //ACÁ YA ESTAMOS EMPEZANDOA BLOQUEAR
      for(let i=0 ; i<arregloOpciones.length ; i++){

            if(hoy){//SE EJECUTA SI LA FECHA QUE LE INTERESA RESERVAR AL USUARIO ES IGUAL AL DÍA DE HOY.
 
                //OBTENEMOS SOLO EL : "hh:mm" DE LOS OPTIONS DEL SELECT HORA.ES DECIR , OBVIAMOS A LA EXTENSIÓN:
                //"a. m."  y al "p. m."

              let horaSinExtension = arregloOpciones[i].value.substr(0,5);

              //POR EJEMPLO SI YA SON LAS 12 p. m. ENTONCES DESHABILITAMOS A TODAS LAS HORAS QUE SEAN MENORES
              //A LAS 12 p. m.
              if( horaSinExtension!==""  && horaSinExtension < horaYMinutos ){
 
            
                    arregloOpciones[i].disabled=true;
                    arregloOpciones[i].style="color:red!important";
           
 
              }
 
 
            }



             
             if(!arregloOpciones[i].disabled){//SI LA HORA NO ESTÁ DESHABILITADA

  
                     
               for(let j=0 ; j<horasBloquear.length ; j++){


                  //SI UNO DE LOS OPTIONS DEL SELECT DE HORA ESTÁ DENTRO DE LA HORAS HORAS A BLOQUEAR
                  //ENTONCES LO BLOQUEAMOS
                  if(arregloOpciones[i].value==horasBloquear[j] ){

                  
                        arregloOpciones[i].disabled=true;
                        arregloOpciones[i].style="color:red!important";

                    
                      }



                    }



                 }
        

          }

}

export default setBloquearOptions;