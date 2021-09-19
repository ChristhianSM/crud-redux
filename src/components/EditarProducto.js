import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { editarProductoAction } from '../actions/productosActions';

export const EditarProducto = () => {

    const dispatch = useDispatch();
    const history = useHistory()

    // Obtener el state del store para mostrar el producto en el formulario
    const productoEditar = useSelector(state => (state.productos.productoEditar));

    const {nombre, precio, id} = productoEditar;

    // Estado del formulario
    const [datosForm, setDatosForm] = useState({
        nombre,
        precio,
        id
    })

    if (nombre === null ) return;

    const handleActualizarProducto = (e) => {
        e.preventDefault();

        // Validar que los campos no esten vacios

        // ActualizarProducto
        dispatch(editarProductoAction(id, datosForm));

        // Redireccionar
        history.push("/");
    }
    
    return (
        <div className = "row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>
                        <form 
                            onSubmit = {handleActualizarProducto}
                        >
                            <div className="form-group">
                                <label htmlFor="">Nombre Producto</label>
                                <input 
                                    type="text" 
                                    className = "form-control"
                                    placeholder = "Nombre Producto"
                                    name = "nombre"
                                    value = {datosForm.nombre}
                                    onChange = {(e) => {
                                        setDatosForm({
                                            ...datosForm,
                                            [e.target.name]: e.target.value
                                        })
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
                                    value = {datosForm.precio}
                                    onChange = {(e) => {
                                        setDatosForm({
                                            ...datosForm,
                                            [e.target.name]: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <button
                                type = "submit"
                                className = "btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Guardar Producto</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
