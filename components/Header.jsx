import useAuth from '../src/hooks/useAuth';

const Header = ()=>{
	
	const {auth,setAuth,cargando} = useAuth();

	const cerrarSesion = ()=>{

		localStorage.removeItem("datos-usuario");
		setAuth({});

	}

	return(


			 <header className=" main-header">
  
        
		         <a href="/" className="logo">
		            
		          
		            <span className="logo-mini">
		              

		              <img src="/imagenes/plantilla/logo-equilibrium.png" className="img-responsive" />
		              

		            </span>

		        

		            <span className="logo-lg">
		              
		              
		              <b>EQUILIBRIUM</b> 

		            </span>


		         </a>

		      
		         <nav className="navbar navbar-static-top" role="navigation">
		           

		            <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
		                  
		                <span className="sr-only">Toggle navigation</span>
		                
		            </a>

		         

		            <div className="navbar-custom-menu">
		                
		              <ul className="nav navbar-nav">
		                
		                <li className="dropdown user user-menu">
		                  
		                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">

		                    <img  src="/imagenes/usuario/usuario.png" className="user-image"/>


		                    
		                    <span className="hidden-xs">{auth.nombre}</span>

		                  </a>

		               

		                  <ul className="dropdown-menu">
		                    
		                    <li className="user-body">
		                      
		                      <div className=" pull-left">
		                        
		                        <a href="#" className="btn btn-default btn-flat">

		                        	{auth.area}


		                        </a>

		                      </div>
		                      <div className="pull-right">
		                        
		                        <a href="#" onClick={()=>{cerrarSesion()}} className="btn btn-default btn-flat">

		                        	CERRAR SESIÓN


		                        </a>

		                      </div>
		                    </li>

		                  </ul>


		                </li>

		              </ul>

		            </div>

		         </nav>

        	</header>


		  )

}

export default Header;