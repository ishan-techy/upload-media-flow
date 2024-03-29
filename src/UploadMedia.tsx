import React, { Component } from "react";
import {
  Paper,
  Button,
  Typography,
  LinearProgress,
  withStyles,
  ListItemIcon,
  ListItemText,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import tickIcon from "./assets/check_circle_outline_24px.png";
import errorIcon from "./assets/report_gmailerrorred_24px.png";
import "./UploadMedia.css";
const styles = {
  customColor: {
    "& .MuiLinearProgress-bar": {
      backgroundColor: "#059669",
    },
  },
};
interface FileObject extends File {
  preview?: string;
}

interface UploadMediaState {
  uploadedFiles: FileObject[];
  uploadingFile: FileObject | null;
  uploadProgress: number;
  anchorEl: HTMLElement | null;
  selectedFileIndex: number | null;
}

class UploadMedia extends Component<object, UploadMediaState> {
  state: UploadMediaState = {
    uploadedFiles: [],
    uploadingFile: null,
    uploadProgress: 0,
    anchorEl: null,
    selectedFileIndex: null,
  };

  handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const interval = setInterval(() => {
      this.setState((prevState) => ({
        uploadProgress: Math.min(prevState.uploadProgress + 10, 100),
      }));

      if (this.state.uploadProgress === 100) {
        clearInterval(interval);
        this.setState((prevState) => ({
          uploadedFiles: [...prevState.uploadedFiles, file],
          uploadingFile: null,
          uploadProgress: 0,
        }));
      }
    }, 500);
    this.setState({ uploadingFile: file });
  };

  handleRemove = (index: number) => {
    this.setState((prevState) => {
      const newFiles = [...prevState.uploadedFiles];
      newFiles.splice(index, 1);
      return { uploadedFiles: newFiles };
    });
  };

  render() {
    const { uploadedFiles, uploadingFile, uploadProgress, anchorEl } =
      this.state;
    const { classes } = this.props;
    const fileSizeLimit = 100; // 100 KB

    // Check if any file is being uploaded and its size is less than the limit
    const showFileSizeAlert =
      uploadedFiles.length > 0 && uploadedFiles[0].size / 1024 < fileSizeLimit;

    return (
      <div className="container">
        <div className="child">
          <Paper className="Paper">
            {uploadingFile && (
              <div className="uploadingCard">
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  className={classes.customColor}
                  style={{
                    accentColor: "green",
                    margin: "0 !important",
                    backgroundColor: "white",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginTop: "10px",
                  }}
                >
                  <CircularProgress
                    size={20}
                    className="paddingH"
                    style={{
                      color: "#059669",
                      minWidth: "32px",
                      minHeight: "32px",
                      maxWidth: "32px",
                      maxHeight: "32px",
                      objectFit: "cover",
                      margin: "0 15px",
                    }}
                  />
                  {uploadingFile.type.startsWith("image/") && (
                    <img
                      className="image paddingH"
                      src={URL.createObjectURL(uploadingFile)}
                      style={{
                        position: "relative",
                        minWidth: "50px",
                        minHeight: "50px",
                        maxWidth: "50px",
                        maxHeight: "50px",
                        objectFit: "cover",
                        overflow: "hidden",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  <div className="paddingH">
                    <Typography
                      variant="body2"
                      style={{ fontWeight: "bold", padding: "7px 0 5px 7px" }}
                    >{`Uploading: ${uploadingFile.name}`}</Typography>
                    <Typography
                      style={{ color: "#ccc", padding: "5px 0 5px 7px" }}
                    >{`${(uploadingFile.size / 1024).toFixed(
                      2
                    )} KB`}</Typography>
                  </div>
                  <MoreVertIcon
                    className="paddingH"
                    style={{ marginRight: "20px" }}
                  />
                </div>
              </div>
            )}
            {uploadedFiles.length > 0 && (
              <div className="uploadingCard">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginTop: "10px",
                  }}
                >
                  <img
                    src={showFileSizeAlert ? errorIcon : tickIcon}
                    style={{
                      color: "#059669",
                      minWidth: "32px",
                      minHeight: "32px",
                      maxWidth: "32px",
                      maxHeight: "32px",
                      objectFit: "cover",
                      margin: "0 15px",
                    }}
                  />
                  {uploadedFiles[0].type.startsWith("image/") && (
                    <img
                      className="image paddingH"
                      src={URL.createObjectURL(uploadedFiles[0])}
                      style={{
                        position: "relative",
                        minWidth: "50px",
                        minHeight: "50px",
                        maxWidth: "50px",
                        maxHeight: "50px",
                        objectFit: "cover",
                        overflow: "hidden",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                  <div className="paddingH">
                    <Typography
                      variant="body2"
                      style={{ fontWeight: "bold", padding: "7px 0 5px 7px" }}
                    >
                      {uploadedFiles[0].name}
                    </Typography>
                    <Typography
                      style={{ color: "#ccc", padding: "5px 0 5px 7px" }}
                    >{`${(uploadedFiles[0].size / 1024).toFixed(
                      2
                    )} KB`}</Typography>
                  </div>
                  <CardActions
                  // style={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <IconButton
                      aria-haspopup="true"
                      onClick={(e) => {
                        this.setState({
                          anchorEl: e.currentTarget,
                        });
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={() => this.setState({ anchorEl: null })}
                    >
                      <MenuItem
                        onClick={() => {
                          this.setState({ anchorEl: null });
                        }}
                      >
                        <ListItemIcon>
                          <PlayCircleOutlineIcon />
                        </ListItemIcon>
                        <ListItemText>Preview</ListItemText>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          this.handleRemove(0);
                          this.setState({ anchorEl: null });
                        }}
                      >
                        <ListItemIcon>
                          <DeleteOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                      </MenuItem>
                    </Menu>
                  </CardActions>
                </div>
              </div>
            )}

            {!uploadingFile && uploadedFiles.length === 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img src="src/assets/image_.png" alt="cloud"></img>
                <Typography className="head" variant="h6">
                  Upload from system
                </Typography>
                <Typography>Description of supported files.</Typography>
              </div>
            )}

            <input
              type="file"
              accept="image/*, video/*, application/pdf"
              onChange={this.handleFileUpload}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label htmlFor="fileInput">
              <Button component="span" fullWidth>
                <AddCircleOutlineIcon style={{ marginRight: "10px" }} /> upload
                media
              </Button>
            </label>
          </Paper>

          {showFileSizeAlert && (
            <div className="alert">
              <span className="alertLine"></span>
              <Typography className="alertText">
                The uploaded media doesn't match the requirements.
              </Typography>
            </div>
          )}
          <div
            className="recent"
            style={{
              width: "100%",
              margin: "25px 0",
              color: "rgb(116,130,149)",
            }}
          >
            <Typography style={{ fontWeight: "bold" }}>RECENT FILES</Typography>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(UploadMedia);
