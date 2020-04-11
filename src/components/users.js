import React from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Users extends React.Component {
  render() {
    return (
      <div class="container">
        <h1>Users</h1>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous"
        />
        <ul class="list-group">
          {this.props.users.map((user) => {
            return (
              <div>
                <li class="list-group-item">
                  <Link to={`/${user}/domain`}>{user}</Link>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Users;
