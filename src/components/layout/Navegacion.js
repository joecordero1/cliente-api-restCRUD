import React from 'react';
import {Link} from 'react-router-dom'

const Navegacion = () => {
    return (
        <aside className="sidebar col-3">
            <h2>Administración</h2>
            <nav className="navegacion">
                <Link to={"/"} className="clientes">Clientes</Link>
                {/* <a href="productos.html" className="productos">Productos</a> */}
                {/* <a href="pedidos.html" className="pedidos">Pedidos</a> */}
            </nav>
        </aside>
    );
}

export default Navegacion;
