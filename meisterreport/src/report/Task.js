import React from 'react';
//import PropTypes from "prop-types";
import "./Task.css";
import { AppContext } from '../context/Context';

class Task extends React.Component {

  constructor(props) {
    super(props);
    this.task = props.task;
    this.token = props.token;
    this.host = props.host;
    this.state = {isVisible: true};

    this.onClickHide = this.onClickHide.bind(this);
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

  onClickHide() {
    this.setState({isVisible: false});
  }

  renderEdit() {
    return (
      <span>
        <a href={"https://" + this.host + "/app/task/" + this.task.token} target="_blank" rel="noopener noreferrer">
          <img src="./assets/pencil.svg" alt=""></img>
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

  renderHide() {
    return (
      <span>
        <img src="./assets/hide.svg" alt="" width="14" height="16" onClick={this.onClickHide.bind(this)}></img>
        &nbsp;&nbsp;&nbsp;
      </span>
    );
  }

  renderHideEmpty() {
    return (
      <span>
      </span>
    );
  }

  renderStatus(status){
    if (status === 2) {
      return (<span className="badge badge-warning">Terminé</span>);
    }
    else {
      return;
    }

  }

  render() {
    if (this.state.isVisible === false)
    {
      return "";
    }
    else
    {
      return (
        <div className="card task-card">
          <div className="card-header task-card" id={"heading_" + this.task.id}>
            <AppContext.Consumer>
              {({ edit_icon }) => (
                edit_icon ? this.renderEdit() : this.renderEditEmpty()
              )}
            </AppContext.Consumer>
            <AppContext.Consumer>
              {({ show_hide }) => (
                show_hide ? this.renderHide() : this.renderHideEmpty()
              )}
            </AppContext.Consumer>
            {this.task.name}&nbsp;&nbsp;
              {this.renderStatus(this.task.status)}&nbsp;&nbsp; 
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
}

export default Task;

