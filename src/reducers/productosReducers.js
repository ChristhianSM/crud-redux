import { 
    AGREGAR_PRODUCTO, 
    AGREGAR_PRODUCTO_ERROR, 
    AGREGAR_PRODUCTO_EXITO,
    COMENZAR_DESCARGAS_PRODUCTOS, 
    DESCARGA_PRODUCTOS_ERROR, 
    DESCARGA_PRODUCTOS_EXITO,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,

} from "../types";


// Cada reducer tiene su propio state
const initialState = {
    productos : [],
    error: null,
    loading : false,
    productoEliminar : null,
}

export default  function(state = initialState, action) {
    switch (action.type) {
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                loading: true,
            }

        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos : [...state.productos, action.payload]
            }

        case AGREGAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error : action.payload,
            }

        case COMENZAR_DESCARGAS_PRODUCTOS:
            return {
                ...state,
                loading: true,
            }

        case DESCARGA_PRODUCTOS_EXITO:
            return {
                ...state,
                productos: action.payload,
                loading: false,
                error: false,
            }

        case DESCARGA_PRODUCTOS_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            }

        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoEliminar : action.payload
            }

        case PRODUCTO_ELIMINADO_EXITO:
            return {
                ...state,
                productos : state.productos.filter(producto => producto.id !== state.productoEliminar),
                productoEliminar: null
            }

        case PRODUCTO_ELIMINADO_ERROR:
            return {
                ...state,
                error : action.payload,
            }
        
    
        default:
            return state;
    }
}