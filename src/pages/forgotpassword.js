import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import axios from "axios";

//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    fontSize: 48,
  },
  pageTitle: {
    fontSize: 28,
    margin: "10px auto 20px auto",
  },
  textField: {
    margin: "10px auto 20px auto",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
  },
  progress: {
    position: "absolute",
  },
};

class forgotpassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      loading: false,
      errors: {},
    };
  }

  // componentWillReceiveProps(nextProps) {
  //     if(nextProps.UI.errors) {
  //         this.setState({
  //             errors: nextProps.UI.errors
  //         })
  //     }
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const userData = {
      email: this.state.email,
    };
    axios
      .post(
        "https://europe-west1-earthasteroid-30424.cloudfunctions.net/api/password/reset",
        userData
      )
      .then((res) => {
        this.setState({
          loading: false,
        });
        this.props.history.push("/login");
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <AccountBoxIcon className={classes.image} />
          <Typography variant="h3" className={classes.pageTitle}>
            Forgot your password?
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Reset Password
              {loading && (
                <CircularProgress size={24} className={classes.progress} />
              )}
            </Button>
            <br />
            <br />
            <small>
              <Link to="/login">Login here</Link> ·{" "}
              <Link to="/signup">Sign up here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

export default withStyles(styles)(forgotpassword);
