import { useState , useEffect} from 'react'

import {BrowserRouter , Routes , Route} from 'react-router-dom';



import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Reservas from '../components/Reservas';
import RutaProtegida from '../layouts/RutaProtegida';
import Inicio from '../components/Inicio';



function App() {


  


  return (
    <>
     



      



      <div >


        <BrowserRouter>

          <Routes>

            <Route  path="/" element={<RutaProtegida />}  >

              <Route  index  element={<Inicio />} />

              <Route  path="reservas"  element={<Reservas />}  />


            </Route>

          </Routes>

        </BrowserRouter>

       




        
       
        

      </div>
    </>
  )
}

export default App
