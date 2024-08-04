import { Button, Typography } from "@mui/material";

const VideoUpload = ({ videoFile, onVideoUpload, onRemove }) => {
  return (
    <div>
      <Typography variant="h6">Upload Video</Typography>
      <input
        accept="video/*"
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        onChange={onVideoUpload}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span">
          Choose Video
        </Button>
      </label>
      {videoFile && (
        <div>
          <Typography>{videoFile.name}</Typography>
          <Button variant="contained" color="secondary" onClick={onRemove}>
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
