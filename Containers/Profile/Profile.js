import React, { Component } from "react";
import { store } from "../../index";
import * as actionCreators from "../../Store/index";
import profilePic from "../../Assets/images/profilePic.jpeg";
import PostDisplay from "../Postdisplay/Postdisplay";
import "./Profile.css";
import ProfilePhotosCollection from "../../components/ProfilephotosCollection/profilePhotosCollection";
import { connect } from "react-redux";
import { faCamera, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Profile extends Component {
  state = {
    isChanged: false,
  };

  commentChangeHandler = (e, i) => {
    let userId = store.getState().auth.userId;

    let profilePic = store.getState().auth.signUpData.profilePic;
    let name =
      store.getState().auth.signUpData.firstName +
      " " +
      store.getState().auth.signUpData.lastName;
    let enterInfo = {
      userId: userId,
      profilePic: profilePic,
      name: name,
      comment: "",
    };
    enterInfo.comment = e.target.value;
    i.currentComment = { ...enterInfo };

    this.setState({
      changing: true,
    });
  };

  commentsTracker = (i) => {
    i.isComment = true;
    this.setState({
      isChanged: true,
    });
    console.log(i);
  };
  shareTracker = (i) => {
    i.numberOfShares = i.numberOfShares + 1;
    this.setState({
      isChanged: true,
    });
  };
  likesTracker = (i) => {
    i.numberOfLikes = i.numberOfLikes + 1;
    this.setState({
      isChanged: true,
    });
  };
  render() {
    let myPosts = [...this.props.posts];
    let firstName = store.getState().auth.signUpData.firstName;
    let lastName = store.getState().auth.signUpData.lastName;
    console.log(store.getState().auth.userId);
    console.log(store.getState().auth.signUpData.userId);

    console.log("hy");
    return (
      <div id="header">
        <div className="container">
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-10 cover">
              <div className="card mycard">
                {this.props.coverPic ? (
                  <img
                    className="card-img-top"
                    src={this.props.coverPic}
                    alt=""
                  />
                ) : (
                  <img
                    className="card-img-top"
                    src="https://source.unsplash.com/random/301x200"
                    alt=""
                  />
                )}

                <div className="card-body">
                  {this.props.profilePic ? (
                    <img
                      src={this.props.profilePic}
                      className=" profile-pic  rounded-circle"
                    />
                  ) : (
                    <img
                      src={profilePic}
                      className=" profile-pic  rounded-circle"
                    />
                  )}

                  <div className="image-upload">
                    <label htmlFor="file-input">
                      <FontAwesomeIcon icon={faCamera} className="change-dp" />
                    </label>
                    <input
                      type="file"
                      id="file-input"
                      onChange={(e) => this.props.changeProfilePic(e)}
                    />
                  </div>
                  {store.getState().auth.userId !==
                  store.getState().auth.signUpData.userId ? (
                    <label
                      className="btn btn-lg profile-button"
                      onClick={this.props.setFollower}
                    >
                      <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                      Follow
                    </label>
                  ) : (
                    <div className="image-upload2">
                      <label
                        htmlFor="file-input2"
                        className="btn btn-lg profile-button"
                      >
                        <FontAwesomeIcon icon={faCamera} className="mr-2" />
                        Edit Cover
                      </label>
                      <input
                        type="file"
                        className="style"
                        id="file-input2"
                        onChange={(e) => this.props.changeCoverPic(e)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-center font-weight-bold pt-4">
            {firstName} {lastName}
          </h1>

          <div className="row pt-1">
            <div className="col-lg-1"></div>
            <hr />
            <div className="col-lg-10">
              <div className="container">
                <hr className="mt-3" />
              </div>
            </div>
            <div className="col-lg-1"></div>
          </div>
          <div className="row pt-3">
            <div className="col-lg-1"></div>
            <div className="col-lg-10">
              <div className="row">
                <div className="col-lg-5 ">
                  <div className="my-pics">
                    <h4>Media</h4>
                    <hr className="mt-3" />
                    <div className="card-columns pt-3">
                      <ProfilePhotosCollection posts={this.props.posts} />
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  {this.props.posts.map((i) => {
                    if (i.uid == store.getState().auth.signUpData.userId) {
                      return (
                        <PostDisplay
                          text={i.text}
                          key={i.key}
                          image={i.image}
                          video={i.video}
                          likes={i.likes}
                          likesTracker={() => this.likesTracker(i)}
                          commentsTracker={() => this.commentsTracker(i)}
                          shareTracker={() => this.shareTracker(i)}
                          comment={i.currentComment}
                          commentChangeHandler={(e) =>
                            this.commentChangeHandler(e, i)
                          }
                          submitCommentHandler={() =>
                            this.props.submitComment(i)
                          }
                          comments={i.comments}
                          isComment={i.isComment}
                          authorProfilePic={i.authorProfilePic}
                          publishDate={i.publishDate}
                          firstName={i.authorFirstName}
                          lastName={i.authorLastName}
                          trackLikes={() => this.props.likesTracker(i)}
                          likes={i.likes}
                          currentlike={i.currentlike}
                        />
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="col-lg-1"></div>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    posts: state.thoughts.posts,
    post: state.thoughts.post,
    coverPic: state.auth.signUpData.coverPic,
    profilePic: state.auth.signUpData.profilePic,
    profilePicIsLoading: state.auth.profilePicIsLoading,
  };
};
export const mapDispatchToProps = (dispatch) => {
  return {
    changeProfilePic: (e) => dispatch(actionCreators.changeProfilePic(e)),
    changeCoverPic: (e) => dispatch(actionCreators.changeCoverPic(e)),
    submitComment: (i) => dispatch(actionCreators.submitComment(i)),
    likesTracker: (i) => dispatch(actionCreators.trackLikes(i)),
    setFollower: () => dispatch(actionCreators.setFollower()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
