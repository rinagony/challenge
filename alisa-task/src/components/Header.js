import classes from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faBorderAll } from "@fortawesome/free-solid-svg-icons";
import SelectElement from "./elements/SelectElement";
import UploadElement from "./elements/UploadElement";

function Header(props) {
  return (
    <header className={classes.header}>
      <div className={classes.containerHeader}>
        <div className={classes.wrapperButtons}>
          <div className={classes.wrapperButton}>
            <button onClick={() => props.changeViewer(false)} className={!props.viewer ? classes.active : null}>
              <FontAwesomeIcon icon={faList} />
            </button>
          </div>
          <div className={classes.wrapperButton}>
            <button onClick={() => props.changeViewer(true)} className={props.viewer ? classes.active : null}>
              <FontAwesomeIcon icon={faBorderAll} />
            </button>
          </div>
          <div className={classes.wrapperButtonUpload}>
            <UploadElement/>
          </div>
        </div>
        <div className={classes.wrapperSearch}>
          <SelectElement/>
        </div>
      </div>
    </header>
  );
}

export default Header;
