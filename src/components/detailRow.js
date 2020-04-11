import React from "react";
import { Button, FormControl } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class DetailRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      newField: "",
      newFieldValue: "",
    };
  }

  isEditing() {
    this.setState({ editing: !this.state.editing });
  }

  clickedSave() {
    this.setState({ editing: !this.state.editing });
    fetch(
      `http://wbdv-generic-server.herokuapp.com/api/${this.props.userId}/${this.props.header}/${this.props.item._id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          [this.state.newField]: this.state.newFieldValue,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((response) => response.json());
  }

  clickedDelete() {
    fetch(
      `http://wbdv-generic-server.herokuapp.com/api/${this.props.userId}/${this.props.header}/${this.props.item._id}`,
      {
        method: "DELETE",
      }
    ).then((response) => response.json());
  }

  updateForm(newState) {
    this.setState(newState);
  }

  render() {
    return (
      <li
        class="list-group-item d-flex justify-content-between"
        key={this.props.item._id}
      >
        {!this.state.editing && (
          <Link
            class="col"
            to={`/${this.props.userId}/${this.props.header}/${this.props.item._id}/list`}
          >
             {console.log(this.props.item)}
          </Link>
        )}
        {!this.state.editing && (
          <Button
            class="col"
            variant="warning"
            onClick={() => this.isEditing()}
          >
            Edit
          </Button>
        )}
        {this.state.editing && (
          <div class="col d-flex justify-content-around">
            <FormControl
              placeholder="New Field"
              onChange={(e) =>
                this.updateForm({
                  newField: e.target.value,
                })
              }
            />
            <FormControl
              placeholder="New FieldValue"
              onChange={(e) =>
                this.updateForm({
                  newFieldValue: e.target.value,
                })
              }
            />
            <div>
              <Button variant="danger" class="row" onClick={() => this.clickedDelete()}>
                Delete
              </Button>
              <Button
                variant="success"
                class="row"
                onClick={() => this.clickedSave()}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </li>
    );
  }
}

export default DetailRow;
