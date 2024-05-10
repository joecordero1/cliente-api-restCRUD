import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContext';


function Animal({ animal }) {
    
    const [auth,] = useContext(CRMContext);
    const token = auth.token;
    const navigate = useNavigate();
    // Estados para los nombres de tipoAnimal y raza
    const [tipoAnimalNombre, setTipoAnimalNombre] = useState('');
    const [razaNombre, setRazaNombre] = useState('');
    const [sexos, setSexoNombre] = useState('');

    const { _id, tipoAnimal, raza, estados, ubicacion, salud, intervenciones, Edad,sexo, FechaRegistro, FechaActualizacion } = animal;

    // Cargar los nombres de tipoAnimal, raza y sexo al cargar el componente
    useEffect(() => {
        if (animal.Id_TipoAnimal && animal.Id_Raza && animal.Id_Sexo) {
            Promise.all([
                clienteAxios.get(`/tipos-animal/${animal.Id_TipoAnimal}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                clienteAxios.get(`/razas/${animal.Id_Raza}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                clienteAxios.get(`/sexos/${animal.Id_Sexo}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]).then(([tipoRes, razaRes, sexoRes]) => {
                setTipoAnimalNombre(tipoRes.data.nombre);
                setRazaNombre(razaRes.data.nombre);
                setSexoNombre(sexoRes.data.nombre);
            }).catch(error => {
                console.error('Error al cargar los nombres de tipoAnimal o raza', error);
            });
        }
    }, [animal, token]);

    const deleteAnimal = id => {
        Swal.fire({
            title: "Confirmación",
            text: "No es posible revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar"
        }).then((result) => {
            if (result.value) {
                clienteAxios.delete(`/animales/${_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    Swal.fire({
                        title: "Eliminado",
                        text: res.data.mensaje,
                        icon: "success"
                    });
                })
                .catch(error => {
                    Swal.fire('Error', 'No se pudo eliminar el animal', 'error');
                });
            }
        });
    }

    const formatEstadoSalud = (items) => {
        if (!items || items.length === 0) {
            return 'Sin datos';
        }
        return items.map(item => `${item.estado.clave} (${item.detalles.map(det => `${det.clave}: ${det.valor}`).join(', ')})`).join('; ');
    };
    const formatIntervenciones = (items) => {
        if (!items || items.length === 0) {
            return 'Sin datos';
        }
        return items.map(item => `${item.intervenciones.clave} (${item.detalles.map(det => `${det.clave}: ${det.valor}`).join(', ')})`).join('; ');
    };

    return (
        <li className="animal">
            <div className="info-animal">
                <p className="nombre">IDAnimal: {animal._id}</p>
                <p className="tipo">Tipo Animal: {tipoAnimalNombre}</p>
                <p>Raza: {razaNombre}</p>
                <p>Estado(s): {formatEstadoSalud(estados)}</p>
                <p>Ubicación: {`Latitud: ${ubicacion.coordinates[1]}, Longitud: ${ubicacion.coordinates[0]}`}</p>
                <p>Salud: {formatEstadoSalud(salud)}</p>
                <p>Intervenciones: {formatIntervenciones(intervenciones)}</p>
                <p>Edad: {Edad}</p>
                <p>Sexo: {sexos}</p>
                <p>Fecha de Registro: {FechaRegistro}</p>
                <p>Fecha de Actualización: {FechaActualizacion}</p>
            </div>
            <div className="acciones">
                <Link to={`/animales/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Animal
                </Link>
                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteAnimal(_id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Animal
                </button>
            </div>
        </li>
    );
}

export default Animal;
