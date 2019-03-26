import React from 'react';
import PropTypes from 'prop-types';
import TaskList from './TaskList';
import { Card } from 'bootstrap';

function Section(props) {
    return (
        <div class="card">
            <div class="card-header" id={"heading_" + props.section.id}>
                <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target={"#collapse_" + props.section.id} aria-expanded="true" aria-controls={"collapse_" + props.section.id}>
                        {props.section.name}
                    </button>
                </h5>
            </div>

            <div id={"collapse_" + props.section.id} class="collapse show" aria-labelledby={"heading_" + props.section.id} data-parent="#accordion">
                <div class="card-body">

                    <TaskList tasks={props.section.tasks} />
                </div>
            </div>
        </div>
    );
};

Section.propTypes = {
    section: PropTypes.array.isRequired
};

export default Section; 