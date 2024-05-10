import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import { CRMContext } from '../../context/CRMContext';

const Navegacion = () => {
    const [auth, guardarAuth] = useContext(CRMContext);
    if(!auth.auth) return null;
    return (
        <aside className="sidebar col-3">
            <h2>Administrar</h2>
            <nav className="navegacion">
                <Link to={"/"} className="animales">Animales</Link>
                <Link to={"/intervenciones"} className="intervenciones">Intervenciones</Link>
                {/* <a href="productos.html" className="productos">Productos</a> */}
                {/* <a href="pedidos.html" className="pedidos">Pedidos</a> */}
            </nav>
        </aside>
    );
}

export default Navegacion;
