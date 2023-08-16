import {useState,useEffect} from 'react';
import useAdmin from '../hooks/useAdmin';
import axios from 'axios';
import {alertaEditarAgregarError} from '../helpers/Alerta';
import useAuth from '../hooks/useAuth';

const Usuarios = ()=>{
  
  const {usuarios,areas} = useAdmin();
  const {auth} = useAuth();

  

  
  const [usuario,setUsuario] = useState({});
  const [nuevoUsuario , setNuevoUsuario] = useState({})
  const [cambiarPassword,setCambiarPassword] = useState(false);
  const [nuevoPassword,setNuevoPassword] = useState("");
  const {auth:{area}} = useAuth();
  

  if(area!="Gerencia"){
    
      location.href="/inicio";

      return;

    
    }
   



useEffect(()=>{
  




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


  
    const body = document.querySelector("body");

    body.addEventListener("click",function(e){

     
      if(e.target.getAttribute("id")=="btn-editar"){
        const nombre = e.target.getAttribute("data-nombre"),
              apellido = e.target.getAttribute("data-apellido"),
              dni = e.target.getAttribute("data-dni"),
              area = e.target.getAttribute("data-area"),
              _id = e.target.getAttribute("data-id");



        setUsuario({nombre,apellido,dni,area,_id});

       


      }


      if(e.target.getAttribute("id")=="btn-eliminar"){
          
        const _id = e.target.getAttribute("data-id");
        
       
         eliminarUsuario({_id});


      }
    

    })




  },[]);




  const agregarUsuario = async (e)=>{

    e.preventDefault();
    
  

     try{

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`,usuario);


           

      alertaEditarAgregarError( "Usuario Agregado" ,"Usuario Agregado correctamente","success","/inicio/usuarios");


     }catch(error){

  


        alertaEditarAgregarError("Error",error.response.data.msg,"error","");

     }

  }


  const editarUsuario = async (e)=>{

    e.preventDefault();
    

    if(nuevoPassword!=""){
      
       try{

           const data = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`,{usuario,nuevoPassword});

            alertaEditarAgregarError("Usuario Editado","Usuario editado correctamente","success","/inicio/usuarios")

       }catch(error){

        alertaEditarAgregarError("Error",error.response.data.msg,"error","");

       }

        

    }else{

      try{

        const data = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`,{usuario});
         alertaEditarAgregarError("Usuario Editado","Usuario editado correctamente","success","/inicio/usuarios")

      }catch(error){

        alertaEditarAgregarError("Error",error.response.data.msg,"error","");

      }

      
    }

   

  }

  const eliminarUsuario = (usuario)=>{

    const {_id : id} = usuario;


    Swal.fire({
        title: 'Eliminar Usuario?',
        text: "Estás seguro de eliminar a este usuario ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí , Eliminar!',
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {



          const obj = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${id}`);


            Swal.fire({
            title: 'Usuario Eliminado',
            text: "Usuario eliminada correctamente",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
           
          }).then(async (result) => {
              if (result.isConfirmed) {

                  location.href="/inicio/usuarios"


                }

              });


        }




      }) 

  }

  return(


        <>



            <div className="content-wrapper">

          <section className="content-header">
    
            <h1>
              
              Administrar Usuarios
            
            </h1>

            <ol className="breadcrumb">
              
              <li><a href="inicio"><i className="fa fa-dashboard"></i> Inicio</a></li>
              
              <li className="active">Inicio</li>
            
            </ol>

          </section>


        <section className="content">

          <div className="box">


             <div className="box-header with-border">
  
             <button type="button" className="btn bg-sky-600 text-white hover:bg-sky-500 hover:text-white " data-toggle="modal" data-target="#modalAgregarUsuario"  >AGREGAR</button>

            </div>

            <div className="box-body contenedor">

            
             
             <table className="table table-bordered table-striped dt-responsive tablas" >
               
                <thead>
                 
                <tr>

          <td>N° DNI</td>
          <td>Nombre</td>
          <td>Apellido</td>
          <td>Area</td>
          <td>Acciones</td>

        </tr>


                </thead>

                <tbody

                

                >

                {

                    usuarios &&  usuarios.map((user)=>{

                  
                  const {_id:id , nombre,apellido,area,dni} = user;
                  return(


                        <tr key={id}>

                          <td>{dni}</td>
                          <td>{nombre}</td>
                          <td>{apellido}</td>
                          <td>{area}</td>
                          <td>

                            <button 

                           
                                id="btn-editar"
                                data-nombre={user.nombre}
                                data-apellido={user.apellido}
                                data-dni={user.dni}
                                data-area={user.area}
                                data-id={user._id}
                                type="button" 
                                className="btn bg-sky-600 hover:text-white hover:bg-sky-500 text-white"  
                                data-toggle="modal" 
                                data-target="#modalEditar" >EDITAR</button>

                            <button 


                                data-id={user._id}
                                id="btn-eliminar"
                                type="button" className="ml-5 btn bg-red-500 hover:text-white hover:bg-red-400 text-white" 
                                disabled={auth._id==id && true} 
                                  >ELIMINAR
                                
                                
                                </button>   



                              

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
      <div className="modal-header bg-sky-600">
        <button type="button" className="close text-white text-4xl" data-dismiss="modal">&times;</button>
        <h4 className="modal-title text-4xl text-white">Editar Usuario</h4>
      </div>
      <div className="modal-body">
        <form

          onSubmit={(e)=>{editarUsuario(e)}}

        >

      <div className="input-group">
        <span className="input-group-addon"><i class="fa-solid fa-file-signature"></i></span>
        <input onChange={(e)=>{setUsuario({...usuario,nombre:e.target.value})}} value={usuario.nombre} id="nombre-usuario" type="text" className="form-control" placeholder="Nombre" required />
      </div>

      <div className="input-group mt-5">
        <span className="input-group-addon"><i class="fa-solid fa-file-signature"></i></span>
        <input onChange={(e)=>{setUsuario({...usuario,apellido:e.target.value})}} value={usuario.apellido}  id="apellido-usuario" type="text" className="form-control" placeholder="Apellidos" required />
      </div>

       <div className="input-group mt-5">
        <span className="input-group-addon"><i class="fa-solid fa-layer-group"></i></span>
        <select 

            onChange={(e)=>{setUsuario({...usuario,area:e.target.value})}}
            id="area-usuario" 
            value={usuario.area}
            className="form-control" 
            
            placeholder="Apellido Del Usuario" 
            required 

        >

        <option disabled value='' >--Seleccione--</option>

        {

          areas.map((area)=>{



                    return(

                        <option key={area._id} value={area.nombre}>
                          
                          {

                            area.nombre

                          }

                        </option>

                        )

                  })

        }

    </select>

      


      </div>

      <div className="input-group mt-5">
        <span className="input-group-addon"><i class="fa-solid fa-fingerprint"></i></span>
        <input  onChange={(e)=>{setUsuario({...usuario,dni:e.target.value})}} value={usuario.dni}   d id="dni-usuario" type="text" className="form-control" placeholder="N° DNI" required />
      </div>

     

        <label className="block mt-5">

         
         <input  onChange={()=>{ setNuevoPassword(""); setCambiarPassword(!cambiarPassword)}} id="pregunta-usuario" type="checkbox"   />

          . ¿ Desea editar el password ?

        </label>

      {

        cambiarPassword && <div className="input-group mt-5">

          <span className="input-group-addon"><i class="fa-solid fa-lock"></i></span>

          <input onChange={(e)=>{setNuevoPassword(e.target.value)}}  id="nuevoPassword-usuario" type="password" className="form-control" placeholder="Ingrese su nuevo password" required />


        </div>

      }


    

      <input type="submit" className="mt-5 bg-sky-600 hover:bg-sky-500 btn text-white hover:text-white" value="Editar Usuario"  />

      
    </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
      </div>
    </div>

  </div>
</div>













<div id="modalAgregarUsuario" className="modal fade" role="dialog">
  <div className="modal-dialog">

   
    <div className="modal-content">
      <div className="modal-header bg-sky-600">
        <button type="button" className="close text-white text-4xl" data-dismiss="modal">&times;</button>
        <h4 className="modal-title text-white text-4xl">Agregar Usuario</h4>
      </div>
      <div className="modal-body">
        <form

          onSubmit={(e)=>{agregarUsuario(e)}}
          

        >

      <div className="input-group">
        <span className="input-group-addon"><i class="fa-solid fa-file-signature"></i></span>
        <input   

            onChange={(e)=>{setUsuario({...usuario,nombre:e.target.value})}}
            id="nombre-usuario" 
            type="text" 
            className="form-control" 
            name="text" 
            placeholder="Nombre Del Usuario" 
            required 

        />

      


      </div>

      <div className="input-group mt-5">
        <span className="input-group-addon"><i class="fa-solid fa-file-signature"></i></span>
        <input   

            onChange={(e)=>{setUsuario({...usuario,apellido:e.target.value})}}
            id="apellido-usuario" 
            type="text" 
            className="form-control" 
            name="text" 
            placeholder="Apellido Del Usuario" 
            required 

        />

      


      </div>

      <div className="input-group mt-5">
        <span className="input-group-addon"><i class="fa-solid fa-layer-group"></i></span>
        <select 

            onChange={(e)=>{setUsuario({...usuario,area:e.target.value})}}
            id="area-usuario" 
            defaultValue=''
            className="form-control" 
            
            placeholder="Apellido Del Usuario" 
            required 

        >

        <option disabled value='' >--Seleccione--</option>

        {

          areas.map((area)=>{



                    return(

                        <option key={area._id} value={area.nombre}>
                          
                          {

                            area.nombre

                          }

                        </option>

                        )

                  })

        }

    </select>

      


      </div>


      <div className="input-group mt-5">
        <span className="input-group-addon"><i class="fa-solid fa-fingerprint"></i></span>
        <input   

            onChange={(e)=>{setUsuario({...usuario,dni:e.target.value})}}
            id="dni-usuario" 
            type="text" 
            className="form-control" 
            name="text" 
            placeholder="N° DNI" 
            required 

        />

      


      </div>

      

         <div className="input-group mt-5">
          <span className="input-group-addon"><i class="fa-solid fa-lock"></i></span>
          <input   

              onChange={(e)=>{setUsuario({...usuario,password:e.target.value})}}
              id="usuario-usuario" 
              type="password" 
              className="form-control" 
                
              placeholder="Tu Contraseña" 
              required 

          />

        


       </div>

    


      

      <input type="submit" className="btn mt-5 bg-sky-600 hover:bg-sky-500 text-white hover:text-white" value="Agregar Usuario"  />

      
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

export default Usuarios;