import React from 'react'
import { Link } from 'react-router-dom'

// Redux
import { useDispatch } from 'react-redux'
import { eliminarProductoAction } from '../actions/productosActions'
import Swal from 'sweetalert2'

export const Producto = ({producto}) => {

    const {nombre, precio, id} = producto

    const dispatch = useDispatch();
    
    // Confirmar si desea eliminarlo 
    const confirmarEliminarProducto = (id) => {
        // Preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
              // Pasar al action
              dispatch(eliminarProductoAction(id));      
            }
          })

        
    }

    return (
        <tr>
            <td>{nombre}</td>
            <td>
                <span className = "font-weight-bold">$ {precio}</span> 
            </td>
            <td>
                <Link 
                    to = {`/productos/editar/${id}`}
                    className = "btn btn-primary mr-2"
                >Editar</Link>
                <button
                    className = "btn btn-danger mr-2"
                    onClick = {() => {
                        confirmarEliminarProducto(id)
                    }}
                >Eliminar</button>
            </td>
        </tr>
    )
}
