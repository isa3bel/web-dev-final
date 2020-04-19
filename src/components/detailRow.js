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
      fields2: [],
      existingField: "",
      selected: false
    };
  }

  componentDidMount() {
    this.getAllFields();
  }
  isEditing() {
    this.setState({ editing: !this.state.editing });
  }

  clickedSave() {
    this.setState({ editing: !this.state.editing });
    //console.log(this.state.existingField);
    if (this.state.newField && this.state.newField !== "") {
      this.props.item[this.state.newField] = this.state.newFieldValue;
    }
    console.log(this.props.item);
    this.state.newField = "";
    this.state.newfieldValue = "";
    fetch(
      `http://wbdv-generic-server.herokuapp.com/api/${this.props.userId}/${this.props.header}/${this.props.item._id}`,
      {
        method: "PUT",
        body: JSON.stringify(this.props.item),
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((response) => response.json());
  }

  change = (e) => {
    this.props.item[e.target.name] = e.target.value;
  };

  getAllFields() {
    const arrayOfFields = Object.keys(this.props.item).filter(
      (field) => !field.startsWith("_")
    );
    return arrayOfFields;
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
      <li class="list-group-item" style={{
        backgroundColor: this.props.item._id === this.props.itemId ? "lightblue" : "white"
      }} key={this.props.item._id}>
        <div class="row">
          {!this.state.editing &&
            this.getAllFields().map((item) => (
              <div class="col">
                <span>
                  <Link
                    class="col"
                    to={`/${this.props.userId}/${this.props.header}/${this.props.item._id}/list`}
                  >
                    {this.props.item[item] + ""}
                  </Link>
                </span>
              </div>
            ))}
          {this.state.editing && (
            <div class="col-10">
              <ul class="list-group">
                <li class="list-group-item">
                  {Object.keys(this.props.item)
                    .filter((field) => !field.startsWith("_"))
                    .map((item) => (
                      <div class="form-group row">
                        <label
                          class="col-sm-2 col-form-label"
                          for="inputPassword"
                        >
                          {item}
                        </label>
                        <div class="col-sm-10">
                          <input
                            onChange={this.change}
                            name={item}
                            defaultValue={this.props.item[item]}
                            class="form-control"
                            id="inputPassword"
                            type="text"
                          />
                        </div>
                      </div>
                    ))}
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
        </div>
      </li>
    );
  }
}

export default DetailRow;
