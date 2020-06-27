import React, { Component } from "react";
import * as actionCreators from "../../Store/index";
import { connect } from "react-redux";
import { Carousel } from "react-bootstrap";
import bg1 from "../../Assets/images/bg1.jpg";
import bg2 from "../../Assets/images/bg2.jpg";
import bg3 from "../../Assets/images/bg3.jpg";
import logic from "../../Assets/images/logic.png";
import fire from "../../Firebase/Fire";
import "./login.css";
import { NavLink } from "react-router-dom";
class LogIn extends Component {
  state = {
    email: "",
    password: "",
  };

  componentDidMount() {
    console.log(this.props.auth);
    console.log(this.props.history);
  }

  render() {
    return (
      <div>
        <section id="login">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <h1 className="text-light float-left pt-4 pl-4">Airbook</h1>
              </div>
              <div className="col-6">
                <form className="form-inline form-sm float-right pt-4">
                  <input
                    type="text"
                    className="form-control form-control-sm mr-2"
                    placeholder="Enter Email"
                    value={this.props.email}
                    onChange={(e) => this.props.emailChangedHandler(e)}
                  />
                  <input
                    type="password"
                    className="form-control form-control-sm mr-2"
                    placeholder="Enter Password"
                    value={this.props.password}
                    onChange={(e) => this.props.passwordChangedHandler(e)}
                  />

                  {/* <NavLink to="/"> */}
                  <button
                    className="btn btn-clr btn-sm text-light"
                    onClick={(e) => this.props.signingIn(e, this.props.history)}
                  >
                    Login
                  </button>
                  {/* </NavLink> */}
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="signUp" className="kody">
          <div className="container">
            <div className="row pt-5">
              <div className="col-7  text-center">
                <h5 className="text-justify pl-3 font-weight-light lead">
                  Airbook helps you connect and share with people in your life
                </h5>
                <img src={logic} className="img-fluid pt-5" alt="" />
              </div>
              <div className="col-5 pl-5">
                <div>
                  <h2 className="font-weight-bold text-justify">
                    Create an account
                    {/* <p className="font-weight-light">its quick and easy</p> */}
                  </h2>
                  {/* <p className="font-weight-light text-justify-center ml-auto">
                    its quick and easy
                  </p> */}
                </div>
                <div>
                  <p className="font-weight-light  pd-4 text-justify">
                    it's quick and easy
                  </p>
                </div>
                <div>
                  <form action="" className="form-inline">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control mr-2"
                      placeholder="First name"
                      onChange={(e) => this.props.firstNameChangedHandler(e)}
                      value={this.props.firstName}
                    />
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control"
                      placeholder="Surname"
                      onChange={(e) => this.props.lastNameChangedHandler(e)}
                      value={this.props.lastName}
                    />
                  </form>
                  <div className="pt-2">
                    <input
                      type="email"
                      placeholder="Email address"
                      className="form-control form-control-block"
                      value={this.props.signUpEmail}
                      onChange={(e) => this.props.signUpEmailChangedHandler(e)}
                    />
                  </div>
                  <div className="pt-2">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control form-control-block"
                      onChange={(e) =>
                        this.props.signUpPasswordChangedHandler(e)
                      }
                      value={this.props.signUpPassword}
                    />
                  </div>
                </div>
                <label
                  className=" float-left d-block text-muted font-weight-bold pt-4 "
                  htmlFor="Birthday"
                >
                  Birthday
                </label>
                <input
                  type="date"
                  name=""
                  id=""
                  className="form-control"
                  onChange={(e) => this.props.DOBChangedHandler(e)}
                  value={this.props.DOB}
                />
                <label
                  className=" float-left text-muted font-weight-bold pt-2"
                  htmlFor="Gender"
                >
                  Gender
                </label>
                <div
                  className="btn-group btn-group-toggle input-group"
                  data-toggle="buttons"
                  onChange={(e) => this.props.genderChangedHandler(e)}
                >
                  <label className="btn btn-color btn-sm">
                    <input
                      type="checkbox"
                      name="options"
                      autoComplete="off"
                      // onClick={(e) => this.props.genderChangedHandler(e)}
                      value="male"
                      // value={this.props.gender}
                    />{" "}
                    Male
                  </label>
                  <label className="btn btn-color btn-sm">
                    <input
                      type="checkbox"
                      name="options"
                      autoComplete="off"
                      value="female"
                      // onClick={(e) => this.props.genderChangedHandler(e)}
                    />{" "}
                    Female
                  </label>
                  <label className="btn btn-color btn-sm">
                    <input
                      type="checkbox"
                      name="options"
                      autoComplete="off"
                      // onClick={(e) => this.props.genderChangedHandler(e)}
                      value="other"
                    />{" "}
                    Other
                  </label>
                </div>

                <button
                  className="btn btn-color btn-lg  text-light mt-4 float-left"
                  onClick={this.props.signingUp}
                  disabled={
                    !this.props.firstName ||
                    !this.props.lastName ||
                    !this.props.signUpEmail ||
                    !this.props.signUpPassword ||
                    !this.props.DOB ||
                    !this.props.gender
                  }
                >
                  SignUp
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    auth: state.auth,
    signUpEmail: state.auth.signUpData.signUpEmail,
    signUpPassword: state.auth.signUpData.signUpPassword,
    firstName: state.auth.signUpData.firstName,
    lastName: state.auth.signUpData.lastName,
    gender: state.auth.signUpData.gender,
    DOB: state.auth.signUpData.DOB,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signingUp: () => dispatch(actionCreators.signUp()),
    signingIn: (e, history) => dispatch(actionCreators.signIn(e, history)),
    emailChangedHandler: (e) => dispatch(actionCreators.emailChangedHandler(e)),
    passwordChangedHandler: (e) =>
      dispatch(actionCreators.passwordChangedHandler(e)),
    signUpEmailChangedHandler: (e) =>
      dispatch(actionCreators.signUpEmailChangedHandler(e)),
    signUpPasswordChangedHandler: (e) =>
      dispatch(actionCreators.signUpPasswordChangedHandler(e)),
    firstNameChangedHandler: (e) =>
      dispatch(actionCreators.firstNameChangedHandler(e)),
    lastNameChangedHandler: (e) =>
      dispatch(actionCreators.lastNameChangedHandler(e)),
    DOBChangedHandler: (e) => dispatch(actionCreators.DOBChangedHandler(e)),
    genderChangedHandler: (e) =>
      dispatch(actionCreators.genderChangedHandler(e)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
