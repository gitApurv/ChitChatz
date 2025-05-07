import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SideDrawer() {
  const { user } = ChatState();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState();
  const [loadingChat, setLoadingChat] = useState();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "white",
          width: "100%",
          boxSizing: "border-box",
          p: "5px 10px 5px 10px",
          borderRadius: "10px",
        }}
      >
        <Tooltip title="Search User" placement="bottom-end">
          <Button color="black">
            <SearchIcon />
            <Typography
              sx={{
                display: { xs: "none", md: "flex" },
                px: 0.5,
              }}
            >
              Search User
            </Typography>
          </Button>
        </Tooltip>
        <Typography sx={{ fontSize: "xl", fontFamily: "Work Sans" }}>
          ChitChatz
        </Typography>
        <div></div>
      </Box>
    </>
  );
}
