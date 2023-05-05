import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { BiLogIn , BiLogOut } from "react-icons/bi";
import { IoIosPersonAdd } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import {BsPersonLinesFill} from "react-icons/bs";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('details'));
  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="nav-link active" aria-current="page" to={`/`}> Online Booking{"    "} </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse position-relative" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to={`/about`}> About As <FcAbout /> </Link>
              </li>
              {localStorage.getItem("details") ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to={`/dashboard/logout`}>Logout <BiLogOut /></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to={`/dashboard/account`}>My Account <BsPersonLinesFill /></Link>
                </li>
              </>
              ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to={`/login`}> Login <BiLogIn /> </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to={`/register`}> Register <IoIosPersonAdd /> </Link>
                </li>
              </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
