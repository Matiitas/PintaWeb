import React, { Component } from "react";
import SocketService from "../services/SocketService";

class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sala: "",
      player: "",
    };
  }

  handleSubmit = (event) => {
    const { sala, player } = this.state;
    SocketService.emit(
      "create-room",
      { username: player, room: sala },
      (response) => this.props.history.push("/room/" + response.roomId)
    );
    event.preventDefault();
  };

  handleChangeSala = (event) => {
    this.setState({ sala: event.target.value });
  };

  handleChangePlayer = (event) => {
    this.setState({ player: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Sala:
          <input
            type="text"
            placeholder="Nombre de la sala"
            onChange={this.handleChangeSala}
          />
        </label>
        <br />
        <label>
          Jugador:
          <input
            type="text"
            placeholder="Nombre del jugador"
            onChange={this.handleChangePlayer}
          />
        </label>
        <br />
        <input type="submit" value="Crear Sala" />
      </form>
    );
  }
}

export default Start;
