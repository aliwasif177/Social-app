import React, { Component } from "react";
import "./ShareThoughts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faVideo } from "@fortawesome/free-solid-svg-icons";
import SharedThoughts from "../SharedThoughts/SharedThoughts";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/index";
import { withRouter } from "react-router-dom";
import { store } from "../..";
class ShareThoughts extends Component {
  state = {
    changing: false,
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
      changing: true,
    });
    console.log(i);
  };
  shareTracker = (i) => {
    i.numberOfShares = i.numberOfShares + 1;
    this.setState({
      changing: true,
    });
  };
  likesTracker = (i) => {
    i.numberOfLikes = i.numberOfLikes + 1;
    this.setState({
      changing: true,
    });
  };

  render() {
    console.log(this.state.posts);
    return (
      <div>
        <div className="row pb-4 color">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className=" card card-body color">
              <div className="d-flex flex-row">
                <div className="pr-2">
                  <img
                    src={this.props.profilePic}
                    className="rounded-circle img-fluid"
                    height="45"
                    width="45"
                    alt=""
                    onClick={this.props.onInit}
                  />
                </div>
                <div className="input-group">
                  <textarea
                    type="text"
                    cols=" 50"
                    className="form-control rounding"
                    placeholder="Say Something"
                    value={this.props.post.text}
                    onChange={(e) => this.props.textChangedHandler(e)}
                    data-target="#share"
                    data-toggle="collapse"
                  ></textarea>
                  <div className="input-group-append round-append">
                    <div className="input-group-text">
                      <button
                        onClick={(e) => this.props.submitPost(e)}
                        className="btn btn-primary share border-rounded"
                        disabled={
                          !this.props.post.text &&
                          !this.props.post.image &&
                          !this.props.post.video
                        }
                      >
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-around">
                <div>
                  <div className="image-upload">
                    <label htmlFor="file-input">
                      <FontAwesomeIcon
                        icon={faCamera}
                        style={{
                          color: "#007bff",
                          position: "absolute",
                          cursor: "pointer",
                          marginTop: "5px",
                        }}
                      />
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      onChange={(event) => this.props.imageUploadHandler(event)}
                    />
                  </div>
                </div>
                <div>
                  <div className="image-upload">
                    <label htmlFor="video-input">
                      <FontAwesomeIcon
                        icon={faVideo}
                        style={{
                          color: "#007bff",
                          position: "absolute",
                          cursor: "pointer",
                          marginTop: "5px",
                        }}
                      />
                    </label>
                    <input
                      id="video-input"
                      type="file"
                      onChange={(e) => this.props.videoUploadHandler(e)}
                    />
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        {this.props.loading
          ? null
          : this.props.posts
              .slice(0)
              .reverse()
              .map((i) => {
                console.log(this.props.posts);
                console.log(this.props.loading);
                console.log(this.props.post);
                return (
                  <SharedThoughts
                    text={i.text}
                    key={i.key}
                    image={i.image}
                    video={i.video}
                    likes={i.likes}
                    commentsTracker={() => this.commentsTracker(i)}
                    shareTracker={() => this.shareTracker(i)}
                    comment={i.currentComment}
                    commentChangeHandler={(e) =>
                      this.commentChangeHandler(e, i)
                    }
                    submitCommentHandler={() => this.props.submitComment(i)}
                    comments={i.comments}
                    isComment={i.isComment}
                    authorProfilePic={i.authorProfilePic}
                    publishDate={i.publishDate}
                    firstName={i.authorFirstName}
                    lastName={i.authorLastName}
                    trackLikes={() => this.props.likesTracker(i)}
                    likes={i.likes}
                    currentlike={i.currentlike}
                    getSelectedUserDetail={this.props.getSelectedUserDetail}
                    history={this.props.history}
                  />
                );
              })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.thoughts.posts,
    post: state.thoughts.post,
    loading: state.thoughts.loading,
    profilePic: state.auth.signUpData.profilePic,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    textChangedHandler: (e) => dispatch(actionCreators.textChangedHandler(e)),
    imageUploadHandler: (e) => dispatch(actionCreators.imageUploadHandler(e)),
    videoUploadHandler: (e) => dispatch(actionCreators.videoUploadHandler(e)),
    submitPost: (e) => dispatch(actionCreators.addPost(e)),
    submitComment: (i) => dispatch(actionCreators.submitComment(i)),
    likesTracker: (i) => dispatch(actionCreators.trackLikes(i)),
    getSelectedUserDetail: (id, history) =>
      dispatch(actionCreators.getSelectedUserDetail(id, history)),
  };
};

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(ShareThoughts));
