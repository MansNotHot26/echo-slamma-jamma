import React, { useState } from "react";
import { storage } from "../../firebase/index";
// import { BrowserRouter as Router, Link, Switch } from "react-router-dom";
import UploadImage from "../Upload/uploadedImages";
// import Route from "react-router-dom/Route";
import Modal from "../Modal/Modal";
import "./Home.css";

const Home = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState([]);
  const [progress, setProgress] = useState(0);
  const [modal, setModal] = useState(null);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setProgress(0);
    }
  };

  const handleUpload = () => {
    if (image) {
      setUrl([]);
      setModal(null);

      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function(e) {
        const newImage = new Image();
        const newImage1 = new Image();
        newImage1.name = "horizontal";
        const newImage2 = new Image();
        newImage2.name = "vertical";

        const newImage3 = new Image();
        newImage3.name = "small";

        const newImage4 = new Image();
        newImage4.name = "gallery";

        newImage.src = e.target.result;
        newImage.onload = function() {
          const height = this.height;
          const width = this.width;
          const convertedImages = [];
          console.log(height);
          console.log(width);
          if (height === 1024 && width === 1024) {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = 755;
            canvas.height = 450;
            context.drawImage(
              newImage,
              0,
              0,
              newImage.width,
              newImage.height,
              0,
              0,
              canvas.width,
              canvas.height
            );
            newImage1.src = canvas.toDataURL();
            canvas.width = 365;
            canvas.height = 450;
            context.drawImage(
              newImage,
              0,
              0,
              newImage.width,
              newImage.height,
              0,
              0,
              canvas.width,
              canvas.height
            );
            newImage2.src = canvas.toDataURL();
            canvas.width = 365;
            canvas.height = 212;
            context.drawImage(
              newImage,
              0,
              0,
              newImage.width,
              newImage.height,
              0,
              0,
              canvas.width,
              canvas.height
            );
            newImage3.src = canvas.toDataURL();
            canvas.width = 380;
            canvas.height = 380;
            context.drawImage(
              newImage,
              0,
              0,
              newImage.width,
              newImage.height,
              0,
              0,
              canvas.width,
              canvas.height
            );
            newImage4.src = canvas.toDataURL();
            convertedImages.push(newImage1);
            convertedImages.push(newImage2);
            convertedImages.push(newImage3);
            convertedImages.push(newImage4);

            const newConvertImages = convertedImages.map(element => {
              return dataURLtoFile(element.src, element.name);
            });

            newConvertImages.forEach(element => {
              const uploadImage = storage
                .ref(`images/${element.name}`)
                .put(element);
              uploadImage.on(
                "state_changed",
                snapshot => {
                  const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  setProgress(progress);
                },
                error => {
                  console.log(error);
                },
                () => {
                  storage
                    .ref("images")
                    .child(element.name)
                    .getDownloadURL()
                    .then(urls => {
                      setUrl(url => [...url, urls]);
                    });
                }
              );
            });
          } else {
            setModal(<Modal />);
          }
        };
      };
    }
  };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  return (
    <div className="homeContainer">
      <div className="parentContainer">
        <div className="progressContainer">
          <label className="progressLabel">Progress </label>{" "}
          <progress value={progress} max="100" />
        </div>
        <div className="uploadContainer">
          <input type="file" className="inputFile" onChange={handleChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      </div>
      <div>{modal}</div>
      {progress === 100 ? (
        <div className="imageContainer">
          <UploadImage url={url} />
        </div>
      ) : null}
    </div>
  );
};

export default Home;
