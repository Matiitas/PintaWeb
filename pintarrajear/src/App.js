import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import StartComponent from "./components/start.component";
import PintarrajearComponent from "./components/pintarrajear.component";

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={StartComponent} />
        <Route path="/pintarrajear" exact component={PintarrajearComponent} />
      </div>
    </Router>
  );
} // component={unComponente} que será el que se mostrará cuando se vaya a la url.

export default App;
