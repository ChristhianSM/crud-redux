import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { mostrarAlertaAction, ocultarAlertaAction } from '../actions/alertaActions'

/* Actions de redux */
import { crearNuevoProductoAction } from '../actions/productosActions'

export const NuevoProducto = () => {
    const history = useHistory()

    // Utilizar useDispatch
    const dispatch = useDispatch();

    // Mandar llamar el action de productoAction
    const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto));

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);

    // Acceder al state del store
    const cargando = useSelector( (state) => state.productos.loading);
    const error = useSelector( (state) => state.productos.error);

    // Acceder al stato del store en alertas
    const alerta = useSelector( state => state.alerta.alerta);


    const handleNuevoProducto = (e) => {
        e.preventDefault();

        // Validar Formulario
        if (!nombre.trim || precio <= 0) {
            const alerta = {
                mensaje : 'Ambos campos son obligatorios',
                classes : 'alert alert-danger text-center text-uppercase p3'
            }

            dispatch(mostrarAlertaAction(alerta))
            return
        }

        // Si no hay errores
        dispatch(ocultarAlertaAction());

        // Crear el nuevoProducto

        agregarProducto({
            nombre,
            precio
        });

        // Redireccionar al home
        history.push('/')
    }

    return (
        <div className = "row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>
                        {
                            alerta &&  <p className = {alerta.classes}>{alerta.mensaje}</p>
                        }
                        <form onSubmit={handleNuevoProducto}>
                            <div className="form-group">
                                <label htmlFor="">Nombre Producto</label>
                                <input 
                                    type="text" 
                                    className = "form-control"
                                    placeholder = "Nombre Producto"
                                    name = "nombre"
                                    value = {nombre}
                                    onChange = { e => {
                                        setNombre(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Precio Producto</label>
                                <input 
                                    type="number" 
                                    className = "form-control"
                                    placeholder = "Precio Producto"
                                    name = "precio"
                                    value = {precio}
                                    onChange = { e => {
                                        setPrecio(Number(e.target.value));
                                    }}
                                />
                            </div>
                            <button
                                type = "submit"
                                className = "btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>

                        {
                            cargando && <p>Cargando</p> 
                        }
                        {
                            error && <p className = "alert alert-danger p2 mt-4 text-center">Hubo un error </p> 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
