import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { Container, Grid, Paper, Button } from "@material-ui/core";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function HomePage() {
  const classes = useStyles();
  return (
    <Container>
      <h1 style={{ textAlign: "center", margin: "2rem" }}>Home</h1>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Link to="/juristic-register" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                <AssignmentIcon fontSize="large" />
                <h3>Go to Juristic Register</h3>
              </Button>
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Link to="/member-register" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                <AssignmentIndIcon fontSize="large" />
                <h3>Go to Member Register</h3>
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
