import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPasseword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userName === "srideshhimalka@gmail.com" && password === "Sri123") {
      setError(null);
      navigate("/");
    } else setError("Incorrect UserName or Password");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack
          direction="column"
          boxShadow={1}
          spacing={4}
          sx={{
            width: "20vw",
            paddingX: "41px",
            paddingY: "31   px",
            borderRadius: "10px",
          }}
        >
          <Typography
            sx={{ fontWeight: 300, textAlign: "center" }}
            variant="h5"
          >
            Sign In
          </Typography>
          <TextField
            type="text"
            label="Email"
            fullWidth
            required
            size="small"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            fullWidth
            required
            size="small"
            value={password}
            onChange={(e) => setPasseword(e.target.value)}
          />

          <Stack
            direction="row"
            spacing={2}
            boxShadow={1}
            sx={{
              borderRadius: "5px",
              padding: "5px",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <img
              style={{ height: "30px", width: "30px" }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png"
            />
            <Typography variant="h6">Sign-In with Google</Typography>
          </Stack>

          <Typography sx={{ color: "red" }}>{error}</Typography>
          <Typography sx={{ color: "red" }}>{password}</Typography>

          <Stack direction="row" justifyContent="space-around">
            <Button type="submit" variant="contained" color="primary">
              Sign In
            </Button>
            <Button variant="outlined" color="error">
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}

export default SignIn;
