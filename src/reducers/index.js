import {combineReducers} from 'redux';
import alertaReducer from './alertaReducer';
import productosReducer from './productosReducers';

export default combineReducers({
    productos: productosReducer,
    alerta : alertaReducer
})