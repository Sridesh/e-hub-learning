import { Box, Button, Stack, Typography } from "@mui/material";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Progress from "../components/Progress";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CustomeAccordion from "../components/CustomeAccordion";
import YouTube from "react-youtube";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:8080/courses");
        setIsLoading(false);
        setData(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  if (isLoading) return <Progress />;

  return (
    <Box>
      <Header />
      <Box sx={{ mt: "70px", p: "40px" }}>
        <Box sx={{ height: "50px" }}>
          <Button
            variant="contained"
            onClick={() => navigate("/create-course")}
          >
            Add a New Course
          </Button>
        </Box>
        {data.map((course, index) => {
          return (
            <Stack
              direction="column"
              spacing={2}
              key={index}
              sx={{
                mb: "20px",
                borderRadius: "5px",
                padding: "10px",
                position: "relative",
              }}
              boxShadow={1}
            >
              <Box
                sx={{
                  bgcolor: "lightcyan",
                  opacity: "80%",
                  color: "blue",
                  padding: "10px",
                  borderRadius: "5px",
                  position: "absolute",
                  right: "-10px",
                  top: "-10px",
                  width: "fit-content",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/edit-course", { state: { data: course } });
                }}
              >
                <EditIcon />
              </Box>
              <Typography variant="h6" sx={{ color: "#01115e" }}>
                {course.name}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#3c3c3c" }}>
                {course.description}
              </Typography>
              {selected == course.id ? (
                <Typography
                  sx={{
                    "&.hover:": {
                      backgroundColor: "lightcyan",
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => setSelected(null)}
                >
                  Hide Modules
                  <ExpandLessIcon />
                </Typography>
              ) : (
                <Typography
                  sx={{
                    "& .hover:": {
                      backgroundColor: "lightcyan",
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => setSelected(course.id)}
                >
                  View Modules
                  <KeyboardArrowDownIcon />
                </Typography>
              )}
              {selected == course.id && (
                <Stack direction="column">
                  {course.modules.map((module) => {
                    return (
                      <CustomeAccordion
                        key={module.module_id}
                        title={module.module_name}
                        type={module.type}
                      >
                        {module.type == "video" &&
                          (module.localvid ? (
                            <video width="750px" height="500px" controls>
                              <source src={module.link} />
                            </video>
                          ) : (
                            <YouTube
                              videoId={module.link}
                              opts={{
                                width: "750px",
                                height: "500px",
                                marginLeft: "50px",
                              }}
                            />
                          ))}
                        {module.type == "document" && (
                          <Box sx={{ width: "100%", p: "20px" }}>
                            {module.link}
                          </Box>
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
                                  <YouTube
                                    videoId={sub_module.link}
                                    opts={{
                                      width: "750px",
                                      height: "500px",
                                      marginLeft: "50px",
                                    }}
                                  />
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
              )}
            </Stack>
          );
        })}
      </Box>
    </Box>
  );
}

export default Dashboard;
