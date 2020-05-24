import React from "react";
import "./App.css";
import {
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import orange from "@material-ui/core/colors/deepOrange";

import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Blog from "./components/Blog";

import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import Chat from './components/Chat';
import Signup from './components/Signup1';
import Login from './components/Login1';

import { auth } from './services/firebaseConnection';
const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
  status: {
    danger: "orange",
  },
});
/**
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authenticated: false,
      loading : false,
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.setState({authenticated: false})
    auth().signOut();
  }
  
  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        })
      }
    })
  }
  render() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar auth={this.state.authenticated} handleLogout={this.handleLogout}/>
        {this.state.loading === true ? <h2>Loading...</h2> : (
        <Router>
          <Switch>
            <Route exact path="/" component={Landing}></Route>
             <PrivateRoute
              path="/chat"
              authenticated={this.state.authenticated}
              component={Chat}
            ></PrivateRoute>
            <PublicRoute
              path="/signup"
              authenticated={this.state.authenticated}
              component={Signup}
            ></PublicRoute>
            <PublicRoute
              path="/login"
              authenticated={this.state.authenticated}
              component={Login}
            ></PublicRoute>
          </Switch>
        </Router>
        )}
      </ThemeProvider>
    </div>
**/

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/blog">
            <ThemeProvider theme={theme}>
              <NavBar />
              <Blog />
            </ThemeProvider>
          </Route>
          <Route path="/register">
            <ThemeProvider theme={theme}>
              <NavBar />
              <Registration />
            </ThemeProvider>
          </Route>
          <Route path="/login">
            <ThemeProvider theme={theme}>
              <NavBar />
            </ThemeProvider>
            <Login />
          </Route>
          <Route path="/">
            <ThemeProvider theme={theme}>
              <NavBar />
              <Landing />
            </ThemeProvider>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
}

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/chat" />
        )
      }
    />
  );
}

export default App;
