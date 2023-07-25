import {Outlet} from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const RutaProtegida = ()=>{
	
	return(


			<div>


				<Header />

				<Sidebar />


				<Outlet />

			</div>	



		  )


}

export default RutaProtegida;