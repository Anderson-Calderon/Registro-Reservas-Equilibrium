import {useEffect,useState} from 'react';
import useAdmin from '../src/hooks/useAdmin';
import useAuth from '../src/hooks/useAuth';

const Sidebar = ()=>{
	
	
	let {pathname} = useAdmin();
	let {auth:{area}} = useAuth();


	



		useEffect(()=>{

			
			const elementoActivo = document.querySelector(".active");

			elementoActivo.classList.remove("active");

			
			if(pathname.replace("/","")=="inicio"){


			
				const nuevoElementoActivo = document.querySelector("#inicio");

				nuevoElementoActivo.classList.add("active");

			}

			else{

				pathname=pathname.replace("/inicio/","");
			

				if(area!="Gerencia" && (pathname!="historial-reservas"  || pathname!="inicio"  ) ){
					
					return;

				}

				document.querySelector("#"+pathname).classList.add("active");

			}

	

	},[]);


		

	return(


         <aside className="main-sidebar">

		   <section className="sidebar">

		    <ul className="sidebar-menu">


		      <li id="inicio"  className="active">

		        <a 

		        		
		        	href="/inicio">

		          <i class="fa-solid fa-house"></i>
		          <span> Inicio </span>

		        </a>

		      </li>

		      <li id="historial-reservas" >

		        <a 

		        		
		        	href="/inicio/historial-reservas">

		          <i className="fa fa-history"></i>
		          <span> Historial Reservas </span>

		        </a>

		      </li>


			  <li id="reservas-calendario" >

				<a 

						
					href="/inicio/reservas-calendario">

				<i className="fa-solid fa-calendar-days"></i>
				<span> Reservas  </span>

				</a>

			  </li>

			  {

					area=="Gerencia" && (

			  <li id="servicios" >

					<a 

							
						href="/inicio/servicios">

					<i class="fa fa-list-alt" aria-hidden="true"></i>
					<span> Servicios </span>

					</a>

				</li>


					)
			}		
			
			
		      {

		      	area=="Gerencia" && (


		      								 <li id="usuarios" >

										        <a 

										        		
										        	href="/inicio/usuarios">

										          <i className="fa-solid fa-user"></i>
										          <span> Usuarios </span>

										        </a>

										      </li>


		      						)

		      }
		     

		      {

		      	area=="Gerencia" && (

								      <li  id="areas">

								        <a 

								        		
								        	href="/inicio/areas">

								          <i class="fa-solid fa-layer-group"></i>
								          <span> Areas </span>

								        </a>

								      </li>

								      )

		     
		   
		      }

		    

		    </ul>

		   </section>

		</aside>





		  )

}


export default Sidebar;