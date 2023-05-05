import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const AddMasterAvailableSlot = () => {
  let user = JSON.parse(localStorage.getItem("details"));
  let token = JSON.parse(localStorage.getItem("token"));
  let userServiceName = localStorage.getItem("userServiceName");

  const navigate = useNavigate();

  let [selectedDays, setSelectedDays] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedyear, setSelectedyear] = useState();
  let [selectedSlots, setSelectedSlots] = useState([]);
  
  const yearsItems = [
    { "id":1 , "name": 2023},
    { "id":2 , "name": 2024},
    { "id":3 , "name": 2025},
    { "id":4 , "name": 2026}
  ];
  
  const monthsItems = [
    { "id":1 , "name": "Jan"},
    { "id":2 , "name": "Feb"},
    { "id":3 , "name": "Mar"},
    { "id":4 , "name": "Apr"},
    { "id":5 , "name": "May"},
    { "id":6 , "name": "Jun"},
    { "id":7 , "name": "Jul"},
    { "id":8 , "name": "Aug"},
    { "id":9 , "name": "Sep"},
    { "id":10 , "name": "Oct"},
    { "id":11 , "name": "Nov"},
    { "id":12 , "name": "Dec"}
  ];

  const daysItems = [
    { "id":1 , "name": "Sun"},
    { "id":2 , "name": "Mon"},
    { "id":3 , "name": "Tue"},
    { "id":4 , "name": "Wed"},
    { "id":5 , "name": "Thu"},
    { "id":6 , "name": "Fri"},
    { "id":7 , "name": "Sat"},
  ];

  const handleYearSelect = (event) => {
    event.preventDefault();
    setSelectedyear(event.target.value);
  };

  const handleMonthSelect = (event) => {
    event.preventDefault();
    setSelectedMonths([...selectedMonths ,  event.target.value ])
  };

  const handleDaySelect = (event) => {
    event.preventDefault();
    setSelectedDays([...selectedDays ,  event.target.value ])
  };
  
  // const done = () => {     
  //   const data ={
  //     year : selectedyear,
  //     months : monthsItems,
  //     days : daysItems,
  //     times : slotItems,
  //     serviceName : userServiceName,
  //     email : user['email']
  //   };
  //   axios.post("api/addMasterAvailableSlots", data, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.status === 200) {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Success",
  //         });
  //         console.log(res.data);
  //         // navigate("/dashboard/master_dashboard");
  //       } else {
  //         console.log(res.data.dd);
  //       }
  //     });
  // };

  return (
    <div>
      {userServiceName ? (
        <>
          <div >
            select Year : 
            <div>
              <select className="form-select" aria-label="Default select example" onChange={handleYearSelect}  >
                <option value="">Availabel Years</option>
                {yearsItems.map((year) => (
                  <option key={year.id} value={year.name} >{year.name}</option>
                ))}
              </select>
            </div>
            {selectedyear}<br /><br />
            select Month : 
            <div>
              <select className="form-select" aria-label="Default select example" onChange={handleMonthSelect}  >
                <option value="">Availabel Months</option>
                {monthsItems.map((month) => (
                  <option key={month.id} value={month.name} >{month.name}</option>
                ))}
              </select>
            </div>
            <div>
            you are select this months :
            {selectedMonths.map((month)=>(<div>{month}</div>))}<br /><br />
            </div>
            select Days : 
            <div>
              <select className="form-select" aria-label="Default select example" onChange={handleDaySelect}  >
                <option value="">Availabel Days</option>
                {daysItems.map((day) => (
                  <option key={day.id} value={day.name} >{day.name}</option>
                ))}
              </select>
            </div>
            you are select this days :
            {selectedDays.map((day)=>(<div>{day}</div>))}

          </div>
        </>
      ) : (<div>error</div>)}
    </div>
  );
};

export default AddMasterAvailableSlot;
