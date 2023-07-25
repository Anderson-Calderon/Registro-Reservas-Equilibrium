const Header = ()=>{
	
	return(


			 <header className=" main-header">
  
        
		         <a href="inicio" className="logo">
		            
		          
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

		                    <img  src="/imagenes/usuario/cristian.jpg" className="user-image"/>


		                    
		                    <span className="hidden-xs">CRISTIAN</span>

		                  </a>

		               

		                  <ul className="dropdown-menu">
		                    
		                    <li className="user-body">
		                      
		                      <div className="pull-right">
		                        
		                        <a href="#" className="btn btn-default btn-flat">ADMINISTRADOR</a>

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