import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const UpgradeAccountInformations = () => {

    let user = JSON.parse(localStorage.getItem('details'));
    let token = JSON.parse(localStorage.getItem('token'));

    const oldEmail = user['email'];

    const [upgradeInput, setUpgrade] = useState({
      first_name: user['first_name'],
      last_name: user['last_name'],
      email: user['email'],
      password: user['password'],
      phone: user['phone'],
      error_list: [],
    });
    const navigate = useNavigate();
    const handleInput = (e) => {
      e.persist();
      console.log(e.target.value);
      setUpgrade({ ...upgradeInput, [e.target.name]: e.target.value });
    };
    const upgrade = (e) => {
      e.preventDefault();
      const data = {
        first_name: upgradeInput.first_name,
        last_name: upgradeInput.last_name,
        email: upgradeInput.email,
        password: upgradeInput.password,
        phone: upgradeInput.phone,
        oldEmail:oldEmail
      };
      axios
      .post("api/upgrade", data ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => {
            if (res.data.status === 200) {
              localStorage.clear();
              localStorage.setItem('token' ,JSON.stringify(res.data.token));
              localStorage.setItem('details' , JSON.stringify(res.data.userDetails));
              Swal.fire({
                icon:'Success',
                title: 'Success',
                text: res.data.message
              });
              navigate("/dashboard/account");
            } else {
              setUpgrade({ ...upgradeInput , error_list : res.data.validation_errors})
            }

        });
    
};
  
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-xs-8 col-sm-6 col-md-8">
            <form onSubmit={upgrade}>

              <div className="mb-3">
                <label className="form-label">First Name :</label>
                <input type="text"  className="form-control " 
                  name="first_name"
                  value={upgradeInput.first_name}
                  onChange={handleInput} placeholder="first name"
                />
                <span>{upgradeInput.error_list.first_name}</span>
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name :</label>
                <input type="text"  className="form-control" 
                  name="last_name"
                  value={upgradeInput.last_name}
                  onChange={handleInput} placeholder="last name"
                />
                <span>{upgradeInput.error_list.last_name}</span>
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number :</label>
                <input type="text"  className="form-control" 
                  name="phone"
                  value={upgradeInput.phone}
                  onChange={handleInput} placeholder="+963 *** *** ***"
                />
                <span>{upgradeInput.error_list.phone}</span>
              </div>
              <div className="mb-3">
                <label className="form-label">Email :</label>
                <input type="email"  className="form-control " 
                  name="email"
                  value={upgradeInput.email}
                  onChange={handleInput} placeholder="example@gmail.com"
                />
                <span>{upgradeInput.error_list.email}</span>
              </div>
              <div className="mb-3">
                <label className="form-label">Password :</label>
                <input type="password"  className="form-control " 
                  name="password"
                  value={upgradeInput.password}
                  onChange={handleInput} placeholder="At Lest 8 Characters"
                />
                <span>{upgradeInput.error_list.password}</span>
              </div>

              
              <button type="submit">upgrade</button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default UpgradeAccountInformations
