import * as actionTypes from "../Actions/actionTypes";
import { updateObject } from "../Utility";
const initialState = {
  signUpData: {
    signUpEmail: "",
    signUpPassword: "",
    gender: "",
    firstName: "",
    lastName: "",
    DOB: "",
    profilePic: "",
    coverPic: "",
    userId: "",
    friends: {
      follow: ["bnda"],
      following: ["bnda"],
    },
  },
  friends: {
    follow: ["bnda"],
    following: ["bnda"],
  },
  email: "",
  password: "",
  tokenId: null,
  userId: null,
  loading: false,
  error: null,
  profilePicIsLoading: false,
  coverPicIsLoading: false,
};
const Auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_UP_START:
      console.log("Sign");
      return updateObject(state, {
        loading: true,
        error: false,
      });
      break;
    case actionTypes.SIGN_UP_SUCCESS:
      return updateObject(state, {
        userId: action.localId,
        tokenId: action.tokenId,
        loading: false,
        error: false,
        signUpData: {
          ...state.signUpData,
          profilePic: action.profilePic,
        },
      });
      break;
    case actionTypes.SET_FOLLOWER_SUCCESS:
      return updateObject(state, {
        signUpData: action.stalkedUserData,
      });
      break;
    case actionTypes.SIGN_UP_FAILED:
      return updateObject(state, { loading: false, error: true });
      break;
    case actionTypes.SUCCESS_GET_SELECTED_USER_DETAIL:
      return updateObject(state, {
        signUpData: action.selectedUser,
      });
      break;
    case actionTypes.SIGN_IN_START:
      return updateObject(state, { loading: true, error: false });
      break;
    case actionTypes.SIGN_IN_SUCCESS:
      return updateObject(state, {
        userId: action.localId,
        tokenId: action.tokenId,
        error: false,
        loading: false,
      });
      break;
    case actionTypes.SIGN_IN_FAILED:
      return updateObject(state, { loading: false, error: true });
      break;
    case actionTypes.EMAIL_CHANGED:
      return updateObject(state, { email: action.e.target.value });

      break;
    case actionTypes.PASSWORD_CHANGED:
      return updateObject(state, { password: action.e.target.value });
      break;
    case actionTypes.LOG_OUT:
      return updateObject(state, {
        signUpData: {
          signUpEmail: "",
          signUpPassword: "",
          gender: "",
          firstName: "",
          lastName: "",
          DOB: "",
          profilePic: "",
          coverPic: "",
        },
        email: "",
        password: "",
        tokenId: null,
        userId: null,
        loading: false,
        error: null,
      });
      break;

    case actionTypes.FIRST_NAME_CHANGED_HANDLER:
      return updateObject(state, {
        signUpData: {
          ...state.signUpData,
          firstName: action.e.target.value,
        },
      });
      break;
    case actionTypes.LAST_NAME_CHANGED_HANDLER:
      return updateObject(state, {
        signUpData: {
          ...state.signUpData,
          lastName: action.e.target.value,
        },
      });
      break;
    case actionTypes.SIGN_UP_EMAIL_CHANGED_HANDLER:
      return updateObject(state, {
        signUpData: {
          ...state.signUpData,
          signUpEmail: action.e.target.value,
        },
      });
      break;
    case actionTypes.SIGN_UP_PASSWORD_CHANGED_HANDLER:
      return updateObject(state, {
        signUpData: {
          ...state.signUpData,
          signUpPassword: action.e.target.value,
        },
      });
      break;
    case actionTypes.DOB_CHANGED_HANDLER:
      return updateObject(state, {
        signUpData: {
          ...state.signUpData,
          DOB: action.e.target.value,
        },
      });
      break;
    case actionTypes.GENDER_CHANGED_HANDLER:
      return updateObject(state, {
        signUpData: {
          ...state.signUpData,
          gender: action.e.target.value,
        },
      });
      break;
    case actionTypes.SAVE_COVER_PIC_FAIL:
      break;
    case actionTypes.SAVE_COVER_PIC_SUCCESS:
      return updateObject(state, {
        signUpData: {
          ...state.signUpData,
          coverPic: action.url,
        },
      });
      break;
    case actionTypes.INITIAl_PROFILE_PIC_UPLOADING:
      return updateObject(state, {
        profilePicIsLoading: true,
        signUpData: {
          ...state.signUpData,
          profilePic: action.profilePic,
        },
      });
      break;
    case actionTypes.SAVE_PROFILE_PIC_SUCCESS:
      return updateObject(state, {
        profilePicIsLoading: false,
        signUpData: {
          ...state.signUpData,
          profilePic: action.url,
        },
      });
      break;
    case actionTypes.SAVE_PROFILE_PIC_FAIL:
      break;
    case actionTypes.UPDATE_USER_IO:
      return updateObject(state, {
        signUpData: { ...action.updatedUser },
      });
      break;

    default:
      return state;
  }
};

export default Auth;
