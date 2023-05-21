import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Dashboard = () => {
  let [docName, setDocName] = useState();
  let [docLoc, setDocLoc] = useState();
  let [results, setResults] = useState([]);
  let [todaySlot, setTodaySlot] = useState([]);
  let [message, setMessage] = useState("");
  let [todaySlotEmpty, settodaySlotEmpty] = useState(false);

  let user = JSON.parse(localStorage.getItem("details"));
  let token = JSON.parse(localStorage.getItem("token"));

  const navigate = useNavigate();

  const handleDocName = (e) => {
    e.persist();
    setDocName(e.target.value);
  };

  const searchByName = () => {
    console.log(docName);
    const data = {
      email: user["email"],
      name: docName,
    };
    console.log(data);
    axios
      .post("api/searchByName", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.data);
          setResults(res.data.data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
        }
      });
  };

  const handleDocLoc = (e) => {
    e.persist();
    setDocLoc(e.target.value);
  };

  const searchByLoc = () => {
    console.log("Loc");
    console.log(docLoc);
    const data = {
      email: user["email"],
      location: docLoc,
    };
    console.log(data);
    axios
      .post("api/searchByLocation", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.data);
          setResults(res.data.data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
        }
      });
  };

  const checkTodayClientSlot = () => {
    const data = {
      email: user["email"],
      today: new Date().toLocaleDateString(),
    };
    console.log(data);
    axios
      .post("api/checkTodayClientSlot", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.data);
          setTodaySlot(res.data.data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
          setMessage(res.data.message);
          settodaySlotEmpty(true);
        }
      });
  };

  const visitDoctorProfile = (docID) => {
    const data = {
      'id' : docID
    };
    navigate('/dashboard/visit_doctor_profiile', { state: data });
  };

  return (
    <div>
      {localStorage.getItem("details") ? (
        <>
          <h2>Welcome {user["first_name"]} </h2>
          do you want to search for Doctor ?
          <div className="row ">
            <div className="col-auto">
              <label className="col-auto">
                here you can search by doctor name
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="name"
                value={docName}
                onChange={handleDocName}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-dark" onClick={searchByName}>
                search
              </button>
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-auto">
              <label className="col-auto">
                here you can search by doctor location
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Location"
                value={docLoc}
                onChange={handleDocLoc}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-dark" onClick={searchByLoc}>
                search
              </button>
            </div>
          </div>
          <br />
          {results ? (
            <>
              <div className="card">
                <ul className="list-group list-group-flush">
                  {results.map((result) => (
                    <li className="list-group-item" key={result["id"]}>
                      {result["service"]} :{result["user"]}
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => visitDoctorProfile(result["docID"])}
                      >
                        visit
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}
          {todaySlot.length > 0 ? (
            <>mmm{console.log(todaySlot)}</>
          ) : (
            <>
              {todaySlotEmpty ? (
                <>{message}</>
              ) : (
                <>
                  Would you like to check your appointments for today? or for another day?{" "}
                  <button
                    className="btn btn-outline-primary"
                    onClick={checkTodayClientSlot}
                  >
                    check for today
                  </button>
                  <DatePicker
            closeOnScroll={true}
            withPortal
            minDate={new Date()}
            onChange={(date) => {sendDay(date)}}
            placeholderText="or chose date from here to check it"
          />
                </>
              )}
            </>
          )}
        </>
      ) : null}
    </div>
  );
};

export default Dashboard;
