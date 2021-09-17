import { Header } from "./components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Productos } from "./components/Productos";
import { NuevoProducto } from "./components/NuevoProducto";
import { EditarProducto } from "./components/EditarProducto";

// Redux
import {Provider} from 'react-redux';
import store from './store'

function App() {
  return (
    <Router>
      <Provider store = {store}>
        <Header />
        <div className="container mt-5">
          <Switch>
            <Route exact path = "/">
              <Productos />
            </Route>
            <Route exact path = "/productos/nuevo">
              <NuevoProducto />
            </Route>
            <Route exact path = "/productos/editar/:id">
              <EditarProducto />
            </Route>
          </Switch>
        </div>

      </Provider>
    </Router>

    
  );
}

export default App;
