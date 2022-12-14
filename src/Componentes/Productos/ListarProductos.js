import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
          traerCuentas();
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
        <Link className="btn btn-outline-primary" to={`/crearProducto`}>
        <i className="fa-solid fa-sack-dollar"></i>
        </Link>
        <table className="table">
          <thead className="table-primary">
            <tr>
              <th>Fecha</th>
              <th>Existencia</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {producto.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.fechaApertura.substring(0, 10)}</td>
                <td>{producto.existenciaProducto}</td>
                <td>
                  {producto.usuario.nombreUsuario +
                    " " +
                    producto.usuario.apellidoCliente}
                </td>
                <td>
                  {" "}
                  <Link
                    className="btn btn-outline-danger"
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </Link>{" "}
                  <Link
                    className="btn btn-outline-info"
                    to={`/editarProducto/${producto.id}`}
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
