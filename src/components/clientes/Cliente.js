import React from 'react';
import {Link}  from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Cliente({cliente}) {
    const { _id, nombre, apellido, empresa, email, telefono} = cliente;
    
    const deleteCliente = id => {
        Swal.fire({
            title: "Confirmación",
            text: "No es posible revertir esta accion",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar"
          }).then((result) => {
            if (result.value) {
                clienteAxios.delete(`/clientes/${_id}`)
                .then (res => {
                    Swal.fire({
                        title: "Eliminado",
                        text: res.data.mensaje,
                        icon: "success"
                      });
                })

            }
          });
    }
    
    return(
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>{telefono}</p>
            </div>
            <div className="acciones">
                <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </Link>
                <button 
                type="button"
                className="btn btn-rojo btn-eliminar"
                onClick={deleteCliente}>
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )
}

export default Cliente;