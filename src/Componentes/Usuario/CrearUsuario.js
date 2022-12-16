/* eslint-disable react-hooks/exhaustive-deps */
import Menu from "../Menu/Menu";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../Config/ApiUrl";
import swal from "sweetalert";
import axios from "axios";
const URL = API("/create") ;
const CrearUsuario = () => {
  const navigate = useNavigate();
  const [nombreUsuario, setnombreUsuario] = useState("");
  const [apellidoUsuario, setapellidoUsuario] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [regresar, setRegresar] = useState(0);
  

  const headers = {
    user: sessionStorage.getItem("user"),
    key: sessionStorage.getItem("key"),
  };

  useEffect(() => {
    if (sessionStorage.getItem("key") === null) {
      swal("Acceso No Autorizado", "Debe digitar credenciales", "error");
      navigate("/");
    }
    
  }, []);

  useEffect(() => {
    if(regresar!==0)
    navigate("/usuarios");
  }, [regresar]);

  const guardar = async () => {
    let roles = document.getElementsByClassName("role");
    let listaRoles = [];
    for (const rol of roles) {
      console.log(rol);
      if (rol.checked) {
        listaRoles.push(rol.value);
      }
    }
    try {
      const insertarUsuario = await axios({
        method: "POST",
        url: URL,
        data: {
          nombreUsuario: nombreUsuario,
          apellidoUsuario: apellidoUsuario,
          userName: userName,
          password: password,
          roles: listaRoles,
        },
        headers: headers,
      });
      console.log(insertarUsuario.data);
      swal("Registro creado", insertarUsuario.data.message, "success").then(
        (value) => {
         setRegresar(1)
        }
      );
    } catch (error) {
      swal(
        "Error en datos",
        JSON.parse(error.request.response).errors[0].message,
        "error"
      );
    }
    console.log(listaRoles);
  };

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
          </button>
          {" "}
          <Link className="btn btn-outline-primary" to="/usuarios">Regresar</Link>
        </form>
      </div>
    </>
  );
};

export default CrearUsuario;
