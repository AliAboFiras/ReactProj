import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Login = () => {
  
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });
  const navigate = useNavigate();
  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };
  const login = (e) => {
    e.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    axios.post(`/api/login`, data).then((res) => {
      if (res.data.status === 200) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("details", JSON.stringify(res.data.userDetails));
        Swal.fire({
          title: "Success",
          text: res.data.message,
        });
        navigate("/dashboard");
      } else {
        setLogin({ ...loginInput , error_list : res.data.validation_errors})
      }
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-xs-8 col-sm-6 col-md-8">
          <form onSubmit={login}>
          <div className="mb-3">
                <label className="form-label">Email :</label>
                <input type="email"  className="form-control " 
                  name="email"
                  value={loginInput.email}
                  onChange={handleInput} placeholder="example@gmail.com"
                />
                <span>{loginInput.error_list.email}</span>
              </div>
              <div className="mb-3">
                <label className="form-label">Password :</label>
                <input type="password"  className="form-control " 
                  name="password"
                  value={loginInput.password}
                  onChange={handleInput} placeholder="At Lest 8 Characters"
                />
                <span>{loginInput.error_list.password}</span>
              </div>

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
