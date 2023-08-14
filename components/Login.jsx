import {useState} from 'react';
import useAuth from '../src/hooks/useAuth';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {alertaEditarAgregarError} from '../src/helpers/Alerta';




const Login = ()=>{
	
	const navigate = useNavigate();
	
	const {auth,setAuth} = useAuth();


	const handleSubmit = async (e)=>{

		e.preventDefault();

		try{


			const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`,auth);

			setAuth(data);

			localStorage.setItem("datos-usuario",JSON.stringify(data));

			

			navigate("/inicio");


		}catch(error){

			alertaEditarAgregarError( "Error" ,error.response.data.msg,"error","");
			

		}


	}

	

	return(


				<>


					<div id="back"></div>

<div className="login-box">
  
  <div className="login-logo">

    <img  src="/imagenes/plantilla/icono-equilibrium.png" className=" logo-login img-responsive"  />

  </div>

  <div className="login-box-body">

    <p className="login-box-msg">Ingresar al sistema</p>

    <form 

    	onSubmit={(e)=>{handleSubmit(e)}}

    >

      <div className="form-group has-feedback">

       <input  
								
			onChange={(e)=>{setAuth({...auth,dni:e.target.value})}}
			className="form-control"
			type="text" 
			placeholder="Identificador" 
			required

		 />
        <span className="glyphicon glyphicon-user form-control-feedback"></span>

      </div>

      <div className="form-group has-feedback">

       <input  

			onChange={(e)=>{setAuth({...auth,password:e.target.value})}} 
			className="form-control"
			type="password"
			placeholder="password"
			required

		/>


        <span className="fa-solid fa-lock form-control-feedback"></span>

      </div>

    
						

      <div className="row mt-5">
       
        <div className="col-xs-4">

          <button type="submit" className="btn bg-sky-600 hover:bg-sky-500 text-white hover:text-white">Ingresar</button>
        
        </div>

      </div>

      

    </form>

  </div>

</div>
				

					

				</>


		  )

}


export default Login;