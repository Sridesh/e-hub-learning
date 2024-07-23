import { Autocomplete, Avatar, Box, Stack, TextField } from "@mui/material";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

import Logo from "../assets/Logo.png";
import { deepOrange } from "@mui/material/colors";

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

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "70px",
        justifyContent: "space-between",
      }}
      boxShadow={1}
    >
      <img src={Logo} style={{ height: "100%" }} />
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
      <Stack
        direction="row"
        spacing={3}
        sx={{ paddingY: "10px", px: "25px", alignItems: "center" }}
      >
        <NotificationsNoneRoundedIcon
          sx={{ color: "gray", fontSize: "2rem", lineHeight: 0 }}
        />
        <Avatar sx={{ bgcolor: deepOrange[500] }}>SF</Avatar>
      </Stack>
    </Box>
  );
}

export default Header;
