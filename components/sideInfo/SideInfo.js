import React from "react";
import nature from "../../Assets/images/nature.jpg";
import mynature from "../../Assets/images/mynature.jpg";
import "./SideInfo.css";
const sideInfo = () => (
  <div className="card">
    <img src={nature} className="img-fluid info" alt="" />
    <img
      src={mynature}
      className="rounded-circle mx-auto text-cent"
      height="100"
      width="100"
      alt=""
    />

    <div className="card-body">
      {/* <h6 className="font-weight-bold text-dark">Zaeem Awan</h6> */}
      <p>
        <small className="text-muted">
          Any one can join with but Social network us if you want Any one can
          join with us if you want
        </small>
      </p>
    </div>
  </div>
);
export default sideInfo;
