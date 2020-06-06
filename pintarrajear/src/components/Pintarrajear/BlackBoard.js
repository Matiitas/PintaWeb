import React, { Component } from "react";
import p5 from "p5";
import SocketService from "../../services/SocketService";
import "../../assets/styles/pintarrajearComponent.css";

class BlackBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.createBlackBoard = this.createBlackBoard.bind(this);
  }

  sketch = (p) => {
    p.setup = () => {
      p.createCanvas(450, 380);
      p.background(255);
    };

    p.draw = () => {};

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
      p.createCanvas(450, 380);
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
      <div className="board-component boxbox">
        <div style={{ textAlign: "center" }}>
          <h4>Contador y Palabra</h4>
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <img src={require("../../assets/img/eraser.svg")} />
          </div>

          <div
            style={{ border: "3px solid black", display: "flex" }}
            ref={this.createBlackBoard}
          />
        </div>
      </div>
    );
  }
}

export default BlackBoard;
