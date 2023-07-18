import { useState , useEffect} from 'react'
import viteLogo from '/vite.svg'


function App() {


const [reservas,setReservas] = useState([]);
const [numeroRegistro , setNumeroRegistro] = useState(1);
let reservaExitosa = " tu reserva ha sido registrada con éxito.";

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

  


console.log(reservas);
  return (
    <>
     



      <div className="">

        <section className="">

          <div className="">

            <div className="contenedor">

             <h1 className="mt-10 py-10 text-center text-5xl"><span className="font-bold">Equilibrium</span> - Registro De Reservas</h1>
             
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

                                 <tr key={reserva._id}>
                          
                                 
                                  <td>{reserva.nombre}</td>
                                  <td>{reserva.apellidos}</td>
                                  <td>{reserva.telefono}</td>
                                  <td>{reserva.servicio}</td>
                                  <td>{reserva.fecha}</td>
                                  <td>{reserva.hora}</td>
                                  <td>
                                    
                                   <a href={reserva.captura} target="_blank">
                                     <img className="imagen" src={reserva.captura}  />
                                   </a>

                                  </td>

                                  <td>
                                    
                                    <a  className=" bg-indigo-400 text-white hover:text-white hover:bg-indigo-600  py-3 w-full text-center inline-block" href={`https://api.whatsapp.com/send?phone=+51914740170&text=Hola%20${reserva.nombre}%20👋%20,${reservaExitosa}%0ATe%20esperamos%20este%20${reserva.fecha}%20a%20las%20${reserva.hora}`} target="_blank" >Aceptar Reserva</a>

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
      </div>
    </>
  )
}

export default App
