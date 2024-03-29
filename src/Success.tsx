import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import homeIcon from "./assets/button_tab_item.png";
import mainImg from "./assets/image_Frame 8578.png";
import "./Failed.css";

const styles = createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  appBar: {
    backgroundColor: "rgb(238, 243, 248)",
    height: "65px",
  },
  menuButton: {
    padding: 0,
    left: "-1px",
  },
  content: {
    flex: 1,
    backgroundColor: "rgb(238, 243, 248)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "0 25px",
  },
  button: {
    height: "65px",
    borderRadius: "8px",
    background: "linear-gradient(to right, #606060, #1d1c1f)",
    color: "white",
    fontWeight: "bold",
    margin: "0 25px 25px 25px",
    alignSelf: "center",
  },
  typography: {
    textAlign: "center",
    color: "rgb(133,133,133)",
    fontSize: "17px",
  },
  typography2: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "22px",
    marginBottom: "15px",
  },
});

class PrePayment extends Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton edge="start" className={classes.menuButton}>
              <img src={homeIcon} alt="" height="60px" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="container">
          <img src={mainImg} alt="" className="mainImg" />
          <div className="child">
            <Typography variant="h4" className={classes.typography2}>
              Payment Success
            </Typography>
            <Typography variant="h6" className={classes.typography}>
              Thank you for your order. Your files are under review. We will
              notify once it is approved via email. You can also find your Order
              History within your Profile.
            </Typography>
          </div>
        </div>
        <div className={classes.content}>
          <Button fullWidth className="button" variant="text">
            Cancel
          </Button>
          <Button className={classes.button} fullWidth variant="contained">
            Continue
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PrePayment);
