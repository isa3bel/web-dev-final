import React from "react";
import logo from "../logo.svg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../App.css";
import Users from "../components/users";
import Landing from "../components/landing";
import Details from "../components/details";
import Domain from "../components/domain";
class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount = () => {
    fetch("http://wbdv-generic-server.herokuapp.com/shh/nuids")
      .then((response) => response.json())
      .then((people) =>
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
            render={() => <Users users={this.state.users} />}
          ></Route>
          <Route
            path="/:userId/domain"
            exact={true}
            render={(props) => (
              <Landing {...props} userId={props.match.params.userId} />
            )}
          ></Route>
          <Route
            path="/:userId/domain/:header"
            exact={true}
            render={(props) => (
              <Details
                {...props}
                userId={props.match.params.userId}
                header={props.match.params.header}
              />
            )}
          ></Route>
          <Route
            path="/:userId/:header/list"
            exact={true}
            render={(props) => (
              <Details
                {...props}
                userId={props.match.params.userId}
                header={props.match.params.header}
                itemId={props.match.params.itemId}
              />
            )}
          ></Route>
          <Route
            path="/:userId/:header/:itemId/list"
            exact={true}
            render={(props) => (
              <Details
                {...props}
                userId={props.match.params.userId}
                header={props.match.params.header}
                itemId={props.match.params.itemId}
              /> // goes here when I click on a specific row in the domain page
            )}
          ></Route>
          <Route
            path="/:userId/domains/:domainName"
            exact={true}
            render={(props) => (
              <Domain
                {...props}
                userId={props.match.params.userId}
                domainName={props.match.params.domainName}
              /> //goes here when i click on add domain in landing page
            )}
          ></Route>
        </Router>
      </div>
    );
  }
}

export default Container;
