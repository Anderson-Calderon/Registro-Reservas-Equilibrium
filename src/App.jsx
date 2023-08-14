import { useState , useEffect} from 'react'

import {BrowserRouter , Routes , Route} from 'react-router-dom';



import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import RutaProtegida from '../layouts/RutaProtegida';

import {AdminProvider} from './context/AdminProvider';
import {AuthProvider} from './context/AuthProvider';

import Inicio from './paginas/Inicio';
import Reservas from './paginas/Reservas';
import Usuarios from './paginas/Usuarios';
import Areas from './paginas/Areas';

import AuthLayout from '../layouts/AuthLayout';


function App() {


  


  return (
    <>
     



      



      <div >


        <BrowserRouter>

          <AuthProvider>
            <AdminProvider>




              <Routes>


               <Route path="/" element={<AuthLayout />} >




                </Route>  

                <Route  path="/inicio" element={<RutaProtegida />}  >

                  <Route  index  element={<Inicio />} />
                  <Route  path="reservas"  element={<Reservas />} />
                  <Route  path="usuarios"  element={<Usuarios />} />
                  <Route  path="areas"  element={<Areas />} />
                  


                </Route>

              </Routes>
            </AdminProvider>
          </AuthProvider>

        </BrowserRouter>

       




        
       
        

      </div>
    </>
  )
}

export default App
