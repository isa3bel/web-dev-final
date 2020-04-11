import React from "react";
import { Button, InputGroup, FormControl, Row } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      domainName: "",
      domains: []
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
            return (
              <div>
                <li class="list-group-item row d-flex justify-content-between">
                  <Link class="col" to={`/${this.props.userId}/domain/${item}`}>
                    {item}
                  </Link>
                  <Button class="col" variant="warning">
                    Edit
                  </Button>
                </li>
              </div>
            );
          })}
          <li class="list-group-item row">
            <FormControl class="col"
              onChange={(e) =>
                this.updateNameForm({
                  domainName: e.target.value,
                })
              }
            />
            <Button class="col" onClick={() => this.props.history.push(`/${this.props.userId}/domains/${this.state.domainName}`)}>Add domain</Button>
          </li>
        </ul>
      </div>
    );
  }
}

export default Landing;
