import React, { Component } from "react";

//<></div>

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <h3> {this.props.roomName} </h3>;
  }
}

export default Header;
