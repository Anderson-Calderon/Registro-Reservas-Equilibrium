import useAuth from '../hooks/useAuth';


const Inicio = ()=>{
	
  const {auth} = useAuth();


	return(



         <div className="content-wrapper">

          <section className="content-header">
    
            <h1>
              
              Inicio
            
            </h1>

            <ol className="breadcrumb">
              
              <li><a href="inicio"><i className="fa fa-dashboard"></i> Inicio</a></li>
              
              <li className="active">Inicio</li>
            
            </ol>

          </section>


        <section className="content">

          <div className="box">


             <div className="box-header with-border">
  
            

            </div>

            <div className="box-body contenedor">

            
             	<h1 className="saludo text-3xl ">Hola , {auth.nombre} . Administra las reservas de Equilibrium , haciendo click  <a href="/inicio/reservas" className="font-bold text-indigo-400"> aquí</a> </h1>
            

           </div>


          </div>
        </section>


        

        </div>



		   )



}

export default Inicio;