import React from "react";
import { store } from "../../index";
const profilePhotosCollection = (props) => {
  //   let storage = store.getState().thoughts.posts;
  //   console.log(storage);
  console.log(props.posts);
  let myPosts = [...props.posts];

  return myPosts.reverse().map((i, index) => {
    console.log(i);
    if (i.image) {
      return (
        <div key={index}>
          <img
            src={i.image}
            alt=""
            className="img-fluid"
            // height="150"
            // width="150"
          />
        </div>
      );
    } else {
      return null;
    }
  });
};
export default profilePhotosCollection;
