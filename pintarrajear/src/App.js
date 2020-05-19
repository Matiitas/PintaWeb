import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UsernameComponent from "./components/username.component";
import PintarrajearComponent from "./components/pintarrajear.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={UsernameComponent} />
        <Route path="/pintarrajear" exact component={PintarrajearComponent} />
      </div>
    </Router>
  );
} // component={unComponente} que será el que se mostrará cuando se vaya a la url.

export default App;
