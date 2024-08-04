import { Autocomplete, Avatar, Box, Stack, TextField } from "@mui/material";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

import Logo from "../assets/Logo.png";
import { deepOrange } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const onlineCourses = [
    "Introduction to Programming",
    "Web Development Bootcamp",
    "Data Science Fundamentals",
    "Machine Learning with Python",
    "Digital Marketing Mastery",
    "Graphic Design Essentials",
    "Cybersecurity Basics",
    "Business Analytics with Excel",
    "Cloud Computing with AWS",
    "Financial Modeling and Valuation",
    "Photography for Beginners",
    "Music Production with Ableton Live",
    "Artificial Intelligence Foundations",
    "Full-Stack JavaScript Developer",
    "React and Redux Fundamentals",
    "Python for Data Analysis",
    "Mobile App Development with Flutter",
    "Blockchain Technology and Applications",
    "Creative Writing Workshop",
    "Public Speaking and Communication Skills",
  ];

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const location = useLocation().pathname;

  console.log(location);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "70px",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        bgcolor: "white",
        zIndex: "1000",
      }}
      boxShadow={1}
    >
      <img
        src={Logo}
        style={{ height: "100%" }}
        onClick={() => navigate("/")}
      />
      {!location.includes("/da") && (
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          sx={{ width: "500px", borderRadius: "100%" }}
          size="small"
          options={onlineCourses}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search For Our Courses"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                },
              }}
            />
          )}
        />
      )}
      <Stack
        direction="row"
        spacing={3}
        sx={{
          paddingY: "10px",
          px: "25px",
          alignItems: "center",
          position: "relative",
        }}
      >
        <NotificationsNoneRoundedIcon
          sx={{ color: "gray", fontSize: "2rem", lineHeight: 0 }}
        />
        <Avatar
          sx={{ bgcolor: deepOrange[500], cursor: "pointer" }}
          onClick={() => setOpen(!open)}
        >
          SF
        </Avatar>
        {open && (
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: "65px",
              width: "150px",
              height: "100px",
              bgcolor: "white",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            boxShadow={1}
          >
            {!location.includes("/dashboard") ? (
              <Box
                sx={{
                  width: "80%",
                  padding: "10px",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/dashboard")}
              >
                Switch To Tutor
              </Box>
            ) : (
              <Box
                sx={{
                  width: "80%",
                  padding: "10px",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                Switch To Common
              </Box>
            )}
            <Box
              sx={{
                width: "80%",
                padding: "10px",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
              onClick={() => navigate("sign-in")}
            >
              Logout
            </Box>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export default Header;
