import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { API } from "../Config/ApiUrl";
const URL = API("login");

const Login = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const ingresar = async (e) => {
    e.preventDefault();
    try {
      const login = await axios({
        method: "POST",
        url: URL,
        headers: {
          user: user, 
          pwd: pwd,
        },
      });
      swal("Acceso Autorizado", "Bievenido " + login.data.user, "success").then(
        (value) => {
          sessionStorage.setItem("user", login.data.user);
          sessionStorage.setItem("key", login.data.key);
          sessionStorage.setItem("roles", JSON.stringify(login.data.roles));
          navigate("/menu");
        }
      );
    } catch (error) {
      swal(
        "Acceso No Autorizado",
        JSON.parse(error.request.response).message,
        "error"
      );
    }
  };

  return (
    <>
      <div className="container col-3">
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="pills-login"
            role="tabpanel"
            aria-labelledby="tab-login"
          >
            <form onSubmit={ingresar}>
              <div className="form-outline mb-4">
                <input
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  type="text"
                  className="form-control"
                />
                <label className="form-label">username</label>
              </div>

              <div className="form-outline mb-4">
                <input
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  type="password"
                  className="form-control"
                />
                <label className="form-label">Password</label>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
