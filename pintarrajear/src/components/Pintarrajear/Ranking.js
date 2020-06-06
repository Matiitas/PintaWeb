import React, { Component } from "react";
import "../../assets/styles/pintarrajearComponent.css";

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ranking-component boxbox">
        <div>
          <h4> Posiciones </h4>
        </div>
        {this.props.players
          .sort((a, b) => (a.points < b.points ? 1 : -1))
          .map(this.renderPositions)}
      </div>
    );
  }

  renderPositions(player, index) {
    return (
      <h5 key={index}>
        {" "}
        {player.username} : {player.points}{" "}
      </h5>
    );
  }
}

export default Ranking;
