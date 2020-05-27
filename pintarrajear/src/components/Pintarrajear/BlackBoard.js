import React, { Component } from "react";
import p5 from "p5";
import SocketService from "../../services/SocketService";

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
      button.mousePressed(resetCanvas);
      p.createCanvas(500, 400);
      p.background(255);
    };

    p.draw = () => {
      // if (p.mouseIsPressed) {
      //   if (p.mouseButton === p.LEFT) {
      //     p.stroke(0);
      //     p.strokeWeight(2);
      //     p.fill(0);
      //     p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      //   }
      // }
    };

    p.mouseDragged = () => {
      if (p.mouseButton === p.LEFT) {
        SocketService.emit("drawing", {
          x: p.mouseX,
          y: p.mouseY,
          xx: p.pmouseX,
          yy: p.pmouseY,
        });
        p.stroke(0);
        p.strokeWeight(2);
        p.fill(0);
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      }
    };

    SocketService.on("new-drawing", (data) => {
      p.stroke(0);
      p.strokeWeight(2);
      p.fill(0);
      p.line(data.x, data.y, data.xx, data.yy);
      //p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
    });

    SocketService.on("clear", () => {
      p.clear();
      p.createCanvas(500, 400);
      p.background(255);
    });

    //SocketService.emit("clear-canvas");

    function resetCanvas() {
      SocketService.emit("clear-canvas");
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
