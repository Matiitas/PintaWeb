import React, { Component } from "react";

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="col-12 col-lg-2 d-block"
        style={{
          textAlign: "center",
        }}
      >
        <h3> Posiciones </h3>
        {this.props.players
          .sort((a, b) => (a.points < b.points ? 1 : -1))
          .map(this.renderPositions)}
      </div>
    );
  }

  renderPositions(player) {
    return (
      <h5>
        {" "}
        {player.name} : {player.points}{" "}
      </h5>
    );
  }
}

export default Ranking;
