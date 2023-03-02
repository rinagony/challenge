import classes from "./Modal.module.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import api from "../../api/files";
import { FilesContext } from "../../FilesContext";

function Modal(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [updatedFile, setUpdatedFiles] = useState(false);
  const [sizeFile, setSizeFile] = useState("");

  const { files } = useContext(FilesContext);
  const { setCallFunction } = useContext(FilesContext);

  //change input(file) value while typing
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  useEffect(() => {
    const sizeFileCount = () => {
      if (selectedFile.size / 1024 > 1) {
        console.log("KB");
        let size = Math.round(selectedFile.size / 1024) + " KB";
        setSizeFile(size);
      } else {
        console.log("B");
        let size = selectedFile.size + " B";
        setSizeFile(size);
      }
    };

    if (isSelected) {
      sizeFileCount();
    }
  }, [isSelected]);

  const handleSubmission = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .post("http://localhost:4500/upload", formData)
      .then((res) => {
        let info = {
          id: files.length + 1,
          type: selectedFile.type,
          name: fileName,
          size: sizeFile,
          url: "http://localhost:4500" + res.data.path,
          date: new Date(),
        };
        api.post("/files", info);
      })
      .then(() => {
        setUpdatedFiles(true);
        setCallFunction(true);
      })
      .catch((err) => console.log(err));
    event.preventDefault();
  };

  return (
    <div className={classes.wrapperModal}>
      <div className={classes.modalContent}>
        <button onClick={props.onHide} className={classes.close}>
          &times;
        </button>
        <form onSubmit={handleSubmission}>
          <h2>Please, fill the form to upload files</h2>
          <div className={classes.wrapperInputs}>
            <input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className={classes.fileName}
              type="text"
              maxlength="16"
              required
              placeholder="File name"
            />
            <label className={classes.customFile} htmlFor="fileUpload">
              Upload file
            </label>
            <input
              id="fileUpload"
              className={classes.file}
              type="file"
              accept=".jpg,.apng,.avif,.gif,.jpg, .jpeg, .jfif,.pjpeg,.png,.svg,.mp3,.mp4,.m4p,.m4v,.mpg,.mp2,.mpeg,.mpe,.mpv, .webm, .ogg, .wav"
              required
              name="file"
              onChange={changeHandler}
            />
          </div>
          {isSelected ? (
            <div>
              <p>Filetype: {selectedFile.type}</p>
              <p>Size: {sizeFile}</p>
            </div>
          ) : (
            <p className={classes.warning}>Please, select a file</p>
          )}

          <button type="submit">Send file</button>
          {updatedFile ? <p>File uploaded</p> : null}
        </form>
      </div>
    </div>
  );
}

export default Modal;
