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
      items: [],
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
      // <div>
      //   {this.state.items.length !== 0 &&
      //     this.state.items.map((i) => (
      //       <li class="list-group-item">
      //         <div class="row">

      //         </div>
      //       </li>
      //     ))}
      // </div>

      <li class="list-group-item" key={this.props.item._id}>
        <div class="row">
          {!this.state.editing && (
            <div class="col">
              <span>
                <Link
                  class="col"
                  to={`/${this.props.userId}/${this.props.header}/${this.props.item._id}/list`}
                >
                  {this.props.item.title}
                </Link>
              </span>
            </div>
          )}
          {this.state.editing && (
            <div class="col-10">
              <ul class="list-group">
                <li class="list-group-item">
                  <div class="form-group row">
                    <label class="col-sm-2" for="inputPassword">
                      Field here needs to change
                    </label>
                    <div class="col-sm-10">
                      <input
                        class="form-control"
                        id="inputPassword"
                        type="text"
                      />
                    </div>
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="form-group row">
                    <div class="col-sm-2">
                      <input
                        onChange={(e) =>
                          this.updateForm({
                            newField: e.target.value,
                          })
                        }
                        class="form-control"
                        id="newField"
                        placeholder="New Field"
                      />
                    </div>
                    <div class="col-sm-10">
                      <input
                        onChange={(e) =>
                          this.updateForm({
                            newFieldValue: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="New field value"
                        class="form-control"
                      ></input>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          )}
          <div class="col-2">
            {!this.state.editing && (
              <button
                class="btn btn-warning btn-block float-right"
                onClick={() => this.isEditing()}
              >
                Edit
              </button>
            )}
            <span class="float-right">
              {this.state.editing && (
                <button
                  class="btn btn-danger btn-block float-right"
                  onClick={() => this.clickedDelete()}
                >
                  Delete
                </button>
              )}
              {this.state.editing && (
                <button
                  class="btn btn-success btn-block float-right"
                  onClick={() => this.clickedSave()}
                >
                  Save
                </button>
              )}
            </span>
          </div>

          {/* (
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
            )*/}
        </div>
      </li>
    );
  }
}

export default DetailRow;
