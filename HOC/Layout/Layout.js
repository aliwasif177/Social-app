import React, { Component } from "react";
import Navbar from "../../components/navbar/navbar";
import * as actionCreators from "../../Store/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { store } from "../..";
class Layout extends Component {
  showProfile = () => {
    console.log(this.props.history);
    this.props.showProfile(store.getState().auth.userId, this.props.history);
    console.log(store.getState().auth.userId);
    // this.props.history.push("/Profile");
  };

  render() {
    console.log(this.props.history);
    return (
      <div>
        <Navbar
          logingOut={() => this.props.logOut(this.props.history)}
          showProfile={this.showProfile}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

// const mapStateToProps=(state)=>{
//   return{

//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (history) => dispatch(actionCreators.logOut(history)),
    showProfile: (id, history) =>
      dispatch(actionCreators.getSelectedUserDetail(id, history)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Layout));
