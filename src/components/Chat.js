import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { auth } from "../services/firebaseConnection";
import { db } from "../services/firebaseConnection";
import Torch from "../img/torch.svg";

const styles = {
  chat: {
    margin: "0 auto",
  },
  paper: {
    width: "60%",
    margin: "50px auto",
    height: "50%",
    borderRadius: "20px",
  },
  card: {
    width: "80%",
    margin: "10px auto",
    padding: "20px 0",
    borderRadius: "0 30px",
    display: "flex",
    backgroundColor: "rgba(78, 183, 253,0.4)",
  },
  time: {
    margin: "0 30px",
    color: "#aaa",
  },
  user: {
    fontWeight: "700",
    margin: "0 10px",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  text: {
    width: "50%",
  },

  btn: {
    marginLeft: "5px",
    borderRadius: '15px',
    boxShadow: "1px 1px orange",
    "&:hover": {
      boxShadow: "0 0 orange",
      top: "1px",
    },
  },
  outline: {
    borderRadius: "20px 0",
  },
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: "",
      readError: null,
      writeError: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
        user: this.state.user.email.split("@")[0],
      });
      this.setState({ content: "" });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  async componentDidMount() {
    this.setState({ readError: null });
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        this.setState({ chats });
      });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.chat}>
          <Paper variant="outlined" className={classes.paper}>
            {this.state.chats.map((chat) => {
              const time = new Date(chat.timestamp)
                .toLocaleString()
                .split(" ")
                .filter((val, i) => [1, 2].includes(i))
                .join(" ");
              return (
                <Card
                  variant="outlined"
                  className={classes.card}
                  key={chat.timestamp}
                >
                  <div className={classes.time}>{time}</div>
                  <div className={classes.user}>{chat.user}: </div>{" "}
                  <div>{chat.content}</div>
                </Card>
              );
            })}
          </Paper>
          <form onSubmit={this.handleSubmit}>
            <div>
              <TextField
                onChange={this.handleChange}
                variant="outlined"
                value={this.state.content}
                InputProps={{ classes: { notchedOutline: classes.outline } }}
                placeholder="light and inspire"
                className={classes.text}
              ></TextField>
              {this.state.error ? <p>{this.state.writeError}</p> : null}
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                className={classes.btn}
              >
                <img
                  src={Torch}
                  style={{ height: "45px", width: "70px" }}
                  alt="torch icon"
                />
              </Button>
            </div>
          </form>
          <div>
            Logined in as: <strong>{this.state.user.email}</strong>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Chat);
