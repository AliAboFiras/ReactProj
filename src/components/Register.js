import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Register = () => {

    const [registerInput, setRegister] = useState({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "+963",
      error_list: [],
    });
    const navigate = useNavigate();
    const handleInput = (e) => {
      e.persist();
      setRegister({ ...registerInput, [e.target.name]: e.target.value });
    };
    const register = (e) => {
      e.preventDefault();
      const data = {
        first_name: registerInput.first_name,
        last_name: registerInput.last_name,
        email: registerInput.email,
        password: registerInput.password,
        phone: registerInput.phone,
      };
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem('token' ,JSON.stringify(res.data.token));
          localStorage.setItem('details' , JSON.stringify(res.data.userDetails));
          Swal.fire({
            title: 'Success',
            text: res.data.message
          });
          navigate("/dashboard");
        } else {
          setRegister({ ...registerInput , error_list : res.data.validation_errors})
        }

      });
    };
  
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-xs-8 col-sm-6 col-md-8">
            <form onSubmit={register}>

              <div className="mb-3">
                <label className="form-label">First Name :</label>
                <input type="text"  className="form-control " 
                  name="first_name"
                  value={registerInput.first_name}
                  onChange={handleInput} placeholder="first name"
                />
                <span>{registerInput.error_list.first_name}</span>
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name :</label>
                <input type="text"  className="form-control" 
                  name="last_name"
                  value={registerInput.last_name}
                  onChange={handleInput} placeholder="last name"
                />
                <span>{registerInput.error_list.last_name}</span>
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number :</label>
                <input type="text"  className="form-control" 
                  name="phone"
                  value={registerInput.phone}
                  onChange={handleInput} placeholder="+963 *** *** ***"
                />
                <span>{registerInput.error_list.phone}</span>
              </div>
              <div className="mb-3">
                <label className="form-label">Email :</label>
                <input type="email"  className="form-control " 
                  name="email"
                  value={registerInput.email}
                  onChange={handleInput} placeholder="example@gmail.com"
                />
                <span>{registerInput.error_list.email}</span>
              </div>
              <div className="mb-3">
                <label className="form-label">Password :</label>
                <input type="password"  className="form-control " 
                  name="password"
                  value={registerInput.password}
                  onChange={handleInput} placeholder="At Lest 8 Characters"
                />
                <span>{registerInput.error_list.password}</span>
              </div>

              
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Register
