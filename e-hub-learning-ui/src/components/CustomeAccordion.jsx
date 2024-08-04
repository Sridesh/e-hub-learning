import { Box, Divider, Typography } from "@mui/material";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ArticleIcon from "@mui/icons-material/Article";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { useState } from "react";

function CustomeAccordion({ title, type, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ width: "80%", cursor: "pointer" }}>
      <Box
        sx={{ display: "flex", p: "10px", width: "100%" }}
        onClick={() => setOpen(!open)}
      >
        {type == "video" ? (
          <OndemandVideoIcon />
        ) : type == "document" ? (
          <ArticleIcon />
        ) : (
          <AccountTreeIcon />
        )}
        <Typography sx={{ ml: "20px" }}>{title}</Typography>
      </Box>
      {open && <Box sx={{ px: "30px", py: "10px" }}>{children}</Box>}
      <Divider />
    </div>
  );
}

export default CustomeAccordion;
