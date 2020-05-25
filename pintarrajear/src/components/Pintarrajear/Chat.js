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
    SocketService.on("sendMsg", this.addNewMsg);
  }

  addNewMsg(data) {
    let arr = this.state.chat.slice();
    arr.push(data);
    this.setState({ chat: arr });
  }

  renderChatMsg(msg) {
    return <h6>{msg}</h6>;
  }

  handleSubmitChat(event) {
    let arr = this.state.chat.slice();
    arr.push(this.state.message);
    this.setState({ chat: arr, message: "" });
    SocketService.emit("newMsg", this.state.message);
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
          <div id="chat" className="card-body" style={{ height: 250 }}>
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
