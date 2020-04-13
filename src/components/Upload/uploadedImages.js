import React from "react";
import "./UploadedImages.css";

const UploadedImages = props => {
  return props.url.map((item, index) => {
    return (
      <div className="uploadContainer" key={index}>
        <img className="uploadedImages" alt="uploadedImage" src={item} />
      </div>
    );
  });
};

export default UploadedImages;
