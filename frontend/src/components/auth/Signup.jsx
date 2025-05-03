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
axios.defaults.baseURL = "http://localhost:5000";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [loadingProfilePicture, setLoadingProfilePicture] = useState(false);
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  function handleClickShowPassword() {
    setShowPassword((show) => !show);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const postProfilePicture = async (profilePicture) => {
    setLoadingProfilePicture(true);

    if (profilePicture == undefined) {
      enqueueSnackbar("Please Select an Image!", {
        variant: "warning",
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
      setLoadingProfilePicture(false);
      return;
    }

    if (profilePicture.size > 1024 * 1024 * 5) {
      enqueueSnackbar("Image size must be less than 5MB!", {
        variant: "warning",
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
      setLoadingProfilePicture(false);
      return;
    }

    if (
      profilePicture.type !== "image/jpeg" &&
      profilePicture.type !== "image/png" &&
      profilePicture.type !== "image/jpg"
    ) {
      enqueueSnackbar("Image must be a JPEG, PNG or JPG!", {
        variant: "warning",
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
      setLoadingProfilePicture(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("file", profilePicture);
      data.append("upload_preset", "ChitChatz");
      data.append("cloud_name", "dhzhsopzh");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dhzhsopzh/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      if (!res.ok) {
        throw new Error("Error uploading image!");
      }
      const jsonRes = await res.json();
      const url = jsonRes.url;
      setProfilePicture(url);
    } catch (err) {
      enqueueSnackbar("Error uploading image!", {
        variant: "error",
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
    } finally {
      setLoadingProfilePicture(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
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

    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match!", {
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
        "/api/user/signup",
        {
          name: name,
          email: email,
          password: password,
          profilePicture: profilePicture,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 201) {
        enqueueSnackbar("Signup successful!", {
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

      <Button
        variant="outlined"
        onClick={handleSignup}
        disabled={loadingProfilePicture || loading}
      >
        {loadingProfilePicture || loading ? (
          <CircularProgress size={20} />
        ) : (
          "Sign Up"
        )}
      </Button>
    </Stack>
  );
}
