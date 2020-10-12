import React from "react";
import { Container, Menu } from "semantic-ui-react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Start from "./Start";
import Impressum from "./Impressum";
import GrayBackground from "../assets/background.jpg";
import "./styles/App.css";

export default class App extends React.Component {
  state = {
    background: `url(${GrayBackground})`,
    currentScreen: "hervorhebung",
  };
  restoreBackground = () =>
    this.setState({
      background: `url(${GrayBackground})`,
      currentScreen: "hervorhebung",
    });
  clearBackground = () =>
    this.setState({ background: "none", currentScreen: "impressum" });

  myMenuItem = () => {
    if (this.state.currentScreen === "hervorhebung") {
      return (
        <Menu.Item as={Link} to="/impressum" onClick={this.clearBackground}>
          Impressum
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item as={Link} to="/" onClick={this.restoreBackground}>
          Hervorhebung
        </Menu.Item>
      );
    }
  };

  render() {
    return (
      <div
        className="background"
        style={{ backgroundImage: this.state.background }}
      >
        <Container style={{ width: "70%" }}>
          <BrowserRouter>
            <Menu>
              <Menu.Item>
                <a href="https://braguinski.de" style={{ color: "black" }}>
                  braguinski.de
                </a>
              </Menu.Item>
              {this.myMenuItem()}
            </Menu>
            <Switch>
              <Route exact path="/">
                <Start />
              </Route>
              <Route path="/impressum">
                <Impressum />
              </Route>
            </Switch>
          </BrowserRouter>
        </Container>
      </div>
    );
  }
}
