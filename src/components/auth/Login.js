import React, {useState} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';



function Login() {

    const [ credenciales, guardarCredenciales] = useState({});
    
    //inicia sesion en el servidor
    const iniciarSesion = async e => {
        e.preventDefault();

        try{
            const respuesta = await clienteAxios.post('/iniciar/sesion', credenciales)
            //aqui pone el token en el local storage
            const {token} = respuesta.data;
            localStorage.setItem('token', token);

            //alerta
            Swal.fire(
                'Login Correcto',
                'Ha iniciado sesion',
                'success'
            )

            //navigate redireccioar
            navigate('/');


        } catch (error) {
            console.log(error);
            Swal.fire({
                type:'error',
                title: 'Hubo un error',
                text: error.responde.data.mensaje
            })
        }
    }


    //almacenar usuario en el state
    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }

    return (
      <div className="login">
        <h2>Iniciar Sesión</h2>
        <div className="contenedor-formulario">
          <form onSubmit={iniciarSesion}>
            <div className="campo">
              <label>Email</label>
              <input 
              type="text"
              name="email"
              placeholder="Email de inicio de sesion"
              required
              onChange={leerDatos}
              />
            </div>
            <div className="campo">
              <label>Password</label>
              <input 
              type="password"
              name="password"
              placeholder="password de inicio de sesion"
              required
              onChange={leerDatos}
              />
            </div>
            <input type="submit" value="Iniciar sesion" className="btn btn-verde btn-block"/>
          </form>
        </div>
      </div>
    );
  }
  

export default Login;