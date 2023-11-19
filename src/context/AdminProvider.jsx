import {useState,useEffect,createContext} from 'react';
import axios from 'axios';
import { useNavigate , useLocation } from 'react-router-dom'

const AdminContext = createContext();


const AdminProvider = ({children})=>{
	

	const [areas,setAreas] = useState([]);
	const [usuarios,setUsuarios] = useState([]);
	const [servicios,setServicios] = useState([]);

	const [numeroReservasPorFecha , setNumeroReservasPorFecha] = useState([]);
	
	const {pathname} = useLocation();

	useEffect( ()=>{

		
		const obtenerAreas = async ()=>{

			const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/areas`);

			setAreas(data);

		}

		const obtenerUsuarios = async ()=>{

			const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`);
			

			setUsuarios(data);

		}

		const obtenerServicios = async ()=>{

			const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/servicios`);
			

			setServicios(data);

		}

		

		const obtenerNumeroDeReservasPorFecha = async ()=>{

            const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reservas/obtenerNumeroDeReservasPorFecha`);

		
        
			setNumeroReservasPorFecha(data);
		
          

        }


		obtenerAreas();
		obtenerUsuarios();
		obtenerServicios();
		obtenerNumeroDeReservasPorFecha(); 
		

	},[]);


	return(


				<AdminContext.Provider

					value={

							{

								areas,
								setAreas,
								usuarios,
								setUsuarios,
								servicios,
								setServicios,
								numeroReservasPorFecha,
								setNumeroReservasPorFecha,
								pathname
								


							}

						  }

				>

					{children}

				</AdminContext.Provider>


			)



}

export { AdminProvider}
export default AdminContext;