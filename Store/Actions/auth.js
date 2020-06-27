import fire from "../../Firebase/Fire";
import * as actionTypes from "./actionTypes";
import alxios from "../../axios-post/axios-post";
import { store } from "../../index";
import { storage } from "firebase";
import axios from "axios";
import { loadPost } from "../Actions/sharedThoughts";

let apiKey = "AIzaSyBZbX7vOt9hgc6jJ0JSw00pJDuQXXQJzpw";
export const signUp = (email, password, e) => {
  return (dispatch) => {
    let email = store.getState().auth.signUpData.signUpEmail;
    let password = store.getState().auth.signUpData.signUpPassword;
    console.log(store.getState());
    console.log(email);
    console.log(password);

    dispatch(signUpStart());
    let payLoad = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          apiKey,
        payLoad
      )
      .then((res) => {
        console.log(res);
        dispatch(signUpSuccess(res.data.idToken, res.data.localId));
        dispatch(addingUser(res.data.localId));
      })
      .catch((res) => {
        console.log(res);
        dispatch(signUpFailed());
      });
  };
};

export const addingUser = (uid) => {
  return (dispatch) => {
    let signUpData = store.getState().auth.signUpData;
    console.log(signUpData);

    fire
      .database()
      .ref("Users/" + uid)
      .push(signUpData)
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  };
};

export const firstNameChangedHandler = (e) => {
  e.persist();
  console.log(e);
  return {
    type: actionTypes.FIRST_NAME_CHANGED_HANDLER,
    e: e,
  };
};
export const lastNameChangedHandler = (e) => {
  e.persist();
  console.log(e.target.value);
  return {
    type: actionTypes.LAST_NAME_CHANGED_HANDLER,
    e: e,
  };
};
export const genderChangedHandler = (e) => {
  e.persist();

  let storage = store.getState().auth.signUpData;
  console.log(storage);
  return {
    type: actionTypes.GENDER_CHANGED_HANDLER,
    e: e,
  };
};
export const signUpEmailChangedHandler = (e) => {
  e.persist();
  console.log(e.target.value);
  return {
    type: actionTypes.SIGN_UP_EMAIL_CHANGED_HANDLER,
    e: e,
  };
};
export const signUpPasswordChangedHandler = (e) => {
  e.persist();
  console.log(e.target.value);
  return {
    type: actionTypes.SIGN_UP_PASSWORD_CHANGED_HANDLER,
    e: e,
  };
};
export const DOBChangedHandler = (e) => {
  e.persist();
  console.log(e.target.value);
  return {
    type: actionTypes.DOB_CHANGED_HANDLER,
    e: e,
  };
};

export const signUpStart = () => {
  return {
    type: actionTypes.SIGN_UP_START,
  };
};
export const signUpSuccess = (tokenId, localId) => {
  let profilePic = "";
  if (store.getState().auth.signUpData.gender == "male") {
    profilePic =
      "https://firebasestorage.googleapis.com/v0/b/socialapp-6449c.appspot.com/o/male.jpg?alt=media&token=23603844-2899-4b7a-a38d-0157f2291d77";
  } else if (store.getState().auth.signUpData.gender == "female") {
    profilePic =
      "https://firebasestorage.googleapis.com/v0/b/socialapp-6449c.appspot.com/o/female.jpg?alt=media&token=1132f6e5-27f8-4dc0-bcf5-62cacd4f5afe";
  }
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
    localId: localId,
    tokenId: tokenId,
    profilePic: profilePic,
  };
};
export const signUpFailed = () => {
  return {
    type: actionTypes.SIGN_UP_FAILED,
  };
};
export const signIn = (e, history) => {
  // e.persist();
  e.preventDefault();
  console.log(history);
  return (dispatch) => {
    dispatch(signInStart());
    let email = store.getState().auth.email;
    let password = store.getState().auth.password;

    let payLoad = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    console.log(payLoad);
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          apiKey,
        payLoad
      )
      .then((res) => {
        let idToken = res.data.idToken;
        let localId = res.data.localId;
        dispatch(signInSuccess(idToken, localId));
        dispatch(loadPost());
        dispatch(getUserDetail(history));

        console.log(res);
      })
      .catch((res) => {
        console.log(res);
        dispatch(signUpFailed());
      });
  };
};
export const getUserDetail = (history) => {
  let user = {};
  return (dispatch) => {
    axios
      .get("https://socialapp-6449c.firebaseio.com/Users.json")
      .then((res) => {
        let userId = store.getState().auth.userId;
        console.log(userId);

        console.log(userId);
        Object.keys(res.data).map((i) => {
          if (i == userId) {
            console.log("same");

            Object.keys(res.data[i]).map((j) => {
              console.log(j);
              user = { ...res.data[i][j] };
              console.log(user);
              return user;
            });
          }
        });
        console.log(user);
        dispatch(updateUserIO(user));
        history.push("/");
      })
      .catch((res) => {
        console.log(res);
      });
  };
};
export const updateUserIO = (updatedUser) => {
  return {
    type: actionTypes.UPDATE_USER_IO,
    updatedUser: updatedUser,
  };
};

export const signInStart = () => {
  return {
    type: actionTypes.SIGN_IN_START,
  };
};
export const signInSuccess = (tokenId, localId) => {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    tokenId: tokenId,
    localId: localId,
  };
};
export const signInFailed = () => {
  return {
    type: actionTypes.SIGN_IN_FAILED,
  };
};

export const emailChangedHandler = (e) => {
  e.persist();
  return {
    type: actionTypes.EMAIL_CHANGED,
    e: e,
  };
};
export const passwordChangedHandler = (e) => {
  e.persist();
  return {
    type: actionTypes.PASSWORD_CHANGED,
    e: e,
  };
};

export const logOut = (history) => {
  console.log(history);
  history.push("/login");

  return {
    type: actionTypes.LOG_OUT,
  };
};

export const changeProfilePic = (e) => {
  let file = e.target.files[0];
  return (dispatch) => {
    console.log(e.target.files[0]);
    let galleryRef = fire.storage().ref();
    galleryRef
      .child(file.name)
      .put(file)
      .then((snapshot) => {
        galleryRef
          .child(file.name)
          .getDownloadURL()
          .then((snapshot) => {
            axios
              .get("https://socialapp-6449c.firebaseio.com/Users.json")
              .then((res) => {
                let userId = store.getState().auth.userId;
                Object.keys(res.data).map((i) => {
                  if (i == userId) {
                    console.log("ab kro is main change");
                    Object.keys(res.data[i]).map((j) => {
                      console.log(j);
                      let updates = {};
                      updates[
                        "/Users/" + userId + "/" + j + "/profilePic"
                      ] = snapshot;
                      fire
                        .database()
                        .ref()
                        .update(updates)
                        .then((res) => {
                          dispatch(saveProfilePicSuccess(snapshot));
                        })
                        .catch((res) => {
                          console.log("failed");
                        });
                    });
                  }
                });
              });
          });
      })
      .catch((snapshot) => {
        dispatch(saveProfilePicFail());
      });
  };
};

export const changeCoverPic = (e) => {
  let file = e.target.files[0];
  return (dispatch) => {
    console.log(e.target.files[0]);
    let galleryRef = fire.storage().ref();
    galleryRef
      .child(file.name)
      .put(file)
      .then((snapshot) => {
        galleryRef
          .child(file.name)
          .getDownloadURL()
          .then((snapshot) => {
            axios
              .get("https://socialapp-6449c.firebaseio.com/Users.json")
              .then((res) => {
                let userId = store.getState().auth.userId;
                Object.keys(res.data).map((i) => {
                  if (i == userId) {
                    console.log("ab kro is main change");
                    Object.keys(res.data[i]).map((j) => {
                      console.log(j);
                      let updates = {};
                      updates[
                        "/Users/" + userId + "/" + j + "/coverPic"
                      ] = snapshot;
                      fire
                        .database()
                        .ref()
                        .update(updates)
                        .then((res) => {
                          dispatch(saveCoverPicSuccess(snapshot));
                        })
                        .catch((res) => {
                          console.log("failed");
                        });
                    });
                  }
                });
              })
              .catch((snapshot) => {
                dispatch(saveCoverPicFail());
              });
          });
      });
  };
};

export const getSelectedUserDetail = (id, history) => {
  let selectedUser = "";
  return (dispatch) => {
    axios
      .get("https://socialapp-6449c.firebaseio.com/Users.json")
      .then((res) => {
        console.log(res);
        Object.keys(res.data).map((i) => {
          if (i == id) {
            console.log(i);
            Object.keys(res.data[i]).map((j) => {
              selectedUser = res.data[i][j];
              selectedUser.userId = i;
              console.log(selectedUser);
            });
          }
        });
        dispatch(successGetSelectedUserDetail(selectedUser));
        history.push("/profile");
      })
      .catch((res) => {
        console.log(res);
      });
  };
};

export const setFollower = () => {
  return (dispatch) => {
    let logedInUserFriends = store.getState().auth.friends.following;
    let logInUserId = store.getState().auth.userId;
    let stalkedUserId = store.getState().auth.signUpData.userId;
    let stalkedUserData = store.getState().auth.signUpData;
    let follow = stalkedUserData.friends.follow.push(logInUserId);

    // stalkedUserData.friends.following.push(logInUserId);
    logedInUserFriends.push(stalkedUserId);
    console.log(stalkedUserData);
    axios
      .get("https://socialapp-6449c.firebaseio.com/Users.json")
      .then((res) => {
        Object.keys(res.data).map((i) => {
          if (i == stalkedUserId) {
            Object.keys(res.data[i]).map((j) => {
              console.log(res.data[i][j]);
              let updates = {};
              updates["/Users/" + i + "/" + j + "/friends/follow"] = follow;
              fire
                .database()
                .ref()
                .update(updates)
                .then((res) => {
                  console.log(res);
                })
                .catch((res) => {
                  console.log(res);
                });
            });
          }
        });
      });

    // let updates = {};
    // updates["/Users/" + userId + "/" + j + "/profilePic"] = snapshot;
    // fire
    //   .database()
    //   .ref()
    //   .update(updates)
    //   .then((res) => {
    //     dispatch(saveProfilePicSuccess(snapshot));

    dispatch(setFollowerSuccess(stalkedUserData));

    // stalkedUserData.currentFollower = logInUserId;
    // stalkedUserData.friends.following.push(stalkedUserData.currentFollower);
    // stalkedUserData.friends.folllowing.find(i=>{

    // })
    // let updates = {};
    // updates["/Users/" + logInUserId] = stalkedUserData;
    // fire
    //   .database()
    //   .ref()
    //   .update(updates)
    //   .then((res) => {
    //     console.log(res);
    //     // dispatch(setFollowerSuccess(stalkedUserData));
    //   })
    //   .catch((res) => {
    //     console.log(res);
    //   });
  };
};
export const setFollowerSuccess = (stalkedUserData) => {
  return {
    type: actionTypes.SET_FOLLOWER_SUCCESS,
    stalkedUserData: stalkedUserData,
  };
};

export const successGetSelectedUserDetail = (selectedUser) => {
  return {
    type: actionTypes.SUCCESS_GET_SELECTED_USER_DETAIL,
    selectedUser: selectedUser,
  };
};

export const saveProfilePicSuccess = (url) => {
  return {
    type: actionTypes.SAVE_PROFILE_PIC_SUCCESS,
    url: url,
  };
};
export const saveProfilePicFail = () => {
  return {
    type: actionTypes.SAVE_PROFILE_PIC_FAIL,
  };
};
export const saveCoverPicSuccess = (url) => {
  return {
    type: actionTypes.SAVE_COVER_PIC_SUCCESS,
    url: url,
  };
};
export const saveCoverPicFail = () => {
  return {
    type: actionTypes.SAVE_COVER_PIC_FAIL,
  };
};
