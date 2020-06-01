import React, { Component } from "react";
import RoomService from "../../services/RoomService";
import "bootstrap/dist/css/bootstrap.min.css";

class StartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sala: "",
      player: "",
    };
  }

  handleSubmit = (event) => {
    console.log("se apreto crear sala");
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
      <div
        className=""
        style={{
          height: window.innerHeight,
          backgroundColor: "#b92b27",
          background: "linear-gradient(to right, #b92b27, #1565c0)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="w-25 p-5"
          style={{
            fontFamily: "Poppins-Regular, sans-serif",
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "1px solid",
            boxShadow: "4px 4px 4px 2px",
          }}
        >
          <div>
            <h3 style={{ fontWeight: "bold" }}>Pinta Web</h3>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <form onSubmit={this.handleSubmit}>
              <div
                className="form-group row pt-4"
                style={{
                  position: "relative",
                  borderBottom: "2px solid #adadad",
                }}
              >
                <input
                  style={{
                    border: "1px solid #FFFFFF",
                  }}
                  className="form-control"
                  type="text"
                  placeholder="Nombre de la sala"
                  onChange={this.handleChangeSala}
                />
              </div>

              <div
                className="form-group row"
                style={{
                  position: "relative",
                  borderBottom: "2px solid #adadad",
                }}
              >
                <input
                  style={{ border: "1px solid #FFFFFF" }}
                  className="form-control"
                  type="text"
                  placeholder="Nombre del jugador"
                  onChange={this.handleChangePlayer}
                />
              </div>
              <div
                style={{
                  marginTop: "35px",
                  display: "block",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "25px",
                }}
              >
                <input
                  className="btn btn-dark"
                  type=""
                  style={{
                    border: "1px solid",
                    backgroundColor: "#b92b27",
                    background: "linear-gradient(to right, #b92b27, #1565c0)",
                    fontFamily: "Poppins-Medium",
                    fontSize: "20px",
                    lineHeight: 1.2,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                  type="submit"
                  value="Crear Sala"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default StartComponent;
