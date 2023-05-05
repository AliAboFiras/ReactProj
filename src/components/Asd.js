import React, { useState } from "react";
import axios from "axios";

const Asd = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("details"));
  const [details, setDetails] = useState();
  const send = async (e) => {
    axios
      .post(
        "api/upgradeee",
        {
          data: user['email'],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // handle error
      });
  };

  return (
    <div>
      <button onClick={send}>nnn</button>
    </div>
  );
};

export default Asd;
