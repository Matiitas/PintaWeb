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
    let stroke = "";
    let strokeWeight = 0;

    p.setup = () => {
      p.createCanvas(450, 380);
      p.background(255);
    };

    p.draw = () => {};

    p.mouseDragged = () => {
      if (p.mouseButton === p.LEFT) {
        if (!this.state.showFloatEraser) {
          p.stroke("black");
          p.strokeWeight(2);
          p.fill(0);
          p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
          stroke = "black";
          strokeWeight = 2;
        } else {
          p.stroke("white");
          p.strokeWeight(15);
          p.fill(0);
          p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
          stroke = "white";
          strokeWeight = 15;
        }
        SocketService.emit("drawing", {
          x: p.mouseX,
          y: p.mouseY,
          xx: p.pmouseX,
          yy: p.pmouseY,
          stroke: stroke,
          strokeWeight: strokeWeight,
        });
      }
    };

    SocketService.on("new-drawing", (data) => {
      p.stroke(data.stroke);
      p.strokeWeight(data.strokeWeight);
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
    this.setState({ cursorX: e.layerX - 15, cursorY: e.layerY - 15 });
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
        style={{ cursor: this.state.showFloatEraser ? "none" : "auto" }}
      >
        <div
          style={{
            backgroundColor: "brown",
            position: "relative",
            zIndex: "1",
            cursor: "auto",
          }}
        >
          <div
            id="eraser"
            onClick={this.handleOnClickEraser.bind(this)}
            style={
              {
                //opacity: this.state.showFloatEraser ? 0 : 1,
              }
            }
          >
            <img
              src={require("../../assets/img/eraser.svg")}
              style={{ transform: "rotate(90deg)", cursor: "pointer" }}
            />
          </div>
        </div>

        <div ref={this.createBlackBoard}>
          <div
            id="float-eraser"
            style={{
              backgroundColor: "red",
              position: "absolute",
              left: this.state.cursorX,
              top: this.state.cursorY,
              background: "none",
              display: this.state.showFloatEraser ? "block" : "none",
            }}
          >
            <img
              src={require("../../assets/img/eraser.svg")}
              style={{
                transform: "rotate(90deg)",
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BlackBoard;
