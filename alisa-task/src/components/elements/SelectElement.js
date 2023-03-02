import classes from "./SelectElement.module.css";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FilesContext } from "./../../FilesContext";

function SelectElement() {
  const [selectedOption, setSelectedOption] = useState([]);
  const { setSearchTerm } = useContext(FilesContext);
  const [types, setTypes] = useState([
    {
      label: "Image",
      value: "image",
    },
    {
      label: "Video",
      value: "video",
    },
    {
      label: "Audio",
      value: "audio",
    },
  ]);

  useEffect(() => {
    setSearchTerm(selectedOption);
  }, [selectedOption]);

  return (
    <div className={classes.wrapperSelect}>
      <div className={classes.search}>
        <button className={faSearch}>
          <FontAwesomeIcon
            style={{ color: "#A3A3A3", marginRight: "5px" }}
            icon={faSearch}
          />
        </button>
        <input
          value={selectedOption}
          onChange={(event) => setSelectedOption(event.target.value)}
          className={classes.searchInput}
          placeholder="Search"
          list="types"
        />
        <datalist id="types">
          {types.map((option) => (
            <option key={option.label} value={option.value}></option>
          ))}
        </datalist>
      </div>
    </div>
  );
}

export default SelectElement;
