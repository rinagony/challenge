import classes from "./GridViewer.module.css";
import { useState, useContext } from "react";
import ModalFile from "./elements/ModalFile";
import Loader from "./elements/Loader";
import { FilesContext } from "../FilesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAudio } from "@fortawesome/free-solid-svg-icons";
import { faFileVideo } from "@fortawesome/free-solid-svg-icons";

function GridViewer() {
  let [openModal, setOpenModal] = useState(false);
  let [itemFile, setItemFile] = useState("");
  const { searchTerm } = useContext(FilesContext);
  const { files } = useContext(FilesContext);

  const handleClose = () => setOpenModal(false);
  const handleShow = (item) => {
    setItemFile(item);
    setOpenModal(true);
  };

  if (!files) {
    return <Loader />;
  }

  return (
    <section className={classes.wrapper}>
      {files &&
        files.length > 0 &&
        files
          .filter((val) => {
            if (searchTerm == "") {
              return val;
            } else if (searchTerm == "image") {
              if (val.type.includes("image")) {
                return val;
              }
            } else if (searchTerm == "video") {
              if (val.type.includes("video")) {
                return val;
              }
            } else if (searchTerm == "audio") {
              if (val.type.includes("audio")) {
                return val;
              }
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .reverse()
          .map((item) => {
            if (item.type.match("image.*"))
              return (
                <div
                  className={classes.fileImageWrapper}
                  key={item.id}
                  onClick={() => handleShow(item)}
                  style={{
                    background: `linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(${item.url})`,
                    backgroundSize: "cover",
                  }}
                ></div>
              );
            else if (item.type.match("video*"))
              return (
                <div
                  key={item.id}
                  className={classes.fileWrapper}
                  onClick={() => handleShow(item)}
                >
                  <FontAwesomeIcon icon={faFileVideo} />
                </div>
              );
            else if (item.type.match("audio.*"))
              return (
                <div
                  key={item.id}
                  className={classes.fileWrapper}
                  onClick={() => handleShow(item)}
                >
                  <FontAwesomeIcon icon={faFileAudio} />
                </div>
              );
          })}

      {openModal ? (
        <ModalFile onHide={handleClose} itemFile={itemFile} />
      ) : null}
    </section>
  );
}

export default GridViewer;
