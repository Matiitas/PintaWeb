import React, { Component } from "react";
import SocketService from "../../services/SocketService";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      chat: [],
    };

    this.addNewMsg = this.addNewMsg.bind(this);
    this.handleSubmitChat = this.handleSubmitChat.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  componentDidMount() {
    SocketService.on("new-message", this.addNewMsg);
  }

  addNewMsg(data) {
    console.log(data);

    let arr = this.state.chat.slice();
    arr.push({
      username: data.username,
      text: data.message,
      mine: false,
    });
    this.setState({ chat: arr });
  }

  renderChatMsg(msg, index) {
    const containerMsgStyle = {
      display: "flex",
      justifyContent: msg.mine ? "end" : undefined,
    };
    const msgStyle = msg.mine
      ? {
          backgroundColor: "#2488ef",
          textAlign: "end",
          color: "#ffffff",
          borderRadius: 5,
          paddingRight: 10,
          paddingLeft: 10,
          paddingTop: 5,
          paddingBottom: 5,
        }
      : {
          backgroundColor: "#ffffff",
          color: "#000000",
          borderRadius: 5,
          paddingRight: 10,
          paddingLeft: 10,
          paddingTop: 5,
          paddingBottom: 5,
        };
    return (
      <div style={containerMsgStyle}>
        <h6 key={index} style={msgStyle}>
          {msg.text}
        </h6>
      </div>
    );
  }

  handleSubmitChat(event) {
    let arr = this.state.chat.slice();
    arr.push({
      username: this.props.username,
      text: this.state.message,
      mine: true,
    });
    this.setState({ chat: arr, message: "" });
    SocketService.emit("send-message", this.state.message);
    event.preventDefault();
  }

  handleChangeInput(event) {
    this.setState({ message: event.target.value });
  }

  render() {
    return (
      <div
        className="col-12 col-lg-4 d-flex"
        style={{ justifyContent: "center" }}
      >
        <div className="card">
          <div className="card-header">
            <h4 style={{ textAlign: "center" }}> Chat </h4>
          </div>
          <div
            id="chat"
            className="card-body"
            style={{ height: 250, backgroundColor: "#232323" }}
          >
            {this.state.chat.map(this.renderChatMsg)}
          </div>
          <form
            id="chat-form"
            className="card-footer"
            onSubmit={this.handleSubmitChat}
          >
            <div className="input-group">
              <input
                type="text"
                id="message"
                value={this.state.message}
                onChange={this.handleChangeInput}
              />
              <input type="submit" className="btn btn-warning" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
