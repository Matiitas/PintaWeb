import React, { Component } from "react";
import p5 from "p5";
import SocketService from "../../services/SocketService";

class PintarrajearComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isOwner: false,
      showForm: false,
      name: "", //nombre del usuario para manejar el input del form
      //lo puse para manejar el setState y enviar el input al back
      roomName: "",
      message: "",
      chat: [],
      players: [],
    };

    this.createBlackBoard = this.createBlackBoard.bind(this);
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

  createBlackBoard(element) {
    new p5(this.sketch, element);
  }

  componentDidMount() {
    let { roomId } = this.props.match.params;
    SocketService.emit("join-room", { roomId: roomId }, (response) => {
      this.setState({ roomName: response.room });
      if (response.owner) {
        this.setState({ isOwner: true });
        this.addPlayer(response.username);
      } else {
        this.setState({ showForm: true });
      }
      this.setState({ loading: false });
      console.log("Es dueño?", this.state.isOwner);
    });
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

  addPlayer = (name) => {
    console.log("Se va a agregar al player:", name);
    let arr = this.state.players.slice();
    arr.push({ name: name, points: 0 });
    this.setState({ players: arr });
  };

  renderChatMsg = (msg) => {
    return <h6>{msg}</h6>;
  };

  handleFormInput = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmitForm = (event) => {
    console.log("Este es el usuario que se va a agregar:", this.state.name);
    SocketService.emit("addUsername", { name: this.state.name });
    this.setState({ showForm: false });
    this.addPlayer(this.state.name);
    event.preventDefault();
  };

  handleSubmitChat = (event) => {
    let arr = this.state.chat.slice();
    arr.push(this.state.message);
    this.setState({ chat: arr, message: "" });
    SocketService.emit("newMsg", this.state.message);
    event.preventDefault();
  };
  handleChangeInput = (event) => {
    this.setState({ message: event.target.value });
  };

  renderGame = () => {
    return (
      <div
        className="row"
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
          <div ref={this.createBlackBoard}></div>
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
      </div>
    );
  };

  renderForm = () => {
    return (
      <form onSubmit={this.handleSubmitForm}>
        <label>
          Jugador:
          <input
            type="text"
            placeholder="Nombre del jugador"
            onChange={this.handleFormInput}
          />
        </label>
        <input type="submit" value="Ingresar" />
      </form>
    );
  };

  render() {
    return (
      <div
        className="container-fluid"
        style={{ background: "#433873", padding: 50 }}
      >
        {this.state.loading ? (
          <div>Cargando...</div>
        ) : this.state.showForm ? (
          this.renderForm()
        ) : (
          this.renderGame()
        )}
      </div>
    );
  }
}

export default PintarrajearComponent;
