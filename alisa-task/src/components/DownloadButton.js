import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

function DownloadButton(props) {
  async function downloadFile(file) {
    fetch(file.url).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = props.item.name;
        a.click();
      });
    });
  }

  return (
    <button name="Access-Control-Allow-Origin" onClick={() => downloadFile(props.item)}>
      <FontAwesomeIcon className="iconDownload" icon={faDownload} />
    </button>
  );
}

export default DownloadButton;
