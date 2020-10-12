import React from "react";
import {
  Divider,
  Form,
  Grid,
  Icon,
  Segment,
  TextArea,
} from "semantic-ui-react";
import "./styles/Start.css";

export default function Start() {
  return (
    <div>
      <h1 className="titel">Automatische Markierung von Texten</h1>
      <Segment>
        <Grid columns={2} relaxed="very" verticalAlign="middle">
          <Grid.Column>
            <Form>
              <TextArea
                placeholder="Geben Sie hier einen Text ein"
                className="AppInput"
              />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <TextArea
                readOnly
                placeholder="Hier wird der markierte Text erscheinen"
                className="AppInput"
              />
            </Form>
          </Grid.Column>
        </Grid>
        <Divider vertical>
          <Icon name="arrow circle right"></Icon>
        </Divider>
      </Segment>
    </div>
  );
}
