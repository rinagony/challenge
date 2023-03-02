import React, { useEffect } from "react";
import GridViewer from "./components/GridViewer";
import ListViewer from "./components/ListViewer";
import { useState } from "react";
import api from "./api/files";
import Header from "./components/Header";
import { FilesContext } from "./FilesContext";

function App() {
  const [files, setFiles] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewer, setViewer] = useState(true);
  const [callFunction, setCallFunction] = useState(true);

  //Retrieve files
  const retrieveFiles = async () => {
    const response = await api.get("/files");
    return response.data;
  };

  //when new file uploaded we need to update state
  useEffect(() => {
    const getAllFiles = async () => {
      const allFiles = await retrieveFiles();
      if (allFiles) setFiles(allFiles);
    };

    getAllFiles();
    setCallFunction(false);
  }, [callFunction]);

  const providerValue = {
    files,
    setCallFunction,
    setSearchTerm,
    searchTerm,
  };

  return (
    <FilesContext.Provider value={providerValue}>
      <Header changeViewer={setViewer} viewer={viewer} />
      {viewer ? (
        <GridViewer />
      ) : (
        <ListViewer searchTerms={searchTerm} files={files} />
      )}
    </FilesContext.Provider>
  );
}

export default App;
