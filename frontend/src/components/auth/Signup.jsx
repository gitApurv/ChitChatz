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

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [loadingProfilePicture, setLoadingProfilePicture] = useState(false);

  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const postProfilePicture = (profilePicture) => {
    setLoadingProfilePicture(true);

    setLoadingProfilePicture(false);
  };

  const handleSignup = () => {
    console.log(name, email, password, confirmPassword, profilePicture);
  };

  return (
    <Stack spacing={1}>
      <FormControl required variant="outlined" fullWidth margin="normal">
        <FormLabel htmlFor="name">Name</FormLabel>
        <OutlinedInput
          id="name"
          label="Name"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

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

      <FormControl required variant="outlined" fullWidth margin="normal">
        <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
        <OutlinedInput
          id="confirm-password"
          type="text"
          label="Confirm Password"
          placeholder="Enter Password Again"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormControl>

      <FormControl variant="outlined" fullWidth margin="normal">
        <FormLabel htmlFor="profile-picture">Upload Profile Picture</FormLabel>
        <OutlinedInput
          id="profile-picture"
          type="file"
          accept="image/*"
          label="Profile Picture"
          placeholder="Upload Profile Picture"
          onChange={(e) => postProfilePicture(e.target.files[0])}
        />
      </FormControl>

      <Button variant="outlined" onClick={handleSignup}>
        Sign Up
      </Button>
    </Stack>
  );
}
