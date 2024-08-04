import { useState } from "react";
import { Button, Typography } from "@mui/material";

const DocumentUpload = () => {
  const [docFile, setDocFile] = useState(null);

  const handleDocUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDocFile(file);
    }
  };

  const handleUpload = () => {
    // Handle the file upload logic here
    console.log("Uploading document file:", docFile);
  };

  return (
    <div>
      <Typography variant="h6">Upload Document</Typography>
      <input
        accept=".doc,.docx,.pdf"
        style={{ display: "none" }}
        id="raised-button-file-doc"
        type="file"
        onChange={handleDocUpload}
      />
      <label htmlFor="raised-button-file-doc">
        <Button variant="contained" component="span">
          Choose Document
        </Button>
      </label>
      {docFile && <Typography>{docFile.name}</Typography>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!docFile}
      >
        Upload
      </Button>
    </div>
  );
};

export default DocumentUpload;
