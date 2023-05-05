import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const AddAvailableSlot = () => {
  let user = JSON.parse(localStorage.getItem("details"));
  let token = JSON.parse(localStorage.getItem("token"));
  let userServiceName = localStorage.getItem("userServiceName");

  const navigate = useNavigate();

  let  data = {
    year : 0  ,
    months : [
      { "id":1 , "state": "true", "name": "Jan" },
      { "id":2 , "state": "false", "name": "Feb" },
      { "id":3 , "state": "false", "name": "Mar" },
      { "id":4 , "state": "false", "name": "Apr" },
      { "id":5 , "state": "false", "name": "May" },
      { "id":6 , "state": "false", "name": "Jun" },
      { "id":7 , "state": "true", "name": "Jul" },
      { "id":8 , "state": "false", "name": "Aug" },
      { "id":9 , "state": "false", "name": "Sept" },
      { "id":10, "state": "false", "name": "Oct" },
      { "id":11, "state": "false", "name": "Nov" },
      { "id":12, "state": "false", "name": "Dec" },
    ],
    days : [
      { "id":1 , "state": "false" , "name": "Sun" },
      { "id":2 , "state": "false" , "name": "Mon" },
      { "id":3 , "state": "false" , "name": "Tue" },
      { "id":4 , "state": "false" , "name": "Wed" },
      { "id":5 , "state": "false" , "name": "Thu" },
      { "id":6 , "state": "false" , "name": "Fri" },
      { "id":7 , "state": "false" , "name": "Sat" },
    ],
    times : [
      { "id":1 , "state": "false", "time": "00:00", "client_id": "" },
      { "id":2 , "state": "false", "time": "00:30", "client_id": "" },
      { "id":3 , "state": "false", "time": "01:00", "client_id": "" },
      { "id":4 , "state": "false", "time": "01:30", "client_id": "" },
      { "id":5 , "state": "false", "time": "02:00", "client_id": "" },
      { "id":6 , "state": "false", "time": "02:30", "client_id": "" },
      { "id":7 , "state": "false", "time": "03:00", "client_id": "" },
      { "id":8 , "state": "false", "time": "03:30", "client_id": "" },
      { "id":9 , "state": "false", "time": "04:00", "client_id": "" },
      { "id":10, "state": "false", "time": "04:30", "client_id": "" },
      { "id":11, "state": "false", "time": "05:00", "client_id": "" },
      { "id":12, "state": "false", "time": "05:30", "client_id": "" },
      { "id":13, "state": "false", "time": "06:00", "client_id": "" },
      { "id":14, "state": "false", "time": "06:30", "client_id": "" },
      { "id":15, "state": "false", "time": "07:00", "client_id": "" },
      { "id":16, "state": "false", "time": "07:30", "client_id": "" },
      { "id":17, "state": "false", "time": "08:00", "client_id": "" },
      { "id":18, "state": "false", "time": "08:30", "client_id": "" },
      { "id":19, "state": "false", "time": "09:00", "client_id": "" },
      { "id":20, "state": "false", "time": "09:30", "client_id": "" },
      { "id":21, "state": "false", "time": "10:00", "client_id": "" },
      { "id":22, "state": "false", "time": "10:30", "client_id": "" },
      { "id":23, "state": "false", "time": "11:00", "client_id": "" },
      { "id":24, "state": "false", "time": "11:30", "client_id": "" },
      { "id":25, "state": "false", "time": "12:00", "client_id": "" },
      { "id":26, "state": "false", "time": "12:30", "client_id": "" },
      { "id":27, "state": "false", "time": "13:00", "client_id": "" },
      { "id":28, "state": "false", "time": "13:30", "client_id": "" },
      { "id":29, "state": "false", "time": "14:00", "client_id": "" },
      { "id":30, "state": "false", "time": "14:30", "client_id": "" },
      { "id":31, "state": "false", "time": "15:00", "client_id": "" },
      { "id":32, "state": "false", "time": "15:30", "client_id": "" },
      { "id":33, "state": "false", "time": "16:00", "client_id": "" },
      { "id":34, "state": "false", "time": "16:30", "client_id": "" },
      { "id":35, "state": "false", "time": "17:00", "client_id": "" },
      { "id":36, "state": "false", "time": "17:30", "client_id": "" },
      { "id":37, "state": "false", "time": "18:00", "client_id": "" },
      { "id":38, "state": "false", "time": "18:30", "client_id": "" },
      { "id":39, "state": "false", "time": "19:00", "client_id": "" },
      { "id":40, "state": "false", "time": "19:30", "client_id": "" },
      { "id":41, "state": "false", "time": "20:00", "client_id": "" },
      { "id":42, "state": "false", "time": "20:30", "client_id": "" },
      { "id":43, "state": "false", "time": "21:00", "client_id": "" },
      { "id":44, "state": "false", "time": "21:30", "client_id": "" },
      { "id":45, "state": "false", "time": "22:00", "client_id": "" },
      { "id":46, "state": "false", "time": "22:30", "client_id": "" },
      { "id":47, "state": "false", "time": "23:00", "client_id": "" },
      { "id":48, "state": "false", "time": "23:30", "client_id": "" },
    ],
    serviceName : userServiceName ,
    email : user['email']
  };

  const [selectedDays, setSelectedDays] = useState({});
  const [selectedMonths, setSelectedMonths] = useState({});
  const [selectedyear, setSelectedyear] = useState(0);
  const [selectedSlots, setSelectedSlots] = useState({});

  // const daysItems = [
  //   { state: false , "name": "Sun" },
  //   { state: false , "name": "Mon" },
  //   { state: false , "name": "Tue" },
  //   { state: false , "name": "Wed" },
  //   { state: false , "name": "Thu" },
  //   { state: false , "name": "Fri" },
  //   { state: false , "name": "Sat" },
  // ];

  // const monthsItems = [
  //   { state: "false", "name": "Jan" },
  //   { state: "false", "name": "Feb" },
  //   { state: "false", "name": "Mar" },
  //   { state: "false", "name": "Apr" },
  //   { state: "false", "name": "May" },
  //   { state: "false", "name": "Jun" },
  //   { state: "false", "name": "Jul" },
  //   { state: "false", "name": "Aug" },
  //   { state: "false", "name": "Sept" },
  //   { state: "false", "name": "Oct" },
  //   { state: "false", "name": "Nov" },
  //   { state: "false", "name": "Dec" },
  // ];

  // const slotItems = [
  //   { "id":1 , "state": "false", "time": "00:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "00:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "01:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "01:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "02:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "02:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "03:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "03:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "04:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "04:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "05:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "05:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "06:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "06:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "07:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "07:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "08:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "08:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "09:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "09:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "10:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "10:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "11:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "11:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "12:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "12:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "13:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "13:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "14:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "14:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "15:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "15:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "16:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "16:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "17:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "17:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "18:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "18:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "19:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "19:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "20:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "20:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "21:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "21:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "22:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "22:30", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "23:00", "client_id": "" },
  //   { "id":1 , "state": "false", "time": "23:30", "client_id": "" },
  // ];

  const handleMonthsSubmit = (event) => {
    event.preventDefault();
    setSelectedMonths = data.months
    // console.log(selectedMonths);
  };

  const handleDaysSubmit = (event) => {
    console.log(data.days);
  };

  const handleSlotsSubmit = (event) => {
    console.log(data.times);
    // Send selected items to backend app using fetch or Axios
  };

  const handleYear = (event) => {
    console.log(data.year);
  };
  
  const done = () => {     
    
    console.log(data);
    axios
      .post("api/addMasterAvailableSlots", JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.data.message,
          });
          navigate("/dashboard/master_dashboard");
        } else {
          console.log(res.data.message);
        }
      });
  };

  return (
    <div>
      {userServiceName ? (
        <>
          <h2>Welcome</h2>{" "}
          <h4>
            {" "}
            {userServiceName} {user["first_name"]}
          </h4>
          <p>lets continue your configuration </p>
          <div className="row">
            <div className="col">
              <p>Please select the months in which you will be available</p>
              <form onSubmit={handleMonthsSubmit}>
                <label>
                  Months:
                  {data.months.map((item) => (
                    <div className="form-check" 
                    key={item["id"]}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={(e) => {
                          item["state"] = "true";
                        }}
                        value={item["name"]}
                      />
                      <label className="form-check-label">{item["name"]}</label>
                    </div>
                  ))}
                </label>
                <br />
                <button type="submit">Save Months</button>
              </form>
            </div>
            {/* <div className="col">
              <p>
                Please select the days in which you will be available in every
                week:
              </p>
              <form onSubmit={handleDaysSubmit}>
                <label>
                  Days:
                  {daysItems.map((item, index) => (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={(e) => {
                          item["state"] = e.target.checked;
                        }}
                        value={item["name"]}
                      />
                      <label className="form-check-label">{item["name"]}</label>
                    </div>
                  ))}
                </label>
                <br />
                <button type="submit">Save Days</button>
              </form>
              <p>Please enter the year</p>
              <label>
                year:
                <input
                  className="form-control"
                  type="number"
                  value={selectedyear}
                  onChange={handleYear}
                />
              </label>
            </div> */}
          </div>
          {/* <br />
          <br />
          <p>Now please select free time</p>
          <form onSubmit={handleSlotsSubmit}>
            <label>
              times:
              {slotItems.map((item, index) => (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={(e) => {
                      item["state"] = "true";
                    }}
                    value={item["time"]}
                  />
                  <label className="form-check-label">{item["time"]}</label>
                </div>
              ))}
            </label>
            <br />
            <button type="submit">Save Slots</button>
          </form> */}
          <br />
          <br />
          <br />
          <br />{
          console.log(JSON.stringify(data))}
          <button
            type="submit"
            onClick={done}
            className="btn btn-outline-primary"
          >
            Done
          </button>
        </>
      ) : (<div>error</div>)}
    </div>
  );
};

export default AddAvailableSlot;
