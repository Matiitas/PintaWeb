import React, { Component } from "react";
import SocketService from "../../services/SocketService";
import Ranking from "./Ranking";
import BlackBoard from "./BlackBoard";
import Chat from "./Chat";
import Header from "./Header";

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

    this.addPlayer = this.addPlayer.bind(this);
  }

  componentDidMount() {
    let { roomId } = this.props.match.params;

    SocketService.emit("join-room", { roomId: roomId }, (response) => {
      if (response.owner) {
        this.setState({ isOwner: true });
        this.addPlayer(response);
      } else {
        console.log("players del response:", response.players);
        this.setState({
          showForm: true,
          players: response.players,
        });
      }
      this.setState({
        roomName: response.roomName,
        loading: false,
      });
      console.log("El nombre de la sala es:", this.state.roomName);
    });

    SocketService.on("user-joins", this.addPlayer);
  }

  addPlayer(data) {
    console.log("En el add player", data.username, "con key:", data.userId);
    let arr = this.state.players.slice();
    arr.push({ key: data.userId, username: data.username, points: 0 });
    this.setState({ players: arr });
    console.log("players actuales:", this.state.players);
  }

  handleFormInput = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmitForm = (event) => {
    console.log("Este es el usuario que se va a agregar:", this.state.name);
    SocketService.emit("set-username", { username: this.state.name });
    this.setState({ showForm: false });
    event.preventDefault();
  };

  renderGame = () => {
    return (
      <div style={{ textAlign: "center" }}>
        <Header roomName={this.state.roomName} />
        <div
          className="row"
          style={{ justifyContent: "center", border: "3px solid" }}
        >
          <Ranking players={this.state.players} />
          <BlackBoard />
          <Chat username={this.state.name} />
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
