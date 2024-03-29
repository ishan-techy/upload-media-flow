import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import "./PreviewScreen.css";
import video from "./assets/mountains_-_7418.mp4";
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
    position: "absolute",
    marginRight: "16px",
    color: "black",
    left: "3%",
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "8px",
  },
  title: {
    fontWeight: "bold",
    color: "black",
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
  mainFileName: {
    fontWeight: "bold",
    margin: "15px",
  },
  innerHead: {
    color: "rgb(82,96,120)",
    marginBottom: "1vh",
  },
  innerBody: {
    marginBottom: "2vh",
    fontSize: "20px",
  },
  card: {
    borderBottom: "1px solid rgb(227,227,227)",
    marginBottom: "2vh",
  },
});

interface Props extends WithStyles<typeof styles> {}

class PreviewScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      fileSize: "",
      duration: "",
    };
  }

  componentDidMount() {
    this.updateVideoDetails();
  }

  updateVideoDetails = () => {
    const videoElement = document.getElementById(
      "previewVideo"
    ) as HTMLVideoElement;

    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", () => {
        const blob = new Blob([videoElement.src], { type: "video/mp4" }); // Create a blob from the video source
        const reader = new FileReader();

        reader.onload = (event) => {
          const fileSizeInBytes = event.target.result.byteLength;
          const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
          this.setState({
            fileSize: `${fileSizeInMB.toFixed(2)} MB`,
            duration: `${Math.floor(videoElement.duration)} seconds`,
          });
        };

        reader.readAsArrayBuffer(blob); // Read the blob as an ArrayBuffer
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { fileSize, duration } = this.state;
    const videoFileName = video.substring(video.lastIndexOf("/") + 1);

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <IconButton edge="start" className={classes.menuButton}>
              <ArrowBackIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6">
              PREVIEW
            </Typography>
          </Toolbar>
        </AppBar>
        <video
          id="previewVideo"
          controls
          playsInline
          loop
          autoPlay
          className="video-player"
          onLoadedMetadata={this.updateVideoDetails}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="container">
          <div className="child">
            <Typography className={classes.mainFileName} variant="h6">
              {videoFileName}
            </Typography>
            <div className="child2">
              <div className={classes.card}>
                <Typography className={classes.innerHead}>
                  Media Format
                </Typography>
                <Typography className={classes.innerBody} variant="h5">
                  Mp4
                </Typography>
              </div>
              <div className={classes.card}>
                <Typography className={classes.innerHead}>File Size</Typography>
                <Typography className={classes.innerBody} variant="h5">
                  {fileSize}
                </Typography>
              </div>
              <div className={classes.card}>
                <Typography className={classes.innerHead}>Duration</Typography>
                <Typography className={classes.innerBody} variant="h5">
                  {duration}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.content}>
          <Button className={classes.button} fullWidth variant="contained">
            Continue
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PreviewScreen);
