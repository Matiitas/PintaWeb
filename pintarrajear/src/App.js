import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import StartComponent from "./components/Start/StartComponent";
import PintarrajearComponent from "./components/Pintarrajear/PintarrajearComponent";

function App() {
  return (
    <Router>
      <Route path="/" exact component={StartComponent} />
      <Route path="/room/:roomId" exact component={PintarrajearComponent} />
    </Router>
  );
} // component={unComponente} que será el que se mostrará cuando se vaya a la url.

export default App;
