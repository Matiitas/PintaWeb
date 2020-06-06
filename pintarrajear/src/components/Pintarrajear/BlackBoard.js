import React, { Component } from "react";
import p5 from "p5";
import SocketService from "../../services/SocketService";
import "../../assets/styles/pintarrajearComponent.css";

class BlackBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorX: 0,
      cursorY: 0,
      showFloatEraser: false,
    };

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

  setCursorPosition(e) {
    this.setState({ cursorX: e.layerX, cursorY: e.layerY });
  }

  handleOnClickEraser() {
    console.log("entre");

    this.setState({ showFloatEraser: true });
  }

  render() {
    return (
      <div
        className="board-component boxbox"
        onMouseMove={(e) => this.setCursorPosition(e.nativeEvent)}
      >
        <div style={{ textAlign: "center" }}>
          <h4>Contador y Palabra</h4>
        </div>
        <div style={{ display: "flex", position: "relative", zIndex: "1" }}>
          <div style={{ display: "flex", alignItems: "flex-start", width: 40 }}>
            <div
              id="eraser"
              onClick={this.handleOnClickEraser.bind(this)}
              style={{ opacity: this.state.showFloatEraser ? 0 : 1 }}
            >
              <img
                src={require("../../assets/img/eraser.svg")}
                style={{ transform: "rotate(90deg)" }}
              />
            </div>
          </div>

          <div
            style={{ border: "3px solid black", display: "flex" }}
            ref={this.createBlackBoard}
          >
            <div
              id="float-eraser"
              style={{
                backgroundColor: "red",
                position: "absolute",
                left: this.state.cursorX,
                top: this.state.cursorY,
                display: this.state.showFloatEraser ? "block" : "none",
              }}
            >
              <img
                src={require("../../assets/img/eraser.svg")}
                style={{ transform: "rotate(90deg)" }}
              />
            </div>
          </div>

          <div style={{ width: 40 }}></div>
        </div>
      </div>
    );
  }
}

export default BlackBoard;
