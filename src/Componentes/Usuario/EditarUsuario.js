/* eslint-disable react-hooks/exhaustive-deps */
import Menu from "../Menu/Menu";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../Config/ApiUrl";
import swal from "sweetalert";
const URL = API("update/");
const URLF = API("list/");
const headers = {
  user: sessionStorage.getItem("user"),
  key: sessionStorage.getItem("key"),
};
const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombreUsuario, setnombreUsuario] = useState("");
  const [apellidoUsuario, setapellidoUsuario] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  let roles = document.getElementsByClassName("role");
  const guardar = async () => {
    let listaRoles = [];
    for (const rol of roles) {
      if (rol.checked) {
        listaRoles.push(rol.value);
      }
    }
    try {
      const insertarUsuario = await axios({
        method: "PUT",
        url: URL,
        data: {
          idUsuario: id,
          nombreUsuario: nombreUsuario,
          apellidoUsuario: apellidoUsuario,
          userName: userName,
          password: password,
          roles: listaRoles,
        },
        headers: headers
      });
      swal("Registro creado", insertarUsuario.data.message, "success").then(
        (value) => {
          navigate("/usuarios")
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const buscarUsuario = async () => {

    const usuario = await axios({
      method: "GET",
      url: URLF + id,
      headers:headers,
    });
    setnombreUsuario(usuario.data.nombreUsuario);
    setapellidoUsuario(usuario.data.apellidoUsuario);
    setUserName(usuario.data.userName);
    for (const rol of usuario.data.roles) {
      for (const check of roles) {
        if (
          rol.nombre.replaceAll("ROLE_", "").substring(0, 3) ===
          check.value.toUpperCase().substring(0, 3)
        ) {
          check.checked = true;
        }
      }
    }
  };

  useEffect(() => {
    buscarUsuario();
  }, []);

  return (
    <>
      <Menu></Menu>
      <div className="container col-5">
        <form onSubmit={guardar}>
          <div className="mb-3">
            <label className="form-label">Nombre de usuario </label>{" "}
            <input
              className="form-control"
              type="text"
              value={nombreUsuario}
              onChange={(e) => setnombreUsuario(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido de usuario </label>{" "}
            <input
              className="form-control"
              type="text"
              value={apellidoUsuario}
              onChange={(e) => setapellidoUsuario(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">username de usuario </label>{" "}
            <input
              className="form-control"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña de usuario </label>{" "}
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <input
              className="form-check-input role"
              type="checkbox"
              value="user"
            />{" "}
            <label className="form-check-label">User</label>
            {"   "}
            <input
              className="form-check-input role"
              type="checkbox"
              value="admin"
            />{" "}
            <label className="form-check-label">Admin</label>
            {"   "}
            <input
              className="form-check-input role"
              type="checkbox"
              value="logist"
            />{" "}
            <label className="form-check-label">Logist</label>
          </div>

          <button type="submit" className="btn btn-outline-primary">
            Guardar
          </button>{" "}
          <Link className="btn btn-outline-primary" to="/usuarios">Regresar</Link>
        </form>
       
      </div>
      
    </>
  );
};

export default EditarUsuario;
