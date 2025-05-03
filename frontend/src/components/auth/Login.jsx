import { useState } from "react";
import { useSnackbar } from "notistack";
import {
  Stack,
  IconButton,
  InputAdornment,
  FormControl,
  FormLabel,
  OutlinedInput,
  Button,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    setLoading(true);
    if (email === "" || password === "") {
      enqueueSnackbar("Please fill all fields!", {
        variant: "warning",
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "/api/user/login",
        { email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        enqueueSnackbar("Login successful!", {
          variant: "success",
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/chats");
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.message, {
        variant: "error",
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
    } finally {
      setLoading(false);
    }
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

      <Button variant="outlined" onClick={handleLogin} disabled={loading}>
        {loading ? <CircularProgress size={20} /> : "Login"}
      </Button>
    </Stack>
  );
}
