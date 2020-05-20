import React, { Component } from "react";

//<>
class Start extends Component {
  state = {
    sala: "",
    player: "",
  };

  handleSubmit = (event) => {
    //aca se enviaria al socket??
    //hago consolelog para probar que funciona
    console.log("Nombre de sala:", this.state.sala);
    console.log("Nombre de jugador:", this.state.player);
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
            value={this.state.sala}
            onChange={this.handleChangeSala}
          />
        </label>
        <br />
        <label>
          Jugador:
          <input
            type="text"
            placeholder="Nombre del jugador"
            value={this.state.player}
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
