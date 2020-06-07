import React, { Component } from "react";

class CountAndWord extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="count-component boxbox" style={{ textAlign: "center" }}>
        <h4>Contador y Palabra</h4>
      </div>
    );
  }
}

export default CountAndWord;
