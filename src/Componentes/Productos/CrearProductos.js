import Menu from "../Menu/Menu";
import { useEffect, useState } from "react";
import {Link,  useNavigate } from "react-router-dom";
import { APIC, API } from "../Config/ApiUrl";
import swal from "sweetalert";
import axios from "axios";
const URL = APIC("create");
const URLC = API("list");

const headers = {
  user: sessionStorage.getItem("user"),
  key: sessionStorage.getItem("key"),
};
const CrearProducto = () => {
  const [fecha, setFecha] = useState();
  const [producto, setnombreProducto] = useState("");
  const [existencia, setExistencia] = useState(0);
  const [Usuarios, setUsuarios] = useState("");
  const [Usuario, setUsuario] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    traerUsuarios();
  }, []);

  const crear = async () => {
    if (Usuario === "") {
      swal("Productos", "Debe seleccionar un producto", "error");
    } else {
      try {
        const crearProducto = await axios({
          method: "POST",
          url: URL,
          data: {
            producto:producto,
            fechaApertura: fecha,
            existenciaProducto: existencia,
            usuario: {
              idUsuario: Usuario,
            },
          },
        });
        console.log(crearProducto.data);
        swal(
          "Productos",
          "Producto Creada con id " + crearProducto.data.id,
          "success"
        ).then((value) => {
          navigate("/productos");
        });
      } catch (error) {
        swal("Productos", "Error al crear el producto", "error");
      }
    }
  };

  const traerUsuarios = async () => {
    try {
      const Usuarios = await axios({
        method: "GET",
        url: URLC,
        headers: headers,
      });
      setUsuario(Usuarios.data);
    } catch (error) {}
  };
  return (
    <>
      <Menu />
      <div className="container col-5">
        <h3>Creando producto</h3>
        <form onSubmit={crear}>
        <div className="mb-3">
            <label className="form-label">Producto</label>{" "}
            <input
              className="form-control"
              type="text"
              value={producto}
              onChange={(e) => setnombreProducto(e.target.value)}
            ></input>
          </div>
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
              value={Usuario}
              type="text"
              onChange={(e) => setUsuarios(e.target.value)}
              required
            >
              <option>Seleccione un usuario</option>
              {Usuario.map((usuario) => (
                <option value={usuario.idUsuario} key={usuario.idUsuario}>
                  {usuario.nombreUsuario + " " + usuario.apellidoUsuario}
                </option>
              ))}
              </select> 
          </div>
          <button type="submit" className="btn btn-outline-primay">Crear Producto
          </button>
          {" "}
          <Link className="btn btn-outline-primary" to="/productos">Regresar</Link>
        </form>
      </div>
    </>
  );
};

export default CrearProducto;
