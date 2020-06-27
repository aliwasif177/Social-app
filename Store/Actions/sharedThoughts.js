import * as actionTypes from "./actionTypes";
import axios from "../../axios-post/axios-post";
import fire from "../../Firebase/Fire";
import { store } from "../../index";
import Axios from "axios";
export const loadPost = () => {
  let fireBasePost = [];
  return (dispatch) => {
    dispatch(loadingPostStart());

    let userId = store.getState().auth.userId;

    let loadPostRef = fire.database().ref("Posts");

    loadPostRef.once("value").then((snapshot) => {
      let im = snapshot.val();
      if (im) {
        Object.keys(im).map((i) => {
          im[i].key = i;
          fireBasePost.push(im[i]);
        });
      }

      dispatch(loadPostSuccess(fireBasePost));
    });
  };
};
export const loadingPostStart = () => {
  return {
    type: actionTypes.LOAD_POSTS_START,
  };
};

export const givingUid = () => {
  let uid = store.getState().auth.userId;
  let profilePic = store.getState().auth.signUpData.profilePic;

  let publishDate = new Date();
  publishDate = publishDate.toString().slice(4, 25);

  return {
    type: actionTypes.GIVING_UID,
    uid: uid,
    profilePic: profilePic,
    publishDate: publishDate,
  };
};
export const loadPostFailed = () => {
  return {
    type: actionTypes.LOAD_POSTS_FAILED,
  };
};
export const loadPostSuccess = (loadedPosts) => {
  return {
    type: actionTypes.LOAD_POSTS_SUCCESS,
    loadedPosts: loadedPosts,
  };
};

export const imageUploadHandler = (e) => {
  e.persist();
  return {
    type: actionTypes.IMAGE_UPLOAD,
    e: e,
  };
};
export const videoUploadHandler = (e) => {
  e.persist();
  return {
    type: actionTypes.VIDEO_UPLOAD,
    e: e,
  };
};
export const addPost = () => {
  return (dispatch) => {
    let storage = store.getState();

    if (storage.thoughts.post.video) {
      let galleryRef = fire.storage().ref();
      galleryRef
        .child(storage.thoughts.post.video.name)
        .put(storage.thoughts.post.video)
        .then((snapshot) => {
          galleryRef
            .child(storage.thoughts.post.video.name)
            .getDownloadURL()
            .then((snapshot) => {
              dispatch(saveVideoLink(snapshot));
              dispatch(submitting());
            });
        });
    } else if (storage.thoughts.post.image) {
      let galleryRef = fire.storage().ref();
      galleryRef
        .child(storage.thoughts.post.image.name)
        .put(storage.thoughts.post.image)
        .then((snapshot) => {
          galleryRef
            .child(storage.thoughts.post.image.name)
            .getDownloadURL()
            .then((snapshot) => {
              dispatch(saveImageLink(snapshot));
              dispatch(submitting());
            });
        });
    } else if (!storage.thoughts.post.image && !storage.thoughts.post.image) {
      dispatch(submitting());
    }
  };
};

export const givingAuthorName = (firstName, lastName) => {
  return {
    type: actionTypes.GIVING_AUTHOR_NAME_TO_POST,
    firstName: firstName,
    lastName: lastName,
  };
};

export const submitting = () => {
  let userPost = [];
  return (dispatch) => {
    dispatch(givingUid());

    console.log(store.getState().auth.signUpData.firstName);
    let firstName = store.getState().auth.signUpData.firstName;
    let lastName = store.getState().auth.signUpData.lastName;
    dispatch(givingAuthorName(firstName, lastName));
    let storage = store.getState();
    let myThoughts = { ...store.getState().thoughts.post };
    myThoughts.isComment = false;
    myThoughts.likes = [];
    myThoughts.currentlike = {
      userId: "",
      name: "",
    };

    let postSubmitRef = fire
      .database()
      .ref("Posts")
      .push(store.getState().thoughts.post);
    postSubmitRef.once("value").then((snapshot) => {
      myThoughts.key = snapshot.key;
      console.log(myThoughts);
      userPost.push(myThoughts);
      console.log(userPost);
      let resetThoughts = { ...store.getState().thoughts.post };
      resetThoughts.text = "";
      resetThoughts.image = "";
      resetThoughts.video = "";
      resetThoughts.isComment = false;
      resetThoughts.comments = ["mycomments"];
      dispatch(addPostSuccess(userPost, resetThoughts));
    });
  };
};

export const saveVideoLink = (link) => {
  return {
    type: actionTypes.VIDEO_LINK,
    link: link,
  };
};

export const saveImageLink = (link) => {
  return {
    type: actionTypes.IMAGE_LINK,
    link: link,
  };
};
export const addPostFailed = () => {};
export const addPostSuccess = (userPost, resetThoughts) => {
  return {
    type: actionTypes.ADD_POST_SUCCESS,
    userPost: userPost,
    resetThoughts: resetThoughts,
  };
};
export const textChangedHandler = (e) => {
  e.persist();
  return {
    type: actionTypes.TEXT_CHANGED_HANDLER,
    e: e,
  };
};

export const trackComments = (i) => {
  return {};
};
export const trackShares = (i) => {
  return {};
};
export const trackLikes = (i) => {
  let userId = store.getState().auth.userId;
  console.log(userId);
  let name =
    store.getState().auth.signUpData.firstName +
    " " +
    store.getState().auth.signUpData.lastName;
  console.log(i);

  return (dispatch) => {
    let found = i.likes.find((post) => {
      if (post.userId == userId) return true;
    });
    console.log(userId);
    if (!found) {
      console.log(userId);
      i.currentlike.userId = userId;
      i.currentlike.name = name;
      i.likes.push(i.currentlike);
      let updates = {};
      updates["/Posts/" + i.key + "/likes"] = i.likes;
      fire
        .database()
        .ref()
        .update(updates)
        .then((res) => {
          dispatch(likesAdded(userId, name));
        })
        .catch((res) => {
          console.log("likes failed");
        });
    } else {
      // console.log(userId);
      // i.currentlike.userId = userId
      // i.currentlike.name = name;
      // i.likes.push(i.currentlike);

      i.likes = i.likes.filter((post) => {
        return post.userId != userId;
      });

      let updates = {};
      updates["/Posts/" + i.key + "/likes"] = i.likes;
      fire
        .database()
        .ref()
        .update(updates)
        .then((res) => {
          dispatch(likesRemoved(userId, name));
        })
        .catch((res) => {
          console.log("likes failed");
        });
    }
  };
};
export const likesRemoved = (userId, name) => {
  return {
    type: actionTypes.LIKE_REMOVED,
    name: name,
    userId: userId,
  };
};

export const likesAdded = (userId, name) => {
  return {
    type: actionTypes.LIKE_ADDED,
    name: name,
    userId: userId,
  };
};
export const commentChangedHandler = (e, i) => {
  e.persist();
  i.currentComment = e.target.value;
};
export const submitComment = (i) => {
  let storage = store.getState();
  return (dispatch) => {
    i.isComment = false;

    i.comments.push(i.currentComment);
    let updates = {};
    updates["/Posts/" + i.key + "/comments"] = i.comments;
    fire.database().ref().update(updates);
    dispatch(commentSubmitted(i));
    i.currentComment = {};
    dispatch(commentSubmitConfirm());
  };
};
export const commentSubmitConfirm = () => {
  return {
    type: actionTypes.COMMENT_SUBMIT_CONFIRM,
  };
};
export const commentSubmitted = () => {
  return {
    type: actionTypes.COMMENT_SUBMIT,
  };
};
