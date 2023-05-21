import axios from "axios";
import React, { useState , useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

const VisitDoctorProfiile = () => {
  let user = JSON.parse(localStorage.getItem("details"));
  let token = JSON.parse(localStorage.getItem("token"));

  let [profileDetails, setProfileDetails] = useState([]);
  let [dateSlots, setDateSlots] = useState([]);
  let [errorMessage, setErrorMessage] = useState();
  const [dateStr, setDateStr] = useState('');
  const [chosenDateSlot, setChosenDateSlot] = useState();
  const [slotState, setSlotState] = useState(false);
  const [message, setMessage] = useState();

  const location = useLocation();
  const docData = location.state;
  
  const navigate = useNavigate();

  useEffect(() => {
    const data = {
      email: user["email"],
      docID: docData.id,
    };
    axios
      .post("/api/visitDoctorProfile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          setProfileDetails(response.data.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const sendDay = (date) => {
    const dDate = date.toLocaleDateString();
    setDateStr(dDate);
    setDateSlots([]);
    const data = {
      email:user['email'],
      date: date.toLocaleDateString(),
      docID: docData.id,
    };
    console.log(data);
    axios
      .post("/api/viewTodaySlot", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data);
          setDateSlots(response.data.data);
          console.log("date slots",dateSlots);
          setChosenDateSlot(response.data.dateID); 
          if(response.data.state){
            setSlotState(true);
            console.log(response.data.state);
          }
        } else {
          console.log(response.data.message);
          setErrorMessage(response.data.message);
        }
      });
  };

  const BookAppointment = (slot) => {
    console.log(chosenDateSlot);
    const data = {
      email:user['email'],
      dateID: chosenDateSlot,
      time: slot.time,
    };
    console.log(data);
    axios
      .post("/api/addClientSlot", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire(response.data.message);
          navigate('/dashboard');
        } else {
          Swal.fire(response.data.message);
        }
      });
  }

  return (
    <div>
      <div className="card text-center ">
        <div className="card-body">
          <h2 className="card-title">
            {profileDetails["serviceName"]} {"  "} {profileDetails["fullName"]}
          </h2>
          <p className="card-text">Welcome to my profile</p>
          <p className="card-text">
            If you want to book an appointment with me, please select a specific
            date
          </p>
          <DatePicker
            closeOnScroll={true}
            withPortal
            minDate={new Date()}
            onChange={(date) => {sendDay(date)}}
            placeholderText="Chose date here"
          />
        </div>
      </div>
      {dateSlots.length > 0 ? (
        <>
          this is {profileDetails["serviceName"]} {"  "}{" "}
          {profileDetails["fullName"]} appointments state for {dateStr}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Client</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              {dateSlots.map((slot) => (
                <tr>
                  <td>{slot["time"]}</td>
                  <td>{slot["state"] ? <>empty</> : <>booked up</>}</td>
                  <td>
                    {slot["state"] ? (
                      <>
                        <button className="btn" onClick={() => {BookAppointment(slot)}} >Book the appointment</button>
                      </>
                    ) : (null)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>{errorMessage}</>
      )}
    </div>
  );
};

export default VisitDoctorProfiile;
