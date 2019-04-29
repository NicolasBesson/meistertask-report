import React from "react";
//import PropTypes from "prop-types";
import TaskList from "./TaskList";

function Section(props) {
  let style_section = {
    "fontSize": "150%",
    color: "#" + props.section.color
  };

  return (
    <div className="card section-entry">
      <div
        className="card-header section-card-header"
        id={"heading_" + props.section.id}
      >
        <div style={style_section}>
          {props.section.name}&nbsp;
          <span className="badge badge-info">{props.section.tasks.length}</span>
        </div>
      </div>

      <div className="card-body section-card-body">
        <TaskList tasks={props.section.tasks} />
      </div>
    </div>
  );
}

// Section.propTypes = {
//     section: PropTypes.array.isRequired
// };

export default Section;
