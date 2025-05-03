import { useState } from "react";

import {
  Stack,
  IconButton,
  InputAdornment,
  FormControl,
  FormLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    console.log(email, password);
  };

  return (
    <Stack spacing={1}>
      <FormControl required variant="outlined" fullWidth margin="normal">
        <FormLabel htmlFor="email">Email</FormLabel>
        <OutlinedInput
          id="email"
          label="Email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl required variant="outlined" fullWidth margin="normal">
        <FormLabel htmlFor="password">Password</FormLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Button variant="outlined" onClick={handleLogin}>
        Login
      </Button>
    </Stack>
  );
}
