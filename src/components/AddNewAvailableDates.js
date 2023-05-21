import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { eachDayOfInterval } from "date-fns";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddNewAvailableDates = () => {

  let user = JSON.parse(localStorage.getItem("details"));
  let token = JSON.parse(localStorage.getItem("token"));
  let userServiceName = localStorage.getItem("userServiceName");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [lastDate, setLastDate] = useState();

  let myBoolean = false ;
  const navigate = useNavigate();

  function handleDateChange(dates) {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      const range = eachDayOfInterval({ start, end });
      setDateRange(range);
    } else {
      setDateRange([]);
    }
  }

  useEffect(() => {
    axios
      .get("/api/getLastAvailableDay", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLastDate(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const AddNewDates = () => {
    let dateStringRange = [];
    dateRange.forEach((element) => {
      dateStringRange = [...dateStringRange, element.toLocaleDateString()];
    });
    const data = {
      email: user["email"],
      service: userServiceName,
      dates: dateStringRange,
      // times: times,
    };
    axios
      .post("api/increaseAvailableDayDates", data, {
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
          navigate("/dashboard/master_dashboard");
        } else {
          console.log(res.data.error);
        }
      });
  };

  return (
    <div>
      this is the last available day : {lastDate}
      <br />
      Choose the date range you want to add
      <DatePicker
        selectsRange={true}
        showIcon
        withPortal
        startDate={startDate}
        endDate={endDate}
        onChange={handleDateChange}
      />
      {(myBoolean = dateRange.length === 0 ? false : true)}
      {myBoolean ? (
        <>
          Your date range starts from "{startDate.toLocaleDateString()}" and extends to "{endDate.toLocaleDateString()}"
          <br />
          Click Add to save the new additions add the {dateRange.length}{" "} days you selected
          <br />
          <button className="btn btn-dark" onClick={AddNewDates}>
            ADD
          </button>
        </>
      ) : (
        <>You haven't chosen yet </>
      )}
      <br />
      {/* your new dates:
      {dateRange.length > 0 && (
        <ul>
          {dateRange.map((date) => (
            <li key={date.toISOString()}>{date.toLocaleDateString()}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default AddNewAvailableDates;
