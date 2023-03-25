import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../assest/logo.png"

import RestaurantIcon from "@material-ui/icons/Restaurant";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  
}));

function MyHeader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
     <img src={logo} alt="logo" style={{ width: "250px" }} />
    </div>
  );
}

export default MyHeader;