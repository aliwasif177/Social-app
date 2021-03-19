import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faSearch,
  faUser,
  faBell,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

import { store } from "../..";
const navbar = (props) => {
  let profilePic = store.getState().auth.signUpData.profilePic;
  console.log(profilePic);

  return (
    <div>
      <nav className="navbar navbar-expand-md d-none d-lg-block navbar-light bg-light mb-3">
        <div className="container">
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse font-weight-bold"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Notifications
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Messages
                </a>
              </li>
            </ul>
            <a className="navbar-brand mx-auto" href="#">
              <img
                src={profilePic}
                onClick={props.showProfile}
                className="rounded-circle"
                height="45"
                width="45"
              />
            </a>

            <form className="form-inline ml-auto">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control shadow-none remove-borders"
                  placeholder="Username"
                />
                <div className="input-group-append shadow-none">
                  <span className="input-group-text bg-white shadow-none remove-borders ">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                </div>
              </div>
            </form>

            <li className="nav-item d-inline">
              <a
                className="nav-link   font-weight-bolder text-muted"
                href="#"
                onClick={props.logingOut}
              >
                LogOut
              </a>
            </li>
          </div>
        </div>
      </nav>

      <nav className="navbar navbar-expand-md d-lg-none d-sm-block d-md-block navbar-light bg-light">
        <ul className="navbar-nav">
          <img
            src={profilePic}
            onClick={props.showProfile}
            className=" ml-3 rounded-circle"
            height="45"
            width="45"
          />
          <li className="nav-item">
            <a className="nav-link" href="#">
              <FontAwesomeIcon icon={faUser} />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <FontAwesomeIcon icon={faBell} />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <FontAwesomeIcon icon={faUser} />
            </a>
          </li>
          <NavLink to="/login">
            <img
              src={profilePic}
              onClick={props.showProfile}
              className=" ml-3 rounded-circle"
              height="45"
              width="45"
            />
          </NavLink>
        </ul>
        <div></div>
      </nav>
    </div>
  );
};
export default navbar;
