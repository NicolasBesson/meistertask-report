import React from 'react';
import PropTypes from 'prop-types';
import TaskList from './TaskList';

function Section(props) {
    return (
        <div className="section">
            <div className="section_name">{props.section.name}</div>
            <TaskList tasks={props.section.tasks} />
        </div>
    );
};

Section.propTypes = {
    section: PropTypes.array.isRequired
};

export default Section; 