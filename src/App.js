import React, {Fragment, useContext, useState} from 'react';

//Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/*** Layout */
import Header from './components/layout/Header'
import Navegacion from './components/layout/Navegacion'

/** Componentes 
import Clientes from './components/clientes/Clientes';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';
*/
import Animales from './components/animales/Animales';
import NuevoAnimal from './components/animales/NuevoAnimal';
import EditarAnimal from './components/animales/EditarAnimal';
import Intervenciones from './components/intervenciones/Intervenciones';
import NuevaIntervencion from './components/intervenciones/NuevaIntervencion';
import EditarIntervencion from './components/intervenciones/EditarIntervencion';
import Login from './components/auth/Login';
import { CRMContext, CRMProvider } from './context/CRMContext';

function App () {

  //UTILIZAR EL CONTEXT
  const [auth, guardarAuth] = useContext(CRMContext);


  return (
    <Router>
      <Fragment>
        <CRMProvider value={[auth, guardarAuth]}>
        <Header/>

        <div className="grid contenedor contenido-principal">
          <Navegacion/>
          <main className="caja-contenido col-9">
            <Routes>
              <Route path="/" element={<Animales/>}/>
              <Route path="/animales/nuevo" element={<NuevoAnimal/>}/>
              <Route path="/animales/editar/:_id" element={<EditarAnimal/>}/>
              <Route path="/intervenciones" element={<Intervenciones/>}/>
              <Route path="/intervenciones/nueva" element={<NuevaIntervencion/>}/>
              <Route path="/intervenciones/editar/:_id" element={<EditarIntervencion/>}/>
              <Route path="/iniciar-sesion" element={<Login/>}/>
            </Routes>


          </main>
        </div>
          
        </CRMProvider>
      </Fragment>
    </Router>

    
  )

}


export default App;
