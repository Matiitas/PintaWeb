import React, { Component } from "react";
import SocketService from "../../services/SocketService";
import Ranking from "./Ranking";
import BlackBoard from "./BlackBoard";
import Chat from "./Chat";

class PintarrajearComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isOwner: false,
      showForm: false,
      name: "",
      roomName: "",
      players: [],
    };
  }

  componentDidMount() {
    let { roomId } = this.props.match.params;
    SocketService.emit("join-room", { roomId: roomId }, (response) => {
      if (response.owner) {
        this.setState({ isOwner: true });
        this.addPlayer(response.username);
      } else {
        this.setState({ showForm: true });
      }
      this.setState({ roomName: response.room, loading: false });
    });
  }

  addPlayer = (name) => {
    let arr = this.state.players.slice();
    arr.push({ name: name, points: 0 });
    this.setState({ players: arr });
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

  renderGame = () => {
    return (
      <div
        className="row"
        style={{ justifyContent: "center", border: "3px solid" }}
      >
        <Ranking players={this.state.players} />
        <BlackBoard />
        <Chat />
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
