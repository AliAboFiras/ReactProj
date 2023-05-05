import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddService = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [location, setLocation] = useState("");
  let token = JSON.parse(localStorage.getItem("token"));
  let user = JSON.parse(localStorage.getItem("details"));
  
    
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/showGeneralServices", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setServices(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSelect = (e) =>{
    setSelectedService(e.target.value);
  }
  const handleLocation = (e) =>{
    setLocation(e.target.value);
    console.log(location);
  }

  const send = (e) => {
    e.preventDefault();
    const data = {
      location: location,
      userEmail: user['email'],
      serviceName: selectedService
    };
    axios
    .post("api/addUserService", data ,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => {
          if (res.data.status === 200) {
            localStorage.setItem('userServiceName',res.data.userServiceName);
            Swal.fire({
              icon:'success',
              title: 'Success',
              text: res.data.message
            });
            navigate("/dashboard/add_available_slot");
          } else {
            console.log(res.data.message);
          }

      });
  
};

  return (
    <div>
      <h3>this is our services:</h3>
      <p>please check for what you want to add to your jop</p>
      <select className="form-select" aria-label="Default select example" onChange={handleSelect} value={selectedService} >
        <option value="">Select an option</option>
        {services.map((service) => (
          <option key={service.id} value={service.name} >{service.name}</option>
        ))}
      </select><br />
      <h3>after that you need to locate your location here:</h3>
      <input type="text" className="form-control" onChange={handleLocation} /><br />
      <button type="submit" className="btn btn-outline-primary" onClick={send}>Done</button>
    </div>
  );
};

export default AddService;
