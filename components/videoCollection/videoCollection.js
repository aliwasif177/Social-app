import React from "react";
const videoCollection = (props) => {
  let myPosts = [...props.posts];

  return myPosts.map((i, index) => {
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
