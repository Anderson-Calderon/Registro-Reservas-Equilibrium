const InformacionNumericaDeLasReservasSeleccionadas = ({dataTotalDeServiciosAceptadosPorFecha,totalGananciaPorFecha})=>{

    console.log("DATA DATA .. .");
    console.log(dataTotalDeServiciosAceptadosPorFecha);
    let identificador = 0;
    return(

           <> 
            <div class=" flex gap-40 justify-center mt-10 flex-wrap">



                {

                    dataTotalDeServiciosAceptadosPorFecha.map((service)=>{
                            const {servicio,precio,numeroReservasAceptadas} = service;
                            identificador+=1;
                            return(

                                        <p key={identificador} className=" ">

                                            <span className=" text-green-500 text-4xl font-bold">{servicio}</span><br/>
                                            <span className=" text-green-900 font-bold text-3xl"> Precio : </span> <span className="text-3xl">S/.{precio}.00</span> <br/>
                                            <span className=" text-green-900 font-bold text-3xl">Reservas Aceptas : </span> <span className="text-3xl">{numeroReservasAceptadas}</span>
                                        
                                        </p>


                                )

                    }) 

                }

                  
              

           </div> 

            <div>

                <p className="mt-10 text-right">

                    <span className=" text-green-500 text-4xl font-bold">TOTAL : </span>
                    <span className="text-5xl">S/.{totalGananciaPorFecha}.00</span> <br/>


                </p>

            </div>



        </>




            )



}

export default InformacionNumericaDeLasReservasSeleccionadas;