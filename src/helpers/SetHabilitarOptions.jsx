const setHabilitarOptions = (arregloOpciones)=>{



    for(let i=0 ; i<arregloOpciones.length ; i++){
    
         
    
        arregloOpciones[i].disabled=false;
        arregloOpciones[i].style="color:black";


    }


}

export default setHabilitarOptions;