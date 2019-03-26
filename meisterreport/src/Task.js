import React from 'react';
import PropTypes from 'prop-types';
import './Task.css';

function Task(props) {
    return <div class="card">
        <div class="card-header" id={"heading_" + props.task.id}>
            <h5 class="mb-0">
                <button class="btn btn-link" data-toggle="collapse" data-target={"#collapse_" + props.task.id} aria-expanded="true" aria-controls={"collapse_" + props.task.id}>
                    {props.task.name}
                </button>
            </h5>
        </div>

        <div id={"collapse_" + props.task.id} class="collapse show" aria-labelledby={"heading_" + props.task.id} data-parent="#accordionTask">
            <div class="card-body">
                <span className="task_contact"><a href={"mailto:" + props.task.contact_email}>{props.task.contact}</a></span>
                <span className="task_note"><div dangerouslySetInnerHTML={{ __html: props.task.notes_html }} /></span>
            </div>
        </div>
    </div>;
}

Task.propTypes = {
    name: PropTypes.string.isRequired
};

export default Task;