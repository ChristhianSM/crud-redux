import React, { useEffect } from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { mostrarProductosAction } from '../actions/productosActions';
import { Producto } from './Producto';

export const Productos = () => {

    const dispatch = useDispatch();

    // Obtener el state
    const arregloProductos = useSelector(state => state.productos.productos);
    const error = useSelector(state => state.productos.error);
    const cargando = useSelector(state => state.productos.loading);

    useEffect(() => {
        // Consultar la api
        dispatch(mostrarProductosAction());
    }, [])

    return (
        <>
            <h2 className = "text-center my-5">Listado de Productos</h2>
            {
                error && <p className="font-weight-bold alert alert-danger text-center">Hubo un Error a la hora de cargar los productos</p>
            }
            {
                cargando && <p className="text-center">Cargando</p>
            }
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope = "col">Nombre</th>
                        <th scope = "col">Precio</th>
                        <th scope = "col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arregloProductos.length === 0 ? 
                        <tr>
                            <td colSpan = "3" className = "text-center">No hay productos para mostrar</td>
                        </tr>:
                        arregloProductos.map( producto => {
                            return (
                                <Producto 
                                    key = {producto.id}
                                    producto = {producto}
                                />
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
