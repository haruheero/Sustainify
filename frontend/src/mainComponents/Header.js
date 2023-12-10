import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import logo from "../images/Mainlogo.svg";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
// import { auth } from "../firebaseFiles/firebase";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Avatar from "@mui/material/Avatar";
import { useAuthState } from "react-firebase-hooks/auth";
const Header = () => {
  return (
    <>
      <AppBar
        sx={{
          pl: 3,
          pr: 1,
          backgroundColor: "rgb(24 24 24)",
          fontSize: "15px",
          color: "rgb(190 190 190)",
          fontWeight: "500",
          boxShadow: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        style={{
          borderTop: "1px solid rgb(49 49 49)",
          borderBottom: "1px solid rgb(49 49 49)",
        }}
        position="static"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "25px",
              height: "25px",
              marginRight: "5px",
              marginTop: "3px",
              marginBottom: "3px",
            }}
            src={logo}
            alt="loading..."
          />
          Sustainify
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <GitHubIcon sx={{ color: "#1f88d9", fontSize: 20, mr: 1 }} />

          <Tooltip TransitionComponent={Zoom} title={<></>}>
            {/* <Avatar
              sx={{ width: 20, height: 20, mr: 1 }}
              alt={"userInfo"}
              src={}
            /> */}
          </Tooltip>
        </div>
      </AppBar>
    </>
  );
};

export default Header;
