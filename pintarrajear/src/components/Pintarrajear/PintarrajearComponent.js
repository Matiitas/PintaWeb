import React, { Component } from "react";
import SocketService from "../../services/SocketService";
import Ranking from "./Ranking";
import BlackBoard from "./BlackBoard";
import Chat from "./Chat";
import Header from "./Header";
import UserService from "../../services/UserService";
import RoomService from "../../services/RoomService";
import "../../assets/styles/pintarrajearComponent.css";

class PintarrajearComponent extends Component {
  constructor(props) {
    super(props);

    const room = RoomService.getRoom();

    this.state = {
      showForm: !UserService.getIsRegistered(),
      loading: false,
      name: "",
      roomName: room ? room.name : "Algun nombre",
      players: room ? room.users : [{ username: "Matias", points: 0 }],
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
      <div className="container">
        <Header roomName={this.state.roomName} />
        <Ranking players={this.state.players} />
        <BlackBoard />
        <Chat username={this.state.name} />
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
    return <div>{this.renderGame()}</div>;
  }
}
//{this.state.showForm ? this.renderForm() : this.renderGame()}
export default PintarrajearComponent;
