import { useState , useEffect} from 'react'

import axios from 'axios';


const Reservas = ()=>{
	

	
const [reservas,setReservas] = useState([]);
const [urlPago , setUrlPago] = useState("");

let reservaExitosa = " tu reserva ha sido registrada con éxito.";

console.log(urlPago);
useEffect(()=>{

  const obtenerReservas = async ()=>{

    const data = await fetch("https://thawing-tor-28257-ac5d395f69e2.herokuapp.com/api/usuarios");
    const reservas = await data.json();

    setReservas(reservas);

    setTimeout(()=>{


      $(".tablas").DataTable({
     "destroy": true,
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

    }

  });


    },500);


  }

  obtenerReservas();



  },[]);


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

        await axios.delete("https://thawing-tor-28257-ac5d395f69e2.herokuapp.com/api/usuarios/"+idReserva, config);



    Swal.fire({
      title: 'Reserva Eliminada',
      text: "La reserva fue eliminada con éxito",
      icon: 'success',
   
      confirmButtonColor: '#3085d6',
    
      confirmButtonText: 'Sí!'
   
    }).then((result) => {


      if (result.isConfirmed) {


      
        window.location.href="/";





        }
      })






      }
    })


    }



    //ESTABLECEMOS LA URL DE LA CAPTURA DE LA FOTO EN EL STATE , CUANDO LA PANTALLA SEA PEQUEÑA.

    const establecerURLCaptura=(e,reserva)=>{

      const tbody = document.querySelector("tbody");

      const trChild = tbody.querySelectorAll("tr.child");

     if(trChild){


                    setUrlPago(reserva.captura);

                }


    }

	return(


				
         <div className="content-wrapper">

          <section className="content-header">
    
            <h1>
              
              Administrar Reservas
            
            </h1>

            <ol className="breadcrumb">
              
              <li><a href="inicio"><i className="fa fa-dashboard"></i> Inicio</a></li>
              
              <li className="active">Administrar Reservas</li>
            
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
                   
                
                   <th>Nombre</th>
                   <th>Apellidos</th>
                   <th>Telefono</th>
                   <th>Servicio</th>
                   <th>Fecha</th>
                   <th>Hora</th>
                   <th>Pago</th>
                   <th>Acciones</th>

                 </tr> 

                </thead>

                <tbody>

                  {

                    reservas.map((reserva)=>{

                      return (

                                 <tr 

                                    onClick={(e)=>{establecerURLCaptura(e,reserva)}}
                                    key={reserva._id}


                                 >
                          
                                 
                                  <td>{reserva.nombre}</td>
                                  <td>{reserva.apellidos}</td>
                                  <td>{reserva.telefono}</td>
                                  <td>{reserva.servicio}</td>
                                  <td>{reserva.fecha}</td>
                                  <td>{reserva.hora}</td>
                                  <td>
                                    
                                   <a 

                                        href="#" 
                                        data-target="#myModal" 
                                        data-toggle="modal"  
                                        onClick={(e)=>{setUrlPago(reserva.captura)}}

                                   >
                                     <img className="imagen" src={reserva.captura}  />
                                   </a>

                                  </td>

                                  <td>
                                    
                                    <a  className=" bg-indigo-400 text-white hover:text-white hover:bg-indigo-600  py-3 w-full text-center inline-block" href={`https://api.whatsapp.com/send?phone=+51914740170&text=Hola%20${reserva.nombre}%20👋%20,${reservaExitosa}%0ATe%20esperamos%20este%20${reserva.fecha}%20a%20las%20${reserva.hora}`} target="_blank" >Aceptar Reserva</a>

                                    <button  
                                       
                                        className=" bg-red-600 text-white hover:text-white hover:bg-red-700  py-3 w-full text-center inline-block mt-5"   
                                        onClick={()=>{eliminarReserva(reserva._id)}}    


                                        >Eliminar </button>


                                  </td>

                                </tr>     

                              )



                    })
                  }
                 
                  
               



                </tbody>

             </table>

           </div>


          </div>
        </section>



<div className="modal" id="myModal">
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

export default Reservas;