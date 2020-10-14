import React from "react";
import {
  Divider,
  Form,
  Grid,
  Icon,
  Message,
  Segment,
  TextArea,
} from "semantic-ui-react";
import "./styles/Start.css";
import textmarker from "../api/textmarker";

export default class Start extends React.Component {
  state = { inputText: "", loading: false };

  typeInWaitTime = 800;
  outputNeedsUpdate = false;
  indices = [];

  onTextAreaChange = (e) => {
    this.setState({ inputText: e.target.value });
    if (this.t != null) clearTimeout(this.t);
    if (e.target.value.length > 3)
      this.t = setTimeout(this.sendText, this.typeInWaitTime);
  };

  sendText = async () => {
    this.setState({ loading: true });
    const res = await textmarker.post("/", {
      text: this.state.inputText.substring(0, 5000),
    });
    this.outputNeedsUpdate = true;
    this.indices = res.data;
    this.setState({ loading: false });
  };

  loadingMessage = () => {
    if (this.state.loading) {
      return (
        <Message icon>
          <Icon name="circle notched" loading />
          <Message.Content>
            <Message.Header>Bitte warten</Message.Header>
            Der Text wird syntaktisch analysiert.
          </Message.Content>
        </Message>
      );
    }
  };

  markedText = () => {
    if (this.outputNeedsUpdate) {
      const words = this.state.inputText.substring(0, 5000).split(" ");
      this.outputNeedsUpdate = false;
      return words.map((w, i) => {
        const word = `${w} `;
        if (this.indices.includes(i)) {
          return <strong key={`marked-word-${i}`}>{word}</strong>;
        } else {
          return <span key={`non-marked-word-${i}`}>{word}</span>;
        }
      });
    }
  };

  divider = () => {
    if (document.documentElement.clientWidth > 500) {
      return (
        <Divider vertical>
          <Icon name="arrow circle right"></Icon>
        </Divider>
      );
    }
  };

  render() {
    return (
      <div>
        <h1 className="titel">Automatische Hervorhebung von Wörtern</h1>
        <Segment>
          {this.loadingMessage()}
          <Grid columns={2} relaxed="very" verticalAlign="middle" stackable>
            <Grid.Column>
              <Form>
                <TextArea
                  placeholder="Geben Sie hier einen Text ein (max. 5000 Zeichen)"
                  className="AppTextbox"
                  onChange={this.onTextAreaChange}
                ></TextArea>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <div
                  readOnly
                  placeholder="Hier wird der Text mit Hervorhebungen erscheinen"
                  className="AppTextbox"
                  value={this.state.outputText}
                >
                  <p id="textOutput">{this.markedText()}</p>
                </div>
              </Form>
            </Grid.Column>
          </Grid>
          {this.divider()}
        </Segment>
      </div>
    );
  }
}
