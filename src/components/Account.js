import React, { useState } from "react";
import { useNavigate } from "react-router";

const Account = () => {
  let user = JSON.parse(localStorage.getItem("details"));

  const [showAddServiceDiv , setShowAddServiceDiv]=useState(false);

  const navigate = useNavigate();

  const upgrade = () =>{
        navigate("/dashboard/upgrade_account_informations");
    }

  const AddServiceProvider = () =>{
    navigate("/dashboard/add_service");
  }

  return (
    
    <div>

      <div className="container">
        <div className="row">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                First Name :
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong> {user['first_name']} </strong>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                Last Name :
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong> {user['last_name']} </strong>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="true"
                aria-controls="collapseThree"
              >
                Email:
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
              <strong> {user['email']} </strong>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="true"
                aria-controls="collapseFour"
              >
                Phone:
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
              <strong> {user['phone']} </strong>
              </div>
            </div>
          </div>
        </div>
        </div>

        <div >
          <strong>do you want to upgrade your informations ?  </strong><br /> 
          <button onClick={upgrade} className="btn btn-outline-dark">upgrade</button>
        </div>

        <div >
          <strong>do you want to be Service Provider ?  </strong><br /> 
          <button onClick={AddServiceProvider} className="btn btn-outline-dark">Lets Do It</button>
        </div>
      </div>
    </div>
  );
};

export default Account;
