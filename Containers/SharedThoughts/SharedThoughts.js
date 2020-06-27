import React, { Component } from "react";

import PostDisplay from "../../Containers/Postdisplay/Postdisplay";
import "./SharedThoughts.css";
class sharedThoughts extends Component {
  render() {
    console.log(this.props.currentlike);
    return (
      <PostDisplay
        image={this.props.image}
        video={this.props.video}
        text={this.props.text}
        numberOfComments={this.props.numberOfComments}
        numberOfShares={this.props.numberOfShares}
        likesTracker={this.props.likesTracker}
        commentsTracker={this.props.commentsTracker}
        shareTracker={this.props.shareTracker}
        commentChangeHandler={(e) => this.props.commentChangeHandler(e)}
        submitCommentHandler={this.props.submitCommentHandler}
        comments={this.props.comments}
        isComment={this.props.isComment}
        comment={this.props.comment}
        authorProfilePic={this.props.authorProfilePic}
        publishDate={this.props.publishDate}
        firstName={this.props.firstName}
        lastName={this.props.lastName}
        trackLikes={this.props.trackLikes}
        likes={this.props.likes}
        currentlike={this.props.currentlike}
        // getProfile={this.props.getProfile}
        getSelectedUserDetail={this.props.getSelectedUserDetail}
        history={this.props.history}
      />
    );
  }
}

export default sharedThoughts;
