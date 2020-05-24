import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
/**
import Link from '@material-ui/core/Link'
**/
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: "space-between"
  },
  logoLink: {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold"
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}> 
          <Typography variant="h6">
            <Link className={classes.logoLink} to="/">
              Torch
            </Link>
    /**
            </Typography>
            <div>
            <Link color='inherit' href='/chat'><Button>Chat</Button></Link>
            {props.auth === true ? <Button color="inherit" onClick={props.handleLogout}>Log out</Button> : <Button color="inherit">Login</Button>}
            </div>
            </Link>
          </Typography>
          **/
        </Toolbar>
      </AppBar>
    </div>
  );
}
