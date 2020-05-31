import React, { Component } from "react";
import SocketService from "../../services/SocketService";
import Ranking from "./Ranking";
import BlackBoard from "./BlackBoard";
import Chat from "./Chat";
import Header from "./Header";
import UserService from "../../services/UserService";
import RoomService from "../../services/RoomService";

class PintarrajearComponent extends Component {
  constructor(props) {
    super(props);

    const room = RoomService.getRoom();

    this.state = {
      showForm: !UserService.getIsRegistered(),
      loading: false,
      name: "",
      roomName: room ? room.name : "",
      players: room ? room.users : [],
    };

    this.addPlayer = this.addPlayer.bind(this);
  }

  componentDidMount() {
    if (UserService.getIsRegistered())
      SocketService.on("user-joins", this.addPlayer);
  }

  addPlayer(user) {
    RoomService.addPlayer(user);
    console.log("En el add player", user.username, "con key:", user._id);
    let arr = this.state.players.slice();
    arr.push(user);
    this.setState({ players: arr });
    console.log("players actuales:", this.state.players);
  }

  handleFormInput = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmitForm = (event) => {
    let { roomId } = this.props.match.params;
    this.setState({ loading: true });
    RoomService.joinRoom({ roomId, name: this.state.name }, (response) => {
      this.setState({
        roomName: response.room.name,
        players: response.room.users,
        showForm: false,
        loading: false,
      });
      SocketService.on("user-joins", this.addPlayer);
    });
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
        {this.state.showForm ? this.renderForm() : this.renderGame()}
      </div>
    );
  }
}

export default PintarrajearComponent;
