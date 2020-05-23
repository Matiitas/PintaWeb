import React, { Component } from "react";
import p5 from "p5";
import SocketService from "../services/SocketService";

class Pintarrajear extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    let { roomId } = this.props.match.params;
    console.log(roomId);
    SocketService.emit("hit", { casa: "asd" });

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

  sketch = (p) => {
    p.setup = () => {
      p.createCanvas(500, 400);
      p.background(255);
    };

    p.draw = () => {
      if (p.mouseIsPressed === true) {
        p.stroke(0);
        p.fill(0);
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      }
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.sketch, this.myRef.current);
    SocketService.on("sendMsg", this.addNewMsg);
  }

  addNewMsg = (data) => {
    let arr = this.state.chat.slice();
    arr.push(data);
    this.setState({ chat: arr });
  };

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
    SocketService.emit("newMsg", this.state.message);
  };
  handleChangeInput = (event) => {
    this.setState({ message: event.target.value });
  };

  render() {
    return (
      <div
        className="container-fluid"
        style={{ background: "#433873", padding: 50 }}
      >
        <div
          class="row"
          style={{ justifyContent: "center", border: "3px solid" }}
        >
          <div
            className="col-12 col-lg-2 d-block"
            style={{
              textAlign: "center",
            }}
          >
            <h3> Posiciones </h3>
            {this.state.players
              .sort((a, b) => (a.points < b.points ? 1 : -1))
              .map(this.renderPositions)}
          </div>
          <div
            className="col-12 col-lg-6 d-flex"
            style={{
              justifyContent: "center",
              border: "5px solid",
            }}
          >
            <div ref={this.myRef}></div>
          </div>
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
      </div>
    );
  }
}

export default Pintarrajear;
