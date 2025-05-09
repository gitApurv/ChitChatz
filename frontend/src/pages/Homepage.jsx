import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Container, Box, Typography } from "@mui/material";

import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

export default function Homepage() {
  const [value, setValue] = useState("1");
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/chats");
  }, [navigate]);

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 2,
          bgcolor: "white",
          width: "100%",
          my: "20px",
          mb: "10px",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.300",
        }}
      >
        <Typography variant="h4" fontFamily="Work sans" sx={{ fontSize: 30 }}>
          ChitChatz
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: "white",
          width: "100%",
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.300",
        }}
      >
        <TabContext value={value}>
          <TabList onChange={handleChange} variant="fullWidth" sx={{ mb: 1 }}>
            <Tab label="Login" value="1" />
            <Tab label="Sign Up" value="2" />
          </TabList>
          <TabPanel value="1">
            <Login />
          </TabPanel>
          <TabPanel value="2">
            <Signup />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}
