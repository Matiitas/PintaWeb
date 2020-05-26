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
      var button = p.createButton("Borrar");
      button.position(0, 0);
      button.style("background-color", "brown");
      button.style("color", "white");
      resetCanvas();
      button.mousePressed(resetCanvas);
    };

    p.draw = () => {
      if (p.mouseIsPressed) {
        if (p.mouseButton === p.LEFT) {
          p.stroke(0);
          p.strokeWeight(2);
          p.fill(0);
          p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        }
      }
    };

    function resetCanvas() {
      p.clear();
      p.createCanvas(500, 400);
      p.background(255);
    }
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
