import React, { Component } from "react";
import RoomService from "../../services/RoomService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/startComponent.css";

class StartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sala: "",
      player: "",
    };
  }

  handleSubmit = (event) => {
    console.log("se apreto crear sala", this.state.sala);
    const { sala, player } = this.state;
    RoomService.createRoom({ player, sala }, (response) =>
      this.props.history.push("/room/" + response.room.uuid)
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
      <div className="global-div">
        <div className="box-outer p-5">
          <div>
            <h3 className="pb-4 box-inner-title">Pinta Web</h3>
          </div>
          <div className="box-form">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row input-box-line">
                <input
                  className="input100"
                  type="text"
                  required
                  onChange={this.handleChangeSala}
                />
                <span
                  className="focus-input100"
                  data-placeholder="Nombre de la sala"
                ></span>
              </div>

              <div className="form-group row input-box-line">
                <input
                  className="input100"
                  type="text"
                  required
                  onChange={this.handleChangePlayer}
                />
                <span
                  className="focus-input100"
                  data-placeholder="Nombre del jugador"
                ></span>
              </div>
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn" />
                  <input
                    className="login100-form-btn"
                    type="submit"
                    value="Crear Sala"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default StartComponent;
