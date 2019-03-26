import React from 'react';
import PropTypes from 'prop-types';
import './Task.css'; 

function Task(props) {
    return  <div className="task">
                <span className="task_name">{props.task.name}</span>
                <span className="task_contact"><a href={"mailto:" + props.task.contact_email}>{props.task.contact}</a></span>
                <span className="task_note"><div dangerouslySetInnerHTML={{ __html: props.task.notes_html }} /></span>
            </div>; 
}

Task.propTypes = {
    name: PropTypes.string.isRequired
};

export default Task;