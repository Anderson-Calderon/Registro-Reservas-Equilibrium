import {Outlet} from 'react-router-dom';




import useAuth from '../src/hooks/useAuth';

import Login from '../components/Login';



const AuthLayout = ()=>{
	

	

	return(

				<>

					

					<div className="contenedor pt-10">

							<Login />


					</div>


					


				</>



		  )


	

}

export default AuthLayout;