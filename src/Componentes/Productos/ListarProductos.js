import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { APIC } from "../Config/ApiUrl";
import swal from "sweetalert";
import Menu from "../Menu/Menu";

const URL = APIC("list");
const URLE = APIC("delete/");
const ListarProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    traerProductos();
  }, []);
  const traerProductos = async () => {
    try {
      const productos = await axios({
        method: "GET",
        url: URL,
      });
      console.log(productos.data);
      setProductos(productos.data);
    } catch (error) {}
  };

  const eliminarProducto = async (id) => {
    swal({
      title: "Eliminar Registro",
      text: "Esta seguro de eliminar el registro",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const eliminar = await axios({
            method: "DELETE",
            url: URLE + id,
          });

          swal("Registro elimindo", eliminar.data.message, "success");
          traerProductos();
        } catch (error) {
          swal("Acceso No Autorizado", JSON.parse(error.request), "error");
        }
      } else {
        swal("El registro no se borró");
      }
    });
  };
  return (
    <>
      <Menu name="productos" />
      <div className="container">
        <Link className="btn btn-outline-primary" to={`/crearProducto`}>CrearProducto
        <i className="fa-solid fa-sack-dollar"></i>
        </Link>
        <table className="table">
          <thead className="table-primary">
            <tr>
              <th>Producto</th>
              <th>Fecha</th>
              <th>Existencia</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((productos) => (
              <tr key={productos.id}>
                <td>{productos.descripcion}</td>
                <td>{productos.fechaCreacion}</td>
                <td>{productos.existenciaProducto}</td>
                <td>{productos.usuario.userName}</td>
                {/* <td>
                  {productos.usuario.nombreUsuario +
                    " " +
                    productos.usuario.apellidoUsuario}
                </td> */}
                <td>
                  {" "}
                  <Link
                    className="btn btn-outline-danger"
                    onClick={() => eliminarProducto(productos.id)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </Link>{" "}
                  <Link
                    className="btn btn-outline-info"
                    to={`/editarProducto/${productos.id}`}
                  >
                    <i className="fa-solid fa-user-pen"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListarProductos;
