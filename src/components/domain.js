import React from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Domain extends React.Component {
  constructor() {
    super();
    this.state = {
      domains: [],
    };
  }

  componentDidMount() {
    fetch(
      `http://wbdv-generic-server.herokuapp.com/api/${this.props.userId}/${this.props.domainName}`
    )
      .then((response) => response.json())
      .then((items) => this.setState({ domains: items }));
  }

  addDomain() {
    return fetch(
      `http://wbdv-generic-server.herokuapp.com/api/${this.props.userId}/${this.props.domainName}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((response) => response.json());
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
        <h1>{this.props.domainName}</h1>
        <Button
          onClick={() =>
            this.props.history.push(`/${this.props.userId}/domain`)
          }
        >
          Back
        </Button>
        <ul class="list-group">
          {this.state.domains.map((item) => {
            return (
              <div>
                <li class="list-group-item row d-flex justify-content-between">
                  <Link
                    class="col"
                    to={`/${this.props.userId}/${item}/${item._id}/list`}
                  >
                    {item._domain}
                  </Link>
                  <Button class="col" variant="warning">
                    Edit
                  </Button>
                </li>
              </div>
            );
          })}
        </ul>
        <Button onClick={() => {this.addDomain()}}>Add {this.props.domainName}</Button>
      </div>
    );
  }
}

export default Domain;
