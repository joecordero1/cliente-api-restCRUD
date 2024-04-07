import React, {Fragment} from 'react';

//Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/*** Layout */
import Header from './components/layout/Header'
import Navegacion from './components/layout/Navegacion'

/** Componentes */
import Clientes from './components/clientes/Clientes';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';
import Login from './components/auth/Login';

function App () {
  return (
    <Router>
      <Fragment>
        <Header/>

        <div className="grid contenedor contenido-principal">
          <Navegacion/>
          <main className="caja-contenido col-9">
            <Routes>
              <Route path="/" element={<Clientes/>}/>
              <Route path="/clientes/nuevo" element={<NuevoCliente/>}/>
              <Route path="/clientes/editar/:_id" element={<EditarCliente/>}/>
              <Route path="/iniciar-sesion" element={<Login/>}/>
            </Routes>


          </main>
        </div>
          

      </Fragment>
    </Router>

    
  )

}


export default App;
