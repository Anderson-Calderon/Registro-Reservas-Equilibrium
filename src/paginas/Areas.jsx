import {useState,useEffect} from 'react';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import {alertaEditarAgregarError} from '../helpers/Alerta';
import {Navigate} from 'react-router-dom';
const Areas = ()=>{
	
	const {areas,setAreas} = useAdmin();
	const {auth:{area}} = useAuth();
	const [nombreArea , setNombreArea] = useState("");

	const [objetoArea,setObjetoArea]=useState({});

	
	if(area!="Gerencia"){
	
		location.href="/inicio";

		return;

	
	}

	const [establecerTabla,setEstablecerTabla] = useState(false);
    let iterador = 0;

	useEffect(()=>{
	






  

    const body = document.querySelector("body");

    body.addEventListener("click",function(e){

     
      if(e.target.getAttribute("id")=="btn-editar"){
        const nombre = e.target.getAttribute("data-area"),
              _id = e.target.getAttribute("data-id");



        		setObjetoArea({nombre,_id});

       


      }


      if(e.target.getAttribute("id")=="btn-eliminar"){
        const  _id = e.target.getAttribute("data-id");



        		eliminarArea(_id);

       


      }


    

    })



  },[]);


  useEffect(()=>{

	if(!establecerTabla){return}

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
  
  
	  },0);



  },[establecerTabla]);


	const eliminarArea =  (idArea)=>{

 	Swal.fire({
			  title: 'Eliminar Área?',
			  text: "Estás seguro de eliminar esta área ?",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Sí , Eliminar!',
			  cancelButtonText: 'No'
			}).then(async (result) => {
			  if (result.isConfirmed) {


			  
			   	const obj = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/areas/${idArea}`);


			   	 	Swal.fire({
					  title: 'Área Eliminada',
					  text: "Área eliminada correctamente",
					  icon: 'success',
					  confirmButtonColor: '#3085d6',
					  confirmButtonText: 'OK',
					 
					}).then(async (result) => {
			  			if (result.isConfirmed) {

			  					location.href="/inicio/areas"


			  				}

			  			});


			  }




			}) 


	}
	

	

	const editarArea = async (e)=>{

		e.preventDefault();
		

		

		try{

			const data = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/areas/${objetoArea._id}`,{nombreArea:objetoArea.nombre});



		

			alertaEditarAgregarError('Área Editada',"Área editada correctamente",'success',"/inicio/areas");

		}catch(error){

			alertaEditarAgregarError("Error",error.response.data.msg,"error","");

		}


		
	}

	const agregarArea = async (e)=>{

		e.preventDefault();
		
		try{


			const data = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/areas`,{nombre:nombreArea});

		

			alertaEditarAgregarError('Área Agregada',"Área agregada correctamente",'success',"/inicio/areas");


		}catch(error){

			alertaEditarAgregarError("Error",error.response.data.msg,"error","");

		}

	}

	return(


			<>

			<div className="content-wrapper">

          <section className="content-header">
    
            <h1>
              
              Administrar Áreas
            
            </h1>

            <ol className="breadcrumb">
              
              <li><a href="/inicio"><i className="fa fa-dashboard"></i> Inicio</a></li>
              
              <li className="active">Inicio</li>
            
            </ol>

          </section>


        <section className="content">

          <div className="box">


             <div className="box-header with-border">
  
             	<button type="button" className="btn bg-sky-600 text-white hover:bg-sky-500 hover:text-white" data-toggle="modal" data-target="#modalAgregar"  >AGREGAR</button>

            </div>

            <div className="box-body contenedor">

            
             
             <table className="  table table-bordered table-striped dt-responsive tablas" >
               
                <thead>
                 
                 <tr>
                   
                  
                   <td className="text-center py-5 px-10">ÁREA</td>
							<td className="text-center py-5 px-10">ACCIONES</td>

                 </tr> 

                </thead>

                <tbody

                

                >

           
                  	{


							areas && areas.map((area)=>{

								

													iterador+=1;
												
													if(iterador==areas.length){
														
														setTimeout(()=>{
								
														setEstablecerTabla(true);
								
														},500);
								
													}
													const {nombre} = area;

													return(


																<tr id={nombre=="Cliente" ? "ocultar-fila":""} key={area._id}>
							
																	<td>{nombre}</td>
																	<td>
																			
																	

																		<button 

																		data-id={area._id}
																		data-area={nombre}
																		id="btn-editar"	
																		type="button" className="btn bg-sky-600 text-white hover:btn-sky-500 hover:text-white" data-toggle="modal" 
																		data-target="#modalEditar" 

																		disabled={nombre=="Gerencia" && "true"}

																		 >EDITAR</button>



																		<button 
																		data-id={area._id}
																		id="btn-eliminar"	
																		className="ml-5 btn bg-red-500 text-white hover:bg-red-400 hover:text-white"
																		disabled={nombre=="Gerencia" && "true"}
																		 >ELIMINAR</button>

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






				<div id="modalEditar" className="modal fade" role="dialog">
  <div className="modal-dialog">

   
    <div className="modal-content">
      <div className="modal-header bg-sky-600 ">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title text-white text-4xl">Editar Area</h4>
      </div>
      <div className="modal-body">
        <form

        	onSubmit={(e)=>{editarArea(e)}}

        >

		  <div className="input-group">
		    <span className="input-group-addon"><i class="fa-solid fa-layer-group"></i></span>
		    <input onChange={(e)=>{setObjetoArea({...objetoArea,nombre:e.target.value})}}  value={objetoArea.nombre} id="nombre-area" type="text" className="form-control" name="text" placeholder="Nombre Del Área" required />
		  </div>



		  <input type="submit" className="mt-5 btn bg-sky-600 hover:bg-sky-500  text-white hover:text-white" value="Editar Área"  />

		  
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
        <h4 className="modal-title text-white text-4xl">Agregar Area</h4>
      </div>
      <div className="modal-body">
        <form

        	onSubmit={(e)=>{agregarArea(e)}}

        >

		  <div className="input-group">
		    <span className="input-group-addon"><i class="fa-solid fa-layer-group"></i></span>
		    <input   onChange={(e)=>{setNombreArea(e.target.value)}} id="nombre-area" type="text" className="form-control"  placeholder="Nombre Del Área" required />
		  </div>


		  

		  <input type="submit" className="mt-5  btn  bg-sky-600 hover:bg-sky-500 text-white hover:text-white" value="Agregar Área"  />

		  
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

export default Areas;