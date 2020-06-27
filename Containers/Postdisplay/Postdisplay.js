import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Postdisplay.css";
import {
  faEdit,
  faHeartbeat,
  faComment,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { store } from "../..";
const postDisplay = (props) => {
  let found = props.likes.find((post) => {
    if (post.userId == store.getState().auth.userId) {
      console.log(post.userId);
      return true;
    }
  });

  return (
    <div className="row text-center py-3">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="card ">
          <div className="row">
            <div className="d-flex flex-row py-3 pl-4 pr-3">
              <div className="pl-2">
                <img
                  src={props.authorProfilePic}
                  className="img-fluid rounded-circle"
                  alt=""
                  height="50"
                  width="50"
                />
              </div>
              <div>
                <h6>
                  <a
                    href="#"
                    className="float-left text-dark font-weight-bold  "
                  >
                    {props.firstName} {props.lastName}
                  </a>
                </h6>

                <span>
                  {props.publishDate ? (
                    <small className="text-muted float-right">
                      {props.publishDate}
                    </small>
                  ) : null}
                </span>
              </div>
            </div>
            <div className="ml-auto mr-5">
              <FontAwesomeIcon className="text-muted" icon={faEdit} />
            </div>
          </div>

          <div className="card-body py-2">
            <div className="card-text text-justify">{props.text}</div>
            <div className="card-img py-3">
              {props.image ? (
                <img src={props.image} alt="" className="img-fluid img-resp " />
              ) : null}

              {props.video ? (
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src={props.video}
                    allowFullScreen
                  ></iframe>
                </div>
              ) : null}
            </div>
            <hr className="items" />
            <div className="d-flex flex-row justify-content-between pd-2 py-3">
              <div className="col-4">
                <div className="d-inline float-left">
                  {found ? (
                    <FontAwesomeIcon
                      onClick={props.trackLikes}
                      icon={faHeartbeat}
                      style={{ color: "#dc3545" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      onClick={props.trackLikes}
                      icon={faHeartbeat}
                    />
                  )}

                  <div className="d-inline">
                    <p className="text-muted d-inline  pl-2 ">
                      {props.numberOfLikes}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="d-inline">
                  {props.isComment ? (
                    <div>
                      <FontAwesomeIcon
                        onClick={props.commentsTracker}
                        className="mr-1"
                        style={{ color: "#dc3545" }}
                        icon={faComment}
                      />

                      {props.comments ? (
                        props.comments.length > 1 ? (
                          <p className="d-inline">
                            {props.comments.length - 1}
                          </p>
                        ) : null
                      ) : null}
                    </div>
                  ) : (
                    <div>
                      <FontAwesomeIcon
                        onClick={props.commentsTracker}
                        className="mr-1 d-inline"
                        icon={faComment}
                      />

                      {props.comments ? (
                        props.comments.length > 1 ? (
                          <p className="d-inline">
                            {props.comments.length - 1}
                          </p>
                        ) : null
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-4">
                <div className="d-inline float-right ">
                  {props.numberOfShares > 0 ? (
                    <FontAwesomeIcon
                      className="mr-2"
                      onClick={props.shareTracker}
                      icon={faShare}
                      style={{ color: "#dc3545" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="mr-2"
                      onClick={props.shareTracker}
                      icon={faShare}
                    />
                  )}

                  <p className="d-inline text-muted ">{props.numberOfShares}</p>
                </div>
              </div>
            </div>
            <hr className="items" />
            {props.isComment ? (
              <div className="d-flex flex-row pt-4">
                <div className="input-group rounded-corners">
                  <textarea
                    type="text"
                    cols=" 50"
                    row="1"
                    className="form-control rounded-corners"
                    placeholder="Say Something"
                    value={props.comment.comment}
                    onChange={props.commentChangeHandler}
                    style={{ minheight: "45px" }}
                    wrap="off"
                  ></textarea>
                  <div className="input-group-append rouned-corners ">
                    <div className="input-group-text rounded-corners  bg-white">
                      <button
                        onClick={props.submitCommentHandler}
                        className="btn btn-sm btn-outline-primary"
                        disabled={!props.comment}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {props.comments
              ? props.comments
                  .slice(1)
                  .reverse()
                  .map((i, index) => {
                    console.log(i);
                    return (
                      <div
                        className="d-flex flex-row pt-2 "
                        key={index}
                        // onClick={props.getProfile}
                        onClick={() =>
                          props.getSelectedUserDetail(i.userId, props.history)
                        }
                      >
                        <div className="col-lg-2">
                          <img
                            src={i.profilePic}
                            height="50"
                            width="50"
                            className="image-fluid rounded-circle"
                          />
                        </div>

                        <div className="card text-justify bg-light rounded-corners p-4">
                          <h6 className="font-weight-bold">{i.name}</h6>

                          <p>{i.comment}</p>
                        </div>
                      </div>
                    );
                  })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default postDisplay;
