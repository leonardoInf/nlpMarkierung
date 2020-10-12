import React from "react";
import { Container, Menu } from "semantic-ui-react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Start from "./Start";
import Impressum from "./Impressum";
import GrayBackground from "../assets/background.jpg";
import "./styles/App.css";

export default class App extends React.Component {
  state = { background: `url(${GrayBackground})` };
  restoreBackground = () =>
    this.setState({ background: `url(${GrayBackground})` });
  clearBackground = () => this.setState({ background: "none" });

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
              <Menu.Item as={Link} to="/" onClick={this.restoreBackground}>
                Textmarker
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/impressum"
                onClick={this.clearBackground}
              >
                Impressum
              </Menu.Item>
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
