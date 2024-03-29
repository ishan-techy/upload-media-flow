import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import "./PrePayment.css";
import { Select, MenuItem } from "@material-ui/core";

const styles = createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "rgb(238, 243, 248)",
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
    flex: 1,
    backgroundColor: "rgb(238, 243, 248)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    margin: "0 25px",
  },
  button: {
    height: "65px",
    borderRadius: "8px",
    background: "linear-gradient(to right, #606060, #1d1c1f)",
    color: "white",
    fontWeight: "bold",
    margin: "0 25px 25px",
    alignSelf: "center",
  },
  mainFileName: {
    fontWeight: "bold",
    margin: "15px",
  },
  innerHead: {
    color: "rgb(82,96,120)",
    marginBottom: "1vh",
    fontWeight: "bold",
  },
  innerBody: {
    marginBottom: "2vh",
    fontSize: "20px",
  },
  card: {
    borderBottom: "1px solid rgb(227,227,227)",
    marginBottom: "2vh",
  },
  formControl: {
    width: "100%",
    border: "1px solid black",
    background: "white",
  },
  select: {
    bordor: "none !important",
  },
});
interface Props extends WithStyles<typeof styles> {}
interface MyDropdownState {
  selectedValue: string;
}

class PrePayment extends Component<Props> {
  constructor(props: object) {
    super(props);
    this.state = {
      selectedValue: "Screen name_01",
    };
  }

  handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ selectedValue: event.target.value as string });
  };

  render() {
    const options = [
      "Screen name_01",
      "Screen name_02",
      "Screen name_03",
      "Screen name_04",
      "Screen name_05",
      "Screen name_06",
    ];
    const { selectedValue } = this.state as any;
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

        <div className="container">
          <div className="child">
            <div className="child2">
              <div className={classes.card}>
                <Typography className={classes.innerHead}>Screen</Typography>
                <Select
                  classes={{ select: classes.select }}
                  className={classes.formControl}
                  value={selectedValue}
                  onChange={this.handleChange}
                  variant="outlined"
                  style={{ minWidth: 120 }}
                >
                  {options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className={classes.card}>
                <Typography className={classes.innerHead}>
                  Media Format
                </Typography>
                <Typography className={classes.innerBody} variant="h5">
                  Mp4
                </Typography>
              </div>
              <div className={classes.card}>
                <Typography className={classes.innerHead}>File Name</Typography>
                <Typography className={classes.innerBody} variant="h5">
                  File name_01.mp4
                </Typography>
              </div>
              <div className={classes.card}>
                <Typography className={classes.innerHead}>
                  Start Date
                </Typography>
                <Typography className={classes.innerBody} variant="h5">
                  20.05.2024
                </Typography>
              </div>
              <div className={classes.card}>
                <Typography className={classes.innerHead}>End Date</Typography>
                <Typography className={classes.innerBody} variant="h5">
                  20.12.2023
                </Typography>
              </div>
              <div className={classes.card}>
                <Typography className={classes.innerHead}>Amount</Typography>
                <Typography className={classes.innerBody} variant="h5">
                  $ 300
                </Typography>
              </div>
            </div>
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
