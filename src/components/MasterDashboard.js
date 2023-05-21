import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";

const MasterDashboard = () => {
  const [slots, setSlots] = useState([]);
  const [dateSlots, setDateSlots] = useState([]);
  let [anotherDay, setAnotherDay] = useState(false);
  let [anotherDate, setAnotherDate] = useState("");

  let user = JSON.parse(localStorage.getItem("details"));
  let serviceName = localStorage.getItem("userServiceName");
  let token = JSON.parse(localStorage.getItem("token"));

  const today = new Date();

  useEffect(() => {
    const data = {
      email: user["email"],
      ServiceName: serviceName,
      date: today.toLocaleDateString(),
    };
    axios
      .post("/api/getMasterTodaySlots", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          setSlots(JSON.parse(response.data.data));
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const sendDay = (date) => {
    setAnotherDate(date.toLocaleDateString());
    const data = {
      email: user["email"],
      ServiceName: serviceName,
      date: date.toLocaleDateString(),
    };
    axios
      .post("/api/getMasterTodaySlots", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          setDateSlots(JSON.parse(response.data.data));
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>
        Welcome {serviceName} {user["first_name"]}
      </h1>
      your slot for today {today.toLocaleDateString()}
      {slots ? (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Client</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr>
                  <td>{slot["time"]}</td>
                  <td>{slot["client_id"] ? slot["client_id"] : "Free Time"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {anotherDay ? (
            <>
              <strong>Chose date from here to see your slot </strong>
              or close this{" "}
              <button
                onClick={() => {
                  setAnotherDay(false);
                }}
                className="btn btn-outline-dark"
              >
                close
              </button>
              <DatePicker
                closeOnScroll={true}
                withPortal
                showWeekNumbers
                onChange={(date) => sendDay(date)}
                placeholderText="YYYY/MM/DD"
              />
              {dateSlots ? (
                <>
                  your slot for {anotherDate}
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Time</th>
                        <th scope="col">Client</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dateSlots.map((slot) => (
                        <tr>
                          <td>{slot["time"]}</td>
                          <td>
                            {slot["client_id"]
                              ? slot["client_id"]
                              : "Free Time"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              Do you want to see slots for another day ?<br />
              <button
                onClick={() => {
                  setAnotherDay(true);
                }}
                className="btn btn-outline-dark"
              >
                click here
              </button>
              <br />
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MasterDashboard;
