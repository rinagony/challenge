import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { useState } from "react";

function UploadElement() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button onClick={handleShow}>
        <FontAwesomeIcon
          style={{ fontSize: "30px", marginRight: "10px" }}
          icon={faUpload}
        />
        Upload image
      </button>
      {show ? <Modal onHide={handleClose} /> : null}
    </>
  );
}

export default UploadElement;
