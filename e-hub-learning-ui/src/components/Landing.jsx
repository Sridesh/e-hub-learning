import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Progress from "./Progress";

import Header from "../components/Header";

import image from "../assets/image1.png";
import YouTube from "react-youtube";
import CustomeAccordion from "./CustomeAccordion";

function Landing() {
  const [data, setDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:8080/courses");
        setDate(res.data[0]);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, []);

  if (isLoading) return <Progress />;

  return (
    <>
      <Header />
      <Box sx={{ padding: "30px", mt: "70px", position: "relative" }}>
        <Button
          variant="contained"
          sx={{ position: "absolute", right: 60, fontSize: "1.5rem" }}
        >
          Enroll Now
        </Button>
        <Stack direction="column" spacing={3}>
          <Typography variant="h4">{data.name}</Typography>
          <Typography variant="h6" sx={{ color: "gray" }}>
            By : Ben Young
          </Typography>
          <img src={image} style={{ height: "300px", width: "1000px" }} />
          <Typography sx={{ fontWeight: 100, fontSize: "1.1rem" }}>
            {data.description}
          </Typography>
        </Stack>
        <Stack
          direction="column"
          sx={{
            padding: "10px",
            mt: "20px",
            borderRadius: "5px",
            border: "1px solid lightblue",
          }}
        >
          <Typography variant="h6">Modules</Typography>
          {data.modules.map((module) => {
            return (
              <CustomeAccordion
                key={module.module_id}
                title={module.module_name}
                type={module.type}
              >
                {module.type == "video" && (
                  // <video width="750px" height="500px" controls>
                  //   <source src={module.link} />
                  // </video>
                  <YouTube
                    videoId={module.link}
                    opts={{
                      width: "750px",
                      height: "500px",
                      marginLeft: "50px",
                    }}
                  />
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
                          // <video width="750px" height="500px" controls>
                          //   <source src={module.link} />
                          // </video>
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
      </Box>
    </>
  );
}

export default Landing;
