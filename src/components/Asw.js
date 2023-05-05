import React, { useState } from "react";
import axios from "axios";
const Asw = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("details"));
    const send = async (e) => {
    axios
        .post(
        "api/upgradee",
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
        <button onClick={send}>eee</button>
    </div>
    );
}

export default Asw
