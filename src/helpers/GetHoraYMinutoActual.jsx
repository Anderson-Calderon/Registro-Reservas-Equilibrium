const getHoraYMinutoActual = (fechaSeleccionada,fechaFormateada)=>{

    let hora,
        minutos,
        hoy=false,
        horaYMinutos="";






    if(fechaSeleccionada==fechaFormateada){

        hoy=true;


        /*fechaSinFormato = new Date();


        hora=fechaSinFormato.getHours() ;


        minutos = fechaSinFormato.getMinutes() +1;


        if(hora<10){

        hora = "0"+hora;

        }


        if(minutos<10){

        minutos= "0"+minutos;

        }*/




        //horaYMinutos = hora + ":"+minutos;
        //horaYMinutos = "16:01";



        let fechaActualSinFormato = new Date();
        fechaActualSinFormato.setMinutes(fechaActualSinFormato.getMinutes() + 1);

        hora = ('0' + fechaActualSinFormato.getHours()).slice(-2);
        minutos = ('0' + fechaActualSinFormato.getMinutes()).slice(-2);

      
        horaYMinutos = hora+":"+minutos;

   

    }



    return [ horaYMinutos.length>0 ? horaYMinutos : "" , hoy];



}

export default getHoraYMinutoActual;