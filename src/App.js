import React, { Component } from "react";
import "./App.css";
import SpaceXProjects from "./Components/SpacexProjects/SpacexProjects"
import Footer from "./Components/Footer/Footer";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <SpaceXProjects></SpaceXProjects>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default App;
