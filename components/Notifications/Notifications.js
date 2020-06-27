import React from "react";
import "./Notifications.css";
import logo1 from "../../Assets/images/download1.jpg";
import logo2 from "../../Assets/images/download2.png";
import logo3 from "../../Assets/images/download4.png";
const notification = () => (
  <div className="card card-body ">
    <h6 className="font-weight-bold ">Recent Notifications</h6>
    <div className="d-flex flex-row ">
      <div className="pt-3">
        <img
          src={logo1}
          className="rounded-circle"
          alt=""
          height="45px"
          width="45px"
        />
      </div>
      <div className="pt-3">
        <p className="font-weight-bold text-muted text-justify">
          Anyone can join with us if you want
          <small className="d-block">20 min ago</small>
        </p>
      </div>
    </div>
    <div className="d-flex flex-row ">
      <div className="pt-3">
        <img
          src={logo2}
          className="rounded-circle"
          alt=""
          height="45px"
          width="45px"
        />
      </div>
      <div className="pt-3">
        <p className="font-weight-bold text-muted text-justify">
          Hassan Ali Contacted you on facebook
          <small className="d-block">20 min ago</small>
        </p>
      </div>
    </div>
    <div className="d-flex flex-row ">
      <div className="pt-3">
        <img
          src={logo3}
          className="rounded-circle"
          alt=""
          height="45px"
          width="45px"
        />
      </div>
      <div className="pt-3">
        <div className="d-flex flex-column">
          <p className="font-weight-bold text-muted text-justify">
            let friends connect with you
            <small className="d-block">20 min ago</small>
          </p>
        </div>
      </div>
    </div>
  </div>
);
export default notification;
