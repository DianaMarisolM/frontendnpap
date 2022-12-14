/* eslint-disable react-hooks/exhaustive-deps */
import Menu from "../Menu/Menu";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { APIC, API } from "../Config/ApiUrl";
import swal from "sweetalert";
import axios from "axios";
const URL = APIC("update");
const URLBC = APIC("list/");
const URLC = API("list");
const headers = {
  user: sessionStorage.getItem("user"),
  key: sessionStorage.getItem("key"),
};
const EditarProductos = () => {
  const { id } = useParams();
  const [fecha, setFecha] = useState("");
  const [existencia, setExistencia] = useState(0);
  const [usuario, setUsuario] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    traerUsuarios();
    traerProducto();
  }, []);

  const actualizar = async () => {

    try {
        const crearProducto = await axios({
          method: "PUT",
          url: URL,
          data: {
            id:id,
            fechaApertura: fecha,
            existenciaProducto: existencia,
            usuario: {
              idUsuario: usuario,
            },
          },
        });

        swal(
          "Productos",
          "Producto Actualizada con id " + crearProducto.data.id,
          "success"
        ).then((value) => {
          navigate("/productos");
        });
      } catch (error) {
        swal("productos", "Error al crear el producto", "error");
      }
  };

  const traerUsuarios = async () => {
    try {
      const producto = await axios({
        method: "GET",
        url: URLBC + id,
      });
      setFecha(producto.data.fechaApertura.substring(0, 10));
      setExistencia(producto.data.existenciaProducto);
      setUsuario(producto.data.usuario.idUsuario);
    } catch (error) {}
  };

  const traerProducto = async () => {
    try {
      const usuarios = await axios({
        method: "GET",
        url: URLC,
        headers: headers,
      });
      setUsuarios(usuarios.data);
    } catch (error) {}
  };
  return (
    <>
      <Menu />
      <div className="container col-5">
        <h3>Editar producto</h3>
        <form onSubmit={actualizar}>
          <div>
            <label className="form-label">Fecha</label>
            <input
              className="form-control"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              type="date"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("El campo fecha es requerido")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            ></input>
          </div>
          <div>
            <label className="form-label">Existencia</label>
            <input
              className="form-control"
              value={existencia}
              onChange={(e) => setExistencia(e.target.value)}
              type="number"
              min={0}
            ></input>
          </div>
          <div>
            <label className="form-label">Usuario</label>
            <select
              className="form-control"
              value={usuario}
              type="text"
              onChange={(e) => setUsuario(e.target.value)}
              required
            >
              <option>Seleccione un usuario</option>
              {usuarios.map((usuario) => (
                <option value={usuario.idUsuario} key={usuario.idUsuario}>
                  {usuario.nombreUsuario + " " + usuario.apellidoUsuario}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Guardar
          </button>{" "}
          <Link className="btn btn-outline-primary" to="/usuarios">
            Regresar
          </Link>
        </form>
      </div>
    </>
  );
};

export default EditarProductos;
