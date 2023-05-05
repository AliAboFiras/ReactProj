import React ,{useState,useEffect} from 'react';
import axios from 'axios';

const MasterDashboard = () => {

  const [services, setServices] = useState([]);
  let user = JSON.parse(localStorage.getItem('details'));
  let serviceName = localStorage.getItem('userServiceName');
  let token = JSON.parse(localStorage.getItem('token'));




  useEffect(() => {
    const data ={
      email : user['email'],
      ServiceName : serviceName,
    };
    axios.post("/api/getAllUserSlots",data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        localStorage.setItem('slots',response.data)
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <div>
      <h1>Welcome {serviceName} {user['first_name']}</h1>
      {localStorage.getItem('slots')?
      <>

      </>
      :
      <>

      </>}
    </div>
  )
}

export default MasterDashboard
