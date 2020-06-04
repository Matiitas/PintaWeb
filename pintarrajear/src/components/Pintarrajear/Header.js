import React, { Component } from "react";
import "../../assets/styles/pintarrajearComponent.css";

//<></div>

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h3> {this.props.roomName} </h3>
      </div>
    );
  }
}

export default Header;
