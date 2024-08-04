import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoUpload from "../components/VideoUpload";
import DocumentUpload from "../components/DocumentUpload";
import YouTube from "react-youtube";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function EditCourse() {
  const datas = useLocation().state.data;

  const [data, setData] = useState(datas);
  const [list, setList] = useState(datas.modules);

  useEffect(() => {
    setList(data.modules.sort((a, b) => a.module_id - b.module_id));
  }, [data]);

  const handleChange = (e, label) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSelect = (value, id) => {
    if (value) {
      setData((prev) => {
        return {
          ...prev,
          modules: prev.modules.map((module) => {
            if (module.module_id === id) {
              return {
                ...module,
                type: value,
              };
            } else {
              return module;
            }
          }),
        };
      });
    }
  };

  const up = (id) => {
    const newList = data.modules.map((module) => {
      if (module.module_id === id - 1) {
        return {
          ...module,
          module_id: module.module_id + 1, // Increment the module_id of the one directly above
        };
      }
      if (module.module_id === id) {
        return {
          ...module,
          module_id: module.module_id - 1, // Decrement the module_id of the selected module
        };
      }
      return module;
    });

    setData((prev) => {
      return {
        ...prev,
        modules: newList.sort((a, b) => a.module_id - b.module_id), // Sort the modules to maintain the order
      };
    });
  };

  const down = (id) => {
    const newList = data.modules.map((module) => {
      if (module.module_id === id + 1) {
        return {
          ...module,
          module_id: module.module_id - 1, // Decrement the module_id of the one directly below
        };
      }
      if (module.module_id === id) {
        return {
          ...module,
          module_id: module.module_id + 1, // Increment the module_id of the selected module
        };
      }
      return module;
    });

    setData((prev) => {
      return {
        ...prev,
        modules: newList.sort((a, b) => a.module_id - b.module_id), // Sort the modules to maintain the order
      };
    });
  };

  return (
    <Box>
      <Header />
      <Box sx={{ mt: "70px", p: "40px" }}>
        <form>
          <Stack direction="column" spacing={3}>
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
            <Typography variant="h6">Modules</Typography>

            {list.map((module, index) => {
              return (
                <Stack
                  key={module.module_id}
                  direction="row"
                  alignItems="center"
                >
                  <Box>
                    {index != 0 && (
                      <Box
                        sx={{
                          padding: "10px",
                          borderRadius: "5px",
                          bgcolor: "lightblue",
                          marginBottom: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => up(module.module_id)}
                      >
                        <ArrowUpwardIcon />
                      </Box>
                    )}
                    {module.module_id != data.modules.length && (
                      <Box
                        sx={{
                          padding: "10px",
                          borderRadius: "5px",
                          bgcolor: "lightblue",
                          cursor: "pointer",
                        }}
                        onClick={() => down(module.module_id)}
                      >
                        <ArrowDownwardIcon />
                      </Box>
                    )}
                  </Box>
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
                      onChange={handleChange}
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
                        onChange={handleChange}
                        name="name"
                        size="small"
                        label="Content"
                      />
                    )}

                    {module.type == "video" && (
                      <video width="300px" height="200px" controls>
                        <source src={module.link} />
                      </video>
                    )}

                    {module.type == "video" && <VideoUpload />}
                    {module.type == "document" && <DocumentUpload />}
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default EditCourse;
