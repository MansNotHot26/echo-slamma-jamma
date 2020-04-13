import React, { useState } from "react";
import { Alert } from "reactstrap";
const Modal = () => {
  const [visible, setVisible] = useState(true);

  const toggle = () => {
    setVisible(prevState => !prevState);
  };
  return (
    <Alert color="danger" isOpen={visible} toggle={toggle}>
      Error ! Please reupload the image with a dimension of 1024 x 1024{" "}
    </Alert>
  );
};

export default Modal;
