import React, { Fragment, useState } from 'react';
import { act } from 'react-dom/test-utils';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


function NuevoCliente() {
    const navigate = useNavigate();

    const [cliente, guardarCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });

    //aqui leemos el state
    const actualizarState = e => {
        //almacenar lo que escribe
        guardarCliente({
            ...cliente,
            [e.target.name] : e.target.value

        })
        
    }

    //añadir cliente
    const agregarCliente = e => {
        e.preventDefault();

        //envia peticion
        clienteAxios.post('/clientes', cliente)
        .then(res => {
            if(res.data.code === 11000){
                Swal.fire({
                    icon: "error",
                    title: "Hubo un error",
                    text: 'Cliente ya registrado'
                  });
            } else {
                console.log(res.data);
                Swal.fire({
                    title: "Se agregó ese cliente",
                    text: res.data.mensaje, // Asigna el mensaje de la respuesta a la propiedad 'text'
                    icon: "success"
                  });
                // Usar navigate para redirigir
                navigate('/');
            }
        });
    }

    //valido el formulario
    const validarCliente = () => {
        const {nombre, apellido, email, empresa, telefono} = cliente;
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

        return valido;
    }

    return(
        <Fragment>
            <h2>Nuevo Cliente</h2>
            
            <form action="/clientes" method="POST" onSubmit={agregarCliente}>

                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                            placeholder="Nombre Cliente" 
                            name="nombre"
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input  type="text" 
                            placeholder="Apellido Cliente" 
                            name="apellido" 
                            onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input  type="text" 
                            placeholder="Empresa Cliente" 
                            name="empresa" 
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input  type="email" 
                            placeholder="Email Cliente" 
                            name="email" 
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input  type="text" 
                            placeholder="Teléfono Cliente" 
                            name="telefono" 
                            onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" 
                           className="btn btn-azul" 
                           value="Agregar Cliente" 
                           disabled = {validarCliente()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

//el router toma un componente y devuelve otro componente
export default NuevoCliente;
