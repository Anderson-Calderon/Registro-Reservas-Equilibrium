import {useState,useEffect} from 'react';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import {alertaEditarAgregarError} from '../helpers/Alerta';
import {Navigate} from 'react-router-dom';
const Servicios = ()=>{
	
	const {areas,setAreas,servicios,setServicios} = useAdmin();
    
	const {auth:{area}} = useAuth();



	const [nombreServicio , setNombreServicio] = useState("");
    const [precioServicio , setPrecioServicio] = useState(0);
    const [numeroReservasServicio , setNumeroReservasServicio] = useState(0);
    
    const [horasSeleccionadas , setHorasSeleccionadas ]= useState([]);

	const [objetoServicio,setObjetoServicio]=useState({});

	
	if(area!="Gerencia"){
	
		location.href="/inicio";

		return;

	
	}


    let iterador = 0;

	


  useEffect(()=>{


        
    const serviciosFormateado = servicios.map((servicio)=>{

        const {nombre,precio,numeroReservas} = servicio;
      
  
          return {
  
                    nombre,
                    precio:`<span>S/. ${precio}.00</span>`,
                    numeroReservas,
                    acciones :   ` <td>
                  
                                        <button 

                                            data-id=${servicio._id}
                                           
                                            id="btn-editar"	
                                            type="button" class="w-full btn bg-sky-600 text-white hover:btn-sky-500 hover:text-white" data-toggle="modal" 
                                            data-target="#modalEditar" 

                                           


                                        >

                                             EDITAR


                                        </button>


                                        <button  
                                            
                                            class="bg-red-600 text-white hover:text-white hover:bg-red-700  py-3 w-full text-center inline-block mt-5"   
                                            data-id-servicio=${servicio._id}
                                            id="btn-eliminar" 
                                            >
        
                                                Eliminar 
        
                                        </button>
  
  
                                    </td>`
  
                  } 
  
        });
  


		$(".tablas").DataTable({
	   
            destroy: true,


            columns: [

            { title: 'Nombre', data: 'nombre'}, 
            { title: 'Precio', data: 'precio'}, 
            { title: 'N° De Reservas Por Hora', data: 'numeroReservas'}, 
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
            data:serviciosFormateado,
  
	});
  
  



  },[servicios]);


	const eliminarServicio =  (idServicio)=>{

 	Swal.fire({
			  title: 'Eliminar Servicio',
			  text: "Estás seguro de eliminar este servicio ?",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Sí , Eliminar!',
			  cancelButtonText: 'No'
			}).then(async (result) => {
			  if (result.isConfirmed) {


			  
			   	const {data} = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/servicios/${idServicio}`);

                   
			   	 	Swal.fire({
					  title: 'Servicio Eliminado',
					  text: data.msg,
					  icon: 'success',
					  confirmButtonColor: '#3085d6',
					  confirmButtonText: 'OK',
					 
					}).then(async (result) => {
			  			if (result.isConfirmed) {

			  					location.href="/inicio/servicios"


			  				}

			  			});


			  }




			}) 


	}
	

	

	const editarServicio = async (e)=>{

		e.preventDefault();
		

		

		try{

      const {nombre,precio,numeroReservas,horasSeleccionadas} = objetoServicio;

			const {data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/servicios/${objetoServicio._id}`,{nombre,precio,numeroReservas,horasSeleccionadas});

           

		
            
			alertaEditarAgregarError('Servicio Editado',data.msg,'success',"/inicio/servicios");

		}catch(error){

			alertaEditarAgregarError("Error",error.response.data.msg,"error","");

		}


		
	}

	const agregarServicio = async (e)=>{

		e.preventDefault();

        



  
		
		try{

          
			const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/servicios`,{nombre:nombreServicio,precio:precioServicio,numeroReservas:numeroReservasServicio,horasSeleccionadas});

		

			alertaEditarAgregarError('Servicio Agregado',data.msg,'success',"/inicio/servicios");


		}catch(error){

			alertaEditarAgregarError("Error",error.response.data.msg,"error","");

		}

	}

    const clickBody = (e)=>{

        console.log(e.target);
        if(e.target.getAttribute("id")=="btn-editar"){//AL HACER CLICK EN EDITAR SERVICIO

            const _id = e.target.getAttribute("data-id");
            
            const servicioEditar = servicios.filter((servicio)=> servicio._id==_id )[0];


              const horasEditar = document.querySelectorAll("#editar-horas-seleccionadas span");



                setObjetoServicio(servicioEditar);
            
    
          }
    
    
          if(e.target.getAttribute("id")=="btn-eliminar"){

                const  _id = e.target.getAttribute("data-id-servicio");
        
        
                
                eliminarServicio(_id);
    
           
    
    
          }
 
    
 
     }

     const contenedorHoras = (e)=>{

     

      const elemento = e.target;

      
      if(!elemento.textContent.includes(".")){

        return;

      }

      if(elemento.classList.contains("activo")){ //REMOVEMOS LA HORA

        elemento.classList.remove("activo");

        const nuevasHorasSeleccionadas = horasSeleccionadas.filter((horas)=>  horas!=elemento.textContent  );

        setHorasSeleccionadas(nuevasHorasSeleccionadas);
      }else{//AGREGAMOS LA HORA

        elemento.classList.add("activo");
       setHorasSeleccionadas([...horasSeleccionadas,elemento.textContent]);

      }
    
      

     }

     const editarContenedorHoras = (e)=>{

     

      const elemento = e.target;

      
      if(!elemento.textContent.includes(".")){

        return;

      }

      if(elemento.classList.contains("activo")){ //REMOVEMOS LA HORA

        elemento.classList.remove("activo");

        const nuevasHorasSeleccionadas = objetoServicio.horasSeleccionadas.filter((horas)=>  horas!=elemento.textContent  );

        objetoServicio.horasSeleccionadas = nuevasHorasSeleccionadas;
        
      }else{//AGREGAMOS LA HORA

        elemento.classList.add("activo");
      // setHorasSeleccionadas([...horasSeleccionadas,elemento.textContent]);
      objetoServicio.horasSeleccionadas.push(elemento.textContent);

      }
    
      

     }


	return(


			<>

			<div className="content-wrapper">

          <section className="content-header">
    
            <h1>
              
              Administrar Servicios
            
            </h1>

            <ol className="breadcrumb">
              
              <li><a href="/inicio"><i className="fa fa-dashboard"></i> Inicio</a></li>
              
              <li className="active">Inicio</li>
            
            </ol>

          </section>


        <section className="content">

          <div className="box">


             <div className="box-header with-border">
  
             	<button  type="button" className="btn bg-sky-600 text-white hover:bg-sky-500 hover:text-white" data-toggle="modal" data-target="#modalAgregar"  >AGREGAR</button>

            </div>

            <div className="box-body contenedor">

            
             
             <table className="  table table-bordered table-striped dt-responsive tablas" >
               
                <thead>
                 
                 <tr>
                   
                  
                    <td className="text-center py-5 px-10">Servicio</td>
                    <td className="text-center py-5 px-10">Precio</td>
                    <td className="text-center py-5 px-10">N° De reservas por hora</td>
					<td className="text-center py-5 px-10">ACCIONES</td>

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
        </div>






<div id="modalEditar" className="modal fade" role="dialog">
  <div className="modal-dialog">

   
    <div className="modal-content">
      <div className="modal-header bg-sky-600 ">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title text-white text-4xl">Editar Servicio</h4>
      </div>
      <div className="modal-body">
        <form

        	onSubmit={(e)=>{editarServicio(e)}}

        >
           <label className='mt-2'  htmlFor="">Servicio:</label> 
		  <div className="input-group">
		    <span className="input-group-addon"><i class="fa-solid fa-layer-group"></i></span>
		    <input onChange={(e)=>{setObjetoServicio({...objetoServicio,nombre:e.target.value})}}  value={objetoServicio.nombre} id="nombre-servicio" type="text" className="form-control"  placeholder="Nombre Del Área" required />
		  </div>


          <label className='mt-5' htmlFor="">Precio:</label> 
          <div className="input-group mt-2">

            
		    <span className="input-group-addon"><i class="fa-solid fa-coins"></i></span>
		    <input onChange={(e)=>{setObjetoServicio({...objetoServicio,precio:e.target.value})}}  value={objetoServicio.precio} id="precio-servicio" type="number" className="form-control"  placeholder="Nombre Del Servicio" required />
		  </div>

          <label className='mt-5' htmlFor="">Número de reservas por hora:</label> 
          <div className="input-group mt-2">
		    <span className="input-group-addon"><i class="fa-solid fa-clock"></i></span>
		    <input onChange={(e)=>{setObjetoServicio({...objetoServicio,numeroReservas:e.target.value})}}  value={objetoServicio.numeroReservas} id="numero-reservas-servicio" type="number" className="form-control"  placeholder="Número de reservas por Hora" required />
		  </div>  



      <div id="editar-horas-seleccionadas" onClick={(e)=>{editarContenedorHoras(e)}} className="contenedor-horas">

        <div className="horas">
        <span className={ objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="09:00 a. m." ).length >  0  ? "activo" : ""  }>09:00 a. m.</span>
          <span className={ objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="09:30 a. m." ).length >  0  ? "activo" : ""  }>09:30 a. m.</span>
          <span className={  objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="10:00 a. m." ).length >  0  ? "activo" : "" }>10:00 a. m.</span>
          <span className={  objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="10:30 a. m." ).length >  0  ? "activo" : "" }>10:30 a. m.</span>
          <span className={  objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="11:00 a. m." ).length >  0  ? "activo" : "" }>11:00 a. m.</span>
          

          

        </div>

        <div className="horas">

          <span className={  objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="11:30 a. m." ).length >  0  ? "activo" : "" }>11:30 a. m.</span>
          <span className={  objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="12:00 p. m." ).length >  0  ? "activo" : "" }>12:00 p. m.</span>
          <span className={  objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="12:30 p. m." ).length >  0  ? "activo" : "" }>12:30 p. m.</span>
          <span className={  objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="13:00 p. m." ).length >  0  ? "activo" : "" }>13:00 p. m.</span>
          <span className={  objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="13:30 p. m." ).length >  0  ? "activo" : "" }>13:30 p. m.</span>



        </div>

        <div className="horas">

          
          <span className={  objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="14:00 p. m." ).length >  0  ? "activo" : "" }>14:00 p. m.</span>
          <span className={  objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="14:30 p. m." ).length >  0  ? "activo" : "" }>14:30 p. m.</span>
          <span className={  objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="15:00 p. m." ).length >  0  ? "activo" : "" }>15:00 p. m.</span>
          <span className={  objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="15:30 p. m." ).length >  0  ? "activo" : "" }>15:30 p. m.</span>
          <span className={  objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="16:00 p. m." ).length >  0  ? "activo" : "" }>16:00 p. m.</span>




        </div>  


        
        <div className="horas">

          <span className={  objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="16:30 p. m." ).length >  0  ? "activo" : "" }>16:30 p. m.</span>
          <span className={  objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="17:00 p. m." ).length >  0  ? "activo" : "" }>17:00 p. m.</span>
          <span className={  objetoServicio?.horasSeleccionadas?.filter((horaSeleccionada)=>  horaSeleccionada=="17:30 p. m." ).length >  0  ? "activo" : "" }>17:30 p. m.</span>

        </div> 

      </div> 

		  <input type="submit" className="mt-10 btn bg-sky-600 hover:bg-sky-500  text-white hover:text-white" value="Editar Servicio"  />

		  
		</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>



<div id="modalAgregar" className="modal fade" role="dialog">
  <div className="modal-dialog">

   
    <div className="modal-content">
      <div className="modal-header bg-sky-600 ">
        <button type="button" className="close text-white text-4xl" data-dismiss="modal">&times;</button>
        <h4 className="modal-title text-white text-4xl">Agregar Servicio</h4>
      </div>
      <div className="modal-body">
        <form

        	onSubmit={(e)=>{agregarServicio(e)}}

        >

		  <div className="input-group">
		    <span className="input-group-addon"><i class="fa-solid fa-layer-group"></i></span>
		    <input   onChange={(e)=>{setNombreServicio(e.target.value)}} id="nombre-servicio" type="text" className="form-control"  placeholder="Nombre Del Servicio" required />
		  </div>

           <div className="input-group mt-5">
		    <span className="input-group-addon"><i class="fa-solid fa-coins"></i></span>
		    <input   onChange={(e)=>{setPrecioServicio(e.target.value)}} id="precio-servicio" type="number" className="form-control"  placeholder="Precio Del Servicio" required />
		  </div>



          <div className="input-group mt-5">
		    <span className="input-group-addon"><i class="fa-solid fa-clock"></i></span>
		    <input   onChange={(e)=>{setNumeroReservasServicio(e.target.value)}} id="numero-reservas-servicio" type="number" className="form-control"  placeholder="Número de Reservas Del Servicio" required />
		  </div> 

          

      <div onClick={(e)=>{contenedorHoras(e)}} className="contenedor-horas">

        <div className="horas">
          <span>09:00 a. m.</span>
          <span>09:30 a. m.</span>
          <span>10:00 a. m.</span>
          <span>10:30 a. m.</span>
          <span>11:00 a. m.</span>
          

          

        </div>

        <div className="horas">
          <span>11:30 a. m.</span>
          <span>12:00 p. m.</span>
          <span>12:30 p. m.</span>
          <span>13:00 p. m.</span>
          <span>13:30 p. m.</span>


          </div>

        <div className="horas">

          <span>14:00 p. m.</span>
          <span>14:30 p. m.</span>
          <span>15:00 p. m.</span>
          <span>15:30 p. m.</span>
          <span>16:00 p. m.</span>

        </div>   

        <div className="horas">

          <span>16:30 p. m.</span>
          <span>17:00 p. m.</span>
          <span>17:30 p. m.</span>
        

        </div> 

      </div>            
		  

		  <input type="submit" className="mt-5  btn  bg-sky-600 hover:bg-sky-500 text-white hover:text-white" value="Agregar"  />

		  
		</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>	






			</>







		   )

}

export default Servicios;