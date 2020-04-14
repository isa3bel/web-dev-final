import React from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class DomainRow extends React.Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      fieldTypeOptions: [
        { label: "String", value: "String" },
        { label: "Number", value: "Number" },
        { label: "Date", value: "Date" },
        { label: "Boolean", value: "Boolean" },
      ],
      newField: {
        name: "",
        type: "String",
      },
      schema: [],
    };
  }
  componentDidMount() {
    //console.log(this.props.item._)
  }

  isEditing(domain) {
    this.setState({ editing: !this.state.editing });
  }

  clickedSave(domain) {
    this.setState({ editing: !this.state.editing });
    fetch(
      `http://wbdv-generic-server.herokuapp.com/schemas/${this.props.userId}/${domain}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ fields: this.schemas }),
      }
    )
      .then((response) => response.json())
      .then((schema) => console.log(schema));
  }

  clickedDelete() {}

  updateForm(newState) {
    this.setState(newState);
  }

  getSchemas = () => {
    fetch(
      `http://wbdv-generic-server.herokuapp.com/schemas/${this.props.userId}/${this.props.item}`
    )
      .then((response) => response.json())
      .then((status) => this.setState({ schema: status }));
  }

  render() {
    return (
      <li class="list-group-item">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous"
        />
        {!this.state.editing && (
          <div class="row">
            <div class="col-8">
              <Link
                class="col"
                to={`/${this.props.userId}/${this.props.item}/list`}
              >
                {this.props.item}
              </Link>
            </div>
            <div class="col-4">
              <Button
                variant="warning"
                onClick={() => {
                  this.isEditing();
                  this.getSchemas();
                }}
                class="float-right"
              >
                Edit
              </Button>
            </div>
          </div>
        )}
        {this.state.editing && (
          <div class="row">
            <div class="col-8">
              <label for="collection-name">Domain:</label>
              <input id="collection-name" class="form-control" />
            </div>
            <div class="col-4">
              <button class="btn btn-danger float-right">Delete</button>
              <button
                class="btn btn-success float-right"
                onClick={() => this.clickedSave(this.props.item)}
              >
                Save
              </button>
              <button class="btn btn-info float-right" onClick={() => this.isEditing()}>Cancel</button>
            </div>
          </div>
        )}
        {this.state.editing && (
          <div class="row">
            <div class="col-12">
              <hr />
            </div>
            <div class="col-4">Field Name</div>
            <div class="col-4">Type</div>
            <div class="col-4"></div>
          </div>
        )}
        {/*Object.keys(this.state.schema).map((item, i) => {console.log(this.state.schema[i])})*/}
        {this.state.editing && (
          <div class="row">
            <div class="col-4">
              <input class="form-control" placeholder="New Field" />{" "}
              {/*this needs to change*/}
            </div>
            <div class="col-4">
              <select class="form-control" name="fieldTypeOption">
                {this.state.fieldTypeOptions.map((val) => (
                  <option>{val.label}</option>
                ))}
              </select>
            </div>
            <div class="col-4">
              <button
                class="btn btn-success float-right" /*onClick={() => this.addField()}*/
              >
                Add
              </button>
            </div>
          </div>
        )}
      </li>
    );
  }
}

export default DomainRow;
