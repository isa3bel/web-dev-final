import React from "react";
import { Button, InputGroup, FormControl, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DomainRow from "./domainRow";
class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      domainName: "",
      domains: [],
    };
  }

  componentDidMount() {
    fetch(
      `http://wbdv-generic-server.herokuapp.com/shh/nuids/${this.props.userId}/domains`
    )
      .then((response) => response.json())
      .then((items) => this.setState({ items: items }));
  }

  updateNameForm = (newState) => {
    console.log(this.state.domainName);
    this.setState(newState);
  };

  render() {
    return (
      <div class="container">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous"
        />
        <h1>Domains for {this.props.userId}</h1>
        <Button variant="primary" onClick={() => this.props.history.push(`/`)}>
          Back
        </Button>
        <ul class="list-group">
          {this.state.items.map((item) => {
            return <DomainRow item={item} userId={this.props.userId} />;
          })}
          <li class="list-group-item">
            <div class="row">
              <div class="col-10">
                <input
                  class="form-control"
                  onChange={(e) =>
                    this.updateNameForm({
                      domainName: e.target.value,
                    })
                  }
                ></input>
              </div>
              <div class="col-2">
                <button
                  class="btn btn-primary btn-block"
                  onClick={() =>
                    this.props.history.push(
                      `/${this.props.userId}/domains/${this.state.domainName}`
                    )
                  }
                >
                  Add Domain
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Landing;
