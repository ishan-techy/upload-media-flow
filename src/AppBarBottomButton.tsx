import { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import "./App.css";
import UploadMedia from "./UploadMedia";
const styles = createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", // Set the minimum height to the viewport height
  },
  appBar: {
    backgroundColor: "white",
  },
  menuButton: {
    marginRight: "16px",
    color: "black",
  },
  toolbar: {
    minHeight: "90px",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "24px",
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    color: "black",
    fontWeight: "bold",
  },
  content: {
    flex: 1, // Take up remaining space
    backgroundColor: "rgb(238, 243, 248)", // Adjust as needed
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: "65px",
    borderRadius: "8px",
    background: "linear-gradient(to right, #606060, #1d1c1f)",
    color: "white",
    fontWeight: "bold",
    margin: "0 25px 25px",
    alignSelf: "flex-end",
  },
});

interface Props extends WithStyles<typeof styles> {}

class AppBarBottomButton extends Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton edge="start" className={classes.menuButton}>
              <ArrowBackIcon />
            </IconButton>
            <Typography className={classes.title} variant="h4">
              Upload
            </Typography>
          </Toolbar>
        </AppBar>
        <UploadMedia />
        <div className={classes.content}>
          <Button className={classes.button} fullWidth variant="contained">
            Continue
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AppBarBottomButton);
