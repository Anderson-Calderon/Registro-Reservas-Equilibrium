import { useEffect , useState} from "react";
import axios from 'axios';
import useAdmin from '../hooks/useAdmin';
import formatearFecha from "../helpers/FormatearFecha";

import dateHoyMasUno from "../helpers/FechaHoyMasUno";
import fechasSinCupo from "../helpers/FechasSinCupo";
import datePickerEspaniol from "../helpers/DatePickerEspaniol";
import inicializarDatePicker from "../helpers/InicializarDatePicker";

import getHoraYMinutoActual from "../helpers/GetHoraYMinutoActual";
import setHabilitarOptions from "../helpers/SetHabilitarOptions";
import setBloquearOptions from "../helpers/SetBloquearOptions";

import fechaLarga from "../helpers/FechaLarga";


import {alertaEditarAgregarError} from "../helpers/Alerta";


import InformacionNumericaDeLasReservasSeleccionadas from '../../components/InformacionNumericaDeLasReservasSeleccionadas';
import useAuth from '../hooks/useAuth';


const ReservasCalendario = ()=>{

    const {numeroReservasPorFecha, setNumeroReservasPorFecha,servicios} = useAdmin();
    console.log("ESTAS SON LAS RESERVAS POR FECHA AL PINTAL AL CALENDARIO");
    console.log(numeroReservasPorFecha);
    const {auth} = useAuth();
    console.log(auth);
   
   
    const [reservas , setReservas] = useState([]); 
 
    const [urlPago , setUrlPago] = useState("");

 
    const [servicioAReservar , setServicioAReservar] = useState({horasSeleccionadas:[]});
   
    const [fechaFiltro,setFechaFiltro] = useState("");

    
   const [totalGananciaPorFecha , setTotalGananciaPorFecha] = useState(0);
   const [dataTotalDeServiciosAceptadosPorFecha , setDataTotalDeServiciosAceptadosPorFecha ] = useState([]);
   
 

    
    useEffect(()=>{//INICIO DE LA CREACIÓN DEL CALENDARIO


      
        const crearCalendario = async ()=>{

        //OBTENEMOS AL CONTENEDOR EN EL CUAL ESTARÁ NUESTRO CALENDARIO
        var contenedorCalendario = document.getElementById('calendar');
      
        var calendario = new FullCalendar.Calendar(contenedorCalendario, {
         

        //AL CARGA LA SECCIÓN SE ME MUESTRE TODAS LAS FECHAS REFERENTES AL MES EN EL QUE ESTAMOS    
        initialView: 'dayGridMonth',
         
        //TRADUCIMOS EL CALENDARIO AL IDIOMA ESPAÑOL
        locale:'es',

        //PINTAMOS FECHAS DETERMINADAS
        events: numeroReservasPorFecha,

        buttonText: {

            today: 'Hoy', // Cambia el texto del botón "today" a "Hoy"

        },


        //CUANDO HACEMOS CLICK EN ALGUNA FECHA , SE EJECUTA ESTA FUNCIÓN
        dateClick: function (info) {

         

          const numeroDeClasesAgregadas = document.querySelectorAll(".pintar-fecha-seleccionada").length;

          if(numeroDeClasesAgregadas==1){//SI ES IGUAL A 1 INDICA QUE EXISTE DICHO ELEMENTO . 

              document.querySelector(".pintar-fecha-seleccionada").classList.remove("pintar-fecha-seleccionada");

          }

          //A LA FECHA SOBRE LA CUAL HICIMOS CLICK LE AGREGAMOS DICHA CLASE.
          $(info.dayEl).addClass('pintar-fecha-seleccionada');

          sessionStorage.setItem("fecha-filtro",""+info.dateStr);

          //fechaFiltro , TRABAJA CON OTRO USEEFFECT  . BÁSICAMENTE LO QUE HACE ES OBTENER LAS RESERVAS QUE TENGAN
          //POR FECHA IGUAL A LA SELECCIONADA , UNA VEZ HECHO ESTO LA ALMACENA EN |-| numeroReservasPorFecha
          setFechaFiltro(sessionStorage.getItem("fecha-filtro"))


          


        },
          //BLOQUEAMOS FECHAS ANTERIORES A LA ACTUAL
          validRange: {
            start: moment().format('YYYY-MM-DD'), // Configura la fecha actual como el inicio del rango válido
          },

          //ACHICAMOS EL ALTO DE LAS CELDAS QUE CONTIENEN LAS FECHAS.
          contentHeight: 'auto'

         

       


        });

        calendario.render();






        }
       
        crearCalendario();





    },[numeroReservasPorFecha]);//FIN DE LA CREACIÓN DEL CALENDARIO

   
     



    
useEffect(()=>{

    const obtenerReservas = async ()=>{
  
    
        let  informacionTotalDeServiciosAceptadosPorFecha = [];
        let  sumaTotalGananciaPorFecha = 0 ;

        const reservasFormateada = reservas.map((reserva)=>{//formateamos al arreglo que almacena toda la información
                                                            //que seleccionamos al realizar click en una de las fechas
                                                            //del calendario.Lo formateamos para obtener únicamente a
                                                            //los campos que nos interesa mostrar en la tabla

              const {hora,fecha,captura,servicio,telefono,nombre,apellidos,precio,aceptada} = reserva;

              const espacio = "%20",
                    saltoDeLinea = "%0A";
            
              let reservaExitosa = `Hola${espacio}${reserva.nombre}${espacio}👋${espacio}¡tu${espacio}reserva${espacio}en${espacio}Equilibrium${espacio}para${espacio}${reserva.servicio.replace(/\s/g, espacio)}${saltoDeLinea}ha${espacio}sido${espacio}registrada${espacio}con${espacio}éxito!${espacio}Te${espacio}esperamos${espacio}este${espacio}${fechaLarga(reserva.fecha)}${espacio}a${espacio}las${espacio}${reserva.hora.replace(/\s/g,espacio)}`
              
              reservaExitosa =`https://api.whatsapp.com/send?phone=+51${reserva.telefono}&text=${reservaExitosa}`;
              

         
             
              

             const existeServicio = informacionTotalDeServiciosAceptadosPorFecha.find((info) => info.servicio === servicio && info.precio === precio );
             
             
             if(existeServicio && aceptada){

                informacionTotalDeServiciosAceptadosPorFecha.forEach((info)=>{

                  if(info.servicio == servicio){

                      info.numeroReservasAceptadas =  info.numeroReservasAceptadas + 1;

                  }

                });


             }else if(!existeServicio && aceptada){
           
              informacionTotalDeServiciosAceptadosPorFecha.push({servicio,precio,numeroReservasAceptadas:1});

             }

             if(aceptada){

                sumaTotalGananciaPorFecha +=precio; 
            
              
             }




                return {

                          hora:`<span class=${aceptada ? "pintar-tr" : ""}>${hora}</span>`,
                          fecha:fecha,
                          pago:`<img data-target="#modal-captura-pago" data-toggle="modal"  id="capturaPago" src=${captura}>`,
                          servicio:servicio,
                          telefono:telefono,
                          nombre:nombre,
                          apellidos:apellidos,
                          acciones : reserva.aceptada ? `<td><button class=" fondo-aceptar-reserva text-black   py-3 w-full text-center inline-block mt-5 cursor-default">LA RESERVA YA FUE ACEPTADA</button> </td> ` : 
                          auth.area=="Gerencia" ? (  ` <td>
                        
                                        <a  id=${reserva._id} class=" bg-teal-400 text-white hover:text-white hover:bg-teal-500  py-3 w-full text-center inline-block" href=${reservaExitosa} target="_blank" >Aceptar Reserva</a>

                                     <button  
                                          
                                            class="bg-red-600 text-white hover:text-white hover:bg-red-700  py-3 w-full text-center inline-block mt-5"   
                                            data-id-reserva=${reserva._id} 
                                            >

                                                Eliminar 

                                        </button>


                                  </td>`):(

                                    ` <td>
                        
                                        <a  id=${reserva._id} class=" bg-teal-400 text-white hover:text-white hover:bg-teal-500  py-3 w-full text-center inline-block" href=${reservaExitosa} target="_blank" >Aceptar Reserva</a>

                                 
                                  </td>`

                                  )

                        } 

        });//Fin del formateo del arreglo
        

        setDataTotalDeServiciosAceptadosPorFecha(informacionTotalDeServiciosAceptadosPorFecha);
        setTotalGananciaPorFecha(sumaTotalGananciaPorFecha);
       
        $(".tablas").DataTable({//Inicializamos a la tabla con la data que nos interesa ver


       destroy: true,


       columns: [

        { title: 'Hora', data: 'hora'}, 
        { title: 'Fecha', data: 'fecha'}, 
        { title: 'Servicio', data: 'servicio'}, 
        { title: 'Pago', data: 'pago'}, 
        { title: 'Telefono', data: 'telefono'}, 
        { title: 'Nombre', data: 'nombre'}, 
        { title: 'Apellidos', data: 'apellidos'}, 
        { title: 'Acciones', data: 'acciones'}, 


      ],

      
  
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
  
      },

      data:reservasFormateada,
      //AGREGAMOS UNA CLASE A LA FILA DE LA TABLA QUE CONTIENE UNA RESERVADA ACEPTADA
      createdRow: function (row, data, dataIndex) {
      
        if (data.acciones.includes("YA FUE ACEPTADA")) {
        
          $(row).addClass('reserva-aceptada');


        }


      },
      
  
    });//Fin de inicializar a la tabla con la data que nos interesa ver,
  
  
  
  
    }
  
    obtenerReservas();
  
  
  
    },[reservas]);//Cada que hay cambios en  el arreglo que almacena las reservas se ejecutará esto.



  
    
    const filtrarReservasPorFecha = async (fechaSeleccionada)=>{//Se ejecuta cada que selecciono una fecha del calendario

        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reservas/obtenerReservasPorFecha/${fechaSeleccionada}`); 
        

        setReservas(data);
        
       

    }

    const aceptarReserva = async (idReserva,enlace)=>{
    
        Swal.fire({
          title: 'Aceptar Reserva',
          text: "¿ Estás seguro de aceptar esta reserva ?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí!',
          cancelButtonText:'Cancelar'
        }).then(async (result) => {
          if (result.isConfirmed) {
    
    
          
    
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer Token`
                }
            }
            
            try{

               
               
               await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/reservas`,{_id:idReserva}); 
               
               /*const reservasActualizadas = reservas.map((reserva)=>{

                if(reserva._id==idReserva){

                    reserva.aceptada=true;
                }

                return reserva;

               });*/

               setTimeout(()=>{//Recargamos la página para obtener toda la data actualizada , y ver reflejado
                               //la aceptación de la reserva 


                  window.location.href = window.location.href;

               },500);

               window.open(enlace, '_blank');//abrimos una nueva pestaña la cual va redireccionada a whatsapp
                                             //para enviar el mensaje de aceptación al usuario.
                                             
                                             
            }catch(error){

                console.log(error.message);
            }
    
    
          }
        })
    
    
        }



        const eliminarReserva = async (idReserva)=>{


          Swal.fire({
            title: 'Eliminar Reserva',
            text: "¿ Estás seguro de eliminar esta reserva ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí!',
            cancelButtonText:'Cancelar'
          }).then(async (result) => {
            if (result.isConfirmed) {
      
      
            
      
              let config = {
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer Token`
                  }
              }
      
              await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/reservas/${idReserva}`, config);
      
      
          
              Swal.fire({
                title: 'Reserva Eliminada',
                text: "La reserva fue eliminada con éxito",
                icon: 'success',
            
                confirmButtonColor: '#3085d6',
              
                confirmButtonText: 'Sí!'
            
              }).then((result) => {
          
          
                if (result.isConfirmed) {
          
          
                
                  window.location.href=window.location.href;
          
          
          
          
          
                  }
                });
      
      
      
      
      
      
            }
          });
      
      
          }
          

    const clickBody = (e)=>{//SE EJECUTA CADA QUE REALIZAMOS CLICK EN EL BOTÓN DE "ELIMINAR RESERVA",
                            //"ACEPTAR RESERVA" Y "VER CAPTURA DEL PAGO"

        
         //ELIMIMAR RESERVA
          if(e.target.classList.contains("bg-red-600")){
  
        
             
             const idReserva = e.target.getAttribute("data-id-reserva");  
  
             eliminarReserva(idReserva);
  
          }else if(e.target.classList.contains("bg-teal-400")){//ACEPTAR RESERVA

              
               
                e.preventDefault();
                //ACEPTAR RESERVA
                aceptarReserva(e.target.getAttribute("id"),e.target.getAttribute("href"));
               

          }else if(e.target.getAttribute("id")=="capturaPago"){
  
  
              setUrlPago(e.target.getAttribute("src"));
  
          }else if(e.target.getAttribute("data-target")=="#modal-captura-pago"){
  
                  setUrlPago(e.target.querySelector("img").getAttribute("src"));
  
          }
  
  
     
  
      }


      useEffect(()=>{

     

          /*fechaFiltro sólo la utilizo para saber cuando hay un cambio en la 
            fecha que escoge el usuario del calendario*/
          filtrarReservasPorFecha(sessionStorage.getItem("fecha-filtro"));
                                                                          
       
         
         
          if(document.querySelector("td[data-date='"+sessionStorage.getItem("fecha-filtro")+"']")){

            
          document.querySelector("td[data-date='"+sessionStorage.getItem("fecha-filtro")+"']").classList.add("pintar-fecha-seleccionada");
      

       

        
    
        }
        


      },[fechaFiltro]);


      //SE EJECUTA CADA QUE REALIZAMOS CLICK EN EL BOTÓN SUPERIOR IZQUIERDO DE RESERVAR
      const clickEnReservar = async (e)=>{

        let numeroMaximoDeReservasPorHora = 0;//Esto lo actualizo al ejecutar la función :  setBloquearOptions
        let numeroMaximoDeReservasPorDia = 0;//Esto lo actualizo al ejecutar la función :  fechasSinCupo

       
         //Obtenemos todas las reservas que tengan una fecha de reservación mayor o igual a la de hoy. 
         const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reservas/obtenerReservasAPartirDeHoy`); 
         console.log(data);
         let registros = data;


         let fechaFormateada = formatearFecha(new Date());
         let fechaHoyMasUno = dateHoyMasUno(); //SI YA ES HORA DE CIERRE , ENTONCES OBTENES LA FECHA ACTUAL +1
                                               //ES DECIR LA FECHA DE MAÑANA , SINO OBTIENES UNA CADENA VACÌA  

       
          let misFechasBloqueadas = [];//ARREGLO DONDE SE ALMACENAN LAS FECHAS QUE YA NO SE PUEDE RESERVAR PARA NINGUNA HORA


          //CAMBIAMOS EL IDIOMA DEL DATEPICKER . IDIOMA ESPAÑOL
          datePickerEspaniol();


          //SE EJECUTA CADA QUE SELECCIONAMOS UN SERVICIO
          document.querySelector("#form-field-servicio").addEventListener("change",function(e){

                document.querySelector("#form-field-fecha").value="";   
                let servicioSeleccionado = e.target.value;

                //en la funciòn "fechasSinCupo" es donde inicializo a la variable "numeroMaximoDeReservasPorDia"
                //servicios es el arreglo en el cual tengo todos los servicios que yo como administrador creo.
                misFechasBloqueadas = fechasSinCupo(registros,numeroMaximoDeReservasPorDia, servicioSeleccionado ,servicios);
                      
                //Inicializamos el date picker
                inicializarDatePicker(fechaHoyMasUno,fechaFormateada,misFechasBloqueadas);


          });

     
        //ESCUCHAMOS CADA QUE EL USUARIO SELECCIONA UNA FECHA
        $("#form-field-fecha").change(function(){

   
          //Cada que seleccionamos un fecha , hacemos que el usuario vuelva a seleccionar la hora.          
           const hora = document.querySelector("#form-field-hora");//select de hora
           
           hora.value="";
          
          //----------------------------------------------------------------------------
          
          
          const fechaSeleccionada = $(this).val();
        
          //Es un arreglo , el primer elemento hace referencia a la hora de hoy , y el segundo elemento hace referencia a un booleano  , false si no es hoy.
          //si no es hoy , entonces la hora que te da es vacio.
          const HoraMinutoActualYHoy = getHoraYMinutoActual(fechaSeleccionada,fechaFormateada);
          
        
          
          const horaYMinutos = HoraMinutoActualYHoy[0],//string que contiene la hora de hoy .
                hoy = HoraMinutoActualYHoy[1];  //booleano . true o false
        


          const servicioSeleccionado = document.querySelector("#form-field-servicio").value;
          
          //De la BD obtenemos todos los registros que sean igual a la fecha seleccionada e igual al servicio seleccionado
          const nuevoArreglo = registros.filter((registro)=> registro.fecha == fechaSeleccionada && registro.servicio==servicioSeleccionado);
            
          //Obtengo todos los options del select de hora.
          const arregloOpciones = document.querySelector("#form-field-hora").options;
        
          //Habilitamos a todos los options del select de hora.
          setHabilitarOptions(arregloOpciones);

         
          //Bloqueamos a aquellos options del select de hora . 
          setBloquearOptions(arregloOpciones  , hoy , horaYMinutos , nuevoArreglo,numeroMaximoDeReservasPorHora,servicioSeleccionado,servicios);
          


      
      
        });





      }



      const registrarReserva = async (e)=>{

        e.preventDefault();

        const btnAgregarReserva = document.querySelector("#agregar-reserva");
        btnAgregarReserva.disabled=true;
        btnAgregarReserva.value="Reservando ...";
        

        const nombre = document.querySelector("#form-field-nombre").value,
              apellidos = document.querySelector("#form-field-apellidos").value,
              telefono = document.querySelector("#form-field-telefono").value,
              servicio = document.querySelector("#form-field-servicio").value,
              fecha = document.querySelector("#form-field-fecha").value,
              hora = document.querySelector("#form-field-hora").value,
              inputFile = document.querySelector("#form-field-captura");


           /* const reserva = {

                                nombre,
                                apellidos,
                                telefono,
                                servicio,
                                fecha,
                                hora
                            }*/

            const formData = new FormData();


            formData.append('captura', inputFile.files[0]);
            formData.append('nombre',nombre)
            formData.append('apellidos',apellidos)
            formData.append('telefono',telefono)
            formData.append('servicio',servicio)
            formData.append('fecha',fecha)
            formData.append('hora',hora)
            formData.append('creador',auth._id) 


             try{

             // const {data}= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/reservas/reservaSinCaptura`,reserva);
             

             const respuesta = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reservas`,{  method:"POST",
                                                                                 body:formData
               
              });

              

             if(respuesta.status==400){
             
                alertaEditarAgregarError("Error","No hay cupo para la hora y fecha seleccionada. Por favor vuelva a seleccionar otra,Gracias.","error",window.location.href);

                return;
            }
              btnAgregarReserva.disabled=false;
              btnAgregarReserva.value="Agregar Reserva";
             alertaEditarAgregarError("Éxito","¡Reserva realizada con éxito!","success",window.location.href);


             }catch(error){
               
              console.log(error);
              alertaEditarAgregarError("Error",error,"error",window.location.href);

             }               
             
             



      }





    return (

        <div className="content-wrapper">

        <section className="content-header">
  
          <h1>
            
            Administrar Reservas
          
          </h1>

          <ol className="breadcrumb">
            
            <li><a href="inicio"><i className="fa fa-dashboard"></i> Inicio</a></li>
            
            <li className="active">Administrar Reservas</li>
          
          </ol>

        </section>


      <section className="content">

        <div className="box">


           <div className="box-header with-border">
            

              <button  onClick={(e)=>{clickEnReservar(e)}} data-target="#modal-crear-reserva" data-toggle="modal"   className="uppercase font-bold rounded-lg bg-teal-400 text-white hover:text-white hover:bg-teal-500  py-3 text-center  mt-5 px-10 py-5"  >Reservar</button>



          </div>

          <div className="box-body contenedor">

          <div id="contenedor-calendario" className="mb-40">
            <div id="calendar"></div>
        </div>




           
           <table className="  table table-bordered table-striped dt-responsive tablas mt-20" >
             
              <thead>
               
               <tr>
                
                 <th>Hora</th>
                 <th>Fecha</th>
                 <th>Pago</th>
                 <th>Servicio</th>
                 <th>Telefono</th>
                 <th>Nombre</th>
                 <th>Apellidos</th>
                 <th>Acciones</th>

               </tr> 

              </thead>

              <tbody

              onClick={(e)=>{clickBody(e)}}

              >






              </tbody>

           </table>

         

            <InformacionNumericaDeLasReservasSeleccionadas 

                dataTotalDeServiciosAceptadosPorFecha={dataTotalDeServiciosAceptadosPorFecha}
                totalGananciaPorFecha = {totalGananciaPorFecha}

            />

         </div>


        </div>
      </section>



{ <div className="modal" id="modal-captura-pago">
<div className="modal-dialog">
  <div className="modal-content">

 
    <div className="modal-header">
      <h4 className="modal-title text-4xl">Captura Del Pago</h4>
      <button type="button" className="close" data-dismiss="modal">&times;</button>
    </div>

  
    <div className="modal-body">
      

      <img className="m-auto" src={urlPago} />


    </div>


    <div className="modal-footer">
      <button type="button" className="btn  bg-indigo-600 text-white hover:text-white" data-dismiss="modal">Cerrar</button>
    </div>

  </div>
</div>
</div> 


}



{


/*-------------MODAL DE RESERVACIÓN----------------*/ 

<div className="modal" id="modal-crear-reserva">
<div className="modal-dialog">
  <div className="modal-content">

 
    <div className=" modal-header bg-teal-400  text-white font-bold ">
      <h4 className="modal-title text-4xl">RESERVA</h4>
      <button type="button" className="close posicionar-x text-white " data-dismiss="modal">&times;</button>
    </div>

  
    <div className="modal-body">
      

    <form

        onSubmit={(e)=>{registrarReserva(e)}}
        method="post"
        encType="multipart/form-data"

        >


        {/* NOMBRE DEL CLIENTE */}
        <div className="input-group">
        <span className="input-group-addon"><i class="fa-solid fa-user"></i></span>
        <input onChange={(e)=>{} }  id="form-field-nombre" type="text" className="form-control" placeholder="Nombre" required />
       
        </div>

        {/* APELLIDOS DEL CLIENTE  */}
        <div className="input-group mt-5">
        <span className="input-group-addon"><i class="fa-solid fa-user"></i></span>
        <input onChange={(e)=>{} }  id="form-field-apellidos" type="text" className="form-control" placeholder="Apellidos" required />
       
        </div>

        
        {/* NÚMERO TELÉFONICO DEL CLIENTE  */}
        <div className="input-group mt-5">
        <span className="input-group-addon"><i class="fa-solid fa-phone"></i></span>
        <input onChange={(e)=>{} }  id="form-field-telefono" type="tel" className="form-control" placeholder="Número de Teléfono" required />
       
        </div>


     
     
        {/*  SERVICIO QUE LE INTERESA RESERVAR AL CLIENTE*/}
        <div className="input-group mt-5">
        <span className="input-group-addon"><i class="fa-solid fa-layer-group"></i></span>
        <select 

          onChange={  (e)=>{      setServicioAReservar(servicios.filter((servicio)=>  servicio.nombre==e.target.value ) [0]  )  }  }
          id="form-field-servicio" 
         
          className="form-control" 
          
     
          required 

        >

        <option disabled value='' selected >--Seleccione El Servicio--</option>
        {

           servicios.length > 0 && servicios.map((servicio)=>{



                      return(

                          <option key={servicio._id} value={servicio.nombre}>
                            
                            {

                              servicio.nombre

                            }

                          </option>

                          )

                    })

        }
      

        </select>




        </div>


        {/* FECHA QUE LE INTERESA RESERVAR AL CLIENTE  */}
        <div className="input-group mt-5">
          <span className="input-group-addon"><i class="fa fa-calendar"></i></span>
          <input onChange={(e)=>{} } autoComplete="off" id="form-field-fecha" type="text" className="form-control" placeholder="Fecha De Reservación" required />
        
        </div>

         {/* HORA QUE LE INTERESA RESERVAR AL CLIENTE*/}
         
        <div className="input-group mt-5">
        <span className="input-group-addon"><i class="fas fa-clock"></i></span>
        <select 

          onChange={(e)=>{}}
          id="form-field-hora" 
         
          className="form-control" 
          
     
          required 

        >

        <option disabled value='' selected >--Seleccione La Hora--</option>


         {servicioAReservar.horasSeleccionadas.map((horaSeleccionada)=>{

            return(

                <option key={horaSeleccionada} value={horaSeleccionada}>
                  
                  {

                  horaSeleccionada

                  }

                </option>

              )

            } )

         }   



        </select>

        </div>
        
         
        {/* CAPTURA DE PAGO DEL CLIENTE  */}
        <div className="input-group mt-5">
        <span className="input-group-addon"><i class="fas fa-image"></i></span>
        <input onChange={(e)=>{ document.querySelector("#imagen").setAttribute("src",URL.createObjectURL(e.target.files[0]))  } }  id="form-field-captura" type="file" className="form-control"  required />
       
        </div>


        <img className="mx-auto my-10 w-96" id="imagen" />

     
        
 




        <input id="agregar-reserva" type="submit" className="mt-5 bg-indigo-500 hover:bg-sky-500 btn text-white hover:text-white" value="Agregar Reserva"  />


        </form>


    </div>


    <div className="modal-footer">
      <button type="button" className="btn  bg-indigo-500 text-white hover:text-white" data-dismiss="modal">Cerrar</button>
    </div>

  </div>
</div>
</div>


}


      </div>

          


)


}

export default ReservasCalendario;