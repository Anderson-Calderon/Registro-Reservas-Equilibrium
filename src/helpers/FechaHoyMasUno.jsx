
import formatearFecha from "./FormatearFecha";

const  dateHoyMasUno = ()=>{

    let hour,
        minuts,
        hourAndMinuts;
   

    /*hour=fechaHoy.getHours();
    minuts = fechaHoy.getMinutes() +1;



    if(hour<10){

      hour = "0"+hour;

    }

   
    if(minuts<10){

      minuts= "0"+minuts;

    }

    
    hourAndMinuts = hour + ":"+minuts;*/


    let fechaActualSinFormato = new Date();
        fechaActualSinFormato.setMinutes(fechaActualSinFormato.getMinutes() + 1);

        hour = ('0' + fechaActualSinFormato.getHours()).slice(-2);
        minuts = ('0' + fechaActualSinFormato.getMinutes()).slice(-2);

      
        hourAndMinuts = hour+":"+minuts;


 
    
    if(hourAndMinuts>"16:00"){

        let fechaActual = new Date() ;
    
        fechaActual.setDate(  fechaActual.getDate() + 1);

    
        return  formatearFecha(fechaActual);
          
    }else{

        return "";

    }


}

export default dateHoyMasUno;