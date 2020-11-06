import React, { Component } from "react";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

//MUI
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

//apikey for NeoWs
const apiKey = "DCFK4G343wjj2YEZ7QV4UFsECIERpXbFGeDA1ntc";

const styles = {
  root: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  searchBar: {
    width: "100%",
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
};

class home extends Component {
  state = {
    earthObjs: null,
    search: "",
  };
  componentDidMount() {
    axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=20&api_key=${apiKey}`
      )
      .then((res) => {
        this.setState({
          earthObjs: res.data.near_earth_objects,
        });
      })
      .catch((err) => console.log(err));
  }

  handleChange = (event) => {
    this.setState({ search: event.target.value });
  };

  handleClear = () => {
    this.setState({ search: "" });
  };

  handleLogout = () => {
    localStorage.removeItem("FBIdToken");
    window.location.reload();
  };

  render() {
    const { classes } = this.props;
    const { search } = this.state;

    const filteredPosts = this.state.earthObjs
      ? this.state.earthObjs.filter((eobj) => {
          return eobj.id.indexOf(search) !== -1;
        })
      : null;

    console.log(filteredPosts);

    let nearEarthObjsMarkup = this.state.earthObjs ? (
      filteredPosts.slice(0, 10).map((earthObj) => (
        <div>
          <Card className={classes.root}>
            <Tooltip title="Like">
              <IconButton>
                <BookmarkBorderIcon color="primary" />
              </IconButton>
            </Tooltip>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {earthObj.id}
              </Typography>
              <Typography variant="h5" component="h2">
                {earthObj.name}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ))
    ) : (
      <p>Loading...</p>
    );

    let profileMarkUp = localStorage.FBIdToken ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="profile-details">
            <PermContactCalendarIcon color="primary" />{" "}
            <span>{localStorage.name}</span>
          </div>
          <Tooltip title="Logout" placement="top">
            <IconButton onClick={this.handleLogout}>
              <ExitToAppIcon color="primary" />
            </IconButton>
          </Tooltip>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login here.
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
        </div>
      </Paper>
    );

    return (
      <Grid container spacing={6}>
        <Grid item sm={4} xs={12}>
          {profileMarkUp}
        </Grid>
        <Grid item sm={8} xs={12}>
          <TextField
            id="outlined-secondary"
            className={classes.searchBar}
            label="Search for ID"
            variant="outlined"
            color="primary"
            onChange={this.handleChange}
            value={this.state.search}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <SearchIcon color="primary" className={classes.searchIcon} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={this.handleClear}>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {nearEarthObjsMarkup}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(home);
