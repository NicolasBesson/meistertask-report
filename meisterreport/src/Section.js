import React from "react";
import PropTypes from "prop-types";
import TaskList from "./TaskList";

function Section(props) {
  return (
    <div className="card">
      <div className="card-header" id={"heading_" + props.section.id}>
        <button
          className="btn btn-link"
          data-toggle="collapse"
          data-target={"#collapse_" + props.section.id}
          aria-expanded="true"
          aria-controls={"collapse_" + props.section.id}
        >
          <h2>
            {props.section.name}&nbsp;
            <span className="badge badge-info">
              {props.section.tasks.length}
            </span>
          </h2>
        </button>
      </div>

      <div
        id={"collapse_" + props.section.id}
        className="collapse show"
        aria-labelledby={"heading_" + props.section.id}
        data-parent="#accordion"
      >
        <div className="card-body">
          <TaskList tasks={props.section.tasks} />
        </div>
      </div>
    </div>
  );
}

// Section.propTypes = {
//     section: PropTypes.array.isRequired
// };

export default Section;
