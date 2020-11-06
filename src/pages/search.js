import React, { Component } from "react";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";

//MUI
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
  textField: {
    marginRight: 45,
  },
};

class search extends Component {
  state = {
    earthObjs: null,
    searchObjs: [],
    startDate: "",
    endDate: "",
    api: "",
  };
  startDateChange = (e) => {
    this.setState({ startDate: e.target.value });
  };

  endDateChange = (e) => {
    this.setState({ endDate: e.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      api: `https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.state.startDate}&end_date=${this.state.endDate}&detailed=true&api_key=${apiKey}`,
    });
    console.log(this.state.api);
    axios
      .get(this.state.api)
      .then((res) => {
        console.log(res.data);
        this.setState({
          earthObjs: res.data.near_earth_objects,
        });
        let searchDate = Object.keys(this.state.earthObjs);
        searchDate.map((key) => {
          this.state.earthObjs[key].map((obj) =>
            this.state.searchObjs.push(obj)
          );
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { classes } = this.props;
    const { searchObjs } = this.state;

    let searchNearEarthObjsMarkup = searchObjs.slice(0, 10).map((earthObj) => (
      <div>
        <Card className={classes.root}>
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
    ));

    return (
      <Grid container spacing={6}>
        <Grid item sm={4} xs={12}></Grid>
        <Grid item sm={8} xs={12}>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="start-date"
              label="Start Date"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              value={this.state.startDate}
              onChange={this.startDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="end-date"
              label="End Date"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              value={this.state.endDate}
              onChange={this.endDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={classes.button}
            >
              Search
            </Button>
          </form>
          {searchNearEarthObjsMarkup}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(search);
