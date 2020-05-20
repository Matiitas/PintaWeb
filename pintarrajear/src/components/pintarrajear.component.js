import React, { Component } from "react";

class Pintarrajear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      chat: [],
      players: [
        {
          name: "Jugador1",
          points: 10,
        },
        {
          name: "Jugador2",
          points: 50,
        },
        {
          name: "Jugador3",
          points: 100,
        },
        {
          name: "Jugador4",
          points: 90,
        },
        {
          name: "Jugador5",
          points: 120,
        },
      ],
    };
  }
  //<>

  renderPositions = (player) => {
    return (
      <h5>
        {" "}
        {player.name} : {player.points}{" "}
      </h5>
    );
  };

  renderChatMsg = (msg) => {
    return <h6>{msg}</h6>;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let arr = this.state.chat.slice();
    arr.push(this.state.message);
    this.setState({ chat: arr, message: "" });
  };
  handleChangeInput = (event) => {
    this.setState({ message: event.target.value });
  };

  render() {
    return (
      <div
        className="row container-fluid"
        style={{ background: "green", padding: 10 }}
      >
        <div
          className="col-2"
          style={{ background: "blue", textAlign: "center" }}
        >
          <h3> Posiciones </h3>
          {this.state.players
            .sort((a, b) => (a.points < b.points ? 1 : -1))
            .map(this.renderPositions)}
        </div>
        <div className="col-6" style={{ background: "red" }}>
          Aca iria el CANVAS
        </div>
        <div className="col-4">
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
              onSubmit={this.handleSubmit}
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
      </div>
    );
  }
}

export default Pintarrajear;
