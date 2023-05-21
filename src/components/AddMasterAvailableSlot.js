import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { TimePicker } from "react-ios-time-picker";
import "react-datepicker/dist/react-datepicker.css";

const AddMasterAvailableSlot = () => {
  let user = JSON.parse(localStorage.getItem("details"));
  let token = JSON.parse(localStorage.getItem("token"));
  let userServiceName = localStorage.getItem("userServiceName");

  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState([]);
  const [timeRange, setTimeRange] = useState([]);

  const today = new Date();

  let myDateBoolean = false;
  let myTimeBoolean = false;

  const done = () => {
    const data = {
      email: user["email"],
      serviceName: userServiceName,
      dates: dateRange,
      times: timeRange,
    };
    console.log(data);
    axios
      .post("api/addMasterAvailableSlots", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
          });
          console.log(res.data.data);
          navigate("/master_dashboard");
        } else {
          console.log(res.data.dd);
        }
      });
  };

  const saveStrDate = (date) => {
    const dateStr = date.toLocaleDateString();
    setDateRange([...dateRange, dateStr]);
    myDateBoolean = true;
  };

  const saveTimes = (timeValue) => {
    setTimeRange([...timeRange, timeValue]);
    myTimeBoolean = true;
  };

  return (
    <div>
      {userServiceName ? (
        <>
          <h4>please select your Days from here:</h4>
          <DatePicker
            closeOnScroll={true}
            withPortal
            minDate={new Date()}
            showWeekNumbers
            onChange={(date) => saveStrDate(date)}
            placeholderText="Chose Date yyyy/MM/dd"
          />
          {(myDateBoolean = dateRange.length === 0 ? false : true)}

          {myDateBoolean ? (
            <>
              you are select this days :
              {dateRange.map((date, index) => (
                <div key={index}>{date}</div>
              ))}
            </>
          ) : (
            <>You haven't chosen yet </>
          )}
          <br />
          <br />
          {/* <button onClick={doneDate} className="btn btn-dark">
            Done Dates
          </button> */}
          <br />

          <h4>please select your times from here:</h4>
          <TimePicker onChange={saveTimes} value="10:00" />
          {(myTimeBoolean = timeRange.length === 0 ? false : true)}

          {myTimeBoolean ? (
            <>
              you are select this times :
              {timeRange.map((time, index) => (
                <div key={index}>{time}</div>
              ))}
            </>
          ) : (
            <>You haven't chosen yet </>
          )}
          <br />
          <br />
          {/* <button onClick={doneTime} className="btn btn-dark">
            Done Times
          </button> */}
          {myDateBoolean ? (
            <>
              {myTimeBoolean ? (
                <button onClick={done} className="btn btn-primary">
                  Save
                </button>
              ) : null}
            </>
          ) : null}
        </>
      ) : (
        <div>error</div>
      )}
    </div>
  );
};

export default AddMasterAvailableSlot;
