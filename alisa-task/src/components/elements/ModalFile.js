import classes from "./ModalFile.module.css";
import { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";
import { FilesContext } from "../../FilesContext";
import DownloadButton from "../DownloadButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileVideo } from "@fortawesome/free-solid-svg-icons";
import { faFileAudio } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

function ModalFile({ onHide, itemFile }) {
  const [content, setContent] = useState("");
  const { files } = useContext(FilesContext);
  const [fileItem, setFileItem] = useState(itemFile);

  useEffect(() => {
    if (fileItem.type.match("image*")) {
      setContent(
        <img
          style={{ boxShadow: "0 0 7px #505050", borderRadius: "2px" }}
          src={fileItem.url}
          alt=""
        />
      );
    } else if (fileItem.type.match("video*")) {
      setContent(
        <ReactPlayer
          url={fileItem.url}
          width="auto"
          height="320px"
          controls={true}
        />
      );
    } else if (fileItem.type.match("audio*")) {
      setContent(<ReactAudioPlayer src={fileItem.url} controls />);
    }
  }, [fileItem]);

  function setNewItem(item) {
    setFileItem(item);
  }

  function changeItem() {
    let current_idx = files.indexOf(fileItem);
    let next_idx = current_idx + 1;
    if (next_idx == files.length) {
      next_idx = 0;
    }
    setFileItem(files[next_idx]);
  }

  return (
    <div className={classes.wrapperModal}>
      <div className={classes.modalContent}>
        <button onClick={onHide} className={classes.close}>
          &times;
        </button>
        <div className={classes.wrapperfile}>
          <div className={classes.wrapperinfoFile}>
            <p>Title: {fileItem.name}</p>
            <p>Size: {fileItem.size}</p>
            <p>Date: {fileItem.date.split('T')[0]}</p>
            <DownloadButton item={fileItem} />
          </div>
          <div className={classes.wrapperContentFile}>
            {content}
            <button onClick={changeItem}>
              <FontAwesomeIcon
                className={classes.iconNext}
                icon={faArrowAltCircleRight}
              />
            </button>
          </div>
        </div>
        <div className={classes.wrapperFiles}>
          {files &&
            files.length > 0 &&
            files.reverse().map((item) => {
              if (item.type.match("image.*"))
                return (
                  <div
                    style={{
                      background: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${item.url})`,
                      backgroundSize: "cover",
                    }}
                    onClick={() => setNewItem(item)}
                    className={
                      item.id == fileItem.id
                        ? classes.active
                        : classes.fileWrapper
                    }
                    key={item.id}
                  >
                    <p>{item.name}</p>
                  </div>
                );
              else if (item.type.match("video*"))
                return (
                  <div
                    onClick={() => setNewItem(item)}
                    key={item.id}
                    className={
                      item.id == fileItem.id
                        ? classes.active
                        : classes.fileWrapper
                    }
                    style={{ background: "rgb(20 20 20)" }}
                  >
                    <FontAwesomeIcon
                      className={classes.icon}
                      icon={faFileVideo}
                    />
                    <p>{item.name}</p>
                  </div>
                );
              else if (item.type.match("audio.*"))
                return (
                  <div
                    key={item.id}
                    className={
                      item.id == fileItem.id
                        ? classes.active
                        : classes.fileWrapper
                    }
                    onClick={() => setNewItem(item)}
                    style={{ background: "rgb(20 20 20)" }}
                  >
                    <FontAwesomeIcon
                      className={classes.icon}
                      icon={faFileAudio}
                    />
                    <p>{item.name}</p>
                  </div>
                );
            })}
        </div>
      </div>
    </div>
  );
}

export default ModalFile;
