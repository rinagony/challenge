import classes from "./ListViewer.module.css";
import { useState, useContext } from "react";
import Loader from "./elements/Loader";
import ModalFile from "./elements/ModalFile";
import DownloadButton from "./DownloadButton";
import { FilesContext } from "../FilesContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { faFileVideo } from "@fortawesome/free-solid-svg-icons";
import { faFileAudio } from "@fortawesome/free-solid-svg-icons";

function ListViewer(props) {
  let [openModal, setOpenModal] = useState(false);
  let [itemFile, setItemFile] = useState("");
  const { searchTerm } = useContext(FilesContext);
  const { files } = useContext(FilesContext);

  const handleClose = () => setOpenModal(false);
  const handleShow = (item) => {
    setItemFile(item);
    setOpenModal(true);
  };

  if (!props.files) {
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
          .map((item) => {
            if (item.type.match("image.*"))
              return (
                <div className={classes.fileWrapper} key={item.id}>
                  <div
                    className={classes.wrapperTitle}
                    onClick={() => handleShow(item)}
                  >
                    <FontAwesomeIcon className={classes.icon} icon={faImages} />
                    <p>{item.name}</p>
                  </div>
                  <div className={classes.wrapperInfo}>
                    <p>{item.type}</p>
                  </div>
                  <div className={classes.wrapperInfo}>
                    <p>{item.date}</p>
                  </div>
                  <div className={classes.wrapperInfo}>
                    <DownloadButton item={item} />
                  </div>
                </div>
              );
            else if (item.type.match("video*"))
              return (
                <div key={item.id} className={classes.fileWrapper}>
                  <div
                    className={classes.wrapperTitle}
                    onClick={() => handleShow(item)}
                  >
                    <FontAwesomeIcon
                      className={classes.icon}
                      icon={faFileVideo}
                    />
                    <p>{item.name}</p>
                  </div>
                  <div className={classes.wrapperInfo}>
                    <p>{item.type}</p>
                  </div>
                  <div className={classes.wrapperInfo}>
                    <p>{item.date}</p>
                  </div>
                  <div className={classes.wrapperInfo}>
                    <DownloadButton item={item} />
                  </div>
                </div>
              );
            else if (item.type.match("audio.*"))
              return (
                <div key={item.id} className={classes.fileWrapper}>
                  <div
                    className={classes.wrapperTitle}
                    onClick={() => handleShow(item)}
                  >
                    <FontAwesomeIcon
                      className={classes.icon}
                      icon={faFileAudio}
                    />
                    <p>{item.name}</p>
                  </div>
                  <div className={classes.wrapperInfo}>
                    <p>{item.type}</p>
                  </div>
                  <div className={classes.wrapperInfo}>
                    <p>{item.date}</p>
                  </div>
                  <div className={classes.wrapperInfo}>
                    <DownloadButton item={item} />
                  </div>
                </div>
              );
          })}

      {openModal ? (
        <ModalFile onHide={handleClose} itemFile={itemFile} />
      ) : null}
    </section>
  );
}

export default ListViewer;
