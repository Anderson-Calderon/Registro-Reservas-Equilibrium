import { useState , useEffect} from 'react'

import axios from 'axios';

import fechaLarga from "../helpers/FechaLarga";
import io from 'socket.io-client';


let socket;

const HistorialReservas = ()=>{
	

	
const [reservas,setReservas] = useState([]);


const [urlPago , setUrlPago] = useState("");
const [establecerTabla,setEstablecerTabla] = useState(false);

let reservaExitosa = " tu reserva ha sido registrada con éxito.";
let iterador = 0;




useEffect( ()=>{

  const obtenerReservas = async ()=>{

    const data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reservas`);

    const reservas = await data.json();

    setReservas(reservas);

  }
  

  obtenerReservas();


},[]);


useEffect(()=>{

  const obtenerReservas = async ()=>{

  
  
      let  informacionTotalDeServiciosAceptadosPorFecha = [];
      let  sumaTotalGananciaPorFecha = 0 ;

      const reservasFormateada = reservas.map((reserva)=>{//formateamos al arreglo que almacena toda la información
                                                          //que seleccionamos al realizar click en una de las fechas
                                                          //del calendario.Lo formateamos para obtener únicamente a
                                                          //los campos que nos interesa mostrar en la tabla

            const {hora,fecha,captura,servicio,telefono,nombre,apellidos,precio,aceptada} = reserva;

            const espacio = "%20",
                  saltoDeLinea = "%0A";
          
            let reservaExitosa = `Hola${espacio}${reserva.nombre}${espacio}👋${espacio}¡tu${espacio}reserva${espacio}en${espacio}Equilibrium${espacio}para${espacio}${reserva.servicio}${saltoDeLinea}ha${espacio}sido${espacio}registrada${espacio}con${espacio}éxito!${espacio}Te${espacio}esperamos${espacio}este${espacio}${fechaLarga(reserva.fecha)}${espacio}a${espacio}las${espacio}${reserva.hora.replace(/\s/g,espacio)}`
            
            reservaExitosa =`https://api.whatsapp.com/send?phone=+51${reserva.telefono}&text=${reservaExitosa}`;
            

       
           
            

           const existeServicio = informacionTotalDeServiciosAceptadosPorFecha.find((info) => info.servicio === servicio && info.precio === precio );
           
           
           if(existeServicio && aceptada){

              informacionTotalDeServiciosAceptadosPorFecha.forEach((info)=>{

                if(info.servicio == servicio){

                    info.numeroReservasAceptadas =  info.numeroReservasAceptadas + 1;

                }

              });


           }else if(!existeServicio && aceptada){
         
            informacionTotalDeServiciosAceptadosPorFecha.push({servicio,precio,numeroReservasAceptadas:1});

           }

           if(aceptada){

              sumaTotalGananciaPorFecha +=precio; 
          
            
           }




              return {

                        hora:`<span class=${aceptada ? "pintar-tr" : ""}>${hora}</span>`,
                        fecha:fecha,
                        pago:`<img data-target="#modal-captura-pago" data-toggle="modal"  id="capturaPago" src=${captura}>`,
                        servicio:servicio,
                        telefono:telefono,
                        nombre:nombre,
                        apellidos:apellidos,
                        acciones : reserva.aceptada ? `<td><button class=" fondo-aceptar-reserva text-black   py-3 w-full text-center inline-block mt-5 cursor-default">LA RESERVA YA FUE ACEPTADA</button> </td> ` : 
                            (  ` <td>
                      
                                      <a  id=${reserva._id} class=" bg-teal-400 text-white hover:text-white hover:bg-teal-500  py-3 w-full text-center inline-block" href=${reservaExitosa} target="_blank" >Aceptar Reserva</a>

                                      <button  
                                        
                                          class="bg-red-600 text-white hover:text-white hover:bg-red-700  py-3 w-full text-center inline-block mt-5"   
                                          data-id-reserva=${reserva._id} 
                                          >

                                              Eliminar 

                                      </button>


                                </td>`)

                      } 

      });//Fin del formateo del arreglo
      

      //setDataTotalDeServiciosAceptadosPorFecha(informacionTotalDeServiciosAceptadosPorFecha);
     // setTotalGananciaPorFecha(sumaTotalGananciaPorFecha);
     
      $(".tablas").DataTable({//Inicializamos a la tabla con la data que nos interesa ver


     destroy: true,


     columns: [

      { title: 'Hora', data: 'hora'}, 
      { title: 'Fecha', data: 'fecha'}, 
      { title: 'Servicio', data: 'servicio'}, 
      { title: 'Pago', data: 'pago'}, 
      { title: 'Telefono', data: 'telefono'}, 
      { title: 'Nombre', data: 'nombre'}, 
      { title: 'Apellidos', data: 'apellidos'}, 
      { title: 'Acciones', data: 'acciones'}, 


    ],

    

    "language": {

      "sProcessing":     "Procesando...",
      "sLengthMenu":     "Mostrar _MENU_ registros",
      "sZeroRecords":    "No se encontraron resultados",
      "sEmptyTable":     "Ningún dato disponible en esta tabla",
      "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
      "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
      "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
      "sInfoPostFix":    "",
      "sSearch":         "Buscar:",
      "sUrl":            "",
      "sInfoThousands":  ",",
      "sLoadingRecords": "Cargando...",
      "oPaginate": {
      "sFirst":    "Primero",
      "sLast":     "Último",
      "sNext":     "Siguiente",
      "sPrevious": "Anterior"
      },
      "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
      }

    },

    data:reservasFormateada,
    //AGREGAMOS UNA CLASE A LA FILA DE LA TABLA QUE CONTIENE UNA RESERVADA ACEPTADA
    createdRow: function (row, data, dataIndex) {
    
      if (data.acciones.includes("YA FUE ACEPTADA")) {
      
        $(row).addClass('reserva-aceptada');


      }


    },
    

  });//Fin de inicializar a la tabla con la data que nos interesa ver,




  }

  obtenerReservas();



  },[reservas]);//Cada que hay cambios en  el arreglo que almacena las reservas se ejecutará esto.



   const eliminarReserva = async (idReserva)=>{


    Swal.fire({
      title: 'Eliminar Reserva',
      text: "¿ Estás seguro de eliminar esta reserva ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí!',
      cancelButtonText:'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {


      

        let config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer Token`
            }
        }

        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/reservas/${idReserva}`, config);



    Swal.fire({
      title: 'Reserva Eliminada',
      text: "La reserva fue eliminada con éxito",
      icon: 'success',
   
      confirmButtonColor: '#3085d6',
    
      confirmButtonText: 'Sí!'
   
    }).then((result) => {


      if (result.isConfirmed) {


      
        window.location.href="/inicio/reservas";





        }
      })






      }
    })


    }


    const aceptarReserva = async (idReserva,enlace)=>{
    
      Swal.fire({
        title: 'Aceptar Reserva',
        text: "¿ Estás seguro de aceptar esta reserva ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí!',
        cancelButtonText:'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
  
  
        
  
          let config = {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer Token`
              }
          }
          
          try{

             
             
             await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/reservas`,{_id:idReserva}); 
             
          

             setTimeout(()=>{//Recargamos la página para obtener toda la data actualizada , y ver reflejado
                             //la aceptación de la reserva 


                window.location.href = window.location.href;

             },500);

             window.open(enlace, '_blank');//abrimos una nueva pestaña la cual va redireccionada a whatsapp
                                           //para enviar el mensaje de aceptación al usuario.
                                           
                                           
          }catch(error){

              console.log(error.message);
          }
  
  
        }
      })
  
  
      }






    const clickBody = (e)=>{//SE EJECUTA CADA QUE REALIZAMOS CLICK EN EL BOTÓN DE "ELIMINAR RESERVA",
      //"ACEPTAR RESERVA" Y "VER CAPTURA DEL PAGO"


        //ELIMIMAR RESERVA
        if(e.target.classList.contains("bg-red-600")){



        const idReserva = e.target.getAttribute("data-id-reserva");  

        eliminarReserva(idReserva);

        }else if(e.target.classList.contains("bg-teal-400")){//ACEPTAR RESERVA



        e.preventDefault();
        //ACEPTAR RESERVA
        aceptarReserva(e.target.getAttribute("id"),e.target.getAttribute("href"));


        }else if(e.target.getAttribute("id")=="capturaPago"){


        setUrlPago(e.target.getAttribute("src"));

        }else if(e.target.getAttribute("data-target")=="#modal-captura-pago"){

        setUrlPago(e.target.querySelector("img").getAttribute("src"));

        }




}

	return(


				
         <div className="content-wrapper">

          <section className="content-header">
    
            <h1>
              
              Historial de Reservas
            
            </h1>

            <ol className="breadcrumb">
              
              <li><a href="inicio"><i className="fa fa-dashboard"></i> Inicio</a></li>
              
              <li className="active">Historial de Reservas</li>
            
            </ol>

          </section>


        <section className="content">

          <div className="box">


             <div className="box-header with-border">
  
             

            </div>

            <div className="box-body contenedor">

            
             
             <table className="  table table-bordered table-striped dt-responsive tablas" >
               
                <thead>
                 
                 <tr>
                   
                  
                 <th>Hora</th>
                 <th>Fecha</th>
                 <th>Pago</th>
                 <th>Servicio</th>
                 <th>Telefono</th>
                 <th>Nombre</th>
                 <th>Apellidos</th>
                 <th>Acciones</th>

                 </tr> 

                </thead>

                <tbody

                  onClick={(e)=>{clickBody(e)}}

                >

                 



                </tbody>

             </table>

           </div>


          </div>
        </section>



<div className="modal" id="modal-captura-pago">
  <div className="modal-dialog">
    <div className="modal-content">

   
      <div className="modal-header">
        <h4 className="modal-title text-4xl">Captura Del Pago</h4>
        <button type="button" className="close" data-dismiss="modal">&times;</button>
      </div>

    
      <div className="modal-body">
        

        <img className="m-auto" src={urlPago} />


      </div>


      <div className="modal-footer">
        <button type="button" className="btn  bg-indigo-600 text-white hover:text-white" data-dismiss="modal">Cerrar</button>
      </div>

    </div>
  </div>
</div>

        </div>


		   )


}

export default HistorialReservas;