import * as actionTypes from "../Actions/actionTypes";
import { updateObject } from "../Utility";
const initialState = {
  post: {
    text: "",
    image: "",
    video: "",
    likes: [],
    currentComment: {
      comment: "",
      profilePic: "",
      userId: "",
      name: "",
    },
    currentlike: {
      userId: "",
      name: "",
    },
    authorFirstName: "",
    authorLastName: "",
    key: "",
    isComment: false,
    likes: ["mylikes"],
    comments: ["mycomments"],
    uid: "",
    authorProfilePic: "",
    publishDate: "",
  },
  loading: false,

  submitted: false,
  posts: [],
  changing: false,
};
const sharedThoughts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOG_OUT:
      return updateObject(state, {
        post: {
          text: "",
          image: "",
          video: "",
          likes: [],
          currentComment: {
            comment: "",
            profilePic: "",
            userId: "",
            name: "",
          },
          currentlike: {
            userId: "",
            name: "",
          },
          likes: ["mylikes"],

          key: "",
          isComment: false,
          comments: ["mycomments"],
          uid: "",
          authorProfilePic: "",
        },
        loading: false,

        submitted: false,
        posts: [],
        changing: false,
      });
      break;
    case actionTypes.LOAD_POSTS_START:
      console.log(action.loadedPosts);
      return updateObject(state, { loading: true });
      break;
    case actionTypes.LOAD_POSTS_SUCCESS:
      console.log(action.loadedPosts);

      return updateObject(state, {
        loading: false,
        posts: state.posts.concat(action.loadedPosts),
      });
      break;
    case actionTypes.TEXT_CHANGED_HANDLER:
      return updateObject(state, {
        post: {
          ...state.post,
          text: action.e.target.value,
        },
      });
      break;
    case actionTypes.IMAGE_UPLOAD:
      return updateObject(state, {
        post: {
          ...state.post,
          image: action.e.target.files[0],
        },
      });
      break;
    case actionTypes.GIVING_AUTHOR_NAME_TO_POST:
      return updateObject(state, {
        post: {
          ...state.post,
          authorFirstName: action.firstName,
          authorLastName: action.lastName,
        },
      });
      break;
    case actionTypes.VIDEO_UPLOAD:
      return updateObject(state, {
        post: {
          ...state.post,
          video: action.e.target.files[0],
        },
      });
      break;
    case actionTypes.ADD_POST_SUCCESS:
      return updateObject(state, {
        posts: state.posts.concat(action.userPost),
        post: { ...action.resetThoughts },
      });
      break;
    case actionTypes.VIDEO_LINK:
      console.log(action.link);
      return updateObject(state, {
        post: {
          ...state.post,
          video: action.link,
        },
      });
      break;
    case actionTypes.IMAGE_LINK:
      return updateObject(state, {
        post: {
          ...state.post,
          image: action.link,
        },
      });
      break;
    case actionTypes.COMMENT_SUBMIT:
      return (
        state,
        {
          changing: true,
          posts: state.posts,
          post: {
            ...state.post,
          },
        }
      );
      break;
    case actionTypes.GIVING_UID:
      console.log(action.uid);
      return updateObject(state, {
        post: {
          ...state.post,
          uid: action.uid,
          authorProfilePic: action.profilePic,
          publishDate: action.publishDate,
        },
      });
    case actionTypes.LIKE_ADDED:
      return updateObject(state, {
        post: {
          ...state.post,
          currentlike: {
            userId: "liked",
            name: "liked",
          },
        },
      });
      break;
    case actionTypes.COMMENT_SUBMIT_CONFIRM:
      return updateObject(state, {
        changing: false,
        post: {
          ...state.posts,
        },
      });
      break;
    case actionTypes.LIKE_REMOVED:
      return updateObject(state, {
        post: {
          ...state.post,
          currentlike: {
            userId: "unliked",
            name: "unliked",
          },
        },
      });
      break;

    default:
      return state;
  }
};
export default sharedThoughts;
