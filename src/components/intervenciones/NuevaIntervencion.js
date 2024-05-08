import React, { Fragment, useState, useContext, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

function NuevaIntervencion() {

    const [auth,] = useContext(CRMContext);
    const navigate = useNavigate();

    const [intervencion, guardarIntervencion] = useState({
        Id_Animal: '',
        nombre: '',
        resultadoAntes: '',
        resultadoDespues: '',
        comentarios: '',
        seguimiento: []
    });

    // Cargar datos iniciales de animales
    const [animales, setAnimales] = useState([]);

    useEffect(() => {
        const cargarAnimales = async () => {
            try {
                const respuesta = await clienteAxios.get('/animales', {
                    headers: { Authorization: `Bearer ${auth.token}` }
                });
                setAnimales(respuesta.data);
            } catch (error) {
                console.log(error);
            }
        };
        cargarAnimales();
    }, [auth.token]);

    const actualizarState = e => {
        guardarIntervencion({
            ...intervencion,
            [e.target.name]: e.target.value
        });
    }

    const agregarIntervencion = e => {
        e.preventDefault();

        clienteAxios.post('/intervenciones', intervencion, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })
            .then(res => {
                if (res.data.code === 11000) {
                    Swal.fire({
                        icon: "error",
                        title: "Hubo un error",
                        text: 'Intervención ya registrada'
                    });
                } else {
                    console.log(res.data);
                    Swal.fire({
                        title: "Se agregó esa intervención",
                        text: res.data.mensaje,
                        icon: "success"
                    });
                    navigate('/intervenciones');
                }
            });
    }

    const validarIntervencion = () => {
        const { Id_Animal, nombre, resultadoAntes, resultadoDespues } = intervencion;
        return !Id_Animal || !nombre || !resultadoAntes || !resultadoDespues;
    }

    // Verificar autenticación de usuario
    useEffect(() => {
        if (!auth.auth || localStorage.getItem('token') !== auth.token) {
            navigate('/iniciar-sesion');
        }
    }, [auth, navigate]);

    return (
        <Fragment>
            <h2>Nueva Intervención</h2>

            <form onSubmit={agregarIntervencion}>

                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Animal:</label>
                    <select
                        name="Id_Animal"
                        onChange={actualizarState}
                    >
                        <option value="">-- Seleccione --</option>
                        {animales.map(animal => (
                            <option key={animal._id} value={animal._id}>{animal._id}</option>
                        ))}
                    </select>
                </div>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                        placeholder="Nombre de la intervención"
                        name="nombre"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Resultado Antes:</label>
                    <input type="number"
                        placeholder="Resultado antes de la intervención"
                        name="resultadoAntes"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Resultado Después:</label>
                    <input type="number"
                        placeholder="Resultado después de la intervención"
                        name="resultadoDespues"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Comentarios:</label>
                    <textarea
                        placeholder="Comentarios"
                        name="comentarios"
                        onChange={actualizarState}
                    ></textarea>
                </div>

                <div className="enviar">
                    <input type="submit"
                        className="btn btn-azul"
                        value="Agregar Intervención"
                        disabled={validarIntervencion()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default NuevaIntervencion;
