import { TextField } from "@mui/material";
import { useState } from "react";
import Header from "./Header";

function Common() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div>
      <Header />
      <TextField
        size="small"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}

export default Common;
