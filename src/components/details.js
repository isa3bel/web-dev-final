import React from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DetailRow from "./detailRow";
class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      items2: [],
    };
  }

  componentDidMount() {
    fetch(
      `http://wbdv-generic-server.herokuapp.com/api/${this.props.userId}/${this.props.header}`
    )
      .then((response) => response.json())
      .then((items) => this.setState({ items2: items }));
  }

  addDomain() {
    return fetch(
      `http://wbdv-generic-server.herokuapp.com/api/${this.props.userId}/${this.props.header}`,
      {
        method: "POST",
        body: "{}",
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((response) => response.json()).then(status => this.setState({items2: this.state.items2.push(status)}));
  }

  render() {
    return (
      <div class="container">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous"
        />
        <h1>{this.props.header}</h1>
        <Button
          variant="primary"
          onClick={() =>
            this.props.history.push(`/${this.props.userId}/domain`)
          }
        >
          Back
        </Button>
        <ul class="list-group">
          {this.state.items2.map((item) => {
            return (
              <DetailRow
                itemId={this.props.itemId}
                item={item}
                userId={this.props.userId}
                header={this.props.header}
              />
            );
          })}
        </ul>
        <Button
          onClick={() => {
            this.addDomain();
          }}
        >
          Add {this.props.header}
        </Button>
      </div>
    );
  }
}

export default Details;
