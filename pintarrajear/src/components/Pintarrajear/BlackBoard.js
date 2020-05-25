import React, { Component } from "react";
import p5 from "p5";

class BlackBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.createBlackBoard = this.createBlackBoard.bind(this);
  }

  sketch = (p) => {
    p.setup = () => {
      p.createCanvas(500, 400);
      p.background(255);
    };

    p.draw = () => {
      if (p.mouseIsPressed === true) {
        p.stroke(0);
        p.fill(0);
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      }
    };
  };

  createBlackBoard(element) {
    new p5(this.sketch, element);
  }

  render() {
    return (
      <div
        className="col-12 col-lg-6 d-flex"
        style={{
          justifyContent: "center",
          border: "5px solid",
        }}
      >
        <div ref={this.createBlackBoard}></div>
      </div>
    );
  }
}

export default BlackBoard;
