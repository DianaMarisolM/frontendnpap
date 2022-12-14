/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../Config/ApiUrl";
import swal from "sweetalert";
import Menu from "../Menu/Menu";

const URL = API("list");
const URLE = API("delete/");

const ListarUsuarios = () => {
  const [Usuario, setUsuarios] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      let tipoUsuario = "user";
      if (sessionStorage.getItem("key") === null) {
        swal("Acceso No Autorizado", "Debe digitar credenciales", "error");
        navigate("/");
      }
      JSON.parse(sessionStorage.getItem("roles")).forEach((element) => {
        if (element.nombre === "ROLE_ADMIN") {
          tipoUsuario = "admin";
        }
      });
      if (tipoUsuario === "user") {
        swal(
          "Acceso No Autorizado para usuario",
          "Debe digitar credenciales",
          "error"
        );
        navigate("/menu");
      } else {
        getUsuarios();
      }
    } catch (error) {}
  }, []);

  const getUsuarios = async () => {
    try {
      const login = await axios({
        method: "GET",
        url: URL,
        headers: {
          user: sessionStorage.getItem("user"),
          key: sessionStorage.getItem("key"),
        },
      });
      setUsuarios(login.data);
    } catch (error) {
      if (error.response.request.status === 401) {
        swal(
          "Acceso No Autorizado",
          "El usuario no tiene permiso de acceso",
          "error"
        );
        navigate("/menu");
      }
    }
  };

  const eliminarUsuario = async (id) => {
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
          getUsuarios();
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
      <Menu name="Usuarios" />
      <div className="container">
        <Link className="btn btn-outline-primary" to={`/crearUsuario`}>
          <i className="fa-solid fa-user-plus"></i>
        </Link>
        <table className="table">
          <thead className="table-primary">
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Usuario.map((usuario) => (
              <tr key={usuario.idUsuario}>
                <td>{usuario.nombreUsuario}</td>
                <td>{usuario.apellidoUsuario}</td>
                <td>{usuario.userName}</td>
                <td>
                  <Link
                    className="btn btn-outline-danger"
                    onClick={() => eliminarUsuario(usuario.idUsuario)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </Link>{" "}
                  <Link
                    className="btn btn-outline-info"
                    to={`/editarUsuario/${usuario.idUsuario}`}
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

export default ListarUsuarios;
