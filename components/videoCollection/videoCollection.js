import React from "react";
import { store } from "../../index";
const videoCollection = (props) => {
  let myPosts = [...props.posts];

  return myPosts.map((i, index) => {
    console.log(i);
    if (i.video) {
      return (
        <div key={index}>
          <iframe
            src={i.video}
            alt=""
            className="img-fluid "
            height="20"
            width="100"
          />
        </div>
      );
    } else {
      return null;
    }
  });
};
export default videoCollection;
