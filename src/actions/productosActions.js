import { AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_ERROR, AGREGAR_PRODUCTO_EXITO, COMENZAR_DESCARGAS_PRODUCTOS, DESCARGA_PRODUCTOS_ERROR, DESCARGA_PRODUCTOS_EXITO, OBTENER_PRODUCTO_EDITAR, OBTENER_PRODUCTO_ELIMINAR, PRODUCTO_EDITADO_ERROR, PRODUCTO_EDITADO_EXITO, PRODUCTO_ELIMINADO_ERROR, PRODUCTO_ELIMINADO_EXITO } from "../types";
import clienteAxios from '../config/axios'
import Swal from "sweetalert2";

// Crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async (dispatch) => {
        dispatch( agregarProducto());
        try{
            // Insertar en la Api
            await clienteAxios.post('/productos', producto);

            // Si todo sale bien, actualizar el state
            dispatch( agregarProductoExito(producto));

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se Agrego Correctamente',
                'success'
            )

        }catch(error){
            // Si hay un error, cambiar el state
            dispatch( agregarProductoError(true));

            // Alerta de Error 
            Swal.fire({
                icon: 'error',
                title : 'Hubo un error',
                text : 'Hubo un error, intenta nuevamente'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
})

const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = (estadoError) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload : estadoError
})

// Funcion que descarga los productos de la base de datos.
export function mostrarProductosAction () {
    return async (dispatch) => {
        dispatch(comenzarDescargaProductos());
        try {
            const respuesta = await clienteAxios.get('/productos');

            dispatch( descargaProductosExito(respuesta.data));
        } catch (error) {
            dispatch( descargaProductosError());
        }
    }
}

const comenzarDescargaProductos = () => ({
    type: COMENZAR_DESCARGAS_PRODUCTOS
})

const descargaProductosExito = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload : productos,
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR
})

// Funcion para eliminar un producto
export function eliminarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());

            // Si se elimina Mostrar Alerta
            Swal.fire(
                'Eliminado!',
                'El producto se elimino correctamente.',
                'success'
            )

        } catch (error) {
            dispatch(eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload : id,
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

// Funcion para editar un producto
export function editarProductoAction(id, producto = {}){
    return async dispatch => {
        dispatch(obtenerEditarProducto(id));
        
        try {

            if (Object.keys(producto).length === 0) return;
            await clienteAxios.put(`/productos/${id}`, producto);
            dispatch(editarProductoExito(producto));

            // Mostrar Alerta exito
            Swal.fire(
                'Correcto',
                'El producto se actualizo Correctamente',
                'success'
            )

        } catch (error) {
            dispatch(editarProductoError());
        }
    }
}

const obtenerEditarProducto = (id) => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: id
})

const editarProductoExito = (productoEditado) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload : productoEditado
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR
})