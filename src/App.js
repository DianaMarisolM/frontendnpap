/* eslint-disable jsx-a11y/alt-text */
import "./App.css";
import {Route,Routes,HashRouter} from "react-router-dom"
import Login from "./Componentes/Login/Login";
import Menu from "./Componentes/Menu/Menu";
import ListarUsuarios from "./Componentes/Usuario/ListaUsuarios";
import CrearUsuario from "./Componentes/Usuario/CrearUsuario";
import EditarUsuario from "./Componentes/Usuario/EditarUsuario";
import ListarProductos from "./Componentes/Productos/ListarProductos";
import EditarProductos from "./Componentes/Productos/EditarProductos";
import CrearProducto from "./Componentes/Productos/CrearProductos";



function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          
          <Route exact path="/menu" element={<Menu/>}/>          
          <Route exact path="/usuarios" element={<ListarUsuarios/>}/>          
          <Route exact path="/crearUsuario" element={<CrearUsuario/>}/>          
          <Route exact path="/editarUsuario/:id" element={<EditarUsuario/>}/>  
          <Route exact path="/productos" element={<ListarProductos/>}/>
          <Route exact path="/editarProducto/:id" element={<EditarProductos/>}/>  
          <Route exact path="/crearProducto" element={<CrearProducto/>}/>          
        </Routes>

      </HashRouter>
    </>
  );
}

export default App;
