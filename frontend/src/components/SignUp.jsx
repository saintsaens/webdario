import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = email ? "" : "Email is required";
    tempErrors.password = password ? "" : "Password is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Signing in with:", { email, password });
      // Handle sign-in logic (e.g., API request)
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at center, #041C32, #02101F)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 320,
          backgroundColor: "#02101F",
          color: "#ECB365",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{ style: { color: "#ECB365" } }}
            InputLabelProps={{ style: { color: "#ECB365" } }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{ style: { color: "#ECB365" } }}
            InputLabelProps={{ style: { color: "#ECB365" } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUp;
