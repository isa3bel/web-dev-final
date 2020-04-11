import React from "react";
import logo from "../logo.svg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../App.css";
import Users from "../components/users";
class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount = () => {
    fetch("http://wbdv-generic-server.herokuapp.com/shh/nuids").then(response => response.json()).then(people =>
      this.setState({
        users: people,
      })
    );
    //console.log(JSON.stringify(this.state.users))
  };

  render() {
    return (
      <div>
        <Router>
          <Route
            path="/"
            exact={true}
            render={() => 
              <Users users={this.state.users}/>}
          ></Route>
        </Router>
      </div>
    );
  }
}

export default Container;
