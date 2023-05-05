import React ,{useState}from "react";
import axios from "axios";

const Test = () => {  

  let token = JSON.parse(localStorage.getItem("token"));

  const done = () => {     
    axios.get("api/getSlot", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
          console.log(res.data);        
      });
  };

  return(
    <div>
      <button onClick={done} type="submit" className="btn btn-primary">getslot</button>
    </div>
  );
};

export default Test;
