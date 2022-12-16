/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import swal from "sweetalert";
const Menu = (props) => {
  let tipoUsuario = "user";
  const navigate = useNavigate();
  const [salir, setSalir] = useState(0);
  console.log(props.name);
  try {
    JSON.parse(sessionStorage.getItem("roles")).forEach((element) => {
      if (element.nombre === "ROLE_ADMIN") {
        tipoUsuario = "admin";
      }

    });
  } catch (error) {}
  useEffect(() => {
    if (sessionStorage.getItem("key") === null) {
      swal("Saliendo de la aplicacion", "Debe digitar credenciales", "success");
      navigate("/");
    }
  }, [salir]);

  const cerrarSesion = () => {
    sessionStorage.clear();
    setSalir(1);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {tipoUsuario === "admin" ? (
            <Link className="navbar-brand" to="/usuarios">
              Usuarios
            </Link>
          ) : (
            ""
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {props.name==="usuario"?(<Link className="navbar-brand btn btn-primary" to="/usuario">
              Acciones
            </Link>):(<Link className="navbar-brand" to="/usuario">
              Acciones
            </Link>)}

            {props.name==="producto"?(<Link className="navbar-brand btn btn-primary" to="/productos">
              Productos
            </Link>):(<Link className="navbar-brand" to="/productos">
              Productos
            </Link>)}
            
           
            <Link className="navbar-brand" onClick={cerrarSesion}>
              Salir
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
