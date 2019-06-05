import React, { Component } from 'react';
//import PropTypes from "prop-types";
import "./Task.css";
import { AppContext } from '../context/Context';

class Task extends Component {

  constructor(props) {
    super(props);
    this.task = props.task;
    this.token = props.token;
    this.host = props.host;
  }

  renderContactEmpty(contact) {
    return <div className="badge badge-pill badge-warning">{contact}</div>;
  }

  renderContactFull(contact, contact_email) {
    return (
      <div className="badge badge-pill badge-success">
        <a href={"mailto:" + contact_email} title={contact_email}>
          {contact}
        </a>
      </div>
    );
  }

  renderEdit() {
    return (
      <span>
        <a href={"https://" + this.host + "/app/task/" + this.task.token} target="_blank" rel="noopener noreferrer">
          <img src="./assets/pencil.svg" alt="Edit"></img>
        </a>
        &nbsp;&nbsp;&nbsp;
      </span>
    );
  }

  renderEditEmpty() {
    return (
      <span>
      </span>
    );
  }

  render() {
    return (
      <div className="card task-card">
        <div className="card-header task-card" id={"heading_" + this.task.id}>
          <AppContext.Consumer>
            {({ edit_icon }) => (
              edit_icon ? this.renderEdit() : this.renderEditEmpty()
            )}
          </AppContext.Consumer>
          {this.task.name}&nbsp;&nbsp;&nbsp;
            {this.task.contact_email === "."
            ? this.renderContactEmpty(this.task.contact)
            : this.renderContactFull(this.task.contact, this.task.contact_email)}
        </div>
        <AppContext.Consumer>
          {({ task_details }) => (
            <div
              id={"collapse_" + this.task.id}
              className={task_details ? "collapse show" : "collapse"}
              aria-labelledby={"heading_" + this.task.id}
              data-parent="#accordionTask"
            >
              <div className="card-body">
                <span className="task_note">
                  <div dangerouslySetInnerHTML={{ __html: this.task.notes_html }} />
                </span>
              </div>
            </div>
          )}
        </AppContext.Consumer>
      </div>
    );
  }
}

export default Task;

