import React from "react";
import PropTypes from "prop-types";
import "./Task.css";

function renderContactEmpty(contact) {
  return <div className="badge badge-pill badge-warning">{contact}</div>;
}

function renderContactFull(contact, contact_email) {
  return (
    <div className="badge badge-pill badge-success">
      <a href={"mailto:" + contact_email} title={contact_email}>
        {contact}
      </a>
    </div>
  );
}

function Task(props) {
  return (
    <div className="card">
      <div className="card-header" id={"heading_" + props.task.id}>
        <button
          className="btn btn-link"
          data-toggle="collapse"
          data-target={"#collapse_" + props.task.id}
          aria-expanded="true"
          aria-controls={"collapse_" + props.task.id}
        >
          {props.task.name}&nbsp;&nbsp;&nbsp;
          {props.task.contact_email === "."
            ? renderContactEmpty(props.task.contact)
            : renderContactFull(props.task.contact, props.task.contact_email)}
        </button>
      </div>

      <div
        id={"collapse_" + props.task.id}
        className="collapse"
        aria-labelledby={"heading_" + props.task.id}
        data-parent="#accordionTask"
      >
        <div className="card-body">
          <span className="task_note">
            <div dangerouslySetInnerHTML={{ __html: props.task.notes_html }} />
          </span>
        </div>
      </div>
    </div>
  );
}

// Task.propTypes = {
//   name: PropTypes.string.isRequired
// };

export default Task;
