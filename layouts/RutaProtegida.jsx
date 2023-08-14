import {Outlet , Navigate} from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import useAuth from '../src/hooks/useAuth';

const RutaProtegida = ()=>{
	
	const {auth,setAuth,cargando} = useAuth();

	if(cargando) return "Cargando ..."

	return(


			<div>


				{

				auth._id ? (

								<>

									<Header />
									<Sidebar />

										
										<Outlet />	

										

								</>

									) : <Navigate to="/" />

			}

			</div>	



		  )


}

export default RutaProtegida;