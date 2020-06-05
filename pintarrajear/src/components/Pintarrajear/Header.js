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
      <div className="header-component boxbox">
        <h4>{this.props.roomName}</h4>
      </div>
    );
  }
}

export default Header;
