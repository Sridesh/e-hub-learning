import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VideoUpload from "../components/VideoUpload";
import { useEffect, useState } from "react";
import DocumentUpload from "../components/DocumentUpload";
import CustomeAccordion from "../components/CustomeAccordion";
import axios from "axios";
import Header from "../components/Header";

function AddCourse() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [addModule, setAddModule] = useState(false);

  const [data, setData] = useState({
    // id: 3,
    name: "",
    description: "",
    modules: [],
  });

  const [module, setModule] = useState({
    module_id: null,
    module_name: "",
    type: "",
    link: "",
  });

  useEffect(() => {
    console.log(module);
  }, [module]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
      setModule((prev) => {
        return {
          ...prev,
          link: URL.createObjectURL(file),
        };
      });
    }
  };

  const handleRemove = () => {
    setVideoFile(null);
    setVideoURL("");
    setModule((prev) => {
      return {
        ...prev,
        link: "",
      };
    });
  };

  const clear = () => {
    setModule({
      module_id: null,
      module_name: "",
      type: "",
      link: "",
    });

    setAddModule(false);
  };

  const handleAddModule = () => {
    setData((prev) => {
      return {
        ...prev,
        modules: [...prev.modules, module],
      };
    });
    clear();
  };

  const handleUpload = () => {
    // Handle the file upload logic here
    console.log("Uploading video file:", videoFile);
    // You can add your upload logic here
  };

  const handleChange = (e, label) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSelect = (value) => {
    if (value) {
      setModule((prev) => {
        return {
          ...prev,
          type: value,
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/courses", data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ width: "70%", padding: "20px" }}>
        <Typography variant="h5">Create A New Course</Typography>
        <form onSubmit={handleSubmit}>
          <Stack
            direction="column"
            spacing={2}
            sx={{
              padding: "20px",
              borderRadius: "5px",
              border: "1px solid gray",
            }}
          >
            <TextField
              required
              value={data.name}
              onChange={handleChange}
              name="name"
              size="small"
              label="Course Name"
            />
            <TextField
              required
              multiline
              value={data.description}
              onChange={handleChange}
              name="description"
              size="small"
              label="Course Description"
            />

            <Button onClick={() => setAddModule(!addModule)}>Add Module</Button>

            {addModule && (
              <Stack
                direction="column"
                spacing={2}
                sx={{
                  padding: "20px",
                  borderRadius: "5px",
                  border: "1px solid lightblue",
                  flexGrow: 1,
                }}
              >
                <TextField
                  required
                  value={module.module_name}
                  onChange={(e) =>
                    setModule((prev) => {
                      return {
                        ...prev,
                        module_name: e.target.value,
                      };
                    })
                  }
                  name="module_name"
                  size="small"
                  label="Module Name"
                />
                <Autocomplete
                  value={module.type}
                  getOptionLabel={(option) => option}
                  options={["video", "document", "Assessment"]}
                  renderInput={(params) => (
                    <TextField {...params} label="Module Type" />
                  )}
                  onChange={(e, newValue) =>
                    handleSelect(newValue, module.module_id)
                  }
                />

                {module.type == "document" && (
                  <TextField
                    required
                    multiline
                    value={module.link}
                    onChange={(e) =>
                      setModule((prev) => {
                        return {
                          ...prev,
                          link: e.target.value,
                        };
                      })
                    }
                    name="name"
                    size="small"
                    label="Content"
                  />
                )}

                {module.type == "video" && module.link != "" && (
                  <video width="300px" height="200px" controls>
                    <source src={module.link} />
                  </video>
                )}

                {module.type == "video" && (
                  <>
                    <VideoUpload
                      videoFile={videoFile}
                      onVideoUpload={handleVideoUpload}
                      onRemove={handleRemove}
                    />
                  </>
                )}
                {module.type == "document" && <DocumentUpload />}
                <Button onClick={handleAddModule}>Add Module</Button>
                <Button onClick={clear} color="error">
                  Cancel
                </Button>
              </Stack>
            )}
          </Stack>
          <Button variant="contained" type="submit">
            Creat
          </Button>
        </form>

        <Stack direction="column">
          {data.modules.map((module) => {
            return (
              <CustomeAccordion
                key={module.module_id}
                title={module.module_name}
                type={module.type}
              >
                {module.type == "video" && (
                  <video width="750px" height="500px" controls>
                    <source src={module.link} />
                  </video>
                )}
                {module.type == "document" && (
                  <Box sx={{ width: "100%", p: "20px" }}>{module.link}</Box>
                )}
                {!module.type &&
                  module.sub_modules.map((sub_module) => {
                    return (
                      <CustomeAccordion
                        key={sub_module.module_id}
                        title={sub_module.module_name}
                        type={sub_module.type}
                      >
                        {sub_module.type == "video" && (
                          <video width="750px" height="500px" controls>
                            <source src={module.link} />
                          </video>
                        )}
                        {module.type == "document" && (
                          <Box sx={{ width: "100%", p: "20px" }}>
                            {sub_module.link}
                          </Box>
                        )}
                      </CustomeAccordion>
                    );
                  })}
              </CustomeAccordion>
            );
          })}
        </Stack>

        {/* <VideoUpload
        videoFile={videoFile}
        onVideoUpload={handleVideoUpload}
        onRemove={handleRemove}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!videoFile}
      >
        Upload
      </Button> */}

        {/* {videoURL && (
        <div>
          <Typography variant="h6">Video Preview:</Typography>
          <video width="600" controls>
            <source src={videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )} */}
      </Box>
    </>
  );
}

export default AddCourse;
